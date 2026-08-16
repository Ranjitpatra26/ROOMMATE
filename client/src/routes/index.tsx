import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { PublicLayout, AuthLayout, AppLayout, SpatialLayout } from '../layouts';

// Lazy-loaded Page Components for Performance & Code Splitting
const LandingPage = lazy(() => import('../pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('../pages/AuthPages').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/AuthPages').then(m => ({ default: m.RegisterPage })));
const OnboardingChapter1Page = lazy(() => import('../pages/OnboardingPages').then(m => ({ default: m.OnboardingChapter1Page })));
const OnboardingChapter2Page = lazy(() => import('../pages/OnboardingPages').then(m => ({ default: m.OnboardingChapter2Page })));
const OnboardingChapter3Page = lazy(() => import('../pages/OnboardingPages').then(m => ({ default: m.OnboardingChapter3Page })));
const OnboardingChapter4Page = lazy(() => import('../pages/OnboardingPages').then(m => ({ default: m.OnboardingChapter4Page })));
const DiscoveryPage = lazy(() => import('../pages/CorePages').then(m => ({ default: m.DiscoveryPage })));
const ProfilePage = lazy(() => import('../pages/CorePages').then(m => ({ default: m.ProfilePage })));
const CompatibilityLabPage = lazy(() => import('../pages/CorePages').then(m => ({ default: m.CompatibilityLabPage })));
const SpatialCityPage = lazy(() => import('../pages/CorePages').then(m => ({ default: m.SpatialCityPage })));
const RoomDetailPage = lazy(() => import('../pages/CorePages').then(m => ({ default: m.RoomDetailPage })));
const MatchRevealPage = lazy(() => import('../pages/CorePages').then(m => ({ default: m.MatchRevealPage })));
const ConversationPage = lazy(() => import('../pages/CorePages').then(m => ({ default: m.ConversationPage })));
const TrustProfilePage = lazy(() => import('../pages/OperationalPages').then(m => ({ default: m.TrustProfilePage })));
const TrustHistoryPage = lazy(() => import('../pages/OperationalPages').then(m => ({ default: m.TrustHistoryPage })));
const ReviewPage = lazy(() => import('../pages/OperationalPages').then(m => ({ default: m.ReviewPage })));
const StayDashboardPage = lazy(() => import('../pages/OperationalPages').then(m => ({ default: m.StayDashboardPage })));
const AgreementBuilderPage = lazy(() => import('../pages/OperationalPages').then(m => ({ default: m.AgreementBuilderPage })));
const ExpensesPage = lazy(() => import('../pages/OperationalPages').then(m => ({ default: m.ExpensesPage })));
const SafetyCenterPage = lazy(() => import('../pages/OperationalPages').then(m => ({ default: m.SafetyCenterPage })));
const TravelModePage = lazy(() => import('../pages/OperationalPages').then(m => ({ default: m.TravelModePage })));

const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-vitality-coral border-t-transparent animate-spin" />
      <span className="font-sans text-label-caps text-earth-indigo/60 tracking-widest uppercase">
        Loading Roommate Architecture
      </span>
    </div>
  </div>
);

const router = createBrowserRouter([
  // Public Section
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
    ],
  },
  // Auth Section
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
  // Spatial Full-Screen Section
  {
    element: <SpatialLayout />,
    children: [
      {
        path: '/spatial',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SpatialCityPage />
          </Suspense>
        ),
      },
      {
        path: '/rooms/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RoomDetailPage />
          </Suspense>
        ),
      },
    ],
  },
  // Authenticated Living OS & Discovery App Section
  {
    element: <AppLayout />,
    children: [
      {
        path: '/onboarding/chapter-1',
        element: (
          <Suspense fallback={<PageLoader />}>
            <OnboardingChapter1Page />
          </Suspense>
        ),
      },
      {
        path: '/onboarding/chapter-2',
        element: (
          <Suspense fallback={<PageLoader />}>
            <OnboardingChapter2Page />
          </Suspense>
        ),
      },
      {
        path: '/onboarding/chapter-3',
        element: (
          <Suspense fallback={<PageLoader />}>
            <OnboardingChapter3Page />
          </Suspense>
        ),
      },
      {
        path: '/onboarding/chapter-4',
        element: (
          <Suspense fallback={<PageLoader />}>
            <OnboardingChapter4Page />
          </Suspense>
        ),
      },
      {
        path: '/discover',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DiscoveryPage />
          </Suspense>
        ),
      },
      {
        path: '/profile/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: '/compatibility-lab',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CompatibilityLabPage />
          </Suspense>
        ),
      },
      {
        path: '/matches/:id/reveal',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MatchRevealPage />
          </Suspense>
        ),
      },
      {
        path: '/messages/:conversationId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ConversationPage />
          </Suspense>
        ),
      },
      {
        path: '/trust/:userId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TrustProfilePage />
          </Suspense>
        ),
      },
      {
        path: '/trust/:userId/history',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TrustHistoryPage />
          </Suspense>
        ),
      },
      {
        path: '/reviews/:stayId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ReviewPage />
          </Suspense>
        ),
      },
      {
        path: '/stay',
        element: (
          <Suspense fallback={<PageLoader />}>
            <StayDashboardPage />
          </Suspense>
        ),
      },
      {
        path: '/stay/agreement/builder',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AgreementBuilderPage />
          </Suspense>
        ),
      },
      {
        path: '/stay/expenses',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExpensesPage />
          </Suspense>
        ),
      },
      {
        path: '/stay/safety',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SafetyCenterPage />
          </Suspense>
        ),
      },
      {
        path: '/travel',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TravelModePage />
          </Suspense>
        ),
      },
    ],
  },
  // Fallback redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
