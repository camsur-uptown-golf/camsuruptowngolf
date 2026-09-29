"use client";

import { useTranslation } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/dictionaries";

/**
 * Maliit na client component para sa isinaling teksto.
 *
 * Ginagamit ito para makapagsalin kahit sa loob ng SERVER component (hal.
 * homepage) nang hindi ginagawang client ang buong pahina: `<T k="facts.holes"
 * />`. Bawat `<T>` ay sariling subscriber sa language context, kaya kusang
 * nagbabago ang teksto kapag pinalitan ang wika.
 */
export function T({ k }: { k: TranslationKey }) {
  const { t } = useTranslation();
  return <>{t(k)}</>;
}
