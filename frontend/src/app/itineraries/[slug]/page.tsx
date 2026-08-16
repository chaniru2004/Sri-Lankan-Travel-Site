'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Printer, Bookmark, ArrowRight } from 'lucide-react';

export default function ItineraryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-20">
      <div className="glass-panel p-8 rounded-3xl border border-ceylon-500/30 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400 text-gold-400 text-xs font-bold uppercase">
          Curated Sri Lanka Route
        </div>
        <h1 className="font-playfair text-4xl font-bold text-white">7-Day Ceylon Essential Adventure</h1>
        <p className="text-xs sm:text-sm text-sand-200">
          Covering Sigiriya, Kandy, Ella, Yala safari, and Mirissa beaches with scenic train connections.
        </p>

        <div className="flex items-center space-x-4 pt-4 border-t border-ceylon-500/20">
          <button onClick={() => window.print()} className="px-4 py-2 rounded-full glass-card text-xs text-white">Print Route</button>
          <Link href="/trip-planner" className="px-5 py-2 rounded-full bg-ceylon-500 text-ceylon-950 font-bold text-xs uppercase">
            Customize in Trip Planner
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { day: 1, route: 'Colombo → Sigiriya', desc: 'Transfer to Sigiriya. Evening climb of Pidurangala Rock for sunset over Sigiriya citadel.' },
          { day: 2, route: 'Sigiriya & Dambulla Cave Citadel', desc: 'Morning Sigiriya Rock ascent. Afternoon Dambulla Royal Cave Temple visit.' },
          { day: 3, route: 'Sigiriya → Kandy Sacred City', desc: 'Spice garden tour in Matale. Evening Temple of the Sacred Tooth Relic ceremony.' },
          { day: 4, route: 'Kandy → Ella Mainline Train', desc: 'Board Ceylon Railway across tea estates, waterfalls, and cloud forests.' },
          { day: 5, route: 'Ella Peak & Nine Arch Bridge', desc: 'Nine Arch Bridge train spot & trek Little Adam’s Peak.' },
          { day: 6, route: 'Ella → Yala Leopard Safari → Mirissa', desc: 'Dawn open-top 4x4 leopard safari in Yala National Park.' },
          { day: 7, route: 'Mirissa → Galle Fort → Airport', desc: 'Galle Fort ramparts walk & transfer to airport.' },
        ].map((d) => (
          <div key={d.day} className="glass-card p-6 rounded-2xl space-y-2">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-ceylon-500 text-ceylon-950 font-bold flex items-center justify-center text-xs">
                D{d.day}
              </span>
              <h3 className="font-playfair text-xl font-bold text-white">{d.route}</h3>
            </div>
            <p className="text-xs text-sand-200 leading-relaxed pl-11">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
