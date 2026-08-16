import {
  NeighborhoodMapItem,
  RoomMapItem,
  PersonMapItem,
  NeighborhoodIntelligence,
  LifestyleSignal,
} from './types.js';
import { formatINR } from '../../utils/localization.js';

export function computeNeighborhoodIntelligence(
  neighborhood: NeighborhoodMapItem,
  rooms: RoomMapItem[],
  people: PersonMapItem[],
  userBudget: { min: number; max: number } = { min: 18000, max: 35000 }
): NeighborhoodIntelligence {
  const normName = neighborhood.name.toLowerCase();
  const normCity = neighborhood.city.toLowerCase();

  // 1. Filter Rooms for this neighborhood (exact or city fallback)
  const neighborhoodRooms = rooms.filter((r) => {
    const rNeigh = (r.neighborhood || '').toLowerCase();
    const rCity = (r.city || '').toLowerCase();
    return (
      rNeigh.includes(normName) ||
      normName.includes(rNeigh) ||
      (rCity === normCity && rooms.length <= 6)
    );
  });

  const targetRooms = neighborhoodRooms.length > 0 ? neighborhoodRooms : rooms.filter(r => (r.city || '').toLowerCase() === normCity);
  const roomRents = targetRooms.map((r) => r.monthlyRent).filter((rent) => rent > 0);

  let roomStats: NeighborhoodIntelligence['roomStats'];
  if (roomRents.length > 0) {
    const minRent = Math.min(...roomRents);
    const maxRent = Math.max(...roomRents);
    const avgRent = Math.round(roomRents.reduce((sum, val) => sum + val, 0) / roomRents.length);

    roomStats = {
      totalRooms: targetRooms.length,
      minRent,
      avgRent,
      maxRent,
      formattedRange: `${formatINR(minRent)} – ${formatINR(maxRent)}`,
      hasData: true,
    };
  } else {
    roomStats = {
      totalRooms: 0,
      minRent: 0,
      avgRent: 0,
      maxRent: 0,
      formattedRange: 'No pricing data',
      hasData: false,
    };
  }

  // 2. Filter Cohabitants for this neighborhood
  const neighborhoodPeople = people.filter((p) => {
    const pNeigh = (p.neighborhood || '').toLowerCase();
    const pCity = (p.city || '').toLowerCase();
    return (
      pNeigh.includes(normName) ||
      normName.includes(pNeigh) ||
      (pCity === normCity && people.length <= 8)
    );
  });

  const targetPeople = neighborhoodPeople.length > 0 ? neighborhoodPeople : people.filter(p => (p.city || '').toLowerCase() === normCity);
  const verifiedCount = targetPeople.filter(
    (p) => p.trustProfile?.isIdVerified || p.trustProfile?.isEmploymentVerified
  ).length;

  // Aggregate Lifestyle Traits
  const traitCounts: Record<string, number> = {};
  targetPeople.forEach((p) => {
    if (p.lifestyleDNA?.chronotype) {
      traitCounts[p.lifestyleDNA.chronotype] = (traitCounts[p.lifestyleDNA.chronotype] || 0) + 1;
    }
    if (p.lifestyleDNA?.workStyle) {
      traitCounts[p.lifestyleDNA.workStyle] = (traitCounts[p.lifestyleDNA.workStyle] || 0) + 1;
    }
    if (p.visualTags && Array.isArray(p.visualTags)) {
      p.visualTags.forEach((t) => {
        if (t.length <= 16) {
          traitCounts[t] = (traitCounts[t] || 0) + 1;
        }
      });
    }
  });

  const topLifestyles: LifestyleSignal[] = Object.entries(traitCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([label, count]) => ({
      label,
      count,
      percentage: targetPeople.length > 0 ? Math.round((count / targetPeople.length) * 100) : 50,
    }));

  const peopleStats: NeighborhoodIntelligence['peopleStats'] = {
    totalPeople: targetPeople.length,
    verifiedCount,
    topLifestyles,
    hasData: targetPeople.length > 0,
  };

  // 3. Evaluate Budget Fit
  let budgetFit: NeighborhoodIntelligence['budgetFit'];
  if (roomStats.hasData && userBudget.max > 0) {
    const inBudgetRooms = targetRooms.filter(
      (r) => r.monthlyRent >= userBudget.min * 0.85 && r.monthlyRent <= userBudget.max * 1.15
    );

    if (inBudgetRooms.length >= 2 || (roomStats.avgRent <= userBudget.max && roomStats.avgRent >= userBudget.min)) {
      budgetFit = {
        status: 'excellent',
        message: 'Excellent budget overlap with your preferences',
        matchingRoomsCount: inBudgetRooms.length,
        userBudgetRange: `${formatINR(userBudget.min)} – ${formatINR(userBudget.max)}`,
      };
    } else if (roomStats.avgRent > userBudget.max) {
      budgetFit = {
        status: 'above_budget',
        message: 'Slightly above your preferred monthly budget',
        matchingRoomsCount: inBudgetRooms.length,
        userBudgetRange: `${formatINR(userBudget.min)} – ${formatINR(userBudget.max)}`,
      };
    } else {
      budgetFit = {
        status: 'moderate',
        message: 'Moderate budget overlap in this district',
        matchingRoomsCount: inBudgetRooms.length,
        userBudgetRange: `${formatINR(userBudget.min)} – ${formatINR(userBudget.max)}`,
      };
    }
  } else {
    budgetFit = {
      status: 'no_budget',
      message: 'Set your profile budget to evaluate area compatibility',
      matchingRoomsCount: targetRooms.length,
    };
  }

  // 4. Formulate Why This Area Fits You (Factual claims only)
  const relevanceReasons: string[] = [];
  if (budgetFit.matchingRoomsCount > 0) {
    relevanceReasons.push(
      `${budgetFit.matchingRoomsCount} living space${
        budgetFit.matchingRoomsCount > 1 ? 's' : ''
      } within your budget range`
    );
  }
  if (verifiedCount > 0) {
    relevanceReasons.push(
      `${verifiedCount} verified cohabitant profile${verifiedCount > 1 ? 's' : ''} in the area`
    );
  }
  if (neighborhood.walkability) {
    relevanceReasons.push(`High pedestrian walkability (${neighborhood.walkability})`);
  }
  if (neighborhood.transit) {
    relevanceReasons.push(`Direct transit access via ${neighborhood.transit}`);
  }

  return {
    neighborhood,
    roomStats,
    peopleStats,
    budgetFit,
    relevanceReasons,
  };
}
