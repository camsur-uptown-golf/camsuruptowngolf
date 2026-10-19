"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { HTML_LANG } from "@/i18n/config";
import { lookup, useSiteStrings } from "@/i18n/site-strings";

function asDate(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

function iso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function offsetDay(value: string, days: number) {
  const date = asDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return iso(date);
}

function offsetMonth(value: string, months: number) {
  const date = asDate(value);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return iso(date);
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`}>
      <path d="m7.5 5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Calendar({
  id, value, min, max, lang, tr, onSelect, onClose,
}: {
  id: string;
  value: string;
  min: string;
  max: string;
  lang: string;
  tr: (text: string) => string;
  onSelect: (date: string) => void;
  onClose: () => void;
}) {
  const [focusedDate, setFocusedDate] = useState(value);
  const grid = useRef<HTMLTableElement>(null);
  const month = focusedDate.slice(0, 7);
  const first = `${month}-01`;
  const start = offsetDay(first, -asDate(first).getUTCDay());
  const last = asDate(offsetMonth(first, 1));
  last.setUTCDate(0);
  const cellCount = Math.ceil((asDate(first).getUTCDay() + last.getUTCDate()) / 7) * 7;
  const cells = Array.from({ length: cellCount }, (_, i) => offsetDay(start, i));
  const format = (date: string, options: Intl.DateTimeFormatOptions) =>
    asDate(date).toLocaleDateString(lang, { ...options, timeZone: "UTC" });
  const clamp = (date: string) => date < min ? min : date > max ? max : date;

  useEffect(() => {
    grid.current?.querySelector<HTMLButtonElement>(`[data-date="${focusedDate}"]`)?.focus({ preventScroll: true });
  }, [focusedDate]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, date: string) {
    let next: string;
    switch (event.key) {
      case "ArrowLeft": next = offsetDay(date, -1); break;
      case "ArrowRight": next = offsetDay(date, 1); break;
      case "ArrowUp": next = offsetDay(date, -7); break;
      case "ArrowDown": next = offsetDay(date, 7); break;
      case "Home": next = offsetDay(date, -asDate(date).getUTCDay()); break;
      case "End": next = offsetDay(date, 6 - asDate(date).getUTCDay()); break;
      case "PageUp": next = offsetMonth(date, -1); break;
      case "PageDown": next = offsetMonth(date, 1); break;
      default: return;
    }
    event.preventDefault();
    setFocusedDate(clamp(next));
  }

  const navButton = "flex h-7 w-7 items-center justify-center rounded-sm border border-white/20 text-white transition hover:border-[#e7d18d] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7d18d] disabled:cursor-not-allowed disabled:opacity-25";

  return (
    <div id={id} role="dialog" aria-label={tr("Choose a date")} className="absolute left-0 top-full z-30 mt-1.5 w-full max-w-[288px] overflow-hidden rounded-sm border border-[#265136]/15 bg-white shadow-[0_8px_24px_-8px_rgba(10,36,24,0.25)]">
      <div className="flex items-center justify-between gap-2 bg-[#1f3f2e] px-3 py-2.5">
        <p id={`${id}-month`} aria-live="polite" className="text-sm font-medium text-white">{format(first, { month: "long", year: "numeric" })}</p>
        <div className="flex items-center gap-1">
          <button type="button" aria-label={tr("Previous month")} disabled={month <= min.slice(0, 7)} onClick={() => setFocusedDate(clamp(offsetMonth(focusedDate, -1)))} className={navButton}><Chevron className="rotate-180" /></button>
          <button type="button" aria-label={tr("Next month")} disabled={month >= max.slice(0, 7)} onClick={() => setFocusedDate(clamp(offsetMonth(focusedDate, 1)))} className={navButton}><Chevron /></button>
          <button type="button" aria-label={tr("Close calendar")} onClick={onClose} className="ml-1 flex h-7 w-5 items-center justify-center rounded-sm text-white/60 transition hover:text-white focus-visible:outline-2 focus-visible:outline-[#e7d18d]">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
      <div className="p-2">
        <table ref={grid} role="grid" aria-labelledby={`${id}-month`} className="w-full table-fixed border-separate border-spacing-1 text-center">
          <thead>
            <tr>
              {Array.from({ length: 7 }, (_, i) => {
                const day = offsetDay(start, i);
                return <th key={i} scope="col" aria-label={format(day, { weekday: "long" })} className="pb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#788279]">{format(day, { weekday: "narrow" })}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: cellCount / 7 }, (_, week) => (
              <tr key={week}>
                {cells.slice(week * 7, week * 7 + 7).map((day) => {
                  const disabled = day < min || day > max;
                  const selected = day === value;
                  const today = day === min;
                  const inMonth = day.slice(0, 7) === month;
                  return (
                    <td key={day} aria-selected={selected} className="p-0">
                      <button
                        type="button"
                        data-date={day}
                        disabled={disabled}
                        tabIndex={day === focusedDate ? 0 : -1}
                        aria-label={format(day, { dateStyle: "full" })}
                        aria-current={today ? "date" : undefined}
                        onKeyDown={(event) => navigate(event, day)}
                        onClick={() => onSelect(day)}
                        className={`relative flex h-8 w-full items-center justify-center rounded-sm text-xs font-medium tabular-nums transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98782f] disabled:cursor-not-allowed ${selected ? "bg-[#265136] font-bold text-white" : disabled ? "text-[#bdc3be]" : today ? "bg-[#f6f0df] text-[#265136] hover:bg-[#ece3c9]" : `hover:bg-[#265136]/[0.07] ${inMonth ? "text-[#14271d]" : "text-[#788279]"}`}`}
                      >
                        {asDate(day).getUTCDate()}
                        {today ? <span aria-hidden="true" className={`absolute bottom-0.5 h-1 w-1 rounded-full ${selected ? "bg-[#e7d18d]" : "bg-[#98782f]"}`} /> : null}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[#1f3f2e]/10 bg-[#faf9f5] px-3 py-2 text-[10px] text-[#667269]">
        <span className="flex items-center gap-1.5"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#98782f]" />{tr("Today")}</span>
        <span>{format(min, { month: "short", day: "numeric" })} – {format(max, { month: "short", day: "numeric" })}</span>
      </div>
    </div>
  );
}

export default function BookingDatePicker({ id, value, min, max, onChange }: {
  id: string;
  value: string;
  min: string;
  max: string;
  onChange: (date: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const { locale } = useTranslation();
  const dict = useSiteStrings();
  const tr = (text: string) => (dict && lookup(dict, text)) ?? text;
  const lang = locale === "BCL" ? "en-PH" : HTML_LANG[locale];
  const format = (date: string, options: Intl.DateTimeFormatOptions) =>
    asDate(date).toLocaleDateString(lang, { ...options, timeZone: "UTC" });
  const weekday = asDate(min).getUTCDay();
  const weekend = offsetDay(min, weekday === 0 ? 0 : (6 - weekday + 7) % 7);
  const shortcuts = [
    { label: "Today", date: min },
    { label: "Tomorrow", date: offsetDay(min, 1) },
    { label: "This weekend", date: weekend },
  ];

  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  function close() {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  function select(date: string) {
    if (date < min || date > max) return;
    if (date !== value) onChange(date);
    close();
  }

  return (
    <div translate="no" className="mt-3 max-w-xs">
      <div
        ref={root}
        className="relative"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
        onKeyDown={(event) => {
          if (open && event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            close();
          }
        }}
      >
        <button
          ref={trigger}
          id={id}
          type="button"
          aria-labelledby={`${id}-label ${id}-value`}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? `${id}-calendar` : undefined}
          onClick={() => setOpen(!open)}
          className={`flex w-full items-center gap-3 border bg-white px-4 py-3 text-left transition hover:border-[#265136]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#265136] ${open ? "border-[#265136] ring-2 ring-[#265136]/20" : "border-[#1f3f2e]/25"}`}
        >
          <span aria-hidden="true" className="shrink-0 text-[#265136]">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M7.5 3v5M16.5 3v5M3.5 10.5h17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="m8.5 15 2 2 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span id={`${id}-value`} aria-live="polite" className="min-w-0 flex-1 text-sm font-medium text-[#14271d]">
            {format(value, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
          </span>
          <Chevron className={`shrink-0 text-[#265136] transition-transform ${open ? "-rotate-90" : "rotate-90"}`} />
        </button>
        {open ? <Calendar id={`${id}-calendar`} value={value} min={min} max={max} lang={lang} tr={tr} onSelect={select} onClose={close} /> : null}
      </div>
      <div role="group" aria-label={tr("Choose a date")} className="mt-2 flex flex-wrap gap-1.5">
        {shortcuts.filter((shortcut) => shortcut.date <= max).map((shortcut) => (
          <button
            key={shortcut.label}
            type="button"
            aria-pressed={value === shortcut.date}
            onClick={() => { if (shortcut.date !== value) onChange(shortcut.date); }}
            className={`rounded-sm border px-2.5 py-1 text-[10px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#265136] ${value === shortcut.date ? "border-[#265136]/25 bg-[#265136]/[0.07] text-[#265136]" : "border-[#1f3f2e]/15 bg-transparent text-[#667269] hover:border-[#265136]/40 hover:bg-white hover:text-[#265136]"}`}
          >
            {tr(shortcut.label)}
          </button>
        ))}
      </div>
    </div>
  );
}
