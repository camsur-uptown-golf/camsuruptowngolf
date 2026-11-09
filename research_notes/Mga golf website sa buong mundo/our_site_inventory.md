# CamSur Uptown Golf: Inventory of Current Site Features (code inventory, 2026-11-05)

Scope note: this is a read-only inventory of the local Next.js repo at `/Users/cherrylbataller/Documents/camsuruptowngolf` (working tree as of 2026-11-05, with many uncommitted changes on `main`). All "sources" are local file paths relative to the repo root. Nothing was run, and no live site was checked. "Live" below means the code is wired up and reachable from a route. It does not mean the feature is deployed in production.

## 1. What pages/sections exist?

### Takeaway
The site has about 50 indexable URLs. They cover 5 main editorial sections (Golf, Clubhouse, Packages, Events, Experiences), 18 hole-by-hole pages, 9 clubhouse-space pages, a Villa Del Rey resort page with 4 house pages, 2 package itinerary pages, and utility pages: Plan Your Visit, Book, FAQ, Getting Here, Members, Pro Shop, The Uptown Life, Clubhouse Architecture, Terms of Use, and a 404 page. There is a sitemap, robots.txt, and an OG image.

### Cited Findings
- The sitemap lists `/`, `/plan-your-visit`, `/golf/book`, `/packages/stay-and-play`, `/packages/buddy-trip`, `/pro-shop`, `/the-uptown-life`, `/clubhouse/architecture`, `/faq`, `/getting-here`, `/members`, and `/terms-of-use`. It also adds every SITE_SECTION, all 18 course pages, every clubhouse space, accommodations, and Villa Del Rey houses. Private `/golf/book/<code>` and `/api` are excluded on purpose. Source: [src/app/sitemap.ts](src/app/sitemap.ts)
- Dynamic `[section]` route covers `golf`, `clubhouse`, `packages`, `events`, `experiences`. The `accommodations` slug is routed separately. The Golf meta description is "Eighteen championship holes, par 72, shaped around the views of Mt. Isarog." Source: [src/app/[section]/page.tsx](src/app/[section]/page.tsx), [src/lib/site-content.ts](src/lib/site-content.ts)
- Section heroes are rich media. Golf, Packages, Events and Experiences use a sticky scroll-zoom hero. The Clubhouse hero is a 35-second walkthrough video (1280/1920 variants). The Experiences hero is a background MP4. Source: [src/app/[section]/page.tsx](src/app/[section]/page.tsx)
- The homepage is built from HeroVideo (a 4K/60fps aerial teaser in 3 compressed sizes: 2560/1920/1280), ConceptCarousel (course concept "landscapes"), HomeClubhouseOverview, HomeExplore, HomeClubhouseDayCards, HomeVillaDelReyBento, and PackagesCarousel. It shows the mark "Est. 2027". Source: [src/app/page.tsx](src/app/page.tsx), [src/lib/site-content.ts](src/lib/site-content.ts)
- Hole pages: `/golf/courses/hole-no.1` … `hole-no.18`. Each has an aerial image, an official routing map PNG with play lines, a hole description, a full 18-hole Scorecard, a "Lakeside course views" gallery, and a "Have a question about the course?" QuickQuestion form. Source: [src/app/golf/courses/[hole]/page.tsx](src/app/golf/courses/[hole]/page.tsx), [src/lib/site-content.ts](src/lib/site-content.ts)
- Clubhouse space pages (`/clubhouse/[space]`): the-drum (bronze canopy), the-hall (entrance hall), golf-shop, locker-rooms, spa (showers), pool (bar and pool area), members-lounge, practice-bays, vip (VIP wing), and rooftop (sky bar and gardens). Each has a ClubhouseGallery. Source: [src/lib/clubhouse.ts](src/lib/clubhouse.ts), [src/app/clubhouse/[space]/page.tsx](src/app/clubhouse/[space]/page.tsx)
- `/clubhouse/architecture` is a separate page for the architect's material (brief, palette, area schedule in m²). Source: [src/app/clubhouse/architecture/page.tsx](src/app/clubhouse/architecture/page.tsx)
- Accommodations: `/accommodations/villa-del-rey` (with ImageLightbox and VillaDelReyStays) and 4 house pages: `/accommodations/villa-del-rey/{villas, cabins, cabana, dwell}`. Each house page has an AvailabilityRequest form. Source: [src/lib/villa-del-rey.ts](src/lib/villa-del-rey.ts), [src/app/accommodations/[stay]/[house]/page.tsx](src/app/accommodations/[stay]/[house]/page.tsx)
- Packages: `/packages/stay-and-play` (2 days / 1 night, 18 holes with caddie, "Couples and solo golfers") and `/packages/buddy-trip` ("Group Golf Getaway", 3 days / 2 nights, 2 rounds). Both are day-by-day itinerary pages built on a shared PackageItineraryPage. Source: [src/app/packages/stay-and-play/page.tsx](src/app/packages/stay-and-play/page.tsx), [src/app/packages/buddy-trip/page.tsx](src/app/packages/buddy-trip/page.tsx), [src/components/PackageItineraryPage.tsx](src/components/PackageItineraryPage.tsx)
- Events section has 3 occasion types: Golf Tournaments, Corporate Events, and Private Celebrations. Each lists inclusions (e.g., "Tournament-day coordination", "Awards-ready clubhouse spaces") and is followed by planning steps. Source: [src/components/EventsDetails.tsx](src/components/EventsDetails.tsx)
- Experiences section (non-golf) covers Wakeboarding, Pickle Ball, Outdoor/Indoor Basketball, Massage, ATV, Lago Del Rey, Pump Track, Skate Park, Kiddie Park, and Billiards. Mega-menu items link out to external `visitcamsur.com/facilities/...` pages. Source: [src/lib/site-content.ts](src/lib/site-content.ts), [src/components/ExperiencesDetails.tsx](src/components/ExperiencesDetails.tsx)
- `/plan-your-visit` is a hub with 3 parts: a hero quick-book widget (date · round · players → "Find tee times"), cards for "Play a round / Stay the night / Packages", a collapsible GroupInquiry form for groups and events, and "Good to know" (directions, FAQ, phone, email). There is no separate /contact page. Source: [src/app/plan-your-visit/page.tsx](src/app/plan-your-visit/page.tsx), [src/components/QuickBook.tsx](src/components/QuickBook.tsx)
- `/faq` has a searchable FAQ (FaqSearch) in 3 groups: Booking & rates, On the day, Staying & getting here (11 Q&As). Source: [src/app/faq/page.tsx](src/app/faq/page.tsx), [src/lib/site-content.ts](src/lib/site-content.ts)
- `/getting-here` gives travel times from 3 origins and arrival notes (parking, transfers). Source: [src/app/getting-here/page.tsx](src/app/getting-here/page.tsx), [src/lib/site-content.ts](src/lib/site-content.ts)
- `/pro-shop` and `/the-uptown-life` are concept/editorial pages (see Q5). Source: [src/app/pro-shop/page.tsx](src/app/pro-shop/page.tsx), [src/app/the-uptown-life/page.tsx](src/app/the-uptown-life/page.tsx)
- Breadcrumbs appear on inner pages and emit schema.org BreadcrumbList JSON-LD. No other structured data (e.g., GolfCourse/LocalBusiness schema) was found. Source: [src/components/Breadcrumbs.tsx](src/components/Breadcrumbs.tsx)
- The header has a desktop mega menu with section images and links, a mobile menu, and a built-in site search over a curated index with keyword aliases. Source: [src/components/Header.tsx](src/components/Header.tsx), [src/lib/site-search.ts](src/lib/site-search.ts)
- Footer link groups: Play (Course, Packages), Discover (Clubhouse, Experiences, Events, Pro Shop, The Uptown Life), Visit (Villa Del Rey, Plan Your Visit), and Before you book (FAQ, How to Get Here). The footer also has a newsletter signup and "Follow us" icons. Source: [src/components/Footer.tsx](src/components/Footer.tsx)

