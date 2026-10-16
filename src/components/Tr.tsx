"use client";

import { Fragment, type ReactNode } from "react";
import { lookup, useSiteStrings } from "@/i18n/site-strings";

/**
 * Isang pangungusap na may laman sa gitna — pangalan, numero ng telepono,
 * o link — na isinasalin nang BUO.
 *
 * Ang DomTranslator ay sumasalin kada text node. Kapag may link o pangalan
 * sa gitna ng pangungusap, nahahati ito sa mga piraso ("Planning a round…?"
 * + link + "has everything…"), at sa Korean/Japanese ay mali ang
 * pagkakasunod ng mga piraso. Dito ay template ang isinasalin
 * ("Planning a round, a stay, or an event? {0} has everything…") at saka
 * isinisingit ang mga laman sa tamang puwesto ng salin.
 *
 *   <Tr t="Ask about {0}" v={[house.name]} />
 *   <Tr t="Call {0} or email {1}." v={[<a …>{phone}</a>, <a …>{email}</a>]} />
 *
 * Isinasalin din ang mga string na laman (hal. pangalan ng section) kung may
 * salin ang mga iyon; ang ReactNode na laman (link) ay ang DomTranslator na
 * ang sumasalin sa loob. Ang template ay dapat may salin sa bawat
 * `strings/*.json`; kung wala, English ang lalabas.
 */
export default function Tr({ t, v = [] }: { t: string; v?: ReactNode[] }) {
  const dict = useSiteStrings();
  const template = dict?.[t] ?? t;
  const parts = template.split(/\{(\d+)\}/);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) return part ? <Fragment key={index}>{part}</Fragment> : null;
        const value = v[Number(part)];
        return <Fragment key={index}>{typeof value === "string" ? ((dict && lookup(dict, value)) ?? value) : value}</Fragment>;
      })}
    </>
  );
}
