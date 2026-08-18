'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ImageIcon, RotateCcw, Save, MapPin } from 'lucide-react';
import { getCmsProvinces, resetCmsProvinces, saveCmsProvinces } from '@/lib/cms';
import { Province } from '@/lib/provinces';

function linesToList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminContentPage() {
  const [items, setItems] = useState<Province[]>(() =>
    typeof window === 'undefined' ? [] : getCmsProvinces()
  );
  const [selectedSlug, setSelectedSlug] = useState('central-province');
  const [saved, setSaved] = useState(false);

  const selectedProvince = useMemo(
    () => items.find((province) => province.slug === selectedSlug) || items[0],
    [items, selectedSlug]
  );

  function updateProvince(next: Partial<Province>) {
    setItems((current) =>
      current.map((province) =>
        province.slug === selectedProvince.slug ? { ...province, ...next } : province
      )
    );
    setSaved(false);
  }

  function updateDistrict(index: number, field: 'name' | 'famousLocations', value: string) {
    updateProvince({
      districts: selectedProvince.districts.map((district, districtIndex) =>
        districtIndex === index
          ? {
              ...district,
              [field]: field === 'famousLocations' ? linesToList(value) : value,
            }
          : district
      ),
    });
  }

  function handleSave() {
    saveCmsProvinces(items);
    setSaved(true);
  }

  function handleReset() {
    resetCmsProvinces();
    const defaults = getCmsProvinces();
    setItems(defaults);
    setSelectedSlug('central-province');
    setSaved(false);
  }

  if (!selectedProvince) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-20 space-y-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-xs text-ceylon-300 font-semibold uppercase hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Admin Dashboard</span>
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-ceylon-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ceylon-500/20 border border-ceylon-400 text-ceylon-300 text-xs font-bold uppercase mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            Page Content CMS
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-white">
            Manage Province Pages
          </h1>
          <p className="text-sm text-sand-200 mt-2 max-w-2xl">
            Change province images, map colors, popular places, districts, and famous locations shown on the map and province pages.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-ceylon-500/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-sand-100 hover:border-ceylon-300 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-ceylon-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ceylon-950 hover:bg-ceylon-400 transition"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <aside className="glass-panel rounded-2xl border border-ceylon-500/20 p-4 h-fit">
          <div className="space-y-2">
            {items.map((province) => (
              <button
                key={province.slug}
                type="button"
                onClick={() => setSelectedSlug(province.slug)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition ${
                  selectedSlug === province.slug
                    ? 'border-ceylon-300 bg-ceylon-500/15 text-white'
                    : 'border-ceylon-500/10 text-sand-100 hover:border-ceylon-400/40'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: province.color }} />
                  <span className="font-semibold text-sm">{province.name}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="glass-panel rounded-2xl border border-ceylon-500/20 p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ceylon-300 mb-2">Province Image URL</label>
                <input
                  value={selectedProvince.image}
                  onChange={(event) => updateProvince({ image: event.target.value })}
                  className="w-full rounded-xl border border-ceylon-500/20 bg-ceylon-950/70 px-4 py-3 text-sm text-white outline-none focus:border-ceylon-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ceylon-300 mb-2">Short Text</label>
                  <input
                    value={selectedProvince.cue}
                    onChange={(event) => updateProvince({ cue: event.target.value })}
                    className="w-full rounded-xl border border-ceylon-500/20 bg-ceylon-950/70 px-4 py-3 text-sm text-white outline-none focus:border-ceylon-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ceylon-300 mb-2">Map Color</label>
                  <input
                    type="color"
                    value={selectedProvince.color}
                    onChange={(event) => updateProvince({ color: event.target.value })}
                    className="h-12 w-full rounded-xl border border-ceylon-500/20 bg-ceylon-950/70 p-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ceylon-300 mb-2">Popular Places</label>
                <textarea
                  value={selectedProvince.popularPlaces.join('\n')}
                  onChange={(event) => updateProvince({ popularPlaces: linesToList(event.target.value) })}
                  rows={4}
                  className="w-full rounded-xl border border-ceylon-500/20 bg-ceylon-950/70 px-4 py-3 text-sm text-white outline-none focus:border-ceylon-300"
                />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-ceylon-500/20 bg-ceylon-950/60">
              <div className="h-52">
                <img src={selectedProvince.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-widest text-ceylon-300 font-bold">Preview</p>
                <h2 className="font-playfair text-2xl font-bold text-white mt-1">{selectedProvince.name}</h2>
                <p className="text-xs text-sand-200 mt-1">{selectedProvince.cue}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-playfair text-2xl font-bold text-white">District Famous Locations</h2>
              <Link href={`/provinces/${selectedProvince.slug}`} className="text-xs font-bold uppercase text-ceylon-300 hover:text-ceylon-200">
                View Page
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProvince.districts.map((district, index) => (
                <div key={`${selectedProvince.slug}-${district.name}`} className="rounded-2xl border border-ceylon-500/20 bg-ceylon-950/50 p-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ceylon-300 mb-2">District Name</label>
                  <input
                    value={district.name}
                    onChange={(event) => updateDistrict(index, 'name', event.target.value)}
                    className="w-full rounded-xl border border-ceylon-500/20 bg-ceylon-950/70 px-4 py-3 text-sm text-white outline-none focus:border-ceylon-300"
                  />

                  <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-ceylon-300 mb-2">
                    Famous Locations
                  </label>
                  <textarea
                    value={district.famousLocations.join('\n')}
                    onChange={(event) => updateDistrict(index, 'famousLocations', event.target.value)}
                    rows={5}
                    className="w-full rounded-xl border border-ceylon-500/20 bg-ceylon-950/70 px-4 py-3 text-sm text-white outline-none focus:border-ceylon-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ceylon-500/20 bg-ceylon-950/50 p-4 text-xs text-sand-200 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-ceylon-300 mt-0.5 flex-shrink-0" />
            <p>
              Changes are saved in this browser and immediately update the province map and province detail pages on this local project.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
