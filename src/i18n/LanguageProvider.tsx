"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, HTML_LANG, LOCALE_COOKIE, normalizeLocale, type Locale } from "./config";
import { DICTIONARIES, type TranslationKey } from "./dictionaries";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Isinasalin ang isang key sa kasalukuyang wika; bumabagsak sa English, saka
      sa mismong key kung wala pa ang salin. */
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Nagbabalot sa buong app at humahawak ng kasalukuyang wika.
 *
 * Simula bilang DEFAULT (English) para pareho ang SSR at ang unang client
 * render — iniiwasan ang hydration mismatch. Sa mount, binabasa ang naunang
 * pili sa cookie/localStorage at inilalapat. Sa bawat pagbabago, isinusulat ito
 * pabalik at nilalagay ang `lang` at `data-locale` sa <html> — ang huli ang
 * pinagbabatayan ng font-switching sa globals.css.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved =
      readCookie(LOCALE_COOKIE) ??
      (() => {
        try {
          return localStorage.getItem(LOCALE_COOKIE);
        } catch {
          return null;
        }
      })();
    const next = normalizeLocale(saved);
    if (next === DEFAULT_LOCALE) return;

    // Defer the persisted preference until after hydration so the server and
    // first client render both stay in English.
    const timer = window.setTimeout(() => setLocaleState(next), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = HTML_LANG[locale];
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      /* Isang taon na cookie, buong site. */
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* walang cookie access — huwag hadlangan ang pagpapalit sa state. */
    }
    try {
      localStorage.setItem(LOCALE_COOKIE, next);
    } catch {
      /* walang storage — cookie na lang ang alaala. */
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey) => DICTIONARIES[locale][key] ?? DICTIONARIES[DEFAULT_LOCALE][key] ?? key,
    [locale],
  );

  const value = useMemo<LanguageContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Kinukuha ang kasalukuyang wika, ang setter, at ang `t()`. Dapat nasa loob ng
    LanguageProvider (nasa root layout ito). */
export function useTranslation(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
