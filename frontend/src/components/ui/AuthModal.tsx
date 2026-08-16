'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/app/providers';

export function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ name, email, password });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-2xl p-6 shadow-2xl border border-ceylon-500/30 text-sand-50 relative">
        <button onClick={closeAuthModal} className="absolute top-5 right-5 text-sand-200 hover:text-white p-2">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="font-playfair text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back to Ceylon' : 'Create Your Traveller Account'}
          </h3>
          <p className="text-xs text-sand-200 mt-1">
            {mode === 'login'
              ? 'Access saved places, custom itineraries, and recommendations.'
              : 'Save itineraries, review attractions, and plan your Sri Lankan adventure.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-500/40 text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs text-sand-200 mb-1 font-medium">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-ceylon-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full bg-ceylon-950/80 border border-ceylon-500/30 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-sand-200/40 focus:outline-none focus:border-ceylon-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-sand-200 mb-1 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ceylon-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@visitsrilanka.com"
                className="w-full bg-ceylon-950/80 border border-ceylon-500/30 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-sand-200/40 focus:outline-none focus:border-ceylon-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-sand-200 mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ceylon-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-ceylon-950/80 border border-ceylon-500/30 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-ceylon-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-ceylon-600 to-teal-600 hover:from-ceylon-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg transition duration-300 disabled:opacity-50 mt-2"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-ceylon-500/20 text-center text-xs text-sand-200">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setMode('register')} className="text-ceylon-300 font-semibold underline">
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button onClick={() => setMode('login')} className="text-ceylon-300 font-semibold underline">
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
