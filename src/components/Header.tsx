"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ACCOMMODATIONS, CLUB_PHONE, COURSE_PAGES, SITE_SECTIONS } from "@/lib/site-content";

/* Galing na sa site-content: apat na kopya dati ng parehong placeholder. */
const { label: PHONE_LABEL, href: PHONE_HREF } = CLUB_PHONE;

/**
 * Anyo ng listahan ng highlight sa mega menu, isa sa bawat section.
 *
 * Hindi kayang isang anyo lang ang lahat, at dito nakikita kung bakit:
 * dalawa ang link ng Packages at Dining, tatlo ang Accommodations, sampu
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
  "mb-4 border-b border-white/10 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b]";

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
  { heading: string; items: readonly { label: string; href: string; image?: string }[] }
> = {
  golf: {
    heading: "Competition",
    items: [
      {
        label: "Tournaments",
        href: "/events",
        image: "/events/golf-tournaments-full-logo-2026-clean-4k-v3.png",
      },
    ],
  },
  experiences: {
    heading: "Discover",
    /* Maiksi ang label dahil 159px lang ang haligi: sa "CamSur Uptown" ay
       naiiwan ang arrow sa sariling linya. Wala itong `image` — larawan ng
       section ang nananatili sa preview, at "Visit the site" ang button. */
    items: [{ label: "Visit CamSur", href: "https://visitcamsur.com/" }],
  },
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCompactNav, setShowCompactNav] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
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
  const activeSection = SITE_SECTIONS.find((section) => section.slug === openMenu);
  const mobileSubsection = SITE_SECTIONS.find((section) => section.slug === mobileSection);
  const megaStyle = activeSection ? MEGA_STYLES[activeSection.slug] ?? "rules" : "rules";
  /* Ito ang nagpapasya kung tatlo o dalawa ang haligi ng panel. */
  const sectionExtras = activeSection ? SECTION_EXTRAS[activeSection.slug] : undefined;

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
  const previewImage = hoveredExtra?.image ?? hoveredLinkImage ?? hoveredPreview?.image ?? activeSection?.image;
  const previewLabel = hoveredExtra
    ? hoveredExtra.label
    : activeSection?.slug === "golf" && hoveredLink
    ? hoveredLink.label
    : hoveredLinkImage
      ? hoveredLink?.label
      : hoveredPreview?.title ?? activeSection?.label;
  /* Ang href ng link mismo ang sinusundan, hindi binubuo mula sa slug ng
     section at ng pahina. Sa `/${slug}/${hoveredPreview.slug}` ay
     `/golf/no-4` ang nabubuo — 404 iyon mula nang maging
     `/golf/courses/no-4` ang ruta. Isang pinagmulan na lang ngayon. */
  const previewHref = hoveredExtra
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
    setOpenMenu((currentMenu) => currentMenu === slug ? null : slug);
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
      // Use separate enter/exit thresholds so tiny trackpad movements near the
      // top cannot rapidly toggle the two header layouts.
      const hasScrolled = compactHeader.current ? currentScrollY > 4 : currentScrollY > 28;

      if (compactHeader.current !== hasScrolled) {
        compactHeader.current = hasScrolled;
        setIsScrolled(hasScrolled);
      }

      if (!hasScrolled) {
        setShowCompactNav(false);
        lastScrollY.current = 0;
      } else if (currentScrollY < lastScrollY.current - 10) {
        setShowCompactNav(true);
        lastScrollY.current = currentScrollY;
      } else if (currentScrollY > lastScrollY.current + 10) {
        setShowCompactNav(false);
        setOpenMenu(null);
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
      setOpenMenu(null);
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
           buong-lapad na bar sa likod, dalawang bagay ang nagsasalansan. */
        className={`${isScrolled ? "translate-y-0" : "-translate-y-full"} pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-20 transform-gpu border-b border-[#d8b65b]/25 bg-[#17382b] shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-transform duration-350 ease-out lg:block`}
        aria-hidden="true"
      />
      <div
        className={`${isScrolled ? "opacity-0" : "opacity-100"} pointer-events-none absolute inset-x-0 top-0 -z-20 h-40 bg-gradient-to-b from-black/45 to-transparent`}
        aria-hidden="true"
      />

      {/* Isang haligi lang sa cellphone. Sa dalawang haligi, nananatili ang
          gap-5 kahit walang laman ang pangalawa, kaya 10px na pakaliwa ang
          nasesentrong pill. */}
      {/* Kapag naka-scroll ay buong lapad ang hilera sa desktop: ang bar sa
          likod nito ay `inset-x-0`, kaya sa `max-w-7xl` ay nakalayo sa
          sariling gilid ang marka at ang Contact Us — 320px ang nakabitin sa
          magkabilang dulo sa 1920px. Nananatiling `max-w-7xl` ang hero,
          kung saan hindi buong lapad ang tinitingnan.

          Ang cap lang ang inaalis, hindi ang padding: sa `lg:px-10` ay
          papasok pa ng 8px ang marka sa 1280px pababa, kung saan hindi
          naman nakakasagabal ang cap. */}
      <div className={`${isScrolled ? "py-3 lg:max-w-none lg:py-3" : "py-5 lg:py-6"} pointer-events-none relative z-40 mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8`}>
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
        <div className={`${isScrolled ? "w-auto translate-y-0 gap-0" : "w-[min(820px,calc(100vw-3rem))] -translate-y-7 gap-3"} relative hidden flex-col items-center justify-self-center lg:flex`}>
          {/* Dating 10px/11px ito. Nawalan din ng dobleng `xl:text-[11px]` na
              nasa dulo ng parehong listahan ng klase. */}
          <div className="pointer-events-auto flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.07em] text-white/88 [text-shadow:0_1px_7px_rgba(0,0,0,0.45)] xl:text-[13px]">
            <Link href="/plan-your-visit" className="flex items-center gap-2 transition-colors hover:text-[#f1d98f]">
              <CalendarIcon />
              Plan your visit
            </Link>
            <span className="h-4 w-px bg-white/35" aria-hidden="true" />
            <a href={PHONE_HREF} className="flex items-center gap-2 transition-colors hover:text-[#f1d98f]">
              <PhoneIcon />
              {PHONE_LABEL}
            </a>
          </div>

          <nav
            data-nav="hero"
            aria-label="Primary navigation"
            className={`${isScrolled ? "invisible pointer-events-none max-h-0 overflow-hidden border-transparent p-0 opacity-0" : openMenu ? "visible max-h-16 w-[min(820px,calc(100vw-3rem))] rounded-t-[1.6rem] rounded-b-none border border-b-white/25 border-white/10 bg-[#254936] px-5 py-2 opacity-100 shadow-none" : "visible max-h-16 w-[min(690px,calc(100vw-3rem))] rounded-full border border-[#d8b65b]/20 bg-[#214936]/88 p-1.5 opacity-100 shadow-[0_12px_35px_rgba(0,0,0,0.16)]"} ${openMenu ? "flex items-center justify-between gap-0.5" : "grid grid-flow-col auto-cols-max items-center justify-evenly"} pointer-events-auto relative z-50 h-12 text-[10px] font-semibold uppercase tracking-[0.07em] text-white/90 backdrop-blur-md xl:text-[11px] xl:tracking-[0.09em]`}
          >
            {SITE_SECTIONS.map((item) => (
              <button
                type="button"
                key={item.slug}
                onClick={() => toggleDesktopMenu(item.slug)}
                aria-expanded={openMenu === item.slug}
                aria-haspopup="true"
                aria-controls="desktop-mega-menu"
                className={`${openMenu === item.slug ? "bg-[#56725f] text-[#f3dda0]" : ""} pointer-events-auto relative z-10 cursor-pointer whitespace-nowrap rounded-full px-3 py-2.5 transition-colors duration-200 hover:bg-[#56725f] hover:text-[#f3dda0] xl:px-3.5`}
              >
                {item.label.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>

        {/* Sa /contact ito, hindi sa /plan-your-visit: tanong ang dala ng
            pipindot nito, hindi pa balak na pagbisita. */}
        <Link
          href="/contact"
          className={`${isScrolled ? "translate-y-0 px-5 py-2.5" : "-translate-y-3 px-6 py-3"} pointer-events-auto hidden items-center justify-self-end rounded-full bg-white/90 text-[12px] font-bold uppercase tracking-[0.08em] text-[#20362c] shadow-[0_10px_28px_rgba(0,0,0,0.15)] backdrop-blur hover:bg-white lg:inline-flex xl:text-[14px]`}
        >
          Contact Us
        </Link>

        {/* Cellphone lang: isang pill na may tatlong sona — marka sa kaliwa,
            MENU sa gitna, telepono sa kanan. Ito na ang buong header sa lapad
            na ito, kaya halos buo ang opacity: lumulutang ito sa ibabaw ng
            nilalaman, kahit sa mapuputing section.

            Kasinlaki lang ng laman nito, hindi buong lapad: sa `w-full` at
            `justify-between` ay nauuwi sa dalawang dulo ang marka at ang
            telepono at malayo sila sa MENU sa gitna. Ang `gap` na ito ang
            nagtatakda ng layo ngayon, at `justify-self-center` ang
            nagpapanatili nitong nakagitna sa grid ng header. */}
        <div className="pointer-events-auto flex w-auto items-center justify-self-center gap-10 rounded-full border border-white/20 bg-[#1c3b2d]/95 px-5 py-2.5 shadow-[0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:hidden">
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
        className={`${mobileMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"} fixed inset-x-4 top-[6.5rem] z-30 max-h-[calc(100svh-7.5rem)] overflow-y-auto rounded-[1.75rem] border border-white/12 bg-[#214333]/98 p-3 text-white shadow-[0_30px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-out sm:left-auto sm:right-6 sm:w-[390px] lg:hidden`}
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
                Go back
              </button>
              <span className="border-b-2 border-[#d8b65b] pb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                {mobileSubsection.label}
              </span>
            </div>

            <div className="border-t border-white/12 px-3.5 pb-1 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d8b65b]">
                {mobileSubsection.slug === "golf" ? "Course holes" : `${mobileSubsection.label} highlights`}
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
                        onClick={closeMobileNav}
                        className="block text-sm font-medium leading-snug text-white/82 transition-colors hover:text-[#f1d98f]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link
                href={`/${mobileSubsection.slug}`}
                onClick={closeMobileNav}
                className="mt-5 flex min-h-11 items-center justify-center rounded-full border border-white/35 px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#f1d98f] hover:bg-[#f1d98f] hover:text-[#0b281b]"
              >
                View all {mobileSubsection.label}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-3 pb-2 pt-2">
              <div>
                {/* Buong pangalan ng club, gaya ng sa footer — hindi pinaikli. */}
                <p className="text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b]">CamSur Uptown Golf Club</p>
                <p className="mt-1 text-sm font-semibold text-white/90">Explore CamSur Uptown</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">Menu</span>
            </div>

            <nav aria-label="Mobile primary navigation" className="mt-2 border-t border-white/12">
              {SITE_SECTIONS.map((item) => {
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
                    className={`${isActive ? "text-[#f1d98f]" : "text-white"} group flex min-h-[52px] w-full items-center justify-between gap-3 border-b border-white/12 px-3.5 text-left transition-colors hover:text-[#f1d98f]`}
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
          className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-[#f1d98f] px-5 text-xs font-bold uppercase tracking-[0.08em] text-[#0b281b] transition hover:bg-[#f6e4a9]"
        >
          Plan your visit
        </Link>
      </div>

      <nav
        data-nav="compact"
        aria-label="Compact primary navigation"
        className={`${isScrolled && (showCompactNav || openMenu) ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"} ${openMenu ? "lg:flex w-[min(820px,calc(100vw-3rem))] items-center justify-between gap-0.5 rounded-t-[1.6rem] rounded-b-none border-b-white/25 bg-[#254936] px-5 py-2 shadow-none" : "lg:grid w-[min(740px,calc(100vw-3rem))] grid-flow-col auto-cols-max items-center justify-evenly rounded-full border-b-[#d8b65b]/25 bg-[#2b553f] p-1 shadow-[0_10px_28px_rgba(0,0,0,0.18)]"} absolute left-1/2 top-[70px] z-50 hidden h-12 -translate-x-1/2 border border-[#d8b65b]/25 text-[10px] font-semibold uppercase tracking-[0.07em] text-white/90 backdrop-blur-md xl:text-[11px] xl:tracking-[0.09em]`}
      >
        {SITE_SECTIONS.map((item) => (
          <button
            type="button"
            key={item.slug}
            onClick={() => toggleDesktopMenu(item.slug)}
            aria-expanded={openMenu === item.slug}
            aria-haspopup="true"
            aria-controls="desktop-mega-menu"
            /* Dapat tumugma ang py sa hero nav sa itaas: doon ay py-2.5.
               Kapag nagkaiba, mas masikip ang pills kapag naka-scroll. */
            className={`${openMenu === item.slug ? "bg-[#56725f] text-[#f3dda0]" : ""} pointer-events-auto relative z-10 cursor-pointer whitespace-nowrap rounded-full px-3 py-2.5 transition-colors duration-200 hover:bg-[#56725f] hover:text-[#f3dda0] xl:px-3.5`}
          >
            {item.label.toUpperCase()}
          </button>
        ))}
      </nav>

      {activeSection && (
        <div
          id="desktop-mega-menu"
          /* Magkaibang `top` kada estado dahil magkaiba ang ibaba ng dalawang
             nav: 138px ang hero, 120px ang compact. Ang panel ay nakapatong
             sa ilalim ng nav (z-50, kaparehong #254936) para walang tahi sa
             dugtungan — huwag itong gawing eksaktong magkadikit.

             Ang `top + padding − navBottom` ang nakikitang gap sa itaas ng
             mga heading. Ang ibaba ng nav ay 138px (hero) at 118px (compact),
             kaya 20px ang dapat na layo ng dalawang `top` para pantay ang
             gap: 120 at 100. Sa dating 109px ay 17px ang gap kapag naka-scroll
             pero 10px lang kapag hindi.

             Ang `pt-9` ng mga haligi ang nagbibigay ngayon ng 18px na gap;
             sa `pt-6` ay 6px lang ito at nakadikit ang heading sa nav. Pareho
             ang naidadagdag nito sa dalawang estado, kaya hindi nasisira ang
             pagkakapantay sa itaas. */
          className={`${isScrolled ? "top-[100px]" : "top-[120px]"} absolute left-1/2 z-30 hidden w-[min(820px,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-t-none rounded-b-[1.6rem] border border-t-0 border-white/10 bg-[#254936] text-white shadow-[0_24px_60px_rgba(0,0,0,0.26)] lg:block`}
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
              <p className={MEGA_HEADING}>{activeSection.eyebrow}</p>
              <Link
                href={previewHref}
                target={previewHref.startsWith("http") ? "_blank" : undefined}
                rel={previewHref.startsWith("http") ? "noreferrer" : undefined}
                onClick={closeDesktopMenu}
                className="group block"
              >
                <div className="relative aspect-[1.35] overflow-hidden rounded-lg bg-[#183d2c]">
                  <Image key={previewImage} src={previewImage ?? activeSection.image} alt="" fill sizes="220px" className="mega-preview-image object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a12]/65 to-transparent" aria-hidden="true" />
                  {/* 159px lang ang espasyo dito, kaya sa 16px ay umaapaw na
                      ang "Accommodations" (171px). Sa 13px ay isang linya ito.
                      Tatlo ang clamp dahil ang pinakamahabang label ngayon —
                      "Playground & Outdoor Basketball Court" — ay eksaktong
                      tatlong linya (49px sa 136px na card); sa dalawa ay
                      naputol ito. Ang clamp ay para sa mas mahaba pa. */}
                  <p className="absolute bottom-3 left-3 right-3 line-clamp-3 text-[13px] font-semibold uppercase leading-tight tracking-[0.02em]">{previewLabel}</p>
                </div>
                <span className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/35 px-4 py-2.5 text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.14em] transition group-hover:border-[#e7d18d] group-hover:bg-[#e7d18d] group-hover:text-[#10281e]">
                  {hoveredExtra
                    ? hoveredExtra.href.startsWith("http")
                      ? "Visit the site"
                      : `Explore ${hoveredExtra.label}`
                    : hoveredLinkImage
                    ? hoveredLink?.href.startsWith("http")
                      ? "Visit the site"
                      : `Explore ${hoveredLink?.label}`
                    : hoveredPreview
                      ? activeSection.slug === "accommodations"
                        ? "Explore this stay"
                        /* Butas ang natitirang kaso dito. "Explore concept"
                           ito noong `/golf/[concept]` pa ang ruta; ngayong
                           `/golf/courses/no-N` na, butas na ang tinutumbok. */
                        : "Explore this hole"
                      : `Explore ${activeSection.label}`}
                </span>
              </Link>
            </div>

            <div className="px-6 pb-6 pt-9">
              <p className={MEGA_HEADING}>
                {activeSection.slug === "golf" ? "Course holes" : `${activeSection.label} highlights`}
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
                            className="relative aspect-[1.25] overflow-hidden rounded-lg bg-[#183d2c]"
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
                            <span className="absolute inset-0 bg-gradient-to-t from-[#071a12]/80 via-[#071a12]/10 to-transparent" aria-hidden="true" />
                            <span className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2">
                              <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.03em]">{link.label}</span>
                              <span className="shrink-0 pb-px text-[#e7d18d] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" aria-hidden="true">→</span>
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
                        className={`${hoveredPreviewIndex === index ? "text-[#f1d98f]" : "text-white/72"} flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]`}
                      >
                        {link.label}
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
                        className="group/rule flex items-center justify-between gap-3 border-b border-white/10 py-4 text-white/72 transition-colors duration-200 hover:text-[#f1d98f]"
                      >
                        <span className="text-[12px] font-semibold uppercase tracking-[0.05em]">{link.label}</span>
                        <span className="text-[#e7d18d] opacity-0 transition-opacity duration-300 group-hover/rule:opacity-100" aria-hidden="true">→</span>
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
                <p className={MEGA_HEADING}>{sectionExtras.heading}</p>
                <div className="grid grid-cols-1">
                  {sectionExtras.items.map((extra) => {
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
                        className={`${hoveredExtra?.href === extra.href ? "text-[#f1d98f]" : "text-white/72"} inline-flex min-h-[34px] items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]`}
                      >
                        {extra.label}
                        {isExternal && <span aria-hidden="true">↗</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
