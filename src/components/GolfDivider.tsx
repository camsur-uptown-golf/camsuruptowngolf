/**
 * Divider na may disenyong golf — pamalit sa plain na guhit sa pagitan ng mga
 * section na parehong cream ang background.
 *
 * Dalawang manipis na gintong guhit na kumukupas papunta sa gilid, at sa gitna
 * ang maliit na eksena ng putting green: bola, tuldok-tuldok na linya ng putt,
 * butas (cup), at bandila. Gumuguhit pa-labas ang mga guhit pagpasok sa screen
 * (`data-reveal="line"` sa globals.css); umaangat ang bandila.
 *
 * Kapantay ng gutter ng content (px-6 / lg:px-8). `maxWidth`: lapad ng
 * content ng pahina — 1600px sa home at clubhouse, `max-w-7xl` (1280px) sa
 * pahina ng butas. Ang spacing sa itaas/ibaba ay ibinibigay ng magulang sa
 * `className`.
 */
export default function GolfDivider({
  className = "",
  maxWidth = "max-w-[1600px]",
}: {
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div aria-hidden="true" className={`mx-auto ${maxWidth} px-6 lg:px-8 ${className}`}>
      <div className="flex items-end gap-4 sm:gap-6">
        <span
          data-reveal="line"
          className="mb-[5px] h-px flex-1 bg-gradient-to-r from-transparent via-[#98782f]/25 to-[#98782f]/60"
        />
        <svg
          data-reveal="up"
          viewBox="0 0 64 40"
          className="h-9 w-[58px] shrink-0 sm:h-10 sm:w-16"
          fill="none"
        >
          {/* Putting green */}
          <ellipse cx="32" cy="33.5" rx="25" ry="5" fill="#03321b" fillOpacity="0.07" />
          {/* Linya ng putt mula sa bola papunta sa butas */}
          <path
            d="M20.5 31.6 Q 27 29.4 33.2 33"
            stroke="#98782f"
            strokeOpacity="0.7"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="0.1 2.1"
          />
          {/* Bola */}
          <circle cx="17.5" cy="31.6" r="2.7" fill="#fffefa" stroke="#03321b" strokeOpacity="0.45" strokeWidth="0.8" />
          <circle cx="16.8" cy="31" r="0.35" fill="#03321b" fillOpacity="0.3" />
          <circle cx="18.3" cy="31.4" r="0.35" fill="#03321b" fillOpacity="0.3" />
          <circle cx="17.5" cy="32.5" r="0.35" fill="#03321b" fillOpacity="0.3" />
          {/* Butas */}
          <ellipse cx="38" cy="33.5" rx="4.4" ry="1.5" fill="#03321b" fillOpacity="0.75" />
          {/* Tagdan at bandila */}
          <path d="M38 33.2 V 4.5" stroke="#98782f" strokeWidth="1.3" strokeLinecap="round" />
          <path
            d="M38.6 4.6 C 43 3.6 46.5 6.6 51.5 5.4 C 49.4 8 49.6 9.6 51.8 11.8 C 46.6 12.8 43.2 10 38.6 11.4 Z"
            fill="#c8a650"
          />
        </svg>
        <span
          data-reveal="line"
          className="mb-[5px] h-px flex-1 bg-gradient-to-l from-transparent via-[#98782f]/25 to-[#98782f]/60"
        />
      </div>
    </div>
  );
}
