import { CLUBHOUSE_SPACES } from "@/lib/clubhouse";
import { HOLE_PROFILES } from "@/lib/course-holes";

/**
 * Mga oras ng pagtawag sa "request a call back".
 *
 * Nandito sila sa shared na lugar dahil kailangan sila ng form at ng
 * /api/callback, at eksaktong string ang ipinagkukumpara ng route — kasama
 * ang en-dash. Kapag may dalawang kopya nito, sapat nang magkaiba ang isang
 * karakter para tahimik na tanggihan ang bawat pasa.
 *
 * Oras sa Pilipinas: nasa Camarines Sur ang club.
 */
export const CALL_WINDOWS = [
  "9:00 AM – 12:00 PM",
  "12:00 – 2:00 PM",
  "2:00 – 4:00 PM",
  "4:00 – 6:00 PM",
] as const;

/* Totoong numero na ito ng club. Ang `href` ay nasa E.164 — `+63` at
   walang unang zero — para tumawag ito nang tama mula sa ibang bansa;
   ang `label` ang lokal na anyo na nakikita ng bumibisita. */
export const CLUB_PHONE = { label: "+63 916 300 7914", href: "tel:+639163007914" } as const;

/* Ibinigay ng club. Isang pinagmumulan lang ito: ginagamit ng footer, ng
   /contact at ng /terms-of-use, kaya hindi sila maaaring maghiwalay.

   PAKITINGNAN: "info.camsuruptowngolf.com" ang naipasa — tuldok, hindi
   "@". Domain iyon at hindi email, kaya hindi gagana ang `mailto:`.
   "info@camsuruptowngolf.com" ang inilagay dito. Kapag mali ang hula,
   dito lang ang palitan. */
export const CLUB_EMAIL = { label: "info@camsuruptowngolf.com", href: "mailto:info@camsuruptowngolf.com" } as const;

/* TODO (para sa club): kumpletuhin ang address — barangay, bayan, at ZIP. */
export const CLUB_ADDRESS = {
  lines: ["CamSur Uptown Golf Club", "Camarines Sur, Philippines"],
} as const;

/**
 * Paano makakarating sa club.
 *
 * DALAWANG LUGAR ANG GUMAGAMIT NITO: ang buong seksyon sa /plan-your-visit
 * at ang maikling listahan sa footer. Nasa isang lugar lang ang mga minuto
 * para hindi sila maghiwalay — kapag nasa dalawang file ang parehong
 * "25 min", isa lang ang naaalala kapag binago ng club.
 *
 * TODO (para sa club): kumpirmahin ang mga travel time bago i-publish.
 */
export const TRAVEL_ROUTES = [
  {
    icon: "plane",
    time: 25,
    unit: "min",
    from: "Naga Airport (Pili)",
    note: "Daily flights from Manila, roughly one hour each way. Taxis and club transfers wait at arrivals.",
  },
  {
    icon: "pin",
    time: 20,
    unit: "min",
    from: "Naga City center",
    note: "Follow the road toward Mt. Isarog and watch for the club gate on your right.",
  },
  {
    icon: "car",
    time: 2,
    unit: "hrs",
    from: "Legazpi City",
    note: "Via the Maharlika Highway. A straightforward drive, best made in daylight.",
  },
] as const;

/**
 * Mga tala sa pagdating, katabi ng mga ruta sa /getting-here.
 *
 * TODO (para sa club): kumpirmahin ang oras ng gate at ang patakaran sa
 * parking bago i-publish.
 */
export const ARRIVAL_NOTES = [
  {
    icon: "parking",
    title: "Parking",
    note: "Free on-site parking beside the clubhouse for guests and visitors. No pass or registration needed.",
  },
  {
    icon: "shuttle",
    title: "Transfers",
    note: "Airport and hotel transfers can be arranged with 24 hours’ notice. Tell the club your flight number and they will meet you at arrivals.",
  },
] as const;

