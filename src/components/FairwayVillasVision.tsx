import Image from "next/image";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, delay } from "@/components/SectionKit";

const FEATURES = [
  {
    title: "A terrace facing the course",
    description: "A shaded outdoor room gives every villa a front-row view of the fairway and Mt. Isarog beyond.",
    image: "/fairway-villas/private-terrace.png",
    alt: "Private Fairway Villa terrace overlooking the golf course and Mt. Isarog",
  },
  {
    title: "Living that opens outward",
    description: "Full-height glass connects the lounge, dining area, and garden into one generous place to gather.",
    image: "/fairway-villas/living-room.png",
    alt: "Open-plan Fairway Villa living room with a panoramic golf course view",
  },
  {
    title: "Quiet rooms, open views",
    description: "Warm timber, soft natural materials, and a private terrace create a calm retreat after the round.",
    image: "/fairway-villas/bedroom-suite.png",
    alt: "Fairway Villa bedroom suite opening to a private terrace",
  },
  {
    title: "A pool of your own",
    description: "Each garden is planned as a private outdoor escape with a plunge pool, planting, and space to slow down.",
    image: "/fairway-villas/plunge-pool.png",
    alt: "Private plunge pool and tropical garden beside a Fairway Villa",
  },
  {
    title: "The day ends at your table",
    description: "Private dining on the terrace turns the hours after golf into an easy evening shared with family or friends.",
    image: "/fairway-villas/evening-dining.png",
    alt: "Guests sharing dinner on a Fairway Villa terrace at sunset",
  },
] as const;

const STATS = [
  ["2-4", "Guests"],
  ["1-2", "Bedrooms"],
  ["Private", "Plunge pool"],
  ["Course-side", "Setting"],
] as const;

export default function FairwayVillasVision() {
  return (
    <section id="villa-details" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f4f0e6] py-14 text-[#14271d] sm:py-16">
      <ScrollMotion />
      <Container>
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p data-reveal="up" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">
              Fairway Villas
            </p>
            <h2 data-reveal="up" style={delay(90)} className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
              Your own place on the fairway.
            </h2>
          </div>
          <p data-reveal="up" style={delay(180)} className="text-sm leading-7 text-[#5d685f]">
            A quiet collection of private villas shaped for golf trips, family weekends, and longer stays. The
            architecture carries the clubhouse palette into a more intimate setting, with warm stone, timber,
            bronze details, and rooms that open directly to the landscape.
          </p>
        </div>

        <div data-reveal="scale" className="relative mt-10 aspect-[16/9] overflow-hidden bg-[#173a29]">
          <Image
            src="/fairway-villas/overview.png"
            alt="Overview of private Fairway Villas beside the golf course with Mt. Isarog in the distance"
            fill
            sizes="(max-width: 1023px) calc(100vw - 3rem), 896px"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 border-b border-[#173b2a]/15 sm:grid-cols-4">
          {STATS.map(([value, label], index) => (
            <div
              key={label}
              data-reveal="up"
              style={delay(index * 70)}
              className={`py-5 text-center ${index % 2 ? "border-l border-[#173b2a]/15" : ""} ${index > 1 ? "border-t border-[#173b2a]/15 sm:border-t-0" : ""} ${index > 0 ? "sm:border-l sm:border-[#173b2a]/15" : ""}`}
            >
              <p className="text-lg font-semibold tracking-[-0.03em] text-[#174630]">{value}</p>
              <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#98782f]">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              data-reveal="up"
              style={delay((index % 2) * 80)}
              className={index === FEATURES.length - 1 ? "sm:col-span-2" : undefined}
            >
              <div className={`relative overflow-hidden bg-[#173a29] ${index === FEATURES.length - 1 ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes={index === FEATURES.length - 1 ? "(max-width: 1023px) calc(100vw - 3rem), 896px" : "(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 2.5rem), 438px"}
                  className="object-cover transition duration-700 hover:scale-[1.025]"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-[-0.02em] text-[#174630]">{feature.title}</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#5d685f]">{feature.description}</p>
            </article>
          ))}
        </div>

        <p className="mt-9 border-t border-[#173b2a]/15 pt-5 text-[10px] leading-5 text-[#7b847e]">
          Fairway Villas imagery, occupancy, and amenities are part of the current accommodation concept and may be
          refined as planning continues.
        </p>
      </Container>
    </section>
  );
}
