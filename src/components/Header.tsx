import Image from "next/image";

const NAV = [
  { label: "Golf", href: "#concepts" },
  { label: "Packages", href: "#contact" },
  { label: "Accommodations", href: "#contact" },
  { label: "Dining", href: "#contact" },
  { label: "Visit", href: "#contact" },
  { label: "Events", href: "#contact" },
  { label: "Shop", href: "#" },
];

// TODO: palitan ng totoong contact number ng club
const PHONE_LABEL = "(054) 123 4567";
const PHONE_HREF = "tel:+63541234567";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-5 px-6 py-5 lg:grid-cols-[1fr_auto_1fr] lg:px-8 lg:py-6">
        <a href="#top" className="flex shrink-0 items-center justify-self-start" aria-label="Camsur Uptown Golf Club — home">
          <Image
            src="/camsur-uptown-logo.png"
            alt="Camsur Uptown Golf Club"
            width={176}
            height={234}
            priority
            className="h-36 w-auto drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)] lg:h-44"
          />
        </a>

        <div className="hidden flex-col items-center gap-3 justify-self-center lg:flex">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.07em] text-white/88 [text-shadow:0_1px_7px_rgba(0,0,0,0.45)] xl:text-[11px]">
            <a href="#contact" className="flex items-center gap-2 transition-colors hover:text-[#f1d98f]">
              <CalendarIcon />
              Check availability
            </a>
            <span className="h-3.5 w-px bg-white/35" aria-hidden="true" />
            <a href={PHONE_HREF} className="flex items-center gap-2 transition-colors hover:text-[#f1d98f]">
              <PhoneIcon />
              {PHONE_LABEL}
            </a>
          </div>

          <nav className="flex items-center gap-0.5 rounded-full border border-[#d8b65b]/20 bg-[#0a2b1d]/82 p-1.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-white/90 shadow-[0_12px_35px_rgba(0,0,0,0.2)] backdrop-blur-md xl:text-[11px] xl:tracking-[0.09em]">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap rounded-full px-3 py-2.5 transition-colors hover:bg-white/10 hover:text-[#f3dda0] xl:px-3.5"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <a
          href="#contact"
          className="hidden translate-y-4 items-center justify-self-end rounded-full bg-white/85 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#20362c] shadow-[0_10px_28px_rgba(0,0,0,0.15)] backdrop-blur transition hover:bg-white lg:inline-flex"
        >
          Contact Us
        </a>

        <div className="flex items-center gap-2 justify-self-end lg:hidden">
          <a href={PHONE_HREF} aria-label={`Call ${PHONE_LABEL}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur">
            <PhoneIcon />
          </a>
          <details className="relative lg:hidden">
            <summary aria-label="Open navigation" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur [&::-webkit-details-marker]:hidden">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="absolute right-0 z-30 mt-3 w-64 rounded-2xl border border-white/10 bg-[#092319]/95 p-2.5 shadow-2xl backdrop-blur-xl">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm text-white/85 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
              <a href="#contact" className="mt-2 block rounded-xl bg-[#f1d98f] px-4 py-3 text-center text-sm font-bold text-[#0b281b]">
                Reserve a tee time
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
