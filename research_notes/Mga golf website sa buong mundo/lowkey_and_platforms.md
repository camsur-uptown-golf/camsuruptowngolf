# Lowkey, design-forward golf club websites and modern golf-tech player features

Research date: 5 November 2026. All sites were fetched live on this date unless noted. Substitutions: Tara Iti's public site is almost entirely members-only (a logo page, a member login and an enquiry form; [taraiti.com](https://www.taraiti.com)), so its public sister resort **Te Arai Links** was profiled instead. Cabot is profiled mainly through **Cabot Cape Breton**. Cabot Saint Lucia was checked, but its page holds little booking detail.

Method caveat: pages were read through a text-extraction fetcher. Visual design notes come from page structure and copy, plus the fetcher's description of interactive elements. Nobody looked at screenshots.

---

## Part A1. Sweetens Cove Golf Club (South Pittsburg, Tennessee): design, booking and services

### Takeaway
Sweetens Cove runs its whole website as a Shopify-style store. Golf is sold as "passes" (products), not tee times. Passes come out in a once-a-year, staged release with a non-refundable deposit. From 2027, play is all-day only, and food and non-alcoholic drinks are included. The brand extends into merch collections and its own bourbon. This "scarcity drop" model, run on e-commerce tools, is the club's most copyable idea.

