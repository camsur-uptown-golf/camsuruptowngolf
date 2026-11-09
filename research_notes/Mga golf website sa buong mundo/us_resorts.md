# US Golf Resorts: Online Services and Website Features (Pebble Beach, Pinehurst, Bandon Dunes, TPC Sawgrass, Streamsong)

Research date: 2026-11-05. Purpose: feature ideas for CamSur Uptown Golf, which already has online tee-time booking with downpayment, villa add-on, membership plans and login, hole-by-hole course pages, a weather forecast and multi-language support.

Source notes, read these first:
- **Pebble Beach:** pebblebeach.com returned HTTP 403 to the fetch tool. Pebble Beach detail comes from (a) search-result text from official pebblebeach.com pages and (b) a full fetch of `pebblebeachlegacy-beta.kingandpartners.com`, which looks like the web agency's staging/legacy mirror of the official site. Its content matched the official snippets wherever both were available, but it may lag the live site.
- **Bandon Dunes:** bandondunesgolf.com returned HTTP 402 to the fetch tool, so Bandon detail comes from search-result text from official pages plus GOLF.com and Golf Digest coverage. 2027 booking windows could not be confirmed from an official page.
- **Pinehurst, TPC Sawgrass, Streamsong:** official pages were fetched directly.
- No club was substituted. All five were researched.

## 1. Tee-time booking: engine, advance windows, guest priority, deposits/cancellation, dynamic pricing, caddies, carts/walking, replay

### Takeaway
All five clubs use **advance booking access as the main reward for staying on property**. Resort guests book months ahead; non-guests get a short window (Pebble Beach Golf Links: 24 hours; Pinehurst: 1 day; TPC Sawgrass: 14 days; Streamsong: 30 days). Online engines are usually white-label third-party systems (Agilysys at Pinehurst, EZLinks at TPC Sawgrass). The most exclusive resorts (Pebble Beach, Bandon) still finish bookings by phone or reservation request rather than with instant online checkout. Caddie, cart and walking rules, with fees, are published as clear tables. Replay discounts are rarely published.

### Cited Findings

