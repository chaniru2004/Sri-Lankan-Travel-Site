'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Compass, Landmark, Mountain, Waves, Utensils, Heart } from 'lucide-react';

interface MegaMenuProps {
  type: 'destinations' | 'things-to-do';
  onClose: () => void;
}

export function MegaMenu({ type, onClose }: MegaMenuProps) {
  if (type === 'destinations') {
    return (
      <div className="absolute top-full left-0 w-full glass-nav border-t border-ceylon-500/20 py-8 px-6 text-sand-50 shadow-2xl z-50 animate-fadeIn">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-semibold text-ceylon-400 tracking-wider uppercase mb-4">Regions of Ceylon</h4>
            <ul className="space-y-2 text-sm text-sand-200">
              <li><Link href="/destinations?region=Cultural+Triangle" onClick={onClose} className="hover:text-ceylon-300 transition">Cultural Triangle (Sigiriya, Kandy)</Link></li>
              <li><Link href="/destinations?region=Central" onClick={onClose} className="hover:text-ceylon-300 transition">Central Highlands (Ella, Nuwara Eliya)</Link></li>
              <li><Link href="/destinations?region=Southern" onClick={onClose} className="hover:text-ceylon-300 transition">Southern Coast (Galle, Mirissa)</Link></li>
              <li><Link href="/destinations?region=Eastern" onClick={onClose} className="hover:text-ceylon-300 transition">Eastern Shores (Trincomalee, Arugam Bay)</Link></li>
              <li><Link href="/destinations?region=Northern" onClick={onClose} className="hover:text-ceylon-300 transition">Northern Peninsula (Jaffna)</Link></li>
              <li><Link href="/destinations?region=Wildlife" onClick={onClose} className="hover:text-ceylon-300 transition">Wildlife Reserves (Yala, Wilpattu)</Link></li>
            </ul>
          </div>

          <div className="col-span-3 grid grid-cols-3 gap-4">
            <Link href="/destinations/sigiriya" onClick={onClose} className="group relative h-40 rounded-xl overflow-hidden glass-card">
              <Image src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=80" alt="Sigiriya" fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs text-gold-400 font-semibold">UNESCO Heritage</span>
                <h5 className="font-playfair text-lg text-white font-bold">Sigiriya Rock</h5>
              </div>
            </Link>

            <Link href="/destinations/ella" onClick={onClose} className="group relative h-40 rounded-xl overflow-hidden glass-card">
              <Image src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=600&q=80" alt="Ella" fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs text-gold-400 font-semibold">Misty Highlands</span>
                <h5 className="font-playfair text-lg text-white font-bold">Ella Peak</h5>
              </div>
            </Link>

            <Link href="/destinations/galle" onClick={onClose} className="group relative h-40 rounded-xl overflow-hidden glass-card">
              <Image src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80" alt="Galle" fill className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs text-gold-400 font-semibold">Dutch Ramparts</span>
                <h5 className="font-playfair text-lg text-white font-bold">Galle Fort</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 w-full glass-nav border-t border-ceylon-500/20 py-8 px-6 text-sand-50 shadow-2xl z-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link href="/things-to-do?category=culture" onClick={onClose} className="p-4 rounded-xl glass-card flex items-start space-x-3">
          <Landmark className="text-ceylon-400 w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h5 className="font-semibold text-sand-50">Culture & Temples</h5>
            <p className="text-xs text-sand-200 mt-1">Ancient stupas & 2,500 years of royal heritage.</p>
          </div>
        </Link>

        <Link href="/things-to-do?category=wildlife" onClick={onClose} className="p-4 rounded-xl glass-card flex items-start space-x-3">
          <Compass className="text-ceylon-400 w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h5 className="font-semibold text-sand-50">Leopard & Elephant Safaris</h5>
            <p className="text-xs text-sand-200 mt-1">Yala, Wilpattu & Asian elephant gathering.</p>
          </div>
        </Link>

        <Link href="/things-to-do?category=surfing" onClick={onClose} className="p-4 rounded-xl glass-card flex items-start space-x-3">
          <Waves className="text-ceylon-400 w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h5 className="font-semibold text-sand-50">Surfing & Diving</h5>
            <p className="text-xs text-sand-200 mt-1">Arugam Bay point breaks & Pigeon Island reef.</p>
          </div>
        </Link>

        <Link href="/things-to-do?category=food" onClick={onClose} className="p-4 rounded-xl glass-card flex items-start space-x-3">
          <Utensils className="text-ceylon-400 w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h5 className="font-semibold text-sand-50">Ceylon Tea & Gastronomy</h5>
            <p className="text-xs text-sand-200 mt-1">Spice tours, clay pot curry & tea estates.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
