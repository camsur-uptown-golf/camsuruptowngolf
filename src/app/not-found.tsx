import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";

/**
 * Ang 404 ng buong site.
 *
 * Dati ay ang default ng Next.js ito: puting pahina na may "404 | This page
 * could not be found." — at dahil para sa madilim na hero ang gintong nav ng
 * header, halos hindi ito makita sa puti. Kaya madilim na hero rin ang
 * itaas ng pahinang ito, gaya ng ibang pahina, at may mga daan pabalik sa
 * pinakahinahanap: booking, ang course, mga tuluyan, at ang home.
 */
export const metadata: Metadata = {
  title: "Page not found | CamSur Uptown Golf",
};

const LINKS = [
  { label: "Reserve your round", href: "/golf/book" },
  { label: "The course", href: "/golf" },
  { label: "Villa Del Rey", href: "/accommodations/villa-del-rey" },
  { label: "Plan your visit", href: "/plan-your-visit" },
];

export default function NotFound() {
  return (
    <>
      <main>
        <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-[#03321b] px-6 pb-20 pt-48 text-white sm:px-8 lg:px-12">
          <HeroBackdrop src="/brand-2026/first-tee-dew.webp" alt="" imageClassName="object-[50%_62%]" />

          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">
              <p className="font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#efd99b]">
                Error 404
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                This fairway doesn&rsquo;t exist.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
                The page you were looking for has moved or was never built. Here are the places most guests are heading.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {LINKS.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      index === 0
                        ? "inline-flex h-12 items-center rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#03321b] transition hover:-translate-y-0.5 hover:bg-[#efd99b] xl:text-[12px]"
                        : "inline-flex h-12 items-center rounded-full border border-white/30 px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-[#e2c77a] hover:text-[#efd99b] xl:text-[12px]"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link href="/" className="mt-8 inline-block text-sm font-semibold text-white/75 underline underline-offset-4 transition hover:text-[#efd99b]">
                Back to the home page
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
