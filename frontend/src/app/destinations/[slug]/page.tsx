'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  MapPin, Bookmark, PlusCircle, Sun, Calendar, Navigation, Bus, Train,
  Car, Compass, Utensils, Hotel, ArrowRight, CheckCircle2, ChevronRight
} from 'lucide-react';
import { api } from '@/lib/api';
import { useSaved } from '@/app/providers';

const MONTHS_LIST = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [dest, setDest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isSaved, toggleSave } = useSaved();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getDestinationBySlug(slug);
        setDest(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-ceylon-400 border-t-transparent animate-spin mx-auto" />
        <p className="text-sm text-ceylon-700 mt-4">Loading Ceylon Destination Details...</p>
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-playfair text-3xl font-bold text-ceylon-950">Destination Not Found</h2>
        <p className="text-sm text-ceylon-700 mt-2">The requested destination could not be found.</p>
        <Link href="/destinations" className="inline-block mt-4 text-ceylon-300 font-semibold underline">
          Back to All Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative h-[75vh] w-full flex items-end justify-start overflow-hidden">
        <Image
          src={dest.heroImage}
          alt={dest.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ceylon-950 via-ceylon-950/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-ceylon-950/70 border border-ceylon-400/40 text-ceylon-300 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{dest.region} • {dest.province}</span>
            </div>
            <h1 className="font-playfair text-5xl sm:text-7xl font-bold text-ceylon-950 tracking-tight drop-shadow-lg">
              {dest.name}
            </h1>
            <p className="text-ceylon-800 text-base sm:text-xl font-light max-w-2xl drop-shadow">
              {dest.shortDescription}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleSave('DESTINATION', dest.id)}
              className={`px-5 py-3 rounded-full font-semibold text-xs uppercase tracking-wider transition flex items-center space-x-2 shadow-lg ${isSaved(dest.id) ? 'bg-gold-500 text-ceylon-950' : 'glass-panel text-ceylon-950 hover:border-gold-400'}`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved(dest.id) ? 'Saved' : 'Save Place'}</span>
            </button>

            <Link
              href={`/trip-planner?destination=${dest.slug}`}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-ceylon-600 to-teal-500 hover:from-ceylon-500 hover:to-teal-400 text-ceylon-950 font-semibold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add to Trip</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Editorial Content Column */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Editorial Overview */}
          <section className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-ceylon-950">About {dest.name}</h2>
            <p className="text-ceylon-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {dest.description}
            </p>
          </section>

          {/* Key Highlights / Why Visit */}
          <section className="glass-panel p-6 rounded-2xl border border-ceylon-500/20 space-y-4">
            <h3 className="font-playfair text-xl font-bold text-ceylon-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-gold-400" />
              Why Visit {dest.name}?
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ceylon-800 font-medium">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ceylon-400" />
                <span>Recommended Duration: {dest.recommendedDuration}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ceylon-400" />
                <span>Average Temp: {dest.averageTemperature}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ceylon-400" />
                <span>Best Window: {dest.bestTimeToVisit}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ceylon-400" />
                <span>District: {dest.district}</span>
              </li>
            </ul>
          </section>

          {/* Top Attractions */}
          {dest.attractions?.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-playfair text-2xl font-bold text-ceylon-950">Top Attractions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dest.attractions.map((att: any) => (
                  <div key={att.id} className="glass-card rounded-xl overflow-hidden group">
                    <div className="relative h-44 w-full">
                      <Image src={att.heroImage} alt={att.name} fill className="object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-playfair text-lg font-bold text-ceylon-950">{att.name}</h4>
                      <p className="text-xs text-ceylon-700 mt-1 line-clamp-2">{att.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Month-based Best Time to Visit Visual Calendar */}
          <section className="space-y-4">
            <h2 className="font-playfair text-2xl font-bold text-ceylon-950 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-ceylon-400" /> Best Time to Visit Calendar
            </h2>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
              {MONTHS_LIST.map((m, idx) => {
                const isPeak = idx >= 11 || idx <= 3; // Dec-Apr peak
                return (
                  <div
                    key={m}
                    className={`p-2 rounded-xl text-center text-xs font-semibold ${isPeak ? 'bg-ceylon-600 text-ceylon-950 border border-ceylon-400' : 'bg-ceylon-950/60 text-ceylon-700 border border-ceylon-500/10'}`}
                  >
                    <div>{m}</div>
                    <div className="text-[9px] mt-1 uppercase font-bold">
                      {isPeak ? 'Peak' : 'Rain'}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Getting There */}
          <section className="space-y-4">
            <h2 className="font-playfair text-2xl font-bold text-ceylon-950 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-gold-400" /> Getting There
            </h2>
            <div className="glass-panel p-6 rounded-2xl border border-ceylon-500/20 text-xs text-ceylon-700 space-y-4">
              <p className="leading-relaxed">{dest.gettingThere}</p>
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-ceylon-500/10 text-center">
                <div className="p-3 rounded-xl bg-ceylon-950/60">
                  <Train className="w-5 h-5 text-ceylon-400 mx-auto mb-1" />
                  <span className="font-semibold text-ceylon-950">Scenic Express Train</span>
                </div>
                <div className="p-3 rounded-xl bg-ceylon-950/60">
                  <Car className="w-5 h-5 text-ceylon-400 mx-auto mb-1" />
                  <span className="font-semibold text-ceylon-950">Private Taxi Driver</span>
                </div>
                <div className="p-3 rounded-xl bg-ceylon-950/60">
                  <Bus className="w-5 h-5 text-ceylon-400 mx-auto mb-1" />
                  <span className="font-semibold text-ceylon-950">Intercity Bus</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-8">
          
          {/* Weather Widget */}
          <div className="glass-panel p-6 rounded-2xl border border-ceylon-500/30 text-center space-y-3">
            <Sun className="w-8 h-8 text-gold-400 mx-auto" />
            <div className="text-xs uppercase font-semibold text-ceylon-400">Live Weather Forecast</div>
            <div className="font-playfair text-4xl font-bold text-ceylon-950">{dest.averageTemperature || '28°C'}</div>
            <p className="text-xs text-ceylon-700">Tropical Climate • Tropical breeze & warm sunny periods.</p>
          </div>

          {/* Where To Stay */}
          {dest.accommodations?.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-playfair text-xl font-bold text-ceylon-950 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-ceylon-400" /> Places to Stay
              </h3>
              <div className="space-y-3">
                {dest.accommodations.map((acc: any) => (
                  <div key={acc.id} className="glass-card p-4 rounded-xl flex items-center space-x-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={acc.heroImage} alt={acc.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-ceylon-950">{acc.name}</h5>
                      <span className="text-xs text-gold-400 font-bold">{acc.priceRange} • {acc.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested 3-Day Trip */}
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/30 space-y-3">
            <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Suggested Route</span>
            <h4 className="font-playfair text-xl font-bold text-ceylon-950">3 Days in {dest.name}</h4>
            <p className="text-xs text-ceylon-700">Includes morning sunrise treks, afternoon tea estate tours, and local claypot dinner.</p>
            <Link
              href={`/trip-planner?destination=${dest.slug}`}
              className="block text-center py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-ceylon-950 font-bold text-xs uppercase tracking-wider mt-4"
            >
              Generate {dest.name} Itinerary
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
