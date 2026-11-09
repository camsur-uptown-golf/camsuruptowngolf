"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MEMBER_CHANGE_EVENT } from "@/components/HeaderUtilities";

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
        window.dispatchEvent(new Event(MEMBER_CHANGE_EVENT));
        router.refresh();
      }}
      className="inline-flex h-11 items-center justify-center rounded-full border border-[#2e5126]/30 px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#2e5126] transition hover:border-[#2e5126] hover:bg-[#2e5126] hover:text-white disabled:opacity-60 xl:text-[11px]"
    >
      {busy ? "Logging out…" : "Log out"}
    </button>
  );
}
