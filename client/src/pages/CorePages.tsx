import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { useQuery } from '@tanstack/react-query';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Moon,
  Volume2,
  Users,
  Search,
  MapPin,
  Briefcase,
  Globe,
  Layers,
} from 'lucide-react';
import { discoverService, getSocket } from '../services/index.js';
import { DiscoveryCard, FilterBar } from '../components/discovery/index.js';
import { StayHistoryCard, LifestyleDNASummary } from '../components/profile/index.js';
import {
  CompatibilityScene,
  CompatibilityDimensionNode,
  TrustTimeline,
} from '../components/compatibility/index.js';
import { SpatialCityScene, RoomViewerScene, MatchRevealScene } from '../components/3d/index.js';
import { SpacesMap } from '../components/spaces/index.js';
import {
  ConversationList,
  MessageTimeline,
  MessageComposer,
  ConversationContextPanel,
} from '../components/messaging/index.js';
import { Button } from '../components/foundation/index.js';
import { PageTransition, StaggerContainer, StaggerItem } from '../components/motion/index.js';
import { Profile } from '../types/index.js';
import {
  INDIAN_DEMO_PROFILES,
  INDIAN_DEMO_ROOMS,
} from '../data/indianDemoData.js';
import { formatINR } from '../utils/localization.js';
import { LiveLocationProvider } from '../context/LiveLocationContext.js';

