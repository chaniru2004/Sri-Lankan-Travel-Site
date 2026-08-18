'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, Waves, Mountain, Landmark, Utensils, Heart, ArrowRight, Bookmark } from 'lucide-react';
import { api } from '@/lib/api';
import { useSaved } from '@/app/providers';

const EXPERIENCES_CATEGORIES = [
  { name: 'Culture & Heritage', slug: 'culture-heritage', icon: Landmark, desc: 'Ancient rock citadels, sacred tooth relic procession, and cave monasteries.' },
  { name: 'Wildlife & Safari', slug: 'wildlife-safari', icon: Compass, desc: 'Open-top 4x4 leopard tracking and Asian elephant gatherings.' },
  { name: 'Hiking & Peaks', slug: 'hiking-adventure', icon: Mountain, desc: 'Mist-shrouded cloud forests, Ella Rock, and nocturnal mountain pilgrimages.' },
  { name: 'Surfing & Oceans', slug: 'surfing', icon: Waves, desc: 'World-class point breaks in Arugam Bay and beginner reef breaks in Weligama.' },
  { name: 'Food & Ceylon Tea', slug: 'food-culinary', icon: Utensils, desc: 'Spiced crab curry, hoppers, street food tours, and high-country tea estates.' },
  { name: 'Wellness & Ayurveda', slug: 'wellness-ayurveda', icon: Heart, desc: 'Authentic Panchakarma herbal oils, head massages, and beachside yoga.' },
];

export default function ThingsToDoPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const { isSaved, toggleSave } = useSaved();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getExperiences({ category: selectedCat || undefined });
        setExperiences(res.data || res || []);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [selectedCat]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-20 text-ceylon-950">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-ceylon-600">
          Curated Experiences
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950">
          Things to Do in Sri Lanka
        </h1>
        <p className="text-sm sm:text-base text-ceylon-700">
          Immerse yourself in authentic island moments — from tracking wild leopards to sipping fresh Ceylon tea atop misty ridges.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-3">
        <button
          onClick={() => setSelectedCat(null)}
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${!selectedCat ? 'bg-ceylon-600 text-ceylon-950 shadow-lg shadow-ceylon-900/15' : 'bg-white border border-ceylon-500/20 text-ceylon-700 hover:bg-ceylon-50 hover:text-ceylon-950'}`}
        >
          All Experiences
        </button>
        {EXPERIENCES_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCat(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition flex items-center space-x-1.5 ${selectedCat === cat.slug ? 'bg-ceylon-600 text-ceylon-950 shadow-lg shadow-ceylon-900/15' : 'bg-white border border-ceylon-500/20 text-ceylon-700 hover:bg-ceylon-50 hover:text-ceylon-950'}`}
          >
            <cat.icon className="w-3.5 h-3.5" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(experiences.length > 0 ? experiences : [
          { id: 'exp-1', name: 'Sunrise Trek up Ella Rock & Nine Arch Train Bridge', slug: 'ella-rock-trek', duration: '4 Hours', difficulty: 'Moderate', bestSeason: 'Year Round', heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', description: 'Trek through tea plantations and eucalyptus forests to catch the morning express train passing over Nine Arch Bridge.' },
          { id: 'exp-2', name: 'Open 4x4 Leopard Safari in Yala Block 1', slug: 'yala-leopard-safari', duration: 'Full Day', difficulty: 'Easy', bestSeason: 'Feb - Jul', heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', description: 'Track wild leopards, sloth bears, and mugger crocodiles with an expert naturalist tracker.' },
          { id: 'exp-3', name: 'Ancient Sigiriya Lion Rock Fortress Guided Climb', slug: 'sigiriya-fortress-climb', duration: '3 Hours', difficulty: 'Moderate', bestSeason: 'Dec - Apr', heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80', description: 'Climb 1,200 steps past 5th-century frescoes and mirror walls to King Kashyapa’s sky palace summit.' },
        ]).map((exp: any) => (
          <div key={exp.id} className="bg-white border border-ceylon-500/20 shadow-xl shadow-ceylon-900/10 rounded-2xl overflow-hidden flex flex-col justify-between min-h-96 group relative transition hover:-translate-y-1 hover:shadow-ceylon-900/15">
            <div className="relative h-52 w-full overflow-hidden">
              <Image src={exp.heroImage} alt={exp.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ceylon-950/85 text-[10px] uppercase font-bold text-ceylon-100">
                {exp.duration} • {exp.difficulty || 'Easy'}
              </div>
              <button
                onClick={() => toggleSave('EXPERIENCE', exp.id)}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${isSaved(exp.id) ? 'bg-gold-500 text-ceylon-950' : 'bg-black/40 text-ceylon-950 hover:text-gold-400'}`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-playfair text-xl font-bold text-ceylon-950 group-hover:text-ceylon-600 transition line-clamp-2">
                  {exp.name}
                </h3>
                <p className="text-xs text-ceylon-700 mt-2 line-clamp-2 leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-ceylon-500/10 text-xs">
                <span className="text-ceylon-700 font-medium">Best Season: {exp.bestSeason}</span>
                <Link
                  href={`/experiences/${exp.slug}`}
                  className="inline-flex items-center space-x-1 font-semibold text-ceylon-600 hover:text-ceylon-800 uppercase tracking-wider"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
