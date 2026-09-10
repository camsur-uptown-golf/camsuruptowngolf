import Image from "next/image";

function CourseCompass() {
  return (
    <div className="pointer-events-none absolute right-3 top-[78%] z-20 h-20 w-20 -translate-y-1/2 drop-shadow-[0_6px_14px_rgba(7,29,19,0.28)] sm:right-6 sm:h-24 sm:w-24" aria-hidden="true">
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <circle cx="40" cy="40" r="28" fill="#ffffff" stroke="#173b2a" strokeOpacity="0.38" strokeWidth="1.2" />
        <path d="M40 16 L45 40 L40 35 L35 40 Z" fill="#174630" />
        <path d="M40 64 L45 40 L40 45 L35 40 Z" fill="#173b2a" fillOpacity="0.25" />
        <text x="40" y="12" textAnchor="middle" className="fill-[#174630] text-[12px] font-extrabold">N</text>
        <text x="40" y="77" textAnchor="middle" className="fill-[#85651f] text-[10px] font-extrabold">S</text>
        <text x="73" y="44" textAnchor="middle" className="fill-[#85651f] text-[10px] font-extrabold">E</text>
        <text x="7" y="44" textAnchor="middle" className="fill-[#85651f] text-[10px] font-extrabold">W</text>
      </svg>
    </div>
  );
}

export default function InteractiveCourseMap() {
  return (
    <figure data-reveal="scale" className="relative mx-auto aspect-square w-full max-w-[860px] overflow-hidden bg-transparent">
      <Image
        src="/golf/course-masterplan-latest.png"
        alt="Latest aerial landscape plan of the CamSur Uptown 18-hole golf course"
        fill
        priority
        sizes="(max-width: 1023px) calc(100vw - 3rem), 60vw"
        className="object-cover object-[50%_45%]"
      />
      <CourseCompass />
    </figure>
  );
}
