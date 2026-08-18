'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, ArrowLeft, Bookmark } from 'lucide-react';

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-20">
      <Link href="/stories" className="inline-flex items-center space-x-1 text-xs text-ceylon-300 font-semibold uppercase hover:underline">
        <ArrowLeft className="w-4 h-4" /> <span>Back to Magazine</span>
      </Link>

      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-ceylon-500/20 border border-ceylon-400 text-ceylon-300 text-xs font-bold uppercase">
          Travel Guide
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950 leading-tight">
          The Ultimate Ella Guide: Nine Arch Bridge & Tea Trails
        </h1>
        <div className="flex items-center space-x-4 text-xs text-ceylon-700 border-b border-ceylon-500/20 pb-4">
          <span className="flex items-center gap-1"><User className="w-4 h-4 text-gold-400" /> Visit Sri Lanka Editorial</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gold-400" /> 6 min read</span>
        </div>
      </div>

      <div className="relative h-[60vh] w-full rounded-3xl overflow-hidden glass-card">
        <Image src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=80" alt="Ella" fill className="object-cover" priority />
      </div>

      <div className="prose prose-invert max-w-none text-ceylon-800 space-y-6 text-sm sm:text-base leading-relaxed">
        <p className="text-lg font-playfair text-ceylon-950 italic border-l-2 border-gold-400 pl-4">
          "Nestled deep within the hill country at an elevation of 1,041 meters, Ella is surrounded by cloud forests, tea gardens, and dramatic mountain gaps."
        </p>
        <p>
          Getting to Ella is half the experience. The iconic blue train ride from Kandy or Nanu Oya weaves through misty valleys, pinewood forests, and cascading waterfalls. Make sure to reserve 1st class observation deck or 2nd class unreserved seats to capture open-window views.
        </p>
        <h3 className="font-playfair text-2xl font-bold text-ceylon-950 pt-4">Nine Arch Bridge Timings</h3>
        <p>
          Built entirely from granite blocks, brick, and cement without structural steel during WWI, Nine Arch Bridge stands 24 meters high. The best times to witness train crossings are early morning between 6:30 AM – 9:30 AM and 11:30 AM.
        </p>
      </div>
    </article>
  );
}
