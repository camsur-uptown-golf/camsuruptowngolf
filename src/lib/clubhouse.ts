/**
 * Ang architectural concept ng clubhouse.
 *
 * Dalawang dokumento ang pinagmulan, pareho mula sa VM·STUDIO:
 *
 *   A. "26.04.24 — Golf Club — Zoning", 20 pahina. Mas maagang phase:
 *      brief ng kliyente, approach, sun study, at tatlong layout study
 *      (A, B, C) — Layout A ang inirekomenda.
 *   B. "26.06.16 — Golf Club — Architectural Concept — VMS", 61 pahina.
 *      Ito ang mas bago at ito ang susundan sa anumang pagsasalungat.
 *
 * HALIMBAWA ng pagsasalungat: ~800 m² sa dalawang palapag at annex ang
 * sabi ng massing study sa (A); 2,695 m² sa tatlong palapag ang area
 * schedule sa (B). Hindi nakalagay sa pahina ang 800 m² — lipas na ito.
 *
 * Walang naimbento dito. Kapag hindi sinasabi ng dokumento ang isang
 * bagay — oras ng bukas, bayad, patakaran sa kasuotan, petsa ng pagbukas
 * — wala rin itong sinasabi. Ang mga numero ay tumutugma sa area schedule
 * sa pahina 22 ng (B); napatunayan ang bawat subtotal at ang kabuuan.
 *
 * KONSEPTO ito, hindi as-built. Kapag nagbago ang disenyo, ang dokumento
 * ang susundan, hindi ang pahina.
 */

/**
 * Ang nagdisenyo.
 *
 * Sinadyang wala rito ang email at telepono ng studio na nasa huling
 * pahina ng zoning deck: kontak iyon ng ibang negosyo, at hindi ito ang
 * lugar para ilathala. Ang website ang sapat na paraan para mahanap sila.
 */
export const CLUBHOUSE_DESIGNER = {
  name: "VM·STUDIO",
  disciplines: "Architecture · Interiors · Landscape",
  practice: "Concept architecture, interiors and transportation",
  based: "London — worldwide collaborations",
  website: "vojtekmorsztyn.com",
  websiteHref: "https://www.vojtekmorsztyn.com",
  project: "Golf Club · Philippines · 2026",
} as const;

/**
 * Ang paalala na konsepto pa ito.
 *
 * Nasa isang lugar ito dahil kailangan ito saanman lumitaw ang mga numero
 * ng disenyo — at mahalagang sabihin kung alin sa dalawang dokumento ang
 * mas bago, dahil may ~800 m² na massing study sa zoning deck na
 * napalitan na ng 2,695 m² sa concept.
 */
export const CLUBHOUSE_CONCEPT_NOTE =
  "This page is drawn from two VM·STUDIO documents for Golf Club · Philippines · 2026 — the zoning and massing study of April 2026, and the architectural concept of June 2026, which supersedes it. Both are design concepts, not an as-built record: rooms, areas and finishes may change as the club is built.";

/** Layunin ng kliyente, salita sa salita mula sa zoning deck (p. 2). */
export const CLUBHOUSE_CLIENT_BRIEF =
  "A world-class golf clubhouse that functions as the central social and sporting hub of the golf development — with panoramic views of the course, comfortable social spaces, and a clear architectural identity inspired by Filipino and tropical Asian architecture.";

/** "OUR APPROACH" at "DESIGN INTENT" sa pahina 3 ng zoning deck. */
export const CLUBHOUSE_APPROACH = [
  {
    label: "Our approach",
    text: "A contemporary golf destination shaped by the natural flow of the landscape. Architecture is integrated into the terrain, creating a seamless relationship between built form, movement, and views — balancing openness, social interaction, and spatial clarity.",
  },
  {
    label: "Context",
    text: "Materiality and orientation respond to the site, ensuring a timeless and efficient design.",
  },
  {
    label: "Design intent",
    text: "A cohesive, landscape-driven architecture that enhances the guest experience.",
  },
] as const;

/** Pangalan ng mood board sa pahina 7 ng zoning deck. */
export const CLUBHOUSE_MOOD = "Organic warmth";

/** Ang design statement, salita sa salita mula sa "THE BRIEF". */
export const CLUBHOUSE_BRIEF =
  "Not a building beside the course, but a continuation of the landscape — a clubhouse that golfers move through rather than simply enter.";

/** "THE ESTATE" sa pahina 11, at ang lockers sa pahina 33. */
export const CLUBHOUSE_FACTS = [
  { value: "4", label: "Lakes" },
  { value: "3", label: "Floors, plus a roof" },
  { value: "9", label: "Main areas" },
  { value: "300", label: "Lockers" },
  { value: "2,695", label: "Square metres" },
] as const;

