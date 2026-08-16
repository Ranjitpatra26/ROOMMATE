import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/index.js';
import { useAuthStore } from '../store/index.js';
import { Button, UnderlineInput } from '../components/foundation/index.js';
import { PageTransition } from '../components/motion/index.js';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isRegisterTab, setIsRegisterTab] = useState(location.pathname === '/register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isRegisterTab && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      if (isRegisterTab) {
        const res = await authService.register({ email, password, name });
        if (res.data) {
          setAuth(res.data.user, res.data.token);
          navigate('/onboarding/chapter-1');
        }
      } else {
        const res = await authService.login({ email, password });
        if (res.data) {
          setAuth(res.data.user, res.data.token);
          if (res.data.user.status === 'onboarding') {
            navigate('/onboarding/chapter-1');
          } else {
            navigate('/discover');
          }
        }
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Authentication failed. Please check your credentials.';
      setError(message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="w-full h-full flex flex-col justify-center">
      <div className="w-full max-w-sm mx-auto">
        {/* Chapter / Tab Navigation */}
        <nav className="flex space-x-8 mb-10 border-b border-surface-dim relative">
          <button
            type="button"
            onClick={() => {
              setIsRegisterTab(false);
              setError(null);
            }}
            className={`pb-3 font-sans text-label-caps uppercase tracking-widest transition-all ${
              !isRegisterTab
                ? 'text-earth-indigo border-b-2 border-vitality-coral font-bold'
                : 'text-secondary hover:text-earth-indigo'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegisterTab(true);
              setError(null);
            }}
            className={`pb-3 font-sans text-label-caps uppercase tracking-widest transition-all ${
              isRegisterTab
                ? 'text-earth-indigo border-b-2 border-vitality-coral font-bold'
                : 'text-secondary hover:text-earth-indigo'
            }`}
          >
            Create Account
          </button>
        </nav>

        {/* Header Titles */}
        <div className="mb-8 space-y-2">
          <h2 className="font-serif text-headline-md text-earth-indigo font-bold">
            {isRegisterTab ? 'Begin your chapter' : 'Welcome back'}
          </h2>
          <p className="font-sans text-body-md text-secondary text-sm">
            {isRegisterTab
              ? 'Create an account to start curating your living experience.'
              : 'Enter your details to access your curated spaces.'}
          </p>
        </div>

        {/* Social Authentication */}
        <button
          type="button"
          onClick={() => {
            setAuth(
              {
                id: 'user-google-demo',
                email: 'priya@roommate.live',
                role: 'verified_resident',
                status: 'active',
                createdAt: new Date().toISOString(),
              },
              'demo-google-jwt-token'
            );
            navigate('/discover');
          }}
          className="w-full flex items-center justify-center space-x-3 border border-outline-variant rounded-lg py-3 px-4 bg-clay hover:border-earth-indigo hover:bg-surface-low transition-all duration-200 shadow-sm mb-6 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="font-sans text-ui-medium font-semibold text-earth-indigo">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 h-px bg-surface-dim" />
          <span className="font-sans text-label-caps text-secondary uppercase text-xs">Or</span>
          <div className="flex-1 h-px bg-surface-dim" />
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-vitality-coral/10 border border-vitality-coral/30 text-vitality-coral font-sans text-xs">
            {error}
          </div>
        )}

        {/* Email / Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegisterTab && (
            <UnderlineInput
              label="Full Name"
              type="text"
              placeholder="e.g. Maya Lin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <UnderlineInput
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-1">
            <UnderlineInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isRegisterTab && (
              <div className="text-right pt-1">
                <button
                  type="button"
                  onClick={() => setError('Password reset instructions sent to your registered email.')}
                  className="font-sans text-xs text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          {isRegisterTab && (
            <UnderlineInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            className="w-full mt-8 py-3.5 shadow-sm"
          >
            {isRegisterTab ? 'Create Account' : 'Sign In'}
          </Button>
        </form>
      </div>
    </PageTransition>
  );
};

export const RegisterPage: React.FC = () => {
  return <LoginPage />;
};
