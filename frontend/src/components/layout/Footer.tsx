'use client';

import Link from 'next/link';
import { Compass, Send, Instagram, Youtube, Facebook, Shield, Heart } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-ceylon-950 border-t border-ceylon-500/20 text-sand-200 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-ceylon-500 flex items-center justify-center text-ceylon-950 font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-playfair text-2xl font-bold text-white">Visit Sri Lanka</span>
          </Link>
          <p className="text-sm text-sand-200/80 leading-relaxed max-w-sm">
            One Island. A Thousand Journeys. Discover ancient UNESCO heritage, wild elephant gathering, world-class point breaks, and Ceylon tea hills.
          </p>

          {/* Newsletter Form */}
          <div className="pt-2">
            <h5 className="text-xs uppercase font-semibold text-ceylon-400 tracking-wider mb-2">Subscribe to Sri Lanka Travel Stories</h5>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-ceylon-900/80 border border-ceylon-500/30 rounded-full px-4 py-2 text-xs text-white placeholder-sand-200/40 focus:outline-none focus:border-ceylon-400 flex-1"
              />
              <button type="submit" className="p-2 rounded-full bg-ceylon-500 hover:bg-ceylon-400 text-ceylon-950 transition">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h4 className="font-playfair text-lg font-bold text-white mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/destinations" className="hover:text-ceylon-300 transition">Destinations</Link></li>
            <li><Link href="/things-to-do" className="hover:text-ceylon-300 transition">Things to Do</Link></li>
            <li><Link href="/nature-adventure" className="hover:text-ceylon-300 transition">Nature & Safari</Link></li>
            <li><Link href="/food" className="hover:text-ceylon-300 transition">Taste Sri Lanka</Link></li>
            <li><Link href="/events" className="hover:text-ceylon-300 transition">Cultural Events</Link></li>
            <li><Link href="/stories" className="hover:text-ceylon-300 transition">Travel Stories</Link></li>
          </ul>
        </div>

        {/* Column 3: Plan */}
        <div>
          <h4 className="font-playfair text-lg font-bold text-white mb-4">Plan Your Trip</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/trip-planner" className="hover:text-ceylon-300 transition">Interactive Trip Planner</Link></li>
            <li><Link href="/itineraries" className="hover:text-ceylon-300 transition">Popular Itineraries</Link></li>
            <li><Link href="/when-to-visit" className="hover:text-ceylon-300 transition">When to Visit (365)</Link></li>
            <li><Link href="/plan" className="hover:text-ceylon-300 transition">Visa & Transport Info</Link></li>
            <li><Link href="/stay" className="hover:text-ceylon-300 transition">Accommodation Guide</Link></li>
            <li><Link href="/map" className="hover:text-ceylon-300 transition">Interactive Map</Link></li>
          </ul>
        </div>

        {/* Column 4: Admin & Legal */}
        <div>
          <h4 className="font-playfair text-lg font-bold text-white mb-4">Portal & Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/account" className="hover:text-ceylon-300 transition">My Saved Places</Link></li>
            <li><Link href="/admin" className="hover:text-ceylon-300 transition flex items-center gap-1 text-gold-400 font-semibold"><Shield className="w-3.5 h-3.5" /> Admin CMS Portal</Link></li>
            <li><Link href="/plan#safety" className="hover:text-ceylon-300 transition">Tourist Police & Emergency</Link></li>
            <li><Link href="/plan#accessibility" className="hover:text-ceylon-300 transition">Accessibility Guide</Link></li>
          </ul>

          <div className="pt-4 flex items-center space-x-3 text-sand-200">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full glass-panel hover:text-ceylon-300 transition"><Instagram className="w-4 h-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-full glass-panel hover:text-ceylon-300 transition"><Youtube className="w-4 h-4" /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-full glass-panel hover:text-ceylon-300 transition"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-ceylon-500/10 flex flex-col md:flex-row items-center justify-between text-xs text-sand-200/60">
        <p>© 2026 Visit Sri Lanka. All Rights Reserved. Crafted with care for global travellers.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/plan" className="hover:text-sand-100 transition">Privacy Policy</Link>
          <Link href="/plan" className="hover:text-sand-100 transition">Terms of Service</Link>
          <Link href="/plan" className="hover:text-sand-100 transition">Cookies</Link>
          <Link href="/plan" className="hover:text-sand-100 transition">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
