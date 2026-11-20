import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
import { PrivacyPreferencesButton } from "@/components/PrivacyNotice";
import { Container } from "@/components/SectionKit";
import { CLUB_ADDRESS, CLUB_EMAIL } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Privacy Policy | CamSur Uptown Golf",
  description: "How CamSur Uptown Golf handles website enquiries, member accounts, reservations, payments, and your privacy preferences.",
  alternates: { canonical: "/privacy-policy" },
};

const SECTIONS = [
  {
    id: "information",
    title: "Information you share with us",
    paragraphs: [
      "When you send an enquiry, request a callback, or ask about a stay or event, we collect the details you provide. These can include your name, email address, mobile number, postal code, preferred dates, group size, interests, call preferences, and message.",
      "For member accounts and reservations, we also process account identifiers, password hashes, booking details, selected membership plans, and payment references or status. If you choose Google or Apple sign-in, we receive the account information made available through that sign-in, such as your name, email address, provider identifier, and profile image. We do not receive your Google or Apple password.",
      "Newsletter sign-up collects your email address and your agreement to receive updates. Please provide only information needed for your request; avoid sending identification documents, card numbers, health information, or other sensitive details through general enquiry forms.",
    ],
  },
  {
    id: "purposes",
    title: "How your information is used",
    paragraphs: [
      "We use the information you submit to answer questions, arrange requested callbacks, prepare offers, manage member access, process reservations and membership requests, and send service-related confirmations or updates. Processing needed to arrange or deliver a service you request is separate from optional marketing consent.",
      "Your newsletter subscription is optional. We use your email for news and offers when you give that separate permission. Accepting the website privacy notice does not subscribe you to marketing messages, confirm a booking, or authorise a payment.",
      "Technical information, including network addresses and request or error logs, may be processed by our hosting and delivery providers to serve the website, protect accounts, diagnose errors, and prevent misuse. These operational purposes are separate from optional display preferences.",
    ],
  },
  {
    id: "storage",
    title: "Cookies, local storage, and your choice",
    paragraphs: [
      "Essential storage supports member sign-in, sign-in security, and remembering your privacy choice. Rejecting optional features does not prevent you from browsing the website, making an enquiry, or using essential account and booking functions.",
      "Accept enables saving your language and club-utilities display preferences on this device. It also permits the third-party course video player to load when you choose to play it. Before you accept, or after you reject, these optional preferences are not saved and the embedded player is not loaded. You can still change the website language for the current visit.",
      "We remember Accept or Reject on this browser for up to 180 days, unless you clear browser storage sooner. Your choice does not automatically carry over to other browsers or devices. If storage is blocked, the choice can only be remembered temporarily in the current tab.",
      "Use Privacy preferences in the footer to change your choice. Reject removes the saved language and utilities preferences and stops the embedded player on this website. It does not delete your member account, reservation records, or information already received by an external provider.",
    ],
  },
  {
    id: "providers",
    title: "Service providers and external content",
    paragraphs: [
      "Information needed to handle your request may be accessed by authorised club personnel and the providers supporting website hosting, databases, email delivery, and booking or payment services. Those services may process information outside the Philippines, depending on their infrastructure.",
      "Online payments use the hosted checkout of PayMongo (GCash, Maya, GrabPay, card) or PayPal, whichever you choose. The website records payment references and status linked to the relevant booking or membership; card entry takes place with the payment provider. Google or Apple sign-in is used only when you select that option.",
      "Course films use Wistia. After you accept optional features and start playback, the player connects to Wistia, which may process your network address, device information, cookies, and viewing activity under its own privacy policy. The site also requests weather for the club’s fixed location from Open-Meteo and delivers media through hosting and content-delivery services. It does not need your device’s precise location for the club forecast.",
      "External maps, social platforms, and other CamSur websites have their own privacy practices. Your browser connects to those services when you follow their links. Information may also be disclosed where a lawful obligation or a valid legal request requires it.",
    ],
  },
  {
    id: "retention",
    title: "Retention and protection",
    paragraphs: [
      "Retention depends on the record and its purpose. Enquiries support your request and related follow-up; account records support your membership and access; reservation and payment records support the service, accounting, dispute handling, and applicable legal requirements. Contact the Club to ask about the retention period for a particular record or to request deletion where applicable.",
      "Website passwords are stored as hashes, and member sign-in uses session cookies. Access to operational information is limited to the systems and personnel handling the relevant service. No online service can guarantee absolute security, so keep your account credentials private and tell us if you suspect unauthorised use.",
    ],
  },
  {
    id: "rights",
    title: "Your privacy rights",
    paragraphs: [
      "Under the Philippine Data Privacy Act of 2012, your rights may include being informed about processing, requesting access to your personal data, correcting inaccuracies, objecting to processing, requesting erasure or blocking, and data portability where applicable. You may also raise a complaint with the National Privacy Commission and seek remedies provided by law. These rights are subject to applicable conditions and limitations.",
      "Where processing relies on consent, you can withdraw that consent. Change optional website choices through Privacy preferences, or contact the Club to stop newsletter messages or discuss information you submitted. Withdrawal does not undo processing already carried out or remove records we must retain on another lawful basis.",
      "Send privacy requests to the Club using the contact details below. Describe the request and the account, enquiry, or reservation involved. We may ask for enough information to verify your identity before releasing, correcting, or deleting records; do not send passwords or payment-card details.",
    ],
  },
  {
    id: "updates",
    title: "About this notice",
    paragraphs: [
      "This notice covers the CamSur Uptown Golf website. Separate terms or notices may apply to specific services or external facilities. We will update this page when the website’s data practices change and revise the date shown above. A material change to optional processing will require a new choice before that processing is enabled.",
    ],
  },
] as const;

