import { Fragment } from "react";
import type { CSSProperties } from "react";

/**
 * WORD-BY-WORD na pagpasok ng isang hero title.
 *
 * Hinahati ang `text` sa mga salita at binabalot bawat isa sa `.hero-word`
 * (globals.css) — umaangat, kumukupas-papasok, naglilinaw mula sa blur, isa-isa
 * ayon sa `animationDelay` (base `startDelay` + `step` kada salita).
 *
 * Nasa mga salita ang entrance, kaya ligtas itong ipasok sa loob ng isang <h1>
 * na may sariling scroll-driven na galaw (hal. `data-hero-logo`) — hindi
 * nagbabanggaan: isang beses ang word-by-word, tuloy-tuloy ang kupas-sa-scroll
 * ng magulang. Ang " " na text node sa pagitan ng mga span ay breakable space,
 * kaya nananatili ang natural (multi-line) na wrap at ang `text-balance`.
 */
export default function HeroWords({
  text,
  startDelay = 40,
  step = 40,
}: {
  text: string;
  /** ms bago pumasok ang unang salita (pagkaupo ng hero image). */
  startDelay?: number;
  /** dagdag na ms kada sunod na salita. */
  step?: number;
}) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? " " : null}
          <span
            className="hero-word"
            style={{ animationDelay: `${startDelay + index * step}ms` } as CSSProperties}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </>
  );
}
