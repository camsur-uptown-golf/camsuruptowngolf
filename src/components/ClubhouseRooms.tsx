import Image from "next/image";
import Link from "next/link";
import { CLUBHOUSE_SPACES } from "@/lib/clubhouse";

/**
 * Ang mga kuwarto bilang sunod-sunod na full-screen panels.
 *
 * Normal document flow ang bawat panel: walang sticky stage, scroll listener,
 * progress variable, o reversible scrub. Gumagalaw pataas at pababa ang buong
 * panel kasama ng pahina, habang laging buo at mababasa ang caption.
 */

export default function ClubhouseRooms() {
  return (
    <div className="relative w-full bg-[#f7f5ee]">
      {CLUBHOUSE_SPACES.map((space) => (
        <article
          key={space.id}
          id={space.id}
          className="relative min-h-svh scroll-mt-28 overflow-hidden bg-black"
        >
          <div className="relative min-h-svh overflow-hidden bg-black">
            <Image src={space.image} alt={space.imageAlt} fill sizes="100vw" className="object-cover" />

            {/* Palaging nakikita ang scrim at caption. Hindi na binabago ng
                scroll position ang opacity o transform ng alinman sa dalawa. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 78% 82% at 0% 100%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.46) 38%, rgba(0,0,0,0.20) 66%, transparent 92%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.58) 100%)",
              }}
            />

            <div className="absolute inset-x-0 bottom-0">
              <div className="px-6 pb-6 pt-28 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_8px_rgba(0,0,0,0.75),0_4px_20px_rgba(0,0,0,0.5)] sm:px-9 sm:pb-9 sm:pt-32 lg:px-12 lg:pb-12 lg:pt-36">
                {/* Parehong one-time reveal module ng ibang editorial content.
                    Minsan lang itong papasok mula kaliwa; hindi ito nire-reset
                    o binabaligtad kapag nag-scroll pataas. */}
                <div data-reveal="left" className="max-w-2xl">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0d98f] xl:text-[11px]">
                    {space.floor}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl xl:text-4xl">
                    {space.name}
                  </h3>
                  <p className="mt-4 max-w-xl line-clamp-3 text-sm leading-7 text-white/90 xl:text-base xl:leading-8">
                    {space.description}
                  </p>
                  {space.features.length > 0 ? (
                    <ul className="mt-4 flex max-w-2xl flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/85 sm:text-sm">
                      {space.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e7d18d]" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {/* Ang `id` ang slug ng sariling ruta — tingnan ang
                      CLUBHOUSE_SPACES. Nananatili rin itong anchor dito. */}
                  <Link
                    href={`/clubhouse/${space.id}`}
                    className="mt-6 inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-[#e7d18d]/70 bg-black/20 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.12em] text-[#f0d98f] backdrop-blur-[2px] transition-colors hover:border-[#e7d18d] hover:bg-[#e7d18d] hover:text-[#14271d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7d18d] xl:text-[11px]"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