// ============================================================================
// 1. DISCOVERY PAGE (/discover)
// ============================================================================
export const DiscoveryPage: React.FC = () => {
  const [locationFilter, setLocationFilter] = useState('');
  const [chronotypeFilter, setChronotypeFilter] = useState('all');
  const [maxBudget, setMaxBudget] = useState(35000);
  const [selectedCity, setSelectedCity] = useState('all');

  const { data: serverData } = useQuery({
    queryKey: ['discover', locationFilter, chronotypeFilter, maxBudget],
    queryFn: () =>
      discoverService.queryDiscover({
        city: locationFilter,
        chronotype: chronotypeFilter !== 'all' ? chronotypeFilter : undefined,
        maxRent: maxBudget,
      }),
  });

  const baseProfiles: Profile[] =
    serverData?.data?.profiles && serverData.data.profiles.length > 0
      ? serverData.data.profiles
      : INDIAN_DEMO_PROFILES;

  // Filter against Indian demo criteria
  const profiles = baseProfiles.filter((p) => {
    if (locationFilter.trim()) {
      const query = locationFilter.toLowerCase();
      const locMatch = p.preferredLocations.some((loc) => loc.toLowerCase().includes(query));
      const bioMatch = p.bio.toLowerCase().includes(query);
      const headlineMatch = p.headline.toLowerCase().includes(query);
      if (!locMatch && !bioMatch && !headlineMatch) return false;
    }
    if (chronotypeFilter !== 'all') {
      if (p.lifestyleDNA?.chronotype !== chronotypeFilter) return false;
    }
    if (p.budgetRange.min > maxBudget) {
      return false;
    }
    return true;
  });

  const compatibilityScores = [98, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85];

  return (
    <PageTransition className="w-full min-h-screen py-10 px-6 max-w-7xl mx-auto space-y-10">
      {/* Header & Manifesto */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-dim pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-trust-teal animate-pulse" />
            <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest font-bold">
              Verified Co-living Ledger
            </span>
          </div>
          <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg font-bold text-earth-indigo">
            Harmonic Cohabitants
          </h1>
          <p className="font-sans text-body-md text-secondary max-w-2xl leading-relaxed">
            Curated Indian roommates mapped across acoustic profiles, circadian rhythms, and verified rental track records in Bengaluru, Mumbai, Pune, Delhi NCR, Hyderabad, and Goa.
          </p>
        </div>

        {/* Live Cohabitants Pill */}
        <div className="flex items-center gap-2 px-4 py-2 bg-clay dark:bg-surface-low rounded-full border border-surface-dim shadow-sm shrink-0">
          <Sparkles className="w-4 h-4 text-vitality-coral" />
          <span className="font-sans text-xs font-bold text-earth-indigo">
            {profiles.length} Verified Cohabitants Active
          </span>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <FilterBar
        selectedLocation={locationFilter}
        onLocationChange={setLocationFilter}
        selectedChronotype={chronotypeFilter}
        onChronotypeChange={setChronotypeFilter}
        maxBudget={maxBudget}
        onBudgetChange={setMaxBudget}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      {/* Results Grid / Showcase */}
      {profiles.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-4">
          {profiles.map((profile, idx) => (
            <StaggerItem key={profile.id || idx} className="flex justify-center">
              <DiscoveryCard
                profile={profile}
                compatibilityScore={compatibilityScores[idx % compatibilityScores.length]}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="text-center py-16 bg-surface-low rounded-3xl border border-surface-dim space-y-4">
          <p className="font-serif text-headline-sm text-earth-indigo font-bold">
            No cohabitants found matching your current filter.
          </p>
          <p className="font-sans text-xs text-secondary">
            Try searching for "Indiranagar", "Bandra", "Baner", "Hauz Khas", or adjusting your maximum budget.
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setLocationFilter('');
              setSelectedCity('all');
              setChronotypeFilter('all');
              setMaxBudget(35000);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </PageTransition>
  );
};

// ============================================================================
// 2. PROFILE / TRUST PROFILE PAGE (/profile/:id)
// ============================================================================
export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isMe = id === 'me';

  const myProfile: Profile = {
    id: 'me',
    userId: 'user-current',
    displayName: 'Priya Sundaram',
    headline: 'Visual Designer & Creative Technologist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA',
    bio: 'Seeking mindful domestic harmony in Indiranagar. Early morning tea, structured workspaces, and predictable chore rotations.',
    budgetRange: { min: 20000, max: 32000, currency: 'INR' },
    preferredLocations: ['Indiranagar, Bengaluru', 'Koramangala, Bengaluru'],
    visualTags: ['Verified Resident', 'Trust Score 960', 'Early Riser'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  };

  const matchedProfile = isMe
    ? myProfile
    : INDIAN_DEMO_PROFILES.find((p) => p.id === id || p.userId === id || id?.includes(p.id.split('-')[0])) ||
      INDIAN_DEMO_PROFILES[0];

  const defaultProfile = matchedProfile;

  const stays = [
    {
      id: 'stay-indiranagar-1',
      location: defaultProfile.preferredLocations[0] || 'Indiranagar, Bengaluru',
      duration: '14 Months',
      reviewQuote: `${defaultProfile.displayName.split(' ')[0]} is exceptionally disciplined about shared common areas, respects quiet hours after 10:30 PM, and is seamless to coordinate with on household bills.`,
      reviewerName: 'Rohan Patil',
      reviewerRole: 'Former Flatmate',
      reviewerAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
    },
    {
      id: 'stay-pune-2',
      location: 'Baner, Pune',
      duration: '8 Months',
      reviewQuote:
        'Great communication, proactive about groceries, and kept the living space impeccably clean. Highly recommend living together.',
      reviewerName: 'Aarav Mehta',
      reviewerRole: 'Co-tenant',
      reviewerAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAkrXIOQFr_z5E9eGhR9o5GdKIcRJItc5Va0e1s6Pvi2gJW9HstlN__2qqmol8Whb70aPTmU4TPWCvRGbOLjD7wwEDKCt9NMueejAZcpY_mEO-mVGei_3MiHaDq5qLMbEq_gHwvIm6BryawU0LrRMqY-zn1f7WInRW9Ktgdy5sP7qxlaFJIIM0_XJYflVqkUCxY7NYBnJkV6MHSa6RydvmAFN5TiOLhpZP7hGmsrkBOtAB1YJZSX8hYIg',
    },
  ];

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/discover');
    }
  };

  return (
    <PageTransition className="w-full min-h-screen pb-28 max-w-5xl mx-auto px-6 pt-6 space-y-10">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-surface-dim pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 font-sans text-ui-medium font-semibold text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </button>
        <span className="font-serif text-headline-sm font-bold text-earth-indigo">
          Trust Profile
        </span>
      </div>

      {/* Hero Portrait & Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait and Badges */}
        <div className="md:col-span-4 space-y-6">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xl border border-surface-dim bg-earth-indigo">
            <img
              src={defaultProfile.avatarUrl}
              alt={defaultProfile.displayName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-earth-indigo/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-clay flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-trust-teal" />
              <span className="font-sans text-[11px] font-bold">Verified Citizen</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-headline-md font-bold text-earth-indigo">
              {defaultProfile.displayName}
            </h1>
            <p className="font-sans text-ui-medium text-secondary flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-vitality-coral" />
              <span>{defaultProfile.headline}</span>
            </p>
            <p className="font-sans text-xs text-secondary flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-trust-teal" />
              <span>{defaultProfile.preferredLocations.join(' • ')}</span>
            </p>
            <div className="pt-2 text-earth-indigo font-sans text-xs font-semibold">
              Monthly Budget: <span className="font-bold text-vitality-coral">{formatINR(defaultProfile.budgetRange.min)} – {formatINR(defaultProfile.budgetRange.max)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, DNA Summary & Trust Pillars */}
        <div className="md:col-span-8 space-y-8">
          <div className="bg-clay p-6 rounded-2xl border border-surface-dim shadow-sm space-y-4">
            <h3 className="font-serif text-headline-sm font-bold text-earth-indigo border-b border-surface-dim pb-2">
              Living Philosophy
            </h3>
            <p className="font-sans text-body-md text-secondary leading-relaxed">
              {defaultProfile.bio}
            </p>
          </div>

          <LifestyleDNASummary dna={defaultProfile.lifestyleDNA} />
        </div>
      </div>

      {/* Verified Stays & Endorsements */}
      <section className="space-y-6 pt-6">
        <div className="flex justify-between items-end border-b border-surface-dim pb-3">
          <div>
            <h2 className="font-serif text-headline-md font-bold text-earth-indigo">
              Verified Stay History
            </h2>
            <p className="font-sans text-xs text-secondary mt-0.5">
              Cryptographically verified co-living records and mutual flatmate reviews.
            </p>
          </div>
          <span className="font-sans text-xs font-bold text-trust-teal uppercase tracking-wider">
            100% On-Time Ledger
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stays.map((stay) => (
            <StayHistoryCard key={stay.id} stay={stay} />
          ))}
        </div>
      </section>

      {/* Interactive Action Bar */}
      <div className="pt-6 flex flex-col sm:flex-row gap-4">
        {isMe ? (
          <>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/onboarding/chapter-1')}
              className="flex-1 py-4 bg-vitality-coral hover:bg-vitality-coral/90 text-clay font-bold flex items-center justify-center gap-2 shadow-lg shadow-vitality-coral/25 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Edit Living DNA</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/trust/me')}
              className="flex-1 py-4 font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-trust-teal" />
              <span>My Trust Ledger</span>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/compatibility-lab')}
              className="flex-1 py-4 bg-vitality-coral hover:bg-vitality-coral/90 text-clay font-bold flex items-center justify-center gap-2 shadow-lg shadow-vitality-coral/25 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Launch Compatibility Lab</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/messages/conversation-' + (matchedProfile.id.includes('rohan') ? 'rohan' : matchedProfile.id.includes('aarav') ? 'aarav' : matchedProfile.id.includes('ishita') ? 'ishita' : 'ananya'))}
              className="flex-1 py-4 font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Message Resident</span>
            </Button>
          </>
        )}
      </div>
    </PageTransition>
  );
};

// ============================================================================
// 3. COMPATIBILITY LAB (/compatibility-lab)
// ============================================================================
export const CompatibilityLabPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeDimension, setActiveDimension] = useState<string | null>('sleep');

  const dimensionNodes = [
    {
      id: 'sleep',
      title: 'Circadian Rhythm',
      icon: <Moon className="w-5 h-5" />,
      explanation: 'You both rise early (6:30 AM) with filter coffee rituals and observe quiet hours by 10:30 PM.',
      alignment: 'strong' as const,
      positionStyle: 'top-8 left-12',
    },
    {
      id: 'clean',
      title: 'Cleanliness Standard',
      icon: <Sparkles className="w-5 h-5" />,
      explanation: 'Synchronized expectation. Daily kitchen counter wipes and structured weekly maid schedule.',
      alignment: 'strong' as const,
      positionStyle: 'top-12 right-12',
    },
    {
      id: 'noise',
      title: 'Acoustic Baseline',
      icon: <Volume2 className="w-5 h-5" />,
      explanation: 'Balanced auditory zones. You work in ambient stillness; Ananya uses headphones during design hours.',
      alignment: 'moderate' as const,
      positionStyle: 'bottom-16 left-16',
    },
    {
      id: 'social',
      title: 'Social Energy',
      icon: <Users className="w-5 h-5" />,
      explanation: 'Respectful guest etiquette. Weekend dinners with 24-hour advance flatmate notification.',
      alignment: 'moderate' as const,
      positionStyle: 'bottom-12 right-16',
    },
  ];

  return (
    <div className="bg-clay text-earth-indigo min-h-screen selection:bg-vitality-coral selection:text-white pb-36 transition-colors duration-200">
      <PageTransition className="w-full max-w-6xl mx-auto px-6 pt-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest font-bold">
            Vibe Resonance & Living Chemistry
          </span>
          <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg font-bold text-earth-indigo tracking-tight">
            Compatibility Lab
          </h1>
          <p className="font-sans text-body-md text-secondary leading-relaxed">
            Analyzing multidimensional co-habitation dynamics between <strong className="text-earth-indigo">You</strong> and <strong className="text-earth-indigo">Ananya Sharma</strong> in Indiranagar, Bengaluru.
          </p>
        </div>

        {/* 3D Kinetic Resonance Canvas */}
        <div className="relative w-full h-[480px] md:h-[560px] rounded-3xl bg-surface-low dark:bg-earth-container text-earth-indigo dark:text-clay border border-surface-dim flex items-center justify-center shadow-lg transition-colors">
          {/* R3F WebGL Scene clipped */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <Canvas camera={{ position: [0, 0, 9], fov: 45 }} gl={{ alpha: true }}>
              <CompatibilityScene score={98} activeDimension={activeDimension} />
            </Canvas>
          </div>

          {/* Central Harmonic Score Pill */}
          <div className="absolute z-10 flex flex-col items-center pointer-events-none">
            <div className="w-24 h-24 rounded-full border-2 border-vitality-coral/40 flex items-center justify-center bg-clay/95 dark:bg-surface-low/95 backdrop-blur-md shadow-lg shadow-vitality-coral/20">
              <span className="font-serif text-headline-md font-bold text-vitality-coral">
                98%
              </span>
            </div>
            <span className="font-sans text-label-caps text-secondary dark:text-surface-dim uppercase tracking-widest mt-2 font-bold text-[10px]">
              Vibe Core
            </span>
          </div>

          {/* Interactive Dimension Overlays */}
          {dimensionNodes.map((node) => (
            <CompatibilityDimensionNode
              key={node.id}
              node={node}
              isActive={activeDimension === node.id}
              onSelect={() => setActiveDimension(node.id)}
            />
          ))}
        </div>

        {/* Verified Trust History Timeline */}
        <div className="space-y-8 max-w-4xl mx-auto pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-headline-md font-bold text-earth-indigo">
              Verified Trust History
            </h3>
            <p className="font-sans text-body-md text-secondary text-sm">
              Community ledger of past stays, UPI payment promptness, and verified roommate endorsements.
            </p>
          </div>
          <TrustTimeline />
        </div>

        {/* Final CTA Action */}
        <div className="text-center pt-8 space-y-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/matches/match-ananya/reveal')}
            className="px-12 py-5 text-base bg-vitality-coral hover:bg-vitality-coral/90 text-clay font-bold rounded-full shadow-2xl shadow-vitality-coral/30 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Connect with Ananya</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="font-sans text-xs text-secondary tracking-wider">
            A verified co-living match sequence will begin
          </p>
        </div>
      </PageTransition>
    </div>
  );
};

// ============================================================================
// 4. SPATIAL CITY EXPLORE (/spatial)
// ============================================================================
export const SpatialCityPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'map' | '3d'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState('indiranagar');
  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    return localStorage.getItem('roommate_last_city') || 'bengaluru';
  });
  const [isOverlayExpanded, setIsOverlayExpanded] = useState(true);

  const neighborhoods = [
    {
      id: 'indiranagar',
      cityId: 'bengaluru',
      name: 'Indiranagar, Bengaluru',
      position: [2.5, 0, 0.5] as [number, number, number],
      roomsCount: 142,
      avgRent: '₹24,000 / mo',
      vibe: 'Vibrant Tech & Design Hub',
      walkability: '94/100',
      transit: 'Purple Line Metro',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Lpc9u2aZCtgjopQ0TRZVFPKFfQzIjgHuC1qf8fVSg5kxDC8EyodcC-Q1opMznw0iwCs2gvLXnaLMICStorMrCM_OPqpQH56tLukWLZ9xClheiDO9M2z1WswSW2v9fc-Yfe5zAt8-v1L1WteZqhzk07izp609Hdba77aehbabVs2weaGtmGac_1vVMybPM_v0QAE61sPkZhvP46AdIuDrTj1Xk6ItNKqBDKBNnJZW7XoybewuPEwrww',
      description:
        'A dense canopy of rain trees shadows specialty roasters, ceramic workshops, and quiet residential lanes. Ideal for professionals balancing creative energy and domestic calm.',
    },
    {
      id: 'bandra-west',
      cityId: 'mumbai',
      name: 'Bandra West, Mumbai',
      position: [-2.8, 0, -1.2] as [number, number, number],
      roomsCount: 98,
      avgRent: '₹32,000 / mo',
      vibe: 'Coastal Arts & Heritage',
      walkability: '91/100',
      transit: 'Coastal Road & Suburban Link',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvMpO73IsC2lGAlRr8a36w9vef0AdMCr2Vkf2wPGWyc-PNq19KyOn91r8y0f8Q-lzfITMOutCzx2-cPpPTEkbmlL8Y-dXkuvAXXgY5FuYEQ63pJp_Xt82aAhcLP0UNo9ec7CAZvZk50NrtBHMLs05I59ZmKQsCZyI6LxngpFa7S1yIG0lIVCS8jKrjs0n-iDl5yrvgm15aZVNTY5ofwt5EypTHeqanc-AMFnP_dB2iBbtnW1pHEI_uQ',
      description:
        'Colonial sea promenades meet contemporary culture. Known for organic markets, heritage Portuguese lanes, and an active community of writers and filmmakers.',
    },
    {
      id: 'baner',
      cityId: 'pune',
      name: 'Baner, Pune',
      position: [0.2, 0, 2.2] as [number, number, number],
      roomsCount: 115,
      avgRent: '₹15,500 / mo',
      vibe: 'Green Foothills & Tech Hub',
      walkability: '88/100',
      transit: 'Hinjewadi Tech Shuttle',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
      description:
        'Sunlit modern high-rises looking out toward the Baner-Pashan biodiversity ridge. High acoustic discipline, clean air, and vibrant co-working culture.',
    },
  ];

  const filteredNeighborhoods = neighborhoods.filter(
    (n) =>
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected =
    filteredNeighborhoods.find((n) => n.id === selectedNeighborhoodId) ||
    filteredNeighborhoods[0] ||
    neighborhoods[0];

  return (
    <LiveLocationProvider>
      <div className="w-full h-screen bg-clay dark:bg-earth-container text-earth-indigo relative overflow-hidden select-none transition-colors duration-200">
      {/* Top Floating View Mode Switcher */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-overlay flex items-center gap-1.5 p-1 bg-[#1e2433]/95 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl pointer-events-auto">
        <button
          type="button"
          onClick={() => setViewMode('map')}
          className={`px-4 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            viewMode === 'map'
              ? 'bg-vitality-coral text-white shadow-md'
              : 'text-white/80 hover:text-white'
          }`}
        >
          <Globe className={`w-3.5 h-3.5 ${viewMode === 'map' ? 'text-white' : 'text-white/80'}`} />
          <span className={viewMode === 'map' ? 'text-white font-bold' : 'text-white/80 font-bold'}>
            Real Map
          </span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('3d')}
          className={`px-4 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            viewMode === '3d'
              ? 'bg-vitality-coral text-white shadow-md'
              : 'text-white/80 hover:text-white'
          }`}
        >
          <Layers className={`w-3.5 h-3.5 ${viewMode === '3d' ? 'text-white' : 'text-white/80'}`} />
          <span className={viewMode === '3d' ? 'text-white font-bold' : 'text-white/80 font-bold'}>
            3D Canvas
          </span>
        </button>
      </div>

      {/* Main Interactive Layer */}
      {viewMode === 'map' ? (
        /* Real MapLibre + MapTiler Vector Tile Engine */
        <div className="absolute inset-0 z-0">
          <SpacesMap
            selectedCity={selectedCityId}
            searchQuery={searchQuery}
            onCityChange={(city) => setSelectedCityId(city)}
          />
        </div>
      ) : (
        /* 3D WebGL Spatial Topology Layer */
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 6, 8], fov: 45 }} gl={{ alpha: true }}>
            <SpatialCityScene
              neighborhoods={neighborhoods}
              selectedId={selected.id}
              onSelectNeighborhood={(id: string) => setSelectedNeighborhoodId(id)}
            />
          </Canvas>
        </div>
      )}

      {/* Foreground Context & Discovery Drawer (Active only during 3D Canvas mode) */}
      {viewMode === '3d' && (
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row justify-between pt-20 md:pt-24 pb-8 px-6 md:px-12 pointer-events-none">
          {/* Left Side: Context & Filter Search */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-full pointer-events-none">
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-0.5 bg-vitality-coral" />
                <span className="font-sans text-label-caps text-vitality-coral tracking-widest font-bold text-[10px]">
                  3D Spatial Topology
                </span>
              </div>
              <h1 className="font-serif text-headline-md md:text-headline-lg font-bold text-earth-indigo dark:text-clay leading-tight">
                Spatial District
                <br />
                <span className="italic font-normal text-secondary dark:text-surface-dim">
                  Node Topology
                </span>
              </h1>
              <p className="font-sans text-xs text-secondary dark:text-surface-dim max-w-sm leading-relaxed hidden sm:block">
                Explore neighborhoods, transport hubs, and curated roommate clusters across Bengaluru, Mumbai, and Pune.
              </p>
            </header>

            <div className="mt-auto pt-6 pointer-events-auto space-y-3 hidden md:block">
              {/* Quick City Navigation Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'bengaluru', name: 'Bengaluru' },
                  { id: 'mumbai', name: 'Mumbai' },
                  { id: 'pune', name: 'Pune' },
                  { id: 'delhi', name: 'Delhi NCR' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCityId(c.id);
                      const found = neighborhoods.find((n) => n.cityId === c.id);
                      if (found) setSelectedNeighborhoodId(found.id);
                    }}
                    className={`px-3 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-xl border ${
                      selectedCityId === c.id
                        ? 'bg-vitality-coral text-white border-vitality-coral shadow-md'
                        : 'bg-clay/90 dark:bg-earth-container/90 text-earth-indigo dark:text-clay border-surface-dim dark:border-white/20 hover:border-vitality-coral'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-vitality-coral" />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-clay/90 dark:bg-earth-container/90 backdrop-blur-xl p-2 rounded-full border border-surface-dim dark:border-white/20 w-max shadow-2xl text-earth-indigo dark:text-clay transition-colors">
                <div className="bg-vitality-coral rounded-full p-2 text-clay">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter 3D nodes..."
                  className="bg-transparent border-none font-sans text-xs text-earth-indigo dark:text-clay placeholder-secondary/60 dark:placeholder-surface-dim/60 w-48 lg:w-64 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Selected Neighborhood Card (Active during 3D Canvas mode) */}
          <div className="w-full md:w-1/2 flex items-end md:items-center justify-end pointer-events-none pt-4">
            <div className="w-full max-w-md bg-clay/95 dark:bg-earth-container/95 backdrop-blur-2xl border border-surface-dim dark:border-white/20 rounded-3xl shadow-2xl p-5 sm:p-6 pointer-events-auto space-y-4 sm:space-y-6 text-earth-indigo dark:text-clay transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-sans text-label-caps text-secondary dark:text-surface-dim uppercase tracking-wider text-[10px]">
                    Selected Zone
                  </span>
                  <h2 className="font-serif text-headline-sm sm:text-headline-md font-bold text-earth-indigo dark:text-clay">
                    {selected.name}
                  </h2>
                </div>
                <span className="px-3 py-1 bg-vitality-coral/20 border border-vitality-coral/50 text-vitality-coral text-xs font-bold rounded-full font-sans">
                  {selected.vibe}
                </span>
              </div>

              {isOverlayExpanded && (
                <>
                  <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden relative shadow-inner">
                    <img
                      src={selected.imageUrl}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-indigo/80 to-transparent" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-left">
                    <div className="border-l-2 border-vitality-coral pl-2.5 sm:pl-3">
                      <div className="font-sans text-[10px] text-secondary dark:text-surface-dim uppercase font-bold">
                        Avg. Rent
                      </div>
                      <div className="font-sans text-xs font-bold text-earth-indigo dark:text-clay">
                        {selected.avgRent}
                      </div>
                    </div>
                    <div className="border-l-2 border-surface-dim/40 pl-2.5 sm:pl-3">
                      <div className="font-sans text-[10px] text-secondary dark:text-surface-dim uppercase font-bold">
                        Active Rooms
                      </div>
                      <div className="font-sans text-xs font-bold text-earth-indigo dark:text-clay">
                        {selected.roomsCount} Available
                      </div>
                    </div>
                    <div className="border-l-2 border-surface-dim/40 pl-2.5 sm:pl-3">
                      <div className="font-sans text-[10px] text-secondary dark:text-surface-dim uppercase font-bold">
                        Walkability
                      </div>
                      <div className="font-sans text-xs font-bold text-earth-indigo dark:text-clay">
                        {selected.walkability}
                      </div>
                    </div>
                    <div className="border-l-2 border-surface-dim/40 pl-2.5 sm:pl-3">
                      <div className="font-sans text-[10px] text-secondary dark:text-surface-dim uppercase font-bold">
                        Transit
                      </div>
                      <div className="font-sans text-xs font-bold text-earth-indigo dark:text-clay">
                        {selected.transit}
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-secondary dark:text-surface-dim leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {selected.description}
                  </p>
                </>
              )}

              <div className="flex items-center gap-2 pt-1 font-sans text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    const roomMap: Record<string, string> = {
                      indiranagar: '/rooms/the-indiranagar-studio',
                      'bandra-west': '/rooms/the-bandra-heritage-duplex',
                      baner: '/rooms/the-baner-sanctuary',
                    };
                    navigate(roomMap[selected.id] || '/rooms/the-indiranagar-studio');
                  }}
                  className="flex-1 py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-clay font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-vitality-coral/30 cursor-pointer text-center"
                >
                  Explore Rooms
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/discover')}
                  className="flex-1 py-3 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo dark:text-clay border border-surface-dim dark:border-white/20 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer text-center"
                >
                  Roommates
                </button>
                <button
                  type="button"
                  onClick={() => setIsOverlayExpanded(!isOverlayExpanded)}
                  className="px-3 py-3 bg-surface-low dark:bg-white/10 border border-surface-dim dark:border-white/20 rounded-xl text-secondary dark:text-surface-dim hover:text-earth-indigo cursor-pointer sm:hidden"
                  title={isOverlayExpanded ? 'Minimize Card' : 'Expand Card'}
                >
                  {isOverlayExpanded ? '−' : '+'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </LiveLocationProvider>
  );
};

