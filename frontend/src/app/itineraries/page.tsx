'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Compass, Shield } from 'lucide-react';

const POPULAR_ITINERARIES = [
  { title: 'Sri Lanka in 5 Days: Express Heritage', duration: '5 Days', theme: 'Cultural & Coast', image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80', slug: 'sri-lanka-5-days' },
  { title: 'Sri Lanka in 7 Days: Essential Journey', duration: '7 Days', theme: 'Highlands & Safari', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', slug: 'sri-lanka-7-days' },
  { title: '10-Day Island Explorer Loop', duration: '10 Days', theme: 'Comprehensive', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', slug: 'sri-lanka-10-days' },
  { title: '14-Day Grand Ceylon Overland Trail', duration: '14 Days', theme: 'Complete Island', image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', slug: 'sri-lanka-14-days' },
  { title: 'Cultural Triangle 4-Day UNESCO Loop', duration: '4 Days', theme: 'Heritage', image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80', slug: 'cultural-triangle-loop' },
  { title: 'Wildlife & Safari Big-3 Expedition', duration: '6 Days', theme: 'Wild Safaris', image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', slug: 'wildlife-adventure' },
  { title: 'South Coast Golden Beaches Escape', duration: '5 Days', theme: 'Beaches & Surf', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', slug: 'south-coast-escape' },
  { title: 'Honeymoon in Paradise & Private Villas', duration: '8 Days', theme: 'Luxury & Romantic', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', slug: 'honeymoon-sri-lanka' },
];

export default function ItinerariesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-20">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-ceylon-400">
          Curated Routes
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-white">
          Popular Sri Lanka Itineraries
        </h1>
        <p className="text-sm sm:text-base text-sand-200">
          Browse route maps, travel times, daily activities, and budget breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {POPULAR_ITINERARIES.map((it) => (
          <div key={it.slug} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-96 group">
            <div className="relative h-48 w-full">
              <Image src={it.image} alt={it.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ceylon-950/80 text-[10px] uppercase font-bold text-gold-400">
                {it.duration}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] text-sand-200/60 uppercase font-semibold">{it.theme}</span>
                <h3 className="font-playfair text-lg font-bold text-white group-hover:text-ceylon-300 transition line-clamp-2 mt-1">
                  {it.title}
                </h3>
              </div>
              <Link
                href={`/itineraries/${it.slug}`}
                className="inline-flex items-center space-x-1 text-xs uppercase font-semibold text-gold-400 hover:text-gold-300 mt-4"
              >
                <span>View Full Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