/**
 * Ang FAQ ng club, nakapangkat.
 *
 * MAY SARILING PAHINA ITO (/faq) at isang pindutan sa footer. Hindi ito
 * ipinapakita nang buo sa footer: hindi pahina ng impormasyon ang footer,
 * at labing-isang tanong doon ay pader.
 *
 * DITO NA ANG DATING "Before you enquire" NG /packages. Tatlo sa mga tanong
 * sa "Booking & rates" ang parehong tatlong bagay na nasa ilalim ng
 * /packages noon, nakasulat lang bilang tanong. Inalis na sila roon — isang
 * lugar lang ang sagot para hindi sila maghiwalay.
 *
 * TODO (para sa club): kumpirmahin ang lahat ng nasa ibaba bago i-publish,
 * lalo na ang tatlong araw na abiso sa weekend at ang patakaran sa panahon.
 */
export const FAQ_GROUPS = [
  {
    title: "Booking & rates",
    faqs: [
      {
        question: "How much is a round or a package?",
        answer:
          "Rates are quoted, not listed. Every package is priced on your dates, your group size, and the accommodation you choose, so send those three things and the club comes back with a figure.",
      },
      {
        question: "How far ahead should we book?",
        answer:
          "Weekend mornings fill first because members and their guests have priority, so book at least three days ahead for weekends and public holidays. Weekday rounds and packages can usually be arranged on shorter notice.",
      },
      {
        question: "Can I play if I am not a member?",
        answer:
          "Yes. Visitors are welcome throughout the week. Members and their guests have priority on weekend mornings, so visitor tee times on those days are limited.",
      },
      {
        question: "Can a package be changed to fit our group?",
        answer:
          "Yes. None of the packages are fixed. If the shape is close but the nights or the number of rounds are wrong, say so and the club will rebuild it around you.",
      },
    ],
  },
  {
    title: "On the day",
    faqs: [
      {
        question: "Is a caddie required?",
        answer:
          "Yes, one caddie per bag on every round. Carts and club rental are optional and are reserved together with your tee time.",
      },
      {
        question: "What is the dress code?",
        answer:
          "Collared shirts, tailored shorts or trousers, and soft-spike or spikeless golf shoes. Denim, sleeveless shirts for men, and metal spikes are not permitted on the course.",
      },
      {
        question: "Is there a handicap requirement?",
        answer:
          "No handicap certificate is needed to play. We only ask that first-time and higher-handicap players keep pace with the group in front of them.",
      },
      {
        question: "What happens if play is suspended for weather?",
        answer:
          "If lightning or heavy rain stops play, the siren sounds and every player returns to the clubhouse. The club will rebook your round or settle the unplayed holes with you.",
      },
    ],
  },
  {
    title: "Staying & getting here",
    faqs: [
      {
        question: "Where do guests stay?",
        answer:
          "Villa Del Rey and Gota Village Resort both sit within reach of the course, and a package can be built around either one. Tell the club how many rooms you need and they will hold what fits.",
      },
      {
        question: "Can you arrange airport transfers?",
        answer:
          "Yes. Collection from Naga Airport or from your hotel can be arranged with 24 hours’ notice. Naga Airport is roughly twenty-five minutes from the gate.",
      },
      {
        question: "Is there anything for people who do not play golf?",
        answer:
          "Yes. Partners and family can spend the day around the clubhouse or on the wider CamSur grounds, and the club can put together a separate itinerary alongside your rounds.",
      },
    ],
  },
] as const;

/**
 * "Golf Club" hero clip — direktang 4K MP4 (3840x2160, 60fps, ~20s, 48 MB),
 * naka-compress mula sa 362 MB gamit ang two-pass x264 para kayanin ng web.
 *
 * Lokal na file sa /public, hindi embed, kaya native <video> ang ginagamit at
 * wala nang panlabas na player script. Maikli ang clip kaya natural lang na
 * naglo-loop (walang manu-manong hiwa ang kailangan).
 *
 * Isang bagay lang: walang adaptive streaming ang isang MP4 — pareho ang
 * 4K na natatanggap ng nasa cellphone at ng nasa desktop.
 */
export const TEASER_VIDEO = "/hero-golf-club.mp4";

/** Poster frame ng teaser, para may makita habang naglo-load ang video. */
export const TEASER_POSTER =
  "https://embed-ssl.wistia.com/deliveries/155a533771b5ffe1629b18a44bd44046.jpg?image_crop_resized=1920x1080";

