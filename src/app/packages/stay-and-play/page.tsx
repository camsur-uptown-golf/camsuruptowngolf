import type { Metadata } from "next";
import PackageItineraryPage from "@/components/PackageItineraryPage";

export const metadata: Metadata = {
  title: "Stay & Play | CamSur Uptown Golf Club",
  description:
    "A two-day, course-side golf getaway at CamSur Uptown — one night beside the fairways, one full championship round, and an unhurried pace from arrival to the final putt.",
};

/**
 * Dalawang araw, hindi apat.
 *
 * "One night in your selected accommodation" ang nasa inclusions at
 * "one-night escape" ang eyebrow, pero apat na araw ang nakalista dito
 * dati — Day 1 hanggang Day 4 ang ipinapakita ng component. Hindi kasya
 * ang apat na araw sa isang gabi. Kapag nadagdagan ang gabi sa
 * inclusions, saka lang dapat dagdagan ang araw dito.
 *
 * Oras ng araw ang label ng bawat sandali, hindi "First / Next / Then" —
 * labindalawang beses iyon dati sa iisang pahina at walang sinasabi.
 */
const days = [
  {
    label: "Arrival",
    title: "Settle in, then ease onto the course the same afternoon.",
    intro:
      "Just a short drive from Naga, the club is made for an easy start — check in, hand over your clubs, and there is usually still light for a relaxed warm-up before the round that matters tomorrow.",
    moments: [
      [
        "Afternoon",
        "Check in and confirm tomorrow’s tee time. Our team takes your clubs and stores them securely overnight, so you travel light.",
      ],
      [
        "Late afternoon",
        "Loosen up at the practice bays, or slip out for a relaxed twilight nine while the light holds.",
      ],
      ["Evening", "An unhurried dinner at the clubhouse, then an early night before the main event."],
    ],
  },
  {
    label: "The round",
    title: "A full championship eighteen, with nowhere to rush off to.",
    intro:
      "The round is the heart of the package, and everything around it is arranged so your morning never feels rushed.",
    moments: [
      ["Early morning", "Breakfast, then range balls as your caddie meets you at the first tee."],
      ["Morning", "Eighteen holes across our championship routing, played at a comfortable, unhurried pace."],
      [
        "Midday",
        "Lunch at the clubhouse, then an easy check-out — our team brings your clubs and luggage to the car for the drive home.",
      ],
    ],
  },
] as const;

export default function Page() {
  return (
    <PackageItineraryPage
      active="stay-and-play"
      title="Stay & Play"
      description="The easiest way to turn one great round into a proper golf getaway — without taking a week off. Stay a night beside the course, play a full championship eighteen in the morning, and keep the pace unhurried from arrival to the final putt."
      image="/packages-stay-play-hero-v2.png"
      days={days}
      inclusions={[
        "One night at Villa Del Rey",
        "One 18-hole round with a caddie",
        "Breakfast on the morning of the round",
        "Range balls before the round",
        "Transfers between your accommodation and the club",
        "Overnight club storage",
      ]}
    />
  );
}