### Cited Findings
**Design, tone and storytelling**
- The tagline is "It's different here." The site is bold and playful with large course photos, and the copy stresses fun, shot-making and strategy. The design firm is King Collins Dormer, and the course is about 25 minutes from Chattanooga — [sweetenscovegolfclub.com](http://sweetenscovegolfclub.com/)
- The site quotes press as social proof, including The Confidential Guide ("Golf is supposed to be fun"), Global Golf Post, The Fried Egg's "Digging Into Design" and Forbes. Owner Rob Collins has talked about expansion plans so guests can pack more into a stay — [sweetenscovegolfclub.com](http://sweetenscovegolfclub.com/)
- The navigation includes hole-by-hole pages (holes 1–9), News & Press, FAQs, a customer "Log in" (/account) and a link to a separate bourbon site, sweetenscovespirits.com — [sweetenscovegolfclub.com](http://sweetenscovegolfclub.com/)
- The URL structure (`/collections/experiences`, `/collections/shop-the-shed`, `/pages/...`, `/blogs/press`) shows the site runs on Shopify-style e-commerce. Tee "passes" and events are sold as products in collections — [sweetenscovegolfclub.com](http://sweetenscovegolfclub.com/)

**Booking model ("Reserve Passes")**
- Passes are released once a year, in the fall, for the next calendar year. The site tells guests to plan ahead with their group — [sweetenscovegolfclub.com](http://sweetenscovegolfclub.com/)
- 2027 release sequence:
  - First, a **lodging wave** runs from 22 Oct 2026, 5 PM CT, to 15 Nov 2026. Guests who book partner lodging (NLU Birdhouse, E9retreat, E9 tiny houses) are guaranteed passes for their check-in and check-out days, through a link sent after the window closes.
  - Then a **general release** opens in two-month blocks, each at 5 PM CT: Jan–Feb on 18 Nov, Mar–Apr on 21 Nov, May–Jun on 23 Nov, Jul–Aug on 25 Nov, Sep–Oct on 27 Nov and Nov–Dec on 29 Nov 2026.
  - [Pass Release & Lodging](https://sweetenscovegolfclub.com/pages/golf-pass-release-lodging-options)
- The 2027 deposit is **$150 per pass, non-refundable**. It is refunded only if the course must close (for example flooding or tarping). Rain alone does not earn a rain check. General-release deposits are cancelled automatically if unpaid by a deadline — [Pass Release & Lodging](https://sweetenscovegolfclub.com/pages/golf-pass-release-lodging-options)
- From 2 Jan 2027, play is **all-day only**, with no 9- or 18-hole rates. All-day passes include the option to walk or ride, **food and non-alcoholic drinks**. Alcohol is bought on property — [Daily Rates](https://sweetenscovegolfclub.com/pages/daily-rates)
- 2027 all-day prices per person, before tax and fees:

  | Season | Days | Walking | Cart |
  |---|---|---|---|
  | Peak | Thu–Sun & holidays | $240 | $290 |
  | Peak | Tue–Wed | $225 | $250 |
  | "Down with the Brown" | Thu–Sun | $200 | $235 |
  | "Down with the Brown" | Tue–Wed | $190 | $215 |

  [Daily Rates](https://sweetenscovegolfclub.com/pages/daily-rates)
- The 2026 rates were much lower: peak Thu–Sun all-day was $140 walking, and Tue–Wed 9 holes walking was $30. There was also a $15 non-refundable booking fee per pass. 2027 is a big repricing toward an all-inclusive day pass — [Daily Rates](https://sweetenscovegolfclub.com/pages/daily-rates)
- "Down with the Brown" is the cheeky brand name for the dormant-Bermuda off-season. The course is cart-path-only from 1 Nov to 30 Apr and closed on Mondays. Passes are sold **online only, and there is no waiting list** — [Daily Rates](https://sweetenscovegolfclub.com/pages/daily-rates)

**Unusual services**
- Digital gift cards come in $50–$500 denominations. Buyers can email them to the recipient with a message of up to 200 characters and a scheduled send date — [sweetenscovegolfclub.com](http://sweetenscovegolfclub.com/)
- The merch store is "The Shed," with themed drop collections (Barrel, Dunwoody, Camp Draddy, National Parks, One Day In April), a women's collection, flags and artwork, and a clearance section — [sweetenscovegolfclub.com](http://sweetenscovegolfclub.com/)
- Tournaments and events are announced on Instagram and booked as products on the site. The newsletter promises "first word" on course news, merch and promotions — [sweetenscovegolfclub.com](http://sweetenscovegolfclub.com/)
- The club sells its own branded spirits on a separate site — [sweetenscovespirits.com](http://sweetenscovegolfclub.com/)

### Inferences
- Running booking and merch on one e-commerce platform gives one cart, one customer account and one email list. A small venue can run "drops" (pass releases, merch collections, events) without separate tee-sheet software.
- Pairing lodging with guaranteed golf rewards guests who stay over. That maps directly onto CamSur's villa add-on, which could be reversed: "book a villa and get a guaranteed tee time."
- The all-inclusive day pass (unlimited golf plus food) is a simple, premium product for a destination course with 9 or few holes.

### Gaps
- The FAQ page returned HTTP 429 (rate limited), so caddie, BYOB, pet and group rules were not checked.
- "King of the Cove" or similar club or membership programs: none found on the pages fetched. I could not confirm whether one exists.
- Hours page and event product pages: not fetched.

---

## Part A2. Tobacco Road Golf Club (Sanford, North Carolina): design, booking and services

### Takeaway
Tobacco Road's site may be the most playful and interactive of the five. It has a time-of-day and weather "mood" panel, a sound toggle and a live "course conditions" bar. The voice is irreverent ("Drama King," "Stay Hydrated"), and the late designer Mike Strantz anchors the story. Booking runs through Noteefy, a booking engine with waitlist alerts. In August 2026 the club added The Matchbox, a 12-hole, walking-only, synthetic-turf par-3 course that also works as an on-course halfway house.

### Cited Findings
**Design, tone and storytelling**
- The homepage has an interactive time-and-weather panel (dawn-to-midnight and weather controls), a sound toggle and a "course conditions" bar. Sections alternate between large images and punchy headings — [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com)
- The voice is irreverent ("Drama King," "Stay Hydrated," "Get fired up for fun"). The story centers on Mike Strantz: the course is "Sculpted from Mike Strantz' legendary imagination," with a Strantz quote about pulling off shots you thought were beyond you — [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com)
- The main navigation is short: Golf, Stay & Play, News & Videos, Need to Know, Book Now and Contact — [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com)

**Booking**
- "Book Now" for both Tobacco Road and The Matchbox goes to a Noteefy booking page (booking.noteefy.app) — [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com)
- Stay & Play runs through a separate travel arm, Tobacco Road Travel, which offers "15+ lodging options and more than 30 golf courses." Named packages include the Stewart Cabin, Hickory House, Strantz Special and Sandhill Stay & Plays — [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com)
- The "Need to Know" page reads like a single practical brief:
  - the facility is cashless, with Apple Pay and Google Pay accepted
  - green fees include a shared cart with GPS
  - expected pace is 4 hours 40 minutes
  - weather policy: rain checks are pro-rated by holes played, non-transferable, and there are no refunds
  - club shipping through Ship Sticks
  - maintenance-period special rates (17 holes open in Jan–Feb 2027 for an irrigation project; aerification closure 28 Jun–7 Jul 2027) appear automatically on the booking page
  - [Need to Know](https://tobaccoroadgolf.com/need-to-know/)
- Juniors and military get "special rates" at certain times, on request — [Need to Know](https://tobaccoroadgolf.com/need-to-know/)

**The Matchbox short course and other services**
- The Matchbox is 12 holes, par 36, 736 yards, all par 3s on synthetic turf, and **walking-only**. Small carry bags are lent first-come, first-served. It has its own parking, entrance and golf shop — [Need to Know](https://tobaccoroadgolf.com/need-to-know/)
- It opened **1 August 2026**, with tee times bookable Aug–Dec 2026. It was built in about six months with no irrigation and no mass tree clearing. Holes run 40–105 yards. The designers are Justin Carlton and Lee Marshall with original Tobacco Road shaper Mark White — [The Golf Wire](https://thegolfwire.com/the-matchbox-at-tobacco-road-opens-august-1/); [Golf Course Architecture](https://www.golfcoursearchitecture.net/content/Tobacco-Road-to-open-new-12-hole-short-course-in-August-2026). Sources disagree on some hole yardages (hole 3: 60 or 80 yards). Rely on the club for exact figures.
- The Matchbox clubhouse is reachable after the 13th tee on Tobacco Road, so it doubles as a halfway house. Food and drink include the Pack House counter, a daily beverage cart and a signature "spicy pimento cheese dog" — [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com); [Need to Know](https://tobaccoroadgolf.com/need-to-know/)
- Merch: a Troon-hosted online store sells Skull, Leaf and "Mike Strantz Tall Flag" designs. A "Just Bring Your Clubs" giveaway offers Matchbox merch and a day on the short course — [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com)
- The site also has a News & Videos content hub and a newsletter signup — [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com)

### Inferences
- The interactive time and weather panel is a cheap but memorable way to sell atmosphere. CamSur could build a "sunrise to sunset" panel, possibly tied to its existing weather forecast.
- A single "Need to Know" page with payment, carts, pace, dress code, weather and rain-check policy is a strong model for an FAQ or Plan Your Visit page.
- A short course built cheaply, walking-only and on synthetic turf is a growing trend at lowkey destinations (see also Barnbougle's Bougle Run and Cabot's The Nest).

### Gaps
- Green fees and replay rates are not shown on the pages fetched. They are only visible inside the Noteefy booking flow.
- The "El Camino" item in the navigation had no detail. A Substack piece titled "Why an El Camino might truly grow the game" exists ([greebs.substack.com](https://greebs.substack.com/p/why-an-el-camino-might-truly-grow)) but was not read.

---

## Part A3. Barnbougle (Bridport, Tasmania, Australia): design, booking and services

### Takeaway
Barnbougle's site is less flashy and more of a practical resort hub: Play, Stay and Wine & Dine, with webcams, an Instagram feed and gift vouchers. Its distinctive offers are price transparency and flexible formats. It publishes two-year seasonal rate tables with separate local (Australian) and international prices, all-day and two-course passes, and Bougle Run, a 90-minute, 14-hole Bill Coore short course. Caddies are paid in cash, and escorted medical carts cover players who can't walk.

### Cited Findings
**Design, tone and storytelling**
- The navigation has Play, Stay and Wine & Dine dropdowns, a prominent "Book Now" button, image-led "Discover" cards, a live Instagram feed and a **webcams** page — [barnbougle.com.au](https://www.barnbougle.com.au)
- The origin story: "In golf terms, Barnbougle is young." The Dunes opened in 2004 (Tom Doak and Mike Clayton) on land that was once a coastal strip of a potato farm. The social voice is playful ("A little R&R (risk and reward) on the Lost Farm 14th") — [barnbougle.com.au](https://www.barnbougle.com.au)
- For its 20th anniversary, Barnbougle made a limited-edition 20-year single malt with Hellyers Road Distillery — [barnbougle.com.au](https://www.barnbougle.com.au)

**Booking and pricing**
- Booking runs through an external Agilysys reservation calendar. Gift vouchers are sold on a separate Agilysys page — [barnbougle.com.au](https://www.barnbougle.com.au)
- The rate table is published two seasons ahead in AUD, with **Australian and international prices**. Low 2026 (1 May–30 Sep) / High 2026–27 (1 Oct–30 Apr):

  | Fee | Australian | International |
  |---|---|---|
  | 18 holes | $174 / $199 | $260 / $285 |
  | All day, one course | $275 / $300 | $361 / $386 |
  | All day, two courses | $295 / $320 | $381 / $406 |
  | Bougle Run | $105 / $110 | $120 / $125 |

  [Fees & Services](https://barnbougle.com.au/play/fees-services/)
- Services: caddies cost from $100, **paid in cash to the caddie** after the round, plus tip. Club hire is $40 standard or $60 for Callaway executive clubs with a pull cart. Range buckets cost $6 or $12. Escorted medical carts cost from $150 (with a $50 deposit), need a medical certificate, must be driven by a caddie and are limited — [Fees & Services](https://barnbougle.com.au/play/fees-services/)
- Sample package: the Autumn/Winter Golf Escape costs from $570 per person for two nights at Lost Farm Lodge, a round on each course and daily breakfast — [barnbougle.com.au](https://www.barnbougle.com.au)

**Short course and other services**
- Bougle Run is 14 holes (12 par 3s and two par 4s) by Bill Coore, set in the dunes between Lost Farm's two nines. It is pitched as suiting "golfers of all abilities" and taking "just 90 minutes." The site has a course tour and a video interview with Coore about building the course remotely during the pandemic — [Bougle Run](https://barnbougle.com.au/play/bougle-run/); [barnbougle.com.au](https://www.barnbougle.com.au)
- Lodging (Dunes Cottages, Ocean Villas, Bunker Villas, Lost Farm Lodge), airport transfers and private charters. Dining: Lost Farm Restaurant, Dunes Clubhouse and a sports bar. Corporate packages, a "What's On + News" page and a newsletter — [barnbougle.com.au](https://www.barnbougle.com.au)

### Inferences
- Two-tier pricing (local and international) is well established at destination courses. For CamSur it maps to a Filipino-resident rate versus a foreign-visitor rate, also seen at Te Arai (Part A4).
- "All-day" and "two-course" passes are an easy way to sell unlimited replay.
- Webcams are a low-effort, high-trust feature for a remote destination, and they pair well with CamSur's weather forecast.

### Gaps
- Bougle Run's design and atmosphere (bar, music, night golf) are not described on the page.
- Rules on walking only versus carts are not explicit beyond the medical-cart policy. Merch is not mentioned.

---

## Part A4. Te Arai Links (Northland, New Zealand), standing in for Tara Iti / Cape Kidnappers: design, booking and services

### Takeaway
Tara Iti itself has a members-only web presence, while its public sister resort Te Arai Links is a polished, nature-led luxury resort site. It is walking-only, prices green fees in three tiers (international, AU/NZ resident, seasonal), books within a 28-day window, and lists caddies as a menu (single bag, double bag, forecaddie). It has also moved into a wider resort offer: spa, yoga, mountain biking, pickleball and family activities.

### Cited Findings
**Design and access**
- Tara Iti's public site is a logo page, a "Member Login" (nsmembers.taraiti.com), an enquiry form and a link to the Shorebirds Trust conservation charity, built by agency Hatch. No public booking info appears — [taraiti.com](https://www.taraiti.com)
- Te Arai's tone is premium and nature-led ("Discover the Spirit of Te Arai Links," "another world," "Golf as it was destined to be") — [tearai.com](https://tearai.com)

**Booking and pricing**
- Green fees in NZD include 15% GST:
  - international: $700 (Jul–Sep 2026) and $975 (Oct 2026–Apr 2027)
  - **AU/NZ residents: $300–$500** by season, with proof of residency checked at the golf shop
  - green-fee play must be booked **within 28 days** of the date
  - [tearai.com](https://tearai.com)
- On 5 Nov 2026 the site showed an outage banner: online and member-portal booking was down due to a Chorus (telecom) outage, with email and phone as fallbacks. It also still carried an outdated reservation notice about bookings "up to October 2024" — [tearai.com](https://tearai.com)
- The resort is **walking-only, with no carts for hire**, and spikeless shoes are required. Caddies: single bag NZ$225, double bag NZ$205 per player, forecaddie NZ$225 split among the group. Rental clubs are NZ$95. PGA lessons are booked by email — [tearai.com](https://tearai.com)

**Lodging, F&B and other services**
- Lodging per night: Ocean View Rooms NZ$590–1,250, Ocean Cottages NZ$1,950–5,950, four-bedroom Villas NZ$6,500–13,900. Some stays have 2–3 night minimums — [tearai.com](https://tearai.com)
- Dining: Ric's at the Ocean, North Clubhouse and a Halfway House on the North Course. Experiences: yoga and wellness, mountain biking, water sports, tennis, pickleball, family activities and a new Spa & Fitness Centre — [tearai.com](https://tearai.com)
- Gift cards are valid for 3 years across lodging, green fees, rentals, F&B and merch, with an online balance checker. There is also an online shop and a newsletter — [tearai.com](https://tearai.com)

### Inferences
- The outage banner shows the value of a booking fallback: a clear phone and email path, or a "request" form when the live tee sheet is down. CamSur already has an availability-request component that could play this role.
- Resident and visitor pricing with an ID check at arrival is the norm at destination courses.

### Gaps
- Cape Kidnappers (Rosewood) was not checked because of the tool-call budget.
- Te Arai's membership page details and short-course or putting-course offer: not found.

---

## Part A5. Cabot (Cape Breton, Nova Scotia; Saint Lucia): design, booking and services

### Takeaway
Cabot's site is a multi-destination "collection" platform. One domain (cabot.com) holds Cape Breton, Citrus Farms, Highlands, Bordeaux, Saint Lucia, Revelstoke and Lofoten Links (plus managed courses), and the pages lean on rankings and real estate. Its player-facing standouts are a firm walking-only culture with group and bag-carrier caddies, The Nest (an 11-hole par-3 course with night golf under stadium lights), clear weather and medical-cart policies, and club shipping. Booking and rate detail sits behind "Book Now" and "Inquire Now" pages.

### Cited Findings
**Design, tone and storytelling**
- The design is image-led, with a full-width hero, numbered carousels ("01 / 06") and cards for accommodation, real estate, experiences, dining, packages and golf. Accolades show as cards with publication logos — [cabot.com/capebreton](https://cabot.com/capebreton/)
- Tone: "Where World-Class Golf Meets Coastal Charm," "golf as it was meant to be played," "the ocean breeze shaping every shot." Real estate: "Own a piece of magic" — [cabot.com/capebreton](https://cabot.com/capebreton/)
- Rankings are central to the pitch, for example Golf Digest World's 100 Greatest 2026–27 (Cliffs #14, Links #25) and SCOREGolf Best Public in Canada 2026 (Cliffs #1, Links #2) — [cabot.com/capebreton](https://cabot.com/capebreton/)
- The global navigation lists the destinations above, a central Shop (shop.thecabotcollection.com) and Real Estate — [cabot.com/capebreton](https://cabot.com/capebreton/)
- Saint Lucia: the headline is "Caribbean Luxury, Effortlessly Relaxed." Point Hardy (Coore & Crenshaw) runs across about 1.5 miles of coastline on a 375-acre peninsula. The page shows a ranking conflict (GOLF Top 100 listed as both #76 and #69). The call to action is "Inquire Now," and ownership and membership are tied to real estate — [cabot.com/saintlucia](https://cabot.com/saintlucia/)

**Booking and play culture**
- Cabot Links and Cabot Cliffs are **walking-only**, and the site argues "a cart can't match the experience." Group caddies and bag-carrier caddies are available on request for an extra fee — [Cabot Cape Breton Golf](https://cabot.com/capebreton/golf/)
- Medical carts are limited, must be booked well ahead, need a medical certificate and are driven by a caddie. Weather policy: play stops only for lightning, rain does not qualify for a refund, and tee times may be rearranged on the day — [Cabot Cape Breton Golf](https://cabot.com/capebreton/golf/)
- Clubs and luggage can be shipped through Ship Sticks — [Cabot Cape Breton Golf](https://cabot.com/capebreton/golf/)

**Short course and other services**
- The Nest is an **11-hole par-3** course on the highest point of Cabot Cliffs, with **night golf under stadium lights from late August** to season end. Total: 47 holes — [Cabot Cape Breton Golf](https://cabot.com/capebreton/golf/); [cabot.com/capebreton](https://cabot.com/capebreton/)
- Lodging (Cabot Links Lodge, Golf Villas, luxury homes) and packages combining golf, lodging and dining — [cabot.com/capebreton](https://cabot.com/capebreton/)
- Noteefy lists Cabot Citrus Farms among its customers, which suggests Cabot uses waitlist and booking-alert technology at some properties — [noteefy.com](https://noteefy.com)

### Inferences
- Night golf on a lit short course is a strong idea for a tropical resort, where evenings are cooler than midday. It could suit CamSur if a par-3 or putting course is ever built.
- A clear walking-and-caddie policy plus a medical-cart exception is a model for an accessibility policy page.

### Gaps
- Cape Breton rates, replay rates, booking windows and resort-guest priority sit on /capebreton/book-now/, which was not fetched.
- Cabot's cross-property membership model was not found: the Revelstoke membership URL returned a 404 ([cabot.com/revelstoke/membership](https://cabot.com/revelstoke/membership/)). A search for "Cabot Citizen" returned unrelated results.
- Details of the Cabot Cape Breton putting course were not found on the pages fetched.

---

## Part B1. Player-facing features of modern golf booking and engagement platforms

### Takeaway
Across tee-sheet platforms, marketplaces and golfer apps, these features are now widely offered:
- online booking around the clock with prepayment and mobile check-in
- automated reminders that let golfers confirm or cancel
- **waitlists that alert golfers when a tee time opens**: Noteefy, plus Lightspeed's "On Deck," launched in September 2026
- dynamic pricing
- loyalty points and subscription memberships (GolfPass+)
- mobile food and drink ordering
- simulator and range-bay booking
- GPS and scoring apps with AI caddies and handicap tracking

The newest edge is **AI booking**: AI pro-shop assistants, and golfers booking through ChatGPT- and Claude-style assistants (Noteefy).

### Cited Findings
**Booking marketplaces and loyalty (GolfNow / GolfPass)**
- GolfPass+ (current pages, 2026): up to 12 fee-free tee-time bookings a year (up to 4 players each), $120 a year in Hot Deals credits (monthly $10 codes), 25% more Rewards points, and cancellation protection for up to 10 reservations, changeable until 1 hour before play — [GolfNow GolfPass](https://golfnow.com/memberships/golfpass); [GolfNow Hot Deals](https://www.golfnow.com/hotdeals). Other GolfPass pages show conflicting figures ($60 credits; a "$250 annual value"), and an old 2021 price of $99 a year is likely outdated — [golfpass.com/flex](https://www.golfpass.com/flex); [The Golf Wire](https://thegolfwire.com/golfpass-digital-membership)
- GolfNow Rewards convert at a fixed rate of 100 points = one $10 Hot Deals code — [GolfNow GolfPass](https://golfnow.com/memberships/golfpass)
- GolfNow reported that seven of its 10 biggest booking days ever came in 2025 — [First Call Golf / GolfNow release](https://www.firstcallgolf.com/industry-news/release/2025-10-13/online-bookings-growth-innovative-tech-and-services-puts-golfnow-on-pace-for-a-record-2025)

**Waitlists, reminders and AI (Noteefy, Lightspeed Golf)**
- Noteefy offers four player-facing features:
  - a booking engine
  - **instant alerts** when a preferred time opens, which refill cancellations and no-shows
  - **"Confirm"** reminders to confirm, change or cancel
  - a **24/7 AI Pro Shop Assistant** for tee times, conditions and course questions
- Noteefy says golfers can now **find, book and pay for tee times inside AI assistants (ChatGPT, Claude, Muse)**, with bookings going to the course's own tee sheet at its rates. It claims 1,500+ courses — [noteefy.com](https://noteefy.com)
- Noteefy's vendor-reported case studies (not independently verified):
  - Chambers Bay: $325k+ in bookings from cancelled tee times, and a 75% conversion rate on 48-hour cancellations
  - Palm Beach County Golf: $1M+ recovered across four courses in under a year
  - Kiva Dunes: share of booked rounds actually played rose from 75% to 95%
  - Granite Links: 4,586 AI-assistant conversations and 3,963 pro-shop calls saved
  - [noteefy.com](https://noteefy.com)
- Lightspeed Golf launched **On Deck** on 15 Sep 2026. Golfers request a preferred tee time or time window and get an automated email when a matching slot opens. **Tee Time Reminders** launched alongside it: an email 48 hours ahead to confirm or edit — [Lightspeed / Canada NewsWire via Placera](https://www.placera.se/pressmeddelanden/lightspeed-pos-lightspeed-introduces-on-deck-to-help-golf-courses-recapture-canceled-tee-time-demand-20260915)
- Lightspeed also markets:
  - in-app booking and payments
  - **order-ahead** food and drink for the halfway house or restaurant, and "Order Anywhere" from course or patio
  - **self check-in** from a phone once the golfer is near the course
  - These are vendor marketing claims — [Lightspeed Golf](https://lightspeedhq.com/golf/); [Lightspeed blog](https://www.lightspeedhq.com/blog/8-ways-lightspeed-can-help-you-close-the-season-strong/); [Lightspeed vs Tee-On](https://www.lightspeedhq.com/pc/golf/lightspeed-vs-tee-on-2-nav/)

**Tee-sheet platforms (foreUP, Golfmanager)**
- foreUP: mobile check-in from the customer's online portal. Confirmation emails carry a check-in link, and golfers who prepaid only need to check in. Source dates from the COVID period, so details may be dated — [The Golf Wire](https://thegolfwire.com/foreup-covid). Loyalty and targeted offers are documented as course-side tools. The golfer app is thinly documented (App Store rating 2.8 from 5 ratings) — [Spotsaas](https://www.spotsaas.com/blog/?p=19358); [App Store](https://apps.apple.com/us/app/foreup/id1487859705)
- Golfmanager (a European resort-focused platform). Features listed on its homepage:
  - online booking around the clock, group bookings, **multipacks** and a booking map
  - automatic memberships and **reciprocal agreements**
  - a standard or **custom-branded** mobile app
  - loyalty, surveys and CRM messaging on the player's preferred channel
  - payment links, promotions and **dynamic pricing**
  - join-a-game, tournaments, camps and **waiting lists**
  - online **lesson booking**
  - **simulator and range bays** with automated booking, payment and bay access
  - pro shop e-commerce and restaurant table plan
  - Clients include Costa Navarino, Punta Espada, Royal Golf Club Bahrain, Aphrodite Hills, Verdura and Finca Cortesín. Golfmanager claims 37 of the "Top 100 Golf Resorts in Continental Europe." — [golfmanager.com](https://golfmanager.com)

**Dynamic pricing**
- National Club Golfer expects more clubs to use dynamic tee-time pricing in 2026 — [National Club Golfer](https://www.nationalclubgolfer.com/club/5-things-you-will-see-at-your-golf-clubs-in-2026)
- Example structure (Golf PEI / Crowbush Cove): bookings 30+ days ahead pay the standard rate, then prices move automatically as times fill or open — [golfpei.ca](https://golfpei.ca/?p=7755)
- Teesnap sells a dynamic-pricing product — [Teesnap](https://www.teesnap.com/dynamic-pricing/)

**GPS, scoring and handicap apps (18Birdies, Hole19, TheGrint)**
- Hole19's App Store listing names "Otto AI," a personal AI caddie in its paid tier, plus AI shot tracking, a digital scorecard and an official handicap tracker — [App Store: Hole19](https://apps.apple.com/us/app/794462227)
- 18Birdies is described as having a strong AI caddie that adjusts for wind, slope, temperature, humidity and altitude (third-party roundup). Its pricing differs between sources ($99.99 vs $79.99 a year) — [Golf Pad roundup](https://golfpadgps.com/news/best-golf-gps-apps-2026); [GolfN comparison](https://www.golfn.com/blogs-items/golfn-vs-18birdies-review)
- TheGrint is described as a USGA-licensed handicap app with group scoring and GPS. No AI caddie was found (third-party sources) — [Golf Pad roundup](https://golfpadgps.com/news/best-golf-gps-apps-2026)

**Range tech (Toptracer)**
- The Toptracer app has player profiles, stored practice data, local and global leaderboards, and swing clips with ball traces. Golfers pair by scanning a QR code at the bay. Skill games need "Range Mobile"-enabled venues — [Palmetto Dunes](https://www.palmettodunes.com/blog/why-the-toptracer-range-is-a-game-changer-for-golfers-of-all-levels); [SourceForge app snapshot](https://sourceforge.net/app/toptracer-range/android/)
- Bay booking varies by venue: minimum 1-hour rentals, booking up to 3 days ahead, card-on-file holds — [Rogers Park](https://rogersparkgolf.net/toptracerrange); [5 Ponds GC](https://5pondsgc.com/toptracer/)
- At the Jan 2026 PGA Show, Toptracer announced **Toptracer Go and Toptracer IQ**, promising booking a bay online or by phone and a personal welcome message when unlocking the bay screen. These were announced products, and availability is unconfirmed — [The Golf Wire](https://thegolfwire.com/toptracer-iq-and-toptracer-go-lead-line-of-products-at-pga-show)

**Golfer behavior**
- NGF ("Golf's $100 Million Phone Problem"): only about **40% of golfers book tee times exclusively or mostly online**, versus 80–90% for flights and hotels. **Two-thirds of course phone calls are about reservations and pricing.** The publication date is unconfirmed — [NGF](https://www.ngf.org/tag/facility-operations/)

### Inferences
- The phone-call statistic explains why AI pro-shop assistants and AI-assistant booking are the hot category in 2026. CamSur could add a chat assistant (in Tagalog, Bikol and English) that answers rates, conditions and availability questions and hands golfers into the existing booking flow.
- Waitlist alerts went from a niche add-on to a built-in feature of a major platform (Lightspeed) in 2026.

### Gaps
- Club Caddie, Chronogolf's consumer app, GolfPass content and video features, and the official 18Birdies and TheGrint product pages were not fetched because of the tool-call budget. App pricing comes from third-party pages and conflicts between sources.
- No credible independent survey of golfer attitudes to dynamic or surge pricing was found.
- Split payments and group payments: not confirmed in any source fetched. No platform page explicitly documented per-player split payment.
- Digital gift cards are confirmed at the clubs in Part A (Sweetens Cove, Te Arai, Barnbougle), not from platform documentation.

---

## Part B2. Table stakes vs differentiators (2025–2026)

### Takeaway
Table stakes are the features most courses on major platforms offer and that golfers will notice missing. Differentiators are newer, rarer, or brand- and experience-led. CamSur already covers several of the table stakes: online booking, downpayment, membership login, hole-by-hole pages, weather and multiple languages.

### Cited Findings
- Online booking around the clock and in-app payment are standard features of every platform checked — [golfmanager.com](https://golfmanager.com); [Lightspeed Golf](https://lightspeedhq.com/golf/); [noteefy.com](https://noteefy.com)
- Automated reminders to confirm, modify or cancel are now built into Lightspeed (Sep 2026) and Noteefy — [Lightspeed / Placera](https://www.placera.se/pressmeddelanden/lightspeed-pos-lightspeed-introduces-on-deck-to-help-golf-courses-recapture-canceled-tee-time-demand-20260915); [noteefy.com](https://noteefy.com)
- Waitlist alerts were only just launched by Lightspeed (Sep 2026), so they are moving from differentiator to standard. Notably, Sweetens Cove deliberately has "no waiting list" — [Lightspeed / Placera](https://www.placera.se/pressmeddelanden/lightspeed-pos-lightspeed-introduces-on-deck-to-help-golf-courses-recapture-canceled-tee-time-demand-20260915); [Sweetens Daily Rates](https://sweetenscovegolfclub.com/pages/daily-rates)
- Mobile or self check-in and order-ahead food and drink are offered by Lightspeed and foreUP — [Lightspeed vs Tee-On](https://www.lightspeedhq.com/pc/golf/lightspeed-vs-tee-on-2-nav/); [The Golf Wire on foreUP](https://thegolfwire.com/foreup-covid)
- Dynamic pricing is spreading but not universal ("will use more" in 2026) — [National Club Golfer](https://www.nationalclubgolfer.com/club/5-things-you-will-see-at-your-golf-clubs-in-2026)
- AI booking through ChatGPT- and Claude-style assistants and an AI pro-shop assistant: newest, offered by Noteefy — [noteefy.com](https://noteefy.com)
- GPS, digital scorecards and handicap tracking are commodity features in free or freemium golfer apps. AI caddies are the premium tier — [App Store: Hole19](https://apps.apple.com/us/app/794462227); [Golf Pad roundup](https://golfpadgps.com/news/best-golf-gps-apps-2026)
- Experience-led differentiators from Part A:
  - interactive time and weather mood panel and sound (Tobacco Road)
  - webcams (Barnbougle)
  - staged annual pass drops tied to lodging (Sweetens Cove)
  - all-inclusive day passes with food (Sweetens Cove)
  - lit night golf on a par-3 course (Cabot The Nest)
  - synthetic-turf, walking-only short course doubling as a halfway house (Tobacco Road Matchbox)
  - local vs international pricing (Barnbougle, Te Arai)
  - merch "collections" and own-brand spirits (Sweetens Cove, Barnbougle)
  - gift cards usable across golf, lodging and F&B (Te Arai)
  - sources: [tobaccoroadgolf.com](https://www.tobaccoroadgolf.com); [barnbougle.com.au](https://www.barnbougle.com.au); [Sweetens Pass Release](https://sweetenscovegolfclub.com/pages/golf-pass-release-lodging-options); [Cabot Golf](https://cabot.com/capebreton/golf/); [Need to Know](https://tobaccoroadgolf.com/need-to-know/); [tearai.com](https://tearai.com)

### Inferences
**Suggested sorting for CamSur Uptown Golf.** These categories are a judgment call, not sourced.

- **Table stakes, missing or to confirm:**
  - booking confirmation plus reminder (email, SMS or Viber) with self-serve change and cancel
  - a clear weather and rain-check policy page in the style of "Need to Know"
  - digital gift cards (email delivery, scheduled send date)
  - mobile or QR check-in
  - a resident vs international rate tier
- **Near-term differentiators:**
  - cancellation waitlist alerts
  - an all-day or replay pass
  - "book a villa and get guaranteed tee times" bundles
  - live webcam or "course conditions" bar
  - order-ahead halfway-house food and drink
  - group booking with per-player payment
- **Brand differentiators:**
  - a sunrise-to-sunset mood panel tied to the weather feed
  - annual or seasonal "drops" for merch and limited tee packages
  - a lit par-3 or putting course for evening play, which suits the tropical heat
  - local-identity storytelling (designer, land, Bicol culture)
  - a multilingual AI concierge (Tagalog, Bikol, English, Korean, Japanese)

### Gaps
- No primary-source survey ranks which features golfers consider "must-have." The table-stakes vs differentiator split above combines vendor launch timing and how often a feature appears across platforms, so treat it as directional.
- No Philippines- or Southeast Asia-specific platform data was gathered, for example on local tee-time apps or payment habits such as GCash and Maya.
