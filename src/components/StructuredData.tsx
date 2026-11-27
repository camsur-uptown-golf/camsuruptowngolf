import { CLUB_EMAIL, CLUB_PHONE } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-url";

/**
 * Structured data (schema.org JSON-LD) para sa Google: sinasabi nito na golf
 * course ang site, saan ito, at paano makontak — ang ginagamit ng Google para
 * sa rich results at sa knowledge panel. Server component, kaya nasa HTML na
 * ito mismo at walang JavaScript na naidadagdag sa browser.
 *
 * Galing sa iisang pinagmumulan (CLUB_PHONE, CLUB_EMAIL) ang contact; ang
 * coordinates at ZIP ay ang nasa komento ng CLUB_ADDRESS sa site-content.ts.
 */
export default function StructuredData() {
  const url = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "GolfCourse",
    "@id": `${url}/#golfcourse`,
    name: "CamSur Uptown Golf",
    description:
      "An 18-hole, par 72 championship golf course designed by IMG beneath Mt. Isarog in Camarines Sur, Philippines, with course-side stays, clubhouse dining and event spaces.",
    url,
    logo: `${url}/icon.png`,
    image: `${url}/opengraph-image.jpg`,
    telephone: CLUB_PHONE.href.replace("tel:", ""),
    email: CLUB_EMAIL.label,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Jose, Pili",
      addressRegion: "Camarines Sur",
      postalCode: "4418",
      addressCountry: "PH",
    },
    geo: { "@type": "GeoCoordinates", latitude: 13.584308, longitude: 123.253267 },
    hasMap: "https://www.google.com/maps/search/?api=1&query=13.584308,123.253267",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "18 holes, par 72", value: true },
      { "@type": "LocationFeatureSpecification", name: "Clubhouse and rooftop bar", value: true },
      { "@type": "LocationFeatureSpecification", name: "Course-side accommodations", value: true },
      { "@type": "LocationFeatureSpecification", name: "Online tee-time booking", value: true },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: `${url}/golf/book`,
      name: "Reserve a tee time",
    },
  };

  return (
    <script
      type="application/ld+json"
      /* `<` ay ine-escape para hindi maisara ng anumang teksto ang <script>. */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
