export const VILLA_DEL_REY_STAYS = [
  {
    name: "Villas",
    description:
      "Spacious villa accommodation with a refined bedroom and a private poolside setting.",
    setting: "Private poolside",
    highlights: ["Private villa setting", "Refined bedroom", "Pool-facing outdoor space"],
    /* Tunay na amenities ng Villa (ibinigay ng club). Ang stay na may
       amenities ang tanging nagpapakita ng "Amenities" section sa static card
       — iyon ang hudyat sa VillaDelReyStays. */
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
    exterior: "/villa-del-rey/stays/cabins-exterior-v3.jpg",
    interior: "/villa-del-rey/stays/cabins-bedroom-v2.jpg",
    gallery: [
      {
        src: "/villa-del-rey/stays/cabins-exterior-alt-v2.jpg",
        alt: "Cabins exterior and deck at Villa Del Rey",
      },
    ],
  },
  {
    name: "Cabana",
    description:
      "Compact resort cabanas arranged along garden paths, with simple interiors designed for an easy stay.",
    setting: "Resort garden paths",
    highlights: ["Compact resort stay", "Easy garden access", "Simple, calm interior"],
    exterior: "/villa-del-rey/stays/cabana-exterior-v2.jpg",
    interior: "/villa-del-rey/stays/cabana-bedroom-v2.jpg",
    gallery: [],
  },
  {
    name: "Dwell",
    description:
      "A clean modern retreat pairing a private garden-facing exterior with a warm timber-lined bedroom.",
    setting: "Garden-facing retreat",
    highlights: ["Modern private retreat", "Garden outlook", "Warm timber-lined room"],
    exterior: "/villa-del-rey/stays/dwell-exterior-v3.jpg",
    interior: "/villa-del-rey/stays/dwell-bedroom-v3.jpg",
    gallery: [],
  },
] as const;
