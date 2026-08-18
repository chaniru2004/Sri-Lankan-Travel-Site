'use client';

import { useEffect, useState } from 'react';
import { provinces, Province } from './provinces';

const PROVINCE_CMS_KEY = 'visit-sri-lanka:province-cms';

function cloneProvinces() {
  return provinces.map((province) => ({
    ...province,
    popularPlaces: [...province.popularPlaces],
    districts: province.districts.map((district) => ({
      ...district,
      famousLocations: [...district.famousLocations],
    })),
  }));
}

export function getCmsProvinces(): Province[] {
  if (typeof window === 'undefined') return cloneProvinces();

  const saved = window.localStorage.getItem(PROVINCE_CMS_KEY);
  if (!saved) return cloneProvinces();

  try {
    const overrides = JSON.parse(saved) as Province[];
    return cloneProvinces().map((province) => {
      const override = overrides.find((item) => item.slug === province.slug);
      return override ? { ...province, ...override } : province;
    });
  } catch {
    return cloneProvinces();
  }
}

export function saveCmsProvinces(nextProvinces: Province[]) {
  window.localStorage.setItem(PROVINCE_CMS_KEY, JSON.stringify(nextProvinces));
  window.dispatchEvent(new Event('province-cms-updated'));
}

export function resetCmsProvinces() {
  window.localStorage.removeItem(PROVINCE_CMS_KEY);
  window.dispatchEvent(new Event('province-cms-updated'));
}

export function useCmsProvinces() {
  const [items, setItems] = useState<Province[]>(cloneProvinces());

  useEffect(() => {
    const sync = () => setItems(getCmsProvinces());
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('province-cms-updated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('province-cms-updated', sync);
    };
  }, []);

  return items;
}
