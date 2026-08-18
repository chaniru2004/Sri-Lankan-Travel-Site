'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ArrowRight, Map, MapPin, Navigation } from 'lucide-react';
import { Province } from '@/lib/provinces';
import { provinceShapes } from '@/lib/provinceShapes';
import { useCmsProvinces } from '@/lib/cms';

function ProvinceCard({ province, onOpen }: { province: Province; onOpen: (province: Province) => void }) {
  return (
    <div className="h-[620px] rounded-2xl bg-white border border-ceylon-950/10 shadow-2xl shadow-ceylon-950/10 overflow-hidden flex flex-col">
      <div className="relative h-64 w-full">
        <img
          src={province.image}
          alt={`${province.name} popular places`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ceylon-950/80 via-transparent to-transparent" />
        <div className="absolute left-5 bottom-5 right-5">
          <p className="text-xs uppercase tracking-widest text-ceylon-200 font-bold">Popular Places</p>
          <h3 className="font-playfair text-4xl font-bold text-ceylon-950 mt-1">{province.name}</h3>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div className="space-y-3">
          {province.popularPlaces.map((place, idx) => (
            <div key={place} className="flex items-center justify-between rounded-xl border border-ceylon-950/10 px-4 py-3">
              <span className="flex items-center gap-3">
                <span className="text-xs font-bold text-ceylon-500">{String(idx + 1).padStart(2, '0')}</span>
                <span className="font-semibold text-ceylon-950">{place}</span>
              </span>
              <MapPin className="w-4 h-4 text-ceylon-600" />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpen(province)}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ceylon-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ceylon-950 hover:bg-ceylon-500 transition"
        >
          <span>Open Province Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ProvinceExplorer({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const cmsProvinces = useCmsProvinces();
  const defaultProvince = cmsProvinces.find((province) => province.slug === 'central-province') || cmsProvinces[0];
  const [selectedProvince, setSelectedProvince] = useState(defaultProvince);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const activeProvince = useMemo(
    () =>
      cmsProvinces.find((province) => province.slug === hoveredSlug) ||
      cmsProvinces.find((province) => province.slug === selectedProvince.slug) ||
      defaultProvince,
    [cmsProvinces, defaultProvince, hoveredSlug, selectedProvince.slug]
  );

  function openProvince(province: Province) {
    setSelectedProvince(province);
    router.push(`/provinces/${province.slug}`);
  }

  return (
    <div className={`grid grid-cols-1 ${compact ? 'lg:grid-cols-[0.86fr_1.14fr]' : 'lg:grid-cols-[0.82fr_1.18fr]'} gap-10 lg:gap-16 items-center`}>
      <div>
        <span className="text-xs uppercase font-bold text-ceylon-600 tracking-widest flex items-center gap-2">
          <Map className="w-4 h-4" /> Explore by Province
        </span>
        <h2 className="font-playfair text-4xl sm:text-6xl font-bold text-ceylon-950 mt-3 leading-tight">
          Select a province. Find the places people remember.
        </h2>
        <p className="text-sm sm:text-base text-sand-800/80 mt-5 max-w-xl leading-relaxed">
          Move over the provincial map to highlight each region, then click a province to see its districts and famous locations.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cmsProvinces.map((province) => {
            const isActive = activeProvince.slug === province.slug;
            return (
              <button
                key={province.slug}
                onMouseEnter={() => setHoveredSlug(province.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onFocus={() => setHoveredSlug(province.slug)}
                onBlur={() => setHoveredSlug(null)}
                onClick={() => openProvince(province)}
                className={`group text-left rounded-xl border p-4 transition ${isActive ? 'border-ceylon-700 bg-white shadow-xl shadow-ceylon-950/10' : 'border-ceylon-950/10 bg-white/60 hover:bg-white hover:border-ceylon-500/40'}`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: province.color }} />
                    <span className="font-bold text-sm text-ceylon-950 truncate">{province.name}</span>
                  </span>
                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition ${isActive ? 'text-ceylon-700 translate-x-0.5' : 'text-ceylon-950/30 group-hover:text-ceylon-700 group-hover:translate-x-0.5'}`} />
                </span>
                <span className="mt-2 block text-xs text-sand-800/70">{province.cue}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1fr] gap-6 items-stretch">
        <div
          className="relative h-[620px] rounded-2xl bg-white border border-ceylon-950/10 shadow-2xl shadow-ceylon-950/10 overflow-hidden"
          style={{ position: 'relative', height: '620px', overflow: 'hidden' }}
        >
          <div className="absolute inset-x-4 top-5 bottom-40 flex items-center justify-center">
            <svg
              viewBox="0 0 492 860"
              role="img"
              aria-label="Interactive provincial map of Sri Lanka"
              preserveAspectRatio="xMidYMid meet"
              className="block h-full max-h-[440px] w-auto max-w-full"
              style={{ display: 'block', maxHeight: '440px', maxWidth: '100%', width: 'auto', height: '100%' }}
            >
              {cmsProvinces.map((province) => {
                const shape = provinceShapes[province.slug];
                const isActive = activeProvince.slug === province.slug;
                return (
                  <path
                    key={province.slug}
                    d={shape.path}
                    fill={isActive ? province.color : '#ffffff'}
                    stroke={isActive ? province.color : '#b9b9b9'}
                    strokeWidth={isActive ? 3.2 : 1.4}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className="cursor-pointer transition-all duration-200"
                    style={{ cursor: 'pointer', transition: 'fill 180ms ease, stroke 180ms ease' }}
                    onMouseEnter={() => setHoveredSlug(province.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    onClick={() => openProvince(province)}
                    tabIndex={0}
                    onFocus={() => setHoveredSlug(province.slug)}
                    onBlur={() => setHoveredSlug(null)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') openProvince(province);
                    }}
                  />
                );
              })}
            </svg>
          </div>

          <div className="absolute left-5 bottom-5 right-5 rounded-2xl bg-ceylon-100 text-ceylon-950 p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ceylon-700 font-bold">Selected Province</p>
                <h3 className="font-playfair text-2xl font-bold mt-1">{activeProvince.name}</h3>
              </div>
              <Navigation className="w-5 h-5 text-ceylon-700 flex-shrink-0" />
            </div>
            <p className="text-xs text-ceylon-700 mt-2">{activeProvince.cue}</p>
          </div>
        </div>

        <ProvinceCard province={activeProvince} onOpen={openProvince} />
      </div>
    </div>
  );
}
