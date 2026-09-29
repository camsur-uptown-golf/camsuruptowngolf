"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FloatingCallbackCta() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 280);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    const form = document.getElementById("request-call-back");
    const observer = form
      ? new IntersectionObserver(
          ([entry]) => setFormIsVisible(entry.isIntersecting),
          { threshold: 0.08 },
        )
      : null;

    if (form && observer) observer.observe(form);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      observer?.disconnect();
    };
  }, []);

  const isVisible = hasScrolled && !formIsVisible;

  return (
    <Link
      href="#request-call-back"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`${isVisible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"} fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[90] inline-flex min-h-12 -translate-x-1/2 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#f3dda0]/35 bg-[#265136]/95 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.12em] text-[#f3dda0] shadow-[0_16px_40px_rgba(6,26,17,0.34)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f3f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dda0] sm:px-7 sm:text-[11px]`}
    >
      <PhoneIcon />
      Request a call back
    </Link>
  );
}
