import Image from "next/image";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, delay } from "@/components/SectionKit";

/**
 * Ang architectural concept ng clubhouse. Nakalagay ito sa Clubhouse Lodge
 * accommodation page dahil doon nakatira ang bisitang tinutukoy nito.
 *
 * Kasama ang <ScrollMotion /> dito: ang data-reveal ay nakatago sa CSS
 * hangga't walang naglalagay ng .is-in, kaya kung mawawala ang motion driver
 * ay mananatiling blangko ang buong section na ito.
 */

const FEATURES = [
  {
    title: "A considered arrival",
    description: "A sheltered drop-off and bronze-clad entrance create a calm transition from the course to the club.",
    image: "/clubhouse/arrival.jpg",
    alt: "Architectural concept of the sheltered clubhouse arrival",
  },
  {
    title: "The welcome hall",
    description: "A planted oculus brings daylight into a flowing reception space with uninterrupted fairway views.",
    image: "/clubhouse/welcome-hall.jpg",
    alt: "Architectural concept of the clubhouse welcome hall",
  },
  {
    title: "The golf shop",
    description: "Walnut joinery, soft daylight, and gallery-like displays give equipment and apparel room to breathe.",
    image: "/clubhouse/pro-shop.jpg",
    alt: "Architectural concept of the clubhouse golf shop",
  },
  {
    title: "Members’ lounge",
    description: "Curved seating and a quiet coffee bar open toward the water and course for an easy finish to the round.",
    image: "/clubhouse/members-lounge.jpg",
    alt: "Architectural concept of the members lounge overlooking the course",
  },
  {
    title: "Practice bays",
    description: "Open-air bays connect launch-monitor technology and fitted clubs directly to the practice ground.",
    image: "/clubhouse/practice-bays.jpg",
    alt: "Architectural concept of the open-air golf practice bays",
  },
  {
    title: "Rooftop garden",
    description: "Dining, planted terraces, and sculptural canopies turn the roof into an evening destination above the course.",
    image: "/clubhouse/rooftop-garden.jpg",
    alt: "Architectural concept of rooftop dining and gardens at sunset",
  },
] as const;

const STATS = [
  ["2,695 m²", "Total clubhouse area"],
  ["300", "Player lockers"],
  ["4", "Connected levels"],
  ["1", "Continuous roof"],
] as const;

export default function ClubhouseVision() {
  return (
    <section id="clubhouse" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
      <ScrollMotion />
      <Container>
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p data-reveal="up" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">
              The clubhouse
            </p>
            <h2 data-reveal="up" style={delay(90)} className="mt-3 text-[clamp(2.25rem,3.5vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.05em]">
              Architecture that continues the landscape.
            </h2>
          </div>
          <p data-reveal="up" style={delay(180)} className="text-sm leading-7 text-[#5d685f]">
            The architectural concept follows the curves of the fairway with layered terraces, deep shade, and a
            continuous glass edge. Bronze, travertine, walnut, and planting give every part of the club one warm,
            cohesive character.
          </p>
        </div>

        <div data-reveal="scale" className="relative mt-10 aspect-[16/9] overflow-hidden bg-[#173a29]">
          <Image
            src="/clubhouse/clubhouse-aerial.jpg"
            alt="Aerial architectural concept of the CamSur Uptown clubhouse, pool, and surrounding course"
            fill
            sizes="(max-width: 1023px) calc(100vw - 3rem), 896px"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 border-b border-[#173b2a]/12 sm:grid-cols-4">
          {STATS.map(([value, label], index) => (
            <div
              key={label}
              data-reveal="up"
              style={delay(index * 70)}
              className={`py-5 text-center ${index % 2 ? "border-l border-[#173b2a]/12" : ""} ${index > 1 ? "border-t border-[#173b2a]/12 sm:border-t-0" : ""} ${index > 0 ? "sm:border-l sm:border-[#173b2a]/12" : ""}`}
            >
              <p className="text-lg font-semibold tracking-[-0.03em] text-[#174630]">{value}</p>
              <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#98782f]">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <article key={feature.title} data-reveal="up" style={delay((index % 2) * 80)}>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#173a29]">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 2.5rem), 438px"
                  className="object-cover transition duration-700 hover:scale-[1.025]"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[#174630]">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#667269]">{feature.description}</p>
            </article>
          ))}
        </div>

        <p className="mt-9 border-t border-[#173b2a]/12 pt-5 text-[10px] leading-5 text-[#8a938c]">
          Architectural concept imagery and programme information are based on the June 2026 presentation and may be
          refined as design development continues.
        </p>
      </Container>
    </section>
  );
}
