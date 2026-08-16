import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { GlobalNavbar } from '../components/navigation/index.js';
import { MAIN_NAV_ITEMS, isRouteActive } from '../config/navigation.js';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-clay text-earth-indigo pb-24 md:pb-0 transition-colors duration-200">
      {/* Canonical Top Navigation Bar */}
      <GlobalNavbar variant="app" />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Mobile Living Dock (Floating Bottom Navigation) */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-nav bg-clay/95 backdrop-blur-[20px] border border-surface-dim rounded-full shadow-2xl px-5 py-2 flex items-center justify-around transition-colors">
        {MAIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isRouteActive(location.pathname, item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center p-1.5 transition-all relative cursor-pointer ${
                active ? 'text-earth-indigo scale-105 font-bold' : 'text-secondary'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-vitality-coral' : ''}`} />
              <span className="text-[9px] tracking-wider uppercase mt-1">
                {item.name}
              </span>
              {active && <span className="w-1 h-1 bg-vitality-coral rounded-full mt-0.5" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
