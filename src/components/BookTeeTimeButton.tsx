"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * "Book a Tee Time" na laging abot-kamay, gaya ng sa Pebble Beach.
 *
 * Lumalabas lang pagkalampas ng unang screen (para hindi matakpan ang hero),
 * at nawawala kapag kita na ang footer (may sarili nang mga link doon) at sa
 * mismong booking at members na pahina. Sa cellphone ay nasa gitnang ibaba,
 * sa desktop ay nasa kanang ibaba — malayo sa utilities bar na nasa gitna ng
 * kanang gilid.
 */
const HIDDEN_ON = ["/golf/book", "/members"];

export default function BookTeeTimeButton() {
  const pathname = usePathname();
  const hiddenHere = HIDDEN_ON.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    if (hiddenHere) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let observer: IntersectionObserver | undefined;
    const footer = document.querySelector("footer");
    if (footer) {
      observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
      observer.observe(footer);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [hiddenHere, pathname]);

  if (hiddenHere) return null;
  const shown = pastHero && !footerInView;

  return (
    <Link
      href="/golf/book"
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 inline-flex h-12 -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-[#e2c77a] pl-5 pr-6 font-navigation text-[12px] font-bold uppercase tracking-[0.12em] text-[#03321b] shadow-[0_14px_36px_rgba(3,50,27,0.35)] ring-1 ring-[#03321b]/10 transition-[opacity,transform,background-color] duration-300 hover:bg-[#efd99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#03321b] motion-reduce:transition-none lg:left-auto lg:right-8 lg:bottom-8 lg:translate-x-0 ${
        shown ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 12 14" className="h-3.5 w-3.5" fill="none">
        <path d="M2 13V1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M2.6 1.5 10 4 2.6 6.5Z" fill="currentColor" />
      </svg>
      Book a Tee Time
    </Link>
  );
}
