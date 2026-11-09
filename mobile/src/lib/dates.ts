/**
 * Petsa sa Maynila (UTC+8, walang DST) bilang `YYYY-MM-DD` — kapareho ng
 * `todayInManila()` ng website, para hindi magkaiba ang "ngayon" ng app at ng
 * server kapag nasa ibang bansa ang gumagamit.
 */
const MANILA_OFFSET_MS = 8 * 60 * 60 * 1000;

export function todayInManila() {
  return new Date(Date.now() + MANILA_OFFSET_MS).toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function dayParts(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return {
    weekday: WEEKDAYS[date.getUTCDay()],
    day: date.getUTCDate(),
    month: MONTHS[date.getUTCMonth()],
  };
}

/** `"13:30"` → `"1:30 PM"`. */
export function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

const LONG_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const LONG_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Oras ngayon sa Maynila (0–23) — para sa "Good morning". */
export function hourInManila() {
  return new Date(Date.now() + MANILA_OFFSET_MS).getUTCHours();
}

/** `"2026-11-14"` → `"Sat 14 Nov"`. */
export function shortDate(iso: string) {
  const { weekday, day, month } = dayParts(iso);
  return `${weekday} ${day} ${month}`;
}

/** `"2026-11-14"` → `"Saturday 14 Nov"`. */
export function longDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return `${LONG_WEEKDAYS[date.getUTCDay()]} ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
}

/** `"2026-11-14"` → `"SATURDAY 14 NOV"` (eyebrow ng araw). */
export function dayEyebrow(iso: string) {
  return longDate(iso).toUpperCase();
}

/** `(2026, 10)` → `"November 2026"`. */
export function monthLabel(year: number, month: number) {
  return `${LONG_MONTHS[month]} ${year}`;
}
