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
    title: "Get everyone in, settle the group, and warm up together.",
    intro:
      "Groups rarely arrive all at once, so the first day stays deliberately relaxed — late arrivals never hold up the rest, and everyone eases in at their own pace.",
    moments: [
      [
        "Afternoon",
        "Check in, settle the group, and leave your clubs with our team. Transfers and tee times for both rounds are confirmed here, so nothing is left to chance.",
      ],
      [
        "Late afternoon",
        "The practice bays, or a twilight nine for whoever has arrived and is keen to play.",
      ],
      ["Evening", "A welcome dinner at the clubhouse — Bicol cooking and good company to set the tone for the trip."],
    ],
  },
  {
    label: "First round",
    title: "Play in the morning, keep the afternoon yours.",
    intro:
      "The first round eases the group into the course, and the rest of the day is entirely yours to shape.",
    moments: [
      ["Morning", "Eighteen holes across our championship routing, in flights your group decides."],
      ["Midday", "Lunch at the clubhouse and the first look at the cards."],
      [
        "Afternoon",
        "Completely free. Some groups head to the practice bays, others to the pool or the wakepark, and some simply unwind. Nothing here is scheduled.",
      ],
    ],
  },
  {
    label: "Second round",
    title: "The round that settles it, then an easy road home.",
    intro:
      "The second round is the one the group plays for, and the day is arranged so no one has to rush off straight from the eighteenth.",
    moments: [
      ["Early morning", "Breakfast and a proper range session before the first tee."],
      ["Morning", "The second eighteen — usually the one with something riding on it."],
      [
        "Midday",
        "Lunch, the group photo, and an unhurried check-out. We hold your luggage while you finish, with transfers to Naga or on to your next stop.",
      ],
    ],
  },
] as const;

export default function BuddyTripPage() {
  return (
    <PackageItineraryPage
      active="buddy-trip"
      title="Group Golf Getaway"
      description="A three-day getaway built for a foursome or a full group — two nights beside the course, two championship rounds, and enough open time in between that it feels less like an itinerary and more like a proper trip with your people."
      image="/packages-group-getaway-hero-v2.jpeg"
      days={days}
      inclusions={[
        "Two nights at Villa Del Rey",
        "Two 18-hole rounds with caddies",
        "Breakfast each morning and one group dinner",
        "Range balls before both rounds",
        "Shared transfers between your accommodation and the club",
        "Flights and pairings arranged around your group",
      ]}
    />
  );
}
