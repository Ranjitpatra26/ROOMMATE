import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Sun, Moon, Coffee, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const residents = [
  {
    id: 'res-1',
    name: 'Ananya Sharma',
    role: 'Architect & Spatial Designer',
    city: 'Bengaluru • Indiranagar',
    chronotype: 'Early Bird (6:00 AM)',
    cleanliness: 'Pristine (5/5)',
    socialEnergy: 'Balanced (3/5)',
    matchScore: 98,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
    tags: ['Quiet Hours 10:30 PM', 'Plant Enthusiast', 'Pour-over Coffee'],
  },
  {
    id: 'res-2',
    name: 'Rohan Mehra',
    role: 'Product Lead & Vinyl Collector',
    city: 'Mumbai • Bandra West',
    chronotype: 'Flexible (7:30 AM)',
    cleanliness: 'High (4/5)',
    socialEnergy: 'Warm Extrovert (4/5)',
    matchScore: 94,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw',
    tags: ['Acoustic Vinyls', 'Culinary Host', 'Hybrid WFH'],
  },
  {
    id: 'res-3',
    name: 'Ishita Sen',
    role: 'Brand Strategist & Writer',
    city: 'Delhi-NCR • Hauz Khas',
    chronotype: 'Night Owl (9:00 AM)',
    cleanliness: 'Minimalist (5/5)',
    socialEnergy: 'Introvert Recharging (2/5)',
    matchScore: 96,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw',
    tags: ['Deep Focus Mornings', 'Tea Rituals', 'Zero Smoke'],
  },
];

