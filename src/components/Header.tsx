"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ACCOMMODATIONS, CLUB_PHONE, SITE_SECTIONS } from "@/lib/site-content";

/* Galing na sa site-content: apat na kopya dati ng parehong placeholder. */
const { label: PHONE_LABEL, href: PHONE_HREF } = CLUB_PHONE;
const GOLF_SECTION_STORAGE_KEY = "camsur-golf-section";

function scrollToGolfSection(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return false;

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  target.scrollIntoView({ behavior: "auto", block: "start" });
  root.style.scrollBehavior = previousScrollBehavior;
  window.history.replaceState(window.history.state, "", "/golf");
  return true;
}

/* Nananatiling bahagi ng site ang Dining at gumagana pa rin ang diretsong
   /dining link, pero hindi na ito ipinapakita sa pangunahing navigation. */
const GOLF_NAV_LINKS = [
  {
    label: "Course Overview",
    href: "/golf#the-course",
    image: "/golf/course-overview.png",
  },
  {
    label: "Interactive Course Map",
    href: "/golf",
    targetId: "course-map",
    image: "/golf/course-overview-masterplan.png",
  },
  {
    label: "Hole-by-Hole Guide",
    href: "/golf",
    targetId: "concepts",
    image: "/golf/aerial-holes/contact-sheet.jpg",
  },
  {
    label: "Tournament Golf",
    href: "/events",
    image: "/events/golf-tournaments-full-logo-2026-clean-4k-v3.png",
  },
] as const;

const NAV_SECTIONS = SITE_SECTIONS.filter((section) => section.slug !== "dining").map((section) =>
  section.slug === "golf" ? { ...section, links: GOLF_NAV_LINKS } : section,
);

const SEARCH_ITEMS = NAV_SECTIONS.flatMap((section) => [
  { label: section.label, detail: "Main section", href: `/${section.slug}` },
  ...section.links.map((link) => ({
    label: link.label,
    detail: section.label,
    href: link.href,
  })),
]);

/**
 * Anyo ng listahan ng highlight sa mega menu, isa sa bawat section.
 *
 * Hindi kayang isang anyo lang ang lahat, at dito nakikita kung bakit:
 * dalawa ang link ng Packages at Dining, tatlo ang Accommodations, at sampu
 * ang Experiences. Sa 290px na taas ng panel ay
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
  golf: "rules",
  /* Anim na espasyo na may sariling larawan. Hindi `cards`: tatlong haligi
     ang grid doon, kaya dalawang hilera na may butas sa dulo ang anim.
     Sa `names` ay lumalabas ang larawan ng espasyo sa preview pag-hover. */
  clubhouse: "names",
  packages: "cards",
  accommodations: "cards",
  experiences: "names",
  dining: "cards",
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
  "mb-4 border-b border-[#f2d98d]/25 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f2d98d]";

/**
 * Curated copy for the image preview and link-list heading.
 *
 * The section name already appears in the navigation and eyebrow, so the
 * preview should sell the experience instead of repeating that same word.
 */
const MEGA_PROMOS: Record<string, { heading?: string; preview: string; action: string; listHeading: string }> = {
  golf: {
    heading: "Play Near Mt. Isarog",
    preview: "Golf course",
    action: "View Details",
    listHeading: "Explore your round",
  },
  clubhouse: {
    heading: "Embrace Nature’s Elegance.",
    preview: "Clubhouse",
    action: "View Details",
    listHeading: "Spaces to enjoy",
  },
  packages: {
    heading: "Plan your getaway",
    preview: "Packages",
    action: "Explore options",
    listHeading: "Ways to play",
  },
  accommodations: {
    preview: "Stay close to every moment",
    action: "Choose your stay",
    listHeading: "Places to stay",
  },
  experiences: {
    preview: "More adventures await",
    action: "Start exploring",
    listHeading: "Ways to explore",
  },
  dining: {
    preview: "Flavours worth gathering for",
    action: "Take a seat",
    listHeading: "Places to dine",
  },
  events: {
    preview: "Celebrate in remarkable style",
    action: "Plan your occasion",
    listHeading: "Occasions to remember",
  },
};

