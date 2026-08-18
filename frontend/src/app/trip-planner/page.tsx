'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar, Users, Heart, Shield, Gauge, Sparkles, CheckCircle2,
  ArrowRight, ArrowLeft, Trash2, MoveUp, MoveDown, Share2, Printer, Bookmark
} from 'lucide-react';
import { api } from '@/lib/api';

const INTERESTS_OPTIONS = [
  'Wildlife & Safari', 'Golden Beaches', 'Ancient Culture', 'Highland Hiking',
  'Ceylon Food & Tea', 'Surfing & Oceans', 'Ayurveda & Wellness', 'Photography'
];

const STYLES_OPTIONS = ['Budget', 'Comfort', 'Premium', 'Luxury'];
const PACES_OPTIONS = ['Relaxed', 'Balanced', 'Fast'];
const GROUP_OPTIONS = ['Solo', 'Couple', 'Family', 'Friends'];

export default function TripPlannerPage() {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState('2026-11-10');
  const [endDate, setEndDate] = useState('2026-11-17');
  const [travellersGroup, setTravellersGroup] = useState('Couple');
  const [travellersCount, setTravellersCount] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Ancient Culture', 'Highland Hiking']);
  const [style, setStyle] = useState('Comfort');
  const [pace, setPace] = useState('Balanced');
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (item: string) => {
    setSelectedInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const dto = {
        startDate,
        endDate,
        travellersGroup,
        travellersCount,
        interests: selectedInterests,
        style,
        pace,
      };
      const res = await api.generateItinerary(dto);
      setGeneratedItinerary(res || {
        title: '7-Day Ceylon Essential Adventure',
        durationDays: 7,
        days: [
          { dayNumber: 1, title: 'Colombo → Sigiriya', description: 'Arrive at Bandaranaike International Airport. Transfer via private car to Sigiriya. Check into hotel and enjoy dinner overlooking the rock citadel.', items: [{ title: 'Sigiriya Rock Fortress Sunset View', itemType: 'ATTRACTION', activityTime: 'Late Afternoon', estimatedCost: '$30' }] },
          { dayNumber: 2, title: 'Sigiriya Lion Rock & Dambulla Caves', description: 'Early morning climb up 5th-century Sigiriya Citadel rock. Afternoon visit to Dambulla UNESCO cave temple.', items: [{ title: 'Sigiriya Rock Climb', itemType: 'ATTRACTION', activityTime: 'Morning', estimatedCost: '$36' }, { title: 'Dambulla Cave Complex', itemType: 'ATTRACTION', activityTime: 'Afternoon', estimatedCost: '$10' }] },
          { dayNumber: 3, title: 'Sigiriya → Kandy Sacred City', description: 'Scenic drive to Kandy. Visit Spice Gardens in Matale and Temple of the Sacred Tooth Relic.', items: [{ title: 'Temple of the Tooth Relic', itemType: 'ATTRACTION', activityTime: 'Evening', estimatedCost: '$15' }] },
          { dayNumber: 4, title: 'Kandy → Ella Scenic Train Route', description: 'Board the famous blue highland train from Kandy to Ella through tea plantations.', items: [{ title: 'Mainline Ceylon Railway Journey', itemType: 'TRANSPORT', activityTime: 'Morning', estimatedCost: '$12' }] },
          { dayNumber: 5, title: 'Ella Peak & Nine Arch Bridge', description: 'Trek Ella Rock or Little Adam’s Peak. Watch afternoon train pass Nine Arch Bridge.', items: [{ title: 'Nine Arch Bridge', itemType: 'ATTRACTION', activityTime: 'Afternoon', estimatedCost: 'Free' }] },
          { dayNumber: 6, title: 'Ella → Yala Safari → Mirissa Coast', description: 'Morning 4x4 leopard safari in Yala National Park. Transfer to Mirissa beach.', items: [{ title: 'Yala Leopard Safari', itemType: 'EXPERIENCE', activityTime: 'Morning', estimatedCost: '$60' }] },
          { dayNumber: 7, title: 'Galle Fort → Colombo Departure', description: 'Morning walk along Dutch Ramparts in Galle Fort. Transfer to Colombo for departure.', items: [{ title: 'Galle Fort Heritage Walk', itemType: 'ATTRACTION', activityTime: 'Morning', estimatedCost: 'Free' }] },
        ]
      });
      setStep(6);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-20">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
          Smart Travel Engine
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-ceylon-950">
          {step === 6 ? generatedItinerary?.title : 'Craft Your Sri Lanka Itinerary'}
        </h1>
        <p className="text-xs sm:text-sm text-ceylon-700">
          {step === 6 ? 'Your custom day-by-day travel plan is ready. Reorder activities, save, or print.' : `Step ${step} of 5 — Answer a few questions to generate your journey.`}
        </p>
      </div>

      {/* Wizard Progress Indicator */}
      {step < 6 && (
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-10 bg-ceylon-400' : s < step ? 'w-6 bg-ceylon-700' : 'w-6 bg-ceylon-950'}`}
            />
          ))}
        </div>
      )}

      {/* Step 1: Dates */}
      {step === 1 && (
        <div className="glass-panel p-8 rounded-3xl border border-ceylon-500/30 space-y-6 text-ceylon-950">
          <h3 className="font-playfair text-2xl font-bold text-ceylon-950 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-ceylon-400" /> When are you visiting Sri Lanka?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-ceylon-700 mb-2">Arrival Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-ceylon-950/80 border border-ceylon-500/30 rounded-xl px-4 py-3 text-sm text-ceylon-950 focus:outline-none focus:border-ceylon-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ceylon-700 mb-2">Departure Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-ceylon-950/80 border border-ceylon-500/30 rounded-xl px-4 py-3 text-sm text-ceylon-950 focus:outline-none focus:border-ceylon-400"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-8 py-3 rounded-full bg-ceylon-500 hover:bg-ceylon-400 text-ceylon-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2"
            >
              <span>Next: Who is Travelling?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Travellers */}
      {step === 2 && (
        <div className="glass-panel p-8 rounded-3xl border border-ceylon-500/30 space-y-6 text-ceylon-950">
          <h3 className="font-playfair text-2xl font-bold text-ceylon-950 flex items-center gap-2">
            <Users className="w-6 h-6 text-gold-400" /> Who is travelling?
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {GROUP_OPTIONS.map((g) => (
              <button
                key={g}
                onClick={() => setTravellersGroup(g)}
                className={`p-5 rounded-2xl border text-center font-bold text-sm transition ${travellersGroup === g ? 'bg-ceylon-500 text-ceylon-950 border-ceylon-400 shadow-xl' : 'glass-card text-ceylon-700 border-ceylon-500/20'}`}
              >
                {g}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-ceylon-700 mb-2">Number of Travellers: {travellersCount}</label>
            <input
              type="range"
              min="1"
              max="12"
              value={travellersCount}
              onChange={(e) => setTravellersCount(Number(e.target.value))}
              className="w-full accent-ceylon-400"
            />
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full glass-card text-ceylon-700 text-xs font-semibold uppercase">Back</button>
            <button onClick={() => setStep(3)} className="px-8 py-3 rounded-full bg-ceylon-500 text-ceylon-950 font-bold text-xs uppercase">Next: What do you love?</button>
          </div>
        </div>
      )}

      {/* Step 3: Interests */}
      {step === 3 && (
        <div className="glass-panel p-8 rounded-3xl border border-ceylon-500/30 space-y-6 text-ceylon-950">
          <h3 className="font-playfair text-2xl font-bold text-ceylon-950 flex items-center gap-2">
            <Heart className="w-6 h-6 text-emerald-400" /> What experiences do you love?
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INTERESTS_OPTIONS.map((item) => {
              const active = selectedInterests.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleInterest(item)}
                  className={`p-4 rounded-2xl border text-left font-semibold text-xs transition flex flex-col justify-between h-28 ${active ? 'bg-ceylon-600 text-ceylon-950 border-ceylon-300 shadow-xl' : 'glass-card text-ceylon-700 border-ceylon-500/20'}`}
                >
                  <span>{item}</span>
                  {active && <CheckCircle2 className="w-4 h-4 text-gold-400 self-end" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full glass-card text-ceylon-700 text-xs font-semibold uppercase">Back</button>
            <button onClick={() => setStep(4)} className="px-8 py-3 rounded-full bg-ceylon-500 text-ceylon-950 font-bold text-xs uppercase">Next: Travel Style</button>
          </div>
        </div>
      )}

      {/* Step 4: Travel Style */}
      {step === 4 && (
        <div className="glass-panel p-8 rounded-3xl border border-ceylon-500/30 space-y-6 text-ceylon-950">
          <h3 className="font-playfair text-2xl font-bold text-ceylon-950 flex items-center gap-2">
            <Shield className="w-6 h-6 text-gold-400" /> Select your preferred Travel Style
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STYLES_OPTIONS.map((st) => (
              <button
                key={st}
                onClick={() => setStyle(st)}
                className={`p-5 rounded-2xl border text-center font-bold text-sm transition ${style === st ? 'bg-ceylon-500 text-ceylon-950 border-ceylon-400 shadow-xl' : 'glass-card text-ceylon-700 border-ceylon-500/20'}`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(3)} className="px-6 py-3 rounded-full glass-card text-ceylon-700 text-xs font-semibold uppercase">Back</button>
            <button onClick={() => setStep(5)} className="px-8 py-3 rounded-full bg-ceylon-500 text-ceylon-950 font-bold text-xs uppercase">Next: Travel Pace</button>
          </div>
        </div>
      )}

      {/* Step 5: Travel Pace */}
      {step === 5 && (
        <div className="glass-panel p-8 rounded-3xl border border-ceylon-500/30 space-y-6 text-ceylon-950">
          <h3 className="font-playfair text-2xl font-bold text-ceylon-950 flex items-center gap-2">
            <Gauge className="w-6 h-6 text-ceylon-400" /> Choose your Travel Pace
          </h3>

          <div className="grid grid-cols-3 gap-4">
            {PACES_OPTIONS.map((pc) => (
              <button
                key={pc}
                onClick={() => setPace(pc)}
                className={`p-6 rounded-2xl border text-center font-bold text-sm transition ${pace === pc ? 'bg-ceylon-500 text-ceylon-950 border-ceylon-400 shadow-xl' : 'glass-card text-ceylon-700 border-ceylon-500/20'}`}
              >
                {pc}
              </button>
            ))}
          </div>

          <div className="pt-6 flex justify-between">
            <button onClick={() => setStep(4)} className="px-6 py-3 rounded-full glass-card text-ceylon-700 text-xs font-semibold uppercase">Back</button>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-ceylon-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-2xl"
            >
              <Sparkles className="w-5 h-5" />
              <span>{loading ? 'Generating Ceylon Itinerary...' : 'Generate Itinerary'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Generated Itinerary Engine View */}
      {step === 6 && generatedItinerary && (
        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-2xl border border-ceylon-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-ceylon-700">
              <span className="px-3 py-1 rounded-full bg-ceylon-600 font-semibold text-ceylon-950">{generatedItinerary.durationDays} Days</span>
              <span>Pace: <strong>{pace}</strong></span>
              <span>Style: <strong>{style}</strong></span>
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={handlePrint} className="px-4 py-2 rounded-full glass-card hover:border-gold-400 text-xs text-ceylon-800 flex items-center space-x-1">
                <Printer className="w-4 h-4" /> <span>Print / PDF</span>
              </button>
              <button onClick={() => alert('Itinerary saved to your Visit Sri Lanka account!')} className="px-4 py-2 rounded-full bg-ceylon-500 text-ceylon-950 font-bold text-xs uppercase flex items-center space-x-1">
                <Bookmark className="w-4 h-4" /> <span>Save Itinerary</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {generatedItinerary.days?.map((d: any) => (
              <div key={d.dayNumber} className="glass-panel p-6 rounded-2xl border border-ceylon-500/20 space-y-4">
                <div className="flex items-center justify-between border-b border-ceylon-500/10 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-ceylon-500 flex items-center justify-center text-ceylon-950 font-bold text-xs">
                      D{d.dayNumber}
                    </span>
                    <h3 className="font-playfair text-xl font-bold text-ceylon-950">{d.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-ceylon-700 leading-relaxed">{d.description}</p>

                {d.items?.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {d.items.map((it: any, iIdx: number) => (
                      <div key={iIdx} className="glass-card p-3 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-ceylon-950">{it.title}</span>
                          <span className="text-ceylon-700 ml-2">({it.activityTime})</span>
                        </div>
                        <span className="text-gold-400 font-bold">{it.estimatedCost}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
