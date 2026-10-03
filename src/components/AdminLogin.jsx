import React, { useState } from 'react';
import { useContent } from '../data/contentContext';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight, X } from 'lucide-react';

export const DEFAULT_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'nsphotography',
  altUsernames: ['nsphotography', 'narasimharao'],
  altPasswords: ['nsadmin2026', 'admin123'],
};

export const AUTH_STORAGE_KEY = 'ns_admin_auth_v1';
export const SESSION_STORAGE_KEY = 'ns_admin_session_v1';

export function getStoredCredentials() {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to parse admin credentials', e);
  }
  return DEFAULT_ADMIN_CREDENTIALS;
}

export function saveCredentials(newCreds) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newCreds));
    return true;
  } catch (e) {
    console.error('Failed to save credentials', e);
    return false;
  }
}

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const { siteConfig } = useContent();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const stored = getStoredCredentials();
      const enteredUser = username.trim().toLowerCase();
      const enteredPass = password.trim();

      const isUserValid =
        enteredUser === stored.username.toLowerCase() ||
        (stored.altUsernames && stored.altUsernames.includes(enteredUser));

      const isPassValid =
        enteredPass === stored.password ||
        (stored.altPasswords && stored.altPasswords.includes(enteredPass));

      if (isUserValid && isPassValid) {
        if (rememberMe) {
          localStorage.setItem(SESSION_STORAGE_KEY, 'true');
        } else {
          sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        }
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError('Invalid Admin ID or Password. Please verify and try again.');
      }
    }, 300);
  };

  const handleFillDefaults = () => {
    const creds = getStoredCredentials();
    setUsername(creds.username || 'admin');
    setPassword(creds.password || 'nsphotography');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl bg-[#0c0d12] border border-[#d4af37]/40 shadow-[0_0_80px_rgba(212,175,55,0.2)] p-8 sm:p-10 text-white overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          title="Return to website"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-full border border-[#d4af37]/60 p-0.5 overflow-hidden bg-black/80 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <img
              src={siteConfig.brand.logoImage || '/assets/images/brand/ns-official-logo-hd.jpg'}
              alt="NS Photography"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[10px] font-mono tracking-widest text-[#d4af37] uppercase mb-1">
              <ShieldCheck className="w-3 h-3" />
              <span>SECURE ACCESS CONTROL</span>
            </div>
            <h2 className="font-cinzel text-2xl font-bold tracking-wider text-white">
              ADMIN PORTAL
            </h2>
            <p className="text-xs text-[#8a8a9e] font-sans mt-1">
              Enter your credentials to manage website content, photos, rituals & bookings.
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center gap-3 text-red-200 text-xs animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Admin ID / Username */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-[#a0a0b2] uppercase mb-1.5">
              Admin ID / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#d4af37]/70">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin or nsphotography"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#07080b] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm font-mono transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-[#a0a0b2] uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#d4af37]/70">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#07080b] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm font-mono transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#8a8a9c] hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-[#07080b] border-white/20 text-[#d4af37] focus:ring-0 focus:ring-offset-0"
              />
              <span>Remember session</span>
            </label>

            {/* Quick autofill helper for owner */}
            <button
              type="button"
              onClick={handleFillDefaults}
              className="text-[11px] font-mono text-[#d4af37] hover:underline"
              title="Fill initial login credentials"
            >
              Fill Default Credentials
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8901a] text-black font-bold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <span>LOG IN TO ADMIN PANEL</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Credentials Info Footer Box */}
        <div className="mt-8 pt-5 border-t border-white/10 text-center">
          <p className="text-[11px] text-[#707085] font-mono">
            Default ID: <span className="text-[#d4af37]">admin</span> &nbsp;|&nbsp; Password: <span className="text-[#d4af37]">nsphotography</span>
          </p>
          <p className="text-[10px] text-neutral-500 mt-1">
            (You can change your password anytime inside the Admin Security tab)
          </p>
        </div>

      </div>
    </div>
  );
}