// ============================================================================
// 5. 3D ROOM DISCOVERY / DETAIL PAGE (/rooms/:id)
// ============================================================================
export const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: featuredData } = useQuery({
    queryKey: ['discover', 'featured'],
    queryFn: () => discoverService.getFeatured(),
    staleTime: 1000 * 60 * 5,
  });

  const dbRooms = featuredData?.data?.rooms || [];
  const dbRoom = dbRooms.find((r: any) => r._id === id || r.id === id);

  const matchedDemo = dbRoom
    ? INDIAN_DEMO_ROOMS.find(
        (r) =>
          r.city.toLowerCase() === dbRoom.address?.city?.toLowerCase() ||
          r.title.toLowerCase().includes(dbRoom.title?.toLowerCase() || '')
      )
    : null;

  const currentRoom =
    INDIAN_DEMO_ROOMS.find((r) => r.id === id || (id && id.length > 3 && r.id.includes(id))) ||
    matchedDemo ||
    INDIAN_DEMO_ROOMS[0];

  const gallery = currentRoom.galleryImages && currentRoom.galleryImages.length > 0
    ? currentRoom.galleryImages
    : [
        {
          url: currentRoom.imageUrl,
          title: 'Master Living Suite',
          category: 'Bedroom & Workspace',
        },
      ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'photos' | '3d'>('photos');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [moveInDate, setMoveInDate] = useState('2026-09-01');
  const [applicantNote, setApplicantNote] = useState(
    'Hi! I love the light and quiet workspace in this flat. I work in product design, wake up early for yoga, and keep common spaces clean.'
  );
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [tourScheduled, setTourScheduled] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/spatial');
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setShowApplyModal(false);
      setApplicationSubmitted(false);
    }, 2000);
  };

  return (
    <PageTransition className="w-full min-h-screen pb-28 max-w-6xl mx-auto px-6 pt-6 space-y-8">
      {/* Back Header & View Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-dim pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 font-sans text-ui-medium font-semibold text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Spatial City</span>
        </button>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-surface-low border border-surface-dim p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('photos')}
            className={`px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === 'photos'
                ? 'bg-earth-indigo text-clay shadow-sm'
                : 'text-secondary hover:text-earth-indigo'
            }`}
          >
            <span>📸 Editorial Photography</span>
            <span className="text-[10px] opacity-80 px-1.5 py-0.2 rounded bg-white/15">
              {gallery.length} Angles
            </span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === '3d'
                ? 'bg-earth-indigo text-clay shadow-sm'
                : 'text-secondary hover:text-earth-indigo'
            }`}
          >
            <span>📐 3D Spatial Layout</span>
          </button>
        </div>
      </div>

      {/* Hero Media Container */}
      <div className="space-y-4">
        <div className="relative w-full h-[460px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-surface-dim bg-earth-indigo">
          {viewMode === 'photos' ? (
            <div className="w-full h-full relative group">
              <img
                src={gallery[activePhotoIdx]?.url || currentRoom.imageUrl}
                alt={gallery[activePhotoIdx]?.title || currentRoom.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              {/* Photo Top Badge */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-vitality-coral" />
                  <span>Verified Architecture</span>
                </span>
                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 font-sans text-xs">
                  {gallery[activePhotoIdx]?.category}
                </span>
              </div>
            </div>
          ) : (
            <Canvas camera={{ position: [4, 3, 8], fov: 45 }} gl={{ alpha: true }}>
              <RoomViewerScene roomName={currentRoom.id} />
            </Canvas>
          )}

          {/* Floating Context Pill Overlay with 100% Contrast */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row justify-between items-start md:items-end bg-black/85 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/20 text-white shadow-2xl">
            <div className="max-w-xl space-y-1.5">
              <span className="font-sans text-label-caps text-vitality-coral tracking-widest font-bold text-xs uppercase block">
                {currentRoom.neighborhood}, {currentRoom.city} • {currentRoom.roomType.replace('_', ' ')}
              </span>
              <h1 className="font-serif text-headline-lg-mobile md:text-headline-md font-bold text-white leading-tight">
                {currentRoom.title}
              </h1>
              <p className="font-sans text-xs text-white/80 leading-relaxed pt-0.5">
                {currentRoom.description}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right shrink-0">
              <div className="font-serif text-headline-md font-bold text-white">
                {formatINR(currentRoom.monthlyRent)}{' '}
                <span className="font-sans text-xs text-white/70 font-normal">/mo</span>
              </div>
              <span className="font-sans text-[11px] text-emerald-400 font-bold flex items-center gap-1 md:justify-end mt-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Available Next Month
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip (When in Photos Mode) */}
        {viewMode === 'photos' && gallery.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative h-24 rounded-2xl overflow-hidden border-2 transition-all text-left p-2 flex flex-col justify-end cursor-pointer group ${
                  activePhotoIdx === idx
                    ? 'border-vitality-coral ring-2 ring-vitality-coral/40 shadow-md'
                    : 'border-surface-dim opacity-75 hover:opacity-100 hover:border-earth-indigo/50'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="font-sans text-[10px] text-vitality-coral font-bold block">
                    Angle 0{idx + 1}
                  </span>
                  <span className="font-sans text-xs font-bold truncate block">{img.title}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Lifestyle, Curators, Space Description */}
        <div className="md:col-span-8 space-y-10">
          {/* Room Lifestyle & Amenities */}
          <section className="space-y-4">
            <h3 className="font-serif text-headline-sm font-bold text-earth-indigo border-b border-surface-dim pb-2">
              Architectural Amenities & Lifestyle Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentRoom.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3.5 bg-clay border border-surface-dim rounded-2xl font-sans text-xs font-bold text-earth-indigo flex items-center gap-3 shadow-sm"
                >
                  <div className="w-7 h-7 rounded-lg bg-surface-low border border-surface-dim flex items-center justify-center text-vitality-coral shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Current Cohabitants */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-surface-dim pb-2">
              <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                Current Cohabitants in Residence
              </h3>
              <span className="font-sans text-xs text-secondary">
                Curated for vibe harmony & deep focus
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Roommate 1: Ananya */}
              <div className="bg-clay p-5 rounded-2xl border border-surface-dim shadow-sm flex items-start gap-4 hover:border-earth-indigo/40 transition-colors">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A"
                  alt="Ananya Sharma"
                  className="w-14 h-14 rounded-full object-cover shrink-0 border border-surface-dim"
                />
                <div className="space-y-1 min-w-0">
                  <h4 className="font-serif text-ui-medium font-bold text-earth-indigo truncate">
                    Ananya Sharma
                  </h4>
                  <p className="font-sans text-xs text-secondary truncate">
                    Spatial Architect & Ceramicist
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1 bg-surface-low px-2 py-0.5 rounded-md text-[11px] font-bold font-sans text-vitality-coral">
                      <Sparkles className="w-3 h-3" /> 98% Resonance
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate('/profile/ananya-sharma')}
                      className="text-[11px] font-sans font-bold text-trust-teal hover:underline cursor-pointer"
                    >
                      Trust DNA &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Roommate 2: Rohan */}
              <div className="bg-clay p-5 rounded-2xl border border-surface-dim shadow-sm flex items-start gap-4 hover:border-earth-indigo/40 transition-colors">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ"
                  alt="Rohan Patil"
                  className="w-14 h-14 rounded-full object-cover shrink-0 border border-surface-dim"
                />
                <div className="space-y-1 min-w-0">
                  <h4 className="font-serif text-ui-medium font-bold text-earth-indigo truncate">
                    Rohan Patil
                  </h4>
                  <p className="font-sans text-xs text-secondary truncate">
                    AI Researcher & Tech Fellow
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1 bg-surface-low px-2 py-0.5 rounded-md text-[11px] font-bold font-sans text-vitality-coral">
                      <Sparkles className="w-3 h-3" /> 94% Resonance
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate('/profile/rohan-patil')}
                      className="text-[11px] font-sans font-bold text-trust-teal hover:underline cursor-pointer"
                    >
                      Trust DNA &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Living Space Narrative */}
          <section className="space-y-4">
            <h3 className="font-serif text-headline-sm font-bold text-earth-indigo border-b border-surface-dim pb-2">
              The Living Space & Materiality
            </h3>
            <div className="font-sans text-body-md text-secondary space-y-3 leading-relaxed">
              <p>
                This light-filled corner room offers a serene sanctuary for focused deep work and restful evenings. The flat features terracotta tiles, teakwood workstations, and triple-glazed balcony doors facing mature rain trees.
              </p>
              <p>
                Shared amenities include a modern modular kitchen, water purifier, daily maid service, and 100% solar water heating. Flatmates maintain strict invisible daily organization with automated equal UPI splits on monthly utilities.
              </p>
            </div>
          </section>

          {/* Household Operating Agreement Standards */}
          <section className="bg-clay p-6 rounded-2xl border border-surface-dim shadow-sm space-y-4">
            <h3 className="font-serif text-headline-sm font-bold text-earth-indigo flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-trust-teal" />
              <span>Living OS Household Standards</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3.5 bg-surface-low rounded-xl border border-surface-dim space-y-1">
                <div className="font-bold text-earth-indigo">🌙 Quiet Hours</div>
                <div className="text-secondary">Enforced strictly after 10:30 PM for restorative sleep.</div>
              </div>
              <div className="p-3.5 bg-surface-low rounded-xl border border-surface-dim space-y-1">
                <div className="font-bold text-earth-indigo">🍳 Kitchen Etiquette</div>
                <div className="text-secondary">Clean countertops and zero dishes left in the sink overnight.</div>
              </div>
              <div className="p-3.5 bg-surface-low rounded-xl border border-surface-dim space-y-1">
                <div className="font-bold text-earth-indigo">👥 Guest Policy</div>
                <div className="text-secondary">Weekend dinner catch-ups with respectful prior heads-up.</div>
              </div>
              <div className="p-3.5 bg-surface-low rounded-xl border border-surface-dim space-y-1">
                <div className="font-bold text-earth-indigo">⚡ Automated Ledger</div>
                <div className="text-secondary">Instant 1-click UPI settlement on monthly electricity & maid.</div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Application & Financial Ledger */}
        <div className="md:col-span-4">
          <div className="sticky top-24 bg-clay border border-surface-dim rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-surface-dim">
              <span className="font-sans text-label-caps text-vitality-coral font-bold uppercase tracking-wider text-xs">
                Financial Transparency
              </span>
              <ShieldCheck className="w-4 h-4 text-trust-teal" />
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between text-secondary">
                <span>Monthly Rent</span>
                <span className="font-bold text-earth-indigo">{formatINR(currentRoom.monthlyRent)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Security Deposit (Refundable)</span>
                <span className="font-bold text-earth-indigo">{formatINR(currentRoom.deposit)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Est. Utilities & Daily Maid</span>
                <span className="font-bold text-earth-indigo">₹1,800 / mo</span>
              </div>
              <div className="pt-2 border-t border-surface-dim flex justify-between text-sm font-bold text-earth-indigo">
                <span>Total Monthly Commitment</span>
                <span>{formatINR(currentRoom.monthlyRent + 1800)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowApplyModal(true)}
                className="w-full py-4 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold rounded-xl shadow-lg shadow-vitality-coral/25 cursor-pointer uppercase text-xs tracking-wider"
              >
                Apply for Residency
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/messages/conversation-ananya')}
                className="w-full py-4 font-bold rounded-xl cursor-pointer"
              >
                Message Ananya & Rohan
              </Button>
              <button
                type="button"
                onClick={() => setTourScheduled(true)}
                className={`w-full py-3 border rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                  tourScheduled
                    ? 'bg-trust-teal text-white border-trust-teal'
                    : 'border-surface-dim text-secondary hover:text-earth-indigo hover:border-earth-indigo'
                }`}
              >
                {tourScheduled ? '✓ In-Person Tour Requested for Sunday' : '📅 Schedule In-Person Tour'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-surface-dim pb-4">
              <div>
                <span className="font-sans text-label-caps text-vitality-coral uppercase font-bold text-[10px]">
                  Residency Application
                </span>
                <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                  {currentRoom.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="w-8 h-8 rounded-full bg-surface-dim/40 flex items-center justify-center text-secondary hover:text-earth-indigo cursor-pointer"
              >
                ✕
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-trust-teal text-white rounded-full flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h4 className="font-serif text-headline-sm font-bold text-earth-indigo">
                  Application Dispatched!
                </h4>
                <p className="font-sans text-xs text-secondary max-w-xs mx-auto">
                  Ananya & Rohan have received your profile and note. You will receive an update in Messages.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-bold text-secondary uppercase text-[10px] mb-1.5">
                    Target Move-in Date
                  </label>
                  <input
                    type="date"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-low border border-surface-dim rounded-xl font-sans text-earth-indigo focus:outline-none focus:border-earth-indigo"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-secondary uppercase text-[10px] mb-1.5">
                    Introduction Note to Cohabitants
                  </label>
                  <textarea
                    rows={4}
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-low border border-surface-dim rounded-xl font-sans text-earth-indigo focus:outline-none focus:border-earth-indigo resize-none"
                    required
                  />
                </div>

                <div className="p-4 bg-surface-low rounded-xl border border-surface-dim space-y-1">
                  <div className="font-bold text-earth-indigo">Automated Living OS Guarantee</div>
                  <div className="text-[11px] text-secondary">
                    Your application includes your Aadhaar Verified Trust Score (960) and Circadian Match (98%).
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="w-1/2 py-3.5 border border-surface-dim rounded-xl font-bold text-secondary hover:text-earth-indigo cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-1/2 py-3.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold rounded-xl shadow-md shadow-vitality-coral/25 cursor-pointer"
                  >
                    Send Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </PageTransition>
  );
};

// ============================================================================
// 6. MATCH REVEAL MOMENT (/matches/:id/reveal)
// ============================================================================
export const MatchRevealPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/compatibility-lab');
    }
  };

  return (
    <PageTransition className="min-h-screen min-h-[100dvh] w-full bg-clay text-earth-indigo overflow-y-auto relative select-none flex flex-col justify-between p-6 md:p-12">
      {/* 3D Convergence WebGL Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-multiply">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }}>
          <MatchRevealScene />
        </Canvas>
      </div>

      {/* Header */}
      <header className="w-full flex justify-between items-center z-20">
        <h1 className="font-serif text-headline-sm font-bold text-earth-indigo tracking-wider">
          ROOMMATE
        </h1>
        <button
          type="button"
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-clay dark:bg-surface-low border border-surface-dim hover:border-vitality-coral flex items-center justify-center text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </header>

      {/* Center Presentation Area */}
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative z-20 my-4">
        <div className="text-center mb-8">
          <span className="font-sans text-[11px] font-bold text-vitality-coral uppercase tracking-widest block mb-2">
            High Compatibility Match
          </span>
          <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg font-bold text-earth-indigo">
            A Life that Fits.
          </h2>
        </div>

        {/* Avatars & Convergence Line */}
        <div className="relative flex items-center justify-center gap-16 md:gap-32 w-full my-6">
          {/* User Avatar */}
          <div className="relative group flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-clay dark:border-surface-dim shadow-2xl ring-2 ring-vitality-coral/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA"
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3.5 bg-clay/95 dark:bg-surface-low/95 backdrop-blur-md px-4 py-1 rounded-full border border-surface-dim shadow-sm">
              <span className="font-sans text-xs font-bold text-earth-indigo">You</span>
            </div>
          </div>

          {/* Connection Percentage Bubble */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-clay dark:bg-surface-low shadow-2xl flex items-center justify-center border border-surface-dim relative">
              <div className="absolute inset-0 rounded-full border-2 border-vitality-coral border-t-transparent animate-spin opacity-50" />
              <span className="font-serif text-headline-sm font-bold text-vitality-coral">
                98<span className="text-xs font-sans">%</span>
              </span>
            </div>
          </div>

          {/* Dashed Connector Line */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-80 h-[2px] border-b-2 border-dashed border-surface-dim -z-10" />

          {/* Match Avatar */}
          <div className="relative group flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-clay dark:border-surface-dim shadow-2xl ring-2 ring-earth-indigo/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A"
                alt="Ananya Sharma"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3.5 bg-clay/95 dark:bg-surface-low/95 backdrop-blur-md px-4 py-1 rounded-full border border-surface-dim shadow-sm">
              <span className="font-sans text-xs font-bold text-earth-indigo">Ananya Sharma</span>
            </div>
          </div>
        </div>

        {/* Shared Harmonies Glass Panel */}
        <div className="bg-surface-low/80 dark:bg-surface-container/80 backdrop-blur-xl border border-surface-dim rounded-3xl p-6 md:p-8 mt-8 w-full max-w-2xl shadow-lg space-y-4">
          <h3 className="font-sans text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-vitality-coral" />
            <span>Shared Harmonies • Indiranagar, Bengaluru</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <span className="px-4 py-2 bg-clay dark:bg-surface-low border border-surface-dim rounded-full font-sans text-xs font-bold text-earth-indigo">
              ☀️ 6:30 AM Early Risers
            </span>
            <span className="px-4 py-2 bg-clay dark:bg-surface-low border border-surface-dim rounded-full font-sans text-xs font-bold text-earth-indigo">
              ☕ Filter Coffee Rituals
            </span>
            <span className="px-4 py-2 bg-clay dark:bg-surface-low border border-surface-dim rounded-full font-sans text-xs font-bold text-earth-indigo">
              🌙 10:30 PM Quiet Hours
            </span>
            <span className="px-4 py-2 bg-clay dark:bg-surface-low border border-surface-dim rounded-full font-sans text-xs font-bold text-earth-indigo">
              ⚡ Punctual UPI Splits
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-3 z-20">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/messages/conversation-ananya')}
          className="flex-1 py-4 bg-vitality-coral hover:bg-vitality-coral/90 text-clay font-bold rounded-xl shadow-lg shadow-vitality-coral/25 flex items-center justify-center gap-2 uppercase tracking-wider text-xs cursor-pointer"
        >
          <span>Start Conversation</span>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/rooms/the-indiranagar-studio')}
          className="flex-1 py-4 bg-clay dark:bg-surface-low border border-surface-dim hover:border-earth-indigo text-earth-indigo font-bold rounded-xl uppercase tracking-wider text-xs cursor-pointer"
        >
          Explore Room Together
        </Button>
      </div>
    </PageTransition>
  );
};

// ============================================================================
// ============================================================================
// 7. CONVERSATION & DIRECT MESSAGING (/messages/:conversationId)
// ============================================================================
export const ConversationPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();

  const [activeConvId, setActiveConvId] = useState(conversationId || 'conversation-ananya');
  const [searchQuery, setSearchQuery] = useState('');
  const [inChatSearch, setInChatSearch] = useState('');
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<any | null>(null);

  // Conversations List State
  const [conversations, setConversations] = useState<any[]>([
    {
      id: 'conversation-ananya',
      participant: {
        id: 'user-ananya',
        name: 'Ananya Sharma',
        role: 'Spatial Architect & Ceramicist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
        isOnline: true,
        compatibilityScore: 98,
        city: 'Indiranagar, Bengaluru',
        tags: ['Early Riser', 'Filter Coffee Rituals', 'Clean Spaces'],
      },
      lastMessage: 'Would this Saturday 11:00 AM work for a quick chai and walkthrough?',
      lastMessageTime: '10:42 AM',
      unreadCount: 0,
      isPinned: true,
      roomContext: {
        title: 'The Indiranagar Garden Studio',
        price: '₹24,000 / mo',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
      },
    },
    {
      id: 'conversation-rohan',
      participant: {
        id: 'user-rohan',
        name: 'Rohan Patil',
        role: 'AI Systems Researcher',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
        isOnline: true,
        compatibilityScore: 94,
        city: 'Baner, Pune',
        tags: ['Quiet Work Hours', 'High Tech Discipline', 'Baner Ridge'],
      },
      lastMessage: 'The fiber router has battery backup during storms.',
      lastMessageTime: 'Yesterday',
      unreadCount: 1,
      isPinned: false,
      roomContext: {
        title: 'The Baner Minimalist Flat',
        price: '₹15,500 / mo',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
      },
    },
    {
      id: 'conversation-aarav',
      participant: {
        id: 'user-aarav',
        name: 'Aarav Mehta',
        role: 'Heritage Architect & Urbanist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvMpO73IsC2lGAlRr8a36w9vef0AdMCr2Vkf2wPGWyc-PNq19KyOn91r8y0f8Q-lzfITMOutCzx2-cPpPTEkbmlL8Y-dXkuvAXXgY5FuYEQ63pJp_Xt82aAhcLP0UNo9ec7CAZvZk50NrtBHMLs05I59ZmKQsCZyI6LxngpFa7S1yIG0lIVCS8jKrjs0n-iDl5yrvgm15aZVNTY5ofwt5EypTHeqanc-AMFnP_dB2iBbtnW1pHEI_uQ',
        isOnline: false,
        compatibilityScore: 91,
        city: 'Bandra West, Mumbai',
        tags: ['Heritage Aesthetics', 'Bandra Promenades', 'Weekend Dinners'],
      },
      lastMessage: 'Let us confirm the Airtel fiber broadband split today.',
      lastMessageTime: '14 Aug',
      unreadCount: 0,
      isPinned: false,
      roomContext: {
        title: 'The Bandra Heritage Duplex',
        price: '₹32,000 / mo',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
      },
    },
  ]);

  // Messages State keyed by conversation
  const [messagesByConv, setMessagesByConv] = useState<Record<string, any[]>>({
    'conversation-ananya': [
      {
        id: 'msg-1',
        senderId: 'user-ananya',
        senderName: 'Ananya Sharma',
        senderAvatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
        body: 'Namaste! I loved your profile. Our morning rhythms and shared space standards align wonderfully.',
        createdAt: '10:30 AM',
        deliveryStatus: 'read',
        isMe: false,
      },
      {
        id: 'msg-2',
        senderId: 'user-ananya',
        senderName: 'Ananya Sharma',
        type: 'room_card',
        roomPayload: {
          roomId: 'the-indiranagar-studio',
          title: 'The Indiranagar Garden Studio',
          price: '₹24,000 / mo',
          neighborhood: 'Indiranagar',
          city: 'Bengaluru',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
        },
        createdAt: '10:31 AM',
        deliveryStatus: 'read',
        isMe: false,
      },
      {
        id: 'msg-3',
        senderId: 'user-current',
        senderName: 'You',
        body: 'Hi Ananya! The teakwood workspace and morning daylight in the garden studio look perfect. The 10:30 PM quiet hours and filter coffee routine resonated completely with me.',
        createdAt: '10:35 AM',
        deliveryStatus: 'read',
        isMe: true,
        reactions: [{ emoji: '❤️', count: 1, users: ['user-ananya'] }],
      },
      {
        id: 'msg-4',
        senderId: 'user-ananya',
        senderName: 'Ananya Sharma',
        type: 'expense_card',
        expensePayload: {
          expenseId: 'exp-wifi-aug',
          title: 'Airtel Gigabit Fiber 1 Gbps (August)',
          totalAmount: 1499,
          yourShare: 749.5,
          paidBy: 'Ananya Sharma',
          category: 'wifi',
          status: 'pending',
        },
        createdAt: '10:38 AM',
        deliveryStatus: 'read',
        isMe: false,
      },
      {
        id: 'msg-5',
        senderId: 'user-ananya',
        senderName: 'Ananya Sharma',
        body: 'Would this Saturday 11:00 AM work for a quick chai and walkthrough of the flat?',
        createdAt: '10:42 AM',
        deliveryStatus: 'read',
        isMe: false,
      },
    ],
    'conversation-rohan': [
      {
        id: 'msg-r1',
        senderId: 'user-rohan',
        senderName: 'Rohan Patil',
        body: 'Hey! I saw you are looking at spaces in Pune. The Baner flat has a quiet hill view.',
        createdAt: 'Yesterday',
        deliveryStatus: 'read',
        isMe: false,
      },
      {
        id: 'msg-r2',
        senderId: 'user-rohan',
        senderName: 'Rohan Patil',
        type: 'room_card',
        roomPayload: {
          roomId: 'the-baner-sanctuary',
          title: 'The Baner Minimalist Flat',
          price: '₹15,500 / mo',
          neighborhood: 'Baner',
          city: 'Pune',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
        },
        createdAt: 'Yesterday',
        deliveryStatus: 'read',
        isMe: false,
      },
      {
        id: 'msg-r3',
        senderId: 'user-rohan',
        senderName: 'Rohan Patil',
        body: 'The fiber router has battery backup during storms.',
        createdAt: 'Yesterday',
        deliveryStatus: 'read',
        isMe: false,
      },
    ],
    'conversation-aarav': [
      {
        id: 'msg-a1',
        senderId: 'user-aarav',
        senderName: 'Aarav Mehta',
        body: 'Hello! Are you exploring heritage apartments in Bandra?',
        createdAt: '14 Aug',
        deliveryStatus: 'read',
        isMe: false,
      },
      {
        id: 'msg-a2',
        senderId: 'user-aarav',
        senderName: 'Aarav Mehta',
        body: 'Let us confirm the Airtel fiber broadband split today.',
        createdAt: '14 Aug',
        deliveryStatus: 'read',
        isMe: false,
      },
    ],
  });

  const activeMessages = messagesByConv[activeConvId] || [];
  const currentConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  // Socket.io Realtime Wiring
  useEffect(() => {
    const socket = getSocket();
    socket.emit('join_conversation', activeConvId);

    const handleNewMessage = (msg: any) => {
      setMessagesByConv((prev) => {
        const convMsgs = prev[activeConvId] || [];
        if (convMsgs.some((m) => m.id === msg.id)) return prev;
        return {
          ...prev,
          [activeConvId]: [...convMsgs, msg],
        };
      });
    };

    const handleTypingStart = () => setIsTyping(true);
    const handleTypingStop = () => setIsTyping(false);

    socket.on('message:new', handleNewMessage);
    socket.on('typing:start', handleTypingStart);
    socket.on('typing:stop', handleTypingStop);

    return () => {
      socket.emit('leave_conversation', activeConvId);
      socket.off('message:new', handleNewMessage);
      socket.off('typing:start', handleTypingStart);
      socket.off('typing:stop', handleTypingStop);
    };
  }, [activeConvId]);

  // Send Standard Text Message
  const handleSendMessage = (text: string, replyTo?: any) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'user-current',
      senderName: 'You',
      body: text,
      replyTo,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryStatus: 'sent',
      isMe: true,
    };

    setMessagesByConv((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));

    // Update conversation list preview
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            }
          : c
      )
    );

    const socket = getSocket();
    socket.emit('message:send', {
      conversationId: activeConvId,
      message: newMsg,
    });

    // Simulate flatmate response after 2.5s for authentic interactive feel
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMsg = {
          id: `msg-rep-${Date.now()}`,
          senderId: currentConversation.participant.id,
          senderName: currentConversation.participant.name,
          senderAvatar: currentConversation.participant.avatarUrl,
          body:
            activeConvId === 'conversation-ananya'
              ? 'Sounds great! I will keep fresh South Indian filter coffee ready for our Saturday chat.'
              : 'Understood, let us coordinate the next steps!',
          createdAt: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          deliveryStatus: 'read',
          isMe: false,
        };
        setMessagesByConv((prev) => ({
          ...prev,
          [activeConvId]: [...(prev[activeConvId] || []), replyMsg],
        }));
      }, 2000);
    }, 1000);
  };

  // Send Room Card
  const handleSendRoomCard = (room: any) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'user-current',
      senderName: 'You',
      type: 'room_card',
      roomPayload: room,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryStatus: 'sent',
      isMe: true,
    };
    setMessagesByConv((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));
  };

  // Send Expense Card
  const handleSendExpenseCard = (expense: any) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'user-current',
      senderName: 'You',
      type: 'expense_card',
      expensePayload: expense,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryStatus: 'sent',
      isMe: true,
    };
    setMessagesByConv((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));
  };

  // Send Agreement Card
  const handleSendAgreementCard = (agreement: any) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'user-current',
      senderName: 'You',
      type: 'agreement_card',
      agreementPayload: agreement,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryStatus: 'sent',
      isMe: true,
    };
    setMessagesByConv((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));
  };

  // Settle Expense Action
  const handleSettleExpense = (expenseId: string) => {
    setMessagesByConv((prev) => ({
      ...prev,
      [activeConvId]: (prev[activeConvId] || []).map((m) => {
        if (m.expensePayload && m.expensePayload.expenseId === expenseId) {
          return {
            ...m,
            expensePayload: { ...m.expensePayload, status: 'settled' },
          };
        }
        return m;
      }),
    }));

    // Add confirmation system message
    const confirmMsg = {
      id: `sys-${Date.now()}`,
      senderId: 'system',
      senderName: 'System',
      type: 'system_event',
      body: 'You settled Airtel Gigabit Fiber (₹749.50) via UPI.',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false,
    };
    setMessagesByConv((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), confirmMsg],
    }));
  };

  // React to Message
  const handleReactMessage = (msgId: string, emoji: string) => {
    setMessagesByConv((prev) => ({
      ...prev,
      [activeConvId]: (prev[activeConvId] || []).map((m) => {
        if (m.id !== msgId) return m;
        const currentReactions = m.reactions || [];
        const existing = currentReactions.find((r: any) => r.emoji === emoji);

        if (existing) {
          const hasUser = existing.users.includes('user-current');
          const updated = hasUser
            ? existing.count === 1
              ? currentReactions.filter((r: any) => r.emoji !== emoji)
              : currentReactions.map((r: any) =>
                  r.emoji === emoji
                    ? { ...r, count: r.count - 1, users: r.users.filter((u: any) => u !== 'user-current') }
                    : r
                )
            : currentReactions.map((r: any) =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, users: [...r.users, 'user-current'] }
                  : r
              );
          return { ...m, reactions: updated };
        } else {
          return {
            ...m,
            reactions: [...currentReactions, { emoji, count: 1, users: ['user-current'] }],
          };
        }
      }),
    }));
  };

  // Typing Socket Handlers
  const handleTypingStart = () => {
    const socket = getSocket();
    socket.emit('typing:start', { conversationId: activeConvId });
  };

  const handleTypingStop = () => {
    const socket = getSocket();
    socket.emit('typing:stop', { conversationId: activeConvId });
  };

  // In-chat search filter
  const displayedMessages = inChatSearch.trim()
    ? activeMessages.filter((m) => m.body && m.body.toLowerCase().includes(inChatSearch.toLowerCase()))
    : activeMessages;

  return (
    <div className="h-[calc(100vh-5rem)] flex overflow-hidden w-full max-w-[1600px] mx-auto border-x border-surface-dim bg-clay dark:bg-surface-low transition-colors">
      {/* Left Column: Conversations List (Hidden on mobile when conversation is active) */}
      <div className={`w-full lg:w-auto h-full ${activeConvId ? 'hidden lg:block' : 'block'}`}>
        <ConversationList
          conversations={conversations}
          activeId={activeConvId}
          onSelectConversation={(id) => {
            setActiveConvId(id);
            navigate(`/messages/${id}`);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Center Column: Active Conversation (Visible on mobile when activeConvId is set) */}
      <section
        className={`flex-1 flex flex-col h-full bg-clay dark:bg-surface-low relative min-w-[320px] ${
          !activeConvId ? 'hidden lg:flex' : 'flex'
        }`}
      >
        {/* Conversation Header */}
        <div className="h-20 border-b border-surface-dim flex items-center justify-between px-4 sm:px-6 shrink-0 bg-clay dark:bg-surface-low z-20 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Back Button */}
            <button
              type="button"
              onClick={() => {
                setActiveConvId('');
                navigate('/messages');
              }}
              className="lg:hidden w-8 h-8 rounded-full hover:bg-surface-dim/40 flex items-center justify-center text-secondary hover:text-earth-indigo transition-colors cursor-pointer shrink-0"
              title="Back to conversation list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Avatar with live online dot */}
            <div className="relative shrink-0">
              <img
                src={currentConversation.participant.avatarUrl}
                alt={currentConversation.participant.name}
                className="w-10 h-10 rounded-full object-cover border border-surface-dim"
              />
              {currentConversation.participant.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-clay dark:border-surface-low" />
              )}
            </div>

            {/* Participant Details */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <h3 className="font-serif text-sm font-bold text-earth-indigo truncate">
                  {currentConversation.participant.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-trust-teal shrink-0" />
              </div>
              <div className="flex items-center gap-2 font-sans text-[11px] text-secondary truncate">
                <span className="flex items-center gap-1 text-emerald-600 font-bold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Active now
                </span>
                <span className="text-vitality-coral font-bold truncate">
                  • {currentConversation.participant.compatibilityScore}% Resonance
                </span>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search within conversation */}
            <button
              type="button"
              onClick={() => setShowInChatSearch(!showInChatSearch)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                showInChatSearch
                  ? 'bg-earth-indigo text-clay'
                  : 'hover:bg-surface-dim/40 text-secondary hover:text-earth-indigo'
              }`}
              title="Search conversation"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* View Compatibility Lab */}
            <button
              type="button"
              onClick={() => navigate('/compatibility-lab')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-low border border-surface-dim hover:border-earth-indigo text-earth-indigo font-sans text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-vitality-coral" />
              <span>Lab</span>
            </button>

            {/* Toggle Info Drawer */}
            <button
              type="button"
              onClick={() => setShowInfoPanel(!showInfoPanel)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                showInfoPanel
                  ? 'bg-earth-indigo text-clay'
                  : 'hover:bg-surface-dim/40 text-secondary hover:text-earth-indigo'
              }`}
              title="Resident Details"
            >
              <span className="font-serif text-sm font-bold">i</span>
            </button>
          </div>
        </div>

        {/* Search within Chat Bar */}
        {showInChatSearch && (
          <div className="px-6 py-2.5 bg-surface-low dark:bg-surface-container border-b border-surface-dim flex items-center gap-3">
            <Search className="w-4 h-4 text-secondary" />
            <input
              type="text"
              value={inChatSearch}
              onChange={(e) => setInChatSearch(e.target.value)}
              placeholder="Search messages in this chat..."
              className="flex-1 bg-transparent border-none text-xs text-earth-indigo focus:outline-none placeholder:text-secondary font-sans"
              autoFocus
            />
            {inChatSearch && (
              <span className="text-[10px] text-secondary font-sans font-bold">
                {displayedMessages.length} found
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                setInChatSearch('');
                setShowInChatSearch(false);
              }}
              className="text-secondary hover:text-earth-indigo text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Message Timeline */}
        <MessageTimeline
          messages={displayedMessages}
          isTyping={isTyping}
          participantName={currentConversation.participant.name}
          participantAvatar={currentConversation.participant.avatarUrl}
          onReplyMessage={(msg) => setReplyingTo(msg)}
          onReactMessage={handleReactMessage}
          onSettleExpense={handleSettleExpense}
          searchHighlight={inChatSearch}
        />

        {/* Message Composer */}
        <MessageComposer
          onSendMessage={handleSendMessage}
          onSendRoomCard={handleSendRoomCard}
          onSendExpenseCard={handleSendExpenseCard}
          onSendAgreementCard={handleSendAgreementCard}
          onTypingStart={handleTypingStart}
          onTypingStop={handleTypingStop}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
        />
      </section>

      {/* Right Column: Context/Trust Panel (Collapsible on mobile and desktop) */}
      {showInfoPanel && (
        <ConversationContextPanel
          participant={currentConversation.participant}
          roomContext={currentConversation.roomContext}
        />
      )}
    </div>
  );
};

