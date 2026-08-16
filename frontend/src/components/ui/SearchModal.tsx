'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, MapPin, Compass, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.globalSearch(query);
        setResults(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-3xl glass-panel rounded-2xl p-6 shadow-2xl border border-ceylon-500/30 text-sand-50 relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-sand-200 hover:text-white p-2">
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 border-b border-ceylon-500/20 pb-4">
          <Search className="w-6 h-6 text-ceylon-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Sigiriya, Ella, Whale watching, Tea tours..."
            className="w-full bg-transparent text-xl font-medium text-white focus:outline-none placeholder-sand-200/50"
            autoFocus
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto mt-4 space-y-6">
          {loading && <p className="text-sm text-ceylon-400 py-4">Searching Sri Lanka...</p>}

          {!loading && results && (
            <>
              {results.destinations?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-ceylon-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Destinations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {results.destinations.map((item: any) => (
                      <Link
                        key={item.id}
                        href={`/destinations/${item.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-lg hover:bg-ceylon-900/60 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-semibold text-white group-hover:text-ceylon-300">{item.name}</div>
                          <div className="text-xs text-sand-200">{item.region} • {item.province}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-ceylon-400 opacity-0 group-hover:opacity-100 transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.attractions?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Compass className="w-4 h-4" /> Attractions
                  </h4>
                  <div className="space-y-1">
                    {results.attractions.map((item: any) => (
                      <Link
                        key={item.id}
                        href={`/destinations`}
                        onClick={onClose}
                        className="block p-2 rounded-lg hover:bg-ceylon-900/60 text-sm text-sand-100 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.stories?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" /> Stories & Guides
                  </h4>
                  <div className="space-y-1">
                    {results.stories.map((item: any) => (
                      <Link
                        key={item.id}
                        href={`/stories/${item.slug}`}
                        onClick={onClose}
                        className="block p-2 rounded-lg hover:bg-ceylon-900/60 text-sm text-sand-100 hover:text-white"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!query && (
            <div className="py-6 text-center text-sm text-sand-200">
              Try searching for popular destinations like <span className="text-ceylon-300">Ella</span>, <span className="text-ceylon-300">Sigiriya</span>, <span className="text-ceylon-300">Yala</span>, or <span className="text-ceylon-300">Galle</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