/**
 * "THE STACK" — apat na mundo sa isang volume (pahina 16).
 *
 * Tatlo ang building levels sa "THE ESTATE" pero apat ang layer dito: ang
 * rooftop ay korona ng gusali, hindi hiwalay na palapag. Ganoon ito
 * ipinapakita ng dokumento, kaya ganoon din dito.
 */
export const CLUBHOUSE_LEVELS = [
  {
    code: "01",
    level: "Lower",
    name: "Practice & events",
    summary:
      "Dug into the slope. Practice bays and a lounge with launch monitors sit around an event hall, with a bar and a terrace that opens onto the grass.",
    plan: [
      "Players’ gathering",
      "Practice areas",
      "Bar & refreshments",
      "VIP lounge",
      "Premium entrance",
      "Back of house",
      "Service routes",
      "Delivery & storage",
      "Kitchen & prep",
      "Admin areas",
    ],
  },
  {
    code: "02",
    level: "Ground",
    name: "Welcome & shop",
    summary:
      "Where you arrive and where everyone meets — reception, the golf shop, the locker rooms, the restaurant and the pool.",
    plan: [
      "Main entrance",
      "Drop-off zone",
      "Golf shop",
      "External bag drop",
      "Golf cart parking",
      "Restaurant & café",
      "Outdoor terrace",
      "Players’ lounge",
      "Locker rooms",
      "Swimming pool",
      "Pool bar",
      "Pool changing rooms",
    ],
  },
  {
    code: "03",
    level: "Upper",
    name: "Lounges & terrace",
    summary:
      "The members’ floor: sofas, a coffee bar, and a terrace stepped out over the water. An opening in the floor looks down into the entrance hall.",
    /* Walang listahan: tatlong floor plan lang ang nasa dokumento —
       Ground, Lower -1, at Rooftop +1. Walang Upper. Ang dating apat na
       kuwarto rito ay binuo ko mula sa mga kabanata, at ang Trophy
       corridor ay nasa GROUND FLOOR pa nga ng area schedule. */
    plan: [],
  },
  {
    code: "04",
    level: "Rooftop",
    name: "Bar, pool & gardens",
    summary:
      "A bar and restaurant on the roof, set among trees and planting, with a pool and the whole course in view below.",
    plan: ["Rooftop bar", "Pergolas", "Planters & seating", "Connecting stairs", "Skylights"],
  },
] as const;

/**
 * Ang mga espasyong may larawan sa `public/clubhouse/`.
 *
 * Iisa ang pinagmulan ng listahan sa mega menu at ng mga bloke sa
 * `/clubhouse`: ang `id` ay ang anchor na tinuturo ng nav at ang `id` din
 * ng bloke sa pahina.
 *
 * Magkaiba ito sa Clubhouse Lodge sa Accommodations. Tirahan iyon; ang mga
 * ito ay bahagi ng gusali ng club.
 *
 * Ang `id` ay tatlong bagay nang sabay: ang anchor sa `/clubhouse`, ang
 * tinuturo ng mega menu, at ang slug ng sariling ruta sa
 * `/clubhouse/[space]`. Kapag pinalitan ito, pinapalitan ang tatlo.
 *
 * Ang `gallery` ay ang dagdag na render ng espasyong iyon sa dokumento —
 * ito ang laman ng sariling pahina nito. Ligtas kung walang laman.
 */
