import Image from "next/image";
import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";
import { CLUB_ADDRESS } from "@/lib/site-content";

/**
 * Ang mga link ng footer.
 *
 * Bawat isa dito ay may totoong pupuntahan. Dati silang lahat `href="#"` —
 * labing-apat na link na walang patutunguhan.
 *
 * TODO: wala pang pahina ang Our Story, Membership, Golf Academy,
 * News & Blog, Careers, at Accessibility, kaya inalis muna sila.
 * Nasa sariling "Before you book" column ang FAQs at directions.
 * Ibalik ang bawat isa kapag may pahina na. Ang Privacy Policy ang
 * pinakaunang kailangan — nag-iimbak na tayo ng personal na datos.
 */
const LINK_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Play",
    links: [
      { label: "The Course", href: "/golf" },
      { label: "Packages", href: "/packages" },
    ],
  },
  {
    /* "Discover" na dito; "More at CamSur" pa rin ang homepage
       (OffCourseSection) — kung dapat magkatugma, sundan doon. "The Club" at
       "More at CamSur" ito dati — ang laman ay Clubhouse, Experiences, Events. */
    title: "Discover",
    links: [
      /* Wala ang Clubhouse sa footer noon kahit pangunahing section ito. */
      { label: "Clubhouse", href: "/clubhouse" },
      { label: "Experiences", href: "/experiences" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    /* Lahat ng kailangan bago pa dumating: saan matutulog, paano makarating,
       at kanino magtatanong. "Stay & Play" ang hanay na ito dati — isang
       item lang ang laman, at kapangalan pa ng isang package
       (/packages/stay-and-play), kaya dalawang magkaibang bagay ang
       iisa ang pangalan. */
    title: "Visit",
    links: [
      { label: "Villa Del Rey", href: "/accommodations/villa-del-rey" },
      { label: "Plan Your Visit", href: "/plan-your-visit" },
    ],
  },
  {
    title: "Before you book",
    links: [
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "How to Get Here", href: "/getting-here" },
    ],
  },
];

/**
 * TODO (para sa club): ilagay ang totoong URL ng bawat account.
 *
 * Habang `null` ang href, ipinapakita pa rin ang icon bilang MUTED na
 * placeholder (hindi link) sa "Follow us" — para kumpleto ang itsura ng
 * footer gaya ng reference. Kapag may URL na, nagiging buhay na link ito.
 * Hindi ito ginagawang clickable habang null: mas malinaw na "paparating pa"
 * kaysa limang pangakong walang pupuntahan.
 */
const SOCIALS: { label: string; href: string | null; path: string }[] = [
  { label: "Facebook", href: null, path: "M13.5 21v-7h2.3l.4-2.7h-2.7V9.5c0-.8.2-1.3 1.4-1.3h1.4V5.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v1.9H8.6V14h2.3v7h2.6z" },
  { label: "YouTube", href: null, path: "M20.5 8.4a2.2 2.2 0 0 0-1.5-1.5C17.7 6.5 12 6.5 12 6.5s-5.7 0-7 .4A2.2 2.2 0 0 0 3.5 8.4C3.1 9.7 3.1 12 3.1 12s0 2.3.4 3.6A2.2 2.2 0 0 0 5 17.1c1.3.4 7 .4 7 .4s5.7 0 7-.4a2.2 2.2 0 0 0 1.5-1.5c.4-1.3.4-3.6.4-3.6s0-2.3-.4-3.6zM10.3 14.4V9.6l4 2.4-4 2.4z" },
  { label: "X", href: null, path: "M17.5 5h2.1l-4.6 5.3L20.5 19h-4.3l-3.3-4.4L9 19H6.9l5-5.7L5.7 5h4.4l3 4 3.4-4zm-.8 12.6h1.2L9.4 6.3H8.1l8.6 11.3z" },
  { label: "TikTok", href: null, path: "M16.5 3c.3 2.1 1.6 3.6 3.6 3.9v2.4c-1.2.1-2.5-.3-3.6-1v5.8c0 3-2.3 5.4-5.2 5.4S6.1 17.1 6.1 14.1c0-2.8 2.1-5.1 4.8-5.4v2.5c-1.3.2-2.4 1.4-2.4 2.9 0 1.6 1.2 2.9 2.7 2.9s2.7-1.3 2.7-2.9V3h2.6z" },
];

