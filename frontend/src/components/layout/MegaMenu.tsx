'use client';

import Link from 'next/link';
import { ArrowRight, Compass, Landmark, Mountain, Sparkles, Utensils, Waves } from 'lucide-react';

interface MegaMenuProps {
  type: 'destinations' | 'things-to-do';
  onClose: () => void;
}

const destinationRegions = [
  ['Cultural Triangle', 'Sigiriya, Dambulla, Anuradhapura', '/destinations?region=Cultural+Triangle'],
  ['Central Highlands', 'Kandy, Ella, Nuwara Eliya', '/destinations?region=Central'],
  ['Southern Coast', 'Galle, Mirissa, Tangalle', '/destinations?region=Southern'],
  ['Eastern Shores', 'Trincomalee, Pasikudah, Arugam Bay', '/destinations?region=Eastern'],
  ['Northern Peninsula', 'Jaffna, Delft Island, Mannar', '/destinations?region=Northern'],
  ['Wildlife Country', 'Yala, Wilpattu, Minneriya', '/destinations?region=Wildlife'],
];

const destinationHighlights = [
  {
    title: 'Sigiriya Rock',
    label: 'UNESCO Heritage',
    href: '/destinations/sigiriya',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Ella Highlands',
    label: 'Tea Country',
    href: '/destinations/ella',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
  },
];

const thingsToDo = [
  ['Culture & Temples', 'Ancient capitals, stupas, kovils, and living traditions.', '/things-to-do?category=culture', Landmark],
  ['Wildlife Safaris', 'Leopard trails, elephant gatherings, and bird sanctuaries.', '/things-to-do?category=wildlife', Compass],
  ['Surfing & Diving', 'Point breaks, reef dives, lagoons, and whale watching.', '/things-to-do?category=surfing', Waves],
  ['Tea & Gastronomy', 'Estate tastings, spice routes, markets, and clay pot food.', '/things-to-do?category=food', Utensils],
  ['Mountain Adventure', 'Cloud forests, waterfalls, pilgrim climbs, and ridge walks.', '/nature-adventure', Mountain],
  ['Wellness Retreats', 'Ayurveda, yoga, ocean spas, and slow village stays.', '/things-to-do?category=wellness', Sparkles],
] as const;

export function MegaMenu({ type, onClose }: MegaMenuProps) {
  return (
    <div
      onMouseEnter={() => undefined}
      className="absolute left-0 top-full w-full border-t border-ceylon-950/10 bg-white text-ceylon-950 shadow-2xl shadow-ceylon-950/10 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {type === 'destinations' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_0.9fr_1.2fr] gap-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ceylon-600 mb-5">Top Regions</h3>
              <div className="space-y-4">
                {destinationRegions.slice(0, 3).map(([title, desc, href]) => (
                  <Link key={title} href={href} onClick={onClose} className="group block">
                    <span className="flex items-center justify-between gap-3 font-bold text-lg group-hover:text-ceylon-600 transition">
                      {title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                    </span>
                    <span className="mt-1 block text-sm text-ceylon-800/65">{desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ceylon-600 mb-5">More Places</h3>
              <div className="space-y-4">
                {destinationRegions.slice(3).map(([title, desc, href]) => (
                  <Link key={title} href={href} onClick={onClose} className="group block">
                    <span className="flex items-center justify-between gap-3 font-bold text-lg group-hover:text-ceylon-600 transition">
                      {title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                    </span>
                    <span className="mt-1 block text-sm text-ceylon-800/65">{desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ceylon-600 mb-5">Featured Destinations</h3>
              <div className="grid grid-cols-2 gap-4">
                {destinationHighlights.map((item) => (
                  <Link key={item.title} href={item.href} onClick={onClose} className="group relative h-64 overflow-hidden rounded-xl">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ceylon-950/85 via-ceylon-950/15 to-transparent p-5 flex flex-col justify-end">
                      <span className="text-xs font-bold uppercase tracking-widest text-ceylon-200">{item.label}</span>
                      <span className="font-playfair text-2xl font-bold text-white">{item.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.2fr] gap-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ceylon-600 mb-5">Top Categories</h3>
              <div className="space-y-4">
                {thingsToDo.slice(0, 3).map(([title, desc, href, Icon]) => (
                  <Link key={title} href={href} onClick={onClose} className="group flex gap-3">
                    <Icon className="w-5 h-5 text-ceylon-600 mt-1 flex-shrink-0" />
                    <span>
                      <span className="block font-bold text-lg group-hover:text-ceylon-600 transition">{title}</span>
                      <span className="block text-sm text-ceylon-800/65">{desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ceylon-600 mb-5">Island Experiences</h3>
              <div className="space-y-4">
                {thingsToDo.slice(3).map(([title, desc, href, Icon]) => (
                  <Link key={title} href={href} onClick={onClose} className="group flex gap-3">
                    <Icon className="w-5 h-5 text-ceylon-600 mt-1 flex-shrink-0" />
                    <span>
                      <span className="block font-bold text-lg group-hover:text-ceylon-600 transition">{title}</span>
                      <span className="block text-sm text-ceylon-800/65">{desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ceylon-600 mb-5">Attractions of the Month</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Horton Plains', 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'],
                  ['Arugam Bay', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'],
                ].map(([title, image]) => (
                  <Link key={title} href="/things-to-do" onClick={onClose} className="group relative h-64 overflow-hidden rounded-xl">
                    <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ceylon-950/85 via-transparent to-transparent p-5 flex items-end">
                      <span className="font-playfair text-2xl font-bold text-white">{title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
