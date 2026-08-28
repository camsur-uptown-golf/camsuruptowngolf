import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { SITE_SECTIONS } from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_SECTIONS.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section: slug } = await params;
  const section = SITE_SECTIONS.find((item) => item.slug === slug);
  return section ? { title: `${section.label} | CamSur Uptown Golf Club`, description: section.description } : {};
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: slug } = await params;
  const section = SITE_SECTIONS.find((item) => item.slug === slug);
  if (!section) notFound();

  return (
    <>
      <main>
        <section id="top" className="relative isolate flex min-h-[660px] items-end overflow-hidden bg-[#071d13] text-white">
          <Image src={section.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,22,15,0.62)_0%,rgba(5,22,15,0.2)_45%,rgba(5,22,15,0.88)_100%)]" />
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-64 lg:px-8 lg:pb-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e1c56e]">{section.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.06em]">{section.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">{section.description}</p>
          </div>
        </section>

        <section className="bg-[#f7f5ee] py-20 text-[#14271d] sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 border-b border-[#173b2a]/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">Explore {section.label}</p>
                <h2 className="mt-4 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-none tracking-[-0.055em]">Start with what inspires you.</h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#56625b] lg:justify-self-end">These concept pages are an initial static presentation. Final details, availability, and operating information can be connected as the club plan develops.</p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.links.map((link, index) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  id={`option-${index + 1}`}
                  href={link.href}
                  className="group flex min-h-48 flex-col justify-between rounded-[1.4rem] border border-[#173b2a]/12 bg-white p-6 shadow-[0_14px_34px_rgba(20,45,32,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(20,45,32,0.11)]"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a07d30]">{String(index + 1).padStart(2, "0")}</p>
                  <div className="mt-8 flex items-end justify-between gap-5">
                    <h3 className="text-xl font-semibold leading-tight tracking-[-0.035em]">{link.label}</h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/20 transition group-hover:bg-[#174630] group-hover:text-white" aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
