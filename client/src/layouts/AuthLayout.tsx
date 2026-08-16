import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-clay text-earth-indigo">
      {/* Left Editorial Column */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 lg:p-20 bg-earth-indigo text-clay relative overflow-hidden">
        <Link to="/" className="z-10">
          <span className="font-serif text-headline-md font-bold tracking-tight text-clay">
            ROOMMATE
          </span>
        </Link>

        <div className="z-10 max-w-md my-auto">
          <span className="text-label-caps text-vitality-coral font-bold tracking-[0.15em] mb-4 block">
            The Living OS
          </span>
          <h2 className="font-serif text-headline-lg font-normal leading-[1.15] mb-6">
            Where human connection meets physical space.
          </h2>
          <p className="font-sans text-body-md text-clay/70 leading-relaxed">
            Move beyond transactional apartment listings to identity-driven roommate compatibility and verified living history.
          </p>
        </div>

        <div className="z-10 text-metadata text-clay/50">
          <span>Protected by Roommate Trust Protocol</span>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-vitality-coral/10 blur-3xl pointer-events-none" />
      </div>

      {/* Right Form Column */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-20">
        <div className="md:hidden flex items-center justify-between pb-6 border-b border-earth-indigo/10 mb-8">
          <Link to="/">
            <span className="font-serif text-headline-sm font-bold text-earth-indigo">
              ROOMMATE
            </span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-8">
          <Outlet />
        </div>

        <div className="text-center text-metadata text-earth-indigo/50 py-4">
          <span>&copy; 2026 ROOMMATE Living OS</span>
        </div>
      </div>
    </div>
  );
};
