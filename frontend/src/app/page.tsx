'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Compass, MapPin, Calendar, ArrowRight, Sun, Waves, Mountain, Utensils,
  Heart, Sparkles, Shield, Bookmark, ChevronRight, CheckCircle2, Play
} from 'lucide-react';
import { HomeHero } from '@/components/home/HomeHero';
import { ProvinceExplorer } from '@/components/map/ProvinceExplorer';
import { api } from '@/lib/api';
import { useSaved } from '@/app/providers';

const WHY_SRI_LANKA_CATEGORIES = [
  {
    title: 'Culture & Heritage',
    desc: 'Explore 2,500 years of recorded history across 6 UNESCO World Heritage ancient rock citadels and cave temples.',
    image: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg',
    link: '/destinations?region=Cultural+Triangle',
  },
  {
    title: 'Wildlife & Safaris',
    desc: 'Track elusive leopards in Yala, witness the Asian elephant gathering in Minneriya, and spot blue whales.',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
    link: '/nature-adventure',
  },
  {
    title: 'Golden Beaches',
    desc: 'Unwind along 1,300 kilometres of tropical coastlines, turquoise bays, and palm-fringed ocean horizons.',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    link: '/destinations?region=Southern',
  },
  {
    title: 'Ceylon Tea Hills',
    desc: 'Journey aboard legendary mountain train routes through emerald estates and misty cloud forest peaks.',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
    link: '/destinations?region=Central',
  },
  {
    title: 'Adventure & Surfing',
    desc: 'Conquer world-class point breaks in Arugam Bay and trek Adam’s Peak under starlit night skies.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    link: '/things-to-do?category=hiking-adventure',
  },
  {
    title: 'Wellness & Ayurveda',
    desc: 'Rejuvenate body and spirit with thousand-year-old herbal oil healing arts and oceanfront yoga sanctuaries.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    link: '/things-to-do?category=wellness-ayurveda',
  },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function HomePage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('February');
  const { isSaved, toggleSave } = useSaved();

  useEffect(() => {
    async function loadData() {
      try {
        const destRes = await api.getDestinations({ limit: 8 });
        setDestinations(destRes.data || destRes || []);

        const storiesRes = await api.getStories();
        setStories(storiesRes.slice?.(0, 3) || storiesRes || []);

        const eventsRes = await api.getEvents();
        setEvents(eventsRes.slice?.(0, 3) || eventsRes || []);
      } catch (err) {
        console.warn('Backend load error fallback:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-24 pb-20 bg-gradient-to-b from-white via-ceylon-50 to-white">
      
      {/* Section 1 & 2 & 3: Hero + Search */}
      <HomeHero />

      {/* Section 4: Why Sri Lanka */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-ceylon-400 tracking-widest">
            Editorial Spotlight
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ceylon-950 mt-2">
            Why Sri Lanka?
          </h2>
          <p className="text-ceylon-800 mt-3 text-base sm:text-lg">
            An ancient island nation packed into 65,000 square kilometres of biodiversity, royal heritage, tropical coastlines, and timeless hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_SRI_LANKA_CATEGORIES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-96 rounded-2xl overflow-hidden glass-card shadow-2xl cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ceylon-950/90 via-ceylon-900/35 to-transparent p-6 flex flex-col justify-end">
                <h3 className="font-playfair text-2xl font-bold text-ceylon-950 group-hover:text-ceylon-300 transition">
                  {item.title}
                </h3>
                <p className="text-xs text-ceylon-50/90 mt-2 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                <Link
                  href={item.link}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-ceylon-200 mt-4 group-hover:translate-x-1 transition"
                >
                  <span>Explore Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 5: Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase font-bold text-ceylon-600 tracking-widest">
              Curated Escapes
            </span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-ceylon-950 mt-1">
              Places Worth the Journey
            </h2>
          </div>
          <Link
            href="/destinations"
            className="mt-4 sm:mt-0 text-sm font-semibold text-ceylon-700 hover:text-ceylon-500 inline-flex items-center space-x-1"
          >
            <span>View All 20+ Destinations</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(destinations.length > 0 ? destinations : [
            { id: '1', name: 'Sigiriya', slug: 'sigiriya', region: 'Cultural Triangle', heroImage: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg', shortDescription: 'Ancient 200m rock fortress soaring above jungle canopy.' },
            { id: '2', name: 'Ella', slug: 'ella', region: 'Central Highlands', heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', shortDescription: 'Misty mountain village & Nine Arch Railway Bridge.' },
            { id: '3', name: 'Yala National Park', slug: 'yala', region: 'Wildlife Region', heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', shortDescription: 'Highest density leopard sanctuary in Asia.' },
            { id: '4', name: 'Galle Fort', slug: 'galle', region: 'Southern Coast', heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', shortDescription: '17th-century Dutch colonial walled fort on the ocean.' },
          ]).slice(0, 8).map((dest: any) => (
            <div key={dest.id} className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-96 relative">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={dest.heroImage}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[10px] uppercase font-bold text-ceylon-700">
                  {dest.region}
                </div>
                <button
                  onClick={() => toggleSave('DESTINATION', dest.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${isSaved(dest.id) ? 'bg-ceylon-600 text-ceylon-950' : 'bg-white/85 text-ceylon-700 hover:text-ceylon-500'}`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-ceylon-950 group-hover:text-ceylon-600 transition">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-ceylon-800 mt-1 line-clamp-2">
                    {dest.shortDescription}
                  </p>
                </div>

                <Link
                  href={`/destinations/${dest.slug}`}
                  className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold text-ceylon-700 hover:text-ceylon-500 mt-4"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Province Discovery */}
      <section className="bg-white text-ceylon-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ProvinceExplorer compact />
        </div>
      </section>

      {/* Section 6: Sri Lanka 365 (Seasonal Discovery) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-ceylon-500/30 relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase font-bold text-ceylon-400 tracking-widest flex items-center gap-1">
              <Sun className="w-4 h-4 text-gold-400" /> Sri Lanka 365
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-ceylon-950 mt-1">
              Where to Go Every Month of the Year
            </h2>
            <p className="text-sm text-ceylon-800 mt-2">
              Sri Lanka has two distinct monsoon seasons affecting opposite coasts — meaning it is always summer somewhere on the island.
            </p>
          </div>

          {/* Month selector tabs */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-4">
            {MONTHS.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition flex-shrink-0 ${selectedMonth === m ? 'bg-ceylon-600 text-ceylon-950 shadow-lg' : 'bg-white text-ceylon-800 border border-ceylon-500/20 hover:bg-ceylon-50'}`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Dynamic Month Content Preview */}
          <div className="mt-6 p-6 rounded-2xl bg-white border border-ceylon-500/20 grid grid-cols-1 md:grid-cols-3 gap-6 text-ceylon-900 shadow-xl shadow-ceylon-950/5">
            <div>
              <span className="text-xs text-ceylon-600 uppercase font-semibold">Recommended Coast</span>
              <h4 className="font-playfair text-xl font-bold text-ceylon-950 mt-1">
                {['December', 'January', 'February', 'March', 'April'].includes(selectedMonth) ? 'South & West Coasts (Galle, Mirissa, Bentota)' : 'East Coast (Trincomalee, Arugam Bay, Pasikudah)'}
              </h4>
              <p className="text-xs text-ceylon-800 mt-2">
                Clear blue skies, calm ocean waters for swimming, whale watching, and optimal diving visibility.
              </p>
            </div>

            <div>
              <span className="text-xs text-ceylon-600 uppercase font-semibold">Highlight Activity</span>
              <h4 className="font-playfair text-xl font-bold text-ceylon-950 mt-1">
                {['December', 'January', 'February'].includes(selectedMonth) ? 'Whale Watching & Adam’s Peak Trek' : 'Elephant Gathering & Point Break Surfing'}
              </h4>
              <p className="text-xs text-ceylon-800 mt-2">
                Ideal wildlife migration windows and peak dry season temperatures (27°C - 30°C).
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs text-ceylon-600 uppercase font-semibold">Average Temp</span>
                <div className="text-3xl font-playfair font-bold text-ceylon-950 mt-1">28°C</div>
              </div>
              <Link
                href="/when-to-visit"
                className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-ceylon-700 to-ceylon-500 text-ceylon-950 text-xs font-semibold uppercase tracking-wider mt-4"
              >
                <span>View Full 365 Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Interactive Map Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative h-[480px] rounded-3xl overflow-hidden glass-panel border border-ceylon-500/30 flex items-center justify-center p-8 text-center">
          <Image
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=80"
            alt="Sri Lanka Map Preview"
            fill
            className="object-cover opacity-20"
          />
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-white/90 border border-ceylon-400 flex items-center justify-center mx-auto text-ceylon-600">
              <MapPin className="w-8 h-8" />
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-ceylon-950">
              Explore Sri Lanka Interactively
            </h2>
            <p className="text-sm text-ceylon-800">
              Pinpoint ancient UNESCO sites, national park entrance gates, surf reef breaks, train stations, and boutique eco lodges across all 9 provinces.
            </p>
            <Link
              href="/map"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-ceylon-700 hover:bg-ceylon-600 text-ceylon-950 font-bold text-xs uppercase tracking-wider shadow-xl transition"
            >
              <span>Launch Full Screen Interactive Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Wild Sri Lanka */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[450px] rounded-3xl overflow-hidden glass-card">
            <Image
              src="https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80"
              alt="Wild Leopard Sri Lanka"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase font-bold text-ceylon-400 tracking-widest">
              Wild by Nature
            </span>
            <h2 className="font-playfair text-4xl font-bold text-ceylon-950">
              Home of the Big Three: Leopard, Elephant & Blue Whale
            </h2>
            <p className="text-sm text-ceylon-800 leading-relaxed">
              Sri Lanka holds the world's highest density of Sri Lankan leopards (*Panthera pardus kotiya*) in Yala National Park, alongside the largest seasonal gathering of Asian elephants on Earth at Minneriya.
            </p>

            <ul className="space-y-3 text-xs text-ceylon-900 font-medium">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-ceylon-400" />
                <span>Yala & Wilpattu Game Drives with Expert Naturalist Guides</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-ceylon-400" />
                <span>Mirissa & Trincomalee Offshore Blue Whale Expeditions</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-ceylon-400" />
                <span>Sinharaja UNESCO Primary Lowland Rainforest Birdwatching</span>
              </li>
            </ul>

            <Link
              href="/nature-adventure"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-ceylon-600 hover:bg-ceylon-500 text-ceylon-950 font-semibold text-xs uppercase tracking-wider transition"
            >
              <span>Explore Wildlife Expeditions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Popular Journeys / Itineraries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold text-ceylon-600 tracking-widest">
            Crafted Routes
          </span>
          <h2 className="font-playfair text-4xl font-bold text-ceylon-950 mt-1">
            Popular Travel Journeys
          </h2>
          <p className="text-xs text-ceylon-800 mt-2">
            Curated daily routes designed for seamless travel across Sri Lanka’s train routes and highways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Sri Lanka in 7 Days: Essential Island', duration: '7 Days / 6 Nights', pace: 'Balanced', image: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg', slug: 'sri-lanka-7-days' },
            { title: '10-Day Cultural Triangle & South Coast', duration: '10 Days / 9 Nights', pace: 'Comfort', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', slug: '10-day-cultural-south' },
            { title: '14-Day Grand Ceylon Overland Expedition', duration: '14 Days / 13 Nights', pace: 'Comprehensive', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', slug: '14-day-grand-expedition' },
          ].map((itin) => (
            <div key={itin.slug} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-96 group">
              <div className="relative h-48 w-full">
                <Image src={itin.image} alt={itin.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold text-gold-400">
                  {itin.duration}
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-ceylon-950 group-hover:text-ceylon-600 transition">
                    {itin.title}
                  </h3>
                  <p className="text-xs text-ceylon-800 mt-1">Pace: {itin.pace}</p>
                </div>
                <Link
                  href={`/itineraries/${itin.slug}`}
                  className="inline-flex items-center space-x-1 text-xs uppercase font-semibold text-ceylon-700 hover:text-ceylon-500 mt-4"
                >
                  <span>View Day-by-Day Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 10: Travel Stories & Magazine */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase font-bold text-ceylon-400 tracking-widest">
              Island Stories
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-ceylon-950 mt-1">
              Written Over 2,500 Years
            </h2>
          </div>
          <Link href="/stories" className="mt-4 sm:mt-0 text-sm font-semibold text-ceylon-700 hover:underline">
            Browse Magazine Stories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(stories.length > 0 ? stories : [
            { title: 'The Ultimate Ella Guide: Nine Arch Bridge & Tea Trails', slug: 'ultimate-ella-guide', category: 'Travel Guide', readTime: '6 min read', heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80' },
            { title: 'Sri Lanka’s Most Beautiful Train Journey: Kandy to Badulla', slug: 'scenic-train-journey', category: 'Culture', readTime: '5 min read', heroImage: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg' },
            { title: 'Where to See Leopards in Sri Lanka: Yala vs Wilpattu', slug: 'leopard-safari-guide', category: 'Wildlife', readTime: '7 min read', heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80' },
          ]).map((st: any) => (
            <Link key={st.slug} href={`/stories/${st.slug}`} className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative h-48 w-full">
                <Image src={st.heroImage} alt={st.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/85 text-[10px] font-bold text-ceylon-700 uppercase">
                  {st.category}
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] text-ceylon-700/70 uppercase">{st.readTime}</span>
                <h3 className="font-playfair text-lg font-bold text-ceylon-950 group-hover:text-ceylon-600 transition mt-1 line-clamp-2">
                  {st.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 11: Interactive Trip Planner Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-3xl p-10 sm:p-16 border border-ceylon-500/20 text-center relative overflow-hidden bg-gradient-to-r from-white via-ceylon-50 to-white">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs uppercase font-bold text-ceylon-600 tracking-widest">
              Instant Itinerary Generator
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ceylon-950">
              Ready to Plan Your Sri Lankan Journey?
            </h2>
            <p className="text-sm text-ceylon-800">
              Answer 5 quick questions about your dates, travelling companions, budget, and travel style to receive a personalized day-by-day itinerary.
            </p>
            <div className="pt-4">
              <Link
                href="/trip-planner"
                className="inline-flex items-center space-x-2 px-10 py-4 rounded-full bg-gradient-to-r from-ceylon-700 to-ceylon-500 hover:from-ceylon-600 hover:to-ceylon-400 text-ceylon-950 font-bold text-sm uppercase tracking-wider shadow-2xl transition transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Trip Planning Wizard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
