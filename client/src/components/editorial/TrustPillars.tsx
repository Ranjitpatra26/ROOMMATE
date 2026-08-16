import React from 'react';
import { BadgeCheck, Star, ShieldCheck } from 'lucide-react';

export const TrustPillars: React.FC = () => {
  const pillars = [
    {
      icon: <BadgeCheck className="w-8 h-8 text-vitality-coral mb-4" />,
      title: "Identity Verification",
      description: "Multi-tier background checks, photo identification, and real-time credential validation for every member.",
    },
    {
      icon: <Star className="w-8 h-8 text-vitality-coral mb-4" />,
      title: "Reputation Ledger",
      description: "Transparent, community-driven history of verified past stays and verified roommate peer endorsements.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-vitality-coral mb-4" />,
      title: "Secure Agreements & Escrow",
      description: "Automated rent splitting, legally sound co-living contracts, and deposit escrow handled natively.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      {pillars.map((p, idx) => (
        <div
          key={idx}
          className="p-8 rounded-2xl bg-white/[0.08] dark:bg-black/[0.04] border border-white/15 dark:border-black/10 backdrop-blur-sm hover:bg-white/[0.12] dark:hover:bg-black/[0.07] hover:border-vitality-coral/40 transition-all duration-300 group"
        >
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {p.icon}
          </div>
          <h4 className="font-serif text-headline-sm text-white dark:text-[#1a1f2c] mb-2 font-semibold transition-colors">
            {p.title}
          </h4>
          <p className="font-sans text-body-md text-white/80 dark:text-[#525763] text-sm leading-relaxed transition-colors">
            {p.description}
          </p>
        </div>
      ))}
    </div>
  );
};
