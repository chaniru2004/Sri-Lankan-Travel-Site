'use client';

import { InteractiveMap } from '@/components/map/InteractiveMap';

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-ceylon-600">
            Geospatial Explorer
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-ceylon-950 mt-1">
            Sri Lanka Tourism Interactive Map
          </h1>
        </div>
      </div>

      <InteractiveMap isPreview={false} />
    </div>
  );
}
