import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { T } from "@/components/T";
import type { TranslationKey } from "@/i18n/dictionaries";
import { SITE_SECTIONS, type SiteSection } from "@/lib/site-content";

/**
 * Mga shortcut sa anim na pangunahing section ng site, bilang bento grid.
 *
 * Ang `SITE_SECTIONS` (parehong pinagmulan ng mega menu) ang nagbibigay ng
 * larawan, eyebrow at title, kaya kapag pinalitan ang isang section doon,
 * kusang sumusunod ang card dito.
 *
 * Tatlong istilo ng card para hindi magmukhang paulit-ulit na listahan:
 *   feature — malaking tile ng Golf (2×2), malaking title at gold na CTA
 *   panel   — malapad na tile na may madilim na berdeng panel sa kaliwa
 *   compact — maliit na tile, numero sa itaas at pangalan sa ibaba
 */

type Variant = "feature" | "panel" | "compact";

const LAYOUT: Record<SiteSection["slug"], { variant: Variant; className: string; meta: string }> = {
  golf: { variant: "feature", className: "sm:col-span-2 lg:row-span-2", meta: "18 holes · Par 72" },
  clubhouse: { variant: "panel", className: "sm:col-span-2", meta: "9 spaces · 4 levels" },
  packages: { variant: "compact", className: "", meta: "Stay & Play · Group getaway" },
  events: { variant: "compact", className: "", meta: "Tournaments · Corporate · Private" },
  experiences: { variant: "panel", className: "sm:col-span-1 lg:col-span-2", meta: "10 activities" },
  accommodations: { variant: "panel", className: "sm:col-span-1 lg:col-span-2", meta: "Villa Del Rey" },
};

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bilog na arrow — napupuno ng gold kapag hinover ang card. */
function ArrowDisc({ size = "h-11 w-11" }: { size?: string }) {
  return (
    <span
      className={`${size} inline-flex shrink-0 items-center justify-center rounded-full border border-[#e7d18d]/70 text-[#f0d98f] transition duration-300 group-hover:border-[#e7d18d] group-hover:bg-[#e7d18d] group-hover:text-[#14271d]`}
    >
      <ArrowIcon className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
    </span>
  );
}

function Label({ slug }: { slug: SiteSection["slug"] }) {
  return <T k={`nav.${slug}` as TranslationKey} />;
}

function ExploreCard({ section, index }: { section: SiteSection; index: number }) {
  const { variant, className, meta } = LAYOUT[section.slug];
  const number = String(index + 1).padStart(2, "0");
  const isFeature = variant === "feature";

  return (
    <Link
      href={`/${section.slug}`}
      data-reveal="up"
      style={delay(index * 90)}
      className={`group relative isolate block h-[340px] overflow-hidden rounded-[1.6rem] bg-[#14271d] text-white shadow-[0_18px_44px_rgba(20,39,29,0.14)] outline-none ring-[#e7d18d] transition-shadow duration-500 hover:shadow-[0_26px_60px_rgba(20,39,29,0.26)] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f5ee] lg:h-auto ${
        isFeature ? "sm:h-[460px]" : ""
      } ${className}`}
    >
      <Image
        src={section.image}
        alt=""
        fill
        sizes={isFeature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"}
        className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />

      {variant === "panel" ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,36,25,0.92)_0%,rgba(15,36,25,0.72)_38%,rgba(15,36,25,0.12)_72%,transparent_100%)] transition-opacity duration-500 group-hover:opacity-90"
          />
          <div className="flex h-full max-w-[360px] flex-col justify-between p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="font-navigation text-[11px] font-bold tracking-[0.18em] text-[#e7d18d]">{number}</span>
              <span className="h-px w-8 bg-[#e7d18d]/60 transition-all duration-500 group-hover:w-14" />
              <span className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 xl:text-[11px]">
                {meta}
              </span>
            </div>
            <div>
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0d98f] xl:text-[11px]">
                <Label slug={section.slug} />
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-[-0.03em] xl:text-3xl">
                {section.title}
              </h3>
              <span className="mt-5 inline-flex items-center gap-3 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#f0d98f] xl:text-[11px]">
                <ArrowDisc size="h-10 w-10" />
                <T k="home.explore.cta" />
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,transparent_30%,rgba(0,0,0,0.18)_52%,rgba(10,26,18,0.9)_100%)]"
          />
          <div className="flex h-full flex-col justify-between p-6 sm:p-7 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1.5 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm xl:text-[11px]">
                {meta}
              </span>
              <span
                className={`font-display leading-none tracking-[-0.04em] text-white/85 ${
                  isFeature ? "text-5xl xl:text-6xl" : "text-3xl"
                }`}
              >
                {number}
              </span>
            </div>

            <div className="flex items-end justify-between gap-5">
              <div className={isFeature ? "max-w-xl" : ""}>
                <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0d98f] xl:text-[11px]">
                  {isFeature ? section.eyebrow : <Label slug={section.slug} />}
                </p>
                {isFeature ? (
                  <>
                    <h3 className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-4xl xl:text-5xl">
                      <Label slug={section.slug} />
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-7 text-white/85 xl:text-base">{section.description}</p>
                  </>
                ) : (
                  <h3 className="mt-2 font-display text-xl font-medium leading-tight tracking-[-0.03em] xl:text-2xl">
                    {section.title}
                  </h3>
                )}
              </div>
              <ArrowDisc size={isFeature ? "h-14 w-14" : "h-11 w-11"} />
            </div>
          </div>
        </>
      )}

      {/* Gold na linya sa ibaba na humahaba kapag hinover. */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#e7d18d] transition-all duration-700 ease-out group-hover:w-full"
      />
    </Link>
  );
}

export default function HomeExplore() {
  return (
    <section id="explore" className="bg-[#f7f5ee] text-[#14271d]">
      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-6 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="mb-9 flex flex-col items-center text-center sm:mb-11">
          <p
            data-reveal="up"
            className="font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#98782f] sm:text-xs"
          >
            <T k="home.explore.eyebrow" />
          </p>
          <h2
            data-reveal="up"
            style={{ ...delay(110), fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            className="mt-3 max-w-3xl text-[clamp(2rem,3.4vw,3.5rem)] font-medium leading-[1] tracking-[-0.045em] text-[#17251e]"
          >
            <T k="home.explore.title" />
          </h2>
          <span data-reveal="line" style={delay(220)} className="mt-5 block h-px w-16 bg-[#98782f]/60" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[290px] lg:grid-cols-4 lg:gap-5">
          {SITE_SECTIONS.map((section, index) => (
            <ExploreCard key={section.slug} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
