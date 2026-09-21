import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import PageCurtain from "@/components/PageCurtain";
import RouteScrollReset from "@/components/RouteScrollReset";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

/**
 * Editorial display face. Variable ito, kaya isang file lang ang nadadala
 * para sa buong hanay ng bigat na ginagamit ng mga pamagat.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
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
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Nauuna sa RouteScrollReset: pareho silang nakikinig sa capture
            phase, at kailangang makansela muna ng kurtina ang click bago
            mag-scroll pataas ang kasalukuyang pahina. */}
        <PageCurtain />
        <RouteScrollReset />
        <Header />
        {children}
      </body>
    </html>
  );
}
