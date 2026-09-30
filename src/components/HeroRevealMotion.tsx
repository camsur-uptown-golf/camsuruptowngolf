"use client";

import { useEffect } from "react";

/**
 * Scroll-driven na "action" para sa naka-pin (sticky top-0) na Villa del Rey
 * hero. Dahil nakadikit ito sa itaas mula pa sa pag-load, ang mismong
 * `window.scrollY` ang progreso ng pagtabon: 0 sa taas, 1 kapag nasakop na ng
 * isang buong viewport ang hero.
 *
 * Isinusulat lang nito ang progreso (0→1) sa `--p` ng `#top`; sa globals.css
 * binubuo mula rito ang banayad na zoom ng larawan at ang pag-angat/pagkupas
 * ng logo. Iisang rAF loop, passive na scroll, at sumusunod sa
 * prefers-reduced-motion — katulad ng ScrollMotion.
 */
export default function HeroRevealMotion() {
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);
      hero.style.setProperty("--p", progress.toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      hero.style.removeProperty("--p");
    };
  }, []);

  return null;
}
