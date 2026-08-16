'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import en from '../locales/en.json';
import si from '../locales/si.json';
import ta from '../locales/ta.json';

export type Language = 'en' | 'si' | 'ta';

const dictionaries: Record<Language, any> = { en, si, ta };

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (keyPath: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (path: string) => path,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('vsl_lang') as Language;
    if (saved && ['en', 'si', 'ta'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('vsl_lang', l);
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let current = dictionaries[lang] || dictionaries.en;
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English
        let fallback = dictionaries.en;
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return keyPath;
          }
        }
        return typeof fallback === 'string' ? fallback : keyPath;
      }
    }
    return typeof current === 'string' ? current : keyPath;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