const BUTTON_CLASS = "inline-flex min-h-11 items-center justify-center rounded-full bg-[#e2c77a] px-6 py-3 font-navigation text-[11px] font-bold uppercase tracking-[0.1em] text-[#173e2b] transition hover:bg-[#efd99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7d6224]";

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="bg-[#f3ede1] text-[#03321b]">
        <section className="relative isolate flex min-h-[380px] items-end overflow-hidden bg-[#03321b] px-6 pb-16 pt-40 text-white sm:min-h-[500px] sm:pb-20 sm:pt-44 lg:px-8">
          <HeroBackdrop src="/hero-images/terms-v2.webp" alt="Guest information folio on a table inside the clubhouse" imageClassName="object-[65%_center] sm:object-center" />
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.2em] text-[#e2c77a]">Your information, handled with care</p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em]">Privacy Policy</h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">How we handle the information you share, the choices you control, and the ways you can reach us.</p>
            <p className="mt-5 font-navigation text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e2c77a]">Last updated November 11, 2026</p>
          </div>
        </section>
        <Breadcrumbs />
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <nav aria-label="Privacy Policy sections" className="border border-[#03321b]/12 bg-white p-6">
                  <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d6224]">On this page</p>
                  <ol className="mt-5 space-y-3">
                    {SECTIONS.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="flex gap-3 text-sm leading-6 text-[#59665e] hover:text-[#2e5126] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7d6224]"><span className="font-navigation text-[11px] font-bold text-[#987522]">{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span></a></li>)}
                    <li><a href="#privacy-contact" className="text-sm leading-6 text-[#59665e] underline underline-offset-4">Contact the Club</a></li>
                  </ol>
                </nav>
              </aside>
              <div className="min-w-0">
                <div className="border-l-2 border-[#b49343] bg-[#efe9da] px-6 py-6 sm:px-8">
                  <h2 className="font-serif text-2xl font-medium">Your privacy choice stays yours.</h2>
                  <p className="mt-3 text-sm leading-7 text-[#4f5d55]">You can browse with essential storage only. Optional website preferences and embedded video are enabled only after you accept.</p>
                  <PrivacyPreferencesButton className={`mt-5 cursor-pointer ${BUTTON_CLASS}`} />
                </div>
                <p className="my-9 text-sm leading-7 text-[#59665e] sm:text-base sm:leading-8">CamSur Uptown Golf, at San Jose, Pili, Camarines Sur, handles the information submitted through this website for the purposes described below. This notice explains those practices and how to contact the Club about your information.</p>
                <div className="divide-y divide-[#03321b]/12">
                  {SECTIONS.map((section, index) => (
                    <section key={section.id} id={section.id} className="scroll-mt-28 py-9 first:pt-0 sm:py-11">
                      <div className="grid gap-4 sm:grid-cols-[42px_minmax(0,1fr)] sm:gap-6">
                        <p className="font-navigation text-[11px] font-bold tracking-[0.18em] text-[#987522]">{String(index + 1).padStart(2, "0")}</p>
                        <div>
                          <h2 className="font-serif text-[clamp(1.65rem,3vw,2.3rem)] font-medium leading-tight tracking-[-0.03em]">{section.title}</h2>
                          <div className="mt-5 space-y-4 text-sm leading-7 text-[#59665e] sm:text-base sm:leading-8">
                            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            {section.id === "rights" ? <p>Read more about <a href="https://privacy.gov.ph/data-subject-rights/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#2e5126]">your rights from the National Privacy Commission</a>.</p> : null}
                            {section.id === "providers" ? <p>Provider notices: <a href="https://wistia.com/privacy" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#2e5126]">Wistia</a>, <a href="https://www.paymongo.com/privacy" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#2e5126]">PayMongo</a> and <a href="https://www.paypal.com/ph/legalhub/paypal/privacy-full" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#2e5126]">PayPal</a>.</p> : null}
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
                <section id="privacy-contact" className="mt-6 scroll-mt-28 border border-[#03321b]/12 bg-white p-7 sm:p-9">
                  <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d6224]">Privacy questions & requests</p>
                  <h2 className="mt-3 font-serif text-3xl font-medium">Talk to the Club.</h2>
                  <p className="mt-4 text-sm leading-7 text-[#59665e]">Email the Club with “Privacy request” in the subject so your enquiry can be directed to the people handling your information.</p>
                  <address className="mt-4 text-sm not-italic leading-7 text-[#59665e]">{CLUB_ADDRESS.lines.join(", ")}</address>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={`${CLUB_EMAIL.href}?subject=Privacy%20request`} className={`${BUTTON_CLASS} break-all normal-case tracking-normal`}>{CLUB_EMAIL.label}</a>
                    <Link href="/terms-of-use" className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-medium underline underline-offset-4">Terms of Use</Link>
                  </div>
                </section>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
