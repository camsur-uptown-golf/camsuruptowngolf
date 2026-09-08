import Image from "next/image";

function CourseCompass() {
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-20 h-16 w-16 sm:right-5 sm:top-5 sm:h-20 sm:w-20" aria-hidden="true">
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <circle cx="40" cy="40" r="27" fill="#ffffff" fillOpacity="0.92" stroke="#173b2a" strokeOpacity="0.18" />
        <path d="M40 16 L45 40 L40 35 L35 40 Z" fill="#174630" />
        <path d="M40 64 L45 40 L40 45 L35 40 Z" fill="#173b2a" fillOpacity="0.25" />
        <text x="40" y="13" textAnchor="middle" className="fill-[#174630] text-[11px] font-bold">N</text>
        <text x="40" y="76" textAnchor="middle" className="fill-[#98782f] text-[9px] font-bold">S</text>
        <text x="72" y="44" textAnchor="middle" className="fill-[#98782f] text-[9px] font-bold">E</text>
        <text x="8" y="44" textAnchor="middle" className="fill-[#98782f] text-[9px] font-bold">W</text>
      </svg>
    </div>
  );
}

export default function InteractiveCourseMap() {
  return (
    <figure data-reveal="scale" className="relative mx-auto aspect-square w-full max-w-[860px] overflow-hidden bg-transparent">
      <Image
        src="/golf/course-masterplan-revision-2026-course-only-v9-curved-clubhouse.png"
        alt="Aerial masterplan of the 14-hole course with a curved clubhouse and two water features"
        fill
        priority
        sizes="(max-width: 1023px) calc(100vw - 3rem), 60vw"
        className="object-contain p-5 sm:p-8 lg:p-10"
      />
      <CourseCompass />
    </figure>
  );
}
