/**
 * SAMPLE DATA — hindi pa live: ang Club tab lang (dining, practice bays,
 * wellness at ang membership tiers). Wala pang booking system ang club para
 * sa mga ito, kaya request sa club ang ipinapadala ng app. Mula sa mga mockup
 * ng Brand Guidelines 2026 (p.78–79) ang laman.
 *
 * Totoo na (mula sa site): ang member at ang card (`/api/app/me`), ang mga
 * tee time at booking (`/api/tee-times`, `/api/app/bookings`), at ang
 * weather, events at offers (`/api/app/club`, inilalagay ng staff sa admin).
 */
export const DINING_VENUES = [
  { id: 'sky-bar', eyebrow: 'Rooftop', name: 'Sky Bar & Gardens', detail: 'Sunset cocktails · small plates', image: require('../../assets/brand/sky-bar.jpg') },
  { id: 'lounge', eyebrow: 'Lakeside', name: 'Members’ Lounge', detail: 'All-day dining · private corners', image: require('../../assets/brand/members-lounge.jpg') },
] as const;

export const DINING_TIMES = ['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'] as const;

/** Twelve bays; `false` = taken today. */
export const BAYS: { id: string; free: boolean }[] = [
  { id: '01', free: true }, { id: '02', free: false }, { id: '03', free: false }, { id: '04', free: true },
  { id: '05', free: false }, { id: '06', free: true }, { id: '07', free: true }, { id: '08', free: false },
  { id: '09', free: true }, { id: '10', free: true }, { id: '11', free: false }, { id: '12', free: true },
];

export const BAY_DURATIONS = ['30 min', '60 min', '90 min'] as const;
export const BAY_TIMES = ['3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'] as const;

export const WELLNESS_TREATMENTS = [
  { id: 'recovery', name: 'Post-round recovery', detail: 'Showers & wellness suite · 45 min' },
  { id: 'massage', name: 'Sports massage', detail: 'Legs, back and shoulders · 60 min' },
  { id: 'stretch', name: 'Assisted stretch', detail: 'Mobility for the swing · 30 min' },
] as const;
export const WELLNESS_TIMES = ['2:00 PM', '3:00 PM', '4:30 PM', '5:30 PM'] as const;

export type Tier = { id: string; eyebrow: string; name: string; benefits: string[]; leather?: boolean; badge?: string };

/** Ang tiers ng Brand Guidelines (p.78). Walang presyo — "Enquire about membership". */
export const MEMBERSHIP_TIERS: Tier[] = [
  {
    id: 'founding',
    eyebrow: 'Limited · 2026 only',
    name: 'Founding',
    benefits: ['Unlimited golf & priority tee times', 'Locker, valet and 12 guest passes', 'Founding name on the clubhouse wall'],
    leather: true,
    badge: 'Few left',
  },
  { id: 'full-golf', eyebrow: 'Individual & family', name: 'Full Golf', benefits: ['Unlimited golf · 7-day booking window', 'Practice bays and member events'] },
  { id: 'corporate', eyebrow: 'Up to 4 nominees', name: 'Corporate', benefits: ['Transferable nominees · client days', 'Private dining and VIP wing'] },
];
