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
    description: "Holes 1, 2, 3, 4, and 10 form the broad lower course landscape between the clubhouse and Fairway Villas.",
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

export const ACCOMMODATIONS = [
  {
    slug: "fairway-villas",
    image: "/fairway-villas/overview-mt-isarog.png",
    title: "Fairway Villas",
    eyebrow: "Private course-side villas",
    tagline: "Your own place on the fairway.",
    description: "Private one- and two-bedroom villas with open living spaces, plunge pools, and uninterrupted course views.",
    overview: "Fairway Villas combine the privacy of a home with the ease of a resort stay. Every villa opens toward the course, giving couples, families, and golf groups a generous place to gather before an early round and unwind at the end of the day.",
    features: [
      { title: "Indoor-outdoor living", description: "Full-height glass connects the lounge and dining area to a shaded private terrace." },
      { title: "Private plunge pools", description: "A landscaped pool garden gives every stay its own quiet outdoor retreat." },
      { title: "Course-side convenience", description: "The fairway is at the door, with the clubhouse and golf services close by." },
    ],
  },
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
] as const;

export const SITE_SECTIONS = [
  {
    slug: "golf",
    label: "Golf",
    eyebrow: "Golf and clubhouse",
    title: "A landmark clubhouse at the heart of the course",
    description: "A championship golf experience shaped around play, arrival, dining, recovery, and the landscape of Camarines Sur.",
    image: "/clubhouse/clubhouse-hero.jpg",
    links: CONCEPTS.map((concept, index) => ({ label: `Concept ${String(index + 1).padStart(2, "0")} — ${concept.title}`, href: `/golf/${concept.slug}` })),
  },
  {
    slug: "packages",
    label: "Packages",
    eyebrow: "Golf packages",
    title: "Plan a golf trip that fits your schedule",
    description: "Golf, dining, and accommodation combined into packages for weekends, groups, and special occasions.",
    image: "/fairway-villas/overview-mt-isarog.png",
    /* Highlights lang ito, hindi ang buong listahan — anim ang package sa
       PackagesDetails.tsx, dalawa lang ang ipinapakita sa mega menu. Ang
       label at ang slug sa href ay dapat tumugma sa PACKAGES doon. */
    links: [
      { label: "Stay & Play", href: "/packages#stay-and-play" },
      { label: "Weekend Escape", href: "/packages#weekend-escape" },
    ],
  },
  {
    slug: "accommodations",
    label: "Accommodations",
    eyebrow: "Stay at CamSur",
    title: "Two distinctive ways to stay close to the course",
    description: "Choose a private Fairway Villa or the intimate Clubhouse Lodge, both within easy reach of the first tee.",
    image: ACCOMMODATIONS[0].image,
    links: ACCOMMODATIONS.map((stay) => ({ label: stay.title, href: `/accommodations/${stay.slug}` })),
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
  {
    slug: "shop",
    label: "Shop",
    eyebrow: "CamSur Uptown Pro Shop",
    title: "Made for the round ahead",
    description: "Performance golf essentials, personal service, and signature pieces from CamSur Uptown.",
    image: "/camsur-pro-shop.png",
    links: [
      { label: "Course-ready Apparel", href: "/shop#apparel" },
      { label: "Golf Equipment", href: "/shop#equipment" },
      { label: "Player Accessories", href: "/shop#accessories" },
      { label: "Signature Club Gifts", href: "/shop#club-gifts" },
    ],
  },
] as const;

export type SiteSection = (typeof SITE_SECTIONS)[number];
