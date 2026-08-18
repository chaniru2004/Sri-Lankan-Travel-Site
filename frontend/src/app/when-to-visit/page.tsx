'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sun, Calendar, CloudRain, Waves, Compass, ArrowRight, Sparkles } from 'lucide-react';

const MONTH_DATA: Record<string, any> = {
  January: {
    coast: 'South & West Coasts (Galle, Mirissa, Hikkaduwa, Colombo)',
    highlands: 'Ella, Kandy, Nuwara Eliya (Cool dry mornings 15°C)',
    wildlife: 'Blue Whale migration in Mirissa & Yala leopard safaris',
    events: 'Duruthu Perahera in Kelaniya & Galle Literary Festival',
    weather: 'Sunny & dry (28°C avg). Ideal for beach lovers & cultural touring.',
    recDestinations: ['Sigiriya', 'Ella', 'Galle', 'Mirissa'],
  },
  February: {
    coast: 'South & West Coasts (Weligama, Tangalle, Bentota)',
    highlands: 'Peak trekking season for Adam’s Peak & Ella Rock',
    wildlife: 'Leopard tracking in Yala Block 1 dry season',
    events: 'Independence Day Celebrations (Feb 4)',
    weather: 'Crisp sunny days across Central, Cultural & Southern regions.',
    recDestinations: ['Kandy', 'Ella', 'Yala', 'Mirissa'],
  },
  March: {
    coast: 'South-West Coast & Early East Coast transition',
    highlands: 'Ceylon tea picking season in Nuwara Eliya',
    wildlife: 'Sloth bear & elephant spotting in Wilpattu',
    events: 'Medin Perahera & sacred moon festivals',
    weather: 'Warm sunny weather (30°C). Calm seas nationwide.',
    recDestinations: ['Sigiriya', 'Nuwara Eliya', 'Galle'],
  },
  April: {
    coast: 'Weligama, Mirissa, Colombo beaches',
    highlands: 'Nuwara Eliya flower festival & horse racing season',
    wildlife: 'Marine life & turtle nesting in Rekawa',
    events: 'Sinhala & Tamil New Year (Avurudu - April 13/14)',
    weather: 'Hottest month (32°C). Festive cultural traditional celebrations.',
    recDestinations: ['Nuwara Eliya', 'Anuradhapura', 'Jaffna'],
  },
  May: {
    coast: 'East Coast season opens (Trincomalee, Pasikudah, Arugam Bay)',
    highlands: 'Knuckles mountain forest hikes',
    wildlife: 'Pigeon Island marine snorkeling in Trincomalee',
    events: 'Vesak Festival of Lights (Lanterns across island)',
    weather: 'South-West Monsoon starts; East Coast turns perfectly sunny (29°C).',
    recDestinations: ['Trincomalee', 'Arugam Bay', 'Pasikudah'],
  },
  June: {
    coast: 'East Coast point break surfing in Arugam Bay',
    highlands: 'Cultural Triangle (Sigiriya, Dambulla)',
    wildlife: 'Blue whale watching in Trincomalee Swami Rock',
    events: 'Poson Perahera in Mihintale & Anuradhapura',
    weather: 'East Coast dry summer season (30°C).',
    recDestinations: ['Arugam Bay', 'Trincomalee', 'Mihintale'],
  },
  July: {
    coast: 'East Coast beaches & Arugam Bay surf comps',
    highlands: 'Cultural Triangle dry zone tours',
    wildlife: 'The Great Elephant Gathering starts in Minneriya',
    events: 'Esala Perahera rehearsals in Kandy & Kataragama Fest',
    weather: 'Hot sunny East Coast (31°C). Dry inland Cultural Triangle.',
    recDestinations: ['Kandy', 'Minneriya', 'Arugam Bay'],
  },
  August: {
    coast: 'Trincomalee & Nilaveli turquoise waters',
    highlands: 'Kandy Esala Perahera tooth relic procession',
    wildlife: '300+ Elephants gathered at Minneriya Reservoir bank',
    events: 'Kandy Esala Perahera (Colossal elephant parade)',
    weather: 'Peak summer holiday window for East Coast & Cultural Triangle.',
    recDestinations: ['Kandy', 'Sigiriya', 'Trincomalee'],
  },
  September: {
    coast: 'East Coast late season & Pasikudah calm bays',
    highlands: 'Ella tea hill ridge walking',
    wildlife: 'Peak Minneriya & Kaudulla Elephant Gathering',
    events: 'Nallur Kandaswamy Kovil Festival in Jaffna',
    weather: 'Pleasant warm weather inland; transitional ocean currents.',
    recDestinations: ['Jaffna', 'Minneriya', 'Pasikudah'],
  },
  October: {
    coast: 'Inter-monsoon nationwide explorer month',
    highlands: 'Waterfalls in full flow (Diyaluma, Bambarakanda)',
    wildlife: 'Birdwatching in Bundala UNESCO Biosphere Reserve',
    events: 'Deepavali Festival of Lights',
    weather: 'Tropical rain showers feeding lush green waterfalls.',
    recDestinations: ['Ella', 'Bundala', 'Colombo'],
  },
  November: {
    coast: 'South & West coast beach season begins to open',
    highlands: 'Mist-covered cloud forests in Horton Plains',
    wildlife: 'Migratory birds arrive from Siberia',
    events: 'Ill Perahera & tea estate harvest',
    weather: 'Inter-monsoon subsiding; South coast turns clear and sunny.',
    recDestinations: ['Mirissa', 'Galle', 'Udawalawe'],
  },
  December: {
    coast: 'South Coast peak season (Galle, Mirissa, Hiriketiya)',
    highlands: 'Adam’s Peak pilgrimage season official start',
    wildlife: 'Whale watching off Mirissa coast',
    events: 'Christmas & New Year beach parties in Hikkaduwa',
    weather: 'Glorious tropical sunshine on South/West beaches (28°C).',
    recDestinations: ['Galle', 'Mirissa', 'Sigiriya', 'Ella'],
  },
};

