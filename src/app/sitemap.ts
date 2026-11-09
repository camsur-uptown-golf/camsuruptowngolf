import type { MetadataRoute } from "next";
import { CLUBHOUSE_SPACES } from "@/lib/clubhouse";
import { ACCOMMODATIONS, COURSE_PAGES, SITE_SECTIONS } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-url";
import { VILLA_DEL_REY_STAYS } from "@/lib/villa-del-rey";

/**
 * Sitemap para sa mga search engine. Galing sa parehong listahan ng
 * `generateStaticParams` ng bawat dynamic na route, kaya kusang nadadagdag ang
 * bagong hole, kuwarto, o tuluyan. Wala rito ang mga pribado: `/golf/book/<code>`
 * (sariling reservation ng bisita) at `/api`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  const paths = [
    "/",
    "/plan-your-visit",
    "/golf/book",
    "/packages/stay-and-play",
    "/packages/buddy-trip",
    "/pro-shop",
    "/the-uptown-life",
    "/clubhouse/architecture",
    "/faq",
    "/getting-here",
    "/members",
    "/terms-of-use",
    ...SITE_SECTIONS.filter((section) => section.slug !== "accommodations").map((section) => `/${section.slug}`),
    ...COURSE_PAGES.map((course) => `/golf/courses/${course.slug}`),
    ...CLUBHOUSE_SPACES.map((space) => `/clubhouse/${space.id}`),
    ...ACCOMMODATIONS.map((stay) => `/accommodations/${stay.slug}`),
    ...VILLA_DEL_REY_STAYS.map((house) => `/accommodations/villa-del-rey/${house.slug}`),
  ];

  return [...new Set(paths)].map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : 0.7,
  }));
}
