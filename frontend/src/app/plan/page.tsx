'use client';

import { useState } from 'react';
import {
  FileText, DollarSign, Sun, Smartphone, Zap, Shield, PhoneCall,
  Train, Bus, Car, Navigation, ShieldCheck, HeartPulse, ChevronDown
} from 'lucide-react';

const PLAN_SECTIONS = [
  {
    title: 'Before You Travel',
    icon: FileText,
    items: [
      { q: 'ETA Visa Requirements', a: 'Visitors require an Electronic Travel Authorization (ETA) prior to arrival. Apply online via eta.gov.lk. Tourist ETAs are typically valid for 30 days.' },
      { q: 'Currency & Banking', a: 'Sri Lankan Rupee (LKR). ATMs accepting Visa and Mastercard are widespread in towns. Credit cards are accepted in hotels and major restaurants, but carry cash for tuk-tuks and village stalls.' },
      { q: 'SIM Cards & Mobile Data', a: 'Dialog and Mobitel offer 30-day tourist eSIM and physical SIM cards at Colombo International Airport arrivals (Approx $10 for 50GB data).' },
      { q: 'Electricity & Plugs', a: '230V, 50Hz. Plugs are Type G (UK 3-prong) and Type D (round 3-prong).' },
      { q: 'Emergency Numbers', a: 'Tourist Police: 1912 | General Emergency: 119 | Ambulance: 1990 (Suwa Seriya free emergency service).' },
    ]
  },
  {
    title: 'Getting Around Sri Lanka',
    icon: Navigation,
    items: [
      { q: 'Scenic Train Journeys', a: 'Mainline trains connect Colombo, Kandy, Nanu Oya (Nuwara Eliya), and Ella. Book reserved 1st or 2nd class seats up to 30 days in advance.' },
      { q: 'Private Cars & Chauffeurs', a: 'Hiring a private English-speaking driver with an air-conditioned vehicle is the most flexible and comfortable way to explore the island.' },
      { q: 'Tuk-Tuks (Auto Rickshaws)', a: 'Ideal for short town rides. Use PickMe or Uber apps in Colombo, Kandy, and Galle for upfront metered fares.' },
      { q: 'Intercity Highway Express Buses', a: 'Air-conditioned luxury buses run frequently along Southern Expressway (Colombo – Galle – Matara).' },
    ]
  },
  {
    title: 'Traveller Health & Safety',
    icon: ShieldCheck,
    items: [
      { q: 'Tap Water Safety', a: 'Drink bottled or filtered water. Mineral water bottles are widely available across the island.' },
      { q: 'Hospitals & Healthcare', a: 'Colombo features world-class private hospitals (Asiri, Lanka Hospitals, Neville Fernando). Emergency 1990 ambulance response is swift nationwide.' },
      { q: 'Local Etiquette in Temples', a: 'Remove shoes and hats before entering Buddhist or Hindu temples. Cover shoulders and knees. Do not pose with your back turned to Buddha statues.' },
    ]
  }
];

export default function PlanYourTripPage() {
  const [openIdx, setOpenIdx] = useState<string | null>('Before You Travel-0');

  const toggleAccordion = (id: string) => {
    setOpenIdx(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-20">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
          Visitor Handbook
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-white">
          Plan Your Trip to Sri Lanka
        </h1>
        <p className="text-sm sm:text-base text-sand-200">
          Essential practical information on visas, currency, transport, SIM cards, health, and local temple etiquette.
        </p>
      </div>

      <div className="space-y-10">
        {PLAN_SECTIONS.map((sec) => (
          <div key={sec.title} className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-ceylon-500/20 pb-3">
              <sec.icon className="w-6 h-6 text-ceylon-400" />
              <h2 className="font-playfair text-2xl font-bold text-white">{sec.title}</h2>
            </div>

            <div className="space-y-3">
              {sec.items.map((item, idx) => {
                const accId = `${sec.title}-${idx}`;
                const isOpen = openIdx === accId;
                return (
                  <div key={item.q} className="glass-card rounded-2xl overflow-hidden border border-ceylon-500/20">
                    <button
                      onClick={() => toggleAccordion(accId)}
                      className="w-full p-5 text-left flex items-center justify-between font-semibold text-sm text-white hover:text-ceylon-300 transition"
                    >
                      <span>{item.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gold-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-sand-200 leading-relaxed border-t border-ceylon-500/10 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
