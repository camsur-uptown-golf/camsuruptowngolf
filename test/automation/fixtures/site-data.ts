/**
 * Single source of truth for the CamSur Uptown Golf Club site structure.
 * Crawled live from http://localhost:3000. All specs iterate over this data so
 * the ~392 test cases map 1:1 to test/outputs/CamSur_Uptown_Golf_QA_TestCases.xlsx.
 */

export const PHONE = 'tel:+639163007914';

export interface PageRef {
  path: string;
  name: string;
}

export const HOLES: PageRef[] = Array.from({ length: 18 }, (_, i) => ({
  path: `/golf/courses/hole-no.${i + 1}`,
  name: `Golf — Hole No. ${i + 1}`,
}));

/** All 42 internal pages in scope. */
export const PAGES: PageRef[] = [
  { path: '/', name: 'Home' },
  { path: '/golf', name: 'Golf — Course Overview' },
  ...HOLES,
  { path: '/clubhouse', name: 'Clubhouse — Overview' },
  { path: '/clubhouse/the-drum', name: 'Clubhouse — The Arrival Canopy' },
  { path: '/clubhouse/the-hall', name: 'Clubhouse — The Entrance Hall' },
  { path: '/clubhouse/golf-shop', name: 'Clubhouse — The Golf Shop' },
  { path: '/clubhouse/locker-rooms', name: 'Clubhouse — Locker Rooms' },
  { path: '/clubhouse/spa', name: 'Clubhouse — Showers & Wellness' },
  { path: '/clubhouse/members-lounge', name: "Clubhouse — Members' Lounge" },
  { path: '/clubhouse/practice-bays', name: 'Clubhouse — Practice Bays' },
  { path: '/clubhouse/vip', name: 'Clubhouse — The VIP Wing' },
  { path: '/clubhouse/rooftop', name: 'Clubhouse — The Rooftop' },
  { path: '/packages', name: 'Packages — Overview' },
  { path: '/packages/stay-and-play', name: 'Packages — Stay and Play' },
  { path: '/packages/buddy-trip', name: 'Packages — Buddy Trip' },
  { path: '/accommodations', name: 'Accommodations — Overview' },
  { path: '/accommodations/villa-del-rey', name: 'Accommodations — Villa Del Rey' },
  { path: '/accommodations/gota-village-resort', name: 'Accommodations — Gota Village Resort' },
  { path: '/experiences', name: 'Experiences — Overview' },
  { path: '/events', name: 'Events' },
  { path: '/dining', name: 'Dining' },
  { path: '/contact', name: 'Contact Us' },
  { path: '/plan-your-visit', name: 'Plan Your Visit' },
  { path: '/terms-of-use', name: 'Terms of Use' },
];

/** External facility links (open in new tab from the EXPERIENCES mega-menu). */
export const EXTERNAL_LINKS: { name: string; url: string }[] = [
  { name: 'Pickle Ball', url: 'https://pickleball.camsur.com/' },
  { name: 'Skate Park', url: 'https://visitcamsur.com/facilities/skate-park' },
  { name: 'Bike Track', url: 'https://visitcamsur.com/facilities/bike-track' },
  { name: 'Playground & Outdoor Basketball Court', url: 'https://visitcamsur.com/facilities/playground' },
  { name: 'ATV', url: 'https://visitcamsur.com/facilities/atv' },
  { name: 'Kiddie Park', url: 'https://visitcamsur.com/facilities/kiddiepark' },
  { name: 'Billiards', url: 'https://visitcamsur.com/facilities/billiards' },
  { name: 'Lago Del Rey', url: 'https://visitcamsur.com/facilities/lagodelrey' },
  { name: 'Massage', url: 'https://visitcamsur.com/facilities/massage' },
  { name: 'Wakepark', url: 'https://visitcamsur.com/facilities/wakepark' },
  { name: 'Visit CamSur', url: 'https://visitcamsur.com/' },
  { name: 'CWC Clubhouse', url: 'https://visitcamsur.com/facilities/clubhouse' },
];

/** Mega-menu triggers in the header. */
export const MEGA_MENUS = ['GOLF', 'CLUBHOUSE', 'PACKAGES', 'ACCOMMODATIONS', 'EXPERIENCES', 'EVENTS'];

