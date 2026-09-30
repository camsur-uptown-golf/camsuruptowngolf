export const VILLA_DEL_REY_STAYS = [
  {
    name: "Villas",
    description:
      "Spacious villa accommodation with a refined bedroom and a private poolside setting.",
    setting: "Private poolside",
    highlights: ["Private villa setting", "Refined bedroom", "Pool-facing outdoor space"],
    /* Ang keyFacts at amenities ay para sa tabbed na kaliwang column
       (StayInfoTabs). Ang keyFacts ay galing sa dating setting + highlights;
       ang amenities ay ibinigay ng club. Ang stay na may amenities ang tanging
       nagpapakita ng tabs — iyon ang hudyat sa VillaDelReyStays. */
    keyFacts: [
      "Private poolside setting",
      "Private villa setting",
      "Refined bedroom",
      "Pool-facing outdoor space",
    ],
    amenities: [
      "Bathrobes",
      "Hair dryer",
      "Mirror",
      "Private bathroom",
      "Shower",
      "Toiletries",
      "Towels",
      "TV",
      "Wi-Fi (free)",
      "Air conditioning",
      "Slippers",
      "Coffee/tea maker",
      "Free bottled water",
      "Fruits/snacks",
      "Refrigerator",
      "Closet",
      "Ironing facilities",
      "In-room safe box",
      "Non-smoking",
    ],
    exterior: "/villa-del-rey/stays/villa-pool-4k.jpg",
    interior: "/villa-del-rey/stays/villa-bedroom-4k.jpg",
    gallery: [
      {
        src: "/villa-del-rey/stays/villa-bedroom-angle-4k.jpg",
        alt: "Villa bedroom from the upper corner at Villa Del Rey",
      },
      {
        src: "/villa-del-rey/stays/villa-bathroom-wide-4k.jpg",
        alt: "Villa bathroom and double vanity at Villa Del Rey",
      },
      {
        src: "/villa-del-rey/stays/villa-vanity-4k.jpg",
        alt: "Villa bathroom vanity at Villa Del Rey",
      },
    ],
  },
  {
    name: "Cabins",
    description:
      "Contemporary standalone cabins with landscaped outdoor space and a calm, light-filled bedroom.",
    setting: "Landscaped garden",
    highlights: ["Standalone cabin", "Garden surroundings", "Light-filled bedroom"],
    exterior: "/villa-del-rey/stays/cabins-exterior-4k.jpg",
    interior: "/villa-del-rey/stays/cabins-bedroom-4k.jpg",
    gallery: [],
  },
  {
    name: "Cabana",
    description:
      "Compact resort cabanas arranged along garden paths, with simple interiors designed for an easy stay.",
    setting: "Resort garden paths",
    highlights: ["Compact resort stay", "Easy garden access", "Simple, calm interior"],
    exterior: "/villa-del-rey/stays/cabana-exterior-4k.jpg",
    interior: "/villa-del-rey/stays/cabana-bedroom-4k.jpg",
    gallery: [],
  },
  {
    name: "Dwell",
    description:
      "A clean modern retreat pairing a private garden-facing exterior with a warm timber-lined bedroom.",
    setting: "Garden-facing retreat",
    highlights: ["Modern private retreat", "Garden outlook", "Warm timber-lined room"],
    exterior: "/villa-del-rey/stays/dwell-exterior-4k.jpg",
    interior: "/villa-del-rey/stays/dwell-bedroom-4k.jpg",
    gallery: [],
  },
] as const;
