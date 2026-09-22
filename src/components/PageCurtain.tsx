"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Curtain (wipe) na page transition.
 *
 * Paano ito tumatakbo:
 *   1. Sinasalo ang pindot sa panloob na link at kinakansela ang default.
 *   2. Pumapasok ang panel mula kaliwa hanggang matakpan ang buong screen.
 *   3. Saka lang inihahatid ang bagong ruta — nakatago na ang paglipat.
 *   4. Paglabas ng bagong pahina, umaalis ang panel pakanan.
 *
 * Hindi ito nagagawa ng View Transitions API: mga snapshot lang ang
 * inaanimate nito, kaya hindi mailalagay doon ang logo ng club.
 *
 * Dalawang bagay ang pinapangalagaan dito. Una, may failsafe na timer:
 * kapag hindi natuloy ang paglipat, nawawala pa rin ang kurtina — kung
 * hindi ay maiipit ang buong site sa likod ng panel na hindi umaalis.
 * Ikalawa, tumatakbo lang ito kapag walang prefers-reduced-motion; kapag
 * mayroon, normal na paglipat ang nangyayari at hindi kinakansela ang click.
 */
const SLIDE_IN_MS = 680;
const SLIDE_OUT_MS = 720;
/** Kung wala pa rin sa bagong ruta pagkalipas nito, sapilitang bubuksan. */
const FAILSAFE_MS = 4000;

type Phase = "idle" | "covering" | "leaving";

export default function PageCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const landedOn = useRef<string | null>(null);

  const release = useCallback(() => {
    pendingHref.current = null;
    setPhase("idle");
  }, []);

  // --- 1. Saluhin ang pindot sa panloob na link ---------------------------
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      /* Ang anchor papunta sa loob ng kasalukuyang pahina ay hindi paglipat
         ng ruta — walang dapat takpan doon. */
      if (destination.pathname === window.location.pathname) return;

      event.preventDefault();
      pendingHref.current = destination.pathname + destination.search + destination.hash;
      landedOn.current = window.location.pathname;
      setPhase("covering");
    };

    /* Capture phase, at nakarehistro bago ang RouteScrollReset (nauuna ang
       PageCurtain sa layout) para makansela muna ang click bago mag-scroll. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // --- 2. Kapag tapos nang tumakip, saka maglipat -------------------------
  useEffect(() => {
    if (phase !== "covering") return;
    const timer = setTimeout(() => {
      const href = pendingHref.current;
      if (href) router.push(href);
    }, SLIDE_IN_MS);
    return () => clearTimeout(timer);
  }, [phase, router]);

  // --- 3. Dumating na ang bagong ruta: alisin ang kurtina -----------------
  useEffect(() => {
    if (phase !== "covering") return;
    if (landedOn.current === null || pathname === landedOn.current) return;
    pendingHref.current = null;
    landedOn.current = null;
    setPhase("leaving");
  }, [pathname, phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = setTimeout(() => setPhase("idle"), SLIDE_OUT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  // --- 4. Failsafe --------------------------------------------------------
  useEffect(() => {
    if (phase === "idle") return;
    const timer = setTimeout(release, FAILSAFE_MS);
    return () => clearTimeout(timer);
  }, [phase, release]);

  const transform =
    phase === "covering" ? "translateX(0)" : phase === "leaving" ? "translateX(100%)" : "translateX(-100%)";

  return (
    <div
      aria-hidden="true"
      /* `#173b2a` ang pangunahing green ng site — ito ang laman ng mga dark
         green na section block at ang pinakamadalas na kulay sa buong
         codebase. Dating `#071d13` ito: halos itim na, at halatang hindi
         kapareho ng kulay na iniiwan at binubuksan ng kurtina. */
      className={`${phase === "idle" ? "invisible" : "visible"} pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[#173b2a]`}
      style={{
        transform,
        transition: `transform ${phase === "leaving" ? SLIDE_OUT_MS : SLIDE_IN_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
      }}
    >
      {/* Buong screen ang panel, kaya kaya nitong magdala ng malaking marka.
          Sa 26rem na taas ay 313px ang lapad; 400 ang ibinibigay dito para
          may 800px na entry sa srcset na binubuo ng Next — iyon ang
          kailangan ng mga screen na 2x, kung hindi ay lumalabo ito. */}
      <Image
        src="/camsur-uptown-logo.png"
        alt=""
        width={400}
        height={532}
        priority
        className="h-48 w-auto sm:h-64 lg:h-[22rem] xl:h-[26rem]"
        /* Nakabatay sa SLIDE_IN_MS ang mga oras dito sa halip na naka-hardcode:
           dapat tapos nang lumitaw ang marka bago pa matapos tumakip ang panel.
           Kapag naka-hardcode, tahimik itong naghihiwalay kapag binago ang
           bilis ng kurtina. */
        style={{
          opacity: phase === "covering" ? 1 : 0,
          transform: phase === "covering" ? "scale(1)" : "scale(0.94)",
          transition: [
            `opacity ${Math.round(SLIDE_IN_MS * 0.45)}ms ease-out ${Math.round(SLIDE_IN_MS * 0.25)}ms`,
            `transform ${Math.round(SLIDE_IN_MS * 0.75)}ms cubic-bezier(0.22, 1, 0.36, 1) ${Math.round(SLIDE_IN_MS * 0.15)}ms`,
          ].join(", "),
        }}
      />
    </div>
  );
}
