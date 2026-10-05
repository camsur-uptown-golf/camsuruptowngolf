"use client";

import { useEffect, useState } from "react";

/**
 * Lumulutang na "pabalik sa itaas" na pindutan.
 *
 * Nagpapakita lang kapag naka-scroll na ang bisita palampas sa hero (papasok
 * na sa unang mga larawan) — `scrollY > ~70% ng taas ng tanaw`. Pagpindot,
 * marahang bumabalik sa pinakataas kung saan ang main hero image. Lumilitaw
 * nang may fade + angat para hindi ito biglang sumulpot.
 *
 * Reusable: ilagay sa anumang mahabang, image-heavy na pahina (hal. Events,
 * Experiences). Fixed ang posisyon kaya hindi nakakaapekto sa layout.
 */
export default function BackToHeroButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => setShow(window.scrollY > window.innerHeight * 0.7);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /**
   * Muling pinapatakbo ang word-by-word na hero title (`.hero-word`), gaya ng
   * pagpasok nito tuwing na-navigate ang route. Inaalis saglit ang klase,
   * pinipilit ang reflow, tapos ibinabalik — kaya nagre-restart ang CSS
   * animation. Hindi hinahawakan ang inline na `animation-delay` (per salita),
   * kaya nananatili ang stagger. Sa iisang synchronous na pasada ito, kaya
   * walang nakikitang kislap bago ang susunod na paint.
   */
  const replayHeroTitle = () => {
    const words = document.querySelectorAll<HTMLElement>(".hero-word");
    if (words.length === 0) return;
    words.forEach((word) => word.classList.remove("hero-word"));
    void document.body.offsetWidth; // pilitin ang reflow
    words.forEach((word) => word.classList.add("hero-word"));
  };

  const backToHero = () => {
    const start = window.scrollY;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || start <= 0) {
      window.scrollTo(0, 0);
      replayHeroTitle();
      return;
    }

    /* FIXED na tagal (~0.6s), hindi native `smooth`. Ang native ay
       distance-based: pag malayo ka na (maraming 220vh na stage), ilang
       segundong gumagapang ito pabalik sa lahat ng dinaanan — kaya "parang
       bumabalik sa mga section". Dito, pareho ang ~0.6s kahit gaano kalayo,
       kaya rekta agad sa pinakataas (0). */
    const DURATION = 600;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const t = Math.min((now - startTime) / DURATION, 1);
      window.scrollTo(0, Math.round(start * (1 - easeOutCubic(t))));
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        /* Pagdating sa tuktok, i-replay ang hero title — ito ang hiniling:
           gumana ulit ang action nito pagbalik sa hero. Maikling antala muna:
           ang ilang hero (hal. clubhouse overlay, o `data-hero-logo`) ay
           scroll-driven ang opacity, kaya hinahayaang mag-repaint ito sa
           scrollY=0 (opacity → 1) bago mag-animate — kung hindi, nag-a-animate
           ang mga salita habang nakatago pa, at hindi nakikita ang entrance. */
        window.setTimeout(replayHeroTitle, 120);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <button
      type="button"
      onClick={backToHero}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`${
        show ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      } fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-[#b8963f] bg-[#e7d18d] text-[#265136] shadow-[0_10px_26px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f3dfa0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#265136] sm:bottom-8 sm:right-8`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
