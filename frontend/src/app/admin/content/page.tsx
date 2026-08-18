'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ImageIcon, MapPin, Plus, RotateCcw, Save, Video } from 'lucide-react';
import { getCmsProvinces, resetCmsProvinces, saveCmsProvinces } from '@/lib/cms';
import { FamousLocation, normalizeFamousLocation, Province, slugifyPlace } from '@/lib/provinces';

function linesToList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

const inputClass =
  'w-full rounded-xl border border-ceylon-500/25 bg-white px-4 py-3 text-sm text-ceylon-950 placeholder-ceylon-700/45 outline-none focus:border-ceylon-600 focus:ring-2 focus:ring-ceylon-500/15';
const labelClass = 'block text-xs font-bold uppercase tracking-wider text-ceylon-700 mb-2';

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

  function updateDistrict(index: number, name: string) {
    updateProvince({
      districts: selectedProvince.districts.map((district, districtIndex) =>
        districtIndex === index ? { ...district, name } : district
      ),
    });
  }

  function updateLocation(districtIndex: number, locationIndex: number, next: Partial<FamousLocation>) {
    updateProvince({
      districts: selectedProvince.districts.map((district, currentDistrictIndex) =>
        currentDistrictIndex === districtIndex
          ? {
              ...district,
              famousLocations: district.famousLocations.map((location, currentLocationIndex) =>
                currentLocationIndex === locationIndex
                  ? {
                      ...location,
                      ...next,
                      slug: next.name ? slugifyPlace(next.name) : location.slug,
                    }
                  : location
              ),
            }
          : district
      ),
    });
  }

  function addLocation(districtIndex: number) {
    updateProvince({
      districts: selectedProvince.districts.map((district, currentDistrictIndex) =>
        currentDistrictIndex === districtIndex
          ? {
              ...district,
              famousLocations: [
                ...district.famousLocations,
                normalizeFamousLocation('New Famous Place', selectedProvince, district.name),
              ],
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-20 space-y-8 text-ceylon-950">
      <Link href="/admin" className="inline-flex items-center gap-2 text-xs text-ceylon-700 font-semibold uppercase hover:text-ceylon-950">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Admin Dashboard</span>
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-ceylon-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ceylon-100 border border-ceylon-400 text-ceylon-700 text-xs font-bold uppercase mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            Page Content CMS
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-ceylon-950">
            Manage Province Pages
          </h1>
          <p className="text-sm text-ceylon-700 mt-2 max-w-2xl">
            Change province images, text, map colors, districts, and every famous place photo, video, and description.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-ceylon-500/30 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-ceylon-800 hover:border-ceylon-600 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-ceylon-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ceylon-950 hover:bg-ceylon-700 transition"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <aside className="bg-white rounded-2xl border border-ceylon-500/20 p-4 h-fit shadow-xl shadow-ceylon-900/10">
          <div className="space-y-2">
            {items.map((province) => (
              <button
                key={province.slug}
                type="button"
                onClick={() => setSelectedSlug(province.slug)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition ${
                  selectedSlug === province.slug
                    ? 'border-ceylon-600 bg-ceylon-50 text-ceylon-950'
                    : 'border-ceylon-500/10 text-ceylon-700 hover:border-ceylon-500/40 hover:text-ceylon-950'
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

        <section className="bg-white rounded-2xl border border-ceylon-500/20 p-5 sm:p-6 space-y-8 shadow-xl shadow-ceylon-900/10">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Province Image URL</label>
                <input value={selectedProvince.image} onChange={(event) => updateProvince({ image: event.target.value })} className={inputClass} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-4">
                <div>
                  <label className={labelClass}>Short Text</label>
                  <input value={selectedProvince.cue} onChange={(event) => updateProvince({ cue: event.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Map Color</label>
                  <input type="color" value={selectedProvince.color} onChange={(event) => updateProvince({ color: event.target.value })} className="h-12 w-full rounded-xl border border-ceylon-500/25 bg-white p-1" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Popular Places</label>
                <textarea
                  value={selectedProvince.popularPlaces.join('\n')}
                  onChange={(event) => updateProvince({ popularPlaces: linesToList(event.target.value) })}
                  rows={4}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-ceylon-500/20 bg-ceylon-50">
              <div className="h-52">
                <img src={selectedProvince.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-widest text-ceylon-600 font-bold">Preview</p>
                <h2 className="font-playfair text-2xl font-bold text-ceylon-950 mt-1">{selectedProvince.name}</h2>
                <p className="text-xs text-ceylon-700 mt-1">{selectedProvince.cue}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-playfair text-2xl font-bold text-ceylon-950">District Famous Locations</h2>
              <Link href={`/provinces/${selectedProvince.slug}`} className="text-xs font-bold uppercase text-ceylon-700 hover:text-ceylon-950">
                View Page
              </Link>
            </div>

            <div className="space-y-5">
              {selectedProvince.districts.map((district, districtIndex) => (
                <div key={`${selectedProvince.slug}-${district.name}`} className="rounded-2xl border border-ceylon-500/20 bg-ceylon-50 p-4">
                  <label className={labelClass}>District Name</label>
                  <input value={district.name} onChange={(event) => updateDistrict(districtIndex, event.target.value)} className={inputClass} />

                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-ceylon-800">Famous Places</h3>
                      <button
                        type="button"
                        onClick={() => addLocation(districtIndex)}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase text-ceylon-700 hover:text-ceylon-950"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Place
                      </button>
                    </div>

                    {district.famousLocations.map((location, locationIndex) => (
                      <div key={`${district.name}-${location.slug}-${locationIndex}`} className="rounded-xl border border-ceylon-500/20 bg-white p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className={labelClass}>Place Name</label>
                            <input value={location.name} onChange={(event) => updateLocation(districtIndex, locationIndex, { name: event.target.value })} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Photo URL</label>
                            <input value={location.image} onChange={(event) => updateLocation(districtIndex, locationIndex, { image: event.target.value })} className={inputClass} />
                          </div>
                        </div>

                        <div>
                          <label className={labelClass}>Description Text</label>
                          <textarea value={location.description} onChange={(event) => updateLocation(districtIndex, locationIndex, { description: event.target.value })} rows={3} className={inputClass} />
                        </div>

                        <div>
                          <label className={labelClass}>Video URL Optional</label>
                          <input value={location.videoUrl || ''} onChange={(event) => updateLocation(districtIndex, locationIndex, { videoUrl: event.target.value })} placeholder="https://youtube.com/embed/... or direct video URL" className={inputClass} />
                        </div>

                        <Link
                          href={`/provinces/${selectedProvince.slug}/places/${location.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase text-ceylon-700 hover:text-ceylon-950"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          View place page
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ceylon-500/20 bg-ceylon-50 p-4 text-xs text-ceylon-700 flex items-start gap-3">
            <Video className="w-4 h-4 text-ceylon-700 mt-0.5 flex-shrink-0" />
            <p>
              Save changes, then open the province page. District places are clickable and each place page reads the photo, text, and optional video from this CMS.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
