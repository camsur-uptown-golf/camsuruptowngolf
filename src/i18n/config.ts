/**
 * Sentro ng listahan ng wika para sa buong site. Isang pinagmumulan lang: ang
 * language selector, ang provider, at ang dictionaries ay lahat dito sumasalok
 * — kaya kapag nagdagdag ng wika, isang lugar lang ang babaguhin.
 *
 * Client-side ang pagpapalit ng wika (walang URL change): naaalala sa cookie
 * `cu-lang`, at ang provider ang naglalagay ng `lang` at `data-locale` sa
 * <html> para tumugma ang font at ang teksto sa piniling wika.
 */
export const LOCALES = ["EN", "FIL", "BCL", "KO", "VI", "ZH", "JA"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "EN";

/* Ang mga wikang ipinapakita sa language switcher. Pansamantalang itinago ang
   BCL (Bikol) habang ni-repaso ang salin — nasa LOCALES, sa Locale type, sa
   dictionaries, at sa cookie handling pa rin ito, kaya para muling ilabas ay
   alisin lang ito sa filter na ito. */
export const SWITCHER_LOCALES: readonly Locale[] = LOCALES.filter((code) => code !== "BCL");

/* Pangalan ng cookie na humahawak ng piniling wika. Kaparehong pangalan ang
   ginamit ng lumang localStorage key sa selector, kaya tuluy-tuloy ang alaala. */
export const LOCALE_COOKIE = "cu-lang";

/* Pangalan ng bawat wika sa sarili nitong wika (native), gaya ng nasa selector. */
export const LOCALE_LABELS: Record<Locale, string> = {
  EN: "English",
  FIL: "Filipino",
  BCL: "Bikol",
  KO: "한국어",
  VI: "Tiếng Việt",
  ZH: "中文",
  JA: "日本語",
};

/* Ang `lang` attribute na ilalagay sa <html> — BCP-47 na anyo ng bawat locale.
   Ang `fil` ang opisyal na code ng Filipino; `bcl` ang Central Bikol. */
export const HTML_LANG: Record<Locale, string> = {
  EN: "en",
  FIL: "fil",
  BCL: "bcl",
  KO: "ko",
  VI: "vi",
  ZH: "zh",
  JA: "ja",
};

/** Tinitiyak na wastong locale ang isang string; kung hindi, ibinabalik ang default. */
export function normalizeLocale(value: string | null | undefined): Locale {
  return LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;
}
