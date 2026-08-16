import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../components/foundation/ThemeToggle.js';

export const SpatialLayout: React.FC = () => {
  const location = useLocation();
  const isRoomDetail = location.pathname.startsWith('/rooms/');

  return (
    <div className={`relative w-screen ${isRoomDetail ? 'min-h-screen overflow-y-auto' : 'h-screen overflow-hidden'} bg-clay text-earth-indigo transition-colors duration-200`}>
      {/* Top Floating Controls (on Spatial City) */}
      {!isRoomDetail && (
        <header className="absolute top-5 left-6 z-overlay flex items-center gap-3">
          <Link
            to="/discover"
            className="flex items-center gap-2 px-4 py-2 spatial-glass rounded-full text-ui-medium font-bold text-earth-indigo dark:text-white hover:border-vitality-coral transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Spatial View</span>
          </Link>
          <ThemeToggle />
        </header>
      )}

      {/* Main Viewport */}
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};
