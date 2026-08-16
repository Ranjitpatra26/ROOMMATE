import React from 'react';
import { Container } from '../components/foundation/Container';
import { Typography } from '../components/foundation/Typography';
import { Badge } from '../components/foundation/Badge';
import { PageTransition } from '../components/motion/PageTransition';

export interface PageScaffoldProps {
  name: string;
  route: string;
  stitchId?: string;
  domain: string;
  children?: React.ReactNode;
}

export const PageScaffold: React.FC<PageScaffoldProps> = ({
  name,
  route,
  stitchId,
  domain,
  children,
}) => {
  return (
    <PageTransition className="py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl mx-auto p-8 sm:p-12 bg-clay border border-earth-indigo/15 rounded-md shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-earth-indigo/10">
            <div className="space-y-1">
              <Badge variant="vitality">{domain}</Badge>
              <Typography variant="headline-lg" className="mt-2">
                {name}
              </Typography>
            </div>
            <Badge variant="trust">Phase 3: Scaffold Ready</Badge>
          </div>

          <div className="space-y-3 font-mono text-body-sm text-earth-indigo/70 bg-clay-low p-4 rounded-sm border border-earth-indigo/10 mb-8">
            <div className="flex justify-between">
              <span className="font-bold">Canonical Route:</span>
              <span className="text-earth-indigo">{route}</span>
            </div>
            {stitchId && (
              <div className="flex justify-between">
                <span className="font-bold">Stitch Screen ID:</span>
                <span className="text-earth-indigo/60">{stitchId}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-bold">Status:</span>
              <span className="text-trust-teal font-semibold">Structural Shell Loaded</span>
            </div>
          </div>

          {children || (
            <Typography variant="body-md" className="text-earth-indigo/60">
              This route is established and ready for Phase 4 production screen implementation against the canonical Kinship Editorial design tokens.
            </Typography>
          )}
        </div>
      </Container>
    </PageTransition>
  );
};
