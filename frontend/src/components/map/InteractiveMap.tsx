'use client';

import { ProvinceExplorer } from './ProvinceExplorer';

export function InteractiveMap({ isPreview = false }: { isPreview?: boolean }) {
  return (
    <div className={`w-full ${isPreview ? '' : 'min-h-[85vh]'} rounded-2xl bg-white p-4 sm:p-8 shadow-2xl shadow-ceylon-950/10`}>
      <ProvinceExplorer compact={isPreview} />
    </div>
  );
}
