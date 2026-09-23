# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task03-responsive-layouts.spec.ts >> Task 3 · Responsive Layouts >> TC-159 | Terms of Use @ Mobile S (320×568)
- Location: tests\task03-responsive-layouts.spec.ts:15:7

# Error details

```
Error: horizontal overflow in px

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    21
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Camsur Uptown Golf Club — home" [ref=e4] [cursor=pointer]:
        - /url: /
      - button "Open navigation" [ref=e5]: Menu
      - link "Call 09163007914" [ref=e10] [cursor=pointer]:
        - /url: tel:+639163007914
  - main [ref=e13]:
    - generic [ref=e15]:
      - paragraph [ref=e16]: Legal information
      - heading "Terms of Use" [level=1] [ref=e17]
      - paragraph [ref=e18]: These terms explain how you may use the CamSur Uptown Golf Club website and how to understand the concept, booking, and facility information presented here.
      - paragraph [ref=e19]: Effective September 17, 2026
    - navigation "Breadcrumb" [ref=e21]:
      - list [ref=e22]:
        - listitem [ref=e23]:
          - link "Home" [ref=e24] [cursor=pointer]:
            - /url: /
        - listitem [ref=e25]:
          - generic [aria-hidden] [ref=e26]: /
          - generic [ref=e27]: Terms of use
    - generic [ref=e30]:
      - complementary [ref=e31]:
        - generic [ref=e32]:
          - paragraph [ref=e33]: On this page
          - navigation "Terms of Use sections" [ref=e34]:
            - list [ref=e35]:
              - listitem [ref=e36]:
                - link "01 Acceptance of these terms" [ref=e37] [cursor=pointer]:
                  - /url: "#acceptance"
                  - generic [ref=e38]: "01"
                  - generic [ref=e39]: Acceptance of these terms
              - listitem [ref=e40]:
                - link "02 Website information and design-stage materials" [ref=e41] [cursor=pointer]:
                  - /url: "#website-information"
                  - generic [ref=e42]: "02"
                  - generic [ref=e43]: Website information and design-stage materials
              - listitem [ref=e44]:
                - link "03 Bookings, rates, and availability" [ref=e45] [cursor=pointer]:
                  - /url: "#bookings"
                  - generic [ref=e46]: "03"
                  - generic [ref=e47]: Bookings, rates, and availability
              - listitem [ref=e48]:
                - link "04 Responsible website use" [ref=e49] [cursor=pointer]:
                  - /url: "#responsible-use"
                  - generic [ref=e50]: "04"
                  - generic [ref=e51]: Responsible website use
              - listitem [ref=e52]:
                - link "05 Golf, facilities, and guest responsibilities" [ref=e53] [cursor=pointer]:
                  - /url: "#club-use"
                  - generic [ref=e54]: "05"
                  - generic [ref=e55]: Golf, facilities, and guest responsibilities
              - listitem [ref=e56]:
                - link "06 Intellectual property" [ref=e57] [cursor=pointer]:
                  - /url: "#intellectual-property"
                  - generic [ref=e58]: "06"
                  - generic [ref=e59]: Intellectual property
              - listitem [ref=e60]:
                - link "07 External links and third-party services" [ref=e61] [cursor=pointer]:
                  - /url: "#external-links"
                  - generic [ref=e62]: "07"
                  - generic [ref=e63]: External links and third-party services
              - listitem [ref=e64]:
                - link "08 Personal information and communications" [ref=e65] [cursor=pointer]:
                  - /url: "#privacy"
                  - generic [ref=e66]: "08"
                  - generic [ref=e67]: Personal information and communications
              - listitem [ref=e68]:
                - link "09 Disclaimers and limitation of liability" [ref=e69] [cursor=pointer]:
                  - /url: "#disclaimers"
                  - generic [ref=e70]: "09"
                  - generic [ref=e71]: Disclaimers and limitation of liability
              - listitem [ref=e72]:
                - link "10 Changes, governing law, and contact" [ref=e73] [cursor=pointer]:
                  - /url: "#changes-and-law"
                  - generic [ref=e74]: "10"
                  - generic [ref=e75]: Changes, governing law, and contact
      - generic [ref=e76]:
        - generic [ref=e77]: Please read these terms together with any booking, event, accommodation, or facility-specific terms provided when you make a reservation.
        - generic [ref=e78]:
          - generic [ref=e80]:
            - paragraph [ref=e81]: "01"
            - generic [ref=e82]:
              - heading "Acceptance of these terms" [level=2] [ref=e83]
              - generic [ref=e84]:
                - paragraph [ref=e85]: By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the website.
                - paragraph [ref=e86]: These terms apply to the public website and its content. A confirmed booking, event, membership, golf reservation, or other service may be governed by additional terms communicated to you separately. If those terms conflict with these website terms, the service-specific terms will govern that transaction.
          - generic [ref=e88]:
            - paragraph [ref=e89]: "02"
            - generic [ref=e90]:
              - heading "Website information and design-stage materials" [level=2] [ref=e91]
              - generic [ref=e92]:
                - paragraph [ref=e93]: The website is intended to introduce CamSur Uptown Golf Club, its proposed course, facilities, accommodations, dining, experiences, events, and packages.
                - paragraph [ref=e94]: Golf course measurements, routing, par and handicap information, tee positions, water features, facilities, package inclusions, schedules, renderings, maps, photographs, and visual concepts may be based on currently available design-stage or reference materials. They may change following final surveying, construction, operational review, availability, or approval.
                - paragraph [ref=e95]: Illustrations and enhanced images are provided to communicate the intended experience. They should not be treated as a guarantee that every physical detail, view, finish, facility, or landscape feature will appear exactly as shown.
          - generic [ref=e97]:
            - paragraph [ref=e98]: "03"
            - generic [ref=e99]:
              - heading "Bookings, rates, and availability" [level=2] [ref=e100]
              - generic [ref=e101]:
                - paragraph [ref=e102]: Submitting an enquiry, callback request, package request, or proposed date does not create a confirmed reservation. A booking becomes confirmed only when the Club or the relevant facility issues confirmation and any required payment or deposit has been received.
                - paragraph [ref=e103]: Rates, inclusions, tee times, accommodations, dining, transfers, activities, and event spaces remain subject to availability and may change without prior notice. Taxes, fees, eligibility requirements, cancellation rules, and payment terms will be confirmed during booking.
                - paragraph [ref=e104]: Where this website links to another CamSur facility or booking channel, that operator's current terms, policies, and availability also apply.
          - generic [ref=e106]:
            - paragraph [ref=e107]: "04"
            - generic [ref=e108]:
              - heading "Responsible website use" [level=2] [ref=e109]
              - generic [ref=e110]:
                - paragraph [ref=e111]: You may use this website for lawful personal, informational, and booking-related purposes. You must not attempt to disrupt the website, bypass its security, introduce malicious code, impersonate another person, submit false information, or use automated systems in a way that places an unreasonable load on the service.
                - paragraph [ref=e112]: You are responsible for ensuring that the information you submit is accurate and that you are authorized to provide it. Do not send confidential, financial, or highly sensitive information through a general enquiry form.
          - generic [ref=e114]:
            - paragraph [ref=e115]: "05"
            - generic [ref=e116]:
              - heading "Golf, facilities, and guest responsibilities" [level=2] [ref=e117]
              - generic [ref=e118]:
                - paragraph [ref=e119]: Guests must follow applicable club rules, safety guidance, dress requirements, course etiquette, caddie and cart instructions, age restrictions, and facility-specific policies. The Club may refuse or discontinue access where conduct creates a safety risk, disrupts other guests, damages property, or breaches applicable rules.
                - paragraph [ref=e120]: Outdoor activities, golf, water recreation, motorsports, and other experiences involve inherent risks. Guests should assess their own fitness and ability, use required safety equipment, supervise children, and follow instructions from authorized personnel.
          - generic [ref=e122]:
            - paragraph [ref=e123]: "06"
            - generic [ref=e124]:
              - heading "Intellectual property" [level=2] [ref=e125]
              - generic [ref=e126]:
                - paragraph [ref=e127]: Unless otherwise stated, the website's branding, logos, text, layouts, maps, illustrations, photographs, video, graphics, and other content are owned by or licensed to CamSur Uptown Golf Club and are protected by applicable intellectual-property laws.
                - paragraph [ref=e128]: You may view and share links to public pages for personal, non-commercial use. You may not copy, republish, sell, modify, distribute, scrape, or use website content for commercial, promotional, training, or competing purposes without prior written permission.
          - generic [ref=e130]:
            - paragraph [ref=e131]: "07"
            - generic [ref=e132]:
              - heading "External links and third-party services" [level=2] [ref=e133]
              - generic [ref=e134]:
                - paragraph [ref=e135]: Links to external websites, maps, social platforms, payment channels, or other CamSur facilities are provided for convenience. We do not control every external service and are not responsible for its content, security, availability, or privacy practices.
                - paragraph [ref=e136]: Opening an external link means you are subject to that service's own terms and policies. A link does not necessarily imply endorsement of all content on the destination website.
          - generic [ref=e138]:
            - paragraph [ref=e139]: "08"
            - generic [ref=e140]:
              - heading "Personal information and communications" [level=2] [ref=e141]
              - generic [ref=e142]:
                - paragraph [ref=e143]: When you submit your name, contact details, preferred dates, group information, or message, we may use that information to respond to your enquiry, prepare a booking or quotation, provide requested updates, and operate the website.
                - paragraph [ref=e144]: We aim to handle personal information in accordance with applicable Philippine data-protection requirements. You may ask about information you previously submitted by contacting the Club. Marketing messages should be sent only where you have requested or agreed to receive them, and you may unsubscribe from them.
          - generic [ref=e146]:
            - paragraph [ref=e147]: "09"
            - generic [ref=e148]:
              - heading "Disclaimers and limitation of liability" [level=2] [ref=e149]
              - generic [ref=e150]:
                - paragraph [ref=e151]: We work to keep the website accurate and available, but it is provided on an as-is and as-available basis. We do not guarantee uninterrupted access, error-free content, or that every published detail will remain current.
                - paragraph [ref=e152]: To the fullest extent permitted by law, CamSur Uptown Golf Club will not be liable for indirect, incidental, or consequential loss arising solely from reliance on website content, temporary website unavailability, or use of an external link. Nothing in these terms excludes liability that cannot lawfully be excluded.
          - generic [ref=e154]:
            - paragraph [ref=e155]: "10"
            - generic [ref=e156]:
              - heading "Changes, governing law, and contact" [level=2] [ref=e157]
              - generic [ref=e158]:
                - paragraph [ref=e159]: We may update the website and these terms as the project, facilities, and services develop. The revised effective date will appear at the top of this page. Continuing to use the website after an update means the revised terms apply to your later use.
                - paragraph [ref=e160]: These terms are governed by the laws of the Republic of the Philippines. Any concern should first be raised with the Club so the parties can try to resolve it promptly and in good faith.
        - generic [ref=e161]:
          - paragraph [ref=e162]: Questions about these terms
          - heading "Contact the Club." [level=2] [ref=e163]
          - paragraph [ref=e164]: For a website, booking, or data-related question, contact us by email or phone. You may also use the contact page for a longer message.
          - generic [ref=e165]:
            - link "inquiries@camsuruptown.com" [ref=e166] [cursor=pointer]:
              - /url: mailto:inquiries@camsuruptown.com
            - link "09163007914" [ref=e167] [cursor=pointer]:
              - /url: tel:+639163007914
            - link "Contact page" [ref=e168] [cursor=pointer]:
              - /url: /contact
  - contentinfo [ref=e169]:
    - generic [ref=e171]:
      - generic [ref=e172]:
        - generic [ref=e174]:
          - img "Camsur Uptown Golf Club" [ref=e175]
          - generic [ref=e176]:
            - paragraph [ref=e177]: CamSur Uptown Golf Club
            - paragraph [ref=e178]: Camarines Sur, Philippines
            - paragraph [ref=e179]:
              - link "09163007914" [ref=e180] [cursor=pointer]:
                - /url: tel:+639163007914
        - navigation "Footer navigation" [ref=e181]:
          - generic [ref=e182]:
            - paragraph [ref=e183]: Play
            - list [ref=e184]:
              - listitem [ref=e185]:
                - link "The Course" [ref=e186] [cursor=pointer]:
                  - /url: /golf
              - listitem [ref=e187]:
                - link "Packages" [ref=e188] [cursor=pointer]:
                  - /url: /packages
          - generic [ref=e189]:
            - paragraph [ref=e190]: Stay & Play
            - list [ref=e191]:
              - listitem [ref=e192]:
                - link "Accommodations" [ref=e193] [cursor=pointer]:
                  - /url: /accommodations
              - listitem [ref=e194]:
                - link "Dining" [ref=e195] [cursor=pointer]:
                  - /url: /dining
          - generic [ref=e196]:
            - paragraph [ref=e197]: The Club
            - list [ref=e198]:
              - listitem [ref=e199]:
                - link "Experiences" [ref=e200] [cursor=pointer]:
                  - /url: /experiences
              - listitem [ref=e201]:
                - link "Events" [ref=e202] [cursor=pointer]:
                  - /url: /events
              - listitem [ref=e203]:
                - link "Contact Us" [ref=e204] [cursor=pointer]:
                  - /url: /contact
        - generic [ref=e205]:
          - paragraph [ref=e206]: News & offers
          - heading "Stay connected to the club." [level=2] [ref=e207]
          - paragraph [ref=e208]: Course updates, event announcements, and occasional offers from CamSur Uptown, sent straight to your inbox.
          - generic [ref=e209]:
            - generic [ref=e210]:
              - textbox "Email address" [ref=e211]
              - button "Subscribe" [ref=e212]
            - generic [ref=e213]:
              - checkbox "I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy." [ref=e214]
              - generic [ref=e215]: I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy.
      - generic [ref=e216]:
        - generic [ref=e217]:
          - paragraph [ref=e218]: © 2026 CamSur Uptown Golf Club. All rights reserved.
          - link "Terms of Use" [ref=e219] [cursor=pointer]:
            - /url: /terms-of-use
        - paragraph [ref=e220]: Championship golf in the heart of Camarines Sur.
  - button "Open Next.js Dev Tools" [ref=e226] [cursor=pointer]
  - alert [ref=e230]
```

