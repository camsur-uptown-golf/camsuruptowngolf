import { HOLE_PROFILES } from "@/lib/course-holes";

// TODO: palitan ng totoong contact number ng club
export const CLUB_PHONE = { label: "(054) 123 4567", href: "tel:+63541234567" } as const;

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

/** Individual hole pages. Several holes share the same wider routing artwork,
 * but each route exposes only the marker and course information for that hole.
 */
const COURSE_HEADLINE = "A Great Start for CamSur Uptown Golf Club, and for You";

export const COURSE_PAGES = Array.from({ length: 18 }, (_, index) => {
  const hole = index + 1;
  const concept = CONCEPTS.find((item) => item.holes.some((itemHole) => itemHole === hole));

  if (!concept) throw new Error(`Missing course artwork for hole ${hole}`);

  return {
    slug: `course-${String(hole).padStart(2, "0")}`,
    image: concept.image,
    title: COURSE_HEADLINE,
    description: HOLE_PROFILES[hole].description,
    holes: [hole] as const,
    markers: concept.markers.filter((marker) => marker.hole === hole),
  };
});

export const ACCOMMODATIONS = [
  {
    slug: "clubhouse-lodge",
    image: "/clubhouse/clubhouse-hero.jpg",
    title: "Clubhouse Lodge",
    eyebrow: "Boutique golf lodge",
    tagline: "A small lodge at the center of the club.",
    description: "A relaxed lodge within reach of the dining room, the club facilities, and the first tee.",
    overview: "Clubhouse Lodge is the more personal option for golfers and weekend guests. Warm interiors, covered verandas, and a central location make it a practical base for early tee times, long dinners, and unhurried evenings.",
    features: [
      { title: "Close to the clubhouse", description: "Golf services, dining, and the club’s shared spaces are all a few steps away." },
      { title: "Warm, intimate design", description: "Natural wood, local stone, and comfortable lounges give the lodge its character." },
      { title: "Relaxed veranda living", description: "Shaded seating for morning coffee or a quiet end to the day." },
    ],
  },
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

export const SITE_SECTIONS = [
  {
    slug: "golf",
    label: "Golf",
    eyebrow: "Golf and clubhouse",
    title: "A landmark clubhouse at the heart of the course",
    description: "A championship golf experience shaped around play, arrival, dining, recovery, and the landscape of Camarines Sur.",
    image: "/golf-hero-aerial-clean-4k.jpg",
    links: COURSE_PAGES.map((course, index) => ({ label: `No. ${index + 1}`, href: `/golf/${course.slug}` })),
  },
  {
    slug: "packages",
    label: "Packages",
    eyebrow: "Golf packages",
    title: "Plan a golf trip that fits your schedule",
    description: "Golf, dining, and accommodation combined into packages for weekends, groups, and special occasions.",
    image: "/packages-main-hero-option-3-4k-v2.jpg",
    /* Highlights lang ito, hindi ang buong listahan — anim ang package sa
       PackagesDetails.tsx, dalawa lang ang ipinapakita sa mega menu. Ang
       label at ang slug sa href ay dapat tumugma sa PACKAGES doon. */
    links: [
      { label: "Stay & Play", href: "/packages/stay-and-play", image: "/stay-and-play-hero-option-2.png" },
      { label: "Buddy Golf Trip", href: "/packages/buddy-trip", image: "/buddy-golf-trip-hero-v2.png" },
    ],
  },
  {
    slug: "accommodations",
    label: "Accommodations",
    eyebrow: "Stay at CamSur",
    title: "Three distinctive ways to stay in CamSur",
    description: "Choose Clubhouse Lodge, Villa Del Rey, or Gota Village Resort for a stay that fits your CamSur visit.",
    image: ACCOMMODATIONS[0].image,
    links: ACCOMMODATIONS.map((stay) => ({ label: stay.title, href: `/accommodations/${stay.slug}` })),
  },
  /* Ang Experiences at Dining ay tungkol sa hinahandog sa labas ng golf
     course. Hiwalay sila sa halip na isang item na may Dining sa loob:
     sariling dahilan ng pagbisita ang pagkaing Bicol, at ang unang
     hinahanap ng bisita sa nav ay hindi nakatago sa loob ng ibang menu. */
  {
    slug: "experiences",
    label: "Experiences",
    eyebrow: "Beyond the course",
    title: "There is a great deal here that is not golf",
    description: "Wakepark, ATV trails, a bike track, pickle ball courts, and the quieter corners of the resort — for the days between rounds, and for everyone not playing.",
    image: "/gota-village-resort/hero.jpg",
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
    slug: "dining",
    label: "Dining",
    eyebrow: "Bicol cooking",
    title: "Coconut milk, chili, and no translation",
    description: "The food of Camarines Sur served the way the region serves it — Bicol Express, laing, pinangat, and the chili ice cream that ends the meal.",
    image: "/fairway-villas/evening-dining.png",
    links: [
      { label: "Zeach Bar", href: "https://book.visitcamsur.com/cwc/zeach-bar", image: "/dining/zeach-bar.webp" },
      { label: "Clubhouse", href: "https://visitcamsur.com/facilities/clubhouse", image: "/dining/clubhouse.webp" },
    ],
  },
  {
    slug: "visit",
    label: "Visit",
    eyebrow: "Visitor information",
    title: "Everything you need before you arrive",
    description: "Directions, guest information, and club guidelines, so your first visit to CamSur Uptown is straightforward.",
    image: "/course-concepts/concept-07.jpg",
    links: [
      { label: "Directions & Transportation", href: "/visit#getting-here" },
      { label: "Guest Information", href: "/visit#guest-information" },
      { label: "Club Guidelines", href: "/visit#club-guidelines" },
      { label: "Contact the Club", href: "/#contact" },
    ],
  },
  {
    slug: "events",
    label: "Events",
    eyebrow: "Events at CamSur",
    title: "A course-side setting for every occasion",
    description: "Tournaments, corporate days, weddings, and private celebrations, hosted beside the course.",
    image: "/course-concepts/concept-06.jpg",
    links: ["Golf Tournaments", "Corporate Events", "Weddings", "Private Celebrations"].map((label) => ({ label, href: "/events" })),
  },
] as const;

export type SiteSection = (typeof SITE_SECTIONS)[number];
