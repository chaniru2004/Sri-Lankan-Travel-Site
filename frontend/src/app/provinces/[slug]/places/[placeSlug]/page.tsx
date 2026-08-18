'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, MapPin, PlayCircle } from 'lucide-react';
import { useCmsProvinces } from '@/lib/cms';

function isEmbeddable(url: string) {
  return url.includes('youtube.com/embed') || url.includes('player.vimeo.com');
}

export default function FamousPlaceDetailPage() {
  const params = useParams();
  const provinceSlug = params?.slug as string;
  const placeSlug = params?.placeSlug as string;
  const provinces = useCmsProvinces();
  const province = provinces.find((item) => item.slug === provinceSlug);
  const district = province?.districts.find((item) =>
    item.famousLocations.some((location) => location.slug === placeSlug)
  );
  const place = district?.famousLocations.find((location) => location.slug === placeSlug);

  if (!province || !district || !place) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-28 text-center text-ceylon-950">
        <h1 className="font-playfair text-4xl font-bold">Famous Place Not Found</h1>
        <Link href="/map" className="inline-flex items-center gap-2 mt-4 text-ceylon-700 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Map</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-ceylon-950 pb-20">
      <section className="relative min-h-[62vh] pt-32 flex items-end overflow-hidden">
        <img src={place.image} alt={place.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <Link href={`/provinces/${province.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ceylon-800 hover:text-ceylon-950 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {province.name}</span>
          </Link>
          <div className="mt-6 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ceylon-700 font-bold">
              <MapPin className="w-4 h-4" />
              {district.name} District • {province.name}
            </p>
            <h1 className="font-playfair text-5xl sm:text-7xl font-bold text-ceylon-950 mt-2">
              {place.name}
            </h1>
            <p className="text-ceylon-800 text-base sm:text-xl mt-4 max-w-2xl">
              {place.description}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <article className="rounded-2xl border border-ceylon-500/20 bg-ceylon-50 p-6 sm:p-8 shadow-xl shadow-ceylon-900/10">
          <p className="text-xs uppercase tracking-widest text-ceylon-700 font-bold">Place Details</p>
          <h2 className="font-playfair text-3xl font-bold text-ceylon-950 mt-2">About {place.name}</h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-ceylon-800 whitespace-pre-line">
            {place.description}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-ceylon-500/20 bg-white p-4">
              <p className="text-[10px] uppercase tracking-widest text-ceylon-600 font-bold">Province</p>
              <p className="mt-1 font-semibold text-ceylon-950">{province.name}</p>
            </div>
            <div className="rounded-xl border border-ceylon-500/20 bg-white p-4">
              <p className="text-[10px] uppercase tracking-widest text-ceylon-600 font-bold">District</p>
              <p className="mt-1 font-semibold text-ceylon-950">{district.name}</p>
            </div>
          </div>
        </article>

        <aside className="space-y-5">
          <div className="rounded-2xl overflow-hidden border border-ceylon-500/20 bg-white shadow-xl shadow-ceylon-900/10">
            <img src={place.image} alt={place.name} className="h-80 w-full object-cover" />
          </div>

          {place.videoUrl ? (
            <div className="rounded-2xl border border-ceylon-500/20 bg-white p-4 shadow-xl shadow-ceylon-900/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ceylon-700 font-bold mb-3">
                <PlayCircle className="w-4 h-4" />
                Video
              </div>
              {isEmbeddable(place.videoUrl) ? (
                <iframe
                  src={place.videoUrl}
                  title={`${place.name} video`}
                  className="aspect-video w-full rounded-xl border border-ceylon-500/20"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <a
                  href={place.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ceylon-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ceylon-950 hover:bg-ceylon-700"
                >
                  <span>Open Video</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
