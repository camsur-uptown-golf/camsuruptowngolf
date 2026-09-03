"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the scroll animations declared in markup:
 *
 *   data-reveal="up|left|right|scale|line"  — animates in and out with view
 *   style={{ "--reveal-delay": "120ms" }}   — staggers a group of reveals
 *   data-parallax="0.12"                    — drifts against the scroll
 *   data-count="25"                         — counts up when it enters view
 *
 * Dalawang direksyon ang lahat: hindi minsanan ang reveal. Bumabalik ito sa
 * nakatagong estado kapag lumabas ng viewport, kaya umaandar ulit pag-scroll
 * pabalik — pataas man o pababa.
 *
 * Isang rAF loop lang ang humahawak sa reveals at parallax. Sinasadya ang
 * paggamit ng getBoundingClientRect sa halip na IntersectionObserver: hindi
 * nagfa-fire ang IO kapag hindi nagre-render ang tab (naka-background o
 * nakatago ang window), at ang resulta noon ay permanenteng opacity: 0 —
 * blangkong pahina. Ang rect check ay tumatakbo saan man.
 *
 * Binabasa muna ang lahat ng rect bago magsulat ng anumang style, para
 * hindi mag-forced reflow sa bawat frame.
 */

/** Kailangang lumagpas nang ganito karami ang elemento bago ito i-reset.
    Ang puwang sa pagitan ng papasok at palabas na hangganan ang pumipigil
    sa pagkurap-kurap kapag huminto ang scroll mismo sa gilid. */
const EXIT_MARGIN = 80;
export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]"));
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    // Thousands separators keep larger count-up values consistent with the
    // server-rendered text.
    const format = (n: number) => n.toLocaleString("en-US");

    const settle = (el: HTMLElement) => {
      el.classList.add("is-in");
      if (el.dataset.count) el.textContent = format(Number(el.dataset.count));
    };

    // Reduced motion: show everything at once and never listen to scroll.
    if (prefersReducedMotion) {
      targets.forEach(settle);
      return;
    }

    // Pumapasok muli ang elemento bago matapos ang dating bilang kapag mabilis
    // ang scroll, kaya isang count-up lang ang pinapatakbo kada elemento.
    const counting = new WeakSet<HTMLElement>();

    const runCountUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target) || counting.has(el)) return;
      counting.add(el);

      const duration = 1200;
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(step);
        else counting.delete(el);
      };

      requestAnimationFrame(step);
    };

    let frame = 0;

    const paint = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;

      // --- read phase: no style writes in here ---
      const offsets: [HTMLElement, number][] = [];
      for (const layer of layers) {
        const speed = Number(layer.dataset.parallax);
        if (!Number.isFinite(speed)) continue;

        const rect = layer.getBoundingClientRect();
        // Distance of this layer's center from the viewport center, so the
        // offset passes through zero while the layer sits mid-screen.
        const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;
        offsets.push([layer, distanceFromCenter * speed]);
      }

      const entering: HTMLElement[] = [];
      const leaving: HTMLElement[] = [];

      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        const shown = el.classList.contains("is-in");

        // Papasok: kahit anong pagpatong sa viewport. Huwag itong higpitan —
        // ang course snapshot ng homepage ay nakadikit sa ilalim ng h-svh na
        // hero, kaya sa mas mahigpit na hangganan ay mananatili itong blangko
        // hangga't hindi nag-i-scroll. Kung nakikita sa pag-load, lumalabas
        // ito sa pag-load.
        if (!shown && rect.top < viewportHeight && rect.bottom > 0) {
          entering.push(el);
          continue;
        }

        // Palabas: kailangang malinaw nang nakalampas, hindi basta dumampi sa
        // gilid, para hindi kumurap-kurap ang animation.
        if (shown && (rect.top > viewportHeight + EXIT_MARGIN || rect.bottom < -EXIT_MARGIN)) {
          leaving.push(el);
        }
      }

      // --- write phase ---
      for (const [layer, y] of offsets) {
        layer.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
      }

      for (const el of leaving) {
        el.classList.remove("is-in");
      }

      for (const el of entering) {
        el.classList.add("is-in");
        if (el.dataset.count) runCountUp(el);
      }
    };

    const schedulePaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // Kapag naka-background ang tab ay hindi tumatakbo ang rAF at hindi
    // nagfa-fire ang scroll, kaya walang makakapag-reveal habang nakatago
    // ang pahina. Direktang tawag ang ginagamit dito (hindi rAF) para may
    // laman na agad ito sa sandaling makita ito ng tao.
    const repaintWhenVisible = () => {
      if (!document.hidden) paint();
    };

    paint();
    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint);
    window.addEventListener("pageshow", repaintWhenVisible);
    document.addEventListener("visibilitychange", repaintWhenVisible);

    return () => {
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      window.removeEventListener("pageshow", repaintWhenVisible);
      document.removeEventListener("visibilitychange", repaintWhenVisible);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
