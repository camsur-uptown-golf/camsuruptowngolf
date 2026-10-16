"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "./LanguageProvider";
import type { Locale } from "./config";

/**
 * Ang mga salin ng buong site (`strings/<wika>.json`): English → salin.
 *
 * Iisang pinagkukunan ito ng DomTranslator (na sumasalin ng DOM) at ng
 * `useSiteStrings` / `<Tr>` (para sa mga pangungusap na kailangang isalin
 * nang buo bago i-render — tingnan ang `Tr.tsx`). Isang beses lang kinukuha
 * ang JSON ng bawat wika, at sa unang hingi pa lang.
 */

export type Strings = Record<string, string>;

const LOADERS: Partial<Record<Locale, () => Promise<{ default: Strings }>>> = {
  FIL: () => import("./strings/fil.json"),
  KO: () => import("./strings/ko.json"),
  VI: () => import("./strings/vi.json"),
  ZH: () => import("./strings/zh.json"),
  JA: () => import("./strings/ja.json"),
};

const NUMBER = /\d+(?:[.,]\d+)*/g;

/** Salin ng isang English na teksto: eksaktong tugma muna, saka ang anyong
    may `{0}`, `{1}` kapalit ng mga numero ("Hole 7" → "Hole {0}"). */
export function lookup(dict: Strings, raw: string): string | null {
  const key = raw.replace(/\s+/g, " ").trim();
  if (!key || !/[A-Za-z]/.test(key)) return null;
  const exact = dict[key];
  if (exact !== undefined) return exact;
  const numbers = key.match(NUMBER);
  if (!numbers) return null;
  let i = 0;
  const template = dict[key.replace(NUMBER, () => `{${i++}}`)];
  if (template === undefined) return null;
  return template.replace(/\{(\d+)\}/g, (_, n) => numbers[Number(n)] ?? "");
}

const cache = new Map<Locale, Strings>();
const pending = new Map<Locale, Promise<Strings | null>>();

/** `null` kapag English (o Bikol, na wala pang sariling salin). */
export function loadStrings(locale: Locale): Promise<Strings | null> {
  const loader = LOADERS[locale];
  if (!loader) return Promise.resolve(null);
  const hit = cache.get(locale);
  if (hit) return Promise.resolve(hit);
  let promise = pending.get(locale);
  if (!promise) {
    promise = loader()
      .then(({ default: dict }) => {
        cache.set(locale, dict);
        return dict;
      })
      .catch(() => {
        pending.delete(locale);
        return null;
      });
    pending.set(locale, promise);
  }
  return promise;
}

/** Ang diksyunaryo ng kasalukuyang wika, o `null` habang English/naglo-load. */
export function useSiteStrings(): Strings | null {
  const { locale } = useTranslation();
  const [loaded, setLoaded] = useState<{ locale: Locale; dict: Strings | null } | null>(null);

  useEffect(() => {
    let alive = true;
    loadStrings(locale).then((dict) => {
      if (alive) setLoaded({ locale, dict });
    });
    return () => {
      alive = false;
    };
  }, [locale]);

  return loaded?.locale === locale ? loaded.dict : null;
}
