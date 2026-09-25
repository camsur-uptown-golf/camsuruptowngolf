import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { Container } from "@/components/SectionKit";
import { CLUB_EMAIL, CLUB_PHONE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Terms of Use | CamSur Uptown Golf Club",
  description:
    "Terms governing the use of the CamSur Uptown Golf Club website, including information about concept materials, bookings, availability, intellectual property, and external links.",
};

const EFFECTIVE_DATE = "September 17, 2026";

const SECTIONS = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    paragraphs: [
      "By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the website.",
      "These terms apply to the public website and its content. A confirmed booking, event, membership, golf reservation, or other service may be governed by additional terms communicated to you separately. If those terms conflict with these website terms, the service-specific terms will govern that transaction.",
    ],
  },
  {
    id: "website-information",
    title: "Website information and design-stage materials",
    paragraphs: [
      "The website is intended to introduce CamSur Uptown Golf Club, its proposed course, facilities, accommodations, dining, experiences, events, and packages.",
      "Golf course measurements, routing, par and handicap information, tee positions, water features, facilities, package inclusions, schedules, renderings, maps, photographs, and visual concepts may be based on currently available design-stage or reference materials. They may change following final surveying, construction, operational review, availability, or approval.",
      "Illustrations and enhanced images are provided to communicate the intended experience. They should not be treated as a guarantee that every physical detail, view, finish, facility, or landscape feature will appear exactly as shown.",
    ],
  },
  {
    id: "bookings",
    title: "Bookings, rates, and availability",
    paragraphs: [
      "Submitting an enquiry, callback request, package request, or proposed date does not create a confirmed reservation. A booking becomes confirmed only when the Club or the relevant facility issues confirmation and any required payment or deposit has been received.",
      "Rates, inclusions, tee times, accommodations, dining, transfers, activities, and event spaces remain subject to availability and may change without prior notice. Taxes, fees, eligibility requirements, cancellation rules, and payment terms will be confirmed during booking.",
      "Where this website links to another CamSur facility or booking channel, that operator's current terms, policies, and availability also apply.",
    ],
  },
  {
    id: "responsible-use",
    title: "Responsible website use",
    paragraphs: [
      "You may use this website for lawful personal, informational, and booking-related purposes. You must not attempt to disrupt the website, bypass its security, introduce malicious code, impersonate another person, submit false information, or use automated systems in a way that places an unreasonable load on the service.",
      "You are responsible for ensuring that the information you submit is accurate and that you are authorized to provide it. Do not send confidential, financial, or highly sensitive information through a general enquiry form.",
    ],
  },
  {
    id: "club-use",
    title: "Golf, facilities, and guest responsibilities",
    paragraphs: [
      "Guests must follow applicable club rules, safety guidance, dress requirements, course etiquette, caddie and cart instructions, age restrictions, and facility-specific policies. The Club may refuse or discontinue access where conduct creates a safety risk, disrupts other guests, damages property, or breaches applicable rules.",
      "Outdoor activities, golf, water recreation, motorsports, and other experiences involve inherent risks. Guests should assess their own fitness and ability, use required safety equipment, supervise children, and follow instructions from authorized personnel.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "Unless otherwise stated, the website's branding, logos, text, layouts, maps, illustrations, photographs, video, graphics, and other content are owned by or licensed to CamSur Uptown Golf Club and are protected by applicable intellectual-property laws.",
      "You may view and share links to public pages for personal, non-commercial use. You may not copy, republish, sell, modify, distribute, scrape, or use website content for commercial, promotional, training, or competing purposes without prior written permission.",
    ],
  },
  {
    id: "external-links",
    title: "External links and third-party services",
    paragraphs: [
      "Links to external websites, maps, social platforms, payment channels, or other CamSur facilities are provided for convenience. We do not control every external service and are not responsible for its content, security, availability, or privacy practices.",
      "Opening an external link means you are subject to that service's own terms and policies. A link does not necessarily imply endorsement of all content on the destination website.",
    ],
  },
  {
    id: "privacy",
    title: "Personal information and communications",
    paragraphs: [
      "When you submit your name, contact details, preferred dates, group information, or message, we may use that information to respond to your enquiry, prepare a booking or quotation, provide requested updates, and operate the website.",
      "We aim to handle personal information in accordance with applicable Philippine data-protection requirements. You may ask about information you previously submitted by contacting the Club. Marketing messages should be sent only where you have requested or agreed to receive them, and you may unsubscribe from them.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers and limitation of liability",
    paragraphs: [
      "We work to keep the website accurate and available, but it is provided on an as-is and as-available basis. We do not guarantee uninterrupted access, error-free content, or that every published detail will remain current.",
      "To the fullest extent permitted by law, CamSur Uptown Golf Club will not be liable for indirect, incidental, or consequential loss arising solely from reliance on website content, temporary website unavailability, or use of an external link. Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    id: "changes-and-law",
    title: "Changes, governing law, and contact",
    paragraphs: [
      "We may update the website and these terms as the project, facilities, and services develop. The revised effective date will appear at the top of this page. Continuing to use the website after an update means the revised terms apply to your later use.",
      "These terms are governed by the laws of the Republic of the Philippines. Any concern should first be raised with the Club so the parties can try to resolve it promptly and in good faith.",
    ],
  },
] as const;

export default function TermsOfUsePage() {
  return (
    <>
      <main className="bg-[#f7f5ee] text-[#14271d]">
        <ScrollMotion />

        <section className="bg-[#1f3f2e] px-6 pb-16 pt-40 text-white sm:pb-20 sm:pt-44 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b] xl:text-[11px]">
              Legal information
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.06em]">
              Terms of Use
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
              These terms explain how you may use the CamSur Uptown Golf Club website and how to understand the
              concept, booking, and facility information presented here.
            </p>
            <p className="mt-5 font-navigation text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d8b65b]/85">
              Effective {EFFECTIVE_DATE}
            </p>
          </div>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="border border-[#1f3f2e]/12 bg-white p-6">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                    On this page
                  </p>
                  <nav aria-label="Terms of Use sections" className="mt-5">
                    <ol className="space-y-3">
                      {SECTIONS.map((section, index) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="group flex gap-3 text-sm leading-6 text-[#59665e] transition-colors hover:text-[#265136]"
                          >
                            <span className="font-navigation text-[10px] font-bold text-[#b49343]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{section.title}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </aside>

              <div className="min-w-0">
                <div className="border-l-2 border-[#b49343] bg-[#efe9da] px-6 py-5 text-sm leading-7 text-[#4f5d55] sm:px-8">
                  Please read these terms together with any booking, event, accommodation, or facility-specific terms
                  provided when you make a reservation.
                </div>

                <div className="mt-10 divide-y divide-[#1f3f2e]/12">
                  {SECTIONS.map((section, index) => (
                    <section key={section.id} id={section.id} className="scroll-mt-28 py-9 first:pt-0 sm:py-11">
                      <div className="grid gap-4 sm:grid-cols-[52px_minmax(0,1fr)] sm:gap-6">
                        <p className="font-navigation text-[11px] font-bold tracking-[0.18em] text-[#b49343]">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <div>
                          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.04em]">
                            {section.title}
                          </h2>
                          <div className="mt-5 space-y-4 text-sm leading-7 text-[#59665e] sm:text-base sm:leading-8">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>

                <div className="mt-6 border border-[#1f3f2e]/12 bg-white p-7 sm:p-9">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                    Questions about these terms
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.04em]">Contact the Club.</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#59665e]">
                    For a website, booking, or data-related question, contact us by email or phone. You may also use the
                    contact page for a longer message.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={CLUB_EMAIL.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#265136] px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#1f3f2e]"
                    >
                      {CLUB_EMAIL.label}
                    </a>
                    <a
                      href={CLUB_PHONE.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#265136]/30 px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#265136] transition hover:border-[#265136]"
                    >
                      {CLUB_PHONE.label}
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#265136]/30 px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#265136] transition hover:border-[#265136]"
                    >
                      Contact page
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
