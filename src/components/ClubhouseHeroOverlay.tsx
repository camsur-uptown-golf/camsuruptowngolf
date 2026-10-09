import HeroWords from "@/components/HeroWords";
import { CLUBHOUSE_FACTS } from "@/lib/clubhouse";

const HERO_FACTS = CLUBHOUSE_FACTS.filter(
  (fact) => fact.label !== "Square metres" && fact.label !== "Levels + rooftop",
);
export default function ClubhouseHeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      <div
        className="absolute inset-x-0 flex justify-center px-6 text-center"
        style={{ bottom: "18vh" }}
      >
        {/* Time-based ang word entrance sa pag-load; hindi ito sinusundan o
            binabaligtad ng scroll position. */}
        <h1 className="max-w-4xl text-balance text-[clamp(2.25rem,4.5vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.055em] text-white [text-shadow:0_3px_28px_rgba(0,0,0,0.5)]">
          <HeroWords text="The Heart of the Course" />
        </h1>
      </div>

      <div
        className="absolute inset-x-0 bottom-4 px-4 sm:bottom-6 sm:px-6 lg:bottom-8 lg:px-8"
      >
        {/* Tatlong fact lang (sinala ang "Square metres" at "Levels + rooftop"),
            kaya `grid-cols-3` sa lahat ng lapad — isang malinis na row. Dati ay
            `grid-cols-2` sa mobile, kaya nag-iisa ang pangatlo sa ibabang row. */}
        <dl className="mx-auto grid max-w-3xl grid-cols-3 overflow-hidden rounded-xl border border-[#d1af58]/25 bg-[#1f3f2e]/85 text-center shadow-[0_16px_44px_rgba(6,26,17,0.32)] backdrop-blur-md">
          {HERO_FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className={`flex min-h-[68px] flex-col justify-center px-2 py-3 sm:min-h-[80px] sm:px-4 ${index > 0 ? "border-l border-[#c9a54e]/15" : ""}`}
            >
              <dt className="font-display text-xl font-medium leading-none tracking-[-0.04em] text-[#f2d98d] sm:text-2xl">
                {fact.value}
              </dt>
              <dd className="mt-1.5 font-navigation text-[8px] font-bold uppercase leading-4 tracking-[0.14em] text-white/60 sm:text-[9px]">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
