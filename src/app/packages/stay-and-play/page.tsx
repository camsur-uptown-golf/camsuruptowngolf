import type { Metadata } from "next";
import PackageItineraryPage from "@/components/PackageItineraryPage";

export const metadata: Metadata = { title: "Stay & Play | CamSur Uptown Golf Club", description: "A simple course-side golf stay with one night, one round, breakfast, and an easy CamSur itinerary." };

const days = [
  { label: "Arrival and warm-up", title: "Arrive with enough time to settle into the course.", intro: "Check in, leave the bags, and ease into the stay before the main round.", moments: [["First", "Arrive at your selected accommodation and confirm the next day’s tee time."], ["Next", "Use the practice facilities or add a twilight warm-up when timing allows."], ["Then", "Enjoy dinner at the clubhouse and turn in early for the morning round."]] },
  { label: "Main round", title: "A complete morning on the fairways beneath Mt. Isarog.", intro: "Breakfast, practice, and a full 18-hole round form the heart of the package.", moments: [["First", "Start with breakfast and range balls before meeting your caddie."], ["Next", "Play 18 holes at a comfortable pace across the championship routing."], ["Then", "Return to the clubhouse for lunch and a relaxed post-round afternoon."]] },
  { label: "CamSur afternoon", title: "Leave room for more than the scorecard.", intro: "Use the rest of the day for recovery, resort activities, or another easy group meal.", moments: [["First", "Freshen up and take a quiet break after the round."], ["Next", "Choose an available resort activity or explore nearby CamSur."], ["Then", "Gather for a final evening meal at your preferred venue."]] },
  { label: "Departure", title: "A slow final morning before heading home.", intro: "Keep departure simple, with breakfast and transfers arranged around your onward plans.", moments: [["First", "Enjoy breakfast and check out without rushing."], ["Next", "Collect stored clubs and luggage from the team."], ["Then", "Depart for Naga or continue to your next CamSur destination."]] },
] as const;

export default function Page() { return <PackageItineraryPage active="stay-and-play" eyebrow="Golf package · one-night escape" title="Your Stay & Play Itinerary" description="A straightforward course-side escape for golfers who want one comfortable night and one complete round at CamSur Uptown." image="/stay-and-play-hero-option-2.png" days={days} inclusions={["One night in your selected accommodation", "One 18-hole round with a caddie", "Breakfast the following morning", "Range balls before the round", "Club-to-accommodation transfers"]} />; }
