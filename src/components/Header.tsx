"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ACCOMMODATIONS, CONCEPTS, SITE_SECTIONS } from "@/lib/site-content";

// TODO: palitan ng totoong contact number ng club
const PHONE_LABEL = "(054) 123 4567";
const PHONE_HREF = "tel:+63541234567";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
  const [hoveredPreviewIndex, setHoveredPreviewIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const compactHeader = useRef(false);
  const activeSection = SITE_SECTIONS.find((section) => section.slug === openMenu);
  const hoveredPreview = hoveredPreviewIndex === null
    ? null
    : activeSection?.slug === "golf"
      ? CONCEPTS[hoveredPreviewIndex]
      : activeSection?.slug === "accommodations"
        ? ACCOMMODATIONS[hoveredPreviewIndex]
        : null;
  const previewImage = hoveredPreview?.image ?? activeSection?.image;
  const previewLabel = hoveredPreview?.title ?? activeSection?.label;
  const previewHref = hoveredPreview && activeSection
    ? `/${activeSection.slug}/${hoveredPreview.slug}`
    : activeSection
      ? `/${activeSection.slug}`
      : "/";

  const cancelScheduledClose = () => {
    if (closeMenuTimer.current) {
      clearTimeout(closeMenuTimer.current);
      closeMenuTimer.current = null;
    }
  };

  const toggleDesktopMenu = (slug: string) => {
    cancelScheduledClose();
    setHoveredPreviewIndex(null);
    setOpenMenu((currentMenu) => currentMenu === slug ? null : slug);
  };

  const scheduleDesktopMenuClose = () => {
    cancelScheduledClose();
    closeMenuTimer.current = setTimeout(() => {
      setHoveredPreviewIndex(null);
      setOpenMenu(null);
      closeMenuTimer.current = null;
    }, 160);
  };

  const closeDesktopMenu = () => {
    cancelScheduledClose();
    setHoveredPreviewIndex(null);
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

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setHoveredPreviewIndex(null);
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
      onMouseEnter={cancelScheduledClose}
      onMouseLeave={scheduleDesktopMenuClose}
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
        className={`${isScrolled ? "translate-y-0" : "-translate-y-full"} pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 transform-gpu border-b border-[#d8b65b]/25 bg-[#071d13] shadow-[0_10px_35px_rgba(0,0,0,0.22)] transition-transform duration-350 ease-out`}
        aria-hidden="true"
      />
      <div
        className={`${isScrolled ? "opacity-0" : "opacity-100"} pointer-events-none absolute inset-x-0 top-0 -z-20 h-40 bg-gradient-to-b from-black/45 to-transparent`}
        aria-hidden="true"
      />

      <div className={`${isScrolled ? "py-3 lg:py-3" : "py-5 lg:py-6"} pointer-events-none relative z-40 mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-5 px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8`}>
        <Link
          href="/"
          className={`${isScrolled ? "h-14 w-14" : "h-36 w-[108px] lg:h-44 lg:w-[132px]"} pointer-events-auto relative block shrink-0 justify-self-start`}
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
              src="/camsur-uptown-logo.png"
              alt=""
              width={176}
              height={234}
              priority
              className="absolute left-1/2 top-0 h-[90px] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]"
            />
          </span>
        </Link>

        <div className={`${isScrolled ? "translate-y-0 gap-0" : "-translate-y-7 gap-3"} relative hidden w-[min(820px,calc(100vw-3rem))] flex-col items-center justify-self-center lg:flex`}>
          <div className="pointer-events-auto flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.07em] text-white/88 [text-shadow:0_1px_7px_rgba(0,0,0,0.45)] xl:text-[11px]">
            <Link href="/#contact" className="flex items-center gap-2 transition-colors hover:text-[#f1d98f]">
              <CalendarIcon />
              Plan your visit
            </Link>
            <span className="h-3.5 w-px bg-white/35" aria-hidden="true" />
            <a href={PHONE_HREF} className="flex items-center gap-2 transition-colors hover:text-[#f1d98f]">
              <PhoneIcon />
              {PHONE_LABEL}
            </a>
          </div>

          <nav
            data-nav="hero"
            aria-label="Primary navigation"
            className={`${isScrolled ? "invisible pointer-events-none max-h-0 overflow-hidden border-transparent p-0 opacity-0" : openMenu ? "visible max-h-16 w-[min(820px,calc(100vw-3rem))] rounded-t-[1.6rem] rounded-b-none border border-b-white/25 border-white/10 bg-[#10281e] px-5 py-2 opacity-100 shadow-none" : "visible max-h-16 w-[min(690px,calc(100vw-3rem))] rounded-full border border-[#d8b65b]/20 bg-[#0a2b1d]/82 p-1.5 opacity-100 shadow-[0_12px_35px_rgba(0,0,0,0.2)]"} ${openMenu ? "flex items-center justify-between gap-0.5" : "grid grid-flow-col auto-cols-max items-center justify-evenly"} pointer-events-auto relative z-50 h-12 text-[10px] font-semibold uppercase tracking-[0.07em] text-white/90 backdrop-blur-md xl:text-[11px] xl:tracking-[0.09em]`}
          >
            {SITE_SECTIONS.map((item) => (
              <button
                type="button"
                key={item.slug}
                onClick={() => toggleDesktopMenu(item.slug)}
                aria-expanded={openMenu === item.slug}
                aria-haspopup="true"
                aria-controls="desktop-mega-menu"
                className={`${openMenu === item.slug ? "bg-transparent text-[#f3dda0] after:absolute after:inset-x-3 after:-bottom-2 after:h-0.5 after:bg-[#f3dda0] hover:bg-transparent" : ""} pointer-events-auto relative z-10 cursor-pointer whitespace-nowrap rounded-full px-3 py-2.5 transition-colors hover:bg-white/10 hover:text-[#f3dda0] xl:px-3.5`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <Link
          href="/#contact"
          className={`${isScrolled ? "translate-y-0 px-5 py-2.5" : "-translate-y-3 px-6 py-3"} pointer-events-auto hidden items-center justify-self-end rounded-full bg-white/90 text-[11px] font-bold uppercase tracking-[0.08em] text-[#20362c] shadow-[0_10px_28px_rgba(0,0,0,0.15)] backdrop-blur hover:bg-white lg:inline-flex`}
        >
          Contact Us
        </Link>

        <div className="pointer-events-auto flex items-center gap-1 justify-self-end rounded-full border border-white/20 bg-[#071d13]/35 p-1 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:hidden">
          <a href={PHONE_HREF} aria-label={`Call ${PHONE_LABEL}`} className="flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-[#f1d98f]">
            <PhoneIcon />
          </a>
          <span className="h-5 w-px bg-white/15" aria-hidden="true" />
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`${mobileMenuOpen ? "bg-[#f1d98f] text-[#092319]" : "text-white hover:bg-white/10"} relative flex h-11 w-11 items-center justify-center rounded-full transition-colors`}
          >
            <span className={`${mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"} absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300`} />
            <span className={`${mobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"} absolute h-0.5 w-5 rounded-full bg-current transition duration-200`} />
            <span className={`${mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"} absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300`} />
          </button>
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
        className={`${mobileMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"} ${isScrolled ? "top-[5.5rem]" : "top-[11.5rem] sm:top-[6.5rem]"} fixed inset-x-4 z-30 max-h-[calc(100svh-12.5rem)] overflow-y-auto rounded-[1.75rem] border border-white/12 bg-[#082218]/98 p-3 text-white shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-out sm:left-auto sm:right-6 sm:w-[390px] sm:max-h-[calc(100svh-7.5rem)] lg:hidden`}
      >
        <div className="flex items-center justify-between px-3 pb-2 pt-2">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d8b65b]">CamSur Uptown</p>
            <p className="mt-1 text-sm font-semibold text-white/90">Explore CamSur Uptown</p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Menu</span>
        </div>

        <nav aria-label="Mobile primary navigation" className="mt-2 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-1.5">
          {SITE_SECTIONS.map((item, index) => {
            const href = `/${item.slug}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={item.slug}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`${isActive ? "bg-white/[0.09] text-[#f1d98f]" : "text-white/82 hover:bg-white/[0.06] hover:text-white"} group flex min-h-12 items-center gap-3 rounded-2xl px-3.5 transition-colors`}
              >
                <span className={`${isActive ? "text-[#d8b65b]" : "text-white/30"} w-5 text-[9px] font-bold tracking-[0.12em]`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-sm font-semibold tracking-[-0.01em]">{item.label}</span>
                <span className={`${isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-35 group-hover:translate-x-0 group-hover:opacity-100"} text-sm transition`}>→</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-h-12 items-center justify-center rounded-full bg-[#f1d98f] px-5 text-xs font-bold uppercase tracking-[0.08em] text-[#0b281b] transition hover:bg-[#f6e4a9]"
          >
            Plan your visit
          </Link>
          <a href={PHONE_HREF} aria-label={`Call ${PHONE_LABEL}`} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/18 text-white/85 transition hover:border-[#f1d98f]/60 hover:text-[#f1d98f]">
            <PhoneIcon />
          </a>
        </div>
      </div>

      <nav
        data-nav="compact"
        aria-label="Compact primary navigation"
        className={`${isScrolled && (showCompactNav || openMenu) ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"} ${openMenu ? "lg:flex w-[min(820px,calc(100vw-3rem))] items-center justify-between gap-0.5 rounded-t-[1.6rem] rounded-b-none border-b-white/25 bg-[#10281e] px-5 py-2 shadow-none" : "lg:grid w-[min(740px,calc(100vw-3rem))] grid-flow-col auto-cols-max items-center justify-evenly rounded-full border-b-[#d8b65b]/25 bg-[#123828] p-1 shadow-[0_10px_28px_rgba(0,0,0,0.24)]"} absolute left-1/2 top-[70px] z-50 hidden -translate-x-1/2 border border-[#d8b65b]/25 text-[10px] font-semibold uppercase tracking-[0.07em] text-white/90 backdrop-blur-md xl:text-[11px] xl:tracking-[0.09em]`}
      >
        {SITE_SECTIONS.map((item) => (
          <button
            type="button"
            key={item.slug}
            onClick={() => toggleDesktopMenu(item.slug)}
            aria-expanded={openMenu === item.slug}
            aria-haspopup="true"
            aria-controls="desktop-mega-menu"
            className={`${openMenu === item.slug ? "bg-transparent text-[#f3dda0] after:absolute after:inset-x-3 after:-bottom-2 after:h-0.5 after:bg-[#f3dda0] hover:bg-transparent" : ""} pointer-events-auto relative z-10 cursor-pointer whitespace-nowrap rounded-full px-3 py-2 transition-colors hover:bg-white/10 hover:text-[#f3dda0] xl:px-3.5`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {activeSection && (
        <div
          id="desktop-mega-menu"
          className={`${isScrolled ? "top-[110px]" : "top-[121px]"} absolute left-1/2 z-30 hidden w-[min(820px,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-t-none rounded-b-[1.6rem] border border-t-0 border-white/10 bg-[#10281e] text-white shadow-[0_24px_60px_rgba(0,0,0,0.34)] lg:block`}
        >
          <div className="grid min-h-[285px] grid-cols-[0.82fr_1.18fr_1fr]">
            <div className="border-r border-white/12 p-5">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#d8b65b]">{activeSection.eyebrow}</p>
              <Link href={previewHref} onClick={closeDesktopMenu} className="group block">
                <div className="relative aspect-[1.35] overflow-hidden rounded-lg bg-[#183d2c]">
                  <Image key={previewImage} src={previewImage ?? activeSection.image} alt="" fill sizes="220px" className="mega-preview-image object-cover opacity-85 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a12]/65 to-transparent" aria-hidden="true" />
                  <p className="absolute bottom-3 left-3 right-3 text-base font-semibold leading-tight tracking-[-0.035em]">{previewLabel}</p>
                </div>
                <span className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/35 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] transition group-hover:border-[#e7d18d] group-hover:bg-[#e7d18d] group-hover:text-[#10281e]">
                  {hoveredPreview ? (activeSection.slug === "accommodations" ? "Explore this stay" : "Explore concept") : `Explore ${activeSection.label}`}
                </span>
              </Link>
            </div>

            <div className="border-r border-white/12 p-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/92">
                {activeSection.slug === "golf" ? "Course concepts" : `${activeSection.label} highlights`}
              </p>
              <div
                onMouseLeave={() => setHoveredPreviewIndex(null)}
                className={`${activeSection.slug === "golf" ? "grid-cols-2" : "grid-cols-1"} grid gap-x-3 gap-y-0.5`}
              >
                {activeSection.links.map((link, index) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    onClick={closeDesktopMenu}
                    onMouseEnter={() => {
                      if (activeSection.slug === "golf" || activeSection.slug === "accommodations") setHoveredPreviewIndex(index);
                    }}
                    onFocus={() => {
                      if (activeSection.slug === "golf" || activeSection.slug === "accommodations") setHoveredPreviewIndex(index);
                    }}
                    className={`${(activeSection.slug === "golf" || activeSection.slug === "accommodations") && hoveredPreviewIndex === index ? "bg-white/[0.07] text-[#f1d98f]" : "text-white/72"} rounded-md px-2 py-1.5 text-[11px] font-semibold leading-4 transition hover:bg-white/[0.07] hover:text-[#f1d98f]`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between p-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#d8b65b]">Discover CamSur Uptown</p>
                <h2 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.04em]">{activeSection.title}</h2>
                <p className="mt-3 text-xs leading-5 text-white/58">{activeSection.description}</p>
              </div>
              <Link href={`/${activeSection.slug}`} onClick={closeDesktopMenu} className="mt-5 inline-flex items-center justify-between rounded-full bg-[#e7d18d] px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#10281e] transition hover:bg-[#f3dfa0]">
                View details <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