# Test source

```ts
  1  | import { Page, expect, Locator } from '@playwright/test';
  2  | 
  3  | /** Open a header mega-menu by its trigger label and return the opened panel scope. */
  4  | export async function openMegaMenu(page: Page, label: string): Promise<void> {
  5  |   const trigger = page.getByRole('button', { name: new RegExp(`^${label}$`, 'i') });
  6  |   await expect(trigger).toBeVisible();
  7  |   await trigger.click();
  8  | }
  9  | 
  10 | /** Close any open mega-menu via Escape. */
  11 | export async function closeMegaMenu(page: Page): Promise<void> {
  12 |   await page.keyboard.press('Escape');
  13 | }
  14 | 
  15 | /** Count broken images on the current page (naturalWidth === 0 for loaded <img>). */
  16 | export async function findBrokenImages(page: Page): Promise<string[]> {
  17 |   return page.$$eval('img', (imgs) =>
  18 |     imgs
  19 |       .filter((img) => img.complete && img.naturalWidth === 0)
  20 |       .map((img) => (img as HTMLImageElement).currentSrc || img.getAttribute('src') || '(no src)'),
  21 |   );
  22 | }
  23 | 
  24 | /** Return images missing a meaningful alt attribute (null alt; empty alt = decorative, allowed). */
  25 | export async function findImagesMissingAlt(page: Page): Promise<string[]> {
  26 |   return page.$$eval('img', (imgs) =>
  27 |     imgs
  28 |       .filter((img) => img.getAttribute('alt') === null)
  29 |       .map((img) => img.getAttribute('src') || '(no src)'),
  30 |   );
  31 | }
  32 | 
  33 | /** Assert the page has no horizontal overflow at the current viewport. */
  34 | export async function expectNoHorizontalScroll(page: Page): Promise<void> {
  35 |   const overflow = await page.evaluate(
  36 |     () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  37 |   );
  38 |   // allow a 2px rounding tolerance
> 39 |   expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(2);
     |                                                 ^ Error: horizontal overflow in px
  40 | }
  41 | 
  42 | /**
  43 |  * Best-effort locator for a callback form field by its `name` attribute,
  44 |  * scoped to the primary form on the page.
  45 |  */
  46 | export function field(page: Page, name: string): Locator {
  47 |   return page.locator(`form [name="${name}"]`).first();
  48 | }
  49 | 
  50 | /** Fill the callback request form with valid data. Pass overrides to omit/alter fields. */
  51 | export async function fillCallbackForm(
  52 |   page: Page,
  53 |   overrides: Partial<Record<string, string | boolean>> = {},
  54 | ): Promise<void> {
  55 |   const data: Record<string, string | boolean> = {
  56 |     firstName: 'Juan',
  57 |     lastName: 'Dela Cruz',
  58 |     email: 'juan.qa@example.com',
  59 |     mobile: '09171234567',
  60 |     guests: '4',
  61 |     consent: true,
  62 |     ...overrides,
  63 |   };
  64 | 
  65 |   for (const [name, value] of Object.entries(data)) {
  66 |     const el = field(page, name);
  67 |     if ((await el.count()) === 0) continue;
  68 |     const tag = await el.evaluate((n) => n.tagName.toLowerCase());
  69 |     const type = (await el.getAttribute('type')) ?? '';
  70 |     if (type === 'checkbox') {
  71 |       if (value === true) await el.check().catch(() => {});
  72 |       else await el.uncheck().catch(() => {});
  73 |     } else if (tag === 'select') {
  74 |       // pick the first non-empty option
  75 |       await el.selectOption({ index: 1 }).catch(() => {});
  76 |     } else if (typeof value === 'string') {
  77 |       await el.fill(value).catch(() => {});
  78 |     }
  79 |   }
  80 | 
  81 |   // required selects that have no override
  82 |   for (const sel of ['interest', 'timeframe']) {
  83 |     const el = field(page, sel);
  84 |     if ((await el.count()) > 0) await el.selectOption({ index: 1 }).catch(() => {});
  85 |   }
  86 | }
  87 | 
  88 | /** Submit the primary form. */
  89 | export async function submitForm(page: Page): Promise<void> {
  90 |   const submit = page
  91 |     .locator('form button[type="submit"], form input[type="submit"], form button:has-text("Submit"), form button:has-text("Send")')
  92 |     .first();
  93 |   await submit.click();
  94 | }
  95 | 
```