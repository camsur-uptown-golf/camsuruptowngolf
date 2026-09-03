// TODO: palitan ng totoong contact number ng club
export const CLUB_PHONE = { label: "(054) 123 4567", href: "tel:+63541234567" } as const;

export const CONCEPTS = [
  { slug: "concept-01", image: "/course-concepts/concept-01.jpg", title: "Aerial Overview", description: "A full view of the property, showing how the fairways, water, and open land fit together." },
  { slug: "concept-02", image: "/course-concepts/concept-02.jpg", title: "Championship Design", description: "Wide landing areas, well-placed hazards, and clear routing that rewards good decisions." },
  { slug: "concept-03", image: "/course-concepts/concept-03.jpg", title: "Stay & Play", description: "The course, the rooms, and the dining in one place, so a golf trip takes less planning." },
  { slug: "concept-04", image: "/course-concepts/concept-04.jpg", title: "Lakeside Golf", description: "Holes that run along the water, where every tee shot asks for a decision." },
  { slug: "concept-05", image: "/course-concepts/concept-05.jpg", title: "Golden Hour Golf", description: "Late-afternoon light across open ground, the best time of day for a round here." },
  { slug: "concept-06", image: "/course-concepts/concept-06.jpg", title: "Waterfront Greens", description: "Greens shaped beside calm water, where accuracy matters more than distance." },
  { slug: "concept-07", image: "/course-concepts/concept-07.jpg", title: "The Championship Course", description: "A full-length layout that tests low handicaps without discouraging newer players." },
  { slug: "concept-08", image: "/course-concepts/concept-08.jpg", title: "Signature Green", description: "Bold contours and deep bunkering make this the hole most guests will remember." },
  { slug: "concept-09", image: "/course-concepts/concept-09.jpg", title: "Clubhouse & Community", description: "The clubhouse, dining, and social spaces that turn a round into a full day." },
  { slug: "concept-10", image: "/hero-4k.png", title: "The Mt. Isarog Setting", description: "Championship golf framed by the mountain that defines the Camarines Sur skyline." },
] as const;

export const ACCOMMODATIONS = [
  {
    slug: "fairway-villas",
    image: "/fairway-villas/overview.png",
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
    image: "/course-concepts/concept-05.jpg",
    links: ["Stay & Play Packages", "Weekend Packages", "Group Getaways", "Corporate Golf", "Seasonal Offers"].map((label) => ({ label, href: "/packages" })),
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
