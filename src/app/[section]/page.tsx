import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import GolfDetails from "@/components/GolfDetails";
import ShopExperience from "@/components/ShopExperience";
import VisitDetails from "@/components/VisitDetails";
import { ACCOMMODATIONS, SITE_SECTIONS } from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_SECTIONS.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section: slug } = await params;
  const section = SITE_SECTIONS.find((item) => item.slug === slug);
  return section ? { title: `${section.label} | CamSur Uptown Golf Club`, description: section.description } : {};
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: slug } = await params;
  const section = SITE_SECTIONS.find((item) => item.slug === slug);
  if (!section) notFound();
  const isAccommodations = section.slug === "accommodations";
  const isVisit = section.slug === "visit";
  const isGolf = section.slug === "golf";
  const isShop = section.slug === "shop";

  if (isShop) {
    return (
      <>
        <main>
          <ShopExperience />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main>
        <section id="top" className="relative isolate flex min-h-[660px] items-end overflow-hidden bg-[#071d13] text-white">
          <Image
            src={section.image}
            alt={`${section.label} at CamSur Uptown Golf Club`}
            fill
            priority
            sizes="100vw"
            data-parallax={isVisit ? "-0.06" : undefined}
            className={`-z-20 object-cover ${isVisit ? "parallax-media" : ""}`}
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,22,15,0.62)_0%,rgba(5,22,15,0.2)_45%,rgba(5,22,15,0.88)_100%)]" />
          {isVisit && <FairwayDivider />}
          <div
            className={`mx-auto w-full max-w-7xl px-6 pt-64 lg:px-8 ${isVisit ? "pb-28 sm:pb-36 lg:pb-44" : "pb-16 lg:pb-20"}`}
          >
            <p
              data-reveal={isVisit ? "up" : undefined}
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e1c56e]"
            >
              {section.eyebrow}
            </p>
            <h1
              data-reveal={isVisit ? "up" : undefined}
              style={isVisit ? ({ "--reveal-delay": "110ms" } as CSSProperties) : undefined}
              className="mt-5 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.06em]"
            >
              {section.title}
            </h1>
            <p
              data-reveal={isVisit ? "up" : undefined}
              style={isVisit ? ({ "--reveal-delay": "220ms" } as CSSProperties) : undefined}
              className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg"
            >
              {section.description}
            </p>
          </div>
        </section>

        {isVisit ? <VisitDetails /> : isGolf ? <GolfDetails /> : (
        <section className="bg-[#f7f5ee] py-20 text-[#14271d] sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 border-b border-[#173b2a]/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">Explore {section.label}</p>
                <h2 className="mt-4 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-none tracking-[-0.055em]">
                  {isAccommodations ? "Find the stay that suits your visit." : "See what’s planned."}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#56625b] lg:justify-self-end">
                {isAccommodations
                  ? "Choose the privacy of a course-side Fairway Villa or the convenience of an intimate lodge at the heart of the club."
                  : "A look at the course concepts, experiences, and services planned for CamSur Uptown. Details and availability may change as development progresses."}
              </p>
            </div>

            {isAccommodations ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {ACCOMMODATIONS.map((stay, index) => (
                  <Link
                    key={stay.slug}
                    id={`option-${index + 1}`}
                    href={`/accommodations/${stay.slug}`}
                    className="group overflow-hidden bg-white shadow-[0_14px_34px_rgba(20,45,32,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(20,45,32,0.14)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#173a29]">
                      <Image
                        src={stay.image}
                        alt={`${stay.title} accommodation concept at CamSur Uptown`}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 2.5rem), 608px"
                        className="object-cover transition duration-700 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-6 sm:p-7">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">{stay.eyebrow}</p>
                      <div className="mt-4 flex items-start justify-between gap-5">
                        <div>
                          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em]">{stay.title}</h3>
                          <p className="mt-3 max-w-xl text-sm leading-6 text-[#5d685f]">{stay.description}</p>
                        </div>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/20 transition group-hover:bg-[#174630] group-hover:text-white" aria-hidden="true">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.links.map((link, index) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    id={`option-${index + 1}`}
                    href={link.href}
                    className="group flex min-h-48 flex-col justify-between rounded-[1.4rem] border border-[#173b2a]/12 bg-white p-6 shadow-[0_14px_34px_rgba(20,45,32,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(20,45,32,0.11)]"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a07d30]">{String(index + 1).padStart(2, "0")}</p>
                    <div className="mt-8 flex items-end justify-between gap-5">
                      <h3 className="text-xl font-semibold leading-tight tracking-[-0.035em]">{link.label}</h3>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/20 transition group-hover:bg-[#174630] group-hover:text-white" aria-hidden="true">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        )}
      </main>
      <Footer />
    </>
  );
}
