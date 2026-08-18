'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Search, Globe, MapPin, Menu, X, ChevronDown, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { MegaMenu } from './MegaMenu';
import { SearchModal } from '../ui/SearchModal';

export function Header() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [megaMenu, setMegaMenu] = useState<'destinations' | 'things-to-do' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        onMouseLeave={() => setMegaMenu(null)}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-white/95 backdrop-blur-xl border-b border-ceylon-500/10 py-5 shadow-lg shadow-ceylon-950/5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-ceylon-700 via-ceylon-500 to-ceylon-300 p-[2px] shadow-lg group-hover:scale-105 transition duration-300">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Compass className="w-6 h-6 text-ceylon-600 group-hover:rotate-45 transition duration-500" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="block font-playfair text-xl sm:text-2xl font-bold tracking-wide text-ceylon-950 group-hover:text-ceylon-600 transition whitespace-nowrap">
                {t('brandName')}
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-widest text-ceylon-600 font-semibold">
                Official Tourism Gateway
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-ceylon-950">
            <Link href="/why-sri-lanka" className="py-3 hover:text-ceylon-600 transition">
              {t('nav.whySriLanka')}
            </Link>

            <div 
              onMouseEnter={() => setMegaMenu('destinations')}
              className="py-3"
            >
              <Link href="/destinations" className={`flex items-center gap-1 transition ${megaMenu === 'destinations' ? 'text-ceylon-500' : 'hover:text-ceylon-600'}`}>
                <span>{t('nav.destinations')}</span>
                <ChevronDown className={`w-4 h-4 transition ${megaMenu === 'destinations' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            <div 
              onMouseEnter={() => setMegaMenu('things-to-do')}
              className="py-3"
            >
              <Link href="/things-to-do" className={`flex items-center gap-1 transition ${megaMenu === 'things-to-do' ? 'text-ceylon-500' : 'hover:text-ceylon-600'}`}>
                <span>{t('nav.thingsToDo')}</span>
                <ChevronDown className={`w-4 h-4 transition ${megaMenu === 'things-to-do' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            <Link href="/nature-adventure" className="py-3 hover:text-ceylon-600 transition">
              {t('nav.natureAdventure')}
            </Link>

            <Link href="/when-to-visit" className="py-3 hover:text-ceylon-600 transition">
              {t('nav.whenToVisit')}
            </Link>

            <Link href="/map" className="py-3 flex items-center gap-1 text-ceylon-600 hover:text-ceylon-500 transition font-semibold">
              <MapPin className="w-4 h-4" />
              <span>{t('nav.map')}</span>
            </Link>
          </nav>

          {/* Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full glass-panel hover:border-ceylon-400 text-ceylon-800 hover:text-ceylon-600 transition"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 rounded-full glass-panel hover:border-ceylon-400 text-ceylon-800 hover:text-ceylon-600 transition flex items-center space-x-1 text-xs uppercase"
              >
                <Globe className="w-4 h-4 text-ceylon-300" />
                <span className="font-bold">{lang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 glass-panel rounded-xl py-2 shadow-2xl border border-ceylon-500/20 text-xs z-50">
                  <button onClick={() => { setLang('en'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-ceylon-100 text-ceylon-950 font-medium">English</button>
                  <button onClick={() => { setLang('si'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-ceylon-100 text-ceylon-950 font-medium">සිංහල</button>
                  <button onClick={() => { setLang('ta'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-ceylon-100 text-ceylon-950 font-medium">தமிழ்</button>
                </div>
              )}
            </div>

            {/* Account / Saved */}
            <Link 
              href="/account"
              className="p-2 rounded-full glass-panel hover:border-ceylon-400 text-ceylon-800 hover:text-ceylon-600 transition hidden sm:flex"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* CTA Plan My Trip */}
            <Link 
              href="/trip-planner"
              className="hidden md:inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-ceylon-700 via-ceylon-600 to-ceylon-500 hover:from-ceylon-600 hover:to-ceylon-400 text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:shadow-ceylon-500/25 transition duration-300"
            >
              <span>{t('nav.planMyTrip')}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-ceylon-800 hover:text-ceylon-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {megaMenu && <MegaMenu type={megaMenu} onClose={() => setMegaMenu(null)} />}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-ceylon-500/20 px-4 sm:px-6 py-5 text-ceylon-950 shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link href="/why-sri-lanka" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-ceylon-50">{t('nav.whySriLanka')}</Link>
              <Link href="/destinations" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-ceylon-50">{t('nav.destinations')}</Link>
              <Link href="/things-to-do" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-ceylon-50">{t('nav.thingsToDo')}</Link>
              <Link href="/nature-adventure" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-ceylon-50">{t('nav.natureAdventure')}</Link>
              <Link href="/when-to-visit" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-ceylon-50">{t('nav.whenToVisit')}</Link>
              <Link href="/map" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold text-ceylon-600 hover:bg-ceylon-50">{t('nav.map')}</Link>
              <Link href="/food" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-ceylon-50">{t('nav.food')}</Link>
              <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-ceylon-50">{t('nav.events')}</Link>
              <Link href="/stories" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-ceylon-50">{t('nav.stories')}</Link>
            </div>
            <Link href="/trip-planner" onClick={() => setMobileMenuOpen(false)} className="mt-4 block w-full text-center py-3 rounded-xl bg-ceylon-600 font-bold text-white">{t('nav.planMyTrip')}</Link>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