export const CONCEPTS = [
  {
    slug: "concept-01",
    image: "/course-concepts/concept-01-nadir-five-hole-v2.png",
    title: "Five-Hole Landscape",
    description: "Holes 1, 2, 3, 4, and 10 form the broad lower course landscape around the clubhouse.",
    holes: [1, 2, 3, 4, 10],
    markers: [
      { hole: 1, left: "57.8%", top: "89.5%", startLeft: "59%", startTop: "96%" },
      { hole: 2, left: "57.5%", top: "70.3%", startLeft: "58%", startTop: "81.5%" },
      { hole: 3, left: "66.2%", top: "51.2%", startLeft: "61.5%", startTop: "61.5%" },
      { hole: 4, left: "65%", top: "30.1%", startLeft: "65.5%", startTop: "41%" },
      { hole: 10, left: "6.5%", top: "26.6%", startLeft: "10%", startTop: "12%" },
    ],
  },
  {
    slug: "concept-02",
    image: "/course-concepts/concept-02-central-challenge.png",
    title: "Central Challenge",
    description: "Holes 3 and 4 move through a wide central corridor where bunkering and the lake shape every approach.",
    holes: [3, 4],
    markers: [
      { hole: 3, left: "41.6%", top: "78.3%", startLeft: "41.5%", startTop: "92%" },
      { hole: 4, left: "52.4%", top: "22.5%", startLeft: "51.5%", startTop: "37%" },
    ],
  },
  {
    slug: "concept-03",
    image: "/course-concepts/concept-03-peninsula-green.png",
    title: "Peninsula Green",
    description: "Hole 5 occupies a distinct lakeside landform, demanding accuracy from the approach through to the green.",
    holes: [5],
    markers: [{ hole: 5, left: "67.4%", top: "52.9%", startLeft: "77%", startTop: "22%" }],
  },
  {
    slug: "concept-04",
    image: "/course-concepts/concept-04-northern-run.png",
    title: "Northern Run",
    description: "Holes 6, 7, 16, and 17 follow the northern edge in a sequence of sweeping tropical fairways.",
    holes: [6, 7, 16, 17],
    markers: [
      { hole: 6, left: "92.5%", top: "56.6%", startLeft: "87.5%", startTop: "72%" },
      { hole: 7, left: "61.4%", top: "36%", startLeft: "72%", startTop: "49%" },
      { hole: 16, left: "50.8%", top: "61.8%", startLeft: "36%", startTop: "69%" },
      { hole: 17, left: "50.9%", top: "21.1%", startLeft: "39%", startTop: "27%" },
    ],
  },
  {
    slug: "concept-05",
    image: "/course-concepts/concept-05-island-corridor.png",
    title: "Island Corridor",
    description: "Hole 8 threads between connected water edges, with a clear line of play framed by palms and bunkers.",
    holes: [8],
    markers: [{ hole: 8, left: "52%", top: "75.7%", startLeft: "52%", startTop: "91%" }],
  },
  {
    slug: "concept-06",
    image: "/course-concepts/concept-06-lakeside-turn.png",
    title: "Lakeside Turn",
    description: "Holes 9 and 10 cross the heart of the property through compact fairways, bridges, and strategic water.",
    holes: [9, 10],
    markers: [
      { hole: 9, left: "26.8%", top: "47.6%", startLeft: "25%", startTop: "66%" },
      { hole: 10, left: "60.2%", top: "60.2%", startLeft: "77%", startTop: "43%" },
    ],
  },
  {
    slug: "concept-07",
    image: "/course-concepts/concept-07-clubhouse-approach.png",
    title: "Clubhouse Approach",
    description: "Hole 11 begins the return toward the club, bringing the arrival landscape into view beyond the green.",
    holes: [11],
    markers: [{ hole: 11, left: "19.4%", top: "39.4%", startLeft: "17%", startTop: "64%" }],
  },
  {
    slug: "concept-08",
    image: "/course-concepts/concept-08-homeward-pair.png",
    title: "Homeward Pair",
    description: "Holes 12 and 18 frame the clubhouse precinct and bring players back to the social heart of the course.",
    holes: [12, 18],
    markers: [
      { hole: 12, left: "23.3%", top: "70.1%", startLeft: "29%", startTop: "86%" },
      { hole: 18, left: "23.3%", top: "24%", startLeft: "17%", startTop: "40%" },
    ],
  },
  {
    slug: "concept-09",
    image: "/course-concepts/concept-09-western-fairways.png",
    title: "Western Fairways",
    description: "Holes 13 and 14 run along the forest edge, balancing generous turf with water and carefully placed bunkers.",
    holes: [13, 14],
    markers: [
      { hole: 13, left: "45.5%", top: "43.8%", startLeft: "46%", startTop: "72%" },
      { hole: 14, left: "48.6%", top: "16.9%", startLeft: "72%", startTop: "26%" },
    ],
  },
  {
    slug: "concept-10",
    image: "/course-concepts/concept-10-mountain-stretch.png",
    title: "Mountain Stretch",
    description: "Hole 15 opens toward the upper course with the broad ridgeline of Mt. Isarog defining the horizon.",
    holes: [15],
    markers: [{ hole: 15, left: "44.5%", top: "64.3%", startLeft: "44%", startTop: "84%" }],
  },
] as const;