### Inferences
- The information architecture is already broad, close to a resort-club site: course, clubhouse, stay, packages, events, experiences, plan, FAQ, directions, membership, shop. Gaps are more about depth and live operations than missing top-level sections.

### Gaps
- I did not verify whether the production deployment matches this working tree. Many files are uncommitted.

## 2. What does online tee-time booking do?

### Takeaway
`/golf/book` is a working booking engine. It runs as a 6-step collapsible card flow: date with weather forecast → round (Full / Front nine / Back nine) and tee time → players → add-ons → optional Villa night → contact. It ends with a 30% downpayment through PayMongo hosted checkout (GCash, Maya, GrabPay, card), with a 15-minute slot hold, a reservation code, and a status page. All prices are sample values the club has not approved.

### Cited Findings
- Course rules in code: first tee 06:00, closes 18:00, 30-minute start interval, max 4 players, book up to 30 days ahead, 15-minute hold while paying, depositRate 0.3. Source: [src/lib/golf-booking.ts](src/lib/golf-booking.ts)
- Last start is computed so the round ends before closing: about 1:30 PM for 18 holes and about 3:30 PM for 9 holes. Estimated duration is 270 min (18) or 130 min (9). Source: [src/lib/golf-booking.ts](src/lib/golf-booking.ts)
- Slots are private (one booking per date + tee + time). The club's "exclusiveNines" rule is on: a group blocks its whole nine for the length of its round, and an 18-hole booking blocks both nines. Starts can be from Hole 1 or Hole 10, with crossover logic. Source: [src/lib/golf-booking.ts](src/lib/golf-booking.ts)
- Sample prices (PHP), explicitly "HALIMBAWANG PRESYO" (example prices, not approved): green fee ₱2,500 (9 holes) / ₱4,500 (18 holes) per player. Add-ons: Caddie ₱800/player, Golf cart ₱1,800/cart (2 players), Club rental ₱1,500/set, Range bucket ₱300. Source: [src/lib/golf-booking.ts](src/lib/golf-booking.ts)
- Villa add-on (one night): Villas ₱9,500 (4 units, sleeps 4), Dwell ₱7,500 (4 units, sleeps 2), Cabins ₱6,500 (6 units, sleeps 2), Cabana ₱4,500 (6 units, sleeps 2). Each shows live vacancy. "Stay the night" is suggested for starts from 13:00. Source: [src/lib/golf-booking.ts](src/lib/golf-booking.ts), [src/components/TeeTimeBooking.tsx](src/components/TeeTimeBooking.tsx)
- The form has an itemised live quote (lines, total, deposit, balance) and optional names for each player. The server recomputes the price so the browser total is never trusted. Source: [src/components/TeeTimeBooking.tsx](src/components/TeeTimeBooking.tsx), [src/app/api/tee-times/reserve/route.ts](src/app/api/tee-times/reserve/route.ts)
- `GET /api/tee-times?date=&holes=` returns open, booked, or past for each start time on Hole 1 and Hole 10, plus villa vacancies. It never reveals who booked. Source: [src/app/api/tee-times/route.ts](src/app/api/tee-times/route.ts)
- `POST /api/tee-times/reserve` validates the request, creates a "held" reservation, and returns a code plus a PayMongo checkoutUrl. It links the booking to a logged-in member if there is one (memberId). Logged-in members get their contact details pre-filled. Source: [src/app/api/tee-times/reserve/route.ts](src/app/api/tee-times/reserve/route.ts), [src/app/members/page.tsx](src/app/members/page.tsx)
- Payment confirmation has two paths. The return URL (`/api/tee-times/return`) asks PayMongo whether the session was paid. The signed webhook (`/api/paymongo/webhook`, event `checkout_session.payment.paid`, HMAC-verified) is the backup. PayMongo sends an email receipt (`send_email_receipt: true`). Source: [src/lib/paymongo.ts](src/lib/paymongo.ts), [src/app/api/tee-times/return/route.ts](src/app/api/tee-times/return/route.ts), [src/app/api/paymongo/webhook/route.ts](src/app/api/paymongo/webhook/route.ts)
- Booking codes have the format `CU-` plus 10 random characters. `/golf/book/[code]` (noindex) shows the status: Confirmed ("You're on the tee sheet."), Awaiting downpayment, Expired, or Cancelled. It also shows date, tee time and start hole, round with estimated finish, players, add-ons, villa, and amounts. A held booking gets a "Complete downpayment" button that starts a new checkout. Source: [src/app/golf/book/[code]/page.tsx](src/app/golf/book/[code]/page.tsx), [src/components/ReservationActions.tsx](src/components/ReservationActions.tsx), [src/app/api/tee-times/pay/route.ts](src/app/api/tee-times/pay/route.ts), [src/app/api/tee-times/reservation/route.ts](src/app/api/tee-times/reservation/route.ts)
- An unpaid hold expires and its slot reopens. Statuses are held, confirmed, expired, and cancelled. Source: [src/lib/reservations-db.ts](src/lib/reservations-db.ts)
- Test mode: with no PayMongo key and not in production, `/api/tee-times/simulate` confirms a booking with "TEST-PAYMENT". It returns 404 in production. Source: [src/app/api/tee-times/simulate/route.ts](src/app/api/tee-times/simulate/route.ts)
- The quick-book on `/plan-your-visit` deep-links into `/golf/book` with the choices pre-filled. Source: [src/components/QuickBook.tsx](src/components/QuickBook.tsx)

