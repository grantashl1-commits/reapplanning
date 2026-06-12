import React, { useState } from 'react';
import { ReapLogo, ReaperMascot, tw, C } from './shared';

// ─── Auth Pages ───────────────────────────────────────────────────────────────
// Covers: Sign Up, Log In, Forgot Password, Email Verify, Set New Password
// Matches Whisk prototype v1.2 auth screens

type AuthView = 'signup' | 'login' | 'forgot' | 'verify' | 'reset';

const reaperQuotes: Record<AuthView, string> = {
  signup: 'The ledger requires a name.',
  login: 'Identify yourself.',
  forgot: 'Forgotten your password. Predictable.',
  verify: 'Verification pending. I dislike uncertainty.',
  reset: 'Choose carefully. The records are permanent.',
};

export default function AuthPages({
  initialView = 'signup',
  onSuccess,
}: {
  initialView?: AuthView;
  onSuccess?: () => void;
}) {
  const [view, setView] = useState<AuthView>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNew, setConfirmNew] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: Wire up to your Supabase auth calls
    setTimeout(() => {
      setLoading(false);
      if (view === 'signup') setView('verify');
      if (view === 'login') onSuccess?.();
      if (view === 'forgot') setView('verify');
      if (view === 'verify') { /* wait for email */ }
      if (view === 'reset') onSuccess?.();
    }, 800);
  }

  const quote = reaperQuotes[view];

  return (
    <div className="min-h-screen bg-black text-[#e5e3d0] font-mono flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-xs space-y-5">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <ReapLogo size="md" />
        </div>

        {/* Reaper mascot + quote */}
        <div className="flex items-center gap-3">
          <ReaperMascot
            variant={view === 'signup' ? 'ledger' : view === 'login' ? 'default' : 'thinking'}
            size={56}
          />
          <div className="bg-[#161616] border border-[#2a2a2a] px-3 py-2 text-xs text-[#e5e3d0] leading-relaxed flex-1">
            {quote}
          </div>
        </div>

        {/* View Title */}
        <div>
          <h2 className="font-mono font-bold text-lg text-[#e5e3d0]">
            {view === 'signup' && 'Enter the Challenge'}
            {view === 'login' && 'Return to the Ledger'}
            {view === 'forgot' && 'Recover Access'}
            {view === 'verify' && 'Check Your Inbox'}
            {view === 'reset' && 'Set a New Password'}
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
            {view === 'signup' && 'Sign Up'}
            {view === 'login' && 'Log In'}
            {view === 'forgot' && 'Forgot Password'}
            {view === 'verify' && 'Email Verification'}
            {view === 'reset' && 'Password Reset'}
          </p>
        </div>

        {/* Forms */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {(view === 'signup' || view === 'login' || view === 'forgot') && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={tw.input}
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>
          )}

          {(view === 'signup' || view === 'login') && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={tw.input}
                placeholder="••••••••"
                autoComplete={view === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
          )}

          {view === 'signup' && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={tw.input}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
          )}

          {view === 'reset' && (
            <>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={tw.input}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmNew}
                  onChange={(e) => setConfirmNew(e.target.value)}
                  required
                  className={tw.input}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            </>
          )}

          {view === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setView('forgot')}
                className="text-[10px] text-gray-500 hover:text-[#84ff00] underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Verify screen — no form inputs */}
          {view === 'verify' && (
            <div className="bg-[#161616] border border-[#2a2a2a] p-4 space-y-3 text-center">
              <p className="text-sm text-[#e5e3d0]">
                We sent you a verification link.
                <br />
                Confirm your email to continue.
              </p>
              <button
                type="button"
                onClick={() => {/* TODO: resend email */}}
                className="border border-[#84ff00]/50 text-[#84ff00] px-6 py-2 text-xs font-mono uppercase tracking-widest hover:bg-[#84ff00]/10 transition-colors"
              >
                Resend Email
              </button>
              <p className="text-[10px] text-gray-500">
                Didn't receive email?{' '}
                <button
                  type="button"
                  className="underline hover:text-[#84ff00] transition-colors"
                >
                  Check spam.
                </button>
              </p>
            </div>
          )}

          {/* Submit button */}
          {view !== 'verify' && (
            <button
              type="submit"
              disabled={loading}
              className={`${tw.greenBtn} mt-1 disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {loading ? '...' : (
                <>
                  {view === 'signup' && 'Create Account'}
                  {view === 'login' && 'Log In'}
                  {view === 'forgot' && 'Send Reset Link'}
                  {view === 'reset' && 'Update Password'}
                </>
              )}
            </button>
          )}
        </form>

        {/* Switcher links */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          {view === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setView('login')}
                className="text-[#84ff00] hover:underline"
              >
                Log In
              </button>
            </p>
          )}
          {view === 'login' && (
            <p>
              New user?{' '}
              <button
                onClick={() => setView('signup')}
                className="text-[#84ff00] hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
          {(view === 'forgot' || view === 'verify' || view === 'reset') && (
            <p>
              Remembered?{' '}
              <button
                onClick={() => setView('login')}
                className="text-[#84ff00] hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>

        {/* Legal footer */}
        <p className="text-[9px] text-gray-700 text-center leading-relaxed">
          Legal: account and the reap cookies and accounts or lea/noted legal sections.
        </p>
      </div>
    </div>
  );
}
