'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-20">
      <div className="relative h-[50vh] w-full rounded-3xl overflow-hidden glass-card">
        <Image src="https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg" alt="Event Detail" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ceylon-950 via-ceylon-950/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500 text-ceylon-950 text-xs font-bold uppercase">
            Official Ceylon Event
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-ceylon-950">Kandy Esala Perahera</h1>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl space-y-4 border border-ceylon-500/30 text-ceylon-700">
        <div className="flex items-center space-x-4 text-xs font-semibold text-ceylon-300">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> August 10 - 20, 2026</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Temple of the Tooth Relic, Kandy</span>
        </div>
        <p className="text-sm leading-relaxed">
          The Kandy Esala Perahera is one of Asia’s oldest and grandest Buddhist festivals, celebrating the Sacred Tooth Relic of the Buddha. The procession features whip-crackers, fire-dancers, Kandyan drummers, and over 50 majestic elephants decorated in golden robes.
        </p>
        <Link href="/trip-planner" className="inline-block px-6 py-3 rounded-full bg-ceylon-500 text-ceylon-950 font-bold text-xs uppercase mt-4">
          Plan Trip During Esala Perahera
        </Link>
      </div>
    </div>
  );
}