### Inferences
- The booking is more advanced than many resort sites: real-time availability, deposits through local e-wallets, and a resort-night upsell inside the flow. Missing pieces that peers often have: a self-service cancel or reschedule flow, member-rate pricing, booking-window tiers enforced in code, promo codes, add-to-calendar, and site-sent confirmation emails or SMS.

### Gaps
- "cancelled" exists as a status, but I found no guest-facing cancel or reschedule endpoint, and no refund or cancellation-policy logic.
- No email-sending library (Resend, Nodemailer, SendGrid, etc.) exists in `src/`. The only automated email appears to be PayMongo's receipt.
- Membership booking windows (3/7/14 days) are listed in plan benefits. The booking engine applies one flat `bookAheadDays: 30` and gives no member pricing or priority. I saw no code enforcing tiers.
- There is no "my bookings" history for members. The mobile code says so explicitly (see Q4).

## 3. What membership features exist?

### Takeaway
`/members` has working email/password signup and login, plus Google and Apple social sign-in (OAuth with PKCE). A logged-in dashboard shows account details and lets the member pick, change, or remove one of 3 monthly plans: Birdie, Eagle, Albatross. Choosing a plan is not paid; it is only recorded for the club to confirm.

### Cited Findings
- Logged out, `/members` is a landing page (members'-lounge image, benefits) with a Login / Sign up card. Logged in, it shows a greeting, account details (name, email, mobile, member since, plan), next steps ("Reserve your round", "Plan your visit", "Members' lounge"), and Log out. Source: [src/app/members/page.tsx](src/app/members/page.tsx)
- The MemberAuth card has 2 tabs (Log in / Sign up). Passwords need at least 8 characters with letters and numbers, plus a confirmation field and a show/hide toggle. Errors include duplicate-account and account-link messages. Source: [src/components/MemberAuth.tsx](src/components/MemberAuth.tsx)
- Login lock-out after repeated failures returns "locked" (HTTP 429). Source: [src/app/api/members/login/route.ts](src/app/api/members/login/route.ts)
- Social login providers are `google` and `apple` only, using a CSRF `state` and PKCE flow. Source: [src/lib/oauth.ts](src/lib/oauth.ts), [src/app/api/auth/[provider]/route.ts](src/app/api/auth/[provider]/route.ts), [src/app/api/auth/[provider]/callback/route.ts](src/app/api/auth/[provider]/callback/route.ts)
- Plans (sample prices, marked "hindi pa inaprubahan ng club", i.e. not yet approved by the club):
  - Birdie ₱3,500/mo: 2 rounds/mo, 3-day booking window, 2 range buckets, 10% off shop and dining, newsletter and event invites.
  - Eagle ₱7,500/mo (featured): 4 rounds, 7-day window, unlimited range, 1 practice-bay session, lounge, locker, 1 guest pass, 15% off.
  - Albatross ₱18,000/mo: unlimited rounds, 14-day window, unlimited range and bays, lounge plus VIP wing, private locker with towel service, 4 guest passes, 1 Villa night/mo, tournament priority, 20% off.
  Source: [src/lib/membership-plans.ts](src/lib/membership-plans.ts)
- `POST /api/members/plan` sets or clears the plan. The code comment says "WALA PANG BAYAD dito" (no payment here yet). The club confirms the member manually. Source: [src/app/api/members/plan/route.ts](src/app/api/members/plan/route.ts)
- Token-based member API for the mobile app: `/api/app/session` (Bearer token, same lock-out as web login) and `/api/app/me`. Source: [src/app/api/app/session/route.ts](src/app/api/app/session/route.ts), [src/lib/app-auth.ts](src/lib/app-auth.ts)

### Inferences
- The account layer exists, but member value features are not built: no online dues payment, no handicap integration, no booking history, no member-only tee sheet or rates, no statements, no member directory.

### Gaps
- No password-reset / "forgot password" flow was found in MemberAuth.
- No Facebook login, which matters for the PH audience. Only Google and Apple exist.
- The mobile app uses different tier names (Founding / Full Golf / Corporate, no prices) from the website plans (Birdie / Eagle / Albatross). The two are inconsistent. Source: [mobile/src/data/sample.ts](mobile/src/data/sample.ts)

## 4. Other features (inquiries, newsletter, weather, translation, maps, video, galleries, packages, villas, mobile app)

### Takeaway
Around booking, the site has live weather (current conditions plus a 16-day forecast), a 7-language client-side translator, an interactive zoomable course routing map with hole pins, a full scorecard, image lightboxes and galleries, several inquiry forms saved to a shared database, a consent-based newsletter, and a members-only Expo mobile app. The mobile app does real tee-time booking, but most of its other screens run on sample data.

### Cited Findings
- **Weather:** the header shows live temperature and an icon for Pili via Open-Meteo (no API key). Clicking it opens a 7-day forecast. The booking date picker shows up to a 16-day forecast. Beyond 16 days it shows the "typical" climate for that month from a 5-year archive average, clearly labelled. The forecast also appears on the Villa availability form. Source: [src/lib/weather.ts](src/lib/weather.ts), [src/components/HeaderUtilities.tsx](src/components/HeaderUtilities.tsx), [src/components/ForecastDays.tsx](src/components/ForecastDays.tsx)
- **Multi-language:** the locales are EN, FIL, BCL (Bikol, hidden from the switcher during review), KO, VI, ZH, and JA. Switching happens on the client and is stored in the `cu-lang` cookie, with no URL change. A DOM translator walks text nodes and attributes against `strings/<lang>.json` using a MutationObserver. Source: [src/i18n/config.ts](src/i18n/config.ts), [src/i18n/DomTranslator.tsx](src/i18n/DomTranslator.tsx), [src/i18n/strings](src/i18n/strings)
- **Course routing map:** an interactive masterplan with zoom and drag, pins for holes 1–18 plus the clubhouse, and hover/focus preview cards. It sits on the Golf page. Source: [src/components/CourseRoutingMap.tsx](src/components/CourseRoutingMap.tsx), [src/components/GolfDetails.tsx](src/components/GolfDetails.tsx)
- **Scorecard:** the full 18 holes with all tee colours shown. Only black/back-tee distances are filled in, and stroke index is derived by ranking. There is a mini map. Source: [src/components/Scorecard.tsx](src/components/Scorecard.tsx), [src/lib/course-holes.ts](src/lib/course-holes.ts)
- **Course concept carousel:** 10 "landscapes" (Five-Hole Landscape, Central Challenge, Peninsula Green, Northern Run, Island Corridor, Lakeside Turn, Clubhouse Approach, Homeward Pair, Western Fairways, Mountain Stretch) group the holes. Source: [src/lib/site-content.ts](src/lib/site-content.ts), [src/components/ConceptCarousel.tsx](src/components/ConceptCarousel.tsx)
- **Video:** the homepage has a 4K aerial hero teaser, plus the Clubhouse walkthrough video and the Experiences hero video. A `CourseFilm` component exists but nothing uses it. Source: [src/lib/site-content.ts](src/lib/site-content.ts), [src/app/[section]/page.tsx](src/app/[section]/page.tsx), [src/components/CourseFilm.tsx](src/components/CourseFilm.tsx)
- **Galleries:** ImageLightbox appears on the Villa Del Rey page and the homepage villa block. ClubhouseGallery appears on each clubhouse space page. Hole pages have a "Lakeside course views" gallery. Source: [src/components/ImageLightbox.tsx](src/components/ImageLightbox.tsx), [src/components/ClubhouseGallery.tsx](src/components/ClubhouseGallery.tsx), [src/app/golf/courses/[hole]/page.tsx](src/app/golf/courses/[hole]/page.tsx)
- **Inquiry / lead forms (all saved to the shared libsql/Turso database that the website, mobile app, and admin all read):**
  - AvailabilityRequest on each Villa house page: preferred date and number of guests. It posts to `/api/availability`.
  - GroupInquiry on Plan Your Visit: name, email, mobile, event type, date, group size, message. It posts to `/api/callback`.
  - QuickQuestion on hole pages, which also posts to `/api/callback`.
  - Call-back time windows: 9–12, 12–2, 2–4, 4–6 PH time.
  Source: [src/components/AvailabilityRequest.tsx](src/components/AvailabilityRequest.tsx), [src/components/GroupInquiry.tsx](src/components/GroupInquiry.tsx), [src/components/QuickQuestion.tsx](src/components/QuickQuestion.tsx), [src/app/api/availability/route.ts](src/app/api/availability/route.ts), [src/app/api/callback/route.ts](src/app/api/callback/route.ts), [src/lib/inquiries-db.ts](src/lib/inquiries-db.ts), [src/lib/db.ts](src/lib/db.ts), [src/lib/site-content.ts](src/lib/site-content.ts)
- **Newsletter:** a footer email signup that requires explicit consent (comment cites RA 10173, the PH Data Privacy Act). It gives the same response for new and existing addresses, to avoid enumeration. Source: [src/components/NewsletterSignup.tsx](src/components/NewsletterSignup.tsx), [src/app/api/subscribe/route.ts](src/app/api/subscribe/route.ts)
- **Stay-and-play and packages:** 2 itinerary packages. Stay & Play inclusions: 1 night at Villa Del Rey, one 18-hole round with caddie, breakfast, range balls, transfers, overnight club storage. Prices are "On request". Source: [src/app/packages/stay-and-play/page.tsx](src/app/packages/stay-and-play/page.tsx), [src/components/PackagesDetails.tsx](src/components/PackagesDetails.tsx)
- **Accommodations / villa availability:** 4 Villa Del Rey house types (Villas, Cabins, Cabana, Dwell), each with highlights and interior photos. Live per-night vacancy appears only inside the tee-time booking flow. The house pages themselves use an inquiry form, not instant booking. Source: [src/lib/villa-del-rey.ts](src/lib/villa-del-rey.ts), [src/lib/golf-booking.ts](src/lib/golf-booking.ts)
- **Contact:** a single phone number (+63 916 300 7914) and a Gmail address (camsuruptowngolf@gmail.com), used in the footer, Plan Your Visit, Terms, and Members. Source: [src/lib/site-content.ts](src/lib/site-content.ts)
- **Mobile app (`mobile/`):** Expo SDK 58 + Expo Router, iOS/Android bundle `com.camsuruptowngolf.app`, members-only. Guests are pointed to the website. It uses the same `/api/*` backend. Tabs: Home, Book, Schedule, Club, Profile. Source: [mobile/README.md](mobile/README.md), [mobile/app.json](mobile/app.json), [mobile/src/app/(tabs)/_layout.tsx](mobile/src/app/(tabs)/_layout.tsx), [mobile/src/app/sign-in.tsx](mobile/src/app/sign-in.tsx)
  - Real: member sign-in with a token in SecureStore; tee-time availability and hold; PayMongo checkout opened in an in-app browser; booking status screen. Source: [mobile/src/lib/session.ts](mobile/src/lib/session.ts), [mobile/src/app/(tabs)/book.tsx](mobile/src/app/(tabs)/book.tsx), [mobile/src/app/booking/[code].tsx](mobile/src/app/booking/[code].tsx)
  - Request-only: Club tab "Reserve" for dining, practice bays, and wellness sends a request to `/api/callback`, and staff confirm by phone or email. Source: [mobile/src/app/(tabs)/club.tsx](mobile/src/app/(tabs)/club.tsx), [mobile/src/lib/club-request.ts](mobile/src/lib/club-request.ts)
  - Sample data, not live: event calendar (clinics, medals, socials), "My schedule", dining venues and times, the 12 practice bays, wellness treatments, the member card with QR (handicap 12.4, guest passes), the members' offers screen with a redeem code, and the Home weather card. Source: [mobile/src/data/sample.ts](mobile/src/data/sample.ts), [mobile/src/app/(tabs)/profile.tsx](mobile/src/app/(tabs)/profile.tsx), [mobile/src/app/offer/[id].tsx](mobile/src/app/offer/[id].tsx), [mobile/src/app/(tabs)/schedule.tsx](mobile/src/app/(tabs)/schedule.tsx)
  - There is no "my bookings" API. The app stores only the last booking code locally. Source: [mobile/src/lib/next-round.ts](mobile/src/lib/next-round.ts)
  - The mobile README's tab table (Home / Book / Stays / Members) is out of date compared with the actual tabs. Source: [mobile/README.md](mobile/README.md)

### Inferences
- The mobile app's sample screens (event calendar, practice-bay booking, dining reservations, wellness booking, digital member card with QR, member offers) are effectively a roadmap of features not yet built on the website. The comparison report should treat them as "designed, not live", not as "already have".

### Gaps
- No analytics tag (GA4, Meta Pixel, etc.), live chat, WhatsApp/Viber/Messenger link, reviews or testimonials, or lessons/academy booking was found in `src/`.
- The DOM-based translation is client-side only. Translated pages have no per-locale URLs or hreflang, which limits SEO in other languages. Inferred from config: "walang URL change" (no URL change).

## 5. What is clearly missing or stubbed?

### Takeaway
Many pieces are explicitly unconfirmed placeholders. These include all prices (green fees, add-ons, villas, membership), package prices ("On request"), social media links, the Pro Shop (concept images only, no commerce), The Uptown Life (concept campaign), the map pin and full address on Getting Here, the Privacy Policy, and footer pages (Our Story, Membership, Golf Academy, News & Blog, Careers, Accessibility). About 20 built components are unused.

### Cited Findings
- The footer TODO says there are no pages yet for "Our Story, Membership, Golf Academy, News & Blog, Careers, at Accessibility" and that the Privacy Policy is the most urgent, since personal data is already stored. Source: [src/components/Footer.tsx](src/components/Footer.tsx)
- Social icons (Facebook, YouTube, X, TikTok) have `href: null` and display as muted "coming soon" placeholders. Source: [src/components/Footer.tsx](src/components/Footer.tsx)
- The newsletter consent text has a TODO to link a real Privacy Policy. Source: [src/components/NewsletterSignup.tsx](src/components/NewsletterSignup.tsx)
- Pro Shop: "WALA PA ANG MGA PRODUKTO" (no products yet). The items are brand-book design concepts (women's, men's, bags, accessories and gifts) with no prices and no "buy now". Source: [src/app/pro-shop/page.tsx](src/app/pro-shop/page.tsx)
- The Uptown Life is a set of concepts, not live: no active Instagram, no printed Club Journal, and the "Uptown Invitational" is unconfirmed. Source: [src/app/the-uptown-life/page.tsx](src/app/the-uptown-life/page.tsx)
- Getting Here has no map pin, on purpose. The TODO asks the club for a real map link and a full address. (CLUB_ADDRESS does contain "San Jose, Pili, Camarines Sur 4418" and coordinates 13.584308, 123.253267 are used for weather.) Source: [src/app/getting-here/page.tsx](src/app/getting-here/page.tsx), [src/lib/site-content.ts](src/lib/site-content.ts)
- Travel times, gate hours, the parking policy, and all FAQ answers are flagged "TODO (para sa club): kumpirmahin" (club to confirm). Source: [src/lib/site-content.ts](src/lib/site-content.ts)
- The Villa Del Rey overview says: "Official room details, amenities, and booking information will be added when confirmed." Source: [src/lib/site-content.ts](src/lib/site-content.ts)
- Golf page TODO: confirm the number and par of the 3 signature holes, and the course designer's name. Source: [src/components/GolfDetails.tsx](src/components/GolfDetails.tsx)
- Packages TODO: all prices ("On request"), nights and rounds, group minimums, and peak season. Experiences TODO: the facility list, hours, fees, and age/waiver rules. Source: [src/components/PackagesDetails.tsx](src/components/PackagesDetails.tsx), [src/components/ExperiencesDetails.tsx](src/components/ExperiencesDetails.tsx)
- Hole pin coordinates on the routing map are estimates, not survey data. Source: [src/lib/course-holes.ts](src/lib/course-holes.ts)
- Booking and membership prices are sample values. Source: [src/lib/golf-booking.ts](src/lib/golf-booking.ts), [src/lib/membership-plans.ts](src/lib/membership-plans.ts)
- Membership plan selection has no payment. Source: [src/app/api/members/plan/route.ts](src/app/api/members/plan/route.ts)
- Built but unused components: ClubhouseVision, ConceptHoleBreakdown, CourseFilm, FairwayVillasVision, FloatingCallbackCta, GeneratedBadge, GotaVillageStays, HoleOnePlan, HomeClubhouseDay, HomeVillaDelRey (and its Cards, Showcase, and Tabs variants), ImgPlaceholder, InteractiveCourseMap, OffCourseSection, PageCurtain, ScrollCue, ShopExperience, StayInfoTabs, VisitCamsurLogo, VisitDetails. Found by grepping for imports in `src/components/`.
- Most mobile app content is sample data (see Q4). Source: [mobile/src/data/sample.ts](mobile/src/data/sample.ts)

### Inferences
- Several "enhancements" a comparison report might suggest already exist as unused components (a floating call-back CTA, a course film, an interactive course map variant, a shop experience). Reviving them may be cheaper than building new ones.
- Trust and legal basics (privacy policy, real social links, a verified map pin, confirmed prices) are prerequisites that global top-club sites have. Here they are the most visible gaps.

### Gaps
- I could not confirm which of these placeholders are visible on the deployed site.

## 6. What is the course/property, as described in site copy?

### Takeaway
CamSur Uptown Golf is an 18-hole, par-72 championship course in San Jose, Pili, Camarines Sur 4418, Philippines. It is laid out around 4 lakes with views of Mt. Isarog, and it carries the mark "Est. 2027", which suggests it is not yet open. Planned facilities include a landmark 2,695 m² clubhouse on 3 levels plus a rooftop, Villa Del Rey resort lodging, and the wider CamSur leisure grounds (wakepark, ATV, and more).

### Cited Findings
- The address is "San Jose, Pili, Camarines Sur 4418, Philippines". Coordinates 13.584308, 123.253267 are noted as the actual club location ("hindi Naga", not Naga). Source: [src/lib/site-content.ts](src/lib/site-content.ts), [src/lib/weather.ts](src/lib/weather.ts)
- 18 holes, par 72 (hole pars sum to 35 out / 37 in). Back-tee lengths come from the supplied scorecard. Hole 1 "Opening Fairway" is a 411 m par 4, Hole 2 "Villa Corridor" a 526 m par 5, Hole 15 "Mountain Stretch" a 200 m par 3, and Hole 18 "Home Green" a 330 m par 4. Source: [src/lib/course-holes.ts](src/lib/course-holes.ts)
- Stated design principles include "Wide off the tee" (playable for higher handicaps) and "Decisions before distance". Source: [src/components/GolfDetails.tsx](src/components/GolfDetails.tsx)
- Clubhouse facts: 4 lakes, 3 levels plus rooftop, 9 main areas, 300 member lockers, 2,695 m². Layers: practice and events (lower), welcome and shop (ground), lounges and terrace (upper), bar, pool and gardens (rooftop). Spaces include practice bays ("technology-equipped bays" for lessons), a VIP wing, the members' lounge, and a sky bar. Designer credit: "VM·STUDIO". Source: [src/lib/clubhouse.ts](src/lib/clubhouse.ts)
- Policies stated in the FAQ (unconfirmed): one caddie per bag is required. Dress code: collared shirts, no denim, soft spikes. No handicap certificate needed. Visitors are welcome; members have priority on weekend mornings. Book at least 3 days ahead for weekends. Lightning siren and rebooking policy. Rates are quoted, not listed. Source: [src/lib/site-content.ts](src/lib/site-content.ts)
- Access (unconfirmed): Naga Airport (Pili) about 25 min, Naga City about 20 min, Legazpi about 2 hrs. Free on-site parking. Airport and hotel transfers with 24 hours' notice. Source: [src/lib/site-content.ts](src/lib/site-content.ts)
- Villa Del Rey offers 4 house types: Villas (private poolside), Cabins (standalone, garden), Cabana, and Dwell (private garden outlook). Source: [src/lib/villa-del-rey.ts](src/lib/villa-del-rey.ts)
- The homepage shows "Est. 2027". Source: [src/app/page.tsx](src/app/page.tsx)

### Inferences
- The "Est. 2027" mark, the TODOs, the sample prices, and "opening updates" copy in ShopExperience together suggest a pre-opening marketing and booking site. Benchmarks against operating clubs should consider pre-opening features (founding membership, waitlists, construction updates, opening-date countdown).

### Gaps
- The hole data has internal inconsistencies: Hole 6 is par 3 with a forward distance of 455 m; Hole 7 is par 5 with a forward distance of 132 m and is described as "A short hole"; Hole 12 is listed as par 4 but described as "A refined par three"; Hole 16 is listed as par 5 but described as a "one-shot setting". The forward-tee figures look shifted between holes. Source: [src/lib/course-holes.ts](src/lib/course-holes.ts)
- No official opening date, course architect, or total course length/acreage is stated in the copy.
