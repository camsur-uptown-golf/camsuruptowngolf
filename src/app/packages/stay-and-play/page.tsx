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
    title: "Check in and settle into the club.",
    intro:
      "Arrive at your own pace. Our team takes care of your clubs and confirms your tee time, leaving the afternoon free to warm up or take a first look at the course.",
    moments: [
      [
        "Afternoon",
        "Check in at Villa Del Rey and confirm your tee time. Your clubs are collected and stored securely overnight.",
      ],
      [
        "Late afternoon",
        "Warm up at the practice range, or play a twilight nine while the light holds, subject to availability.",
      ],
      ["Evening", "Dinner at the clubhouse, then an early night ahead of your round."],
    ],
  },
  {
    label: "Round day",
    title: "Eighteen holes on the championship course.",
    intro:
      "Your round is the centerpiece of the stay, and the morning is planned so you reach the first tee relaxed and ready.",
    moments: [
      ["Early morning", "Breakfast, followed by range balls and a warm-up before you meet your caddie at the first tee."],
      ["Morning", "A full 18-hole round on our championship course, played at a comfortable pace."],
      ["Midday", "Lunch at the clubhouse and an easy check-out. Our team brings your clubs and luggage to your car."],
    ],
  },
] as const;

export default function Page() {
  return (
    <PackageItineraryPage
      active="stay-and-play"
      title="Stay & Play"
      tagline="One night beside the fairways and a full championship round. A complete golf getaway in two days."
      overviewTitle="A night by the course, a morning on it."
      description="Stay & Play is the simplest way to turn a round of golf into a proper getaway. Arrive in the afternoon, settle into Villa Del Rey, and wake up minutes from the first tee. Your round, breakfast, range balls and transfers are arranged in advance, so all that is left to do is play."
      image="/packages-stay-play-hero-v2.png"
      facts={[
        ["Duration", "2 days, 1 night"],
        ["Golf", "18 holes with a caddie"],
        ["Stay", "Villa Del Rey"],
        ["Ideal for", "Couples and solo golfers"],
      ]}
      days={days}
      inclusions={[
        "One night at Villa Del Rey",
        "One 18-hole round with a caddie",
        "Breakfast on the morning of your round",
        "Range balls before your round",
        "Transfers between your accommodation and the club",
        "Secure overnight club storage",
      ]}
    />
  );
}
