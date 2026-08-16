'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, Bookmark, ArrowRight, Grid, Map as MapIcon, Filter } from 'lucide-react';
import { api } from '@/lib/api';
import { useSaved } from '@/app/providers';

const FILTERS = [
  'All',
  'Cultural Triangle',
  'Central',
  'Southern',
  'Eastern',
  'Northern',
  'Wildlife',
  'Western',
  'Central Province',
  'Eastern Province',
  'North Central Province',
  'Northern Province',
  'North Western Province',
  'Sabaragamuwa Province',
  'Southern Province',
  'Uva Province',
  'Western Province',
];

const PROVINCES = new Set([
  'Central Province',
  'Eastern Province',
  'North Central Province',
  'Northern Province',
  'North Western Province',
  'Sabaragamuwa Province',
  'Southern Province',
  'Uva Province',
  'Western Province',
]);

export default function DestinationsPage() {
  const searchParams = useSearchParams();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(() => searchParams.get('province') || searchParams.get('region') || 'All');
  const [search, setSearch] = useState(() => searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const { isSaved, toggleSave } = useSaved();

  useEffect(() => {
    const province = searchParams.get('province');
    const region = searchParams.get('region');
    const q = searchParams.get('search');
    if (province || region) {
      setSelectedFilter(province || region || 'All');
    }
    if (q !== null) {
      setSearch(q);
    }
  }, [searchParams]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const isProvince = PROVINCES.has(selectedFilter);
        const res = await api.getDestinations({
          region: !isProvince && selectedFilter !== 'All' ? selectedFilter : undefined,
          province: isProvince ? selectedFilter : undefined,
          search: search || undefined,
        });
        setDestinations(res.data || res || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedFilter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-ceylon-400">
          Destination Discovery
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-white">
          Explore Sri Lanka’s Iconic Places
        </h1>
        <p className="text-sm sm:text-base text-sand-200">
          From ancient 5th-century granite fortresses to foggy tea plantation peaks and turquoise coastal bays.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel rounded-2xl p-4 border border-ceylon-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-ceylon-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Sigiriya, Ella, Galle..."
            className="w-full bg-ceylon-950/80 border border-ceylon-500/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-sand-200/50 focus:outline-none focus:border-ceylon-400"
          />
        </div>

        {/* Region and Province Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
          {FILTERS.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedFilter(reg)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition flex-shrink-0 ${selectedFilter === reg ? 'bg-ceylon-500 text-white shadow-md' : 'glass-card text-sand-200 hover:text-white'}`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 glass-card p-1 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg text-xs font-medium flex items-center space-x-1 ${viewMode === 'grid' ? 'bg-ceylon-600 text-white' : 'text-sand-200'}`}
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <Link
            href="/map"
            className="p-2 rounded-lg text-xs font-medium flex items-center space-x-1 text-sand-200 hover:text-white"
          >
            <MapIcon className="w-4 h-4 text-gold-400" />
            <span className="hidden sm:inline">Map</span>
          </Link>
        </div>
      </div>

      {/* Grid View */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-ceylon-900/40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest: any) => (
            <div key={dest.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-96 group relative">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={dest.heroImage}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ceylon-950/80 text-[10px] uppercase font-bold text-ceylon-300">
                  {dest.region}
                </div>
                <button
                  onClick={() => toggleSave('DESTINATION', dest.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${isSaved(dest.id) ? 'bg-gold-500 text-ceylon-950' : 'bg-black/40 text-white hover:text-gold-400'}`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-white group-hover:text-ceylon-300 transition">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-sand-200 mt-1 line-clamp-2">
                    {dest.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-ceylon-500/10 text-xs">
                  <span className="text-sand-200/80">{dest.bestTimeToVisit}</span>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="inline-flex items-center space-x-1 font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
