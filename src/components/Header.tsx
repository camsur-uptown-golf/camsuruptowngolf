"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ACCOMMODATIONS, CLUB_PHONE, COURSE_PAGES, SITE_SECTIONS } from "@/lib/site-content";
import HeaderUtilities from "@/components/HeaderUtilities";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/dictionaries";

/* Slug ng section → translation key. Nasa data (SITE_SECTIONS) ang English na
   label; dito isinasalin ang bawat isa sa piniling wika. Kapag may bagong
   section na walang key dito, ang orihinal na `label` ang fallback. */
const NAV_KEYS: Record<string, TranslationKey> = {
  golf: "nav.golf",
  clubhouse: "nav.clubhouse",
  packages: "nav.packages",
  events: "nav.events",
  experiences: "nav.experiences",
  accommodations: "nav.accommodations",
};
import { VILLA_DEL_REY_STAYS } from "@/lib/villa-del-rey";

/* Galing na sa site-content: apat na kopya dati ng parehong placeholder. */
const { label: PHONE_LABEL, href: PHONE_HREF } = CLUB_PHONE;

/* Buong listahan na ito. May  dito dati na nag-aalis ng Dining
   noong may section pa iyon na hindi ipinapakita sa nav; wala na ang
   section kaya wala na ring inaalis. */
const NAV_SECTIONS = SITE_SECTIONS;

/**
 * Anyo ng listahan ng highlight sa mega menu, isa sa bawat section.
 *
 * Hindi kayang isang anyo lang ang lahat, at dito nakikita kung bakit:
 * dalawa ang link ng Packages, tatlo ang Accommodations, sampu
 * ang Experiences, at labingwalo ang Golf. Sa 290px na taas ng panel ay
 * 29px lang ang bawat hilera sa sampu — walang malaking card na kasya.
 *
 *   cards — malalaking image card, isang hilera lang (2–3 link)
 *   names — pangalan lang na teksto; nasa preview sa kaliwa ang larawan
 *   rules — teksto na hinahati ng guhit, para sa walang larawan
 *
 * Kapag nagdagdag ng section na wala dito, `rules` ang gagamitin: walang
 * inaasahang larawan iyon, kaya hindi ito nasisira ng bagong data.
 */
const MEGA_STYLES: Record<string, "cards" | "names" | "rules"> = {
  golf: "names",
  /* Anim na espasyo na may sariling larawan. Hindi `cards`: tatlong haligi
     ang grid doon, kaya dalawang hilera na may butas sa dulo ang anim.
     Sa `names` ay lumalabas ang larawan ng espasyo sa preview pag-hover. */
  clubhouse: "names",
  packages: "cards",
  accommodations: "cards",
  experiences: "names",
  events: "rules",
};

/**
 * Isang treatment para sa heading ng bawat hanay ng mega menu.
 *
 * Dating ginto ang unang hanay at maputi ang dalawa pa, at walang guhit —
 * tatlong magkaibang antas ng lakas para sa magkaparehong bagay. Ang
 * hairline ang naghahati ngayon ng heading sa listahan, kaya hindi na
 * kailangang pumuti ang teksto para mabasa ito bilang pamuno.
 */
const MEGA_HEADING =
  "mb-4 border-b border-white/10 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3dda0]";

/**
 * Ilang Golf hole lang ang ipinapakita sa mobile menu. Ang buong 18 ay
 * masyadong mahaba sa cellphone, kaya iilan lang dito at nasa "View all"
 * na link pababa sa /golf ang natitira. Sa desktop ay buo pa rin ang 18 —
 * ito ay para sa mobile submenu lang.
 */
const MOBILE_GOLF_HIGHLIGHTS = 6;

/**
 * Hugis ng listahan sa `names`, batay sa bilang ng link. Fixed ang lapad ng
 * mga column kapag dalawa lang para hindi piliting ikalat ang kaunting link
 * sa buong panel. Sa 18 holes lang ginagamit ang tatlong pantay na column
 * dahil kailangan nito ang buong available na lapad.
 */
function namesGridClass(count: number, sectionSlug: string) {
  if (count > 12) return "grid-flow-col grid-rows-[repeat(6,max-content)] grid-cols-3";
  if (sectionSlug === "experiences") {
    return "grid-flow-col grid-rows-[repeat(6,max-content)] grid-cols-[180px_180px] justify-start";
  }
  if (count > 6) return "grid-flow-col grid-rows-[repeat(5,max-content)] grid-cols-[180px_180px] justify-start";
  return "grid-cols-[220px] justify-start";
}

/**
 * Pangatlong hanay ng panel: ang mga bagay na hindi kabilang sa listahan
 * ng section.
 *
 * Hindi ito nakalagay sa `links` dahil hindi ito bahagi ng laman — hindi
 * butas ang Tournaments, at hindi pasilidad ang official site. Sariling
 * hanay sila at sariling state (`hoveredExtra`), kaya hindi nababago ang
 * bilang sa gitnang haligi.
 *
 * Kapag may `image`, iyon ang lumalabas sa preview sa kaliwa pag-hover.
 * Kapag wala, nananatili ang larawan ng section. Ang larawan ng Tournaments
 * ay iisa lang sa ginagamit ng Events page para sa parehong paksa — kapag
 * pinalitan doon, palitan dito.
 */
const SECTION_EXTRAS: Record<
  string,
  readonly { heading: string; items: readonly { label: string; href: string; image?: string }[] }[]
> = {
  golf: [
    {
      heading: "Competition",
      items: [
        {
          label: "Tournaments",
          href: "/events",
          image: "/events/golf-tournaments-full-logo-2026-clean-4k-v3.png",
        },
      ],
    },
  ],
  experiences: [
    {
      heading: "Discover",
      /* Maiksi ang label dahil 159px lang ang haligi: sa "CamSur Uptown" ay
         naiiwan ang arrow sa sariling linya. Wala itong `image` — larawan ng
         section ang nananatili sa preview, at "Visit the site" ang button. */
      items: [{ label: "Visit CamSur", href: "https://visitcamsur.com/" }],
    },
    {
      heading: "Dining",
      /* Kaparehong link ng CWC Clubhouse sa Dining section. Nandito rin ito
         dahil pasilidad ng CWC ang lahat ng nasa gitnang haligi, at doon
         din ito. Kapag pinalitan doon, palitan dito. */
      items: [
        {
          label: "CWC Clubhouse",
          href: "https://visitcamsur.com/facilities/clubhouse",
          image: "/dining/clubhouse.webp",
        },
      ],
    },
  ],
};

/* Temporary launch event for the Golf menu. Keep the date and availability
   here so the desktop and mobile cards cannot drift apart when the club
   publishes the confirmed tournament calendar. */
const UPCOMING_TOURNAMENT = {
  label: "CamSur Uptown Invitational",
  href: "/events#occasions",
  image: "/events/golf-tournaments-full-logo-2026-clean-4k-v3.png",
  date: "Sat · 28 Nov 2026",
  time: "7:00 AM shotgun start",
  format: "18-hole team scramble",
  status: "Registration open",
} as const;

/**
 * Nakabalik: inalis ito noong tinanggal ang maliit na hilera sa itaas ng
 * nav, at nasa pangunahing pindutan na ito ngayon.
 *
 * `viewBox="1.5 1.5 21 21"` AT HINDI `0 0 24 24`. Ang guhit ay nasa loob
 * lang ng 3–21, kaya sa buong 24 na viewBox ay may 12.5% na bakanteng
 * gilid ang icon — 2px iyon sa magkabilang tabi sa 16px na sukat, at
 * nadaragdag sa puwang sa pagitan nito at ng teksto. Sa mas masikip na
 * viewBox ay 1.1px na lang ito, kaya ang `gap` na lang ang nakikita.
 */
function CalendarIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="1.5 1.5 21 21" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M3 9.5h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Pare-parehong anyo ng bawat item ng nav, sa hero at sa compact.
 *
 * Isang string na lang ito dahil apat na ang gumagamit — ang dalawang
 * `button` ng section at ang dalawang Home na link — at mabilis maghiwalay
 * ang apat na kopya. Sa `py-2.5` nakasalalay ang taas ng pill; kapag
 * nagkaiba ang dalawang nav dito, iba ang sukat ng pill kapag naka-scroll.
 */
const NAV_ITEM_CLASS =
  "pointer-events-auto relative z-10 cursor-pointer whitespace-nowrap rounded-full px-2.5 py-2.5 transition-colors duration-200 hover:bg-[#56725f] hover:text-[#f3dda0] xl:px-3.5";

/* Pang-CTA sa mega menu. Hiwalay sa `ChevronIcon`: chevron iyon para sa
   mga listahan at drawer, at mahaba ang arrow na ito para sa pindutan. */
function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.9" />
      <path d="m15.5 15.5 4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

const SEARCH_ITEMS = [
  ...SITE_SECTIONS.flatMap((section) => [
    { label: section.label, href: `/${section.slug}`, category: "Explore" },
    ...section.links.map((link) => ({
      label: link.label,
      href: link.href,
      category: section.label,
    })),
  ]),
  { label: "Plan Your Visit", href: "/plan-your-visit", category: "Visitor information" },
  { label: "Getting Here", href: "/getting-here", category: "Visitor information" },
  { label: "Frequently Asked Questions", href: "/faq", category: "Visitor information" },
  { label: "Contact Us", href: "/contact", category: "Visitor information" },
] as const;