export const CLUBHOUSE_SPACES = [
  {
    id: "the-drum",
    gallery: [
      { src: "/clubhouse/concept/approach-west-elevation.jpg", alt: "The clubhouse seen from the approach road, low against the light" },
      { src: "/clubhouse/concept/arrival-bronze-drum.jpg", alt: "The bronze drum that shelters the drop-off" },
      { src: "/clubhouse/concept/arrival-threshold.jpg", alt: "The timber-lined threshold between the drop-off and the hall" },
    ],
    name: "Arrival canopy",
    floor: "Arrival",
    image: "/clubhouse/concept/arrival-canopy.jpg",
    imageAlt: "Bronze-clad porte-cochère at the clubhouse drop-off",
    description:
      "Cars and carts pull in under a covered bronze canopy. Staff take your bag straight to the cart, so you walk in with your hands free — and the course is already in view.",
  },
  {
    id: "the-hall",
    gallery: [
      { src: "/clubhouse/concept/arrival-welcome-hall.jpg", alt: "The hall opening out beneath the oculus" },
      { src: "/clubhouse/concept/reception-desk.jpg", alt: "The reception desk, one continuous ribbon of stone and bronze" },
    ],
    name: "Entrance hall",
    floor: "Ground",
    image: "/clubhouse/concept/entrance-hall.jpg",
    imageAlt: "Entrance hall beneath the planted oculus",
    description:
      "The room everything else opens off. You check in here, wait for the rest of your group, and see the course through the glass. A planted opening in the ceiling brings daylight down from the roof garden.",
  },
  {
    id: "golf-shop",
    gallery: [
      { src: "/clubhouse/concept/golf-shop-counter.jpg", alt: "The counter and apparel rails under daylight" },
      { src: "/clubhouse/concept/golf-shop-fitting.jpg", alt: "Walnut joinery for fitting and display" },
    ],
    name: "Golf shop",
    floor: "Ground",
    image: "/clubhouse/concept/golf-shop.jpg",
    imageAlt: "Golf shop with timber fins and a topographic rug",
    description:
      "Clubs, balls, gloves and clothing, laid out in a quiet, daylit room — shown as objects rather than stock, on shelves and rails of walnut.",
  },
  {
    id: "locker-rooms",
    name: "Locker rooms",
    floor: "Ground",
    image: "/clubhouse/concept/locker-room.jpg",
    imageAlt: "Walnut locker room with a sculpted central bench",
    gallery: [],
    description:
      "Three hundred lockers for a full field, in two mirrored wings of 150 — one for men, one for women. Each wing keeps its own showers and bathrooms, and the plan puts the dry zone first: entrance, bench and lockers, then on to the showers.",
  },
  {
    id: "spa",
    name: "Showers & wellness",
    floor: "Ground",
    image: "/clubhouse/concept/showers-wellness.jpg",
    imageAlt: "Private shower suites facing a backlit stone wall",
    gallery: [],
    description:
      "A spa rather than a changing room. Private shower suites face a backlit stone wall and a quiet water feature, with frosted glass, rain heads and warm timber — a moment of decompression after the round.",
  },
  {
    id: "members-lounge",
    gallery: [
      { src: "/clubhouse/concept/coffee-bar.jpg", alt: "The stone coffee bar anchoring the lounge" },
      { src: "/clubhouse/concept/rear-terrace.jpg", alt: "The rear terrace, stepped out over the water" },
      { src: "/clubhouse/concept/trophy-corridor.jpg", alt: "The trophy corridor, a curved run of lit vitrines" },
    ],
    name: "Members’ lounge",
    /* "Upper" lang, walang sukat: sinasabi ng Chapter 06 na nasa upper floor
       ito, pero nakalista ang 150 m² nito sa GROUND FLOOR ng area schedule sa
       pahina 22. Magkasalungat ang dokumento sa sarili nito, kaya hindi
       pinagdidikit ang dalawa dito. Kailangan ng linaw mula sa VM·STUDIO. */
    floor: "Upper",
    image: "/clubhouse/concept/members-lounge.jpg",
    imageAlt: "Members’ lounge facing a full sweep of glass",
    description:
      "Sofas and a coffee bar facing a long wall of glass. This is the room to sit in before a round and to stay in after one, with the fairways in view the whole time.",
  },
  {
    id: "practice-bays",
    gallery: [
      { src: "/clubhouse/concept/practice-bay-detail.jpg", alt: "Inside a bay, with the screens folded back to the lawn" },
    ],
    name: "Practice bays",
    floor: "Lower",
    image: "/clubhouse/concept/practice-bays.jpg",
    imageAlt: "Practice bays opening onto the lawn through folding screens",
    description:
      "Covered bays with mats, launch monitors and clubs to try. The timber screens fold back so you hit straight out onto the grass. Suitable for a first lesson or a tune-up before a round.",
  },
  {
    id: "vip",
    name: "VIP wing",
    floor: "Lower",
    image: "/clubhouse/concept/vip-lounge.jpg",
    imageAlt: "The VIP lounge, with the course in view through a timber screen",
    gallery: [
      { src: "/clubhouse/concept/vip-entrance.jpg", alt: "The private drum of timber and travertine — a second, quieter door" },
      { src: "/clubhouse/concept/vip-dining.jpg", alt: "Fresh dishes plated in the directly connected kitchen" },
      { src: "/clubhouse/concept/vip-bar.jpg", alt: "Cocktails and fine pours at the VIP bar" },
      { src: "/clubhouse/concept/vip-suites.jpg", alt: "The suite of lounges, connected to the rooftop and a dedicated cart bay" },
    ],
    description:
      "A discreet entrance and a private set of rooms for owners, guests of honour and championship players. A dedicated drum of timber and travertine receives guests away from the main flow, and the lounge keeps the course in full view through a timber screen. Food is plated in a directly connected kitchen and drinks are poured at its own bar. The whole wing can be closed off for a tournament patron or an owner\u2019s day.",
  },
  {
    id: "rooftop",
    gallery: [
      { src: "/clubhouse/concept/rooftop-lounge-terrace.jpg", alt: "The lounge terrace under olive trees and rattan" },
      { src: "/clubhouse/concept/rooftop-sunset-dining.jpg", alt: "Dining on the roof as the light goes" },
      { src: "/clubhouse/concept/rooftop-pool-gardens.jpg", alt: "The stepped pool and the planted sky gardens" },
    ],
    name: "Rooftop",
    floor: "Rooftop",
    image: "/clubhouse/concept/rooftop-bar.jpg",
    imageAlt: "Rooftop bar and gardens around the pool oculus",
    description:
      "A bar and restaurant on the roof, under parasols and among planted trees, with a stepped pool alongside. The last stop of the day, looking down on the holes you have just played.",
  },
] as const;

