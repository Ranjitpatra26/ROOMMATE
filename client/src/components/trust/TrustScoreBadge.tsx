import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface TrustScoreBadgeProps {
  score: number;
  tier: 'unverified' | 'id_verified' | 'background_cleared' | 'kinship_certified';
  verifiedStaysCount: number;
  governmentIdVerified: boolean;
}

export const TrustScoreBadge: React.FC<TrustScoreBadgeProps> = ({
  score,
  tier,
  verifiedStaysCount,
  governmentIdVerified,
}) => {
  const tierLabels = {
    unverified: 'Unverified Tier',
    id_verified: 'Identity Verified',
    background_cleared: 'Background Cleared',
    kinship_certified: 'Tier-1 Roommate Certified',
  };

  return (
    <div className="bg-clay border border-surface-dim rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
            Reputation Index
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-serif text-headline-lg font-bold text-earth-indigo">
              {score}
            </span>
            <span className="font-sans text-xs text-secondary">/ 990</span>
          </div>
        </div>
        <span className="px-3.5 py-1.5 bg-trust-teal/15 text-trust-teal border border-trust-teal/30 rounded-full font-sans text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>{tierLabels[tier]}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-surface-dim pt-4 text-xs font-sans">
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`w-4 h-4 ${governmentIdVerified ? 'text-trust-teal' : 'text-secondary'}`} />
          <span className="font-bold text-earth-indigo">Government ID</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-trust-teal" />
          <span className="font-bold text-earth-indigo">{verifiedStaysCount} Verified Stays</span>
        </div>
      </div>
    </div>
  );
};
