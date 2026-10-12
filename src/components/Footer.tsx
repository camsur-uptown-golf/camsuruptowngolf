import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

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
      { label: "Frequently asked questions", href: "/faq" },
      { label: "How to get here", href: "/getting-here" },
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

/* Pareho ang anyo ng pamagat ng "Sign up to our newsletter" at "Follow us"
   — dalawang magkatabing seksyon sa itaas ng footer. */
const BAND_HEADING =
  "text-base font-semibold uppercase tracking-[0.14em] text-[#c9a54e] sm:text-lg";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#1f3f2e] text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a54e]/55 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#c9a54e]/[0.035] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-10 sm:pt-12 lg:px-8 lg:pt-12">
        {/* LINK COLUMNS — nasa itaas na ngayon (inilipat sa ilalim ang
            newsletter + follow us). Inalis muna ang club info block
            (logo + address + contact) — ibalik kapag kailangan. */}
        <nav
          aria-label="Footer navigation"
          className="grid min-w-0 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:gap-x-12 xl:gap-x-16"
        >
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className={`${BAND_HEADING} mb-5`}>
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-medium text-white/68 transition-colors hover:text-[#f0dca0]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Hairline na naghahati sa link columns at sa newsletter/follow us. */}
        <div className="my-8 h-px bg-white/10 lg:my-10" />

        {/* NEWSLETTER + FOLLOW US — inilipat sa ILALIM (bago ang copyright bar).
            Newsletter sa kaliwa, follow us sa kanan; nagsa-stack sa cellphone. */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="footer-follow-title" className="min-w-0">
            <h2 id="footer-follow-title" className={BAND_HEADING}>
              Follow us
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
              Follow us on social media for regular updates and a look behind the scenes.
            </p>
            {/* Buhay na link kapag may href; muted na placeholder (hindi link)
                habang wala pa — tingnan ang komento sa `SOCIALS`. */}
            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map((social) =>
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#c9a54e]/50 hover:bg-[#c9a54e]/10 hover:text-[#f0dca0]"
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/25"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </span>
                ),
              )}
            </div>
          </section>

          <section
            aria-labelledby="footer-newsletter-title"
            className="min-w-0 lg:border-l lg:border-white/10 lg:pl-16"
          >
            <h2 id="footer-newsletter-title" className={BAND_HEADING}>
              Sign up to our newsletter
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
              Course updates, event announcements, and occasional offers sent straight to your inbox.
            </p>
            <NewsletterSignup />
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between lg:mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© 2026 CamSur Uptown Golf Club. All rights reserved.</p>
            <Link href="/terms-of-use" className="font-medium text-white/50 transition-colors hover:text-[#f0dca0]">
              Terms of Use
            </Link>
          </div>
          <p>Championship golf and world-class experiences.</p>
        </div>
      </div>
    </footer>
  );
}