const MONTHS = Object.keys(MONTH_DATA);

export default function WhenToVisitPage() {
  const [selectedMonth, setSelectedMonth] = useState('February');
  const info = MONTH_DATA[selectedMonth];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-20 text-ceylon-950">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-ceylon-600">
          Sri Lanka 365
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950">
          When Should You Visit Sri Lanka?
        </h1>
        <p className="text-sm sm:text-base text-ceylon-800">
          Due to Sri Lanka’s dual monsoon system, there is always sunny weather, calm ocean waters, and wildlife safaris on one side of the island.
        </p>
      </div>

      {/* Month Selector */}
      <div className="glass-panel p-4 rounded-2xl border border-ceylon-500/30">
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {MONTHS.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${selectedMonth === m ? 'bg-gradient-to-r from-ceylon-500 to-teal-500 text-white shadow-xl scale-105' : 'bg-white border border-ceylon-500/20 text-ceylon-700 hover:border-ceylon-400 hover:text-ceylon-950'}`}
            >
              {m.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Month Detail Dashboard */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-ceylon-500/20 space-y-8 shadow-2xl shadow-ceylon-950/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-ceylon-500/20 pb-6 gap-4">
          <div>
            <span className="text-xs font-bold text-ceylon-600 uppercase tracking-widest">Selected Month</span>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ceylon-950">{selectedMonth} in Sri Lanka</h2>
          </div>
          <Link
            href={`/trip-planner?month=${selectedMonth}`}
            className="px-6 py-3 rounded-full bg-ceylon-600 hover:bg-ceylon-500 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center space-x-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate {selectedMonth} Itinerary</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-ceylon-950">
          <div className="bg-white border border-ceylon-500/20 p-6 rounded-2xl space-y-2 shadow-xl shadow-ceylon-950/5">
            <Waves className="w-6 h-6 text-ceylon-400" />
            <h4 className="font-playfair text-lg font-bold text-ceylon-950">Best Coastal Regions</h4>
            <p className="text-sm text-ceylon-800 leading-relaxed">{info.coast}</p>
          </div>

          <div className="bg-white border border-ceylon-500/20 p-6 rounded-2xl space-y-2 shadow-xl shadow-ceylon-950/5">
            <Compass className="w-6 h-6 text-ceylon-500" />
            <h4 className="font-playfair text-lg font-bold text-ceylon-950">Highland Climate & Trekking</h4>
            <p className="text-sm text-ceylon-800 leading-relaxed">{info.highlands}</p>
          </div>

          <div className="bg-white border border-ceylon-500/20 p-6 rounded-2xl space-y-2 shadow-xl shadow-ceylon-950/5">
            <Sun className="w-6 h-6 text-emerald-400" />
            <h4 className="font-playfair text-lg font-bold text-ceylon-950">Wildlife & Safaris</h4>
            <p className="text-sm text-ceylon-800 leading-relaxed">{info.wildlife}</p>
          </div>

          <div className="bg-white border border-ceylon-500/20 p-6 rounded-2xl space-y-2 shadow-xl shadow-ceylon-950/5">
            <Calendar className="w-6 h-6 text-ceylon-400" />
            <h4 className="font-playfair text-lg font-bold text-ceylon-950">Cultural Events & Festivals</h4>
            <p className="text-sm text-ceylon-800 leading-relaxed">{info.events}</p>
          </div>

          <div className="bg-white border border-ceylon-500/20 p-6 rounded-2xl space-y-2 lg:col-span-2 shadow-xl shadow-ceylon-950/5">
            <CloudRain className="w-6 h-6 text-ceylon-500" />
            <h4 className="font-playfair text-lg font-bold text-ceylon-950">Weather Patterns & Summary</h4>
            <p className="text-sm text-ceylon-800 leading-relaxed">{info.weather}</p>

            <div className="pt-4 flex flex-wrap gap-2">
              <span className="text-xs text-ceylon-700 font-semibold mr-2">Top Places to Visit in {selectedMonth}:</span>
              {info.recDestinations.map((d: string) => (
                <Link
                  key={d}
                  href={`/destinations`}
                  className="px-3 py-1 rounded-full bg-ceylon-500/20 border border-ceylon-400/30 text-ceylon-300 text-xs font-semibold hover:border-ceylon-400"
                >
                  {d}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
