"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pinapatakbo ang scroll reveal ng mga `[data-scroll-anim]` na elemento.
 *
 * IntersectionObserver ang gamit (hindi `animation-timeline: view()` na
 * pabago-bago ang suporta ng browser): nilalagyan ng `.in-view` ang elemento
 * kapag pumasok sa tanaw, at INAALIS kapag umalis — kaya nag-a-animate ito
 * ULIT sa bawat pasok, scroll down man o pataas. Ang mismong galaw (slide/rise
 * + fade) ay nasa CSS (`globals.css`) bilang time-based na transition.
 *
 * Tulad ng ScrollMotion, naka-key sa pathname para muling kumabit sa bagong
 * laman pagkatapos ng navigation.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-anim]"));
    if (targets.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          // Pasok → animate in; alis → reset para umulit sa susunod na pasok.
          el.classList.toggle("in-view", entry.isIntersecting);
        }
      },
      // Nag-ti-trigger kapag ~15% nang nakikita; may konting margin sa ibaba
      // para pumasok ang galaw bago pa tuluyang makita ang buong elemento.
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
