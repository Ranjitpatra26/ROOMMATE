import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserCheck, Home, Sparkles, Network, BookmarkCheck, Check } from 'lucide-react';
import { motion } from 'motion/react';

export interface OnboardingSidebarProps {
  currentChapter: 1 | 2 | 3 | 4;
  userAvatar?: string;
  onSaveProgress?: () => void;
}

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({
  currentChapter,
  userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP--n4jsuUg_QhblCugKGaXaEIg45fGdVCQAMMLBFvT-MaK1wjykvVFcCyCFt7AEXrc8hxeRBUVIXDUs21-ZzBQmykP3998CrxKyfNZcxbpBL-5W5bi5naAsUM6G9RPm3ohmHlkIoNkiDk4iBle7T0afKZksl3KR77cqfGUBQQBJ8IkvXkf5e4Elc55SUw85e1EI2VgjGOsvjnfIKaPcS4Dofp_36j3SWhCeniG_jBRN7pIdW9BNr1eQ',
  onSaveProgress,
}) => {
  const location = useLocation();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (onSaveProgress) {
      onSaveProgress();
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const steps = [
    {
      label: 'The Persona',
      chapter: 1,
      path: '/onboarding/chapter-1',
      icon: <UserCheck className="w-5 h-5" />,
      desc: 'Identity & Budget',
    },
    {
      label: 'Living Habits',
      chapter: 2,
      path: '/onboarding/chapter-2',
      icon: <Home className="w-5 h-5" />,
      desc: 'Rhythms & Cleanliness',
    },
    {
      label: 'Social DNA',
      chapter: 3,
      path: '/onboarding/chapter-3',
      icon: <Network className="w-5 h-5" />,
      desc: 'Hosting & Work Style',
    },
    {
      label: 'Match Affinity',
      chapter: 4,
      path: '/onboarding/chapter-4',
      icon: <Sparkles className="w-5 h-5" />,
      desc: 'Vibe Fit & Dealbreakers',
    },
  ];

  const chapterTitles: Record<number, string> = {
    1: 'Identity & Essence',
    2: 'Living Habits',
    3: 'Social DNA',
    4: 'Match Affinity',
  };

  return (
    <nav className="hidden lg:flex flex-col p-8 fixed left-0 top-0 h-screen w-72 bg-clay dark:bg-[#121620] border-r border-surface-dim dark:border-white/10 z-40 transition-colors">
      {/* Brand Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="font-serif text-headline-md font-bold tracking-tight text-[#1a1f2c] dark:text-[#fcf8fa] cursor-pointer flex items-center gap-2"
        >
          <span>ROOMMATE</span>
          <span className="text-[10px] text-vitality-coral font-sans font-bold px-1.5 py-0.5 rounded bg-vitality-coral/10 uppercase tracking-widest">
            DNA
          </span>
        </Link>
      </div>

      {/* Current Chapter Hero Badge */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-surface-dim dark:border-white/10">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-vitality-coral/50 shrink-0 bg-surface-high">
          <img src={userAvatar} alt="Profile preview" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-sans text-label-caps text-vitality-coral uppercase font-bold tracking-wider text-[10px]">
            Chapter 0{currentChapter}
          </div>
          <div className="font-serif text-headline-sm font-semibold text-[#1a1f2c] dark:text-[#fcf8fa]">
            {chapterTitles[currentChapter] || 'Onboarding'}
          </div>
        </div>
      </div>

      {/* Chapters Nav List */}
      <ul className="flex-1 space-y-2.5">
        {steps.map((step) => {
          const isActive =
            location.pathname === step.path || currentChapter === step.chapter;

          return (
            <li key={step.chapter}>
              <Link
                to={step.path}
                className={`flex items-center gap-3 py-3 px-3.5 rounded-xl transition-all font-sans text-ui-medium cursor-pointer relative ${
                  isActive
                    ? 'bg-[#1a1f2c] text-white dark:bg-white/15 dark:text-[#fcf8fa] font-bold shadow-md'
                    : 'text-[#525763] dark:text-[#9aa2b4] hover:bg-surface-dim/40 dark:hover:bg-white/5 hover:text-[#1a1f2c] dark:hover:text-white'
                }`}
              >
                <div
                  className={`shrink-0 ${
                    isActive ? 'text-vitality-coral' : 'text-[#525763] dark:text-[#9aa2b4]'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-white dark:text-[#fcf8fa]' : ''}`}>
                    {step.label}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      isActive ? 'text-white/80 dark:text-[#c5cbd8]' : 'text-[#525763]/80 dark:text-[#9aa2b4]/80'
                    }`}
                  >
                    {step.desc}
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="sidebarActivePill"
                    className="w-1.5 h-6 bg-vitality-coral rounded-full"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Save Progress Footer Button */}
      <div className="mt-auto pt-6 border-t border-surface-dim dark:border-white/10 space-y-2">
        <button
          type="button"
          onClick={handleSave}
          className={`w-full py-3 px-4 border rounded-xl font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
            saved
              ? 'bg-trust-teal text-white border-trust-teal shadow-trust-teal/30 scale-102'
              : 'border-surface-dim dark:border-white/20 hover:border-earth-indigo text-[#1a1f2c] dark:text-[#fcf8fa] bg-surface-low dark:bg-white/5 hover:bg-surface-dim/30'
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Progress Saved & Synced!</span>
            </>
          ) : (
            <>
              <BookmarkCheck className="w-4 h-4 text-trust-teal" />
              <span>Save Progress</span>
            </>
          )}
        </button>
        <span className="text-[10px] text-[#525763] dark:text-[#9aa2b4] text-center block font-sans">
          Auto-saves locally to your browser
        </span>
      </div>
    </nav>
  );
};
