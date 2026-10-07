import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, Geist_Mono, Manrope, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import RouteScrollReset from "@/components/RouteScrollReset";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

/* Kasama na ang `vietnamese` subset sa mga Latin face na nagbubuhat ng
   teksto — may sariling diacritics ang Vietnamese (ầ, ệ, ỡ…). Para sa CJK
   (Korean/Chinese/Japanese) ay hindi Latin ang glyphs, kaya system CJK font
   stacks ang inilalapat per-locale sa globals.css sa halip. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

/** Editorial display face for hero, image, and section titles. */
const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

/** Mixed-case serif used where titles should not appear in small caps. */
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CamSur Uptown Golf Club",
  description:
    "A new championship golf destination beneath Mt. Isarog in Camarines Sur, Philippines — with course-side stays, clubhouse dining, and event spaces.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${montserrat.variable} ${cormorantSC.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Binabalot ng LanguageProvider ang buong app: dito nakukuha ng
            Header at ng iba pang client component ang kasalukuyang wika at ang
            `t()`. Client ito pero pumapasa lang ng {children} (server), kaya
            hindi nagiging client ang mga pahina. */}
        <LanguageProvider>
          {/* Naka-off muna ang PageCurtain (`components/PageCurtain.tsx`).
              Naiwan ang file — hindi ito binura — kaya isang import at isang
              linya lang ang kailangan para ibalik. Kapag ibinalik, dapat
              nauuna ito sa RouteScrollReset: pareho silang nakikinig sa
              capture phase, at kailangang makansela muna ng kurtina ang click
              bago mag-scroll pataas ang kasalukuyang pahina. Basahin din ang
              comment sa loob ng RouteScrollReset — may inalis doon na
              kaakibat nito. */}
          <RouteScrollReset />
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
