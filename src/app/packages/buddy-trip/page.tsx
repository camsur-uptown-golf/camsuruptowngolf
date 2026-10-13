import type { Metadata } from "next";
import PackageItineraryPage from "@/components/PackageItineraryPage";

export const metadata: Metadata = {
  title: "Group Golf Getaway | CamSur Uptown Golf Club",
  description:
    "A three-day golf getaway for your group at CamSur Uptown — two nights by the course, two full rounds, shared tables, and plenty of unscheduled time in between.",
};

/**
 * Tatlong araw, hindi apat.
 *
 * "Two nights" ang nasa inclusions at "three-day" ang nasa metadata, pero
 * apat na araw ang nakalista dito dati. Dalawang gabi ay tatlong araw.
 * Dalawa rin ang round sa inclusions — isa sa ikalawang araw, isa sa
 * ikatlo — kaya tugma na ngayon ang tatlo.
 *
 * Ginagamit na nito ang `PackageItineraryPage` sa halip na kopyahin ang
 * markup nito. Sandaang linya ng magkatulad na layout ang nawala, at
 * iisang lugar na lang ang babaguhin kapag may inayos sa hitsura.
 */
const days = [
  {
    label: "Arrival",
    title: "Arrive, check in and warm up together.",
    intro:
      "Groups rarely arrive at the same time, so the first day is kept relaxed. Everyone settles in at their own pace, and late arrivals never hold up the rest.",
    moments: [
      [
        "Afternoon",
        "Check in at Villa Del Rey and hand your clubs to our team. Tee times and transfers for both rounds are confirmed on arrival.",
      ],
      [
        "Late afternoon",
        "Time at the practice range, or a twilight nine for anyone ready to play, subject to availability.",
      ],
      ["Evening", "A welcome dinner at the clubhouse featuring Bicol cuisine, to start the trip together."],
    ],
  },
  {
    label: "First round",
    title: "A morning round, then the afternoon is yours.",
    intro:
      "The first round introduces the group to the course. The rest of the day is free to spend however you like.",
    moments: [
      ["Morning", "Eighteen holes on our championship course, with flights and pairings set by your group."],
      ["Midday", "Lunch at the clubhouse and a first look at the scorecards."],
      ["Afternoon", "Free time. Return to the practice range, relax by the pool, try the wakepark, or simply unwind."],
    ],
  },
  {
    label: "Final round",
    title: "The deciding round, then an easy trip home.",
    intro:
      "The final round is usually the one with something on the line. The day is planned so no one has to rush off after the last hole.",
    moments: [
      ["Early morning", "Breakfast and a full range session before the first tee."],
      ["Morning", "Your second 18-hole round on the championship course."],
      [
        "Midday",
        "Lunch, a group photo and a relaxed check-out. We hold your luggage while you play, and transfers to Naga or your next stop can be arranged.",
      ],
    ],
  },
] as const;

export default function BuddyTripPage() {
  return (
    <PackageItineraryPage
      active="buddy-trip"
      title="Group Golf Getaway"
      tagline="Two nights, two championship rounds and plenty of time together, arranged around your group."
      overviewTitle="Two rounds, two nights, one group."
      description="The Group Golf Getaway is designed for friends who play together. We arrange tee times, pairings, transfers and a group dinner around your party, so the trip runs smoothly from the first arrival to the final putt, with free time in between to enjoy the club."
      image="/packages-group-getaway-hero-v2.jpeg"
      facts={[
        ["Duration", "3 days, 2 nights"],
        ["Golf", "Two 18-hole rounds"],
        ["Stay", "Villa Del Rey"],
        ["Ideal for", "Foursomes and golf groups"],
      ]}
      days={days}
      inclusions={[
        "Two nights at Villa Del Rey",
        "Two 18-hole rounds with caddies",
        "Daily breakfast and one group dinner",
        "Range balls before both rounds",
        "Shared transfers between your accommodation and the club",
        "Tee times, flights and pairings arranged for your group",
      ]}
    />
  );
}
