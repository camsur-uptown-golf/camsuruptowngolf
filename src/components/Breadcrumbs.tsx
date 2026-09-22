"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trailFor } from "@/lib/breadcrumbs";

/**
 * Ang landas papunta sa kasalukuyang pahina.
 *
 * ANG BUONG PUNTO NITO AY HUWAG MAPANSIN. Dalawang bersyon ang tinanggihan
 * bago ito, at ito ang natutunan sa kanila:
 *
 *   1. Nakapatong sa hero, sa ilalim mismo ng nav — nakikipag-agawan ito
 *      ng pansin sa marka at sa nav sa pinakataas ng pahina.
 *   2. Banda sa ilalim ng hero na may `border-b` — mukhang UI bar ito,
 *      banyaga sa editorial na disenyo ng site, at naghahati ng pahina sa
 *      isang guhit na walang ibang katulad dito.
 *
 * Kaya WALANG GUHIT dito, walang sariling background, at mahina ang
 * kulay. Teksto lang na nakalutang sa espasyo sa itaas ng unang section,
 * nasa parehong gutter ng nav (max-w-7xl) para mukhang sinadya at hindi
 * maling sukat. Kapag may nagdagdag ng `border`, `bg`, o naglaki ng
 * kulay dito, bumabalik ito sa bersyon 2.
 *
 * WALANG BREADCRUMB SA `/`: walang landas ang ugat, at `trailFor` ang
 * nagsasabi niyon sa pamamagitan ng walang lamang array.
 *
 * KASAMA ANG JSON-LD: ito ang pangunahing dahilan kung bakit may
 * breadcrumb ang isang site — nababasa ito ng search engine at
 * ipinapakita bilang landas sa resulta, hindi lang bilang URL.
 */
export default function Breadcrumbs() {
  const pathname = usePathname();
  const trail = trailFor(pathname);
  if (trail.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      /* Walang `item` ang huli: ito na ang pahinang binabasa, at iyon ang
         inirerekomenda ng schema.org para sa dulo ng landas. */
      ...(index < trail.length - 1 ? { item: crumb.href } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2.5 gap-y-1 px-6 pb-2 pt-10 font-navigation text-[13px] font-medium tracking-[0.01em] text-[#7f8a82] sm:pt-12 lg:px-8">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2.5">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-[#b4bcb5]">
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span aria-current="page" className="text-[#5d685f]">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="underline-offset-4 transition-colors hover:text-[#2f644b] hover:underline"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
