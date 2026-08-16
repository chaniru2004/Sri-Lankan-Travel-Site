'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User as UserIcon, Bookmark, MapPin, Calendar, LogOut, Shield } from 'lucide-react';
import { useAuth, useSaved } from '@/app/providers';

export default function AccountPage() {
  const { user, logout, openAuthModal } = useAuth();
  const { savedIds } = useSaved();
  const [tab, setTab] = useState<'saved' | 'trips' | 'profile'>('saved');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-ceylon-500/20 border border-ceylon-400 text-ceylon-300 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="font-playfair text-3xl font-bold text-white">Sign In to My Sri Lanka</h2>
        <p className="text-xs text-sand-200">
          Save your favorite destinations, sync custom itineraries, and view personalized travel recommendations.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="w-full py-3 rounded-full bg-ceylon-500 hover:bg-ceylon-400 text-ceylon-950 font-bold text-xs uppercase tracking-wider"
        >
          Sign In or Register
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-20">
      <div className="glass-panel p-8 rounded-3xl border border-ceylon-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-ceylon-600 border-2 border-ceylon-400 flex items-center justify-center text-white font-bold text-xl">
            {user.name?.substring(0, 2).toUpperCase() || 'US'}
          </div>
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-xs text-sand-200">{user.email} • {user.role}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {user.role === 'ADMIN' && (
            <Link href="/admin" className="px-4 py-2 rounded-full bg-gold-500 text-ceylon-950 font-bold text-xs uppercase flex items-center gap-1">
              <Shield className="w-4 h-4" /> Admin Portal
            </Link>
          )}
          <button onClick={logout} className="p-2.5 rounded-full glass-card hover:text-red-400 text-sand-200 transition">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 border-b border-ceylon-500/20 pb-2">
        <button onClick={() => setTab('saved')} className={`px-4 py-2 font-semibold text-xs uppercase tracking-wider ${tab === 'saved' ? 'text-ceylon-300 border-b-2 border-ceylon-400' : 'text-sand-200'}`}>
          Saved Places ({savedIds.length})
        </button>
        <button onClick={() => setTab('trips')} className={`px-4 py-2 font-semibold text-xs uppercase tracking-wider ${tab === 'trips' ? 'text-ceylon-300 border-b-2 border-ceylon-400' : 'text-sand-200'}`}>
          My Itineraries
        </button>
      </div>

      {tab === 'saved' && (
        <div className="space-y-4">
          {savedIds.length === 0 ? (
            <div className="p-12 text-center glass-panel rounded-2xl text-sand-200 text-xs">
              No saved items yet. Browse destinations or experiences and click the bookmark icon to save them here!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedIds.map((id) => (
                <div key={id} className="glass-card p-4 rounded-xl flex items-center justify-between text-xs text-white">
                  <span>Saved Item ID: {id}</span>
                  <Link href="/destinations" className="text-ceylon-300 font-semibold underline">View</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'trips' && (
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-playfair text-lg font-bold text-white">7-Day Ceylon Essential Adventure</h4>
              <p className="text-xs text-sand-200">Sigiriya • Kandy • Ella • Yala • Mirissa</p>
            </div>
            <Link href="/trip-planner" className="px-5 py-2 rounded-full bg-ceylon-500 text-ceylon-950 font-bold text-xs uppercase">
              View Itinerary
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
