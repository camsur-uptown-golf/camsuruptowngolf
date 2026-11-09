/**
 * Ang mga larawang mapipili ng staff para sa event o offer (admin → Events &
 * offers). Kasama na sa app ang mga ito, kaya susi lang ang galing sa server.
 * Kapareho ng `CONTENT_IMAGES` sa `src/lib/club-content-db.ts` ng site.
 */
const IMAGES = {
  tournament: require('../../assets/brand/event-tournament.jpg'),
  social: require('../../assets/brand/event-social.jpg'),
  lounge: require('../../assets/brand/members-lounge.jpg'),
  pool: require('../../assets/brand/pool-offer.jpg'),
  practice: require('../../assets/brand/practice-bays.jpg'),
  'sky-bar': require('../../assets/brand/sky-bar.jpg'),
  course: require('../../assets/brand/course-hero.jpg'),
} as const;

export type ClubImage = keyof typeof IMAGES;

/** Hindi kilalang susi (mas bagong admin kaysa sa app) → ang course. */
export const clubImage = (key: string): number => IMAGES[key as ClubImage] ?? IMAGES.course;
