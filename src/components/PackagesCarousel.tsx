import Image from "next/image";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PackagesCarousel() {
  return (
    <section id="home-packages" className="bg-[#f7f5ee] py-20 text-[#1b2730] sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16 lg:px-8 xl:gap-20">
        <div className="lg:pt-2">
          <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#5b625f] sm:text-[11px]">
            Packages
          </p>
          <h2 className="mt-5 font-serif text-[clamp(3rem,5vw,5rem)] font-normal leading-[0.96] tracking-[-0.045em]">
            CamSur Golf
            <br />
            Packages
          </h2>
          <p className="mt-6 max-w-[410px] text-sm leading-7 text-[#465159] sm:text-[15px]">
            Whether you are planning a quick round, a one-night escape, or a golf trip with friends, our packages make it easy to play and stay at CamSur Uptown.
          </p>
          <Link
            href="/packages"
            className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#2f644b] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#3a765a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f644b]"
          >
            Explore packages
            <ArrowIcon />
          </Link>
        </div>

        <div className="relative pb-[18%] sm:pb-[16%]">
          <div className="relative aspect-[1.48/1] w-[86%] overflow-hidden bg-[#dfe4df]">
            <Image
              src="/buddy-golf-trip-hero-v2.png"
              alt="Friends enjoying a golf getaway at CamSur Uptown Golf Club"
              fill
              sizes="(max-width: 1023px) 86vw, 660px"
              className="object-cover object-center"
            />
          </div>

          <div className="absolute bottom-0 right-0 aspect-[1.08/1] w-[42%] border-[6px] border-[#f7f5ee] bg-[#d9ded8] sm:border-[8px]">
            <Image
              src="/stay-and-play-hero-option-2.png"
              alt="Stay and Play golf package at CamSur Uptown"
              fill
              sizes="(max-width: 1023px) 42vw, 330px"
              className="object-cover object-[74%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
