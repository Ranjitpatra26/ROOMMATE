import React from 'react';
import { Star } from 'lucide-react';

export const TrustTimeline: React.FC = () => {
  const events = [
    {
      period: 'Nov 2025 – Present',
      title: 'The Indiranagar Garden Flat',
      location: 'Indiranagar, Bengaluru',
      quote: 'Exceptional communication and absolute respect for morning stillness and filter coffee routines. Highly punctual with UPI utility contributions.',
      tags: ['Airtel Fiber Split', 'Clean Kitchen', 'Quiet Hours'],
    },
    {
      period: 'Jan 2024 – Oct 2025',
      title: 'The Bandra Heritage Duplex',
      location: 'Pali Hill, Bandra West, Mumbai',
      quote: 'A peaceful and collaborative flatmate throughout. Zero delayed rent transfers, and respected common workspace boundaries effortlessly.',
      tags: ['Financial Reliability', 'Aadhaar Verified'],
    },
  ];

  return (
    <div className="relative pl-6 md:pl-0 space-y-12">
      {/* Central Timeline Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-surface-dim -translate-x-1/2" />

      {events.map((e, idx) => (
        <div
          key={idx}
          className="relative flex flex-col md:flex-row md:justify-between items-center w-full"
        >
          {/* Left Column (Period on Desktop) */}
          <div className="hidden md:block w-[45%] text-right pr-8">
            <span className="font-sans text-label-caps text-vitality-coral font-bold text-xs">
              {e.period}
            </span>
            <div className="font-sans text-xs text-secondary mt-0.5">{e.location}</div>
          </div>

          {/* Center Timeline Node Dot */}
          <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-vitality-coral border-4 border-clay dark:border-earth-container -translate-x-1/2 shadow-lg shadow-vitality-coral/40" />

          {/* Right Column (Card on Desktop) */}
          <div className="w-full md:w-[45%] pl-10 md:pl-8">
            <div className="bg-clay dark:bg-surface-low border border-surface-dim p-6 rounded-2xl shadow-sm hover:border-earth-indigo transition-all text-earth-indigo">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-serif text-headline-sm font-semibold text-earth-indigo">
                  {e.title}
                </h4>
                <div className="flex text-vitality-coral">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-vitality-coral text-vitality-coral" />
                  ))}
                </div>
              </div>
              <p className="font-serif italic text-sm text-secondary mb-4 leading-relaxed">
                "{e.quote}"
              </p>
              <div className="flex gap-2 flex-wrap">
                {e.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full border border-surface-dim bg-surface-low text-[11px] font-sans font-semibold text-earth-indigo"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