/* Iisang anyo ng lahat ng pamagat sa footer: mga hanay ng link, "Follow us",
   at "Sign up to our newsletter". */
const SECTION_HEADING = "font-navigation text-[11px] font-semibold uppercase tracking-[0.16em] text-[#dcc578]";

/* Mga link: malalaking titik, makapal, may luwag — gaya ng reference. */
const NAV_LINK =
  "font-navigation text-[13px] font-semibold leading-5 tracking-[0.02em] text-white transition-colors hover:text-[#e7d18d] focus-visible:text-[#e7d18d] focus-visible:outline-none";

/**
 * Layout ng footer (hango sa Pinehurst): logo at contact sa kaliwa; sa kanan
 * ang apat na hanay ng link sa itaas, at sa ilalim nito ang "Follow us" (sa
 * ilalim ng unang hanay) at ang newsletter (sumasaklaw sa natitirang tatlo).
 * Nagsa-stack ang lahat sa cellphone.
 */
export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#1f3f2e] text-white">
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#c9a54e]/[0.035] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-12 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          {/* LOGO + CONTACT */}
          {/* Sa cellphone at tablet, katabi ng logo ang contact (sa kanan) para walang
              bakanteng espasyo; sa desktop, nasa ilalim ulit ng logo. */}
          <div className="flex items-center justify-between gap-6 sm:justify-start sm:gap-12 lg:block">
            <Link href="/" aria-label="CamSur Uptown Golf Club, home" className="inline-block shrink-0">
              <Image
                src="/camsur-uptown-logo.png"
                alt="CamSur Uptown Golf Club"
                width={132}
                height={176}
                className="h-40 w-auto sm:h-36 lg:h-44"
              />
            </Link>
            <address className="min-w-0 space-y-1 lg:mt-8 text-[13px] font-semibold not-italic leading-7 text-white">
              {CLUB_ADDRESS.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {/* Inalis muna ang phone at email dito (CLUB_PHONE / CLUB_EMAIL
                  sa site-content) — ibalik kapag kailangan na ulit. */}
            </address>
          </div>

          <div className="min-w-0">
            {/* LINKS — apat na hanay, may gold na pamagat sa itaas ng bawat isa. */}
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {LINK_GROUPS.map((group) => (
                <div key={group.title} className="min-w-0">
                  <p className={`mb-5 ${SECTION_HEADING}`}>
                    {group.title}
                  </p>
                  <ul className="space-y-3.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={NAV_LINK}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="mt-12 grid gap-10 sm:grid-cols-4 sm:gap-x-8 lg:mt-14">
              {/* FOLLOW US — sa ilalim ng unang hanay. Buhay na link kapag may
                  href; muted na placeholder habang wala pa (tingnan `SOCIALS`). */}
              <section aria-labelledby="footer-follow-title" className="min-w-0">
                <h2 id="footer-follow-title" className={SECTION_HEADING}>
                  Follow us
                </h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {SOCIALS.map((social) =>
                    social.href ? (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-white transition hover:border-[#e7d18d] hover:bg-[#c9a54e]/15 hover:text-[#e7d18d]"
                      >
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                          <path d={social.path} />
                        </svg>
                      </a>
                    ) : (
                      <span
                        key={social.label}
                        aria-hidden="true"
                        title={`${social.label} — coming soon`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/55"
                      >
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                          <path d={social.path} />
                        </svg>
                      </span>
                    ),
                  )}
                </div>
              </section>

              {/* NEWSLETTER — sumasaklaw sa natitirang tatlong hanay. */}
              <section aria-labelledby="footer-newsletter-title" className="min-w-0 sm:col-span-3">
                <h2 id="footer-newsletter-title" className={SECTION_HEADING}>
                  Sign up to our newsletter
                </h2>
                <NewsletterSignup />
              </section>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#c9a54e]/35 pt-6 text-[11px] text-white/55 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© 2026 CamSur Uptown Golf Club. All rights reserved.</p>
            <Link href="/terms-of-use" className="font-medium text-white/80 transition-colors hover:text-[#e7d18d]">
              Terms of Use
            </Link>
          </div>
          <p>Championship golf and world-class experiences.</p>
        </div>
      </div>
    </footer>
  );
}
