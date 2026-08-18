'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getStories();
        setStories(res.data || res || []);
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
          Editorial Magazine
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950">
          Sri Lanka Travel Stories
        </h1>
        <p className="text-sm sm:text-base text-ceylon-700">
          Immersive travel writing, local insider guides, photography essays, and culinary journeys across Ceylon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(stories.length > 0 ? stories : [
          { id: '1', title: 'The Ultimate Ella Guide: Nine Arch Bridge & Tea Trails', slug: 'ultimate-ella-guide', category: 'Travel Guide', readTime: '6 min read', heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', summary: 'Everything you need to know about trekking Ella Rock, catching morning express trains over Nine Arch Bridge, and staying in eco tea lodges.' },
          { id: '2', title: 'Sri Lanka’s Most Beautiful Train Journey: Kandy to Badulla', slug: 'scenic-train-journey', category: 'Culture', readTime: '5 min read', heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80', summary: 'Hanging out of open train doorways past pine forests, tea pluckers in colorful saris, and viaduct bridges.' },
          { id: '3', title: 'Where to See Leopards in Sri Lanka: Yala vs Wilpattu', slug: 'leopard-safari-guide', category: 'Wildlife', readTime: '7 min read', heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', summary: 'Comparing crowd density, safari jeep quality, and leopard sighting probabilities between Yala Block 1 and Wilpattu Villus.' },
        ]).map((st: any) => (
          <Link key={st.id} href={`/stories/${st.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between h-96">
            <div className="relative h-48 w-full">
              <Image src={st.heroImage} alt={st.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ceylon-950/80 text-[10px] uppercase font-bold text-ceylon-300">
                {st.category}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] text-ceylon-700 uppercase font-semibold">{st.readTime}</span>
                <h3 className="font-playfair text-xl font-bold text-ceylon-950 group-hover:text-ceylon-300 transition mt-1 line-clamp-2">
                  {st.title}
                </h3>
                <p className="text-xs text-ceylon-700 mt-2 line-clamp-2 leading-relaxed">{st.summary}</p>
              </div>
              <div className="inline-flex items-center space-x-1 text-xs uppercase font-semibold text-gold-400 group-hover:text-gold-300 mt-4">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
