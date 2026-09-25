import type { Metadata } from "next";
import { Cormorant_SC, Geist_Mono, Manrope, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import RouteScrollReset from "@/components/RouteScrollReset";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

/** Editorial display face for hero, image, and section titles. */
const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
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
      className={`${manrope.variable} ${geistMono.variable} ${montserrat.variable} ${cormorantSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
      </body>
    </html>
  );
}
