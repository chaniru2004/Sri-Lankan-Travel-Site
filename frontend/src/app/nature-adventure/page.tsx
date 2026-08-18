'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mountain, Waves, Compass, Droplet, Sun, ArrowRight } from 'lucide-react';

const SECTIONS = [
  {
    title: 'National Parks & Wildlife',
    icon: Compass,
    items: [
      { name: 'Yala National Park', desc: 'Leopard density & coastal lagoons.', image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', slug: 'yala' },
      { name: 'Wilpattu National Park', desc: 'Natural sand-rimmed lakes (Villus).', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', slug: 'wilpattu' },
      { name: 'Udawalawe National Park', desc: 'Guaranteed wild elephant sightings.', image: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg', slug: 'udawalawe' },
      { name: 'Minneriya Elephant Gathering', desc: 'World’s largest Asian elephant congregation.', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', slug: 'minneriya' },
    ]
  },
  {
    title: 'Highland Hiking & Peaks',
    icon: Mountain,
    items: [
      { name: 'Adam’s Peak (Sri Pada)', desc: 'Nocturnal pilgrimage to 2,243m sacred footprint.', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', slug: 'adams-peak' },
      { name: 'Ella Rock Trek', desc: 'Panoramic cliffside vantage overlooking Ella Gap.', image: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg', slug: 'ella-rock' },
      { name: 'Knuckles Mountain Range', desc: 'UNESCO cloud forest wilderness and river canyons.', image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', slug: 'knuckles' },
      { name: 'Pidurangala Rock Sunrise', desc: '360° view directly facing Sigiriya citadel.', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', slug: 'pidurangala' },
    ]
  },
  {
    title: 'Surfing & Oceans',
    icon: Waves,
    items: [
      { name: 'Arugam Bay Point Break', desc: 'World Top-10 right-hand point break.', image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80', slug: 'arugam-bay' },
      { name: 'Weligama Bay Surf School', desc: 'Gentle sand-bottom beach breaks for beginners.', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', slug: 'weligama' },
      { name: 'Pigeon Island Coral Diving', desc: 'Blacktip reef sharks and sea turtles.', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', slug: 'pigeon-island' },
    ]
  },
  {
    title: 'Chasing Waterfalls',
    icon: Droplet,
    items: [
      { name: 'Diyaluma Falls Bathing Pools', desc: 'Multi-tiered natural cliff infinity pools.', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', slug: 'diyaluma-falls' },
      { name: 'Bambarakanda Waterfalls', desc: 'Sri Lanka’s tallest waterfall (263 meters).', image: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg', slug: 'bambarakanda' },
      { name: 'Ravana Falls Ella', desc: 'Cascading mountain waterfall linked to Ramayana legend.', image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', slug: 'ravana-falls' },
    ]
  }
];

export default function NatureAdventurePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16 pb-20 text-ceylon-950">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-ceylon-600">
          Wilderness & Expeditions
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950">
          Nature & Adventure
        </h1>
        <p className="text-sm sm:text-base text-ceylon-700">
          From 263-meter waterfalls and UNESCO cloud mountain ridges to ocean reef diving and leopard tracking.
        </p>
      </div>

      {SECTIONS.map((sec) => (
        <section key={sec.title} className="space-y-6">
          <div className="flex items-center space-x-3 border-b border-ceylon-500/20 pb-3">
            <sec.icon className="w-6 h-6 text-ceylon-600" />
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-ceylon-950">{sec.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sec.items.map((item) => (
              <div key={item.name} className="bg-white border border-ceylon-500/20 shadow-xl shadow-ceylon-900/10 rounded-2xl overflow-hidden group flex flex-col justify-between min-h-80 transition hover:-translate-y-1 hover:shadow-ceylon-900/15">
                <div className="relative h-44 w-full">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-ceylon-950 group-hover:text-ceylon-600 transition">{item.name}</h3>
                    <p className="text-xs text-ceylon-700 mt-1 line-clamp-2">{item.desc}</p>
                  </div>
                  <Link href={`/destinations`} className="inline-flex items-center space-x-1 text-xs font-semibold text-ceylon-600 hover:text-ceylon-800 uppercase tracking-wider mt-3">
                    <span>Explore Route</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