/** Shared editorial headline for the individual hole pages. */
const COURSE_HEADLINE = "A Great Start for CamSur Uptown Golf Club, and for You";
const ROUTING_IMAGE_DIMENSIONS = [
  { width: 2880, height: 1814 },
  { width: 2880, height: 1171 },
  { width: 1440, height: 2880 },
  { width: 1648, height: 2880 },
  { width: 2173, height: 2880 },
  { width: 1360, height: 2880 },
  { width: 1895, height: 2880 },
  { width: 2034, height: 2880 },
  { width: 1672, height: 2880 },
  { width: 1218, height: 2880 },
  { width: 2880, height: 1520 },
  { width: 2880, height: 1879 },
  { width: 2880, height: 1294 },
  { width: 2880, height: 1777 },
  { width: 1348, height: 2880 },
  { width: 2188, height: 2880 },
  { width: 1728, height: 2566 },
  { width: 2880, height: 1532 },
] as const;

export const COURSE_PAGES = Array.from({ length: 18 }, (_, index) => {
  const hole = index + 1;
  const concept = CONCEPTS.find((item) => item.holes.some((itemHole) => itemHole === hole));
  const routingImageDimensions = ROUTING_IMAGE_DIMENSIONS[index];

  if (!concept) throw new Error(`Missing course artwork for hole ${hole}`);
  if (!routingImageDimensions) throw new Error(`Missing routing image dimensions for hole ${hole}`);

  return {
    /* Ang slug ang huling bahagi ng /golf/courses/hole-no.1 … hole-no.18.
       Walang leading zero — "hole-no.1", hindi "hole-no.01".

       May tuldok ito bago ang bilang. Tandaan: ang huling bahagi ng path na
       may tuldok ay mukhang file sa ilang host at proxy, at may naghahain
       ng static file muna bago ang ruta. Kapag may napansing 404 sa
       production na wala sa dev, ito ang unang tingnan — `hole-no-1` ang
       ligtas na anyo. */
    slug: `hole-no.${hole}`,
    image: `/golf/aerial-holes/hole-${String(hole).padStart(2, "0")}-aerial.png`,
    /* Direct PNG exports with routing lines: 1.png = Hole 1, and so on. */
    routingImage: `/golf/official-hole-maps/hole-${String(hole).padStart(2, "0")}-with-lines.png`,
    routingOrientation: routingImageDimensions.width >= routingImageDimensions.height ? "landscape" as const : "portrait" as const,
    routingWidth: routingImageDimensions.width,
    routingHeight: routingImageDimensions.height,
    title: COURSE_HEADLINE,
    description: HOLE_PROFILES[hole].description,
    holes: [hole] as const,
    markers: concept.markers.filter((marker) => marker.hole === hole),
  };
});

