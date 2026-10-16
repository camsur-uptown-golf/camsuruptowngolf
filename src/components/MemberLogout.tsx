"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** Pindutang Log out sa pahina ng miyembro. */
export default function MemberLogout() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/members/logout", { method: "POST" }).catch(() => {});
        router.refresh();
      }}
      className="inline-flex h-11 items-center justify-center rounded-full border border-[#265136]/30 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#265136] transition hover:border-[#265136] hover:bg-[#265136] hover:text-white disabled:opacity-60 xl:text-[11px]"
    >
      {busy ? "Logging out…" : "Log out"}
    </button>
  );
}
