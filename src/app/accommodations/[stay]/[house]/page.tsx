import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
import AvailabilityRequest from "@/components/AvailabilityRequest";
import { VILLA_DEL_REY_STAYS, villaHouseHref } from "@/lib/villa-del-rey";
import Tr from "@/components/Tr";

/**
 * Availability page ng isang bahay sa Villa Del Rey:
 * /accommodations/villa-del-rey/{villas|cabins|cabana|dwell}.
 *
 * Dito tumuturo ang "Ask about availability" ng bawat bahay — sa homepage
 * (HomeVillaDelRey) at sa /accommodations/villa-del-rey (VillaDelReyStays).
 * Form sa kaliwa, ang napiling bahay sa kanan, at mga button para lumipat
 * sa ibang bahay (bawat isa ay sariling ruta).
 *
 * Villa Del Rey lang ang may mga bahay, kaya iyon lang ang `stay` dito.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return VILLA_DEL_REY_STAYS.map((house) => ({ stay: "villa-del-rey", house: house.slug }));
}

type Params = Promise<{ stay: string; house: string }>;

function findHouse(stay: string, house: string) {
  if (stay !== "villa-del-rey") return undefined;
  return VILLA_DEL_REY_STAYS.find((item) => item.slug === house);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { stay, house: slug } = await params;
  const house = findHouse(stay, slug);
  return house
    ? {
        title: `${house.name} at Villa Del Rey | CamSur Uptown Golf`,
        description: house.description,
      }
    : {};
}

export default async function VillaHousePage({ params }: { params: Params }) {
  const { stay, house: slug } = await params;
  const house = findHouse(stay, slug);
  if (!house) notFound();

  return (
    <>
      <main className="bg-[#f7f5ee] text-[#14271d]">
        <section id="top" className="relative isolate min-h-[380px] overflow-hidden bg-[#1f3f2e] px-6 pb-14 pt-64 text-center text-white sm:min-h-[560px] sm:pb-16 sm:pt-72 lg:px-8">
          <HeroBackdrop src={house.exterior} alt={`${house.name} at Villa Del Rey — ${house.setting}`} />
          <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#e7d18d] xl:text-[11px]">
            Villa Del Rey · Availability
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1] tracking-[-0.05em]">
            <Tr t="Ask about {0}" v={[house.name]} />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/75">
            Share your preferred date and number of guests, and the team will come back to you about availability.
          </p>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        <section className="px-6 pb-24 pt-8 sm:pb-28 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
            {/* FORM — naka-pre-fill ang bahay; ipinapadala bilang
                "Villa Del Rey — {bahay}" para alam ng club kung alin. */}
            <div className="order-last lg:order-first">
              <AvailabilityRequest
                accommodationSlug={`villa-del-rey/${house.slug}`}
                accommodationTitle={`Villa Del Rey — ${house.name}`}
              />
            </div>

            {/* NAPILING BAHAY — sticky sa desktop habang pinupunan ang form. */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                Your selected stay
              </p>
              <div className="mt-4 overflow-hidden rounded-[24px] bg-white shadow-[0_22px_50px_rgba(8,27,18,0.1)]">
                <div className="relative aspect-[4/3] bg-[#1f3f2e]">
                  <Image
                    src={house.exterior}
                    alt={`${house.name} at Villa Del Rey`}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                    {house.setting}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium tracking-[-0.03em]">{house.name}</h2>
                  <p className="mt-3 text-[15px] leading-7 text-[#5d685f]">{house.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {house.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-full border border-[#98782f]/35 px-3 py-1 text-xs font-medium text-[#5d4a1c]"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lumipat ng bahay — bawat button ay sariling ruta. */}
              <p className="mt-8 font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                Choose a different stay
              </p>
              <nav aria-label="Villa Del Rey stays" className="mt-3 grid grid-cols-2 gap-2">
                {VILLA_DEL_REY_STAYS.map((item) => {
                  const isCurrent = item.slug === house.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={villaHouseHref(item.slug)}
                      aria-current={isCurrent ? "page" : undefined}
                      scroll={false}
                      className={`inline-flex h-11 items-center justify-center rounded-full border px-4 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] transition xl:text-[11px] ${
                        isCurrent
                          ? "border-[#1f3f2e] bg-[#1f3f2e] text-[#f3dda0]"
                          : "border-[#1f3f2e]/20 text-[#14271d] hover:border-[#265136] hover:text-[#265136]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