function cardLabel(label: string) {
  return label.replace(/^the\s+/i, "");
}

/**
 * Hugis ng listahan sa `names`, batay sa bilang ng link.
 *
 * Anim na hilera ang hangganan. Ang sampung pangalan sa isang haligi ay
 * 352px ang panel at nag-iiwan ng 96px na walang laman sa tabi; sa limang
 * hilera ay 256px ito — kasukat na ng kaliwang haligi, na siyang sahig.
 * Ang labingwalong butas sa isang haligi ay lalampas pa sa 500px.
 */
function namesGridClass(count: number) {
  if (count > 12) return "grid-flow-col grid-rows-6";
  if (count > 6) return "grid-flow-col grid-rows-5";
  return "grid-cols-1";
}

/**
 * Pangatlong hanay ng panel: ang mga bagay na hindi kabilang sa listahan
 * ng section.
 *
 * Hindi ito nakalagay sa `links` dahil hindi ito bahagi ng laman — hindi
 * pasilidad ang official site. Sariling
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="10.75" cy="10.75" r="6.75" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.25 4.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** Slug ng section na binuksan sa loob ng mobile drawer; null = ugat na listahan. */
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [hoveredPreviewIndex, setHoveredPreviewIndex] = useState<number | null>(null);
  /** Naka-hover na item sa pangatlong hanay; nauuna ito sa preview. */
  const [hoveredExtra, setHoveredExtra] = useState<{ label: string; href: string; image?: string } | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const compactHeader = useRef(false);
  const pendingGolfSection = useRef<string | null>(null);
  const activeSection = NAV_SECTIONS.find((section) => section.slug === openMenu);
  const mobileSubsection = NAV_SECTIONS.find((section) => section.slug === mobileSection);
  const activePromo = activeSection ? MEGA_PROMOS[activeSection.slug] : undefined;
  const mobilePromo = mobileSubsection ? MEGA_PROMOS[mobileSubsection.slug] : undefined;
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const searchResults = normalizedSearchQuery
    ? SEARCH_ITEMS.filter((item) =>
        `${item.label} ${item.detail}`.toLowerCase().includes(normalizedSearchQuery),
      ).slice(0, 6)
    : SEARCH_ITEMS.slice(0, 6);
  const megaStyle = activeSection ? MEGA_STYLES[activeSection.slug] ?? "rules" : "rules";
  /* Ito ang nagpapasya kung tatlo o dalawa ang haligi ng panel. */
  const sectionExtras = activeSection ? SECTION_EXTRAS[activeSection.slug] : undefined;

  /* Isinasara lang ang drawer; ang pagbalik sa ugat ay hinahawakan ng effect
     sa ibaba pagkatapos ng fade, para hindi kumislap ang unang antas. */
  const closeMobileNav = () => setMobileMenuOpen(false);

  const handleGolfSectionClick = (event: ReactMouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    if (pathname === "/golf") {
      event.preventDefault();
      scrollToGolfSection(targetId);
    } else {
      pendingGolfSection.current = targetId;
      window.sessionStorage.setItem(GOLF_SECTION_STORAGE_KEY, targetId);
    }
  };

  useLayoutEffect(() => {
    if (pathname !== "/golf") return;

    const targetId = pendingGolfSection.current ?? window.sessionStorage.getItem(GOLF_SECTION_STORAGE_KEY);
    if (!targetId) return;

    const finishScroll = () => {
      if (!scrollToGolfSection(targetId)) return false;
      pendingGolfSection.current = null;
      window.sessionStorage.removeItem(GOLF_SECTION_STORAGE_KEY);
      return true;
    };

    if (finishScroll()) return;
    const frame = window.requestAnimationFrame(finishScroll);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);
  /**
   * Dalawang paraan ng pagkuha ng larawan sa preview.
   *
   * Ang Accommodations ay may sariling listahan ng pahina kung saan
   * hinuhugot ang larawan. Ang iba ay pwedeng magdala ng sariling `image`
   * sa bawat link — iyon ang paraang gamit ng Golf at Experiences.
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
    (activeSection?.slug === "accommodations" ||
      (activeSection?.links.some((link) => "image" in link) ?? false));

  /* Nauuna ang pangatlong hanay: kapag doon ang daliri, iyon ang dapat
     nasa preview kahit may naiwang naka-hover na butas sa gitna. */
  const previewImage = hoveredExtra?.image ?? hoveredLinkImage ?? hoveredPreview?.image ?? activeSection?.image;
  const rawPreviewLabel = hoveredExtra
    ? hoveredExtra.label
    : hoveredLinkImage
      ? hoveredLink?.label
      : hoveredPreview?.title ?? activePromo?.preview ?? activeSection?.label;
  const previewLabel = rawPreviewLabel ? cardLabel(rawPreviewLabel) : rawPreviewLabel;
  /* Ang href ng link mismo ang sinusundan, hindi binubuo mula sa slug ng
     section at ng pahina. Sa `/${slug}/${hoveredPreview.slug}` ay
     `/golf/no-4` ang nabubuo — 404 iyon mula nang maging
     `/golf/courses/no-4` ang ruta. Isang pinagmulan na lang ngayon. */
  const previewHref = activeSection?.slug === "clubhouse"
    ? "/clubhouse#facilities"
    : activeSection?.slug === "golf"
      ? "/golf"
    : hoveredExtra
      ? hoveredExtra.href
      : hoveredLink
        ? hoveredLink.href
        : activeSection
          ? `/${activeSection.slug}`
          : "/";

  /**
   * Larawan ng iisang link, para sa mga card at tile sa gitnang hanay.
   *
   * Pareho ang panuntunan sa preview sa itaas: sariling `image` muna, saka
   * ang hinugot sa ACCOMMODATIONS.
   *
   * Nagbabalik ng `null` kapag talagang wala — hindi `activeSection.image`.
   * Sa isang grid ay magkakapareho ang lahat ng card kung gayon, at iyon
   * ang dahilan kung bakit `rules` ang Events at hindi `cards`.
   */
  const linkImageAt = (index: number) => {
    const link = activeSection?.links[index];
    if (!link) return null;
    if ("image" in link && typeof link.image === "string") return link.image;
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
  const highlightLinkProps = (link: { href: string; label: string; targetId?: string }, index: number) => ({
    href: link.href,
    target: link.href.startsWith("http") ? "_blank" : undefined,
    rel: link.href.startsWith("http") ? "noreferrer" : undefined,
    onClick: (event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (link.targetId) handleGolfSectionClick(event, link.targetId);
      closeDesktopMenu();
    },
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

  const openDesktopMenu = (slug: string) => {
    cancelScheduledClose();
    clearPreview();
    setSearchOpen(false);
    setOpenMenu(slug);
  };

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
      const storySection = document.getElementById("story");
      /* Sa homepage, nananatili ang malaking hero navigation habang nasa
         larawan pa ang bisita. Nagiging compact ito kapag ang puting story
         section ay umabot sa ilalim ng 126px expanded header, kaya hindi
         sumasapaw ang malaking logo sa section bago lumiit. Ang 8px na
         pagitan ng enter/exit thresholds ang pumipigil sa pagkutitap kapag
         eksaktong nasa hangganan ang trackpad. Sa ibang route na walang
         #story, ginagamit pa rin ang maikling scroll threshold. */
      const hasScrolled = storySection
        ? storySection.getBoundingClientRect().top <= (compactHeader.current ? 134 : 126)
        : compactHeader.current
          ? currentScrollY > 4
          : currentScrollY > 28;

      if (compactHeader.current !== hasScrolled) {
        compactHeader.current = hasScrolled;
        setIsScrolled(hasScrolled);
      }

      if (hasScrolled && currentScrollY > lastScrollY.current + 10) {
        setOpenMenu(null);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [pathname]);

  /* Ang Escape ay umaatras muna ng isang antas sa mobile drawer bago
     tuluyang magsara — iyon ang inaasahan sa drill-down na menu. */
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setSearchOpen(false);
      if (mobileSection) setMobileSection(null);
      else setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileSection]);

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
      onMouseEnter={cancelScheduledClose}
      onMouseLeave={scheduleDesktopMenuClose}
      onFocusCapture={cancelScheduledClose}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          scheduleDesktopMenuClose();
        }
      }}
      className="fixed inset-x-0 top-0 z-[100] isolate overflow-visible bg-transparent font-navigation"
    >
      <div
        data-header-background
        className={`${isScrolled ? "translate-y-0 shadow-[0_12px_35px_rgba(0,0,0,0.2)]" : "-translate-y-full shadow-none"} pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-[84px] border-b border-[#f2d98d]/15 bg-[#17382b] transition-[transform,box-shadow] duration-300 xl:block`}
        aria-hidden="true"
      />
      <div
        className={`${isScrolled ? "opacity-0" : "opacity-100"} pointer-events-none absolute inset-x-0 top-0 -z-20 h-48 bg-gradient-to-b from-[#07120d]/70 via-[#07120d]/30 to-transparent transition-opacity duration-300`}
        aria-hidden="true"
      />

      <div className={`${isScrolled ? "min-h-[84px] py-3" : "min-h-[126px] py-4"} pointer-events-none relative z-40 mx-auto grid max-w-[1440px] grid-cols-1 items-start px-6 transition-[min-height,padding] duration-300 xl:grid-cols-[150px_minmax(0,1fr)_280px] xl:gap-4 xl:px-7 2xl:grid-cols-[170px_minmax(0,1fr)_280px] 2xl:gap-5`}>
        <Link
          href="/"
          className={`${isScrolled ? "h-14 w-[150px]" : "h-[190px] w-[143px]"} pointer-events-auto relative hidden shrink-0 justify-self-start transition-[width,height] duration-300 xl:block`}
          aria-label="Camsur Uptown Golf Club — home"
        >
          <span className={`${isScrolled ? "invisible opacity-0" : "visible opacity-100"} absolute inset-0 transition-opacity duration-300`}>
            <Image
              src="/camsur-uptown-logo.png"
              alt="Camsur Uptown Golf Club"
              width={176}
              height={234}
              priority
              className="h-full w-full object-contain drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)]"
            />
          </span>
          <span className={`${isScrolled ? "visible opacity-100" : "invisible opacity-0"} absolute inset-0 flex items-center gap-2.5 transition-opacity duration-300`} aria-hidden="true">
            <Image
              src="/camsur-uptown-mark-transparent.png"
              alt=""
              width={911}
              height={1251}
              priority
              className="h-10 w-auto shrink-0 object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
            />
            <span className="min-w-0 leading-none">
              <span className="block whitespace-nowrap font-display text-[13px] font-semibold tracking-[0.01em] text-[#f2d98d]">CamSur Uptown</span>
              <span className="mt-1.5 block whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.24em] text-[#f2d98d]/75">Golf Club</span>
            </span>
          </span>
        </Link>

        <div className={`${isScrolled ? "mt-0" : "mt-[54px]"} relative hidden min-w-0 items-center justify-center transition-[margin] duration-300 xl:flex`}>
          <nav
            data-nav="desktop"
            aria-label="Primary navigation"
            className={`${isScrolled ? "border-transparent bg-transparent shadow-none" : openMenu ? "rounded-t-[1.5rem] rounded-b-none border-[#f2d98d]/15 border-b-white/10 bg-[#214936]/95 shadow-none" : "rounded-full border-[#f2d98d]/15 bg-[#214936]/95 shadow-[0_14px_36px_rgba(0,0,0,0.2)]"} pointer-events-auto flex min-h-12 w-[min(790px,100%)] items-center justify-evenly gap-0.5 border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-white backdrop-blur-md transition-[background-color,border-color,border-radius,box-shadow] duration-200 2xl:text-[12px]`}
          >
            {NAV_SECTIONS.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                onClick={closeDesktopMenu}
                onMouseEnter={() => openDesktopMenu(item.slug)}
                onFocus={() => openDesktopMenu(item.slug)}
                aria-expanded={openMenu === item.slug}
                aria-haspopup="true"
                aria-controls="desktop-mega-menu"
                className={`${openMenu === item.slug ? "bg-[#56725f] text-[#f2d98d]" : "text-white"} group pointer-events-auto relative z-10 flex cursor-pointer items-center whitespace-nowrap rounded-full px-3 py-2 transition-colors duration-200 hover:bg-[#56725f] hover:text-[#f2d98d] 2xl:px-3.5`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className={`${isScrolled ? "mt-0" : "mt-[54px]"} pointer-events-auto relative hidden items-center justify-self-end gap-2 transition-[margin] duration-300 xl:flex`}>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full border border-white/70 bg-white/92 px-5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#20362c] shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_rgba(0,0,0,0.24)] 2xl:px-6 2xl:text-[12px]"
          >
            <span>Connect With CamSur</span>
          </Link>
          <button
            type="button"
            aria-label={searchOpen ? "Close site search" : "Open site search"}
            aria-expanded={searchOpen}
            onClick={() => {
              setOpenMenu(null);
              setSearchOpen((open) => !open);
            }}
            className={`${searchOpen ? "bg-[#214936] text-[#f2d98d]" : "text-white"} flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-[#214936] hover:text-[#f2d98d]`}
          >
            <SearchIcon />
          </button>

          {searchOpen && (
            <div className="absolute right-0 top-[calc(100%+1rem)] w-[340px] overflow-hidden rounded-2xl border border-[#1f3f2e] bg-[#265136] p-2.5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
              <label htmlFor="site-search" className="sr-only">Search CamSur Uptown</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#1f3f2e] px-3">
                <SearchIcon />
                <input
                  id="site-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search CamSur Uptown"
                  autoFocus
                  className="min-h-10 w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/45"
                />
              </div>
              <div className="mt-2 max-h-[320px] overflow-y-auto">
                {searchResults.length > 0 ? searchResults.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-4 rounded-xl px-3 py-2 transition-colors hover:bg-[#1f3f2e]"
                  >
                    <span className="text-sm font-semibold">{item.label}</span>
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">{item.detail}</span>
                  </Link>
                )) : (
                  <p className="px-3 py-5 text-center text-sm text-white/60">No matching pages found.</p>
                )}
              </div>
            </div>
          )}
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
        <div className="pointer-events-auto flex w-auto items-center justify-self-center gap-8 rounded-full border border-[#265136] bg-[#1f3f2e]/95 px-4 py-2 shadow-[0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl xl:hidden">
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
              className="h-8 w-auto"
            />
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`${mobileMenuOpen ? "rounded-full bg-[#265136] px-2.5 py-2 text-white" : "text-white"} flex items-center gap-2.5 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-[#265136] hover:text-white`}
          >
            Menu
            <span className="relative flex h-4 w-6 shrink-0 items-center justify-center" aria-hidden="true">
              <span className={`${mobileMenuOpen ? "rotate-45" : "-translate-y-[5px]"} absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300`} />
              <span className={`${mobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"} absolute h-0.5 w-6 rounded-full bg-current transition duration-200`} />
              <span className={`${mobileMenuOpen ? "-rotate-45" : "translate-y-[5px]"} absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300`} />
            </span>
          </button>

          <a
            href={PHONE_HREF}
            aria-label={`Call ${PHONE_LABEL}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#265136] bg-[#265136] text-white transition hover:bg-[#265136]/80 hover:text-white"
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
        className={`${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"} fixed inset-0 z-20 bg-[#1f3f2e]/65 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden`}
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
        className={`${mobileMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"} fixed inset-x-4 top-[5.75rem] z-30 max-h-[calc(100svh-6.75rem)] overflow-y-auto rounded-[1.5rem] border border-[#1f3f2e] bg-[#265136]/98 p-2.5 text-white shadow-[0_30px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-out sm:left-auto sm:right-6 sm:w-[370px] xl:hidden`}
      >
        {mobileSubsection ? (
          <div key={mobileSubsection.slug} className="nav-panel-enter">
            <div className="flex items-center justify-between gap-3 px-3.5 pb-3 pt-2">
              <button
                type="button"
                onClick={() => setMobileSection(null)}
                className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/75 transition-colors hover:bg-[#1f3f2e] hover:text-white"
              >
                <ChevronIcon className="h-3.5 w-3.5 rotate-180" />
                Go back
              </button>
              <span className="border-b-2 border-[#f2d98d] pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f2d98d]">
                {mobileSubsection.label}
              </span>
            </div>

            <div className="border-t border-white/12 px-3.5 pb-1 pt-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#f2d98d]">
                {mobilePromo?.listHeading ?? "Highlights"}
              </p>

              {/* Dalawang hanay lang kapag marami — ang Golf ay 18 na butas, at
                  sa isang hanay ay mas mahaba pa iyon kaysa sa screen. */}
              <ul className={`mt-3.5 grid gap-x-4 ${mobileSubsection.links.length > 6 ? "grid-cols-2 gap-y-3" : "grid-cols-1 gap-y-3.5"}`}>
                {mobileSubsection.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                        onClick={(event) => {
                          if ("targetId" in link && typeof link.targetId === "string") {
                            handleGolfSectionClick(event, link.targetId);
                          }
                          closeMobileNav();
                        }}
                        className="block rounded-lg px-2 py-1.5 text-[13px] font-medium leading-snug text-white/82 transition-colors hover:bg-[#1f3f2e] hover:text-white"
                      >
                        {cardLabel(link.label)}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link
                href={`/${mobileSubsection.slug}`}
                onClick={closeMobileNav}
                className="mt-4 flex min-h-10 items-center justify-center rounded-full border border-[#1f3f2e] bg-[#1f3f2e] px-4 text-[9px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#1f3f2e]/80"
              >
                {mobilePromo?.action ?? "View all"}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-3 pb-2 pt-2">
              <div>
                {/* Buong pangalan ng club, gaya ng sa footer — hindi pinaikli. */}
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#f2d98d]">CamSur Uptown Golf Club</p>
                <p className="mt-1 text-sm font-semibold text-white/90">Explore CamSur Uptown</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">Menu</span>
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
                      className={`${isActive ? "bg-[#1f3f2e] text-white" : "text-white"} flex min-h-12 items-center justify-between gap-3 border-b border-[#1f3f2e]/45 px-3 transition-colors hover:bg-[#1f3f2e] hover:text-white`}
                    >
                      <span className="text-sm font-bold uppercase tracking-[0.08em]">{item.label}</span>
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
                    className={`${isActive ? "bg-[#1f3f2e] text-white" : "text-white"} group flex min-h-12 w-full items-center justify-between gap-3 border-b border-[#1f3f2e]/45 px-3 text-left transition-colors hover:bg-[#1f3f2e] hover:text-white`}
                  >
                    <span className="text-sm font-bold uppercase tracking-[0.08em]">{item.label}</span>
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
          className="mt-2.5 flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-[#1f3f2e] px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#1f3f2e]/80"
        >
          Plan your visit
        </Link>
      </div>

      {activeSection && (
        <div
          id="desktop-mega-menu"
          className={`${isScrolled ? "top-[60px]" : "top-[118px]"} absolute left-[calc(50%_-_65px)] z-30 hidden w-[min(790px,calc(100vw-518px))] -translate-x-1/2 overflow-hidden rounded-b-[1.4rem] border border-t-0 border-[#f2d98d]/15 bg-[#265136] text-white shadow-[0_24px_60px_rgba(0,0,0,0.26)] transition-[top] duration-300 xl:block 2xl:left-[calc(50%_-_55px)] 2xl:w-[790px]`}
        >
          {/* Walang fixed na taas: sumusukat ang panel sa laman ng section.
              Dati ay 360px ang lahat, kaya may 140px na walang laman sa ilalim
              ng mga maiksing section at halatang-halata iyon. Ang sahig ay
              itinatakda ng kaliwang haligi (larawan at button, mga 260px).

              Ang lapad ay nananatiling fixed: dalawang hanay ang karamihan,
              at tatlo ang Golf — bilang sa gitna, hindi-butas sa dulo. Pareho
              ang unang haligi sa dalawa (0.82fr sa 3fr), kaya hindi
              nagbabago ang preview card kapag nagpalit ng tab. */}
          <div className={`${sectionExtras ? "grid-cols-[0.82fr_1.53fr_0.65fr]" : "grid-cols-[0.82fr_2.18fr]"} grid`}>
            <div className="border-r border-white/10 px-6 pb-6 pt-9">
              <p className={MEGA_HEADING}>{activePromo?.heading ?? activeSection.eyebrow}</p>
              <Link
                href={previewHref}
                target={previewHref.startsWith("http") ? "_blank" : undefined}
                rel={previewHref.startsWith("http") ? "noreferrer" : undefined}
                onClick={closeDesktopMenu}
                className="group block"
              >
                <div className="relative aspect-[1.35] overflow-hidden rounded-xl border border-white/10 bg-[#1f3f2e] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#f2d98d]/55 group-hover:shadow-[0_16px_34px_rgba(0,0,0,0.25)]">
                  <Image key={previewImage} src={previewImage ?? activeSection.image} alt="" fill sizes="220px" className="mega-preview-image object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10281e]/90 via-[#10281e]/10 to-transparent" aria-hidden="true" />
                  {/* 159px lang ang espasyo dito, kaya sa 16px ay umaapaw na
                      ang "Accommodations" (171px). Sa 13px ay isang linya ito.
                      Tatlo ang clamp dahil ang pinakamahabang label ngayon —
                      "Playground & Outdoor Basketball Court" — ay eksaktong
                      tatlong linya (49px sa 136px na card); sa dalawa ay
                      naputol ito. Ang clamp ay para sa mas mahaba pa. */}
                  <p className="absolute bottom-3 left-3 right-3 line-clamp-3 text-[13px] font-semibold uppercase leading-tight tracking-[0.02em] text-white">{previewLabel}</p>
                </div>
                <span className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#f2d98d] bg-[#f2d98d] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#1f3f2e] shadow-[0_8px_20px_rgba(0,0,0,0.16)] transition group-hover:-translate-y-0.5 group-hover:bg-[#f6e5ac] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
                  {activeSection.slug === "clubhouse"
                    ? "View Details"
                    : activeSection.slug === "golf"
                      ? "View Details"
                    : hoveredExtra
                    ? hoveredExtra.href.startsWith("http")
                      ? "Visit the site"
                      : "View details"
                    : hoveredLinkImage
                    ? hoveredLink?.href.startsWith("http")
                      ? "Visit the site"
                      : "View details"
                    : hoveredPreview
                      ? activeSection.slug === "accommodations"
                        ? "Explore this stay"
                        /* Butas ang natitirang kaso dito. "Explore concept"
                           ito noong `/golf/[concept]` pa ang ruta; ngayong
                           `/golf/courses/no-N` na, butas na ang tinutumbok. */
                        : "Explore this hole"
                      : activePromo?.action ?? "Explore more"}
                  <span className="text-sm leading-none" aria-hidden="true">→</span>
                </span>
              </Link>
            </div>

            <div className="px-6 pb-6 pt-9">
              <p className={MEGA_HEADING}>
                {activePromo?.listHeading ?? "Highlights"}
              </p>
              <div onMouseLeave={() => setHoveredPreviewIndex(null)}>
                {/* Ang bawat anyo ay may sariling grid at sariling sukat ng
                    larawan, pero pareho ang ginagawa ng hover: pinapalitan
                    ang preview sa kaliwang hanay. Tingnan ang MEGA_STYLES
                    sa itaas para sa dahilan ng paghahati. */}
                {megaStyle === "cards" && (
                  /* Isang aspect na lang: sumusukat na ang panel sa laman,
                     kaya hindi na kailangang unatin ang card para punan ang
                     ilalim. Ang lapad ng card ang nagtatakda ng taas. */
                  <div className={`${activeSection.links.length > 2 ? "grid-cols-3" : "grid-cols-2"} grid gap-3`}>
                    {activeSection.links.map((link, index) => {
                      const image = linkImageAt(index);
                      return (
                        <Link
                          key={`${link.href}-${link.label}`}
                          {...highlightLinkProps(link, index)}
                          className="group/card block"
                        >
                          <div
                            className="relative aspect-[1.25] overflow-hidden rounded-lg bg-[#1f3f2e]"
                          >
                            {image && (
                              <Image
                                src={image}
                                alt=""
                                fill
                                sizes="280px"
                                className="object-cover opacity-90 transition duration-500 group-hover/card:scale-[1.04] group-hover/card:opacity-100"
                              />
                            )}
                            <span className="absolute inset-0 bg-gradient-to-t from-[#1f3f2e]/85 via-[#1f3f2e]/10 to-transparent" aria-hidden="true" />
                            <span className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2">
                              <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.03em]">{cardLabel(link.label)}</span>
                              <span className="shrink-0 pb-px text-white opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" aria-hidden="true">→</span>
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
                  <div className={`${namesGridClass(activeSection.links.length)} grid gap-x-6`}>
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
                        className={`${hoveredPreviewIndex === index ? "bg-[#1f3f2e] text-white" : "text-white/72"} flex min-h-[32px] items-center rounded-md px-2 text-[11px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:bg-[#1f3f2e] hover:text-white`}
                      >
                        {cardLabel(link.label)}
                      </Link>
                    ))}
                  </div>
                )}

                {megaStyle === "rules" && (
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
                        className="group/rule flex items-center justify-between gap-3 border-b border-[#1f3f2e]/45 px-2 py-3.5 text-white/72 transition-colors duration-200 hover:bg-[#1f3f2e] hover:text-white"
                      >
                        <span className="text-[12px] font-semibold uppercase tracking-[0.05em]">{cardLabel(link.label)}</span>
                        <span className="text-white opacity-0 transition-opacity duration-300 group-hover/rule:opacity-100" aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

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
              <div className="border-l border-white/10 px-6 pb-6 pt-9" onMouseLeave={() => setHoveredExtra(null)}>
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
                            className={`${hoveredExtra?.href === extra.href ? "bg-[#1f3f2e] text-white" : "text-white/72"} inline-flex min-h-[32px] items-center gap-1.5 rounded-md px-2 text-[11px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:bg-[#1f3f2e] hover:text-white`}
                          >
                            {cardLabel(extra.label)}
                            {isExternal && <span aria-hidden="true">↗</span>}
                          </Link>
                        );
                      })}
                    </div>
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
