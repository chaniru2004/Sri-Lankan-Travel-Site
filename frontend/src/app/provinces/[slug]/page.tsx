'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { useCmsProvinces } from '@/lib/cms';

export default function ProvinceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const provinces = useCmsProvinces();
  const province = provinces.find((item) => item.slug === slug);

  if (!province) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32 text-center">
        <h1 className="font-playfair text-4xl font-bold text-ceylon-950">Province Not Found</h1>
        <Link href="/map" className="inline-flex items-center gap-2 mt-4 text-ceylon-700 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Map</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-ceylon-950 pb-20">
      <section className="relative min-h-[56vh] pt-32 flex items-end overflow-hidden">
        <img
          src={province.image}
          alt={`${province.name} landscape`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ceylon-950/90 via-ceylon-950/35 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <Link href="/map" className="inline-flex items-center gap-2 text-sm font-semibold text-ceylon-100 hover:text-ceylon-950 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Map</span>
          </Link>
          <div className="mt-6 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-ceylon-200 font-bold">Province Guide</p>
            <h1 className="font-playfair text-5xl sm:text-7xl font-bold text-ceylon-950 mt-2">
              {province.name}
            </h1>
            <p className="text-ceylon-50 text-base sm:text-xl mt-4 max-w-2xl">
              {province.cue}. Explore each district and the memorable places travelers usually build their route around.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-ceylon-600 font-bold">Districts</p>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-ceylon-950 mt-1">
              Famous Locations by District
            </h2>
          </div>
          <Link
            href={`/destinations?province=${encodeURIComponent(province.name)}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ceylon-700 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ceylon-950 hover:bg-ceylon-600 transition"
          >
            <span>View Destination Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {province.districts.map((district) => (
            <article key={district.name} className="rounded-2xl border border-ceylon-950/10 bg-white p-6 shadow-xl shadow-ceylon-950/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-ceylon-500 font-bold">District</p>
                  <h3 className="font-playfair text-2xl font-bold text-ceylon-950 mt-1">{district.name}</h3>
                </div>
                <span className="h-10 w-10 rounded-full flex items-center justify-center text-ceylon-950" style={{ backgroundColor: province.color }}>
                  <MapPin className="w-5 h-5" />
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {district.famousLocations.map((location, index) => (
                  <Link
                    key={location.slug}
                    href={`/provinces/${province.slug}/places/${location.slug}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-ceylon-950/10 px-4 py-3 transition hover:border-ceylon-600/40 hover:bg-ceylon-50"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-bold text-ceylon-500">{String(index + 1).padStart(2, '0')}</span>
                      <span className="font-semibold text-ceylon-950">{location.name}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-ceylon-600 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
