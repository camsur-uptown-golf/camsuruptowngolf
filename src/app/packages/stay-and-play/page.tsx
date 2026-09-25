import type { Metadata } from "next";
import PackageItineraryPage from "@/components/PackageItineraryPage";

export const metadata: Metadata = {
  title: "Stay & Play | CamSur Uptown Golf Club",
  description:
    "One night, one round. A two-day course-side package for golfers who want a complete round without taking a week off.",
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
    title: "Arrive early enough to play the same day.",
    intro:
      "The club is a short drive from Naga. Check in, hand over the clubs, and there is usually still light for a warm-up.",
    moments: [
      [
        "Afternoon",
        "Check in and confirm the next morning’s tee time. The team takes the clubs and stores them overnight at the club.",
      ],
      [
        "Late afternoon",
        "Loosen up at the practice bays, or take a short twilight nine if you arrive before the light goes.",
      ],
      ["Evening", "Dinner at the clubhouse, then an early night before the round."],
    ],
  },
  {
    label: "The round",
    title: "A full eighteen, then an unhurried finish.",
    intro:
      "The round is the point of the package. Everything around it is arranged so the morning is not a rush.",
    moments: [
      ["Early morning", "Breakfast, then range balls while your caddie meets you at the first tee."],
      ["Morning", "Eighteen holes across the championship routing, played at a comfortable pace."],
      [
        "Midday",
        "Lunch at the clubhouse, then check out. The team brings your clubs and luggage to the car for the drive home.",
      ],
    ],
  },
] as const;

export default function Page() {
  return (
    <PackageItineraryPage
      active="stay-and-play"
      title="Stay & Play"
      description="A two-day course-side package for golfers who want a complete round at CamSur Uptown without taking a week off. One night, one full eighteen, and enough time around it that nothing feels rushed."
      image="/stay-and-play-hero-option-2.png"
      days={days}
      inclusions={[
        "One night in your choice of available accommodation",
        "One 18-hole round with a caddie",
        "Breakfast on the morning of the round",
        "Range balls before the round",
        "Transfers between your accommodation and the club",
        "Overnight club storage",
      ]}
    />
  );
}
