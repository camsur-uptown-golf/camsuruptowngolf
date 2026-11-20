"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tr from "@/components/Tr";
import { useTranslation } from "@/i18n/LanguageProvider";
import { VILLA_NIGHTS } from "@/lib/golf-booking";
import { VILLA_DEL_REY_STAYS, villaHouseHref } from "@/lib/villa-del-rey";
import styles from "./HomeVillaDelReyLookbook.module.css";

const STAYS = VILLA_DEL_REY_STAYS.map((stay) => ({
  ...stay,
  night: VILLA_NIGHTS.find((night) => night.slug === stay.slug),
})).sort((a, b) => (b.night?.pricePerNight ?? 0) - (a.night?.pricePerNight ?? 0));

const peso = (amount: number) => `₱${amount.toLocaleString("en-PH")}`;

/** A room lookbook with explicit selection and exterior/bedroom photography. */
export default function HomeVillaDelReyLookbook() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"exterior" | "interior">("exterior");
  const current = STAYS[active];

  return (
    <section id="home-stay" aria-labelledby="home-stay-title" className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.lookbook}>
          <header className={styles.header}>
            <div>
              <p className={`${styles.eyebrow} font-navigation`}>{t("home.stay.eyebrow")}</p>
              <h2 id="home-stay-title" className={styles.title}>A slower side of CamSur.</h2>
            </div>
            <div className={styles.introduction}>
              <p>{t("home.stay.intro")}</p>
              <Link href="/accommodations/villa-del-rey" className={styles.allStays}>
                View all accommodations
              </Link>
            </div>
          </header>

          <div className={styles.spread}>
            <figure id="home-stay-photo" className={styles.photograph}>
              <Image
                src={view === "exterior" ? current.exterior : current.interior}
                alt={view === "exterior"
                  ? "Exterior of the selected accommodation at Villa Del Rey"
                  : "Bedroom of the selected accommodation at Villa Del Rey"}
                fill
                quality={90}
                sizes="(min-width: 1600px) 890px, (min-width: 1024px) 57vw, calc(100vw - 5.5rem)"
                className={styles.image}
              />
              <div className={styles.photoToolbar}>
                <span className={styles.pageNumber} aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(STAYS.length).padStart(2, "0")}</span>
                <div className={styles.viewSwitcher} role="group" aria-label="Accommodation photo view">
                  <button type="button" aria-pressed={view === "exterior"} aria-controls="home-stay-photo" onClick={() => setView("exterior")}>Exterior</button>
                  <button type="button" aria-pressed={view === "interior"} aria-controls="home-stay-photo" onClick={() => setView("interior")}>Interior</button>
                </div>
              </div>
              <figcaption className={styles.photoCaption}>
                <span className={styles.propertyName}>Villa Del Rey</span>
                <span className={styles.photoName}>{current.name}</span>
                <span className={styles.setting}>{current.setting}</span>
              </figcaption>
            </figure>

            <div className={styles.roomPanel}>
              <p className={`${styles.listLabel} font-navigation`}>Choose your stay</p>
              <div className={styles.roomList} role="group" aria-label="Choose your stay">
                {STAYS.map((stay, index) => (
                  <button key={stay.slug} type="button" className={styles.roomChoice} aria-pressed={active === index} aria-controls="home-stay-detail" onClick={() => setActive(index)}>
                    <span className={styles.roomNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.roomName}>{stay.name}</span>
                    {stay.night ? <span className={styles.roomRate}>{peso(stay.night.pricePerNight)}</span> : null}
                  </button>
                ))}
              </div>

              <div id="home-stay-detail" className={styles.roomDetails} aria-live="polite" aria-atomic="true">
                <span className="sr-only">{current.name}</span>
                <p className={styles.description}>{current.description}</p>
                {current.night ? (
                  <div className={styles.facts}>
                    <p className={styles.guests}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="9" cy="7" r="3" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M16 4a3 3 0 0 1 0 6m3 11v-2a6 6 0 0 0-3-5.2" /></svg>
                      <Tr t="Up to {0} guests" v={[String(current.night.sleeps)]} />
                    </p>
                    <p className={styles.price}>{peso(current.night.pricePerNight)}<span>per night</span></p>
                  </div>
                ) : null}
                <Link href={villaHouseHref(current.slug)} className={styles.roomLink}>
                  View this stay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