export const InteractiveDNASimulator: React.FC = () => {
  const [selectedResident, setSelectedResident] = useState(residents[0]);
  const [cleanlinessSlider, setCleanlinessSlider] = useState(5);
  const [chronotypeTab, setChronotypeTab] = useState<'early' | 'flexible' | 'night'>('early');

  // Dynamic compatibility calculation based on user interactions
  const currentAffinity = Math.min(
    99,
    Math.max(
      88,
      selectedResident.matchScore +
        (cleanlinessSlider === 5 ? 1 : cleanlinessSlider === 4 ? 0 : -2) +
        (chronotypeTab === 'early' ? 1 : 0)
    )
  );

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 bg-white/70 dark:bg-[#151923]/80 backdrop-blur-2xl border border-surface-dim dark:border-white/10 shadow-2xl shadow-earth-indigo/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-surface-dim/70 dark:border-white/10">
        <div>
          <span className="text-label-caps text-vitality-coral font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Compatibility Engine
          </span>
          <h3 className="font-serif text-headline-md sm:text-headline-lg font-bold text-earth-indigo dark:text-white mt-1">
            Simulate Your Resident Affinity
          </h3>
        </div>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-earth-indigo text-white dark:bg-vitality-coral dark:text-white font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          <span>Sign In to Connect</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Simulator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Selectable Resident Cards */}
        <div className="lg:col-span-5 space-y-3">
          <label className="font-sans text-label-caps uppercase tracking-wider text-[11px] text-secondary dark:text-earth-fixed/70 font-semibold block mb-2">
            Select A Resident Profile:
          </label>
          {residents.map((resident) => {
            const isSelected = selectedResident.id === resident.id;
            return (
              <motion.div
                key={resident.id}
                onClick={() => setSelectedResident(resident)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                  isSelected
                    ? 'bg-earth-indigo text-white dark:bg-white/10 border-vitality-coral shadow-lg'
                    : 'bg-surface-low/80 dark:bg-[#121620]/60 border-surface-dim/60 dark:border-white/5 hover:border-earth-indigo/30 text-earth-indigo dark:text-white'
                }`}
              >
                <img
                  src={resident.avatar}
                  alt={resident.name}
                  className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-full object-cover ring-2 ring-vitality-coral/40 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-base truncate">{resident.name}</h4>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-vitality-coral text-white'
                          : 'bg-vitality-coral/15 text-vitality-coral'
                      }`}
                    >
                      {resident.matchScore}% Match
                    </span>
                  </div>
                  <p
                    className={`font-sans text-xs truncate ${
                      isSelected ? 'text-white/80' : 'text-secondary dark:text-earth-fixed/70'
                    }`}
                  >
                    {resident.role}
                  </p>
                  <span
                    className={`font-sans text-[10px] block mt-1 ${
                      isSelected ? 'text-white/60' : 'text-muted dark:text-earth-fixed/50'
                    }`}
                  >
                    {resident.city}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Matrix & Interactive Controls */}
        <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-surface-low/60 dark:bg-[#121620]/80 border border-surface-dim/70 dark:border-white/10 flex flex-col justify-between">
          <div>
            {/* Real-time Calculated Gauge */}
            <div className="flex items-center justify-between pb-6 border-b border-surface-dim/50 dark:border-white/10">
              <div>
                <span className="font-sans text-label-caps uppercase tracking-wider text-xs text-secondary dark:text-earth-fixed/70">
                  Calculated Compatibility
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-display-xs font-bold text-vitality-coral">
                    {currentAffinity}%
                  </span>
                  <span className="font-sans text-xs text-trust-teal font-semibold">
                    &bull; High Synergy Harmonic
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-trust-teal font-medium bg-trust-teal/10 px-3 py-1.5 rounded-full border border-trust-teal/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified History</span>
              </div>
            </div>

            {/* Interactive Preference Controls */}
            <div className="space-y-6 pt-6">
              {/* Chronotype Filter */}
              <div>
                <label className="font-sans text-label-caps uppercase tracking-wider text-[11px] text-earth-indigo dark:text-white font-bold block mb-2.5">
                  Your Chronotype Alignment:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setChronotypeTab('early')}
                    className={`py-2 px-3 rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      chronotypeTab === 'early'
                        ? 'bg-earth-indigo text-white dark:bg-vitality-coral dark:text-white shadow-sm'
                        : 'bg-white dark:bg-white/5 text-secondary dark:text-earth-fixed/70 border border-surface-dim dark:border-white/10'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Early (6 AM)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChronotypeTab('flexible')}
                    className={`py-2 px-3 rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      chronotypeTab === 'flexible'
                        ? 'bg-earth-indigo text-white dark:bg-vitality-coral dark:text-white shadow-sm'
                        : 'bg-white dark:bg-white/5 text-secondary dark:text-earth-fixed/70 border border-surface-dim dark:border-white/10'
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Flexible (8 AM)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChronotypeTab('night')}
                    className={`py-2 px-3 rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      chronotypeTab === 'night'
                        ? 'bg-earth-indigo text-white dark:bg-vitality-coral dark:text-white shadow-sm'
                        : 'bg-white dark:bg-white/5 text-secondary dark:text-earth-fixed/70 border border-surface-dim dark:border-white/10'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Night Owl</span>
                  </button>
                </div>
              </div>

              {/* Cleanliness Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-sans text-label-caps uppercase tracking-wider text-[11px] text-earth-indigo dark:text-white font-bold">
                    Cleanliness Standard:
                  </label>
                  <span className="font-sans text-xs font-bold text-vitality-coral">
                    Level {cleanlinessSlider} of 5 (Pristine)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={cleanlinessSlider}
                  onChange={(e) => setCleanlinessSlider(Number(e.target.value))}
                  className="w-full accent-vitality-coral cursor-pointer h-2 bg-surface-dim dark:bg-white/20 rounded-lg"
                />
              </div>

              {/* Tags */}
              <div className="pt-2">
                <span className="font-sans text-[11px] text-secondary dark:text-earth-fixed/60 block mb-2 font-medium">
                  Shared Living Traits:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedResident.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-sans px-3 py-1 rounded-full bg-white dark:bg-white/5 text-earth-indigo dark:text-white border border-surface-dim/80 dark:border-white/10 font-medium flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3 h-3 text-vitality-coral" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Login Link CTA */}
          <div className="mt-8 pt-4 border-t border-surface-dim/50 dark:border-white/10 flex items-center justify-between">
            <span className="font-sans text-xs text-secondary dark:text-earth-fixed/60">
              Ready to find your harmonious living match?
            </span>
            <Link
              to="/login"
              className="font-sans text-xs font-bold text-vitality-coral hover:underline inline-flex items-center gap-1"
            >
              <span>Sign In to Message {selectedResident.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