export const ACCOMMODATIONS = [
  {
    slug: "villa-del-rey",
    image: "/villa-del-rey/hero-4k-cropped.jpg",
    title: "Villa Del Rey",
    eyebrow: "CamSur resort stay",
    tagline: "A relaxed base for your CamSur visit.",
    description: "A convenient resort option for golf groups, families, and guests exploring Camarines Sur.",
    overview: "Villa Del Rey offers guests a comfortable place to stay within easy reach of CamSur attractions and the wider Uptown experience. Official room details, amenities, and booking information will be added when confirmed.",
    features: [
      { title: "Comfortable stays", description: "Guest spaces planned for restful nights and easy-going days in CamSur." },
      { title: "Group-friendly setting", description: "A practical option for families, friends, and golf groups travelling together." },
      { title: "Convenient access", description: "Positioned as a useful base for exploring the destination and nearby attractions." },
    ],
  },
  {
    slug: "gota-village-resort",
    image: "/gota-village-resort/hero-4k.jpg",
    title: "Gota Village Resort",
    eyebrow: "Nature-side resort stay",
    tagline: "A village retreat shaped by the landscape.",
    description: "A nature-oriented resort option for guests looking to extend their CamSur journey beyond the course.",
    overview: "Gota Village Resort brings guests closer to the natural character of Camarines Sur in a relaxed village setting. Official accommodation details, amenities, and booking information will be added when confirmed.",
    features: [
      { title: "Natural surroundings", description: "A resort setting framed by the distinctive landscape of Camarines Sur." },
      { title: "Relaxed village atmosphere", description: "An easy-going environment for quieter mornings and unhurried evenings." },
      { title: "Extended CamSur experience", description: "A complementary stay for guests combining golf with a wider regional visit." },
    ],
  },
] as const;

/**
 * Bilang bilang salita, para sa mga pamagat na nagsasabi kung ilan.
 * Naiwan na ang "Three" sa Accommodations nang maging dalawa ang listahan.
 */
const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five"] as const;

