import Image from "next/image";
import Link from "next/link";

const DESTINATIONS = [
  {
    title: "Dining",
    href: "/dining",
    image: "/dining/clubhouse.webp",
    alt: "Open-air dining at CamSur",
    position: "object-center",
  },
  {
    title: "Experiences",
    href: "/experiences",
    image: "/experiences/wakepark.webp",
    alt: "Wakeboarding at the CamSur Watersports Complex",
    position: "object-center",
  },
  {
    title: "Accommodations",
    href: "/accommodations",
    image: "/villa-del-rey/hero-4k-cropped.jpg",
    alt: "Villa Del Rey accommodation at CamSur",
    position: "object-center",
  },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="m9.5 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function OffCourseSection() {
  return (
    <section className="bg-[#f7f5ee] py-20 text-[#1b2730] sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-8">
        {/* Katabi nito ang PackagesCarousel sa homepage, kaya pareho sila ng
            treatment ng header: eyebrow, naka-kaliwa, at iisang type scale.
            Dating nakagitna ito at walang eyebrow, kaya mukhang galing sa
            ibang pahina. Kapag binago ang isa, sundan ang isa. */}
        <header className="max-w-[760px]">
          <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#5b625f] sm:text-[11px]">
            More at CamSur
          </p>
          <h2 className="mt-5 font-serif text-[clamp(3rem,5vw,5rem)] font-normal leading-[0.96] tracking-[-0.045em]">
            Beyond the Course
          </h2>
          <p className="mt-6 max-w-[620px] text-sm leading-7 text-[#465159] sm:text-[15px]">
            Set the clubs down and discover more of CamSur—from relaxed clubhouse dining and outdoor adventures to comfortable stays close to the fairways.
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-3">
          {DESTINATIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative aspect-[1.08/1] min-h-[250px] overflow-hidden bg-[#20372b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b38c34] sm:min-h-0"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 639px) calc(100vw - 3rem), 352px"
                className={`object-cover ${item.position}`}
              />
              <span
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(5,15,23,0.12)_58%,rgba(5,15,23,0.82)_100%)]"
                aria-hidden="true"
              />
              <span className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 sm:inset-x-6 sm:bottom-6">
                <span className="font-navigation text-base font-bold text-white sm:text-lg">{item.title}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[#18251f]">
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
