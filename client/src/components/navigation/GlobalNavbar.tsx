import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Container } from '../foundation/Container.js';
import { Button } from '../foundation/Button.js';
import { ThemeToggle } from '../foundation/ThemeToggle.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import {
  MAIN_NAV_ITEMS,
  OPERATIONAL_NAV_ITEMS,
  PROFILE_NAV_ITEMS,
  isRouteActive,
} from '../../config/navigation.js';
import {
  MessageSquare,
  ShieldCheck,
  User,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export interface GlobalNavbarProps {
  /**
   * Optional variant override.
   * - 'auto' (default): automatically decides based on route and auth state
   * - 'public': strictly unauthenticated landing style
   * - 'app': full authenticated application navigation
   */
  variant?: 'auto' | 'public' | 'app';
}

export const GlobalNavbar: React.FC<GlobalNavbarProps> = ({ variant = 'auto' }) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Determine whether to display the full app navigation vs the public landing CTA
  const isAppMode =
    variant === 'app' ||
    (variant === 'auto' &&
      (isAuthenticated ||
        location.pathname.startsWith('/discover') ||
        location.pathname.startsWith('/spatial') ||
        location.pathname.startsWith('/compatibility-lab') ||
        location.pathname.startsWith('/matches') ||
        location.pathname.startsWith('/rooms') ||
        location.pathname.startsWith('/messages') ||
        location.pathname.startsWith('/trust') ||
        location.pathname.startsWith('/reviews') ||
        location.pathname.startsWith('/stay') ||
        location.pathname.startsWith('/travel') ||
        location.pathname.startsWith('/profile') ||
        location.pathname.startsWith('/onboarding')));

  return (
    <>
      {/* Canonical Top Navigation Bar */}
      <header className="sticky top-0 z-nav w-full bg-clay/90 dark:bg-earth-container/90 backdrop-blur-[20px] border-b border-surface-dim/50 transition-colors duration-200">
        <Container className="h-20 flex items-center justify-between">
          {/* Left: Canonical Brand Logo & Living OS Tag */}
          <div className="flex items-center gap-8 lg:gap-10">
            <Link
              to="/"
              className="flex items-center gap-2 group cursor-pointer shrink-0"
              onClick={closeMobileMenu}
            >
              <span className="font-serif text-headline-sm font-bold tracking-tight text-earth-indigo">
                ROOMMATE
              </span>
            </Link>

            {/* Center: Desktop Canonical Navigation Links (App Mode) */}
            {isAppMode && (
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {MAIN_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = isRouteActive(location.pathname, item.path);
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center gap-2 text-ui-medium py-1.5 transition-colors relative cursor-pointer ${
                        active
                          ? 'text-earth-indigo font-bold'
                          : 'text-earth-indigo/70 hover:text-earth-indigo font-medium'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-vitality-coral' : ''}`} />
                      <span>{item.name}</span>
                      {active && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 32,
                          }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-vitality-coral rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right: Controls & Context Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {isAppMode ? (
              <>
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Direct Messages */}
                <Link
                  to="/messages/conversation-ananya"
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isRouteActive(location.pathname, '/messages')
                      ? 'text-vitality-coral bg-vitality-coral/10'
                      : 'text-earth-indigo/70 hover:text-earth-indigo hover:bg-surface-low'
                  }`}
                  title="Direct Messages"
                  aria-label="Direct Messages"
                >
                  <MessageSquare className="w-5 h-5" />
                </Link>

                {/* Trust Ledger */}
                <Link
                  to="/trust/me"
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isRouteActive(location.pathname, '/trust')
                      ? 'text-trust-teal bg-trust-teal/15'
                      : 'text-earth-indigo/70 hover:text-earth-indigo hover:bg-surface-low'
                  }`}
                  title="Trust & Reputation Ledger"
                  aria-label="Trust Ledger"
                >
                  <ShieldCheck className="w-5 h-5 text-trust-teal" />
                </Link>

                {/* My DNA Profile Pill */}
                <Link
                  to="/profile/me"
                  className={`flex items-center gap-2 p-1 pl-2.5 rounded-full border transition-all cursor-pointer ${
                    isRouteActive(location.pathname, '/profile')
                      ? 'border-vitality-coral bg-vitality-coral/10'
                      : 'bg-surface-low border-surface-dim hover:border-earth-indigo/30'
                  }`}
                  title="My Profile DNA"
                >
                  <span className="text-label-caps text-earth-indigo font-bold hidden sm:inline">
                    My DNA
                  </span>
                  <div className="w-7 h-7 rounded-full bg-earth-indigo text-clay flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                </Link>

                {/* Small Circular Reveal Button */}
                <Link
                  to="/reveal"
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-vitality-coral/40 bg-vitality-coral/10 hover:bg-vitality-coral text-vitality-coral hover:text-white transition-all duration-200 shadow-sm hover:shadow-vitality-coral/25 hover:scale-105 cursor-pointer group shrink-0 relative"
                  title="Reveal Showcase"
                  aria-label="Reveal Showcase"
                >
                  <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-vitality-coral" />
                </Link>

                {/* Mobile Menu Toggle Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-full text-earth-indigo hover:bg-surface-low transition-colors cursor-pointer ml-1"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/discover"
                  className="text-body-sm font-semibold text-earth-indigo/80 hover:text-earth-indigo transition-colors hidden xs:inline"
                >
                  Discover
                </Link>
                <Link
                  to="/login"
                  className="text-body-sm font-semibold text-earth-indigo/80 hover:text-earth-indigo transition-colors"
                >
                  Sign In
                </Link>
                <ThemeToggle />
                <Link to="/onboarding/chapter-1">
                  <Button size="sm" variant="primary" className="font-bold cursor-pointer">
                    Enter Visual DNA
                  </Button>
                </Link>
                {/* Small Circular Reveal Button */}
                <Link
                  to="/reveal"
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-vitality-coral/40 bg-vitality-coral/10 hover:bg-vitality-coral text-vitality-coral hover:text-white transition-all duration-200 shadow-sm hover:shadow-vitality-coral/25 hover:scale-105 cursor-pointer group shrink-0 relative ml-1"
                  title="Reveal Showcase"
                  aria-label="Reveal Showcase"
                >
                  <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-vitality-coral animate-ping opacity-75" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-vitality-coral" />
                </Link>
              </>
            )}
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu with Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Mobile Drawer Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.2 }}
              className="fixed inset-0 z-40 bg-earth-indigo/40 dark:bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Drawer Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.28, ease: [0.19, 1, 0.22, 1] }}
              className="fixed top-20 right-0 bottom-0 z-50 w-full max-w-sm bg-clay dark:bg-surface-low border-l border-surface-dim p-6 shadow-2xl overflow-y-auto lg:hidden"
            >
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-vitality-coral block mb-3">
                    Explore & Spaces
                  </span>
                  <div className="space-y-1">
                    {MAIN_NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const active = isRouteActive(location.pathname, item.path);
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={closeMobileMenu}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                            active
                              ? 'bg-earth-indigo text-clay font-bold'
                              : 'text-earth-indigo hover:bg-surface-low'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${active ? 'text-vitality-coral' : 'text-secondary'}`} />
                          <div className="flex-1">
                            <div className="font-serif text-sm font-bold">{item.name}</div>
                            {item.description && (
                              <div className="text-[10px] text-secondary line-clamp-1">{item.description}</div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-dim">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-vitality-coral block mb-3">
                    Living OS & Tenancy
                  </span>
                  <div className="space-y-1">
                    {OPERATIONAL_NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const active = isRouteActive(location.pathname, item.path);
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={closeMobileMenu}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                            active
                              ? 'bg-earth-indigo text-clay font-bold'
                              : 'text-earth-indigo hover:bg-surface-low'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${active ? 'text-vitality-coral' : 'text-secondary'}`} />
                          <div className="flex-1">
                            <div className="font-serif text-sm font-bold">{item.name}</div>
                            {item.description && (
                              <div className="text-[10px] text-secondary line-clamp-1">{item.description}</div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-dim">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-vitality-coral block mb-3">
                    Identity & Trust
                  </span>
                  <div className="space-y-1">
                    {PROFILE_NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const active = isRouteActive(location.pathname, item.path);
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={closeMobileMenu}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                            active
                              ? 'bg-earth-indigo text-clay font-bold'
                              : 'text-earth-indigo hover:bg-surface-low'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${active ? 'text-vitality-coral' : 'text-secondary'}`} />
                          <div className="flex-1">
                            <div className="font-serif text-sm font-bold">{item.name}</div>
                            {item.description && (
                              <div className="text-[10px] text-secondary line-clamp-1">{item.description}</div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
