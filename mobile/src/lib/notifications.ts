import { requireOptionalNativeModule } from 'expo';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

import { registerPushToken, unregisterPushToken } from '@/lib/app-api';
import type { Reservation } from '@/lib/booking-api';
import { formatTime } from '@/lib/dates';
import { readItem, removeItem, writeItem } from '@/lib/storage';

/**
 * Mga abiso ng app.
 *
 *   - PAALALA NG TEE TIME (local): nakatakda sa mismong phone — isang araw at
 *     dalawang oras bago ang bawat confirmed na round. Gumagana kahit offline.
 *   - PUSH (galing sa server): "booking confirmed" pagkabayad, at ang mga
 *     bagong event/offer na ipinapadala ng admin. Kailangan ng Expo push token.
 *
 * HINDI LAHAT NG APP AY MAY NATIVE MODULE. Ang Expo Go (lalo na sa Android,
 * SDK 53+) at ang lumang development build ay walang `ExpoPushTokenManager`,
 * at nagca-crash ang buong app kapag in-import lang ang `expo-notifications`.
 * Kaya dito lang ito nilo-load, at kung wala ang mga module ay walang abiso —
 * pero gumagana pa rin ang lahat ng iba.
 */

type NotificationsModule = typeof import('expo-notifications');
type NotificationResponse = import('expo-notifications').NotificationResponse;

const NATIVE_MODULES = ['ExpoPushTokenManager', 'ExpoNotificationScheduler', 'ExpoNotificationsEmitter', 'ExpoNotificationPermissionsModule'];

function loadNotifications(): NotificationsModule | null {
  if (Platform.OS === 'web') return null;
  if (NATIVE_MODULES.some((name) => !requireOptionalNativeModule(name))) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- sinasadya: hindi puwedeng `import` (nagca-crash kapag walang native module)
    const module = require('expo-notifications') as NotificationsModule;
    module.setNotificationHandler({
      handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }),
    });
    return module;
  } catch {
    return null;
  }
}

const Notifications = loadNotifications();

/** May suporta ba ang app na ito sa mga abiso (hindi Expo Go na kulang ang module). */
export const notificationsAvailable = Notifications !== null;

const PUSH_TOKEN_KEY = 'cu.pushToken';
const REMINDER_PREFIX = 'tee-';

const pushUnavailable = Platform.OS === 'android' && Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/** Humihingi ng pahintulot kung hindi pa napagpapasyahan. `true` kung pinayagan. */
export async function ensurePermission(): Promise<boolean> {
  if (!Notifications) return false;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Club notifications',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  return (await Notifications.requestPermissionsAsync()).granted;
}

export async function permissionGranted(): Promise<boolean> {
  if (!Notifications) return false;
  return (await Notifications.getPermissionsAsync()).granted;
}

/** Pagkatapos mag-sign-in: pahintulot, at itala ang push token ng phone sa server. */
export async function setUpPush(): Promise<void> {
  if (!Notifications || !(await ensurePermission().catch(() => false)) || pushUnavailable) return;
  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId as string | undefined;
    const { data: token } = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
    await registerPushToken(token, Platform.OS);
    await writeItem(PUSH_TOKEN_KEY, token);
  } catch {
    /* Walang push (hal. simulator) — gumagana pa rin ang mga local na paalala. */
  }
}

/** Bago mag-sign-out: wala nang push, at burahin ang mga paalala ng member. */
export async function tearDownPush(): Promise<void> {
  if (!Notifications) return;
  const token = await readItem(PUSH_TOKEN_KEY);
  if (token) await unregisterPushToken(token);
  await removeItem(PUSH_TOKEN_KEY);
  await scheduleRoundReminders([]);
}

/** Simula ng round bilang `Date` — oras sa Maynila (+08:00), saanman ang phone. */
const teeDate = (reservation: Reservation) => new Date(`${reservation.date}T${reservation.time}:00+08:00`);

/**
 * Itinutugma ang mga nakatakdang paalala sa listahan ng booking: binubura
 * ang luma (na-cancel, nalipat), at itinatakda ang kulang. Ligtas tawagin
 * nang paulit-ulit — ang `identifier` ang pumipigil sa doble.
 */
export async function scheduleRoundReminders(bookings: Reservation[]): Promise<void> {
  if (!Notifications) return;
  const now = Date.now();
  const wanted = new Map<string, { at: Date; title: string; body: string; code: string }>();
  for (const booking of bookings) {
    if (booking.status !== 'confirmed') continue;
    const start = teeDate(booking).getTime();
    const detail = `Championship ${booking.holes} · ${formatTime(booking.time)} · Hole ${booking.tee}`;
    const reminders = [
      { key: 'day', at: start - 24 * 3_600_000, title: 'Tomorrow on the tee', body: `${detail}. Reference ${booking.code}.` },
      { key: 'soon', at: start - 2 * 3_600_000, title: 'Your round is in two hours', body: `${detail}. Check in at the clubhouse.` },
    ];
    for (const reminder of reminders) {
      if (reminder.at > now) {
        wanted.set(`${REMINDER_PREFIX}${booking.code}-${reminder.key}`, { at: new Date(reminder.at), title: reminder.title, body: reminder.body, code: booking.code });
      }
    }
  }

  if (wanted.size > 0 && !(await permissionGranted().catch(() => false))) return;
  const scheduled = await Notifications.getAllScheduledNotificationsAsync().catch(() => []);
  const existing = new Set<string>();
  for (const item of scheduled) {
    if (!item.identifier.startsWith(REMINDER_PREFIX)) continue;
    if (wanted.has(item.identifier)) existing.add(item.identifier);
    else await Notifications.cancelScheduledNotificationAsync(item.identifier).catch(() => undefined);
  }
  for (const [identifier, reminder] of wanted) {
    if (existing.has(identifier)) continue;
    await Notifications.scheduleNotificationAsync({
      identifier,
      content: { title: reminder.title, body: reminder.body, data: { url: `/booking/${reminder.code}` } },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: reminder.at },
    }).catch(() => undefined);
  }
}

/** Ang `url` ng abisong pinindot (hal. `/booking/CU-…`), para buksan ang screen. */
function notificationUrl(response: NotificationResponse | null): string | null {
  const url = response?.notification.request.content.data?.url;
  return typeof url === 'string' && url.startsWith('/') ? url : null;
}

/**
 * Tinatawag ang `open` sa `url` ng abisong pinindot — pati ang pumindot na
 * nagbukas mismo sa app. Ibinabalik ang pang-alis ng listener.
 */
export function onNotificationOpened(open: (url: string) => void): () => void {
  if (!Notifications) return () => undefined;
  const handle = (response: NotificationResponse | null) => {
    const url = notificationUrl(response);
    if (url) open(url);
  };
  const last = Notifications.getLastNotificationResponse();
  if (last) {
    handle(last);
    Notifications.clearLastNotificationResponse();
  }
  const subscription = Notifications.addNotificationResponseReceivedListener(handle);
  return () => subscription.remove();
}
