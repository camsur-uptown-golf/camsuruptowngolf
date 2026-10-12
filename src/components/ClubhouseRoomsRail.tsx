"use client";

import { useEffect, useState } from "react";

type RailItem = { id: string; name: string };

/**
 * Lumulutang na vertical na mga tuldok sa kanan habang nasa loob ng mga
 * kuwarto. Isang tuldok bawat kuwarto: naka-highlight ang kasalukuyan, may
 * tooltip ng pangalan kapag hinover, at tumatalon sa kuwarto kapag kinlik.
 */
export default function ClubhouseRoomsRail({
  containerId,
  items,
  label = "Clubhouse spaces",
}: {
  containerId: string;
  items: RailItem[];
  label?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Lumalabas lang ang rail kapag nasa gitna ng viewport ang seksiyon.
    const sectionObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sectionObserver.observe(container);

    // Ang kuwartong tumatawid sa gitnang linya ng viewport ang aktibo.
    const roomObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) roomObserver.observe(el);
    }

    return () => {
      sectionObserver.disconnect();
      roomObserver.disconnect();
    };
  }, [containerId, items]);

  return (
    <nav
      aria-label={label}
      className={`fixed right-3 top-1/2 z-40 -translate-y-1/2 transition-all duration-500 sm:right-5 lg:right-7 ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none translate-x-3 opacity-0"
      }`}
    >
      <ul className="flex flex-col items-center gap-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-label={item.name}
                aria-current={active ? "true" : undefined}
                tabIndex={visible ? 0 : -1}
                onClick={(event) => {
                  event.preventDefault();
                  const room = document.getElementById(item.id);
                  if (!room) return;
                  // Itinatapat ang ibaba ng kuwarto sa ibaba ng viewport, para
                  // buo ang caption at Explore button. Full-screen ang panel,
                  // kaya sa likod lang ng header napupunta ang itaas nito.
                  const top = room.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
                className="group relative flex h-7 w-8 items-center justify-center focus-visible:outline-none"
              >
                {/* Classic dots: maliit na puting tuldok; ang aktibo ay gold na
                    may manipis na gold na singsing sa paligid. */}
                <span
                  aria-hidden="true"
                  className={`block rounded-full transition-all duration-300 ${
                    active
                      ? "h-2.5 w-2.5 bg-[#e7d18d] shadow-[0_0_0_4px_rgba(20,39,29,0.35),0_0_0_5.5px_#e7d18d]"
                      : "h-[7px] w-[7px] bg-white/85 shadow-[0_0_6px_rgba(0,0,0,0.55)] group-hover:h-2.5 group-hover:w-2.5 group-hover:bg-white group-focus-visible:h-2.5 group-focus-visible:w-2.5 group-focus-visible:bg-white"
                  }`}
                />
                {/* Text lang ang tooltip — walang kahon/background. Ang
                    text-shadow ang nagpapabasa nito sa ibabaw ng larawan. */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#f0d98f] opacity-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.7)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 xl:text-xs"
                >
                  {item.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
