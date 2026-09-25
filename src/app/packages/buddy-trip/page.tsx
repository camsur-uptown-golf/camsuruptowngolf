import type { Metadata } from "next";
import PackageItineraryPage from "@/components/PackageItineraryPage";

export const metadata: Metadata = {
  title: "Buddy Golf Trip | CamSur Uptown Golf Club",
  description:
    "Two nights, two rounds. A three-day golf trip for a group of friends, with course-side stays, shared tables, and time between rounds.",
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
    title: "Get everyone in, then get everyone warmed up.",
    intro:
      "Groups rarely arrive together. The first day is built loose enough that late arrivals do not hold up the rest.",
    moments: [
      [
        "Afternoon",
        "Check in, collect the group’s details, and leave the clubs with the team. Transfers and tee times for both rounds are confirmed here.",
      ],
      [
        "Late afternoon",
        "The practice bays, or a twilight nine for whoever has arrived and wants to play.",
      ],
      ["Evening", "The group dinner at the clubhouse — Bicol cooking, and the first argument about handicaps."],
    ],
  },
  {
    label: "First round",
    title: "Play in the morning, keep the afternoon open.",
    intro:
      "The first round settles the group into the course. What happens after it is up to you.",
    moments: [
      ["Morning", "Eighteen holes across the championship routing, in flights your group sets."],
      ["Midday", "Lunch at the clubhouse and a look at the cards."],
      [
        "Afternoon",
        "Free. Some groups take the practice bays, some take the pool or the wakepark, some take a nap. Nothing here is scheduled.",
      ],
    ],
  },
  {
    label: "Second round",
    title: "The round that settles it, then the road home.",
    intro:
      "The second round is the one the group plays for. The day is arranged so no one has to leave straight from the eighteenth.",
    moments: [
      ["Early morning", "Breakfast and a proper range session before the tee."],
      ["Morning", "The second eighteen — usually the one with something riding on it."],
      [
        "Midday",
        "Lunch, the group photo, and check out. Luggage is held while you finish, and transfers run to Naga or on to your next stop.",
      ],
    ],
  },
] as const;

export default function BuddyTripPage() {
  return (
    <PackageItineraryPage
      active="buddy-trip"
      title="Buddy Golf Trip"
      description="A three-day trip for a foursome or a larger group: two nights close to the course, two full rounds, and enough unscheduled time between them that the trip does not feel like an itinerary."
      image="/buddy-golf-trip-hero-v4.png"
      days={days}
      inclusions={[
        "Two nights in your choice of available accommodation",
        "Two 18-hole rounds with caddies",
        "Breakfast each morning and one group dinner",
        "Range balls before both rounds",
        "Shared transfers between your accommodation and the club",
        "Flights and pairings arranged around your group",
      ]}
    />
  );
}
