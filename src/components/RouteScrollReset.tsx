"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const GOLF_SECTION_STORAGE_KEY = "camsur-golf-section";

function scrollToTopImmediately() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousScrollBehavior;
}

function scrollToHashImmediately() {
  const hash = window.location.hash.slice(1);
  if (!hash) return false;

  const target = document.getElementById(decodeURIComponent(hash));
  if (!target) return false;

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  target.scrollIntoView({ block: "start" });
  root.style.scrollBehavior = previousScrollBehavior;
  return true;
}

export default function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";

    /* The Golf mega menu stores its intended in-page section before moving
       from another route to /golf. Header applies that targeted scroll in
       the same layout pass. Do not schedule the normal top reset afterward,
       or it would overwrite the destination and reveal the hero first. */
    const hasPendingGolfSection =
      pathname === "/golf" && window.sessionStorage.getItem(GOLF_SECTION_STORAGE_KEY) !== null;
    if (hasPendingGolfSection) return;

    const scrollToDestination = () => {
      if (!scrollToHashImmediately()) scrollToTopImmediately();
    };

    scrollToDestination();

    const frame = window.requestAnimationFrame(scrollToDestination);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const resetBeforeInternalNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.hash) return;

      scrollToTopImmediately();
    };

    document.addEventListener("click", resetBeforeInternalNavigation, true);
    return () => document.removeEventListener("click", resetBeforeInternalNavigation, true);
  }, []);

  return null;
}
