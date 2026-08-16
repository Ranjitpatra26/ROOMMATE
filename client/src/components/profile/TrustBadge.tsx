import React from 'react';
import { BadgeCheck, History, CheckCircle2 } from 'lucide-react';

export interface TrustBadgeProps {
  level?: number;
  verifiedId?: boolean;
  cohabitationsCount?: number;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  cohabitationsCount = 4,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-xl border border-surface-dim bg-clay/70 backdrop-blur-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center text-earth-indigo shadow-sm">
            <BadgeCheck className="w-5 h-5 text-trust-teal" />
          </div>
          <div>
            <h4 className="font-sans text-ui-medium font-semibold text-earth-indigo">
              Government ID Verification
            </h4>
            <p className="font-sans text-xs text-secondary">Verified & Biometrically Matched</p>
          </div>
        </div>
        <CheckCircle2 className="w-5 h-5 text-trust-teal fill-trust-teal/10" />
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl border border-surface-dim bg-clay/70 backdrop-blur-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center text-earth-indigo shadow-sm">
            <History className="w-5 h-5 text-earth-indigo" />
          </div>
          <div>
            <h4 className="font-sans text-ui-medium font-semibold text-earth-indigo">
              Reputation Ledger
            </h4>
            <p className="font-sans text-xs text-secondary">
              {cohabitationsCount} Verified Past Co-habitations
            </p>
          </div>
        </div>
        <CheckCircle2 className="w-5 h-5 text-trust-teal fill-trust-teal/10" />
      </div>
    </div>
  );
};