const FEATURED_SEARCH_ITEMS = SEARCH_ITEMS.filter((item) => item.category === "Explore");

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();
  /* Isinasalin ang label ng section; kung walang key, ang orihinal ang gamit. */
  const sectionLabel = (slug: string, fallback: string) => (slug in NAV_KEYS ? t(NAV_KEYS[slug]) : fallback);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** Slug ng section na binuksan sa loob ng mobile drawer; null = ugat na listahan. */
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [hoveredPreviewIndex, setHoveredPreviewIndex] = useState<number | null>(null);
  const [accommodationSlideIndex, setAccommodationSlideIndex] = useState(0);
  /** Naka-hover na item sa pangatlong hanay; nauuna ito sa preview. */
  const [hoveredExtra, setHoveredExtra] = useState<{ label: string; href: string; image?: string } | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lastScrollY = useRef(0);
  const compactHeader = useRef(false);
  const activeSection = NAV_SECTIONS.find((section) => section.slug === openMenu);
  const desktopPanelOpen = Boolean(activeSection || searchOpen);
  const mobileSubsection = NAV_SECTIONS.find((section) => section.slug === mobileSection);
  const megaStyle = activeSection ? MEGA_STYLES[activeSection.slug] ?? "rules" : "rules";
  /* Ito ang nagpapasya kung tatlo o dalawa ang haligi ng panel. */
  const sectionExtras = activeSection ? SECTION_EXTRAS[activeSection.slug] : undefined;
  /* Kapag iisa lang ang accommodation, hindi na kailangan ng duplicate na
     Highlights card. Villa overview sa kaliwa at help links sa kanan. */
  const hidesHighlights = megaStyle === "cards" && activeSection?.links.length === 1;
  const accommodationSlide = activeSection?.slug === "accommodations"
    ? VILLA_DEL_REY_STAYS[accommodationSlideIndex]
    : null;
  /**
   * Padding sa itaas ng tatlong haligi ng mega panel, at iba ito kada estado.
   *
   * 18px ang gusto nating makita sa itaas ng mga heading sa dalawa. Pero
   * magkaiba ang pinagdudugtungan ng panel:
   *
   *   HERO — sa nav. Pumapasok ang panel ng 18px sa ilalim ng nav, kaya
   *   nakatago ang unang 18px ng padding. Sa 36px ay 18px ang kita.
   *
   *   NAKA-SCROLL — sa bar. Dikit ang panel sa ibaba nito at walang
   *   nakatakip, kaya buo ang nakikita. Sa 36px ay 36px — doble, at iyon
   *   ang nakita sa screenshot.
   *
   * Kapag ginalaw ang `top` ng panel o ang taas ng bar, sundan ito.
   */
  const megaColumnTop = isScrolled ? "pt-[18px]" : "pt-9";
  /**
   * May Home sa nav kapag wala tayo sa homepage.
   *
   * Link ang marka papunta sa "/" pero marka lang ito — kailangang alam ng
   * bisita na bahay ang ibig sabihin niyon. Ang nakasulat na HOME sa tabi
   * ng mga section ang nagsasabi niyon nang diretso, at iyon ang hinihiling
   * ng mga bisitang hindi sanay sa ganoong kombensiyon.
   *
   * Nawawala ito sa "/" dahil doon ay wala itong patutunguhan — link ito
   * papunta sa pahinang binabasa na.
   */
  const isAwayFromHome = pathname !== "/";

  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();
  const searchResults = (normalizedSearchQuery
    ? SEARCH_ITEMS.filter((item) => `${item.label} ${item.category}`.toLocaleLowerCase().includes(normalizedSearchQuery))
    : FEATURED_SEARCH_ITEMS
  ).slice(0, 8);

  const openSearch = (trigger: HTMLButtonElement) => {
    cancelScheduledClose();
    clearPreview();
    setOpenMenu(null);
    setMobileMenuOpen(false);
    if (searchOpen) {
      setSearchOpen(false);
      return;
    }
    searchTriggerRef.current = trigger;
    setSearchQuery("");
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    window.requestAnimationFrame(() => searchTriggerRef.current?.focus());
  };

  /* Isinasara lang ang drawer; ang pagbalik sa ugat ay hinahawakan ng effect
     sa ibaba pagkatapos ng fade, para hindi kumislap ang unang antas. */
  const closeMobileNav = () => setMobileMenuOpen(false);
  /**
   * Dalawang paraan ng pagkuha ng larawan sa preview.
   *
   * Ang Golf at Accommodations ay may sariling listahan ng pahina
   * (COURSE_PAGES, ACCOMMODATIONS) kung saan hinuhugot ang larawan. Ang iba
   * ay pwedeng magdala ng sariling `image` sa bawat link — iyon ang paraang
   * gamit ng Experiences, dahil pasilidad ang laman ng listahan niya at
   * walang hiwalay na pahina ang bawat isa.
   *
   * Kapag walang larawan ang link, nananatili ang larawan ng buong section.
   * Kaya ligtas magdagdag ng link na walang `image`.
   */
  const hoveredLink = hoveredPreviewIndex === null ? null : activeSection?.links[hoveredPreviewIndex] ?? null;
  /* Ang `typeof` na pagsusuri ay hindi labis: hangga't walang kahit isang
     link na may `image`, ang `in` lang ay nagbibigay ng `{}` sa TypeScript
     at hindi tinatanggap ng next/image. Ito ang nagpapanatiling `string`. */
  const hoveredLinkImage =
    hoveredLink && "image" in hoveredLink && typeof hoveredLink.image === "string"
      ? hoveredLink.image
      : null;

  const hoveredPreview = hoveredPreviewIndex === null
    ? null
    : activeSection?.slug === "golf"
      ? COURSE_PAGES[hoveredPreviewIndex]
      : activeSection?.slug === "accommodations"
        ? ACCOMMODATIONS.find((stay) => activeSection.links[hoveredPreviewIndex]?.href.endsWith(stay.slug))
        : null;

  /**
   * May preview ang section kung may sariling pahina ang bawat link nito, o
   * kung may kahit isang link na may dalang larawan.
   *
   * Maliban sa `cards`: nasa gitnang haligi na mismo ang larawan doon, at
   * kasinglaki o mas malaki pa iyon (271px sa dalawang card) kaysa sa
   * preview sa kaliwa (184px). Walang naidadagdag ang pagpapalit ng
   * preview kundi paggalaw — pareho lang ang larawang ipinapakita nito.
   */
  const sectionHasLinkPreviews =
    megaStyle !== "cards" &&
    (activeSection?.slug === "golf" ||
      activeSection?.slug === "accommodations" ||
      (activeSection?.links.some((link) => "image" in link) ?? false));

  /* Nauuna ang pangatlong hanay: kapag doon ang daliri, iyon ang dapat
     nasa preview kahit may naiwang naka-hover na butas sa gitna. */
  const previewImage = hoveredExtra?.image ?? hoveredLinkImage ?? hoveredPreview?.image ?? accommodationSlide?.exterior ?? activeSection?.image;
  /* WALANG LABEL KAPAG WALANG NAKA-HOVER. Ang pangalan ng section ang
     nakalagay dito dati ("GOLF" sa ibabaw ng larawan ng golf) — pangalawang
     kopya iyon ng naka-highlight nang tab sa itaas mismo nito. Pangalan lang
     ng aktwal na na-hover ang lumalabas ngayon. */
  const previewLabel = hoveredExtra
    ? hoveredExtra.label
    : hoveredLink
      ? hoveredLink.label
      : hoveredPreview?.title ?? null;
  /* Ang href ng link mismo ang sinusundan, hindi binubuo mula sa slug ng
     section at ng pahina. Sa `/${slug}/${hoveredPreview.slug}` ay
     `/golf/hole-no.4` ang nabubuo — 404 iyon dahil nasa ilalim ng
     `/golf/courses/hole-no.4` ang ruta. Isang pinagmulan na lang ngayon. */
  const previewHref = hoveredExtra
    ? hoveredExtra.href
    : hoveredLink
      ? hoveredLink.href
      : activeSection
        ? hidesHighlights
          ? activeSection.links[0]?.href ?? `/${activeSection.slug}`
          : `/${activeSection.slug}`
        : "/";

  /**
   * Larawan ng iisang link, para sa mga card at tile sa gitnang hanay.
   *
   * Pareho ang panuntunan sa preview sa itaas: sariling `image` muna, saka
   * ang hinugot sa COURSE_PAGES o ACCOMMODATIONS. Kaya may larawan ang
   * Golf at Accommodations kahit wala sa link mismo ang path.
   *
   * Nagbabalik ng `null` kapag talagang wala — hindi `activeSection.image`.
   * Sa isang grid ay magkakapareho ang lahat ng card kung gayon, at iyon
   * ang dahilan kung bakit `rules` ang Events at hindi `cards`.
   */
  const linkImageAt = (index: number) => {
    const link = activeSection?.links[index];
    if (!link) return null;
    if ("image" in link && typeof link.image === "string") return link.image;
    if (activeSection?.slug === "golf") return COURSE_PAGES[index]?.image ?? null;
    if (activeSection?.slug === "accommodations") {
      return ACCOMMODATIONS.find((stay) => link.href.endsWith(stay.slug))?.image ?? null;
    }
    return null;
  };

  /**
   * Pare-pareho ang kilos ng bawat link sa gitnang hanay anuman ang anyo:
   * bagong tab kapag palabas ng site (halimbawa ang Pickleball Club, para
   * hindi maiwan ang bisita), sarado ang menu pagkapindot, at pinapalitan
   * ang preview sa kaliwa pag-hover. Nasa isang lugar ito para hindi
   * maiwan ang isang anyo kapag may binago sa mga ito.
   */
  const highlightLinkProps = (link: { href: string; label: string }, index: number) => ({
    href: link.href,
    target: link.href.startsWith("http") ? "_blank" : undefined,
    rel: link.href.startsWith("http") ? "noreferrer" : undefined,
    onClick: closeDesktopMenu,
    onMouseEnter: () => {
      if (sectionHasLinkPreviews) setHoveredPreviewIndex(index);
    },
    onFocus: () => {
      if (sectionHasLinkPreviews) setHoveredPreviewIndex(index);
    },
  });

  /* Dalawa ang pinagmulan ng preview: ang naka-hover na link sa gitnang
     haligi at ang item sa pangatlong hanay. Kapag isa lang ang binura,
     nananatili ang larawan ng isa pagkabukas muli ng menu. */
  const clearPreview = () => {
    setHoveredPreviewIndex(null);
    setHoveredExtra(null);
  };

  const cancelScheduledClose = () => {
    if (closeMenuTimer.current) {
      clearTimeout(closeMenuTimer.current);
      closeMenuTimer.current = null;
    }
  };

  const toggleDesktopMenu = (slug: string) => {
    cancelScheduledClose();
    clearPreview();
    setSearchOpen(false);
    if (slug === "accommodations") setAccommodationSlideIndex(0);
    setOpenMenu((currentMenu) => currentMenu === slug ? null : slug);
  };

  useEffect(() => {
    if (openMenu !== "accommodations") return;
    const timer = window.setInterval(() => {
      setAccommodationSlideIndex((current) => (current + 1) % VILLA_DEL_REY_STAYS.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [openMenu]);

  const scheduleDesktopMenuClose = () => {
    cancelScheduledClose();
    closeMenuTimer.current = setTimeout(() => {
      clearPreview();
      setOpenMenu(null);
      closeMenuTimer.current = null;
    }, 160);
  };

  const closeDesktopMenu = () => {
    cancelScheduledClose();
    clearPreview();
    setOpenMenu(null);
  };

  useEffect(() => {
    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      // Use separate enter/exit thresholds so tiny trackpad movements near the
      // top cannot rapidly toggle the two header layouts.
      const hasScrolled = compactHeader.current ? currentScrollY > 4 : currentScrollY > 28;

      if (compactHeader.current !== hasScrolled) {
        compactHeader.current = hasScrolled;
        setIsScrolled(hasScrolled);
      }

      /* Laging nasa loob ng bar ang nav kapag naka-scroll; ang natitirang
         direksyon ng scroll ay ginagamit na lang para isara ang mega menu
         kapag bumababa ang bisita. */
      if (!hasScrolled) {
        lastScrollY.current = 0;
      } else if (currentScrollY < lastScrollY.current - 10) {
        lastScrollY.current = currentScrollY;
      } else if (currentScrollY > lastScrollY.current + 10) {
        setOpenMenu(null);
        setSearchOpen(false);
        lastScrollY.current = currentScrollY;
      }
    };

    lastScrollY.current = window.scrollY;
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  /* Ang Escape ay umaatras muna ng isang antas sa mobile drawer bago
     tuluyang magsara — iyon ang inaasahan sa drill-down na menu. */
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (searchOpen) {
        setSearchOpen(false);
        window.requestAnimationFrame(() => searchTriggerRef.current?.focus());
        return;
      }
      setOpenMenu(null);
      if (mobileSection) setMobileSection(null);
      else setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileSection, searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const focusFrame = window.requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => window.cancelAnimationFrame(focusFrame);
  }, [searchOpen]);

  /* Ibinabalik sa ugat ang drawer pagkatapos nitong magsara, hindi habang
     nagsasara, para hindi kumislap ang unang antas sa panahon ng fade. */
  useEffect(() => {
    if (mobileMenuOpen) return;
    const timer = setTimeout(() => setMobileSection(null), 320);
    return () => clearTimeout(timer);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        /* Ang mga setter mismo, hindi ang `clearPreview`: bago ang huli sa
           bawat render, at mapapasama ito sa deps ng effect na ito. */
        setHoveredPreviewIndex(null);
        setHoveredExtra(null);
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const closeFrame = window.requestAnimationFrame(() => {
      setMobileMenuOpen(false);
      setOpenMenu(null);
      setSearchOpen(false);
    });
    return () => window.cancelAnimationFrame(closeFrame);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      /* Walang onMouseLeave: pindot lang ang nagbubukas at nagsasara ng mega
         menu. Dati, pag-alis ng cursor ay nagsasara ito kahit sinadya mong
         buksan — at sa malawak na panel, madaling makalabas ang cursor. Ang
         nagsasara pa rin: pindutin ulit ang parehong tab, pumili ng iba,
         pindot sa labas, Escape, o pag-scroll pababa. */
      onFocusCapture={cancelScheduledClose}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          scheduleDesktopMenuClose();
        }
      }}
      className={`${isScrolled ? "min-h-20" : ""} fixed inset-x-0 top-0 z-[100] isolate overflow-visible bg-transparent font-navigation`}
    >
      <div
        data-header-background
        /* Desktop pataas lang: sa cellphone ang malapad na pill mismo ang
           header, at dapat lumulutang ito gaya ng reference — kapag may
           buong-lapad na bar sa likod, dalawang bagay ang nagsasalansan.

           SURFACE GREEN ITO, HINDI ACTION. Ang bar na ito ay lalagyan lang —
           nakalatag sa likod ng marka at ng pindutan, at hindi ito
           pinipindot. Ang compact nav pill na nakapatong dito ay `#265136`,
           kaya ang pagkakaiba ng dalawa ang naghihiwalay sa pill mula sa
           bar; kapag pareho sila, nawawala ang pill sa loob ng bar. */
        className={`${isScrolled ? "translate-y-0" : "-translate-y-full"} pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-20 transform-gpu border-b border-[#d8b65b]/25 bg-[#1f3f2e] shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-transform duration-350 ease-out lg:block`}
        aria-hidden="true"
      />
      <div
        className={`${isScrolled ? "opacity-0" : "opacity-100"} pointer-events-none absolute inset-x-0 top-0 -z-20 h-40 bg-gradient-to-b from-black/45 to-transparent`}
        aria-hidden="true"
      />

      {/* Isang haligi lang sa cellphone. Sa dalawang haligi, nananatili ang
          gap-5 kahit walang laman ang pangalawa, kaya 10px na pakaliwa ang
          nasesentrong pill. */}
      {/* BUONG LAPAD SA DESKTOP, SA DALAWANG ESTADO. Naka-cap sa `max-w-7xl`
          ang hero dati at `lg:max-w-none` lang ang naka-scroll, kaya 141px
          mula sa gilid ang marka sa hero at 32px kapag naka-scroll —
          tumatalon ito nang 109px pakaliwa sa unang scroll. Pareho na sila
          ngayon: nasa gilid na ang marka at ang pindutan, at hindi na
          gumagalaw nang pahalang kapag nag-scroll.

          Magkaiba ang kaliwa at ang kanan: `pl-6` (24px) at `pr-7` (28px).
          Mas makipot ang kaliwa dahil may sariling puting espasyo sa loob
          ng larawan ang marka, kaya mas malayo ang tingin nito sa gilid
          kaysa sa totoong sukat.

          MAY CAP SA 1400px. Buong lapad ito sandali, at sa 1920px ay
          umaabot sa 453px at 381px ang dalawang puwang sa magkabilang
          gilid ng nav — nag-iisa ang nav sa gitna at walang kinalaman sa
          marka at sa pindutan. Hindi ito nakikita sa 1400px pababa dahil
          hindi pa kumakagat ang cap doon; sa mas malaki ay hindi na
          lumalayo pa ang tatlo.

          Ligtas ito sa mega panel: `mx-auto` pa rin ang container, kaya
          nasa sentro pa rin ng screen ang sentro nito — at sa sentrong
          iyon nakaangkla ang nav at ang panel. */}
      <div className={`${isScrolled ? "py-3 lg:py-3" : "py-5 lg:py-6"} pointer-events-none relative z-40 mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 px-6 lg:max-w-[1400px] lg:grid-cols-[1fr_auto_1fr] lg:pl-6 lg:pr-7`}>
        <Link
          href="/"
          /* Iisang sukat sa lahat ng route. Dati ay may hiwalay na mas maliit
             na sukat ang lahat maliban sa "/", kaya lumiliit ang buong header
             sa bawat paglipat ng pahina. Ang sukat ng homepage ang sinusunod. */
          /* Nakatago sa cellphone: nasa loob na ng pill ang buong logo doon.
             Desktop pataas lang ang may hiwalay na logo. */
          className={`${isScrolled ? "h-14 w-14" : "h-44 w-[132px] lg:h-52 lg:w-[156px]"} pointer-events-auto relative hidden shrink-0 justify-self-start lg:block`}
          aria-label="Camsur Uptown Golf Club — home"
        >
          <span data-logo="full" className={`${isScrolled ? "invisible opacity-0" : "visible opacity-100"} absolute inset-0`}>
            <Image
              src="/camsur-uptown-logo.png"
              alt="Camsur Uptown Golf Club"
              width={176}
              height={234}
              priority
              className="h-full w-full object-contain drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]"
            />
          </span>
          <span
            data-logo="mark"
            className={`${isScrolled ? "visible opacity-100" : "invisible opacity-0"} absolute left-1/2 top-1/2 block h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden`}
            aria-hidden="true"
          >
            <Image
              src="/camsur-uptown-mark-transparent.png"
              alt=""
              width={911}
              height={1251}
              priority
              className="h-full w-full object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
            />
          </span>
        </Link>

        {/* 820px ang lapad nito para sa nav sa hero. Kapag naka-scroll ay
            nakatago na ang nav at 318px na lang ang laman — kaya `w-auto`
            doon. Sa 820px ay 42px lang ang natitira sa bawat gilid na track
            ng grid sa 1024px, at lumalabas ng 46px sa kanan ang Contact Us. */}
        {/* WALA NANG HILERA SA ITAAS NG NAV. May "Plan your visit" at ang
            numero dito dati, nakapatong sa nav. Nasa pindutan sa kanan na
            ang Plan your visit, at nasa footer at sa /contact ang numero,
            kaya wala nang ikalawang laman ang haliging ito. Kasama ng
            hilerang iyon ang `-translate-y-7` at ang `gap-3` — pang-angat
            iyon ng dalawang magkapatong na laman, at walang silbi sa isa.

            NAKA-SENTRO SA CONTAINER, HINDI SA TRACK NG GRID. `justify-self-center`
            ito dati sa gitnang track ng `1fr auto 1fr`. Ang problema: hindi
            lumiliit ang track sa ilalim ng `min-content`, kaya kapag mas
            malapad ang pindutan sa kanan kaysa sa natural na 1fr (193px ang
            "Plan Your Visit" laban sa 178px) ay lumalaki ang pangatlong
            track at naitutulak pakaliwa ang buong gitna — 15px sa 1512px,
            79px sa 1152px. Naiiwan ang mega panel, na naka-sentro sa
            container, kaya hindi na sila magkatapat.

            Pareho na silang `left-1/2 -translate-x-1/2` sa container ngayon,
            kaya iisa ang angkla nila at hindi na sila maaaring maghiwalay.
            Ganito na rin pala ang compact nav sa ibaba — sinusundan lang
            nito iyon. Ang `top-[68px]` ang posisyon nito sa hilera;
            hindi nagbabago ang taas ng header dahil ang marka (208px) ang
            nagtatakda niyon, hindi ang nav. */}
        <div className={`${isScrolled ? "w-auto" : "w-[min(820px,calc(100vw-34rem))] 2xl:w-[900px]"} hidden -translate-x-1/2 flex-col items-center gap-0 lg:absolute lg:left-1/2 lg:top-[68px] lg:flex`}>
          <nav
            data-nav="hero"
            aria-label="Primary navigation"
            className={`${isScrolled ? "invisible pointer-events-none max-h-0 overflow-hidden border-transparent p-0 opacity-0" : desktopPanelOpen ? "visible max-h-16 w-[min(820px,calc(100vw-34rem))] rounded-t-[1.6rem] rounded-b-none border border-b-white/25 border-white/10 bg-[#265136] px-5 py-2 opacity-100 shadow-none 2xl:w-[900px]" : /* `w-auto`, HINDI NAKATAKDANG LAPAD. Nakapirmi ito sa 760px dati —
                   sukat para sa pitong item. Sa anim ay 625px na lang ang
                   laman, kaya 123px na bakante ang ipinapamahagi ng
                   `justify-evenly` bilang 17px na puwang sa pagitan ng bawat
                   pindutan, at lumalawak ang pill kaysa sa nilalaman nito.

                   Sa `w-auto` ay ang sariling `px-3.5` na ng bawat pindutan
                   ang puwang, kaya sumusunod ang pill sa bilang ng item —
                   hindi na kailangang sukatin muli kapag may idinagdag o
                   inalis sa SITE_SECTIONS. Ang `max-w` ang humahawak nito sa
                   loob ng screen kapag marami na ang item. */
                "visible max-h-16 w-auto max-w-[calc(100vw-3rem)] rounded-full border border-[#d8b65b]/20 bg-[#265136]/88 p-1.5 opacity-100 shadow-[0_12px_35px_rgba(0,0,0,0.16)]"} ${desktopPanelOpen ? "flex items-center justify-between gap-1 xl:gap-1.5" : "grid grid-flow-col auto-cols-max items-center justify-evenly gap-1 xl:gap-1.5"} pointer-events-auto relative z-50 h-12 text-[10px] font-semibold uppercase tracking-[0.07em] text-[#f3dda0] backdrop-blur-md xl:text-[11px] xl:tracking-[0.09em]`}
          >
            {isAwayFromHome ? (
              <Link href="/" onClick={closeDesktopMenu} className={NAV_ITEM_CLASS}>
                {t("nav.home")}
              </Link>
            ) : null}
            {NAV_SECTIONS.map((item) => (
              <button
                type="button"
                key={item.slug}
                onClick={() => toggleDesktopMenu(item.slug)}
                aria-expanded={openMenu === item.slug}
                aria-haspopup="true"
                aria-controls="desktop-mega-menu"
                className={`${openMenu === item.slug ? "bg-[#56725f] text-[#f3dda0]" : ""} ${NAV_ITEM_CLASS}`}
              >
                {sectionLabel(item.slug, item.label).toUpperCase()}
              </button>
            ))}
            <span className="ml-0.5 flex items-center border-l border-[#f3dda0]/20 pl-1">
              <button
                type="button"
                onClick={(event) => openSearch(event.currentTarget)}
                aria-label="Search this site"
                aria-expanded={searchOpen}
                aria-controls="site-search-panel"
                className={`${searchOpen ? "bg-[#56725f]" : ""} flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#f3dda0] transition-colors duration-200 hover:bg-[#56725f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dda0]`}
              >
                <SearchIcon />
              </button>
            </span>
          </nav>
        </div>

        {/* Weather + language — naka-center sa itaas ng nav pill. Palaging
            mounted ang component kahit naka-scroll at visually hidden: sa
            ganitong paraan hindi nawawala ang huling temperature at hindi
            bumabalik sa `—°` kapag umakyat muli sa hero. */}
        <div
          className={`${isScrolled ? "pointer-events-none invisible opacity-0" : "pointer-events-auto visible opacity-100"} absolute left-1/2 top-[28px] hidden -translate-x-1/2 transition-opacity duration-200 lg:block`}
        >
          <HeaderUtilities />
        </div>

        {/* "Contact Us" ito dati at ang "Plan your visit" ay nasa maliit na
            hilera sa itaas ng nav. Pinagpalit: isang pangunahing pindutan
            lang ang header, at ang pagpaplano ng pagbisita ang hinihiling
            nito — hindi ang pagtatanong. Nananatili ang /contact sa footer
            at sa loob ng /plan-your-visit. */}
        {/* "Plan Your Visit" — nasa kanan. Ang weather + language ay hindi na
            dito; nakalutang na sila nang naka-center sa itaas ng nav pill sa
            ibaba. */}
        <div
          className={`${isScrolled ? "translate-y-0" : "-translate-y-9"} pointer-events-auto hidden justify-self-end lg:col-start-3 lg:block`}
        >
          <Link
            href="/plan-your-visit"
            /* GINTO NG MARKA, HINDI PUTI. Sinipsip ko ang kulay mula mismo sa
             `camsur-uptown-logo.png` — #e0c878 hanggang #e8d088 ang
             pinakamaraming pixel doon, at ang #e7d18d na matagal nang nasa
             site (CTA ng packages, mga eyebrow) ay nasa gitna niyon. Kaya
             hindi bagong kulay ito kundi ang ginto na natin.

             `whitespace-nowrap`: napuputol sa dalawang linya ang "Plan Your
             Visit" sa makikitid na track, at nasisira nito ang bilog. */
          /* `lg:col-start-3`: wala na sa daloy ng grid ang nav, kaya sa
             pangalawang track na sana ito mapupunta. Ipinapako nito sa
             pangatlo. Bakante na ang gitna (`auto` = 0), kaya 588px na ang
             bawat gilid na track sa 1512px — dating 178px, at doon
             nagmumula ang pagkakalabas ng pindutan sa 1024px. */
          /* ISANG ANINO LANG, AT ITIM. May gintong singsing at gintong sinag
             ito sandali — halo iyon sa paligid ng pindutan, at sa krema at
             sa maliwanag na langit ay parang malabo ang gilid nito. Ang
             malambot na itim ang natira: iyon lang naman ang kailangan para
             bumukod ito sa larawan sa likod. */
          /* Ginto pa rin (#e7d18d), pero may mas madilim na gintong border
             (#b8963f) at mas malakas na anino ngayon — para humiwalay ito sa
             maliwanag na langit ng hero kung saan halos di-mahalata dati. */
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#b8963f] bg-[#e7d18d] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#265136] shadow-[0_10px_26px_rgba(0,0,0,0.34)] transition duration-200 hover:border-[#c9a54e] hover:bg-[#f3dfa0] hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] xl:px-8 xl:py-3.5 xl:text-[11px]"
        >
          {/* NAKATAGO ANG ICON SA IBABA NG `xl`. Nasa gitna ng screen ang
              nav at naka-angkla sa dalawang gilid ang marka at ito, kaya
              tatlo silang naghahati ng iisang hilera. Sa 1024px ay 15px ang
              patong ng pindutan at ng nav noong laging nakikita ang icon —
              34px kasi ang idinadagdag nito sa lapad. Sa `xl` pataas ay
              sagana na ang puwang. */}
          <CalendarIcon className="hidden h-3.5 w-3.5 shrink-0 xl:block" />
          {t("action.planVisit")}
          </Link>
        </div>

        {/* Cellphone lang: isang pill na may tatlong sona — marka sa kaliwa,
            MENU sa gitna, telepono sa kanan. Ito na ang buong header sa lapad
            na ito, kaya halos buo ang opacity: lumulutang ito sa ibabaw ng
            nilalaman, kahit sa mapuputing section.

            Kasinlaki lang ng laman nito, hindi buong lapad: sa `w-full` at
            `justify-between` ay nauuwi sa dalawang dulo ang marka at ang
            telepono at malayo sila sa MENU sa gitna. Ang `gap` na ito ang
            nagtatakda ng layo ngayon, at `justify-self-center` ang
            nagpapanatili nitong nakagitna sa grid ng header. */}
        <div className="pointer-events-auto flex w-auto items-center justify-self-center gap-10 rounded-full border border-white/20 bg-[#265136]/95 px-5 py-2.5 shadow-[0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:hidden">
          <Link
            href="/"
            aria-label="Camsur Uptown Golf Club — home"
            className="flex h-11 shrink-0 items-center"
          >
            {/* Shield lang, walang wordmark. Sinubukan ang buong logo dito
                pero portrait ito at apat na linya ang wordmark: kailangan ng
                96px na logo bago mabasa ang teksto, at ~114px na pill iyon —
                halos triple ng phone button sa tabi nito. Kung dapat mabasa
                ang pangalan sa pill, pahalang na lockup ang kailangan, hindi
                pagpapalaki nito. */}
            <Image
              src="/camsur-uptown-mark-transparent.png"
              alt=""
              width={911}
              height={1251}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`${mobileMenuOpen ? "text-[#f1d98f]" : "text-white"} flex items-center gap-3 font-navigation text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:text-[#f1d98f]`}
          >
            {t("mobile.menu")}
            <span className="relative flex h-4 w-6 shrink-0 items-center justify-center" aria-hidden="true">
              <span className={`${mobileMenuOpen ? "rotate-45" : "-translate-y-[5px]"} absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300`} />
              <span className={`${mobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"} absolute h-0.5 w-6 rounded-full bg-current transition duration-200`} />
              <span className={`${mobileMenuOpen ? "-rotate-45" : "translate-y-[5px]"} absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300`} />
            </span>
          </button>

          <a
            href={PHONE_HREF}
            aria-label={`Call ${PHONE_LABEL}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 text-white/90 transition hover:border-[#f1d98f] hover:text-[#f1d98f]"
          >
            <PhoneIcon />
          </a>
        </div>
      </div>

      <button
        type="button"
        aria-label="Close mobile navigation"
        tabIndex={mobileMenuOpen ? 0 : -1}
        onClick={() => setMobileMenuOpen(false)}
        className={`${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"} fixed inset-0 z-20 bg-[#020b07]/55 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden`}
      />

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        /* Kasunod ng ilalim ng pill. Iisang halaga na lang: wala nang buong
           logo sa ibabaw ng pill sa cellphone, kaya bahagya lang ang
           pagkakaiba ng dalawang estado (80px na pill, 20px o 12px ang
           padding ng hilera). */
        className={`${mobileMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"} fixed inset-x-4 top-[6.5rem] z-30 max-h-[calc(100svh-7.5rem)] overflow-y-auto rounded-[1.75rem] border border-white/12 bg-[#265136]/98 p-3 text-white shadow-[0_30px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-out sm:left-auto sm:right-6 sm:w-[390px] lg:hidden`}
      >
        {mobileSubsection ? (
          <div key={mobileSubsection.slug} className="nav-panel-enter">
            <div className="flex items-center justify-between gap-3 px-3.5 pb-3 pt-2">
              <button
                type="button"
                onClick={() => setMobileSection(null)}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-[#f1d98f]"
              >
                <ChevronIcon className="h-3.5 w-3.5 rotate-180" />
                {t("mega.goBack")}
              </button>
              <span className="border-b-2 border-[#d8b65b] pb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                {sectionLabel(mobileSubsection.slug, mobileSubsection.label)}
              </span>
            </div>

            <div className="border-t border-white/12 px-3.5 pb-1 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f3dda0]">
                {t("mega.highlights")}
              </p>

              {/* Dalawang hanay lang kapag marami — ang Golf ay 18 na butas, at
                  sa isang hanay ay mas mahaba pa iyon kaysa sa screen. Sa Golf
                  ay iilang butas lang ang kita (`MOBILE_GOLF_HIGHLIGHTS`); nasa
                  "View all" na link sa ibaba ang natitira. */}
              <ul className={`mt-3.5 grid gap-x-4 ${mobileSubsection.slug === "golf" || mobileSubsection.links.length > 6 ? "grid-cols-2 gap-y-3" : "grid-cols-1 gap-y-3.5"}`}>
                {(mobileSubsection.slug === "golf"
                  ? mobileSubsection.links.slice(0, MOBILE_GOLF_HIGHLIGHTS)
                  : mobileSubsection.links
                ).map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                        onClick={closeMobileNav}
                        className="block text-sm font-medium leading-snug text-white/82 transition-colors hover:text-[#f1d98f]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Natitirang butas: isang link na lang papunta sa buong listahan
                  sa /golf, sa halip na ilista silang lahat dito. */}
              {mobileSubsection.slug === "golf" && mobileSubsection.links.length > MOBILE_GOLF_HIGHLIGHTS ? (
                <Link
                  href="/golf"
                  onClick={closeMobileNav}
                  className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dda0] transition-colors hover:text-[#f1d98f]"
                >
                  View all {mobileSubsection.links.length} holes
                  <ChevronIcon className="h-3 w-3" />
                </Link>
              ) : null}

              {mobileSubsection.slug === "golf" ? (
                <div className="mt-5 border-t border-white/12 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f3dda0]">
                    Upcoming tournament
                  </p>
                  <Link
                    href={UPCOMING_TOURNAMENT.href}
                    onClick={closeMobileNav}
                    className="group mt-3 block overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] transition-colors hover:border-[#f3dda0]/35 hover:bg-white/[0.08]"
                    aria-label={`${UPCOMING_TOURNAMENT.label}, ${UPCOMING_TOURNAMENT.date}, ${UPCOMING_TOURNAMENT.status}`}
                  >
                    <span className="relative block aspect-[1.8] overflow-hidden bg-[#173b28]">
                      <Image
                        src={UPCOMING_TOURNAMENT.image}
                        alt=""
                        fill
                        sizes="340px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-[#071a12]/70 via-transparent to-transparent" aria-hidden="true" />
                      <span className="absolute bottom-3 left-3 rounded-full bg-[#e7d18d] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#14271d]">
                        {UPCOMING_TOURNAMENT.status}
                      </span>
                    </span>
                    <span className="block p-4">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.15em] text-[#f3dda0]">
                        {UPCOMING_TOURNAMENT.date}
                      </span>
                      <span className="mt-1.5 block text-base font-semibold leading-snug text-white">
                        {UPCOMING_TOURNAMENT.label}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-white/60">
                        {UPCOMING_TOURNAMENT.time} · {UPCOMING_TOURNAMENT.format}
                      </span>
                    </span>
                  </Link>
                </div>
              ) : null}

              {mobileSubsection.slug !== "accommodations" ? (
                <Link
                  href={`/${mobileSubsection.slug}`}
                  onClick={closeMobileNav}
                  className="mt-5 flex min-h-11 items-center justify-center rounded-full border border-white/35 px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#f1d98f] hover:bg-[#f1d98f] hover:text-[#0b281b]"
                >
                  {t("mega.viewAll")} {sectionLabel(mobileSubsection.slug, mobileSubsection.label)}
                </Link>
              ) : null}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-3 pb-2 pt-2">
              <div>
                {/* Buong pangalan ng club, gaya ng sa footer — hindi pinaikli. */}
                <p className="text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3dda0]">CamSur Uptown Golf Club</p>
                <p className="mt-1 text-sm font-semibold text-white/90">{t("mobile.explore")}</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">{t("mobile.menu")}</span>
            </div>

            <nav aria-label="Mobile primary navigation" className="mt-2 border-t border-white/12">
              {NAV_SECTIONS.map((item) => {
                const href = `/${item.slug}`;
                const isActive = pathname === href || pathname.startsWith(`${href}/`);

                /* Kapag walang sub-link ang section, walang dapat buksan —
                   dumiretso na lang sa pahina nito. */
                if (item.links.length === 0) {
                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      onClick={closeMobileNav}
                      aria-current={isActive ? "page" : undefined}
                      className={`${isActive ? "text-[#f1d98f]" : "text-white"} flex min-h-[52px] items-center justify-between gap-3 border-b border-white/12 px-3.5 transition-colors hover:text-[#f1d98f]`}
                    >
                      <span className="text-sm font-bold uppercase tracking-[0.08em]">{sectionLabel(item.slug, item.label)}</span>
                      <ChevronIcon className="h-4 w-4 text-white/45" />
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setMobileSection(item.slug)}
                    aria-expanded={false}
                    className={`${isActive ? "text-[#f1d98f]" : "text-white"} group flex min-h-[52px] w-full items-center justify-between gap-3 border-b border-white/12 px-3.5 text-left transition-colors hover:text-[#f1d98f]`}
                  >
                    <span className="text-sm font-bold uppercase tracking-[0.08em]">{sectionLabel(item.slug, item.label)}</span>
                    <ChevronIcon className="h-4 w-4 text-white/45 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </nav>
          </>
        )}

        {/* Wala nang telepono dito: nasa pill na sa itaas ang numero, kaya
            hindi nawawala ang paraan para tumawag. Hindi na rin grid ito —
            sa isang item, nananatili ang gap-2 at hindi buong lapad ang
            pindutan. */}
        <Link
          href="/plan-your-visit"
          onClick={closeMobileNav}
          className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-[#f1d98f] px-5 text-xs font-bold uppercase tracking-[0.08em] text-[#0b281b] transition hover:bg-[#f6e4a9]"
        >
          {t("action.planVisit")}
        </Link>
      </div>

      <nav
        data-nav="compact"
        aria-label="Compact primary navigation"
        /* NASA LOOB NA NG BAR, AT WALA NANG PILL. Lumulutang ito dati sa
           `top-[70px]` — sa ilalim ng 80px na bar, kaya nakabitin ito sa
           labas nito — at may sariling bilog, gilid, background at anino.
           Dalawang magkapatong na hugis iyon: bar sa likod, pill sa ibabaw.
           `top-[16px]` ngayon, na siyang nagsesentro sa 48px na nav sa loob
           ng 80px na bar, at hubad na ito — ang bar na mismo ang lalagyan.

           LAGING NAKIKITA KAPAG NAKA-SCROLL. Nakasalalay ito dati sa
           `showCompactNav`, na nagpapakita lang nito kapag pataas ang
           scroll, kaya walang laman ang gitna ng bar sa karamihan ng oras.

           `xl:-ml-[34px]`: kaparehong offset ng hero nav at ng panel, para
           magkatapat pa rin ang gilid ng nav at ng panel. */
        className={`${isScrolled ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"} absolute left-1/2 top-[16px] z-50 hidden h-12 w-auto max-w-[calc(100vw-3rem)] -translate-x-1/2 grid-flow-col auto-cols-max items-center gap-1 xl:gap-1.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-[#f3dda0] lg:grid xl:text-[11px] xl:tracking-[0.09em]`}
      >
        {isAwayFromHome ? (
          <Link href="/" onClick={closeDesktopMenu} className={NAV_ITEM_CLASS}>
            {t("nav.home")}
          </Link>
        ) : null}
        {NAV_SECTIONS.map((item) => (
          <button
            type="button"
            key={item.slug}
            onClick={() => toggleDesktopMenu(item.slug)}
            aria-expanded={openMenu === item.slug}
            aria-haspopup="true"
            aria-controls="desktop-mega-menu"
            className={`${openMenu === item.slug ? "bg-[#56725f] text-[#f3dda0]" : ""} ${NAV_ITEM_CLASS}`}
          >
            {item.label.toUpperCase()}
          </button>
        ))}
        <span className="ml-0.5 flex items-center border-l border-[#f3dda0]/20 pl-1">
          <button
            type="button"
            onClick={(event) => openSearch(event.currentTarget)}
            aria-label="Search this site"
            aria-expanded={searchOpen}
            aria-controls="site-search-panel"
            className={`${searchOpen ? "bg-[#56725f]" : ""} flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#f3dda0] transition-colors duration-200 hover:bg-[#56725f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dda0]`}
          >
            <SearchIcon />
          </button>
        </span>
      </nav>

      {searchOpen && (
        <section
          id="site-search-panel"
          role="search"
          aria-labelledby="site-search-title"
          className={`${isScrolled ? "top-[80px]" : "top-[98px]"} absolute left-1/2 z-30 hidden w-[min(820px,calc(100vw-34rem))] -translate-x-1/2 overflow-hidden rounded-b-[1.6rem] rounded-t-none border border-t-0 border-white/10 bg-[#265136] text-white shadow-[0_24px_60px_rgba(0,0,0,0.26)] lg:block 2xl:w-[900px]`}
        >
          <div className={`${isScrolled ? "pt-4" : "pt-8"} px-5 pb-5`}>
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <label htmlFor="site-search-input" className="sr-only">
                Search pages, golf holes, and experiences
              </label>
              <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-[#f3dda0]/25 bg-white/[0.055] px-4 transition-colors focus-within:border-[#f3dda0]/65 focus-within:bg-white/[0.08]">
                <SearchIcon className="h-[18px] w-[18px] shrink-0 text-[#f3dda0]" />
                <input
                  ref={searchInputRef}
                  id="site-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search pages, golf holes, experiences..."
                  autoComplete="off"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40 xl:text-base"
                />
              </div>
            </div>

            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3dda0]/60">
              {normalizedSearchQuery ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}` : ""}
            </p>

            {/* Cap na kasya ang 6 browse cards nang walang scrollbar (3 hilera
                ~340px), pero nag-scroll pa rin kapag mahaba ang typed results
                para hindi umabot sa ibaba ng screen ang panel. */}
            <div className="mt-2 grid max-h-[min(66vh,400px)] grid-cols-2 gap-2 overflow-y-auto pr-1" aria-live="polite">
              {searchResults.length ? searchResults.map((item) => (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  onClick={() => setSearchOpen(false)}
                  className="group flex min-h-16 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-[#f3dda0]/30 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dda0]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[10px] font-bold uppercase tracking-[0.16em] text-[#f3dda0]/85">
                      {item.category}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-white/85 transition-colors group-hover:text-white xl:text-base">
                      {item.label}
                    </span>
                  </span>
                  <span className="scale-125 text-[#f3dda0]">
                    <ArrowRightIcon />
                  </span>
                </Link>
              )) : (
                <p className="col-span-2 rounded-2xl border border-dashed border-white/12 px-5 py-8 text-center text-sm text-white/55">
                  No pages found. Try a shorter search.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {activeSection && (
        <div
          id="desktop-mega-menu"
          /* Magkaibang `top` kada estado dahil magkaiba ang inaangklahan.

             HERO — sa nav mismo nakadugtong. Lumulutang doon ang pill, at
             ang panel ay nakapasok ng 18px sa ilalim nito (z-50, kaparehong
             #265136) para walang tahi sa dugtungan. Ang ibaba ng nav ay
             116px (`top-[68px]` plus `h-12`), kaya 98px ang `top` ng panel
             para may 18px na overlap at walang siwang sa dugtungan.

             NAKA-SCROLL — sa bar nakadugtong, hindi sa nav. Nasa loob na ng
             80px na bar ang nav, kaya ang ibaba ng bar ang gilid na kita ng
             bisita. `top-[80px]`: dikit sa bar, walang siwang at walang
             nakatakip dito. Mas maluwag nang 18px ang gap sa itaas ng mga
             heading kaysa sa hero — hindi pwedeng bawasan pa nang hindi
             tinatakpan ng panel ang ilalim ng bar.

             Kapag ginalaw ang `top` ng alinmang nav o ang taas ng bar,
             sundan ito.

             Ang `pt-9` ng mga haligi ang nagbibigay ngayon ng 18px na gap;
             sa `pt-6` ay 6px lang ito at nakadikit ang heading sa nav. Pareho
             ang naidadagdag nito sa dalawang estado, kaya hindi nasisira ang
             pagkakapantay sa itaas.

             `calc(100vw-34rem)` AT HINDI `-3rem`. Apat ang may ganitong
             lapad — ang haligi ng nav, ang bukas na hero nav, ang bukas na
             compact nav at ang panel na ito — at iisa dapat sila, kung hindi
             ay hindi magkatapat ang gilid ng nav at ng panel.

             Ang 33rem (528px) ang puwang na iniiwan para sa marka at sa
             pindutan sa magkabilang gilid. Ganito ito nakuha: naka-sentro
             ang nav, kaya `navW/2` ang layo ng gilid nito mula sa gitna, at
             kailangang hindi nito abutin ang pindutan sa kanan —

                 navW <= bodyW - 2*(32px padding) - 2*ctaW

             Sa 227px na pindutan ay 518px ang binabawas. 34rem (544px) ang
             ginagamit at hindi 33: kasama ng `100vw` ang gutter ng
             scrollbar — 1280 iyon sa 1265px na tunay na espasyo — kaya
             15px ang kulang ng reserba sa 33rem at 2px ang naipapatong ng
             bukas na nav sa pindutan sa 1280px. Sa `-3rem` ay 820px pa
             rin ito sa 1024px at tinatakpan ng bukas na nav ang marka; sa
             `-26rem` ay umaabot pa rin sa pindutan sa 1280px.

             Nananatiling 820px mula 1376px pataas — doon lang naman ito
             nagiging mas makitid kaysa sa cap. */
          className={`${isScrolled ? "top-[80px]" : "top-[98px]"} ${hidesHighlights ? "rounded-b-[2rem]" : "rounded-b-[1.6rem]"} absolute left-1/2 z-30 hidden w-[min(820px,calc(100vw-34rem))] -translate-x-1/2 overflow-hidden rounded-t-none border border-t-0 border-white/10 bg-[#265136] text-white shadow-[0_24px_60px_rgba(0,0,0,0.26)] lg:block 2xl:w-[900px]`}
        >
          {/* Walang fixed na taas: sumusukat ang panel sa laman ng section.
              Dati ay 360px ang lahat, kaya may 140px na walang laman sa ilalim
              ng mga maiksing section at halatang-halata iyon. Ang sahig ay
              itinatakda ng kaliwang haligi (larawan at button, mga 260px).

              Ang lapad ay nananatiling fixed: dalawang hanay ang karamihan,
              at tatlo ang Golf — bilang sa gitna, hindi-butas sa dulo. Pareho
              ang preview column sa lahat ng tab, kaya hindi nagbabago ang
              laki ng card kapag nagpalit ng section. */}
          <div
            className={`${sectionExtras ? "grid-cols-[240px_minmax(0,1fr)_190px] 2xl:grid-cols-[280px_minmax(0,1fr)_210px]" : hidesHighlights ? "grid-cols-[minmax(0,3fr)_minmax(240px,2fr)]" : "grid-cols-[240px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)]"} grid`}
          >
            {/* UMUUNAT ANG LARAWAN, HINDI NAKATAKDA ANG HUGIS. `aspect-[1.35]`
                ito dati — 175×129 anuman ang taas ng panel — kaya may patay
                na puwang sa ilalim ng haligi.

                Sa `flex-1` ay sinasagop ng larawan ang natitirang taas
                pagkatapos ng heading at ng button sa ilalim, kaya walang
                siwang anuman ang haba ng gitnang haligi. Ang `min-h` ang
                nagpapanatili sa 129px bilang sahig para hindi gumuho ang
                card sa maiikling section.

                Iisa ang haliging ito sa anim na section, kaya pareho ang
                anyo ng lahat — walang kaso kada section dito. */}
            <div className="flex flex-col border-r border-white/10 px-6 pb-6">
              <div className={megaColumnTop}>
              <p className={MEGA_HEADING}>{activeSection.eyebrow}</p>
              </div>
              <Link
                href={previewHref}
                target={previewHref.startsWith("http") ? "_blank" : undefined}
                rel={previewHref.startsWith("http") ? "noreferrer" : undefined}
                onClick={closeDesktopMenu}
                /* `min-h-[229px]`: 129px na sahig ng larawan, 12px + 40px na
                   talata, at 12px + 36px na button — ang taas ng haligi
                   kapag walang naka-hover. Ito ang pumipigil sa haliging ito na
                   umikli kapag inalis sa layout ang button — dito
                   nakasalalay ang taas ng panel sa Clubhouse, Events at
                   Experiences, kaya sila ang tumatalon kung kulang ito.

                   192px ito noong "Explore {section}" pa ang nakasulat:
                   51px ang button sa Experiences at Accommodations dahil
                   pumuputol sa dalawang linya ang mahahabang pangalan.
                   Isang salita na lang ito, kaya 36px na ang lahat.
                   Kapag ibinalik ang pangalan ng section, itaas ulit. */
                className={`${hidesHighlights ? "mega-item min-h-[360px]" : "min-h-[229px]"} group flex flex-1 flex-col`}
              >
                <div className={`${hidesHighlights ? "min-h-[245px] rounded-xl" : "min-h-[129px] rounded-lg"} relative flex-1 overflow-hidden bg-[#265136]`}>
                  <Image key={previewImage} src={previewImage ?? activeSection.image} alt="" fill sizes={hidesHighlights ? "600px" : "220px"} className="mega-preview-image object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a12]/78 via-[#071a12]/25 to-transparent" aria-hidden="true" />
                  {accommodationSlide ? (
                    <div className="absolute inset-x-3 bottom-3">
                      <div className="flex items-end justify-between gap-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.04em] text-white">
                          {accommodationSlide.name}
                        </p>
                        <span className="flex gap-1" aria-hidden="true">
                          {VILLA_DEL_REY_STAYS.map((stay, index) => (
                            <span
                              key={stay.name}
                              className={`${index === accommodationSlideIndex ? "w-4 bg-[#f3dda0]" : "w-1.5 bg-white/45"} h-1.5 rounded-full transition-all duration-300`}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  ) : null}
                  {/* Pangalan lang ng naka-hover ang nasa loob ng larawan.
                      Wala ito kapag walang naka-hover — pangalan ng section
                      iyon dati, na nakasulat na sa naka-highlight na tab.

                      11px AT HINDI 13. 151px lang ang espasyo dito. Sinukat
                      ko ang lahat ng 47 na label: sa 13px ay apat ang
                      pumuputol sa dalawang linya — "Playground & Outdoor
                      Basketball Court" (310px), "Private Celebrations" (171),
                      "Showers & Wellness" (155) at "Golf Tournaments" (153).
                      Sa 11px ay isa na lang.

                      Walang napapala ang 10px o 9px: iisa pa rin ang hindi
                      kasya, at lumiliit lang ang teksto nang walang dahilan.

                      Dalawa ang clamp at hindi tatlo: sa 11px ay dalawang
                      linya na lang ang pinakamahaba (262px sa 151px), hindi
                      na tatlo gaya noong 13px. */}
                  {previewLabel ? (
                    <p className="absolute bottom-3 left-3 right-3 line-clamp-2 text-[11px] font-semibold uppercase leading-tight tracking-[0.02em]">{previewLabel}</p>
                  ) : null}
                </div>
                {/* NASA IBABA ANG BUTTON, AT NAWAWALA KAPAG MAY NAKA-HOVER.
                    Naging overlay ito sandali — blur at "Explore" sa gitna
                    pag-hover — pero nakatago iyon hangga't hindi mo pa
                    nararating ng cursor ang card, kaya walang nagsasabi kung
                    saan ito patungo hanggang sa mahanap mo.

                    Ang `previewLabel` ang bandila: may laman ito kapag may
                    naka-hover na butas o espasyo, at wala kapag wala. Hindi
                    kailangan ng hiwalay na state — ang pangalan sa loob ng
                    larawan at ang button ay eksaktong magkasalungat, at sa
                    isang pinagmulan ay hindi sila pwedeng magkasabay.

                    `hidden`, HINDI `invisible`. Nakareserba pa rin ang 52px
                    nito noong `invisible` ito, kaya may bakanteng berde sa
                    ilalim ng larawan habang naka-hover. Sa `hidden` ay
                    lumalabas ito sa layout at ang larawan — na `flex-1` —
                    ang sumasagop ng puwang: 129px pataas ng 181px, 141px
                    pataas ng 193px sa Golf. Ang `min-h` ng Link sa itaas ang
                    pumipigil sa haligi na umikli kasabay nito.

                    Hiwalay ang klase ng `display` sa ternary at hindi
                    nakasama sa base: magkabangga ang `hidden` at
                    `inline-flex`, at ang pagkakasunod sa stylesheet ang
                    nananalo — hindi ang pagkakasunod dito sa attribute.

                    `shrink-0`: ang larawan sa itaas ang `flex-1`, kaya ito
                    ang dapat kumuha ng natitirang taas — hindi ang button. */}
                {/* MAIKLING PALIWANAG, KASABAY NG PINDUTAN. Ang `description`
                    ng section mismo ang laman — nakasulat na ito sa
                    `site-content.ts` at ito rin ang ginagamit ng sariling
                    pahina ng section, kaya walang pangalawang kopyang
                    pwedeng maghiwalay.

                    Sabay itong nawawala ng pindutan kapag may naka-hover:
                    tungkol sa section ang dalawa, at tungkol na sa isang
                    butas o espasyo ang haligi kapag may pinipili. Ang
                    larawan ang sumasagop ng espasyo ng dalawa.

                    Tinatanggal, hindi itinatago. Ang `line-clamp-2` ay
                    nagtatakda ng sariling `display` (`-webkit-box`), kaya
                    magkabangga ito at ang `hidden` at ang pagkakasunod sa
                    stylesheet ang mananalo — hindi ang nakasulat dito. */}
                {previewLabel ? null : (
                  <p className={`${hidesHighlights ? "line-clamp-3" : "line-clamp-2"} mt-3 text-[11px] leading-5 text-white/65`}>
                    {hidesHighlights ? accommodationSlide?.description ?? ACCOMMODATIONS[0]?.overview : activeSection.description}
                  </p>
                )}
                {/* GINTONG PILL, HINDI OUTLINE. Isang manipis na puting
                    balangkas ito dati na napupuno lang ng ginto pag-hover,
                    kaya mahina ang dating nito bilang pangunahing pindutan.
                    Kaparehong ginto na ito ng "Plan Your Visit" sa header
                    at ng pill sa mga image card sa gitnang haligi — iisang
                    anyo na ang lahat ng CTA sa mega menu. */}
                <span
                  className={`${previewLabel ? "hidden" : "inline-flex"} ${hidesHighlights ? "max-w-[280px]" : "w-full"} mt-3 shrink-0 items-center justify-center gap-2 rounded-full bg-[#e7d18d] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition duration-200 group-hover:bg-[#f3dfa0] xl:text-[10px]`}
                >
                  Explore
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            {hidesHighlights ? (
              <div className={`flex flex-col px-6 pb-6 ${megaColumnTop}`}>
                <p className={MEGA_HEADING}>Plan your stay</p>
                <div className="grid flex-1 content-start">
                  <Link
                    href="/faq"
                    onClick={closeDesktopMenu}
                    className="mega-item group/help border-b border-white/10 py-5 text-white/75 transition-colors hover:text-[#f1d98f]"
                    style={{ animationDelay: "90ms" }}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.06em]">FAQ</span>
                      <span className="text-[#e7d18d] transition-transform group-hover/help:translate-x-1" aria-hidden="true">→</span>
                    </span>
                    <span className="mt-2 block text-[11px] leading-5 text-white/50">
                      Booking, rates, and what to expect.
                    </span>
                  </Link>
                </div>
              </div>
            ) : null}

            {!hidesHighlights ? <div className={`flex flex-col px-6 pb-6 ${megaColumnTop}`}>
              <p className={MEGA_HEADING}>
                {t("mega.highlights")}
              </p>
              {/* Pantay sa preview column ang available area, pero natural
                  at fixed ang pagitan ng mga link sa loob. */}
              <div className="flex flex-1 flex-col" onMouseLeave={() => setHoveredPreviewIndex(null)}>
                {/* Ang bawat anyo ay may sariling grid at sariling sukat ng
                    larawan, pero pareho ang ginagawa ng hover: pinapalitan
                    ang preview sa kaliwang hanay. Tingnan ang MEGA_STYLES
                    sa itaas para sa dahilan ng paghahati. */}
                {megaStyle === "cards" && (
                  /* Isang aspect na lang: sumusukat na ang panel sa laman,
                     kaya hindi na kailangang unatin ang card para punan ang
                     ilalim. Ang lapad ng card ang nagtatakda ng taas. */
                  <div className={`${activeSection.links.length > 2 ? "grid-cols-3" : activeSection.links.length === 2 ? "grid-cols-2" : "grid-cols-1"} grid gap-3`}>
                    {activeSection.links.map((link, index) => {
                      const image = linkImageAt(index);
                      return (
                        <Link
                          key={`${link.href}-${link.label}`}
                          {...highlightLinkProps(link, index)}
                          className="mega-item group/card block"
                          style={{ animationDelay: `${index * 45}ms` }}
                        >
                          <div
                            className="relative aspect-[1.25] overflow-hidden rounded-lg bg-[#265136]"
                          >
                            {image && (
                              <Image
                                src={image}
                                alt=""
                                fill
                                sizes="280px"
                                className="object-cover opacity-90 transition duration-500 group-hover/card:scale-[1.04] group-hover/card:opacity-100"
                                style={activeSection.slug === "packages" ? { objectPosition: "right center" } : undefined}
                              />
                            )}
                            <span className="absolute inset-0 bg-gradient-to-t from-[#071a12]/80 via-[#071a12]/10 to-transparent" aria-hidden="true" />
                            {/* BAGO ANG PANGALAN SA DOM, HINDI PAGKATAPOS.
                                Ang `backdrop-filter` ay tumatama sa kung ano
                                mang nasa likod ng elemento sa pagpinta —
                                kaya kung nauuna ang pangalan, lumalabo rin
                                ito kasama ng larawan. Dito ay ang larawan at
                                ang gradient lang ang lumalabo, at malinaw
                                pa rin ang pangalan sa ibabaw nito.

                                Pinalitan nito ang maliit na "→" na lumalabas
                                dati sa kanang ibaba pag-hover: dalawang
                                magkaibang senyas iyon para sa iisang bagay. */}
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 flex items-center justify-center bg-[#071a12]/25 opacity-0 backdrop-blur-[3px] transition-opacity duration-300 group-hover/card:opacity-100"
                            >
                              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7d18d] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#14271d] xl:text-[10px]">
                                Explore
                                <ArrowRightIcon />
                              </span>
                            </span>
                            <span className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2">
                              <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.03em]">{link.label}</span>
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {megaStyle === "names" && (
                  /* Pangalan lang ang laman nito — nasa preview sa kaliwa ang
                     larawan pag-hover, kaya walang larawan dito.

                     Isang haligi hangga't kasya. Sa labingwalong butas ay
                     pahaligi ang daloy: 1–6, 7–12, 13–18, para magkasunod ang
                     pagbasa sa halip na 1, 2, 3 / 4, 5, 6. Anim na hilera at
                     hindi siyam: mababa ang panel sa ganito, at ang siyam ang
                     nagtutulak dati ng 90px na walang laman sa tabi nito. */
                  <div className={`${namesGridClass(activeSection.links.length, activeSection.slug)} grid gap-x-6 gap-y-1.5`}>
                    {activeSection.links.map((link, index) => (
                      <Link
                        key={`${link.href}-${link.label}`}
                        {...highlightLinkProps(link, index)}
                        /* Kulay lang ang hover, walang punong pill. Sa pill ay
                           may malaking hugis na lumilitaw sa gitna ng listahan
                           at hindi pantay ang lapad nito kada item — lalo sa
                           dalawang-linyang "Playground & Outdoor Basketball
                           Court". Ang `min-h` at `items-center` ang nagpapantay
                           ng ritmo ng hilera kahit may pumutol na linya. */
                        className={`mega-item ${hoveredPreviewIndex === index ? "text-[#f1d98f]" : "text-white/72"} flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]`}
                        style={{ animationDelay: `${index * 45}ms` }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}

                {megaStyle === "rules" && (
                  /* Natural ang pagitan ng mga hilera. Hindi sila ini-stretch
                     hanggang ibaba ng panel kapag tatlo lang ang link. */
                  <div className="grid grid-cols-1">
                    {/* Walang sariling larawan ang mga link dito, at iisa ang
                        patutunguhan nilang pahina. Kaysa ilagay ang parehong
                        larawan sa tatlong card, guhit ang naghahati sa kanila. */}
                    {activeSection.links.map((link, index) => (
                      <Link
                        key={`${link.href}-${link.label}`}
                        {...highlightLinkProps(link, index)}
                        /* Walang `first:border-t`: ang hairline sa ilalim ng
                           heading na ang nagsasara ng itaas ng listahan.
                           Kapag mayroon, dalawang guhit na 16px ang pagitan. */
                        className="mega-item group/rule flex items-center justify-between gap-3 border-b border-white/10 py-4 text-white/72 transition-colors duration-200 hover:text-[#f1d98f]"
                        style={{ animationDelay: `${index * 45}ms` }}
                      >
                        <span className="text-[12px] font-semibold uppercase tracking-[0.05em]">{link.label}</span>
                        <span className="text-[#e7d18d] opacity-0 transition-opacity duration-300 group-hover/rule:opacity-100" aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div> : null}

            {/* Pangatlong hanay: ang hindi kabilang sa listahan ng section —
                Tournaments sa Golf, ang official site sa Experiences. Pareho
                ng kilos ng gitnang haligi pag-hover, pero hiwalay na state
                (`hoveredExtra`) para hindi madagdagan ang bilang doon.

                May `border-l` gaya ng `border-r` ng unang haligi: tatlong
                hanay ito, kaya dalawa ang dapat na hati. Inalis ito nang
                minsan sa akala na mas malinis kapag hairline lang sa ilalim
                ng heading ang naghahati — pero kulang ang hitsura kapag
                may guhit ang isang gilid at wala sa kabila. */}
            {sectionExtras && (
              <div className={`border-l border-white/10 px-6 pb-6 ${megaColumnTop}`} onMouseLeave={() => setHoveredExtra(null)}>
                {/* Maaaring maramihan ang pangkat dito. Ang una ay walang
                    `mt`; ang susunod ay may puwang sa itaas para hindi
                    magdikit ang hairline ng heading nito sa listahan sa
                    itaas. */}
                {sectionExtras.map((group, groupIndex) => (
                  <div key={group.heading} className={groupIndex > 0 ? "mt-8" : undefined}>
                    <p className={MEGA_HEADING}>{group.heading}</p>
                    <div className="grid grid-cols-1">
                      {group.items.map((extra) => {
                        const isExternal = extra.href.startsWith("http");
                        return (
                          <Link
                            key={extra.href}
                            href={extra.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noreferrer" : undefined}
                            onClick={closeDesktopMenu}
                            onMouseEnter={() => setHoveredExtra(extra)}
                            onFocus={() => setHoveredExtra(extra)}
                            className={`${hoveredExtra?.href === extra.href ? "text-[#f1d98f]" : "text-white/72"} inline-flex min-h-[34px] items-center gap-1.5 text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]`}
                          >
                            {extra.label}
                            {isExternal && <span aria-hidden="true">↗</span>}
                          </Link>
                        );
                      })}
                    </div>

                    {activeSection.slug === "golf" && group.heading === "Competition" ? (
                      <Link
                        href={UPCOMING_TOURNAMENT.href}
                        onClick={closeDesktopMenu}
                        onMouseEnter={() => setHoveredExtra(UPCOMING_TOURNAMENT)}
                        onFocus={() => setHoveredExtra(UPCOMING_TOURNAMENT)}
                        className="mega-item group/event mt-4 block overflow-hidden rounded-xl border border-white/12 bg-white/[0.045] transition duration-300 hover:-translate-y-0.5 hover:border-[#f3dda0]/35 hover:bg-white/[0.075] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dda0]"
                        style={{ animationDelay: "90ms" }}
                        aria-label={`${UPCOMING_TOURNAMENT.label}, ${UPCOMING_TOURNAMENT.date}, ${UPCOMING_TOURNAMENT.status}`}
                      >
                        <span className="relative block aspect-[1.45] overflow-hidden bg-[#173b28]">
                          <Image
                            src={UPCOMING_TOURNAMENT.image}
                            alt=""
                            fill
                            sizes="180px"
                            className="object-cover transition-transform duration-500 group-hover/event:scale-[1.04]"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-[#071a12]/70 via-transparent to-transparent" aria-hidden="true" />
                          <span className="absolute bottom-2 left-2 rounded-full bg-[#e7d18d] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[#14271d]">
                            {UPCOMING_TOURNAMENT.status}
                          </span>
                        </span>
                        <span className="block p-3">
                          <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-[#f3dda0]">
                            {UPCOMING_TOURNAMENT.date}
                          </span>
                          <span className="mt-1.5 block text-[11px] font-semibold leading-[1.3] text-white">
                            {UPCOMING_TOURNAMENT.label}
                          </span>
                          <span className="mt-2 block text-[9px] leading-4 text-white/55">
                            {UPCOMING_TOURNAMENT.time}<br />{UPCOMING_TOURNAMENT.format}
                          </span>
                        </span>
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
