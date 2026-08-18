'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getEvents();
        setEvents(res.data || res || []);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-20">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-ceylon-400">
          Festival Calendar
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950">
          Cultural Events & Festivals
        </h1>
        <p className="text-sm sm:text-base text-ceylon-700">
          Experience grand elephant processions, moonlit lantern displays, literary festivals, and international point-break surf championships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(events.length > 0 ? events : [
          { id: '1', title: 'Kandy Esala Perahera', slug: 'kandy-esala-perahera', venue: 'Temple of the Tooth Relic, Kandy', startDate: '2026-08-10', heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80', description: 'Centuries-old procession featuring grandly caparisoned elephants, whip-crackers, fire-dancers, and traditional Kandyan drummers.' },
          { id: '2', title: 'Vesak Full Moon Lantern Festival', slug: 'vesak-festival', venue: 'Islandwide (Colombo & Kandy)', startDate: '2026-05-23', heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', description: 'Giant illuminated bamboo pandals and free community food stalls (Dansal) celebrating the birth of Lord Buddha.' },
          { id: '3', title: 'Galle Literary Festival', slug: 'galle-literary-festival', venue: 'Galle Fort Heritage Ramparts', startDate: '2027-01-28', heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', description: 'Internationally acclaimed festival bringing together Booker Prize authors, poets, and historians inside 17th-century fort walls.' },
        ]).map((ev: any) => (
          <div key={ev.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-96 group">
            <div className="relative h-48 w-full">
              <Image src={ev.heroImage} alt={ev.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ceylon-950/80 text-[10px] uppercase font-bold text-gold-400">
                {ev.startDate?.substring(0, 10) || 'Upcoming'}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] text-ceylon-300 font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {ev.venue}
                </span>
                <h3 className="font-playfair text-xl font-bold text-ceylon-950 group-hover:text-ceylon-300 transition mt-1">
                  {ev.title}
                </h3>
                <p className="text-xs text-ceylon-700 mt-2 line-clamp-2">{ev.description}</p>
              </div>
              <Link href={`/events/${ev.slug}`} className="inline-flex items-center space-x-1 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider mt-4">
                <span>Event Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
