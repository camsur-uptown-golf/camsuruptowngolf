import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, Geist_Mono, Manrope, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import HeaderUtilities from "@/components/HeaderUtilities";
import BookTeeTimeButton from "@/components/BookTeeTimeButton";
import { siteUrl } from "@/lib/site-url";
import StructuredData from "@/components/StructuredData";
import RouteScrollReset from "@/components/RouteScrollReset";
import DomTranslator from "@/i18n/DomTranslator";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { PrivacyProvider } from "@/components/PrivacyNotice";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

/* PRELOAD: `subsets` ay ang mga subset na PINA-PRELOAD lang. Kumpleto pa rin
   ang @font-face (kasama ang Vietnamese na ầ, ệ, ỡ…), at dina-download lang
   ng browser ang Vietnamese na file kapag may ganoong letra sa pahina. Kaya
   "latin" lang dito — dati ay pina-preload sa bawat bisita ang Vietnamese.
   Ang Manrope, Cormorant SC at Geist Mono ay walang gumagamit sa CSS ngayon
   (variable lang), kaya `preload: false`: walang nada-download hangga't hindi
   ginagamit. Para sa CJK ay system font stacks per-locale sa globals.css. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  preload: false,
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

/** Editorial display face for hero, image, and section titles. */
const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  preload: false,
  display: "swap",
});

/** Mixed-case serif used where titles should not appear in small caps. */
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  /* Kailangan para maging absolute URL ang share image (`app/opengraph-image.jpg`)
     at ang mga link sa preview ng Messenger/Facebook. Tingnan ang `lib/site-url.ts`. */
  metadataBase: new URL(siteUrl()),
  title: "CamSur Uptown Golf",
  description:
    "A new championship golf destination beneath Mt. Isarog in Camarines Sur, Philippines — with course-side stays, clubhouse dining, and event spaces.",
  openGraph: {
    siteName: "CamSur Uptown Golf",
    type: "website",
    locale: "en_PH",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${montserrat.variable} ${cormorantSC.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        {/* Binabalot ng LanguageProvider ang buong app: dito nakukuha ng
            Header at ng iba pang client component ang kasalukuyang wika at ang
            `t()`. Client ito pero pumapasa lang ng {children} (server), kaya
            hindi nagiging client ang mga pahina. */}
        <PrivacyProvider>
          <LanguageProvider>
            {/* Naka-off muna ang PageCurtain (`components/PageCurtain.tsx`).
                Naiwan ang file — hindi ito binura — kaya isang import at isang
                linya lang ang kailangan para ibalik. Kapag ibinalik, dapat
                nauuna ito sa RouteScrollReset: pareho silang nakikinig sa
                capture phase, at kailangang makansela muna ng kurtina ang click
                bago mag-scroll pataas ang kasalukuyang pahina. Basahin din ang
                comment sa loob ng RouteScrollReset — may inalis doon na
                kaakibat nito. */}
            {/* Para sa keyboard at screen reader: unang Tab sa pahina, diretso
                sa nilalaman nang hindi dinadaanan ang buong menu. */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-[#03321b] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#efd99b] focus:shadow-lg"
            >
              Skip to content
            </a>
            <RouteScrollReset />
            <Header />
            <HeaderUtilities />
            <BookTeeTimeButton />
            {/* Isinasalin ang buong site sa piniling wika — tingnan ang i18n/DomTranslator.tsx. */}
            <DomTranslator />
            {children}
          </LanguageProvider>
        </PrivacyProvider>
        {/* Vercel Web Analytics at Speed Insights: bilang ng bisita, saan sila
            galing, anong pahina ang binubuksan, at gaano kabilis ang site sa
            totoong cellphone. Walang cookie at walang personal na datos, kaya
            hindi kailangan ng consent. Gumagana lang ito sa Vercel deploy;
            i-on sa Vercel dashboard → project → Analytics / Speed Insights. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
