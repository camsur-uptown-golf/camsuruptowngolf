/**
 * Ang tatlong buwanang membership plan ng club — low, mid, at top tier.
 *
 * Pangalan mula sa golf, pataas ayon sa pagkabihira ng iskor: Birdie (isa
 * sa ilalim ng par), Eagle (dalawa), Albatross (tatlo).
 *
 * HALIMBAWANG PRESYO AT BENEPISYO ITO — hindi pa inaprubahan ng club. Dito
 * lang ang palitan: dito kumukuha ang /members (mga card), ang API na
 * nag-iimbak ng pili, at ang pahina ng miyembro. Ang `id` ang nakaimbak sa
 * database, kaya huwag itong baguhin kapag may miyembro nang naka-plan.
 *
 * Kada buwan ang lahat ng bilang (rounds, guest pass, atbp.).
 */

export type PlanId = "birdie" | "eagle" | "albatross";

export type MembershipPlan = {
  id: PlanId;
  tier: "Low tier" | "Mid tier" | "Top tier";
  name: string;
  pricePerMonth: number; // PHP
  tagline: string;
  benefits: string[];
  featured?: boolean;
};

export const MEMBERSHIP_PLANS: readonly MembershipPlan[] = [
  {
    id: "birdie",
    tier: "Low tier",
    name: "Birdie",
    pricePerMonth: 3500,
    tagline: "For the occasional round and a reason to come back.",
    benefits: [
      "2 rounds of 18 holes every month",
      "Book tee times 3 days ahead",
      "2 range buckets every month",
      "10% off at the golf shop",
      "10% off clubhouse dining",
      "Members’ newsletter and event invitations",
    ],
  },
  {
    id: "eagle",
    tier: "Mid tier",
    name: "Eagle",
    pricePerMonth: 7500,
    tagline: "For regular players who make the club part of the week.",
    featured: true,
    benefits: [
      "4 rounds of 18 holes every month",
      "Book tee times 7 days ahead",
      "Unlimited range buckets",
      "1 practice-bay session every month",
      "Members’ lounge access",
      "Personal locker",
      "1 guest pass every month",
      "15% off at the golf shop and clubhouse dining",
    ],
  },
  {
    id: "albatross",
    tier: "Top tier",
    name: "Albatross",
    pricePerMonth: 18000,
    tagline: "The full club, with the best of everything.",
    benefits: [
      "Unlimited rounds of 18 holes",
      "Book tee times 14 days ahead",
      "Unlimited range buckets and practice bays",
      "Members’ lounge and VIP wing access",
      "Private locker with towel service",
      "4 guest passes every month",
      "1 night at Villa Del Rey every month",
      "Priority entry to club tournaments",
      "20% off at the golf shop and clubhouse dining",
    ],
  },
] as const;

export function findPlan(id: string | null | undefined): MembershipPlan | null {
  return MEMBERSHIP_PLANS.find((plan) => plan.id === id) ?? null;
}

/** "₱7,500" — walang decimal, may kuwit, piso. */
export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString("en-US")}`;
}
