import ScrollMotion from "@/components/ScrollMotion";
import BackToHeroButton from "@/components/BackToHeroButton";
import ExperiencesActivities from "@/components/ExperiencesActivities";
import { EditorialHeading, Shell } from "@/components/EditorialKit";
import CtaPanel from "@/components/CtaPanel";

/**
 * The Experiences page — ang mga hinahandog sa labas ng golf course.
 *
 * Tatlong pasilidad na lang (hiniling ng club): Wakeboarding, Lago Del Rey at
 * Pickle Ball. Inalis ang Basketball, Massage, ATV, Pump Track, Skate Park,
 * Kiddie Park at Billiards — nasa git history ang dati nilang teksto kung
 * kailangang ibalik. Kapareho ang order ng Highlights sa mega menu
 * (site-content.ts).
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - oras ng bukas, bayad, at kung alin ang kailangang i-book nang maaga
 *  - hinihinging edad, waiver, o gamit sa Wakeboarding
 */

/* Iisang hanay, inaayos nang pataas-pababa ayon sa ibinigay na pagkakasunod.
   May sariling `id` ang bawat hilera bilang in-page anchor. */
const ACTIVITIES = [
  {
    id: "wakepark",
    name: "Wakeboarding",
    image: "/experiences/wakepark-riders.webp",
    href: "https://visitcamsur.com/facilities/wakepark",
    description:
      "A cable wake system over open water, with gear and instruction for first-timers as well as riders working on their own lines.",
  },
  {
    id: "lago-del-rey",
    name: "Lago Del Rey",
    image: "/experiences/lago-del-rey-paddle.webp",
    href: "https://visitcamsur.com/facilities/lagodelrey",
    description:
      "The resort lake at an easy pace — paddle time, open water, and the best light on the property late in the afternoon.",
  },
  {
    id: "pickle-ball",
    name: "Pickle Ball",
    image: "/experiences/pickleball-indoor.webp",
    href: "https://pickleball.camsur.com/",
    description:
      "Courts for the game that takes about ten minutes to learn and considerably longer to stop playing. Covered, well-lit courts keep play going through midday heat and afternoon rain, with room for doubles, drills, and friendly rivalries. The CamSur Pickleball Club runs its own booking and schedule.",
  },
] as const;

/* Pangwakas na CTA: ang shared na berdeng panel (CtaPanel), sa loob ng cream
   para hindi dumikit sa Footer. Kapareho ng lapad ng panel sa /packages at
   /events (`max-w-[1600px]`). */
function ExperiencesCta() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 relative isolate bg-[#f3ede1] text-[#03321b] ">
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <CtaPanel
          reveal
          eyebrow="Beyond golf"
          title="Build the rest of the trip."
          text="Tell the team which of these your group wants and on which days. They will put the schedule together around your tee times rather than against them."
          primary={{ label: "Plan your days", href: "/plan-your-visit" }}
        />
      </div>
    </section>
  );
}

export default function ExperiencesDetails() {
  return (
    <>
      <ScrollMotion />

      {/* Katulad ng EDITORIAL_SECTION_ALT pero pinaliit ang TOP padding lang
          (pt-4 sm:pt-6 kapalit ng py-14 sm:py-16) para mabawasan ang gap sa
          pagitan ng breadcrumb at ng heading. Lokal lang ito sa Experiences —
          hindi hinahawakan ang shared na constant para di maapektuhan ang
          ibang pahina. Pareho pa rin ang bottom padding. */}
      <section className="relative isolate scroll-mt-24 overflow-hidden bg-[#f3ede1] pb-14 pt-4 sm:pb-16 sm:pt-6">
        <Shell>
          <EditorialHeading
            title="More to do between rounds."
            intro="Wakeboarding and pickle ball at CamSur for the active days, and a quiet hour on Lago Del Rey for the slower ones."
            size="lg"
          />
        </Shell>
      </section>

      {/* Normal-flow full-screen panels: walang sticky stage o scroll-scrub.
          Minsan lang pumapasok ang caption at nananatiling visible. */}
      <ExperiencesActivities kicker="Experience" items={ACTIVITIES} />

      <ExperiencesCta />
      <BackToHeroButton />
    </>
  );
}
