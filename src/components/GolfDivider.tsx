/**
 * Divider na may disenyong golf — pamalit sa plain na guhit sa pagitan ng mga
 * section na parehong cream ang background.
 *
 * Dalawang manipis na gintong guhit na kumukupas papunta sa gilid, at sa gitna
 * ang maliit na eksena ng putting green: bola, tuldok-tuldok na linya ng putt,
 * butas (cup), at bandila. Gumuguhit pa-labas ang mga guhit pagpasok sa screen
 * (`data-reveal="line"` sa globals.css); umaangat ang bandila — PERO lang
 * kapag `reveal` at may <ScrollMotion /> ang pahina. Kung wala ang
 * ScrollMotion, nakatago (opacity 0) ang lahat ng data-reveal habambuhay,
 * kaya naka-off ito bilang default (hal. /members ay walang ScrollMotion).
 *
 * Kapantay ng gutter ng content (px-6 / lg:px-8). `maxWidth`: lapad ng
 * content ng pahina — 1600px sa home at clubhouse, `max-w-7xl` (1280px) sa
 * pahina ng butas. Ang spacing sa itaas/ibaba ay ibinibigay ng magulang sa
 * `className`.
 */
export default function GolfDivider({
  className = "",
  maxWidth = "max-w-[1600px]",
  reveal = false,
}: {
  className?: string;
  maxWidth?: string;
  reveal?: boolean;
}) {
  /* Inalis ang guhit at bandila (Nob 2026) — puwang na lang ang natitira,
     para hindi magbago ang espasyo sa pagitan ng mga section. */
  void maxWidth;
  void reveal;
  return <div aria-hidden="true" className={className} />;
}
