import Image from "next/image";
import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * Ang mga link ng footer.
 *
 * Bawat isa dito ay may totoong pupuntahan. Dati silang lahat `href="#"` —
 * labing-apat na link na walang patutunguhan.
 *
 * TODO: wala pang pahina ang Our Story, Membership, FAQs, Golf Academy,
 * News & Blog, Careers, Accessibility, at Terms, kaya inalis muna sila.
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
    title: "Stay & Play",
    links: [
      { label: "Accommodations", href: "/accommodations" },
      { label: "Dining", href: "/dining" },
    ],
  },
  {
    title: "The Club",
    links: [
      { label: "Experiences", href: "/experiences" },
      { label: "Events", href: "/events" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

/**
 * TODO (para sa club): ilagay ang totoong URL ng bawat account.
 *
 * Ang mga icon na `null` ang href ay hindi ipinapakita. Dati silang lahat
 * `href="#"` — mukhang pindutin pero walang pupuntahan. Mas mabuting wala
 * muna kaysa limang pangakong hindi natutupad.
 */
const SOCIALS: { label: string; href: string | null; path: string }[] = [
  { label: "Facebook", href: null, path: "M13.5 21v-7h2.3l.4-2.7h-2.7V9.5c0-.8.2-1.3 1.4-1.3h1.4V5.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v1.9H8.6V14h2.3v7h2.6z" },
  { label: "X", href: null, path: "M17.5 5h2.1l-4.6 5.3L20.5 19h-4.3l-3.3-4.4L9 19H6.9l5-5.7L5.7 5h4.4l3 4 3.4-4zm-.8 12.6h1.2L9.4 6.3H8.1l8.6 11.3z" },
  { label: "Instagram", href: null, path: "M12 8.9A3.1 3.1 0 1 0 12 15.1 3.1 3.1 0 0 0 12 8.9zm0 5.1A2 2 0 1 1 12 10a2 2 0 0 1 0 4zm3.3-5.3a.72.72 0 1 0 0 1.44.72.72 0 0 0 0-1.44zM12 6.9c1.6 0 1.8 0 2.5.04.9.04 1.4.2 1.7.33.4.16.7.36 1 .66.3.3.5.6.66 1 .13.3.29.8.33 1.7.03.7.04.9.04 2.5s0 1.8-.04 2.5c-.04.9-.2 1.4-.33 1.7a2.8 2.8 0 0 1-1.66 1.66c-.3.13-.8.29-1.7.33-.7.03-.9.04-2.5.04s-1.8 0-2.5-.04c-.9-.04-1.4-.2-1.7-.33a2.8 2.8 0 0 1-1.66-1.66c-.13-.3-.29-.8-.33-1.7C6.9 13.8 6.9 13.6 6.9 12s0-1.8.04-2.5c.04-.9.2-1.4.33-1.7.16-.4.36-.7.66-1 .3-.3.6-.5 1-.66.3-.13.8-.29 1.7-.33C10.2 6.9 10.4 6.9 12 6.9z" },
  { label: "YouTube", href: null, path: "M20.5 8.4a2.2 2.2 0 0 0-1.5-1.5C17.7 6.5 12 6.5 12 6.5s-5.7 0-7 .4A2.2 2.2 0 0 0 3.5 8.4C3.1 9.7 3.1 12 3.1 12s0 2.3.4 3.6A2.2 2.2 0 0 0 5 17.1c1.3.4 7 .4 7 .4s5.7 0 7-.4a2.2 2.2 0 0 0 1.5-1.5c.4-1.3.4-3.6.4-3.6s0-2.3-.4-3.6zM10.3 14.4V9.6l4 2.4-4 2.4z" },
  { label: "TikTok", href: null, path: "M16.5 3c.3 2.1 1.6 3.6 3.6 3.9v2.4c-1.2.1-2.5-.3-3.6-1v5.8c0 3-2.3 5.4-5.2 5.4S6.1 17.1 6.1 14.1c0-2.8 2.1-5.1 4.8-5.4v2.5c-1.3.2-2.4 1.4-2.4 2.9 0 1.6 1.2 2.9 2.7 2.9s2.7-1.3 2.7-2.9V3h2.6z" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#1c3b2d] text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a54e]/55 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#c9a54e]/[0.035] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.8fr_1.15fr] lg:gap-12">
          <div>
            <Image
              src="/camsur-uptown-logo.png"
              alt="Camsur Uptown Golf Club"
              width={130}
              height={173}
              className="h-32 w-auto"
            />
            <div className="mt-6 space-y-1.5 text-sm leading-6 text-white/62">
              <p className="font-semibold text-white/85">CamSur Uptown Golf Club</p>
              <p>Camarines Sur, Philippines</p>
              <p>
                <a href={CLUB_PHONE.href} className="font-semibold text-[#e7d18d] hover:text-white">
                  {CLUB_PHONE.label}
                </a>
              </p>
            </div>

            {SOCIALS.some((social) => social.href) ? (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {SOCIALS.filter((social) => social.href).map((social) => (
                  <a
                    key={social.label}
                    href={social.href as string}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-[#c9a54e]/50 hover:bg-[#c9a54e]/10 hover:text-[#f0dca0]"
                  >
                    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="mb-5 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a54e]">
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

          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a54e]">
              News & offers
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white">
              Stay connected to the club.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
              Course updates, event announcements, and occasional offers from CamSur Uptown, sent straight to your inbox.
            </p>

            <NewsletterSignup />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CamSur Uptown Golf Club. All rights reserved.</p>
          <p>Championship golf in the heart of Camarines Sur.</p>
        </div>
      </div>
    </footer>
  );
}
