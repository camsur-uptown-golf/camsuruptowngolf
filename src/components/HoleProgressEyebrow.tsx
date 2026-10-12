"use client";

import { useTranslation } from "@/i18n/LanguageProvider";

type HoleProgressEyebrowProps = {
  current: number;
  total: number;
};

function formatProgressLabel(template: string, current: number, total: number) {
  return template.replace("{current}", String(current)).replace("{total}", String(total));
}

export default function HoleProgressEyebrow({ current, total }: HoleProgressEyebrowProps) {
  const { t } = useTranslation();
  const currentDisplay = String(current).padStart(2, "0");
  const totalDisplay = String(total).padStart(2, "0");
  const accessibleLabel = formatProgressLabel(t("course.holeProgressLabel"), current, total);

  return (
    <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#d1af58] xl:text-[11px]">
      <span className="sr-only">{accessibleLabel}</span>
      <span aria-hidden="true">
        {t("course.hole")} {currentDisplay}
        <span className="mx-[0.45em]">/</span>
        {totalDisplay}
      </span>
    </p>
  );
}