/** Internal navigation link targets to verify (Task 2). */
export const NAV_LINKS: { location: string; label: string; target: string }[] = [
  { location: 'Header', label: 'Logo → Home', target: '/' },
  { location: 'Header', label: 'Plan your visit', target: '/plan-your-visit' },
  { location: 'GOLF menu', label: 'Course Overview', target: '/golf' },
  ...HOLES.map((h, i) => ({ location: 'GOLF menu', label: `Hole No. ${i + 1}`, target: h.path })),
  { location: 'GOLF menu', label: 'Tournaments', target: '/events' },
  { location: 'CLUBHOUSE menu', label: 'Overview', target: '/clubhouse' },
  { location: 'CLUBHOUSE menu', label: 'The arrival canopy', target: '/clubhouse/the-drum' },
  { location: 'CLUBHOUSE menu', label: 'The entrance hall', target: '/clubhouse/the-hall' },
  { location: 'CLUBHOUSE menu', label: 'The golf shop', target: '/clubhouse/golf-shop' },
  { location: 'CLUBHOUSE menu', label: 'Locker rooms', target: '/clubhouse/locker-rooms' },
  { location: 'CLUBHOUSE menu', label: 'Showers & wellness', target: '/clubhouse/spa' },
  { location: 'CLUBHOUSE menu', label: "Members' lounge", target: '/clubhouse/members-lounge' },
  { location: 'CLUBHOUSE menu', label: 'Practice bays', target: '/clubhouse/practice-bays' },
  { location: 'CLUBHOUSE menu', label: 'The VIP wing', target: '/clubhouse/vip' },
  { location: 'CLUBHOUSE menu', label: 'The rooftop', target: '/clubhouse/rooftop' },
  { location: 'PACKAGES menu', label: 'Overview', target: '/packages' },
  { location: 'PACKAGES menu', label: 'Stay and Play', target: '/packages/stay-and-play' },
  { location: 'PACKAGES menu', label: 'Buddy Trip', target: '/packages/buddy-trip' },
  { location: 'ACCOMMODATIONS menu', label: 'Overview', target: '/accommodations' },
  { location: 'ACCOMMODATIONS menu', label: 'Villa Del Rey', target: '/accommodations/villa-del-rey' },
  { location: 'ACCOMMODATIONS menu', label: 'Gota Village Resort', target: '/accommodations/gota-village-resort' },
  { location: 'EXPERIENCES menu', label: 'Overview', target: '/experiences' },
  { location: 'EVENTS menu', label: 'Events', target: '/events' },
  { location: 'Footer', label: 'The Course', target: '/golf' },
  { location: 'Footer', label: 'Packages', target: '/packages' },
  { location: 'Footer', label: 'Accommodations', target: '/accommodations' },
  { location: 'Footer', label: 'Dining', target: '/dining' },
  { location: 'Footer', label: 'Experiences', target: '/experiences' },
  { location: 'Footer', label: 'Events', target: '/events' },
  { location: 'Footer', label: 'Contact Us', target: '/contact' },
  { location: 'Footer', label: 'Terms of Use', target: '/terms-of-use' },
];

/** Responsive viewports (Task 3). */
export const VIEWPORTS = [
  { name: 'Mobile S', width: 320, height: 568 },
  { name: 'Mobile L', width: 414, height: 896 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 },
];

/** Page templates for responsive matrix (Task 3). */
export const TEMPLATES: PageRef[] = [
  { path: '/', name: 'Home' },
  { path: '/golf', name: 'Golf — Course Overview' },
  { path: '/golf/courses/hole-no.1', name: 'Golf — Hole Page' },
  { path: '/clubhouse', name: 'Clubhouse — Overview' },
  { path: '/clubhouse/rooftop', name: 'Clubhouse — Detail' },
  { path: '/packages', name: 'Packages — Overview' },
  { path: '/packages/stay-and-play', name: 'Packages — Detail' },
  { path: '/accommodations', name: 'Accommodations — Overview' },
  { path: '/accommodations/villa-del-rey', name: 'Accommodations — Detail' },
  { path: '/experiences', name: 'Experiences' },
  { path: '/events', name: 'Events' },
  { path: '/dining', name: 'Dining' },
  { path: '/contact', name: 'Contact / Plan-Your-Visit (Form)' },
  { path: '/terms-of-use', name: 'Terms of Use' },
];

/** Pages that carry the callback request form (Tasks 8 & 9). */
export const FORM_PAGES = ['/plan-your-visit', '/contact'];

/**
 * Callback form fields (by `name`), crawled from the live DOM.
 * NOTE: confirm selectors against the real markup before first run — adjust if the
 * app uses different name/id/label wiring.
 */
export const FORM_FIELDS = {
  firstName: { name: 'firstName', required: true, type: 'text' },
  lastName: { name: 'lastName', required: true, type: 'text' },
  email: { name: 'email', required: true, type: 'email' },
  postalCode: { name: 'postalCode', required: false, type: 'text' },
  interest: { name: 'interest', required: true, type: 'select' },
  guests: { name: 'guests', required: true, type: 'number' },
  question: { name: 'question', required: false, type: 'textarea' },
  timeframe: { name: 'timeframe', required: true, type: 'select' },
  callWindow: { name: 'callWindow', required: false, type: 'checkbox' }, // 4 options
  mobile: { name: 'mobile', required: true, type: 'tel' },
  consent: { name: 'consent', required: true, type: 'checkbox' },
} as const;

export const REQUIRED_FIELDS = [
  'First name', 'Last name', 'Email', 'Mobile', 'Interest', 'Guests', 'Timeframe', 'Consent',
];

/** Performance targets (Task 12). */
export const PERF_PAGES: PageRef[] = [
  { path: '/', name: 'Home' },
  { path: '/golf', name: 'Course Overview' },
  { path: '/golf/courses/hole-no.1', name: 'Hole Page' },
  { path: '/clubhouse', name: 'Clubhouse Overview' },
  { path: '/packages', name: 'Packages Overview' },
  { path: '/contact', name: 'Contact Form' },
];

export const PERF_THRESHOLDS = {
  performance: 90,
  accessibility: 90,
  'best-practices': 90,
  seo: 90,
};

/**
 * Official scorecard — SOURCE OF TRUTH REQUIRED (Task 6).
 * Fill par/metres/yards from the club's official scorecard, then Task 6 asserts the
 * rendered values against these. Left null until confirmed with the client.
 */
export const SCORECARD: { hole: number; par: number | null; metres: number | null; yards: number | null }[] =
  Array.from({ length: 18 }, (_, i) => ({ hole: i + 1, par: null, metres: null, yards: null }));

export const SCORECARD_TOTALS = {
  par: 72, // stated on the homepage hero ("72 COURSE PAR")
  metres: null as number | null,
  yards: null as number | null,
};
