import React from 'react';
import { Heart } from 'lucide-react';

export interface OrbitalCompatibilityProps {
  centerImage?: string;
  userImages?: string[];
  className?: string;
}

export const OrbitalCompatibility: React.FC<OrbitalCompatibilityProps> = ({
  centerImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAJHFXLlm5xbwXI4S74Wd3EBboFU_rN5VloZMz-6hQyX2WvGqcbxEyzqkKOoKWJ5IL9iaYa6ELRYASufgwaDEy4wmylmBQCmmii23lbstgzgbYNqnL3ZuU00gWGGUEErcQDNXzbRg7v7WcDdKf0ZzcnCobNHq4gpZeeRIa4vy5PvAaWb5GNAGvI6PA8oA9aXBgtLnLIFo6IJ1J1g6xti0_yZp9-_g88FCfvhwdwM13m22RjgCZlNEe2Jw",
  userImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCv3pDIQktysIEhj9VSO4UN7MfEUtlnZD4t7t5lJ7KUkCEvy-3Vd7JJWOrtMK-YjGfORSj2CDgySDSLJgok8M42KGxQrzmiTg6GEIIs6VpfeYYf1v_jhxMbRiyfzMqHYmeAnXlaTywmXQ3eCSnOACEXtGeKjB4qJttRugMlb2VtsQBKH8JRWbGRI4fV1hSdMX6d6TB5t2mCOOKdOGeDR-dJVYJ9lRl1WpWZKf3l-xsdCu_VC8VqJus51Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBpKQtsz42T2-18Mye4CcQ_2-PrsPo6fhiGkJpRr8OdC0KyXfUQ7_RZFcWjx2soe78J3X_Rh9-pzUuVEnpICZJb7dc4GcCkP9smiJOOpr31WYGcuPHuh-jovfiluQuqAflR1YnJ1WkclofmKutFZTDEjcway5YIVnhurzk6UkHde0AzSnvRMCj7V_7isEjvcBTewwVSlHMGwq1qYDRCgjUWCi4q3XmVZQa9qMI2SkKiSN-hVeLFaIlxPA"
  ],
  className = "",
}) => {
  return (
    <div className={`relative w-full max-w-md aspect-square flex items-center justify-center ${className}`}>
      {/* Concentric Rotating Orbital Rings */}
      <div className="absolute inset-0 border border-outline-variant/30 rounded-full animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-8 border border-outline-variant/50 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute inset-16 border border-outline-variant/70 rounded-full animate-[spin_25s_linear_infinite]" />

      {/* Center Profile Anchor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-clay bg-clay-container z-20 shadow-xl">
        <img
          src={centerImage}
          alt="Primary User Profile"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Orbiting Satellite Node 1 (Top) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 border-clay bg-clay-container z-10 shadow-lg hover:scale-110 transition-transform">
        <img
          src={userImages[0]}
          alt="Compatible Roommate Match"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Orbiting Satellite Node 2 (Bottom Right) */}
      <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full overflow-hidden border-2 border-clay bg-clay-container z-10 shadow-lg hover:scale-110 transition-transform">
        <img
          src={userImages[1]}
          alt="Compatible Roommate Match"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Vitality Affinity Heart Node */}
      <div className="absolute top-16 left-6 w-10 h-10 rounded-full bg-vitality-fixed flex items-center justify-center z-10 border border-vitality-coral/40 shadow-sm animate-pulse">
        <Heart className="w-4 h-4 text-vitality-coral fill-vitality-coral" />
      </div>
    </div>
  );
};