export const SITE_SECTIONS = [
  {
    slug: "golf",
    label: "Golf",
    eyebrow: "Opening fairway to home green",
    title: "A landmark clubhouse at the heart of the course",
    description: "A championship golf experience shaped around play, arrival, dining, recovery, and the landscape of Camarines Sur.",
    image: "/golf-hero-aerial-clean-4k.jpg",
    links: COURSE_PAGES.map((course, index) => ({ label: `Hole No. ${index + 1}`, href: `/golf/courses/${course.slug}` })),
  },
  /* Kasunod ng Golf: dito natatapos ang round, at ang mga espasyong ito ang
     nakapalibot sa unang tee.

     Diretso sa sariling ruta ang bawat link — `/clubhouse/<id>`. Anchor
     ito dati (`/clubhouse#<id>`) noong walang sariling pahina ang bawat
     espasyo. Nananatili pa rin ang mga anchor sa `/clubhouse` kaya hindi
     nasisira ang lumang link, pero hindi na sila ang tinuturo dito.

     Ang `CLUBHOUSE_SPACES` sa lib/clubhouse.ts ang pinagmulan ng parehong
     listahan. Ang eyebrow at title ay salita sa salita mula sa architectural
     concept ng VM·STUDIO — huwag palitan nang hindi tinitingnan doon. */
  {
    slug: "clubhouse",
    label: "Clubhouse",
    eyebrow: "A landscape that became a clubhouse",
    title: "At the heart of the course",
    description: "A single sculpted volume in four layers — practice and events below, welcome and shop at grade, lounges above, and a bar, pool and gardens on the roof.",
    image: "/clubhouse/concept/aerial-heart-of-the-course.jpg",
    links: CLUBHOUSE_SPACES.map((space) => ({
      label: space.name,
      href: `/clubhouse/${space.id}`,
      image: space.image,
    })),
  },
  {
    slug: "packages",
    label: "Packages",
    eyebrow: "Featured",
    title: "Plan a golf trip that fits your schedule",
    description: "Rounds, accommodation, and transfers combined into packages for weekends, groups, and longer stays.",
    image: "/packages-main-hero-option-3-4k-v2.jpg",
    /* Highlights lang ito, hindi ang buong listahan — anim ang package sa
       PackagesDetails.tsx, dalawa lang ang ipinapakita sa mega menu. Ang
       label at ang slug sa href ay dapat tumugma sa PACKAGES doon. */
    links: [
      { label: "Stay & Play", href: "/packages/stay-and-play", image: "/stay-and-play-hero-option-2.png" },
      { label: "Buddy Golf Trip", href: "/packages/buddy-trip", image: "/buddy-golf-trip-hero-v4.png" },
    ],
  },
  {
    slug: "events",
    label: "Events",
    eyebrow: "Events at CamSur Uptown Golf Club",
    title: "A course-side setting for every occasion",
    description: "Tournaments, corporate days, and private celebrations, hosted beside the course.",
    image: "/clubhouse-rooftop-pool-gardens-clean-4k-v2.png",
    links: ["Golf Tournaments", "Corporate Events", "Private Celebrations"].map((label) => ({ label, href: "/events" })),
  },
  /* Tungkol sa hinahandog sa labas ng golf course. May kasamang Dining
     dito dati bilang hiwalay na section; inalis ito kasama ng /dining. */
  {
    slug: "experiences",
    label: "Experiences",
    eyebrow: "Beyond the course",
    title: "There is a great deal here that is not golf",
    description: "Wakepark, ATV trails, a bike track, pickle ball courts, and the quieter corners of the resort — for the days between rounds, and for everyone not playing.",
    image: "/experiences/banner11-dehazed.jpg",
    /* Isa-isa ang bawat pasilidad dito, hindi ang apat na pangkat: ito ang
       aktwal na hinahanap ng bisita sa menu. Ang bawat anchor ay tumuturo sa
       `id` ng hilera sa ExperiencesDetails.tsx — kapag may binago doon,
       sundan dito. Walang Golf dito: sarili niyang section iyon sa nav. */
    links: [
      /* Ang mga facility ay may sarili nang official external pages. */
      {
        label: "Pickle Ball",
        href: "https://pickleball.camsur.com/",
        image: "/experiences/pickleball.webp",
      },
      { label: "Skate Park", href: "https://visitcamsur.com/facilities/skate-park", image: "/experiences/skate-park.webp" },
      { label: "Bike Track", href: "https://visitcamsur.com/facilities/bike-track", image: "/experiences/bike-track.webp" },
      {
        label: "Playground & Outdoor Basketball Court",
        href: "https://visitcamsur.com/facilities/playground",
        image: "/experiences/playground-basketball.webp",
      },
      { label: "ATV", href: "https://visitcamsur.com/facilities/atv", image: "/experiences/atv.webp" },
      { label: "Kiddie Park", href: "https://visitcamsur.com/facilities/kiddiepark", image: "/experiences/kiddie-park.webp" },
      { label: "Billiards", href: "https://visitcamsur.com/facilities/billiards", image: "/experiences/billiards.webp" },
      { label: "Lago Del Rey", href: "https://visitcamsur.com/facilities/lagodelrey", image: "/experiences/lago-del-rey.webp" },
      { label: "Massage", href: "https://visitcamsur.com/facilities/massage", image: "/experiences/massage.webp" },
      { label: "Wakepark", href: "https://visitcamsur.com/facilities/wakepark", image: "/experiences/wakepark.webp" },
    ],
  },
  {
    slug: "accommodations",
    label: "Accommodations",
    eyebrow: "Stay at CamSur",
    /* Galing sa bilang mismo ng ACCOMMODATIONS: "Three" ang nakasulat dito
       dati at naiwan nang maging dalawa ang listahan. Nakalista rin dati ang
       Clubhouse na wala na. */
    title: `${COUNT_WORDS[ACCOMMODATIONS.length] ?? ACCOMMODATIONS.length} distinctive ways to stay in CamSur`,
    description: `Choose ${ACCOMMODATIONS.map((stay) => stay.title).join(" or ")} for a stay that fits your CamSur visit.`,
    /* Sariling larawan, hindi `ACCOMMODATIONS[0].image`. Ang hero ng Villa
       Del Rey iyon — malayong kuha ng buong resort, at sa 175px na preview
       sa mega menu ay hindi na mabasa kung ano ang tinitingnan.

       Ito ang "Villas" (stay option 04) sa `VillaDelReyStays.tsx` — isang
       villa at ang sariling pool nito, kaya may makikitang tunay na tuluyan
       kahit maliit ang card. Kung papalitan, pumili ng malapitang kuha at
       hindi ng aerial.

       ANG 4K ANG GINAGAMIT DITO, HINDI ANG MALIIT NA KOPYA. Dalawa ang
       kumukuha ng field na ito: ang 175px na preview sa mega menu at ang
       buong-lapad na hero ng /accommodations, na `sizes="100vw"` at
       `priority`. Sa 900px na kopya ay malinaw ang preview pero malabo
       ang hero. Ang `sizes="220px"` ng mega menu ang bahalang pumili ng
       maliit na entry sa srcset — iyon naman ang trabaho ng next/image. */
    image: "/villa-del-rey/stays/villa-pool-4k.jpg",
    links: ACCOMMODATIONS.map((stay) => ({ label: stay.title, href: `/accommodations/${stay.slug}` })),
  },
] as const;

export type SiteSection = (typeof SITE_SECTIONS)[number];
