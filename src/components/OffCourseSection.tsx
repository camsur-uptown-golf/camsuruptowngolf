import Image from "next/image";
import Link from "next/link";

/**
 * Ang mga pintuan palabas ng golf, sa homepage.
 *
 * ANG BILANG AY GALING DITO, HINDI SA GRID. Dining, Experiences at
 * Accommodations ang tatlo dati; inalis ang Dining dahil wala na ito.
 * Kapag may idinagdag o inalis muli, ang `sm:grid-cols-*` sa ibaba at
 * ang `sizes` ng Image ay kailangang sundan — magkatalo sila kung hindi,
 * at maling laki ang pipiliin ng browser sa srcset.
 *
 * Ang `blurb` ay sarili ng bawat isa — dating iisang talata sa itaas ang
 * nagsasalita para sa lahat, kaya walang dalang sariling dahilan ang
 * bawat card.
 *
 * Nakatayo ang hugis ng card (3/4), hindi halos kuwadrado. Nasa tabi ito
 * ng PackagesCarousel na isa nang malaking larawan na may nakapatong na
 * teksto; sa maliliit na card ay parang dalawang magkaibang panahon ang
 * dalawang section.
 */
const DESTINATIONS = [
  {
    title: "Experiences",
    href: "/experiences",
    image: "/experiences/wakepark-aerial.webp",
    alt: "Aerial view of the wakepark lagoon at CamSur, with Mt. Isarog beyond",
    blurb: "Wakepark, ATV, a bike track, and the quieter corners of the resort.",
    position: "object-center",
  },
  {
    title: "Accommodations",
    href: "/accommodations",
    image: "/accommodations/resort-aerial.webp",
    alt: "Aerial view of resort cabins beside the wakepark lagoon at CamSur",
    blurb: "Two resort stays, both within easy reach of the fairways.",
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
      {/* ANG HEADING ANG PANGATLONG HANAY. Nang maging dalawa ang card,
          hindi na nila kayang punan ang 1056px nang hindi lumalaki nang
          518×691 — mga tore na, at halatang may nawalang pangatlo. Dito
          ay sa tabi na ng mga card ang heading, kaya tatlong hanay pa rin
          ang komposisyon at bumalik sa dating sukat ang mga card (334×445
          laban sa 339×452 noong tatlo pa sila).

          Sa ibaba ng `lg` ay nakapatong pa rin ang heading sa mga card —
          walang lugar para sa katabing hanay doon. Kapag naging tatlo
          ulit ang `DESTINATIONS`, ibalik ang heading sa itaas at gawing
          `sm:grid-cols-3` ang mga card; hindi kasya ang tatlo sa 688px. */}
      {/* `max-w-7xl` AT HINDI SARILING LAPAD. Ito ang gutter ng header, ng
          footer, ng breadcrumbs at ng halos lahat ng pahina, kaya tumatapat
          ang kaliwang gilid ng "MORE AT CAMSUR" sa logo sa itaas. Sa
          1120px na dati ay 160px na dagdag na krema ang nasa magkabilang
          gilid at wala itong kalinya. Kapag pinalitan ito, sundan din ang
          PackagesCarousel — magkatabi sila at iisa dapat ang gilid nila.

          Makitid ang kaliwang hanay sa `lg` (260px) at lumuluwang sa `xl`
          (320px): sa 1024px ay 960px lang ang lalagyan, at sa 320px na
          hanay ay nalalagas sa 279px ang mga card — mas maliit pa sa 339px
          noong tatlo pa sila. */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[260px_1fr] lg:gap-12 lg:px-8 xl:grid-cols-[320px_1fr]">
        <header className="max-w-[760px] lg:max-w-none">
          <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] sm:text-[11px]">
            More at CamSur
          </p>
          {/* Maliit ang heading sa `lg` dahil 320px lang ang hanay doon —
              tatlong linya ang 5rem sa ganoong lapad. Buo pa rin ito sa
              mas makikitid na screen, kung saan buong lapad ang header. */}
          <h2 className="mt-5 font-serif text-[clamp(3rem,5vw,5rem)] font-normal leading-[0.96] tracking-[-0.045em] lg:text-[3.25rem]">
            Beyond the Course
          </h2>
          <p className="mt-6 max-w-[620px] text-sm leading-7 text-[#465159] sm:text-[15px] lg:max-w-none">
            Set the clubs down and discover more of CamSur—from wakeboarding and trail riding to comfortable stays close to the fairways.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {DESTINATIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative isolate flex aspect-[3/4] min-h-[380px] flex-col justify-end overflow-hidden bg-[#1f3f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b38c34] sm:min-h-0"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 2.125rem), 448px"
                className={`-z-20 object-cover transition duration-700 ease-out group-hover:scale-[1.04] ${item.position}`}
              />
              {/* Nasa ibaba ang lahat ng teksto, kaya mula sa ibaba ang dilim.
                  Lumalalim ito pag-hover para mabasa ang blurb. */}
              <span
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_28%,rgba(5,15,23,0.28)_52%,rgba(5,15,23,0.88)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(5,15,23,0.18)_0%,rgba(5,15,23,0.52)_48%,rgba(5,15,23,0.94)_100%)]"
                aria-hidden="true"
              />

              <div className="p-6 text-white sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-navigation text-xl font-bold tracking-[-0.01em] sm:text-2xl">{item.title}</h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/22 backdrop-blur-sm transition-colors group-hover:bg-[#e7d18d] group-hover:text-[#18251f]">
                    <ArrowIcon />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/78">{item.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
