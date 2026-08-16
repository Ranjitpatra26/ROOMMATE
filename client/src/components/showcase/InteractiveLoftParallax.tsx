import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Bed, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const spaces = [
  {
    id: 'space-1',
    title: 'The Indiranagar Solarium Penthouse',
    location: 'Indiranagar, Bengaluru',
    price: '₹28,500/mo',
    type: 'Private En-Suite Loft',
    residentsCount: '2 Verified Residents',
    image: '/images/editorial/roommate_hero_cover.jpg',
    amenities: ['Private Terrace', 'Fiber 1Gbps', 'Daily Housekeeping'],
    badge: 'Curated Architectural Loft',
  },
  {
    id: 'space-2',
    title: 'Bandra West Coastal Minimalist Loft',
    location: 'Pali Hill, Mumbai',
    price: '₹42,000/mo',
    type: 'Master Suite Sanctuary',
    residentsCount: '2 Verified Residents',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Sea Breeze Balcony', 'Acoustic Soundproofing', 'Chef Kitchen'],
    badge: 'Sea-Facing Co-Living',
  },
  {
    id: 'space-3',
    title: 'Hauz Khas Reservoir Garden Studio',
    location: 'Hauz Khas Village, Delhi-NCR',
    price: '₹32,000/mo',
    type: 'Art Studio & Loft',
    residentsCount: '1 Resident Host',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Lake View', 'Ergonomic Workspace', 'Quiet Policy'],
    badge: 'Heritage Nature Studio',
  },
];

export const InteractiveLoftParallax: React.FC = () => {
  const [activeSpace, setActiveSpace] = useState(spaces[0]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {spaces.map((space) => {
          const isActive = activeSpace.id === space.id;
          return (
            <motion.div
              key={space.id}
              onMouseEnter={() => setActiveSpace(space)}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between bg-white/70 dark:bg-[#151923]/80 backdrop-blur-xl ${
                isActive
                  ? 'border-vitality-coral shadow-2xl shadow-vitality-coral/15 ring-2 ring-vitality-coral/20'
                  : 'border-surface-dim/70 dark:border-white/10 shadow-lg'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    // Fallback to beautiful cover
                    (e.target as HTMLImageElement).src = '/images/editorial/roommate_hero_cover.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {space.badge}
                  </span>
                </div>

                {/* Price */}
                <div className="absolute bottom-3 right-3">
                  <span className="font-serif font-bold text-lg text-white bg-vitality-coral/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-md">
                    {space.price}
                  </span>
                </div>
              </div>

              {/* Space Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-secondary dark:text-earth-fixed/60 text-xs mb-1">
                    <MapPin className="w-3.5 h-3.5 text-vitality-coral shrink-0" />
                    <span>{space.location}</span>
                  </div>
                  <h4 className="font-serif text-headline-sm font-bold text-earth-indigo dark:text-white leading-snug">
                    {space.title}
                  </h4>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-2 border-t border-surface-dim/60 dark:border-white/10">
                  <div className="flex items-center justify-between text-xs text-secondary dark:text-earth-fixed/70">
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-trust-teal" />
                      {space.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-trust-teal" />
                      {space.residentsCount}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {space.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-surface-low dark:bg-white/5 text-earth-indigo dark:text-white border border-surface-dim/50 dark:border-white/5"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <Link
                  to="/login"
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-earth-indigo text-white dark:bg-white/10 hover:bg-vitality-coral dark:hover:bg-vitality-coral font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors group"
                >
                  <span>Sign In to Apply</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
