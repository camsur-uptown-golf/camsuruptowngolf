"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const ROUTE_SCROLL_RESET_ATTRIBUTE = "data-route-scroll-reset";
const NAVIGATION_FAILSAFE_MS = 2_000;
const RESET_RELEASE_DELAY_MS = 150;

function holdImmediateScrolling() {
  document.documentElement.setAttribute(ROUTE_SCROLL_RESET_ATTRIBUTE, "");
}

function releaseImmediateScrolling() {
  document.documentElement.removeAttribute(ROUTE_SCROLL_RESET_ATTRIBUTE);
}

function scrollToTopImmediately() {
  holdImmediateScrolling();
  window.scrollTo(0, 0);
}

export default function RouteScrollReset() {
  const pathname = usePathname();
  const navigationFailsafeRef = useRef<number | null>(null);

  useEffect(() => {
    const handleNavigationClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !link ||
        link.download ||
        (link.target && link.target !== "_self")
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname
      ) {
        return;
      }

      // This runs in capture phase, before Next handles the link. Keeping the
      // override active prevents Next's route scroll reset from inheriting the
      // site's intentional smooth scrolling.
      holdImmediateScrolling();

      if (navigationFailsafeRef.current !== null) {
        window.clearTimeout(navigationFailsafeRef.current);
      }

      navigationFailsafeRef.current = window.setTimeout(() => {
        releaseImmediateScrolling();
        navigationFailsafeRef.current = null;
      }, NAVIGATION_FAILSAFE_MS);
    };

    document.addEventListener("click", handleNavigationClick, true);

    return () => {
      document.removeEventListener("click", handleNavigationClick, true);
      if (navigationFailsafeRef.current !== null) {
        window.clearTimeout(navigationFailsafeRef.current);
      }
      releaseImmediateScrolling();
    };
  }, []);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    scrollToTopImmediately();

    if (navigationFailsafeRef.current !== null) {
      window.clearTimeout(navigationFailsafeRef.current);
      navigationFailsafeRef.current = null;
    }

    let secondFrame = 0;
    let releaseTimer = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      scrollToTopImmediately();
      secondFrame = window.requestAnimationFrame(() => {
        scrollToTopImmediately();
        releaseTimer = window.setTimeout(() => {
          scrollToTopImmediately();
          releaseImmediateScrolling();
        }, RESET_RELEASE_DELAY_MS);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(releaseTimer);
    };
  }, [pathname]);

  return null;
}
