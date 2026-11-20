/** Browser-only privacy preferences. Unknown choices keep optional features off. */
export type PrivacyChoice = "accepted" | "rejected";

export const PRIVACY_STORAGE_KEY = "cu-privacy-v1";
export const PRIVACY_CHOICE_DAYS = 180;
const MAX_AGE = PRIVACY_CHOICE_DAYS * 86_400_000;
const CHANGE_EVENT = "cu:privacy-change";

// Keep the choice for this tab when the browser blocks localStorage.
let temporaryChoice: PrivacyChoice | undefined;

export function getPrivacyChoice(): PrivacyChoice | null {
  if (typeof window === "undefined") return null;
  if (temporaryChoice) return temporaryChoice;
  try {
    const raw = window.localStorage.getItem(PRIVACY_STORAGE_KEY);
    if (!raw) return null;
    const record: unknown = JSON.parse(raw);
    if (!record || typeof record !== "object") return null;
    const { version, choice, savedAt } = record as Record<string, unknown>;
    if (
      version !== 1 ||
      (choice !== "accepted" && choice !== "rejected") ||
      typeof savedAt !== "number" ||
      !Number.isFinite(savedAt) ||
      savedAt > Date.now() ||
      Date.now() - savedAt >= MAX_AGE
    ) return null;
    return choice;
  } catch {
    return null;
  }
}

export function clearOptionalPreferences() {
  for (const key of ["cu-lang", "cu-utilities"]) {
    try { window.localStorage.removeItem(key); } catch { /* Storage may be blocked. */ }
  }
  try {
    document.cookie = "cu-lang=; path=/; max-age=0; samesite=lax";
  } catch { /* Cookies may be blocked. */ }
}

export function savePrivacyChoice(choice: PrivacyChoice) {
  if (choice === "rejected") clearOptionalPreferences();
  try {
    window.localStorage.setItem(
      PRIVACY_STORAGE_KEY,
      JSON.stringify({ version: 1, choice, savedAt: Date.now() }),
    );
    temporaryChoice = undefined;
  } catch {
    temporaryChoice = choice;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeToPrivacyChoice(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== PRIVACY_STORAGE_KEY) return;
    temporaryChoice = undefined;
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", onChange);
  // A tab left open should also respect the choice's expiry.
  const timer = window.setInterval(onChange, 60_000);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", onChange);
    window.clearInterval(timer);
  };
}

// Hide the notice during SSR; all optional features still default to off.
export function getServerPrivacyChoice(): undefined { return undefined; }