/**
 * Ang bilang ng kuwarto bilang salita, para sa mga pamagat.
 *
 * Galing sa `CLUBHOUSE_SPACES` at hindi naka-sulat sa pahina: nagkamali
 * na ito noon nang maging walo ang anim at naiwan ang pamagat sa “Six”.
 * Kapag lumagpas sa listahan, ang bilang na lang ang isinasauli.
 */
export function roomCountWord() {
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
  return words[CLUBHOUSE_SPACES.length] ?? String(CLUBHOUSE_SPACES.length);
}

/** Ang apat na pangunahing materyal (pahina 15). */
export const CLUBHOUSE_MATERIALS = [
  { name: "Bronze", note: "Vertical fins and screens that catch the low tropical sun." },
  { name: "Travertine", note: "Pale stone floors and walls grounding every interior." },
  { name: "Walnut", note: "Ribbed timber for warmth, intimacy and acoustic calm." },
  { name: "Glass", note: "A frameless edge dissolving the room into the course." },
] as const;

/** Ang buong palette (pahina 56) — pito, kasama ang apat sa itaas. */
export const CLUBHOUSE_PALETTE = [
  "Travertine",
  "Walnut",
  "Bronze",
  "Lime plaster",
  "Green wool",
  "Glass",
  "Sandstone",
] as const;

/**
 * Area schedule, pahina 22. Napatunayan ang aritmetika:
 * 875 + 1,155 + 665 = 2,695 m², at tugma ang bawat subtotal sa mga item.
 */
export const CLUBHOUSE_AREAS = [
  {
    floor: "Lower ground floor",
    subtotal: 875,
    rows: [
      ["Event hall", 300],
      ["VIP area", 200],
      ["Kitchen & services", 130],
      ["Direct playing from building", 125],
      ["Office area", 50],
      ["WC", 40],
      ["Bar", 30],
    ],
  },
  {
    floor: "Ground floor",
    subtotal: 1155,
    rows: [
      ["Reception, lobby & restaurant", 310],
      ["Member lounge", 150],
      ["Male locker", 115],
      ["Female locker", 115],
      ["Bag drop-off", 90],
      ["Swimming pool changing room", 90],
      ["Pro shop", 70],
      ["Trophy corridor", 65],
      ["Prep area", 50],
      ["WC", 50],
      ["Swimming pool bar", 50],
    ],
  },
  {
    floor: "Rooftop",
    subtotal: 665,
    rows: [
      ["Terrace area", 650],
      ["Bar", 15],
    ],
  },
] as const satisfies readonly {
  floor: string;
  subtotal: number;
  rows: readonly (readonly [string, number])[];
}[];

export const CLUBHOUSE_GROSS_TOTAL = 2695;

/** "A DAY AT THE CLUB" (pahina 59). Kasama ang tatlong render doon. */
export const CLUBHOUSE_DAY = [
  {
    time: "Morning",
    image: "/clubhouse/concept/day-morning.jpg",
    title: "Practice & play",
    detail: "Warm up in the practice bays, collect your cart, and step straight onto the first tee.",
  },
  {
    time: "Afternoon",
    image: "/clubhouse/concept/day-afternoon.jpg",
    title: "Shower & lounge",
    detail: "The spa, the trophy corridor and the members’ lounge, across the upper floor.",
  },
  {
    time: "Evening",
    image: "/clubhouse/concept/day-evening.jpg",
    title: "Rooftop & table",
    detail: "Drinks on the roof among the trees, then dinner with the course lit up below.",
  },
] as const;