**Pebble Beach Resorts**
- Resort guests can reserve Pebble Beach Golf Links up to 18 months ahead, subject to minimum-stay rules. Non-guests can reserve only 24 hours ahead. — [Pebble Beach FAQ (official, search text)](https://www.pebblebeach.com/plan-my-trip/frequently-asked-questions); [mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
- Non-guest windows by course: The Links at Spanish Bay and Del Monte up to 6 months, Spyglass Hill up to 3 months, Pebble Beach Golf Links 1 day. On other courses guests may book one round per night of stay, with up to two players per room. — [Pebble Beach FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
- Casa Palmero material lists a minimum 2-night stay to play Pebble Beach Golf Links. — [Casa Palmero guest services](https://www.pebblebeach.com/accommodations/casa-palmero-at-pebble-beach/personal-service/)
- Lodge and Inn guests can book up to 18 months ahead. Casa Palmero guests can book up to 12 months ahead. Guests are told to request tee times when they book the room. — [Booking guidelines](https://pebblebeach.com/plan-my-trip/booking-guidelines); [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
- Deposits and cancellation:
  - Hotel deposit is two nights' stay. Golf reservations need a credit card to guarantee the tee time.
  - Cancellation is free up to 14 days before play at Pebble Beach Golf Links, Spyglass Hill and Spanish Bay, and up to 3 days before play at Del Monte and The Hay.
  - Weather exceptions are decided only on the day of play, by pro shop staff.
  - Hotel bookings made within 72 hours of check-in cannot be cancelled.
  - Source: [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
- The site has a "Preview Availability" tool for checking rooms and golf and requesting preferred accommodations and golf experiences. It is an inquiry/request flow, not instant golf checkout. — [Plan My Trip / Reservation Inquiry](https://www.pebblebeach.com/plan-my-trip/)
- Green fee:
  - Third-party reports give $695 for Pebble Beach Golf Links for April 1, 2026 to March 31, 2027, up from $675 through March 2026. These figures were not verified on the official site.
  - Source: [The Golf News Net, Feb 2026](https://thegolfnewsnet.com/golfnewsnetteam/2026/02/14/how-much-does-it-cost-to-play-pebble-beach-golf-links-in-2026-140570/)
  - A Lodge 2-night package listing showed $8,040 for two guests, valid April 2026 to March 2027 (third-party). — [TeeTimesUSA listing](https://www.teetimesusa.com/pebble%20beach-hotels/pebble-beach-resort---lodge-at-pebble-beach)
- Caddies:
  - Request a caddie at least 72 hours ahead by calling Caddie Services at (866) 903-9101.
  - The fee is a base caddie fee plus a referral fee, paid at check-in.
  - Recommended tips are $100+ per bag (single) and $75+ per bag (double).
  - Source: [Pebble Beach Caddie Services](https://www.pebblebeach.com/golf/caddie-services/)
  - GOLF.com reported caddie fees rising to $175 single and $250 double, from $160 and $220. The article date was not confirmed. — [GOLF.com](https://golf.com/news/pebble-beach-caddies-controversy/)
  - CaddieMaster operates the program. — [The Nation](https://www.thenation.com/article/society/golf-caddies-just-unionized-for-the-first-time/tnamp/)
- Carts:
  - Cart path only at Pebble Beach Golf Links and Spyglass Hill. Fairway riding allowed at Spanish Bay and Del Monte when turf allows.
  - Spectators must ride in a cart and pay a cart fee, with a maximum of 4 carts per tee time and no children under 7.
  - Source: [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
- No published replay rate or dynamic-pricing statement was found.

**Pinehurst Resort**
- Online booking runs on an Agilysys-hosted portal (book.onagilysys.com). Tee times open **one day before** the play date. Tee times are "prioritized for members and overnight resort guests." — [Pinehurst Golf](https://www.pinehurst.com/golf/)
- Courses 2, 4, 6, 7, 8, 9, 10 and 11 require membership or resort-guest status. Non-guests can walk on at Nos. 1, 3 and 5 from April to October, and at The Cradle all year. Walk-on times cannot be cancelled and need a credit card to guarantee them. Phone bookings: (855) 835-0771, option 5. — [Pinehurst FAQ](https://www.pinehurst.com/faq/)
- The site says golf packages give "the best rates and tee time availability." — [Pinehurst Golf](https://www.pinehurst.com/golf/)
- Lodging deposit is $300 per adult, with a 30-day cancellation window (lodging, not golf). Once play starts, the round must be finished the same day. — [Pinehurst FAQ](https://www.pinehurst.com/faq/)
- Caddie program (CADDIEMASTER), as listed on the current page:
  - Fees: caddie $85 per bag (usually shared by two players), forecaddie $45 per player, single bag $100 (confirmed on the day of play only).
  - Recommended gratuity: $65+ per bag for a walking caddie, $40+ for a forecaddie.
  - Fees are paid at golf shop check-in. Request a caddie when you reserve.
  - Bag rule: single-strap carry bag under 24 lb.
  - Source: [Pinehurst Golf](https://www.pinehurst.com/golf/); [Pinehurst FAQ](https://www.pinehurst.com/faq/)
  - An older snippet showed $80 / $40 / $100, so fees were raised at some point. — [pinehurst.com/Golf (search snippet)](https://www.pinehurst.com/Golf)
- Carts: Nos. 2 and 4 are cart path only, with caddies strongly encouraged. No. 10 is walking only. Fairway riding is allowed elsewhere. Push carts are first come, first served. — [Pinehurst FAQ](https://www.pinehurst.com/faq/)
- No. 2 green fee: $595 peak and $360 off-season, caddie not included. Treat this as dated. — [GOLF.com](https://golf.com/travel/pinehurst-no-2-price-what-costs-us-open/)
- No published replay rate was found on the official pages fetched.

**Bandon Dunes Golf Resort**
- Bandon uses a **registration plus random-drawing ("lottery")** system just for the right to request reservations.
  - For 2026, the year was split into three periods: Jan–Apr 2026 (registration closed Dec 22, 2024), May–Sep 2026 (closed Jan 19, 2025), and Oct–Dec 2026 (closed Apr 20, 2025).
  - Selected entrants get an email with their place in line, and then a reservationist **calls** them to book.
  - Source: [GOLF.com, Dec 3, 2024](https://golf.com/travel/bandon-dunes-instituting-lottery-manage-demand/)
- Drawing winners must pay the full deposit on booking, and each applicant may make only one reservation. — [Bandon "How Our 2026 Reservations Process Works" (search text)](https://bandondunesgolf.com/?p=20440)
- Bandon says it has booked trips by phone since 1999 rather than relying on online booking engines. Reservations are guaranteed only after speaking with a representative. — [Bandon Reservations (search text)](https://bandondunesgolf.com/reservations)
- Rooms are limited to about 210. Tee times are easier to get than rooms, so many visitors stay off-site. Guests can ask to be waitlisted for rooms. — [GOLF.com](https://golf.com/travel/bandon-dunes-instituting-lottery-manage-demand/)
- Cancellation:
  - 2025 reservations had to be changed at least 30 days before arrival, or the deposit was forfeited. Groups have a 90-day policy under their contract.
  - Source: [search summary of Bandon/third-party sources](https://www.golfdigest.com/story/bandon-dunes-golf-trip-how-to-book-best-tips); exact official wording not fetched.
- Replay:
  - Second rounds are discounted. One source says 50% off with the 3rd round free, and replay rounds can be cancelled any time without penalty.
  - These details are third-party and unverified. — [Colorado AvidGolfer](https://coloradoavidgolfer.com/bandon-confidential-10-insider-tips-for-your-bandon-golf-trip/)
- Caddies:
  - The official caddie page lists $100 per bag per round plus gratuity, paid directly to the caddie. Group (non-carrying) caddie rates for 2–4 golfers are also posted.
  - Source: [Bandon Caddie Tradition / Top 8 Caddie Questions (search text)](https://bandondunesgolf.com/?p=9117)
  - A 2027 group-trip quote showed $125 plus gratuity per player. — [Mass Golf 2027 breakdown](https://www.massgolf.org/wp-content/uploads/2026/06/27-bandon-event-breakdown.pdf)
- All courses are walking only, with no carts. — [Mass Golf](https://www.massgolf.org/play/golf-travel/bandon-2027/)
- 2027 windows: a Ship Sticks blog says standard lodging bookings run through May 2027 and Nov–Dec 2027 goes through the drawing. Not confirmed officially. — [Ship Sticks blog](https://www.shipsticks.com/blog/wp-json/wp/v2/posts/10195)

**TPC Sawgrass**
- There are two paths:
  - Direct booking without lodging: up to **14 days** ahead through the online engine (tpcsawgrass.ezlinksgolf.com) or by phone at (904) 273-3430.
  - Stay-and-play through **TPC Vacations** at the Sawgrass Marriott: up to **12 months** ahead.
  - Source: [TPC Sawgrass Book a Tee Time](https://tpc.com/sawgrass/book-a-tee-time/)
- Posted "starting at" rates include green fee, cart, forecaddie with the group and a bag of warm-up balls:
  - Stadium Course: $775 (Sep–May), $550 (Jun–Aug).
  - Dye's Valley: $350 and $250.
  - Stadium Course carts are cart path only all year.
  - Source: [TPC Sawgrass Book a Tee Time](https://tpc.com/sawgrass/book-a-tee-time/)
- Course **closure dates are published** for 2026: Stadium closed Jun 1–28, Aug 10–14, Oct 19–Nov 8 and THE PLAYERS (Mar 10–16). Closure dates are blocked in the booking window. — [TPC Sawgrass Book a Tee Time](https://tpc.com/sawgrass/book-a-tee-time/)
- **Dynamic pricing**: GOLF.com (March 2022) reported that the course uses dynamic pricing, with peak rates of $700–$840.
  - A "Tour Player Experience" package ($1,700) included a walking caddie, player locker-room access and meals. A version with two nights' lodging plus Dye's Valley ran up to $2,655 per person.
  - These figures are dated (2022). — [GOLF.com](https://golf.com/travel/tpc-sawgrass-rates-stadium-course-prices/)
  - A later report cited a $900 peak morning rate. — [Golf Monthly](https://golfmonthly.com/news/tpc-sawgrass-has-increased-the-worlds-second-most-expensive-green-fee-again-heres-what-it-costs)
- Walking requires a caddie. Reported pricing is $85 per bag for a double, or about $125–$130 for a single premium caddie, with a suggested $40 forecaddie tip per player. These are 2023–24 third-party figures. — [Golf Advisor true cost](https://golfadvisor.com/articles/the-true-cost-to-play-americas-12-most-expensive-golf-courses); [Golf Monthly](https://golfmonthly.com/travel/usa/how-can-i-play-tpc-sawgrass)
- No replay rate or golf cancellation policy was found on the official page.

**Streamsong Resort**
- Booking windows:
  - Day-guest (non-resort) booking window is **30 days** on the current FAQ and fee page.
  - Other official pages showed 21 days and, on an older page, 60 days. The official site is inconsistent.
  - Source: [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/); [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees)
- The fee page publishes a **seasonal rate calendar** with separate Resort Guest, Day Guest (Fri–Sun vs Mon–Thu) and FL/GA resident rows:
  - Resort guest: $375 (Oct 1–Dec 14, 2026), $395 (Jan 14–Apr 30, 2027), $170 (Jun 24–Sep 14, 2027).
  - Day guest: $425, $445 and $220/$170 for the same windows.
  - Carts are $35 per person and not included.
  - Source: [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees)
- Caddies:
  - Walking double bag $120 plus gratuity per player, single bag $150 plus gratuity. A group caddie is $60 per player and is **required whenever carts are used**.
  - Caddies are independent contractors paid by cash, **Venmo or Zelle**.
  - Source: [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees)
- Carts and walking:
  - Carts are available Mar 1–Dec 23. From Dec 24 to Feb 28 play is walking only.
  - Tee times before 8 a.m. are foursomes only and need a caddie.
  - The FAQ conflicts on whether the winter walking-only rule applies to every course.
  - Source: [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees); [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/)
- Cancellation:
  - Golf and room cancellation terms "vary by booking" and appear in the confirmation. Spa requires 72 hours' notice.
  - Rain checks are given only when a course closure stops a round from being completed.
  - Source: [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/)
- Replay: no current policy was found. 2024 material mentioned free replays on certain summer days. — [search summary](https://www.streamsongresort.com/golf/golf-fees/)
- **Cashless** from July 1, 2026. — [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/)

### Inferences
- The common pattern is "stay with us and book early, or don't stay and book late." CamSur could copy this cheaply: a longer booking window for villa guests and members, and a shorter one for day guests, enforced in the existing booking engine.
- The industry leaders do **not** take full payment online for golf at booking. They take a card guarantee (Pebble Beach), a lodging deposit (Pinehurst, Bandon), or settle caddie fees at check-in. CamSur's downpayment model already matches or beats this. Publishing a clear refund/cancellation ladder like Pebble Beach's (14 days / 3 days / weather decided on the day by the pro shop) would build trust.
- Caddie pricing is shown as a simple table: single vs double bag, forecaddie and suggested tip. Suggested gratuity is posted openly at every club. This suits Philippine caddie culture and would be easy to add.
- Streamsong's season-by-weekday rate calendar, resident discount row and "group caddie required with cart" rule show how to publish a transparent price grid. A local-resident or Bicolano rate row is a cheap equivalent.

### Gaps
- Pebble Beach base caddie fee, current official green fee and replay policy were not confirmed (site blocked; third-party figures conflict).
- Bandon's 2027 drawing dates and official replay percentage were not confirmed (site blocked).
- TPC Sawgrass's current dynamic-pricing range and any replay offer were not found. Most third-party fee data is 2022–2024.
- No current replay policy was found for Streamsong or Pinehurst.

## 2. Stay-and-play packages, package builders and lodging integration

### Takeaway
Golf is sold mainly through lodging. Pinehurst and TPC Sawgrass push packages as the best path to tee times. Pebble Beach asks guests to request tee times when they book the room. Bandon books lodging and golf together by phone. Streamsong is the exception: it sells no fixed packages and lets guests add golf, dining and spa "individually" to a room reservation, which is effectively an à-la-carte package builder.

### Cited Findings
- **Pebble Beach:**
  - A "Preview Availability" tool checks rooms and golf together and lets guests request preferred experiences.
  - Room deposit is two nights. Golf at Pebble Beach Golf Links is tied to a minimum stay.
  - Source: [Plan My Trip](https://www.pebblebeach.com/plan-my-trip/); [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
  - Guest-perk pages ("Perks & Privileges for Guests of The Lodge/Inn") list what staying unlocks. — [Lodge guest services](https://www.pebblebeach.com/accommodations/the-lodge-at-pebble-beach/guest-services/); [Inn guest services](https://www.pebblebeach.com/accommodations/the-inn-at-spanish-bay/guest-services/)
- **Pinehurst:**
  - Named packages include "The Cottages at No. 8 Golf Package – The Ultimate On-course Stay."
  - Itineraries are themed: "Buddies Trip," "The Ultimate Couples Retreat at Pinehurst" and "Hidden Gems."
  - Meal plans can be added: breakfast; breakfast and dinner; or breakfast, lunch and dinner.
  - The resort fee includes on-property shuttle, gratuities for golf staff and play on the Thistle Dhu putting course.
  - Source: [Pinehurst FAQ](https://www.pinehurst.com/faq/); [Pinehurst Golf](https://www.pinehurst.com/golf/)
- **Bandon Dunes:**
  - Reservationists build the trip (lodging plus tee times) by phone. The site calls the team experts at "crafting" trips.
  - On-property guests get priority and can request times, but the exact course and time are not guaranteed.
  - Source: [Bandon Reservations (search text)](https://bandondunesgolf.com/reservations); [Golf Digest booking tips](https://www.golfdigest.com/story/bandon-dunes-golf-trip-how-to-book-best-tips)
- **TPC Sawgrass:** TPC Vacations is a dedicated stay-and-play channel (tpc.com/sawgrass/vacations, 833-752-9872) that allows 12-month advance booking at the partner Sawgrass Marriott. — [TPC Sawgrass Book a Tee Time](https://tpc.com/sawgrass/book-a-tee-time/)
- **Streamsong:**
  - Room rates cover lodging only. Golf, dining, recreation and spa are "added individually to your reservation."
  - The resort fee includes "The Link" (the first 6 holes of The Chain short course, free for resort guests), valet and on-resort transport.
  - Source: [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/); [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees)
  - Florida-resident rates and packages are on a separate page. — [Streamsong Resident Rates](https://www.streamsongresort.com/resident-rates/)

### Inferences
- CamSur's "villa add-on during tee-time booking" works in the reverse direction to most of these sites, which go from room to golf. Supporting both directions (book a villa, then add tee times; or book a tee time, then add a villa) would match Streamsong's à-la-carte model.
- Themed itineraries (Buddies Trip, Couples Retreat, Hidden Gems) are cheap to produce as content pages that link into the booking flow. A "Barkada Golf Weekend" or "Balikbayan Family Stay & Play" are natural local versions.
- Pinehurst shows how to use a resort fee to bundle small perks (shuttle, putting course, staff gratuities), so the price looks all-in.

### Gaps
- Package prices and inclusions for Pinehurst and Pebble Beach were not on the pages fetched.
- No true interactive online "package builder" with live pricing was confirmed at any of the five clubs. Pebble Beach's Preview Availability tool comes closest but ends in a request.

## 3. Course information: flyovers, drone/3D video, yardage, maps, architect story, live conditions, pace of play

### Takeaway
Course storytelling centers on architects and history: Donald Ross at Pinehurst, Pete Dye at Sawgrass, David McLay Kidd's new Bone Valley at Streamsong. **Live webcams** are a real differentiator at Pebble Beach (18th green golf cam) and Streamsong (a "Live Cam" page). Clubs publish **maintenance and aeration calendars** and **closure dates** openly. Pace-of-play targets are stated in plain numbers. No verified hole-by-hole drone flyovers were found on the pages fetched.

### Cited Findings
- **Pebble Beach:**
  - Runs **live golf cams**, including "The 18th Green at Pebble Beach Golf Links." The cam page said it was offline during the 2026 AT&T Pro-Am and would return at the end of February 2026.
  - Source: [Pebble Beach live golf cam (mirror)](https://pebblebeachlegacy-beta.kingandpartners.com/golf/pebble-beach-golf-links/live-golf-cams/the-18th-green-at-pebble-beach-golf-links/)
  - The FAQ links to "live golf cams" from its golf section. — [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
- **Pinehurst:**
  - Each of its courses (Nos. 1–11, The Cradle, Thistle Dhu) has a page with architect and history. Examples:
    - No. 1: begun in 1897, finished by Donald Ross in 1901.
    - No. 4: Gil Hanse redesign.
    - No. 9: Jack Nicklaus, 7,122 yards.
    - No. 11: opens March 29, 2027.
  - The site credits Donald Ross with inventing the driving range.
  - Hole-by-hole descriptions and flyovers were not on the main golf page.
  - Source: [Pinehurst Golf](https://www.pinehurst.com/golf/)
- **Pinehurst:** publishes a 2027 **aeration/maintenance calendar** by course (for example, No. 2 from May 31 to June 9). It states a target pace of play of 4 hours 30 minutes. — [Pinehurst Golf](https://www.pinehurst.com/golf/); [Pinehurst FAQ](https://www.pinehurst.com/faq/)
- **Bandon:** has a public FAQ post answering "When do you aerify your greens?" — [Bandon aerification](https://bandondunesgolf.com/?p=5341)
- **TPC Sawgrass:**
  - Publishes exact 2026 **closure dates** per course. — [TPC Sawgrass Book a Tee Time](https://tpc.com/sawgrass/book-a-tee-time/)
  - The 17th island green has had live 360/VR feeds and cable "flycams" during THE PLAYERS broadcasts. These were tournament media (PGA TOUR, 2017–2023), not features of the resort website. — [Sports Video Group 2017](https://www.sportsvideo.org/2017/05/03/pga-tees-up-live-vr-360-video-experiences-at-players-championships-famed-17th-hole/); [SVG 2023](https://www.sportsvideo.org/2023/03/09/live-from-the-players-championship-expanded-trackman-jitacam-enhance-coverage/)
- **Streamsong:**
  - Homepage navigation has a "**Live Cam**" link. — [Streamsong homepage](https://streamsongresort.com/the-gauntlet-live-stream)
  - Pace policy is posted: the first hour of tee times should take no more than 4 hours, and the rest of the day no more than 4.5 hours. Groups behind pace are repositioned and may make up missed holes after the round.
  - The resort closes Mondays and Tuesdays in July and August for maintenance.
  - Source: [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees)
- **Streamsong Bone Valley:**
  - A new David McLay Kidd course. The page said it was taking **"Preview Play"** bookings, described as a limited chance to play all 18 holes early.
  - Preview play opened October 30, 2026, with the grand opening on January 26, 2027. BroBible reported an earlier Sept 19 preview date.
  - A "Bone Valley Grand Opening Sweepstakes" page is used for launch marketing.
  - Source: [Bone Valley page](https://www.streamsongresort.com/golf/bone-valley/); [KemperSports release](https://www.kempersports.com/2026/03/streamsong-golf-resort-unveils-bone-valley-the-bold-new-course-by-david-mclay-kidd/); [Sweepstakes](https://www.streamsongresort.com/golf/bone-valley/hb-sweepstakes/); [BroBible](https://brobible.com/sports/article/streamsong-bone-valley-best-new-golf-course/)

### Inferences
- A **live webcam** on the signature hole or the clubhouse is cheap (an IP camera plus a YouTube Live or HLS embed). Pebble Beach and Streamsong both have one, and it also shows the weather. It pairs naturally with CamSur's existing forecast widget.
- Publishing an **aeration and closure calendar** and a **pace-of-play target**, and blocking those dates in the booking engine as TPC does, is near-zero cost and cuts complaints.
- A **"Preview Play"** or soft-opening campaign plus a sweepstakes (Streamsong's Bone Valley) is a cheap launch tactic for any new holes or facilities at CamSur.

### Gaps
- Hole-by-hole drone flyovers or 3D yardage tools were not confirmed on any of the five official sites. They may exist on course sub-pages that weren't fetched.
- What Streamsong's Live Cam shows (which hole or view) was not confirmed.
- No live course-conditions feed (green speed, cart-path-only status of the day) was found at any of the five clubs.

## 4. Player services: lessons/academy, rentals, caddies, practice, fitting, pro shop/e-commerce, gift cards, handicap tools, mobile app, loyalty, membership

### Takeaway
Every club sells **gift cards online** and runs an **online pro shop**, and each has an email club. Rentals use premium current-model clubs ($80–$100 per day), with **Ship Sticks** as the standard club-shipping partner. Practice facilities and putting courses are a major draw (Thistle Dhu, The Gauntlet, The Punchbowl, Shorty's, The Link). **Resort mobile apps are weak or dated** across the five. No verified app with tee-time booking, GPS, mobile ordering or digital key was found, which leaves room for a smaller resort to do better.

### Cited Findings
- **Rentals and shipping:**
  - Pinehurst rents current Titleist clubs at $80 per day and partners with Ship Sticks. — [Pinehurst FAQ](https://www.pinehurst.com/faq/)
  - Streamsong rents premium sets at $100 per day. Models are listed by brand: Titleist GT2/T350/SM10/Scotty Cameron, Callaway Elyte and TaylorMade Qi35, with regular, stiff, senior and women's flex. It also accepts Ship Sticks. — [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees); [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/)
  - Pebble Beach gives the addresses for shipping clubs to The Lodge (1700 17 Mile Drive) and The Inn (2700 17 Mile Drive). — [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
- **Lessons and academies:**
  - Pinehurst's Golf Academy page describes swing analysis and short-game work, and mentions the Padgett Learning Center. No prices or booking engine were shown. — [Pinehurst Golf](https://www.pinehurst.com/golf/)
  - The Pebble Beach Golf Academy is linked from the site menu. A dated result mentions $100 club fittings. — [Caddie Services / search summary](https://www.pebblebeach.com/golf/caddie-services/)
  - No academy booking engine was confirmed at any club.
- **Practice and short courses:**
  - Pinehurst: Thistle Dhu 18-hole putting course (included in the resort fee) and The Cradle short course (walk-on all year). — [Pinehurst FAQ](https://www.pinehurst.com/faq/)
  - Streamsong:
    - The Gauntlet is a 1.2-acre, 18-hole putting course near the Black clubhouse, first come first served, and can be rented for groups. — [Gauntlet page](https://www.streamsongresort.com/golf/gauntlet-putting-course/)
    - The Chain is a 19-hole short course of about 3 hours that splits into 6- or 13-hole loops, allows groups of up to 8 (two tee times), and costs $95 for resort guests. — [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/); [Golf Fees](https://www.streamsongresort.com/golf/fees)
  - Bandon:
    - The Punchbowl putting course is free with no tee times, and staff lay out two new 18-hole routings daily.
    - The Practice Center has putting, chipping and bunker greens and Charlotte's par-3.
    - Shorty's is a 9-hole par-3, free for guests with an honor box for donations.
    - Source: [Bandon Practice Center](https://bandondunesgolf.com/?p=9084); [Plugged In Golf](https://pluggedingolf.com/?p=73794)
- **Gift cards and e-commerce:**
  - Pebble Beach sells gift cards on the Pebble Beach Shop website, usable at hotels, golf, restaurants, shops and spa. — [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
  - Pinehurst sells gift cards in any amount at ShopPinehurst.com. — [Pinehurst FAQ](https://www.pinehurst.com/faq/)
  - TPC Sawgrass has a gift card page, an online Golf Shop (shoptpc.com), a Member Login, an eClub and a Dining eClub. — [TPC Sawgrass Book a Tee Time](https://tpc.com/sawgrass/book-a-tee-time/)
  - Streamsong gift cards go through AcquaPietra (spa). — [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/)
- **Mobile apps:**
  - Pebble Beach:
    - The original resort app (2017, built with IBM Watson) had an illustrated resort map showing the guest's live position, a "Virtual Concierge" that narrated 17-Mile Drive stops, and push offers. — [Marketing Dive](https://www.marketingdive.com/news/pebble-beach-resorts-enlists-ibms-watson-for-mobile-tour-guide/442401/); [PR Newswire Asia](https://en.prnasia.com/releases/apac/IBM_and_Pebble_Beach_Company_Tap_Watson_to_Enhance_Traveler_Experience_at_Top_U_S_Resort-177046.shtml)
    - A separate "Pebble Beach – Beach & Tennis" members app handles court booking, beach club menus and fitness class registration. — [App Store](https://apps.apple.com/us/app/id6720719080)
    - No digital key or mobile ordering was confirmed.
  - Pinehurst: the only app found was a "Pinehurst Country Club, NC" listing rated 1.4/5 from 14 ratings, with no tee-time or lesson features described. — [App Store](https://apps.apple.com/us/app/id6463205901)
  - Streamsong: only an app privacy policy dated January 1, 2020 was found. — [search summary](https://www.streamsongresort.com/)
  - Bandon and TPC Sawgrass: no resort app was found.
- **Membership and loyalty:**
  - TPC Sawgrass has a member portal (sawgrass.tpc.com). — [TPC Sawgrass](https://tpc.com/sawgrass/book-a-tee-time/)
  - Pinehurst members get tee-time priority. — [Pinehurst Golf](https://www.pinehurst.com/golf/)
  - No points-based loyalty program was found at any of the five. Loyalty is expressed through booking priority and email-club offers instead (Pebble Beach "Insider" email offers, TPC eClub). — [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/); [TPC Sawgrass](https://tpc.com/sawgrass/book-a-tee-time/)
- **Payments:** Streamsong caddies take Venmo and Zelle, and the resort went cashless on July 1, 2026. — [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees); [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/)

### Inferences
- A **rental-club page listing exact models and flex options**, as Streamsong does, is cheap and answers a frequent question. CamSur could let guests reserve rental sets as an add-on during tee-time booking.
- **Digital gift cards** usable across golf, villas and dining are standard at every top resort. They suit the Philippine pasalubong/regalo and OFW-gifting market and could run through the existing payment rails.
- Since none of these resorts has a strong golf app, a **PWA (installable web app)** with booking, a booking QR for check-in, hole maps and a weather and live-cam view would put CamSur ahead of these resorts' apps, at web-dev cost only.
- Paying caddies through e-wallets (Streamsong's Venmo/Zelle) maps to **GCash/Maya caddie tips** locally.
- Putting courses and short courses with free or low-cost play (Punchbowl, Thistle Dhu, The Link, Shorty's with an honor box) are strong guest perks. Even a putting green "challenge" with a daily routing could be promoted online.

### Gaps
- No academy or lesson booking engines, prices or club-fitting booking were confirmed for any club.
- No handicap or scorecard tools on the official sites were found.
- Current App Store or Google Play listings for Pinehurst, Bandon, TPC Sawgrass and Streamsong resort apps were not confirmed. The Streamsong app may be defunct.
- Bandon and TPC Sawgrass gift-card details were not fully confirmed beyond TPC's gift-card page link.

## 5. Content and trust: storytelling, history, events, reviews, FAQs, webcams, chat/concierge, accessibility

### Takeaway
All five lean heavily on **detailed FAQ pages** that publish exact policies: dress code, bag weight, spectator rules, shipping addresses and cancellation terms. They also tell **heritage stories** about founders and architects. Events and tournaments are used for trust and urgency: THE PLAYERS, the AT&T Pro-Am, U.S. Opens at Pinehurst, and lottery news at Bandon. Live chat and accessibility statements were not prominent in what was fetched. Content quality is uneven; Streamsong's FAQ contained placeholder "Lorem ipsum" text.

### Cited Findings
- **Pebble Beach FAQ policies:**
  - Dress code: golf shirt; no denim, cargo or sweats; soft spikes recommended. The Hay has no firm dress code.
  - No personal coolers or outside alcohol on the course.
  - Courtesy shuttles run between the resorts and the courses.
  - Non-playing guests may walk the course only before or after play, and dogs must be leashed.
  - Source: [FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/)
- **Pinehurst:**
  - Dress code: collared shirts, belts; no denim, open-toe shoes or sandals, including on the range. Bag-weight limit is 24 lb.
  - The FAQ includes weather-day rules.
  - Source: [Pinehurst Golf](https://www.pinehurst.com/golf/); [Pinehurst FAQ](https://www.pinehurst.com/faq/)
  - Heritage storytelling on the golf page: Donald Ross, the "first U.S. Open anchor site," and Tommy Armour's "Kitty Hawk" quote. — [Pinehurst Golf](https://www.pinehurst.com/golf/)
- **Bandon:** uses blog-style FAQ posts on its own site, for example "Top 8 Caddie Questions," "Five things every golfer should know about the Practice Center" and "When do you aerify your greens?", plus a "Caddie Tradition" story page. — [Top 8 Caddie Questions](https://bandondunesgolf.com/?p=9117); [Practice Center](https://bandondunesgolf.com/?p=9084); [Caddie Tradition](https://bandondunesgolf.com/?p=136)
- **TPC Sawgrass:** ties its site to THE PLAYERS Championship (closure dates) and links to Facebook and Instagram. — [TPC Sawgrass Book a Tee Time](https://tpc.com/sawgrass/book-a-tee-time/)
- **Streamsong:**
  - The homepage combines course and lodging previews, dining and spa links, **event listings**, a reservation prompt and **newsletter signup**. — [Streamsong homepage](https://streamsongresort.com/the-gauntlet-live-stream)
  - It runs public golf events, such as a "Spring Stableford" and a "Partner Cup." — [Spring Stableford](https://www.streamsongresort.com/spring-stableford); [Partner Cup](https://www.streamsongresort.com/partner-cup)
  - The FAQ offers **online lost-and-found reporting** (items held 30 days) and free EV charging for guests. — [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/)
- **Quality flag:** Streamsong's FAQ answer "How long does it take to get to Streamsong?" contained Lorem ipsum placeholder text at the time of the fetch. — [Streamsong FAQ](https://www.streamsongresort.com/site-guide/faqs/)
- **Concierge tech:** Pebble Beach's 2017 app used an IBM Watson "Virtual Concierge." No current AI chat was confirmed. — [Marketing Dive](https://www.marketingdive.com/news/pebble-beach-resorts-enlists-ibms-watson-for-mobile-tour-guide/442401/)

### Inferences
- A **long, specific FAQ** (dress code, bag rules, caddie tips, weather and rain-check rules, spectators, shipping or delivery address) is the cheapest trust-builder, and every top resort has one. CamSur's multi-language support makes it more valuable.
- **Blog-style "know before you go" posts**, as Bandon does them, are a cheap SEO and trust tactic.
- **Recurring public events** with dedicated pages and registration (Streamsong's Spring Stableford and Partner Cup) give a smaller resort repeat traffic. This suits monthly CamSur club tournaments.
- Online lost-and-found and a published "how to get here" travel-time answer are small but useful. Streamsong's placeholder text shows the cost of leaving these unfinished.

### Gaps
- No on-site guest reviews or testimonials, live chat widgets or accessibility statements were confirmed on the pages fetched.
- No consolidated events calendar page was confirmed for any club, only individual event pages.

## 6. Distinctive or innovative features a smaller resort could copy cheaply

### Takeaway
The most copyable ideas are about **policy and content design**, not expensive technology: tiered booking windows, fair-access drawings, published rate calendars, caddie tables with suggested tips, live cams, maintenance calendars, free putting-course perks, preview-play launches and e-wallet caddie payment. None of the five has a standout golf app, so a good mobile web experience is an open gap.

### Cited Findings
- **Fair-access drawing for peak demand:** Bandon's online registration, then random order, then a callback to book, with full deposit and one reservation per applicant. — [GOLF.com](https://golf.com/travel/bandon-dunes-instituting-lottery-manage-demand/); [Bandon 2026 process](https://bandondunesgolf.com/?p=20440)
- **Tiered advance windows by guest type:** Pebble Beach (18 months / 6 months / 3 months / 24 hours by course and status), TPC (12 months vs 14 days) and Streamsong (resort vs 30-day day guest). — [Pebble FAQ mirror](https://pebblebeachlegacy-beta.kingandpartners.com/plan-my-trip/frequently-asked-questions/); [TPC](https://tpc.com/sawgrass/book-a-tee-time/); [Streamsong](https://www.streamsongresort.com/golf/fees)
- **Published seasonal and weekday rate grid with a resident rate:** Streamsong. — [Streamsong Golf Fees](https://www.streamsongresort.com/golf/fees)
- **Dynamic pricing** at TPC Sawgrass. — [GOLF.com 2022](https://golf.com/travel/tpc-sawgrass-rates-stadium-course-prices/)
- **Premium "Tour Player Experience" upsell** (walking caddie, locker room, meals) at TPC Sawgrass. — [GOLF.com 2022](https://golf.com/travel/tpc-sawgrass-rates-stadium-course-prices/)
- **Live cams:** Pebble Beach 18th green; Streamsong Live Cam. — [Pebble cam](https://pebblebeachlegacy-beta.kingandpartners.com/golf/pebble-beach-golf-links/live-golf-cams/the-18th-green-at-pebble-beach-golf-links/); [Streamsong](https://streamsongresort.com/the-gauntlet-live-stream)
- **Free short or putting perks for resort guests:** Streamsong's The Link (6 holes free), Pinehurst's Thistle Dhu (in the resort fee) and Bandon's Punchbowl and Shorty's (free or honor box). — [Streamsong](https://www.streamsongresort.com/golf/fees); [Pinehurst FAQ](https://www.pinehurst.com/faq/); [Plugged In Golf](https://pluggedingolf.com/?p=73794)
- **Preview Play and a sweepstakes** for a new course: Streamsong Bone Valley. — [Bone Valley](https://www.streamsongresort.com/golf/bone-valley/); [Sweepstakes](https://www.streamsongresort.com/golf/bone-valley/hb-sweepstakes/)
- **Blocked closure and aeration dates** shown in advance: TPC and Pinehurst. — [TPC](https://tpc.com/sawgrass/book-a-tee-time/); [Pinehurst Golf](https://www.pinehurst.com/golf/)
- **Location-aware resort map and audio tour** (the 2017 Pebble Beach app's illustrated live-position map and 17-Mile Drive narration). — [PR Newswire Asia](https://en.prnasia.com/releases/apac/IBM_and_Pebble_Beach_Company_Tap_Watson_to_Enhance_Traveler_Experience_at_Top_U_S_Resort-177046.shtml)

### Inferences
Low-cost feature ideas for CamSur Uptown Golf, ranked by estimated effort vs impact. These are recommendations, not facts.
1. **Tiered booking windows** (for example, members and villa guests 90 days, day guests 14 days) plus **blocked maintenance and closure dates**. This is a booking-engine configuration change.
2. **Caddie fee table with suggested tips**, a caddie request at booking, and **GCash/Maya tip payment**.
3. **Live cam** on a signature hole or the clubhouse view, placed next to the existing weather forecast.
4. **Transparent rate calendar** (season x weekday/weekend) with a **local-resident or Bicol rate** row.
5. **Rental-club add-on** listing exact models, and **digital gift cards** usable for golf, villas and dining.
6. **Themed itineraries** (Barkada Weekend, Couples, Family/Balikbayan) that link into the existing villa and tee-time flow.
7. **A long multi-language FAQ** plus "know before you go" posts (dress code, bag rules, rain checks, spectators, getting here).
8. **Free putting or short-game perk for villa guests**, and **preview play or a sweepstakes** for any new holes or facilities.
9. **A peak-date drawing** (for example, holidays or tournament weekends) modeled on Bandon, only if demand exceeds supply.
10. **A PWA** with the booking QR, hole maps, live cam and weather. The five US leaders' apps are dated or weak, so this is a chance to stand out.

### Gaps
- The cost or vendor behind each club's live cam was not found.
- No verified data was found on how these features affect conversion or revenue, so the ranking above is a judgment.
