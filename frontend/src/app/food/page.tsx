'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Utensils, Flame, Coffee, Heart, ArrowRight } from 'lucide-react';

const CULINARY_ITEMS = [
  { name: 'Sri Lankan Rice & 5-Curry Feast', category: 'Traditional', desc: 'Claypot slow-cooked jackfruit, spiced dhal, gotukola sambol & coconut pol sambol.', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80' },
  { name: 'Egg Hoppers (Appa)', category: 'Street Food', desc: 'Bowl-shaped crispy rice flour pancakes with a runny egg center & lunu miris sambol.', image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cheese & Chicken Kottu Roti', category: 'Nightlife Street Food', desc: 'Shredded godamba roti chopped rhythmically on metal griddles with spices.', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Jaffna Fiery Crab Curry', category: 'Tamil Cuisine', desc: 'Fresh lagoon crab simmered in roasted Jaffna curry powder & drumstick leaves.', image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ceylon Single Origin High-Grown Tea', category: 'Highland Estate', desc: 'Hand-picked silver tips & Orange Pekoe from Nuwara Eliya misty hills.', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80' },
  { name: 'Southern Black Pork Curry', category: 'Regional Spice', desc: 'Pork belly blackened with heavily roasted goraka (garcinia) & crushed black pepper.', image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80' },
];

export default function TasteSriLankaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-20">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
          Gastronomy & Ceylon Tea
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950">
          Taste Sri Lanka
        </h1>
        <p className="text-sm sm:text-base text-ceylon-700">
          A vibrant spice island palette combining coconut sambols, fragrant claypot curries, midnight kottu roti, and world-renowned Ceylon tea.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CULINARY_ITEMS.map((item) => (
          <div key={item.name} className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between h-96">
            <div className="relative h-48 w-full">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ceylon-950/80 text-[10px] uppercase font-bold text-gold-400">
                {item.category}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-playfair text-xl font-bold text-ceylon-950 group-hover:text-ceylon-300 transition">
                  {item.name}
                </h3>
                <p className="text-xs text-ceylon-700 mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <Link href="/trip-planner" className="inline-flex items-center space-x-1 text-xs uppercase font-semibold text-gold-400 hover:text-gold-300 mt-4">
                <span>Book Culinary Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
