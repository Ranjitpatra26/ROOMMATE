import { TransportMode, RouteOption } from './types.js';

// Ephemeral in-memory route cache (never written to DB)
const routeCache = new Map<string, RouteOption[]>();

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: number): string {
  const mins = Math.max(1, Math.round(seconds / 60));
  if (mins < 60) {
    return `${mins} min`;
  }
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 ? `${hours} hr ${remainingMins} min` : `${hours} hr`;
}

export async function calculateRoute(
  origin: [number, number],
  destination: [number, number],
  mode: TransportMode = 'driving'
): Promise<RouteOption[]> {
  const cacheKey = `${origin[0].toFixed(4)},${origin[1].toFixed(4)}_${destination[0].toFixed(
    4
  )},${destination[1].toFixed(4)}_${mode}`;

  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey)!;
  }

  // Map transport mode to OSRM service profile
  const osrmProfile = mode === 'walking' ? 'foot' : mode === 'cycling' ? 'bike' : 'driving';
  const url = `https://router.project-osrm.org/route/v1/${osrmProfile}/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?overview=full&geometries=geojson&alternatives=true`;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      throw new Error(`Routing request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || data.code !== 'Ok' || !Array.isArray(data.routes) || data.routes.length === 0) {
      throw new Error('No route found between coordinates');
    }

    const routes: RouteOption[] = data.routes.map((r: any, idx: number) => ({
      id: `route-${mode}-${idx}`,
      mode,
      label: idx === 0 ? 'Recommended' : `Alternative ${idx}`,
      distanceMeters: r.distance,
      distanceKm: formatDistance(r.distance),
      durationSeconds: r.duration,
      durationFormatted: formatDuration(r.duration),
      coordinates: r.geometry.coordinates as [number, number][],
    }));

    routeCache.set(cacheKey, routes);
    return routes;
  } catch (error) {
    // If external routing is momentarily unreachable, produce clean interpolated route coordinates
    const distanceMeters = calculateHaversineDistance(origin, destination);
    const speedKmh = mode === 'walking' ? 4.5 : mode === 'cycling' ? 14 : 32;
    const durationSeconds = (distanceMeters / 1000 / speedKmh) * 3600;

    const fallbackRoute: RouteOption = {
      id: `route-fallback-${mode}-0`,
      mode,
      label: 'Direct Path',
      distanceMeters,
      distanceKm: formatDistance(distanceMeters),
      durationSeconds,
      durationFormatted: formatDuration(durationSeconds),
      coordinates: interpolatePoints(origin, destination, 8),
    };

    return [fallbackRoute];
  }
}

// Great-circle Haversine distance in meters
function calculateHaversineDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const R = 6371e3; // Earth radius in meters
  const lat1 = (coord1[1] * Math.PI) / 180;
  const lat2 = (coord2[1] * Math.PI) / 180;
  const deltaLat = ((coord2[1] - coord1[1]) * Math.PI) / 180;
  const deltaLng = ((coord2[0] - coord1[0]) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Generates smooth intermediate path points between origin and destination
function interpolatePoints(
  start: [number, number],
  end: [number, number],
  steps: number
): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const fraction = i / steps;
    const lng = start[0] + (end[0] - start[0]) * fraction;
    const lat = start[1] + (end[1] - start[1]) * fraction;
    points.push([lng, lat]);
  }
  return points;
}
