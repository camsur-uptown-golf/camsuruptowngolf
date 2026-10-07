"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToTopImmediately() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousScrollBehavior;
}

export default function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    scrollToTopImmediately();

    const frame = window.requestAnimationFrame(scrollToTopImmediately);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  /* INALIS ANG PAG-SCROLL BAGO MAG-NAVIGATE, KASAMA NG PAGECURTAIN.
     May pangalawang effect dito dati na nakikinig sa bawat click sa loob
     ng site at nag-i-scroll pataas bago pa lumipat ng ruta. May silbi iyon
     noong may kurtina: kinakansela ng PageCurtain ang click, kaya nakatakip
     na ang kurtina bago pa tumalon ang pahina — hindi ito nakikita.

     Wala nang kurtina, kaya walang nagkakansela ng click at walang
     tumatakip. Ang pag-scroll na iyon ay magiging kitang-kitang pagtalon
     ng kasalukuyang pahina bago pa man dumating ang bago. Ang
     `useLayoutEffect` sa itaas ang sapat na: nasa itaas na ang bagong
     pahina pagdating nito.

     Kapag ibinalik ang PageCurtain, ibalik din ito. */
  return null;
}
