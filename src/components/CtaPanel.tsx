import Image from "next/image";
import Link from "next/link";

/**
 * Ang pangwakas na panawagan ("Come and see it.", "Send us your dates." …) —
 * IISANG PANEL NA PUWEDENG ILAGAY KAHIT SAAN.
 *
 * Tatlong bagay ang nagpapagana niyon:
 *
 * 1. PANEL LANG ITO, WALANG SARILING SECTION O LAPAD. Pinupuno nito ang
 *    anumang lalagyan na paglagyan mo — buong pahina, isang hanay ng grid, o
 *    isang sidebar. Ang pahina ang nagpapasya ng lapad at ng puwang sa paligid.
 *
 * 2. SUMUSUNOD SA SARILING LAPAD, HINDI SA LAPAD NG SCREEN (`@container`).
 *    Magkatabi ang teksto at pindutan kapag malapad ang PANEL (`@3xl:`), at
 *    patong-patong kapag makitid — kahit nasa malapad na screen pa ito. Ganoon
 *    din ang laki ng pamagat (`cqi`). Kung `md:`/`lg:` ang gamit, masisira ito
 *    sa makitid na hanay ng malapad na screen.
 *
 * 3. MAY SARILING KULAY. Madilim-berde na may bilugang kanto, kaya kita ito
 *    sa cream at sa puti. Huwag lang idikit nang buong lapad sa Footer —
 *    madilim-berde rin iyon, at magdidikit ang dalawa.
 *
 * `reveal`: umaangat ang panel pagpasok sa tanaw (`data-reveal="up"`).
 * Kailangan nito ng <ScrollMotion /> sa pahina; kung wala, HUWAG itong
 * i-on — mananatiling nakatago ang panel.
 */

type Action = { label: string; href: string };

/**
 * Watermark ng panel: ANG MARKA NG CLUB — ang gintong shield na guhit lang
 * (bundok, watawat, at umaagos na fairway), ang parehong marka sa header
 * kapag naka-scroll.
 *
 * Guhit ito, hindi buong hugis, kaya malinaw pa ring makilala kahit mahina
 * ang kulay. (Ang `camsur-uptown-golf-shield.png` na ginamit dati ay nagiging
 * malaking patak kapag pinahina.)
 *
 * Lumalampas ito sa itaas at ibaba ng panel at pinuputol ng `overflow-hidden`,
 * at naglalaho pakaliwa (`mask-image`) para hindi dumaan sa likod ng pamagat.
 * Sa makitid na panel (cellphone): nasa kanan din, nakagitna nang patayo,
 * mas mahina — nasa likod lang ito ng teksto.
 */
function ClubMark() {
  return (
    <Image
      src="/camsur-uptown-mark-transparent.png"
      alt=""
      width={911}
      height={1251}
      aria-hidden="true"
      className="pointer-events-none absolute right-[4cqi] top-1/2 -z-10 h-[70%] w-auto max-w-none -translate-y-1/2 opacity-[0.12] [mask-image:linear-gradient(90deg,transparent_0%,black_50%)] @3xl:right-[3cqi] @3xl:h-[135%] @3xl:opacity-[0.16] @3xl:[mask-image:linear-gradient(90deg,transparent_0%,black_45%)]"
    />
  );
}

export default function CtaPanel({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  reveal = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  primary: Action;
  secondary?: Action;
  reveal?: boolean;
}) {
  return (
    <div
      data-reveal={reveal ? "up" : undefined}
      className="@container relative isolate overflow-hidden rounded-3xl bg-[#03321b] text-white shadow-[0_28px_60px_rgba(8,27,18,0.18)] ring-1 ring-inset ring-[#e2c77a]/15"
    >
      {/* Mahinang liwanag sa kanang-itaas, para hindi patag na kahon ang panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_120%_at_100%_0%,#2f5a40_0%,rgba(47,90,64,0)_60%)]"
      />
      <ClubMark />

      <div className="flex flex-col gap-8 p-7 @md:p-10 @3xl:flex-row @3xl:items-end @3xl:justify-between @3xl:gap-12 @5xl:p-16">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#e2c77a] @md:text-sm">{eyebrow}</p>
          ) : null}
          <h2
            className={`${eyebrow ? "mt-3 " : ""}text-balance font-display text-[clamp(2rem,6.2cqi,4.625rem)] font-medium leading-[0.98] tracking-[-0.045em]`}
          >
            {title}
          </h2>
          {text ? <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 @md:text-base @md:leading-8">{text}</p> : null}
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={primary.href}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#03321b] transition hover:-translate-y-0.5 hover:bg-[#efd99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2c77a] xl:text-[12px]"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/45 px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-[#e2c77a] hover:text-[#efd99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2c77a] xl:text-[12px]"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
