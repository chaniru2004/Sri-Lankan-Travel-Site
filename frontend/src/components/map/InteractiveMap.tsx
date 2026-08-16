'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, ArrowRight, Bookmark } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  slug: string;
  category: string;
  latitude: number;
  longitude: number;
  heroImage: string;
  shortDescription: string;
}

const sampleMapLocations: MapLocation[] = [
  { id: '1', name: 'Sigiriya Rock Fortress', slug: 'sigiriya', category: 'Heritage', latitude: 7.9570, longitude: 80.7603, heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=80', shortDescription: '5th-century ancient sky fortress perched on a 200m monolith.' },
  { id: '2', name: 'Ella Nine Arch', slug: 'ella', category: 'Highlands', latitude: 6.8667, longitude: 81.0466, heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=600&q=80', shortDescription: 'Colonial viaduct railway bridge surrounded by tea gardens.' },
  { id: '3', name: 'Galle Fort Ramparts', slug: 'galle', category: 'Heritage', latitude: 6.0535, longitude: 80.2210, heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80', shortDescription: 'UNESCO Dutch colonial ocean fortress town.' },
  { id: '4', name: 'Yala National Park', slug: 'yala', category: 'Wildlife', latitude: 6.3725, longitude: 81.5186, heroImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80', shortDescription: 'Highest density leopard wildlife safari in the world.' },
  { id: '5', name: 'Mirissa Whale Sanctuary', slug: 'mirissa', category: 'Beaches', latitude: 5.9483, longitude: 80.4716, heroImage: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=600&q=80', shortDescription: 'Indian ocean blue whale watching point.' },
  { id: '6', name: 'Arugam Bay Surf Point', slug: 'arugam-bay', category: 'Surfing', latitude: 6.8417, longitude: 81.8357, heroImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80', shortDescription: 'World-famous right-hand point break.' },
];

export function InteractiveMap({ isPreview = false }: { isPreview?: boolean }) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(sampleMapLocations[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Heritage', 'Highlands', 'Wildlife', 'Beaches', 'Surfing'];

  const filteredLocations = activeCategory === 'All' 
    ? sampleMapLocations 
    : sampleMapLocations.filter(loc => loc.category === activeCategory);

  return (
    <div className={`relative w-full ${isPreview ? 'h-[500px]' : 'h-[85vh]'} rounded-3xl overflow-hidden glass-panel border border-ceylon-500/30 shadow-2xl flex flex-col md:flex-row`}>
      
      {/* Category Toggle Bar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 max-w-xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${activeCategory === cat ? 'bg-ceylon-500 text-ceylon-950 shadow-lg' : 'glass-panel text-sand-100 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map Graphic Viewport */}
      <div className="relative flex-1 bg-ceylon-950 p-6 flex items-center justify-center overflow-hidden">
        {/* Decorative Grid Map background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Map Markers */}
        <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
          <div className="relative w-72 h-96 border border-ceylon-500/20 rounded-full flex items-center justify-center">
            {filteredLocations.map((loc, idx) => {
              // Simulated map pin positioning on island layout
              const top = 20 + (idx * 14);
              const left = 30 + (idx % 2 === 0 ? idx * 10 : -idx * 8);

              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  className={`absolute z-10 p-2 rounded-full transition duration-300 transform -translate-x-1/2 -translate-y-1/2 group ${selectedLocation?.id === loc.id ? 'bg-gold-500 text-black scale-125 shadow-xl' : 'bg-ceylon-600 text-white hover:bg-ceylon-400'}`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="absolute left-full ml-2 px-2 py-0.5 rounded bg-black/80 text-[10px] whitespace-nowrap text-white opacity-0 group-hover:opacity-100 transition">
                    {loc.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Location Drawer Preview Card */}
      {selectedLocation && (
        <div className="w-full md:w-80 glass-panel border-t md:border-t-0 md:border-l border-ceylon-500/30 p-6 flex flex-col justify-between text-sand-50">
          <div>
            <div className="relative h-44 rounded-xl overflow-hidden mb-4">
              <img src={selectedLocation.heroImage} alt={selectedLocation.name} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 text-[10px] font-bold uppercase text-ceylon-400">
                {selectedLocation.category}
              </span>
            </div>

            <h3 className="font-playfair text-xl font-bold text-white mb-2">{selectedLocation.name}</h3>
            <p className="text-xs text-sand-200 leading-relaxed">{selectedLocation.shortDescription}</p>
          </div>

          <div className="pt-6 flex gap-2">
            <Link
              href={`/destinations/${selectedLocation.slug}`}
              className="flex-1 px-4 py-2.5 rounded-full bg-ceylon-500 hover:bg-ceylon-400 text-ceylon-950 font-semibold text-xs text-center uppercase tracking-wider transition flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/trip-planner"
              className="p-2.5 rounded-full glass-panel hover:border-gold-400 text-gold-400 transition"
              title="Add to Trip"
            >
              <Bookmark className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
