"use client";

import { useState } from "react";

/**
 * Paghahanap sa FAQ.
 *
 * Server component pa rin ang pahina at `<details>` pa rin ang mga tanong —
 * itinatago lang nito ang hindi tugma. Bawat tanong ay may `data-faq-item`
 * (kasama ang teksto ng tanong at sagot) at bawat pangkat ay `data-faq-group`;
 * nawawala ang pangkat kapag wala na itong tugmang tanong. Kapag walang tugma
 * sa lahat, lumalabas ang mensahe sa ibaba ng input.
 *
 * Bakit kailangan: mahirap mag-Ctrl+F sa cellphone, at hindi alam ng bisita
 * kung saang pangkat nakalagay ang hinahanap niya.
 */
/** Itinatago ang hindi tugma; `true` kapag may kahit isang tugmang tanong. */
function applyFilter(query: string): boolean {
  const needle = query.trim().toLowerCase();
  let anyVisible = false;

  for (const group of document.querySelectorAll<HTMLElement>("[data-faq-group]")) {
    let groupVisible = false;
    for (const item of group.querySelectorAll<HTMLElement>("[data-faq-item]")) {
      const match = !needle || (item.textContent ?? "").toLowerCase().includes(needle);
      item.hidden = !match;
      if (match) groupVisible = true;
    }
    group.hidden = !groupVisible;
    if (groupVisible) anyVisible = true;
  }
  return anyVisible;
}

export default function FaqSearch() {
  const [query, setQuery] = useState("");
  const [noMatches, setNoMatches] = useState(false);

  return (
    <div className="mt-6">
    <label htmlFor="faq-search" className="sr-only">
      Search the questions
    </label>
    <div className="relative max-w-xl">
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6a62]" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id="faq-search"
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setNoMatches(!applyFilter(event.target.value));
        }}
        placeholder="Search — e.g. caddie, dress code"
        autoComplete="off"
        className="h-12 w-full rounded-full border border-[#03321b]/20 bg-white pl-11 pr-5 text-base text-[#03321b] placeholder:text-[#5f6a62] focus:border-[#2e5126] focus:outline-none focus:ring-2 focus:ring-[#2e5126]/20"
      />
    </div>
    <p aria-live="polite" className="mt-3 min-h-6 text-sm text-[#34423a]">
      {noMatches && query.trim() ? "No questions match that yet — ask the club directly below." : ""}
    </p>
    </div>
  );
}
