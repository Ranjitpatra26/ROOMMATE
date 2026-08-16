import React, { useState, useId } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ArrowRight, Check, X, KeyRound, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import { authService } from '../services/index.js';
import { useAuthStore } from '../store/index.js';

interface CurvedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  rightElement?: React.ReactNode;
}

const CurvedInput: React.FC<CurvedInputProps> = ({
  label,
  error,
  helperText,
  rightElement,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col w-full relative group">
      <label
        htmlFor={inputId}
        className="font-sans text-label-caps uppercase tracking-[0.12em] font-bold text-[11px] text-earth-indigo/80 dark:text-earth-fixed/80 mb-2 transition-colors group-focus-within:text-earth-indigo dark:group-focus-within:text-white"
      >
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <input
          id={inputId}
          className={`w-full rounded-2xl bg-surface-low/80 dark:bg-[#121620]/90 border transition-all duration-200 ease-out py-3.5 pl-4 pr-11 text-body-md font-sans text-earth-indigo dark:text-white placeholder:text-muted/60 focus:outline-none focus:ring-4 focus:ring-vitality-coral/10 focus:border-earth-indigo dark:focus:border-white shadow-inner group-hover:border-earth-indigo/40 dark:group-hover:border-white/30 ${
            error
              ? 'border-vitality-coral focus:border-vitality-coral focus:ring-vitality-coral/20'
              : 'border-surface-dim/80 dark:border-white/10'
          } ${className || ''}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span className="font-sans text-metadata text-vitality-coral font-semibold mt-1.5 ml-1">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="font-sans text-metadata text-secondary mt-1.5 ml-1">
          {helperText}
        </span>
      )}
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isRegisterTab, setIsRegisterTab] = useState(location.pathname === '/register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleCustomEmail, setGoogleCustomEmail] = useState('');
  const [googleCustomName, setGoogleCustomName] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<'email' | 'otp' | 'success'>('email');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);

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
          setSuccess(true);
          setAuth(res.data.user, res.data.token);
          setTimeout(() => {
            navigate('/onboarding/chapter-1');
          }, 600);
        }
      } else {
        const res = await authService.login({ email, password });
        if (res.data) {
          setSuccess(true);
          setAuth(res.data.user, res.data.token);
          setTimeout(() => {
            if (res.data.user.status === 'onboarding') {
              navigate('/onboarding/chapter-1');
            } else {
              navigate('/discover');
            }
          }, 600);
        }
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error ? err.message : 'Authentication failed. Please check your credentials.';
      setError(message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  const handleGoogleAuthenticate = async (account: { email: string; name: string; picture?: string }) => {
    setGoogleLoading(true);
    setError(null);

    try {
      const res = await authService.googleLogin({
        email: account.email,
        name: account.name,
        picture: account.picture,
        googleId: `google_${account.email.replace(/[^a-zA-Z0-9]/g, '_')}`,
      });

      if (res.data) {
        setAuth(res.data.user, res.data.token);
        setShowGoogleModal(false);
        setSuccess(true);
        setTimeout(() => {
          if (res.data.user.status === 'onboarding') {
            navigate('/onboarding/chapter-1');
          } else {
            navigate('/discover');
          }
        }, 500);
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error ? err.message : 'Google authentication failed.';
      setError(message || 'Google authentication failed.');
      setShowGoogleModal(false);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotMessage(null);

    if (!forgotEmail) {
      setForgotError('Please enter your registered email address.');
      return;
    }

    setForgotLoading(true);
    try {
      const res = await authService.forgotPassword(forgotEmail);
      if (res.data) {
        setForgotMessage(res.data.message || 'Verification code sent to your email.');
        if (res.data.otp) {
          setForgotOtp(res.data.otp);
        }
        setForgotStep('otp');
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error ? err.message : 'Unable to request password reset.';
      setForgotError(message || 'Unable to request password reset.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);

    if (!forgotOtp || !newPassword) {
      setForgotError('Please enter the 6-digit code and your new password.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setForgotError('New passwords do not match.');
      return;
    }

    setForgotLoading(true);
    try {
      const res = await authService.resetPassword({
        email: forgotEmail,
        otp: forgotOtp,
        newPassword,
      });

      if (res.data || res.success) {
        setForgotStep('success');
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error ? err.message : 'Failed to reset password.';
      setForgotError(message || 'Failed to reset password.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center select-none relative">
      <div className="w-full">
        {/* ============================================================ */}
        {/* 1. AUTH TABS WITH SLIDING INDICATOR */}
        {/* ============================================================ */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex space-x-8 mb-7 border-b border-surface-dim/70 dark:border-white/10 relative"
        >
          <button
            type="button"
            onClick={() => {
              setIsRegisterTab(false);
              setError(null);
            }}
            className={`pb-3 font-sans text-label-caps uppercase tracking-widest text-xs transition-colors relative cursor-pointer ${
              !isRegisterTab
                ? 'text-earth-indigo dark:text-white font-bold'
                : 'text-secondary dark:text-earth-fixed/70 hover:text-earth-indigo dark:hover:text-white font-medium'
            }`}
          >
            Sign In
            {!isRegisterTab && (
              <motion.div
                layoutId="authTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-vitality-coral rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegisterTab(true);
              setError(null);
            }}
            className={`pb-3 font-sans text-label-caps uppercase tracking-widest text-xs transition-colors relative cursor-pointer ${
              isRegisterTab
                ? 'text-earth-indigo dark:text-white font-bold'
                : 'text-secondary dark:text-earth-fixed/70 hover:text-earth-indigo dark:hover:text-white font-medium'
            }`}
          >
            Create Account
            {isRegisterTab && (
              <motion.div
                layoutId="authTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-vitality-coral rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </motion.nav>

        {/* ============================================================ */}
        {/* 2. FORM HEADER TITLES */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 space-y-1.5"
        >
          <h2 className="font-serif text-headline-md text-earth-indigo dark:text-white font-bold tracking-tight">
            {isRegisterTab ? 'Begin your chapter' : 'Welcome back'}
          </h2>
          <p className="font-sans text-body-sm text-secondary dark:text-earth-fixed/75 leading-relaxed">
            {isRegisterTab
              ? 'Create an account to start curating your living experience.'
              : 'Enter your details to access your curated spaces.'}
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* 3. GOOGLE SOCIAL AUTHENTICATION BUTTON */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            whileHover={{ y: -1, boxShadow: '0 6px 18px -3px rgba(0,0,0,0.06)' }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.2 }}
            className="w-full flex items-center justify-center gap-3 border border-surface-dim dark:border-white/10 rounded-2xl py-3 px-4 bg-white/80 dark:bg-[#121620]/90 hover:border-earth-indigo/40 dark:hover:border-white/30 transition-all duration-200 shadow-sm mb-5 cursor-pointer group"
          >
            <svg
              className="w-5 h-5 shrink-0"
              style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px' }}
              viewBox="0 0 24 24"
            >
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
            <span className="font-sans text-ui-medium font-semibold text-earth-indigo dark:text-white group-hover:text-vitality-coral transition-colors">
              Continue with Google
            </span>
          </motion.button>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex items-center space-x-4 mb-5"
        >
          <div className="flex-1 h-px bg-surface-dim/70 dark:bg-white/10" />
          <span className="font-sans text-label-caps text-secondary dark:text-earth-fixed/60 uppercase text-[10px] tracking-widest">
            Or with email
          </span>
          <div className="flex-1 h-px bg-surface-dim/70 dark:bg-white/10" />
        </motion.div>

        {/* ============================================================ */}
        {/* 4. ERROR STATE WITH SHAKE ANIMATION */}
        {/* ============================================================ */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                x: [0, -4, 4, -3, 3, 0],
              }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="mb-5 p-3.5 rounded-xl bg-vitality-coral/10 border border-vitality-coral/30 text-vitality-coral font-sans text-xs flex items-center justify-between"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-vitality-coral/70 hover:text-vitality-coral text-sm font-bold ml-2 cursor-pointer"
              >
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================================ */}
        {/* 5. CURVED INPUT FORM FIELDS */}
        {/* ============================================================ */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {isRegisterTab && (
            <CurvedInput
              label="Full Name"
              type="text"
              placeholder="e.g. Maya Lin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <CurvedInput
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-1">
            <CurvedInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-secondary dark:text-earth-fixed/60 hover:text-earth-indigo dark:hover:text-white transition-colors p-1.5 focus:outline-none cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <motion.div
                    key={showPassword ? 'visible' : 'hidden'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </motion.div>
                </button>
              }
            />
            {!isRegisterTab && (
              <div className="text-right pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email || '');
                    setForgotError(null);
                    setForgotStep('email');
                    setShowForgotModal(true);
                  }}
                  className="font-sans text-xs text-secondary dark:text-earth-fixed/70 hover:text-vitality-coral transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          {isRegisterTab && (
            <CurvedInput
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-secondary dark:text-earth-fixed/60 hover:text-earth-indigo dark:hover:text-white transition-colors p-1.5 focus:outline-none cursor-pointer"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  <motion.div
                    key={showConfirmPassword ? 'visible' : 'hidden'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </motion.div>
                </button>
              }
            />
          )}

          {/* ============================================================ */}
          {/* 6. SIGN IN / CREATE ACCOUNT BUTTON WITH ARROW & STATES */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2"
          >
            <motion.button
              type="submit"
              disabled={loading || success}
              whileHover={loading || success ? {} : { y: -1, boxShadow: '0 10px 28px -4px rgba(240, 90, 90, 0.28)' }}
              whileTap={loading || success ? {} : { scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className="w-full mt-3 py-3.5 px-6 rounded-2xl bg-earth-indigo text-clay dark:bg-vitality-coral dark:text-white font-sans text-ui-medium font-bold flex items-center justify-center gap-2 group shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {success ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Check className="w-4 h-4" />
                  {isRegisterTab ? 'Account Created' : 'Signed In'}
                </span>
              ) : loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Connecting with database...
                </span>
              ) : (
                <>
                  <span>{isRegisterTab ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>

      {/* ============================================================ */}
      {/* 7. INTERACTIVE GOOGLE AUTHENTICATION MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-white dark:bg-[#161a25] rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20 dark:border-white/10 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="absolute top-5 right-5 text-secondary hover:text-earth-indigo dark:hover:text-white p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Google Header */}
              <div className="flex items-center gap-3 mb-5">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
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
                <div>
                  <h3 className="font-serif text-title-md font-bold text-earth-indigo dark:text-white">
                    Sign in with Google
                  </h3>
                  <p className="text-metadata text-secondary">
                    Choose an account to continue to ROOMMATE
                  </p>
                </div>
              </div>

              {/* Pre-configured Demo Google Accounts for Instant 1-Click Verification */}
              <div className="space-y-2.5 mb-5">
                {[
                  {
                    name: 'Priya Sharma',
                    email: 'priya.sharma@gmail.com',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                  },
                  {
                    name: 'Arjun Nair',
                    email: 'arjun.nair@gmail.com',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                  },
                ].map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    disabled={googleLoading}
                    onClick={() => handleGoogleAuthenticate(account)}
                    className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-surface-dim dark:border-white/10 hover:border-vitality-coral dark:hover:border-vitality-coral bg-surface-low/60 dark:bg-white/5 hover:bg-vitality-coral/5 transition-all text-left cursor-pointer group"
                  >
                    <img
                      src={account.avatar}
                      alt={account.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-vitality-coral/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-body-sm font-bold text-earth-indigo dark:text-white group-hover:text-vitality-coral transition-colors truncate">
                        {account.name}
                      </p>
                      <p className="font-sans text-xs text-secondary truncate">
                        {account.email}
                      </p>
                    </div>
                    <Sparkles className="w-4 h-4 text-vitality-coral opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>

              {/* Custom Google Account Input */}
              <div className="pt-3 border-t border-surface-dim dark:border-white/10">
                <p className="font-sans text-xs text-secondary mb-2 font-medium">
                  Or enter your Google address:
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="your.email@gmail.com"
                    value={googleCustomEmail}
                    onChange={(e) => setGoogleCustomEmail(e.target.value)}
                    className="w-full rounded-xl bg-surface-low dark:bg-[#121620] border border-surface-dim dark:border-white/10 py-2.5 px-3 text-body-sm text-earth-indigo dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-vitality-coral"
                  />
                  <input
                    type="text"
                    placeholder="Your Full Name (optional)"
                    value={googleCustomName}
                    onChange={(e) => setGoogleCustomName(e.target.value)}
                    className="w-full rounded-xl bg-surface-low dark:bg-[#121620] border border-surface-dim dark:border-white/10 py-2.5 px-3 text-body-sm text-earth-indigo dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-vitality-coral"
                  />
                  <button
                    type="button"
                    disabled={!googleCustomEmail || googleLoading}
                    onClick={() =>
                      handleGoogleAuthenticate({
                        email: googleCustomEmail,
                        name: googleCustomName || googleCustomEmail.split('@')[0],
                      })
                    }
                    className="w-full py-2.5 rounded-xl bg-earth-indigo text-white dark:bg-vitality-coral font-sans text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {googleLoading ? 'Connecting...' : 'Sign In with This Google Account'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 8. FORGOT PASSWORD MODAL (OTP & RESET FLOW) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-white dark:bg-[#161a25] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="absolute top-5 right-5 text-secondary hover:text-earth-indigo dark:hover:text-white p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-vitality-coral/10 flex items-center justify-center text-vitality-coral">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-title-md font-bold text-earth-indigo dark:text-white">
                    Reset Password
                  </h3>
                  <p className="text-metadata text-secondary">
                    {forgotStep === 'email'
                      ? 'Enter your email to receive a recovery code'
                      : forgotStep === 'otp'
                      ? 'Enter verification code and your new password'
                      : 'Password updated successfully'}
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {forgotError && (
                <div className="mb-4 p-3 rounded-xl bg-vitality-coral/10 border border-vitality-coral/30 text-vitality-coral font-sans text-xs">
                  {forgotError}
                </div>
              )}

              {/* Success Info Message */}
              {forgotMessage && forgotStep === 'otp' && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-sans text-xs">
                  {forgotMessage}
                </div>
              )}

              {/* Step 1: Email Form */}
              {forgotStep === 'email' && (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <CurvedInput
                    label="Registered Email"
                    type="email"
                    placeholder="name@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-earth-indigo text-white dark:bg-vitality-coral font-sans text-ui-medium font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
                  >
                    {forgotLoading ? (
                      <span>Sending Code...</span>
                    ) : (
                      <>
                        <span>Send Recovery Code</span>
                        <Mail className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: OTP & New Password Form */}
              {forgotStep === 'otp' && (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="font-sans text-label-caps uppercase tracking-widest text-[11px] font-bold text-secondary mb-1.5 block">
                      6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 719760"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      className="w-full rounded-2xl bg-surface-low dark:bg-[#121620] border border-surface-dim dark:border-white/10 py-3 px-4 text-center font-mono text-xl tracking-[0.3em] font-bold text-earth-indigo dark:text-white focus:outline-none focus:border-vitality-coral"
                      required
                    />
                  </div>

                  <CurvedInput
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />

                  <CurvedInput
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-vitality-coral text-white font-sans text-ui-medium font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
                  >
                    {forgotLoading ? (
                      <span>Updating Database...</span>
                    ) : (
                      <>
                        <span>Update Password in MongoDB</span>
                        <ShieldCheck className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Step 3: Success Confirmation */}
              {forgotStep === 'success' && (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-title-md font-bold text-earth-indigo dark:text-white">
                      Password Reset Complete
                    </h4>
                    <p className="font-sans text-body-sm text-secondary mt-1">
                      Your password has been securely updated in MongoDB. You can now sign in with your new credentials.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false);
                      setIsRegisterTab(false);
                    }}
                    className="w-full py-3 px-6 rounded-2xl bg-earth-indigo text-white dark:bg-vitality-coral font-sans text-ui-medium font-bold transition-all cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  return <LoginPage />;
};

export default LoginPage;
