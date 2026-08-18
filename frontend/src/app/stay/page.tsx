'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hotel, Star, MapPin, ExternalLink } from 'lucide-react';
import { api } from '@/lib/api';

const TYPES = ['All', 'Resort', 'Boutique', 'Villa', 'Eco Lodge', 'Hostel'];

export default function StayPage() {
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getAccommodations({ type: selectedType === 'All' ? undefined : selectedType });
        setAccommodations(res.data || res || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-20">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-ceylon-400">
          Where to Stay
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950">
          Sri Lanka Accommodation Guide
        </h1>
        <p className="text-sm sm:text-base text-ceylon-700">
          From luxury cliffside ocean resorts and tea estate bungalows to jungle eco-lodges and surf hostels.
        </p>
      </div>

      <div className="flex items-center justify-center space-x-2 overflow-x-auto no-scrollbar py-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${selectedType === t ? 'bg-ceylon-500 text-ceylon-950 shadow-lg' : 'glass-card text-ceylon-700 hover:text-ceylon-950'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(accommodations.length > 0 ? accommodations : [
          { id: '1', name: 'Heritance Kandalama', type: 'Eco Resort', priceRange: '$$$$', rating: 4.9, address: 'Dambulla, Cultural Triangle', heroImage: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg', bookingUrl: 'https://booking.com' },
          { id: '2', name: 'Ceylon Tea Trails', type: 'Boutique Bungalow', priceRange: '$$$$$', rating: 5.0, address: 'Hatton, Central Highlands', heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', bookingUrl: 'https://booking.com' },
          { id: '3', name: 'Amanwella Tangalle', type: 'Ocean Beach Villa', priceRange: '$$$$$', rating: 4.8, address: 'Tangalle, Southern Coast', heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', bookingUrl: 'https://booking.com' },
        ]).map((acc: any) => (
          <div key={acc.id} className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between h-96">
            <div className="relative h-52 w-full">
              <Image src={acc.heroImage} alt={acc.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ceylon-950/80 text-[10px] uppercase font-bold text-gold-400">
                {acc.type} • {acc.priceRange}
              </div>
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-ceylon-950 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" /> {acc.rating}
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-playfair text-xl font-bold text-ceylon-950 group-hover:text-ceylon-300 transition">
                  {acc.name}
                </h3>
                <p className="text-xs text-ceylon-700 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-ceylon-400" /> {acc.address}
                </p>
              </div>

              <a
                href={acc.bookingUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-ceylon-600 hover:bg-ceylon-500 text-ceylon-950 font-semibold text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1 mt-4 transition"
              >
                <span>Check Partner Availability</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
