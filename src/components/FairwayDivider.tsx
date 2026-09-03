/**
 * Rolling fairway ridges that carry the hero image down into the white
 * section below, instead of cutting it off with a hard horizontal edge.
 *
 * Magkakaiba ang hugis ng tatlong ridge — hindi lang magkapatong na
 * pareho — dahil kung magkatulad sila ay parang guhit-guhit sa halip na
 * burol. Ang ginintuang linya ay parang mowing line sa gilid ng green.
 *
 * Isang puting hole flag ang nakatayo sa crest sa kanan.
 *
 * Ang preserveAspectRatio="none" ang nag-uunat sa mga burol sa buong
 * lapad — ligtas iyon dahil malalambot na kurba lang sila. Ang stroke ay
 * may non-scaling-stroke kaya hindi nagbabago ang kapal ng linya, at
 * hiwalay na SVG ang flag kaya hindi ito nabubaluktot.
 */

/* The flag stands on a crest of the front ridge, which is drawn in a
   1440x140 viewBox. A point (x, y) on that path maps to left = x/1440 and
   bottom = 1 - y/140, kahit anong lapad ng screen, dahil proporsyonal ang
   pag-unat ng preserveAspectRatio="none".

   Kapag binago ang front path, i-update ang crest na ito. */

/* Right crest at (1150, 64). */
const PIN_LEFT = "79.9%";
const PIN_BOTTOM = "54.3%";

export default function FairwayDivider() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
      <div className="relative h-[70px] w-full sm:h-[100px] lg:h-[124px]">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
          <path
            d="M0,74 C180,58 320,16 520,28 C700,39 800,74 940,64 C1090,54 1250,24 1440,46 L1440,140 L0,140 Z"
            fill="#ffffff"
            fillOpacity="0.18"
          />
          <path
            d="M0,98 C160,88 300,32 480,38 C650,44 700,90 840,88 C1000,86 1120,42 1290,52 C1372,57 1412,66 1440,72 L1440,140 L0,140 Z"
            fill="#ffffff"
            fillOpacity="0.44"
          />
          <path
            d="M0,109 C120,107 260,49 430,43 C600,37 640,89 760,91 C900,93 1000,53 1150,55 C1280,57 1370,81 1440,83"
            stroke="#e7d18d"
            strokeOpacity="0.55"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0,118 C120,116 260,58 430,52 C600,46 640,98 760,100 C900,102 1000,62 1150,64 C1280,66 1370,90 1440,92 L1440,140 L0,140 Z"
            fill="#ffffff"
          />
        </svg>

        {/* Hole flag. Puti ito at tumatawid sa dalawang puting translucent na
            ridge, kaya kailangan ng anino — kung wala ito ay nawawala ang
            poste sa mas maliwanag na bahagi. */}
        <svg
          viewBox="0 0 26 46"
          fill="none"
          className="absolute h-9 w-auto drop-shadow-[0_1px_5px_rgba(7,29,19,0.5)] sm:h-11 lg:h-12"
          style={{ left: PIN_LEFT, bottom: PIN_BOTTOM }}
        >
          <path d="M5 46V4" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5.9 4.6 20.5 9.4 5.9 14.2Z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}
