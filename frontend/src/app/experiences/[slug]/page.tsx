'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, Shield, Calendar, MapPin, Bookmark, PlusCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useSaved } from '@/app/providers';

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [exp, setExp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isSaved, toggleSave } = useSaved();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const res = await api.getExperiences();
        const found = (res.data || res || []).find((e: any) => e.slug === slug);
        setExp(found || {
          name: 'Sunrise Trek up Ella Rock & Nine Arch Bridge',
          slug,
          duration: '4 Hours',
          difficulty: 'Moderate',
          bestSeason: 'Year Round',
          heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=80',
          description: 'Embark on an early morning guided hike starting from Ella railway tracks up to Ella Rock summit, followed by a descent to Nine Arch Bridge in time for the morning steam train.',
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return <div className="p-20 text-center text-sm text-ceylon-700">Loading Experience...</div>;
  }

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <div className="relative h-[60vh] w-full rounded-3xl overflow-hidden glass-card">
        <Image src={exp.heroImage} alt={exp.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ceylon-950 via-ceylon-950/30 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 text-xs font-bold uppercase tracking-widest mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>{exp.duration} • {exp.difficulty}</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950 drop-shadow-lg">{exp.name}</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleSave('EXPERIENCE', exp.id || 'exp-1')}
              className="px-5 py-3 rounded-full glass-panel text-ceylon-950 hover:border-gold-400 font-semibold text-xs uppercase tracking-wider flex items-center space-x-2"
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved(exp.id || 'exp-1') ? 'Saved' : 'Save Experience'}</span>
            </button>
            <Link
              href={`/trip-planner?experience=${slug}`}
              className="px-6 py-3 rounded-full bg-ceylon-500 hover:bg-ceylon-400 text-ceylon-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add to Trip</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-ceylon-950">Experience Overview</h2>
            <p className="text-ceylon-700 text-base leading-relaxed">{exp.description}</p>
          </section>

          <section className="glass-panel p-6 rounded-2xl border border-ceylon-500/20 space-y-4">
            <h3 className="font-playfair text-xl font-bold text-ceylon-950">Recommended Gear & Checklist</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ceylon-800">
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-ceylon-400" /><span>Sturdy trail walking shoes</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-ceylon-400" /><span>1.5L Reusable water bottle</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-ceylon-400" /><span>Sun protection & hat</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-ceylon-400" /><span>Camera with telephoto lens</span></li>
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-ceylon-500/30 space-y-4">
            <h4 className="font-playfair text-xl font-bold text-ceylon-950">Experience Highlights</h4>
            <div className="text-xs space-y-2 text-ceylon-700">
              <div><strong className="text-ceylon-950">Duration:</strong> {exp.duration}</div>
              <div><strong className="text-ceylon-950">Difficulty:</strong> {exp.difficulty}</div>
              <div><strong className="text-ceylon-950">Best Season:</strong> {exp.bestSeason}</div>
            </div>
            <Link
              href="/trip-planner"
              className="block text-center w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-ceylon-950 font-bold text-xs uppercase tracking-wider mt-4"
            >
              Plan Experience Itinerary
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
