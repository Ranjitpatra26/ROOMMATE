import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container } from '../components/foundation/Container.js';
import { GlobalNavbar } from '../components/navigation/index.js';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-clay text-earth-indigo transition-colors duration-200">
      {/* Canonical Top Navigation */}
      <GlobalNavbar variant="public" />

      {/* Main Public Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Editorial Footer */}
      <footer className="w-full border-t border-surface-dim/50 py-12 bg-clay transition-colors duration-200">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-6 text-secondary text-metadata">
          <div>
            <p className="font-serif text-body-md font-bold text-earth-indigo">ROOMMATE</p>
            <p className="mt-0.5">ROOMMATE &copy; 2026. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/stay/safety" className="hover:text-earth-indigo transition-colors">
              Privacy & Safety
            </Link>
            <Link to="/trust/me" className="hover:text-earth-indigo transition-colors">
              Trust Ledger
            </Link>
            <Link to="/stay/agreement/builder" className="hover:text-earth-indigo transition-colors">
              Spatial Governance
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
};
