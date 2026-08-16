'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Compass, MapPin, ArrowRight, Play } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function HomeHero() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/destinations?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image / Video Fallback */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-10000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2000&q=90')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-ceylon-950/20 to-white/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 pt-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/90 border border-ceylon-500/20 text-ceylon-700 shadow-lg shadow-ceylon-950/10 text-xs font-semibold uppercase tracking-widest animate-fadeIn">
          <Compass className="w-4 h-4" />
          <span>Official Tourism Gateway</span>
        </div>

        <h1 className="font-playfair text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-ceylon-950 drop-shadow-sm">
          {t('hero.headline')}
        </h1>

        <p className="text-lg sm:text-2xl text-ceylon-800 font-light tracking-wide max-w-2xl mx-auto drop-shadow-sm">
          {t('hero.subtitle')}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/destinations"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-ceylon-700 via-ceylon-600 to-ceylon-500 hover:from-ceylon-600 hover:to-ceylon-400 text-white font-semibold shadow-xl hover:shadow-ceylon-500/30 transition duration-300 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider"
          >
            <span>{t('hero.exploreBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/trip-planner"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 border border-ceylon-500/20 hover:border-ceylon-500 text-ceylon-800 font-semibold hover:bg-ceylon-50 transition duration-300 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider shadow-lg"
          >
            <span>{t('hero.planBtn')}</span>
          </Link>
        </div>

        {/* Autocomplete Search Bar */}
        <div className="pt-8 max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="bg-white/95 p-2 rounded-full border border-ceylon-500/20 flex items-center shadow-2xl shadow-ceylon-950/10">
            <MapPin className="w-5 h-5 text-ceylon-600 ml-4 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('hero.searchPlaceholder')}
              className="w-full bg-transparent px-4 py-2 text-sm text-ceylon-950 placeholder-ceylon-700/50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-ceylon-600 hover:bg-ceylon-500 text-white font-semibold text-xs uppercase tracking-wider transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ceylon-800 text-xs flex flex-col items-center gap-1 animate-bounce">
        <span>Scroll to Explore</span>
        <div className="w-5 h-8 rounded-full border border-ceylon-700/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 bg-ceylon-300 rounded-full animate-ping" />
        </div>
      </div>
    </section>
  );
}
