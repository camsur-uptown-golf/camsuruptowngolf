import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMember } from '@/auth/auth-provider';
import { cancelHold } from '@/lib/app-api';
import { continuePayment, fetchReservation, type Reservation } from '@/lib/booking-api';
import { sendClubRequest } from '@/lib/club-request';
import { formatTime, longDate, todayInManila } from '@/lib/dates';
import { colors, fonts, radius, shadow } from '@/theme/tokens';
import { Fade } from '@/ui/fade';
import { OutlineButton, PrimaryButton, TextLink } from '@/ui/buttons';
import { Card } from '@/ui/card';
import { Icon } from '@/ui/icons';
import { Body, Eyebrow, ScreenTitle } from '@/ui/text';

const COURSE_IMAGE = require('../../../assets/brand/course-hero.jpg');
const AVATAR_TONES = [colors.emerald, colors.moss, colors.gold, '#8C8370'];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() || '?';
}

/** "You're on the tee" (Brand Guidelines p.76) — o "Almost there" kung may downpayment pa. */
export default function BookingScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<{ reservation: Reservation; simulate: boolean } | null | undefined>(undefined);
  const [paying, setPaying] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [requested, setRequested] = useState(false);
  const member = useMember();

  const load = useCallback(() => fetchReservation(code).then(setData), [code]);
  useEffect(() => {
    load();
  }, [load]);

  if (data === undefined) {
    return (
      <View style={[styles.root, styles.center]}>
        <ActivityIndicator color={colors.emerald} />
      </View>
    );
  }
  if (data === null) {
    return (
      <View style={[styles.root, styles.center, { padding: 28, gap: 16 }]}>
        <ScreenTitle>Booking not found</ScreenTitle>
        <Body muted>The club could not find reference {code}. Please call the club if you need help.</Body>
        <PrimaryButton label="Done" onPress={() => router.replace('/')} />
      </View>
    );
  }

  const { reservation, simulate } = data;
  const held = reservation.status === 'held';
  const cancelled = reservation.status === 'cancelled';
  const expired = reservation.status === 'expired' || cancelled;
  const when = `${longDate(reservation.date)} · ${formatTime(reservation.time)} · Hole ${reservation.tee}`;
  const summary = `CamSur Uptown Golf — Championship ${reservation.holes}\n${when}\nReference ${reservation.code}`;

  async function pay() {
    setPaying(true);
    const result = await continuePayment(reservation.code, simulate);
    setPaying(false);
    if (result.checkoutUrl) await openBrowserAsync(result.checkoutUrl);
    await load();
  }

  /* Hold (hindi pa bayad): kinakansela agad at bukas ulit ang slot. */
  function confirmCancelHold() {
    Alert.alert('Cancel this hold?', 'The tee time will be released for other players.', [
      { text: 'Keep it', style: 'cancel' },
      {
        text: 'Cancel hold',
        style: 'destructive',
        onPress: async () => {
          setCancelling(true);
          const ok = await cancelHold(reservation.code);
          setCancelling(false);
          if (!ok) Alert.alert('Could not cancel', 'Please try again, or call the club.');
          await load();
        },
      },
    ]);
  }

  /* Confirmed (may downpayment): request sa club — ang staff ang nagre-refund. */
  function confirmRequestCancel() {
    if (!member.mobile) {
      Alert.alert('Call the club', 'Add a mobile number to your account, or call the club to cancel a paid booking.');
      return;
    }
    const mobile = member.mobile;
    Alert.alert('Request cancellation?', 'The club will call you to cancel and arrange your downpayment.', [
      { text: 'Not now', style: 'cancel' },
      {
        text: 'Send request',
        onPress: async () => {
          setCancelling(true);
          const ok = await sendClubRequest({
            member,
            mobile,
            interest: `Cancel tee time ${reservation.code}`,
            timeframe: `${reservation.date} ${reservation.time}`,
            guests: reservation.playerNames.length,
          });
          setCancelling(false);
          if (ok) setRequested(true);
          else Alert.alert('Could not send', 'Please try again, or call the club.');
        },
      },
    ]);
  }

  const upcoming = reservation.date >= todayInManila();

  const rows: [string, string][] = [
    ['Date', longDate(reservation.date)],
    ['Tee time', `${formatTime(reservation.time)} · Hole ${reservation.tee}`],
    ['Course', `Championship ${reservation.holes}`],
    ['Includes', reservation.addons.cart ? 'Cart · caddie on request' : 'Caddie on request'],
  ];

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={COURSE_IMAGE} style={StyleSheet.absoluteFill} contentFit="cover" />
          <Fade colors={['rgba(243,237,225,0)', 'rgba(243,237,225,0.6)', colors.ivory]} locations={[0.45, 0.75, 1]} />
        </View>
        <View style={styles.badgeWrap}>
          <View style={[styles.badge, expired && styles.badgeOff]}>
            <Icon name="check" size={34} color={colors.gold} stroke={2.2} />
          </View>
        </View>

        <View style={styles.head}>
          <Eyebrow>{cancelled ? 'Cancelled' : expired ? 'Hold expired' : held ? 'Almost there' : 'Booking confirmed'}</Eyebrow>
          <ScreenTitle style={styles.title}>{cancelled ? 'This booking was cancelled' : expired ? 'This hold has expired' : held ? 'Complete your downpayment' : 'You’re on the tee'}</ScreenTitle>
          <View style={styles.avatars}>
            {reservation.playerNames.slice(0, 3).map((name, i) => (
              <View key={`${name}-${i}`} style={[styles.avatar, { backgroundColor: AVATAR_TONES[i], marginLeft: i ? -10 : 0 }]}>
                <Text style={styles.avatarText}>{initials(name)}</Text>
              </View>
            ))}
            {reservation.playerNames.length > 3 ? (
              <View style={[styles.avatar, { backgroundColor: AVATAR_TONES[3], marginLeft: -10 }]}>
                <Text style={styles.avatarText}>+{reservation.playerNames.length - 3}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.body}>
          <Card padded={false} style={styles.card}>
            {rows.map(([label, value]) => (
              <View key={label} style={styles.row}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowValue}>{value}</Text>
              </View>
            ))}
            <View style={[styles.row, styles.rowLast]}>
              <Text style={styles.rowLabel}>Reference</Text>
              <Text style={styles.reference}>{reservation.code}</Text>
            </View>
          </Card>

          {held ? <Body muted>Your tee time is held while you pay the downpayment. Unpaid holds are released automatically.</Body> : null}

          <View style={styles.pair}>
            <OutlineButton label="Add to calendar" onPress={() => Share.share({ message: summary, title: 'Tee time' }).catch(() => undefined)} />
            <OutlineButton label="Invite players" onPress={() => Share.share({ message: `Join me for golf at CamSur Uptown Golf.\n${when}` }).catch(() => undefined)} />
          </View>
          {held ? (
            <PrimaryButton label="Pay downpayment" onPress={pay} loading={paying} />
          ) : (
            <PrimaryButton label="Done" onPress={() => router.replace(expired ? '/book' : '/')} />
          )}
          {held ? (
            <View style={styles.center}>
              <TextLink label={cancelling ? 'Cancelling…' : 'Cancel hold'} tone="gold" onPress={cancelling ? undefined : confirmCancelHold} />
            </View>
          ) : null}
          {reservation.status === 'confirmed' && upcoming ? (
            <View style={styles.center}>
              {requested ? (
                <Body muted style={styles.note}>
                  Cancellation requested — the club will call you.
                </Body>
              ) : (
                <TextLink label={cancelling ? 'Sending…' : 'Request cancellation'} tone="gold" onPress={cancelling ? undefined : confirmRequestCancel} />
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.ivory },
  center: { alignItems: 'center', justifyContent: 'center' },
  hero: { height: 260 },
  badgeWrap: { alignItems: 'center', marginTop: -56 },
  badge: { width: 92, height: 92, borderRadius: 46, backgroundColor: colors.emerald, borderWidth: 5, borderColor: colors.ivory, alignItems: 'center', justifyContent: 'center', ...shadow.card },
  badgeOff: { backgroundColor: colors.muted },
  head: { alignItems: 'center', gap: 6, paddingHorizontal: 22, marginTop: 14 },
  title: { fontSize: 36, textAlign: 'center' },
  avatars: { flexDirection: 'row', marginTop: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, borderWidth: 2.5, borderColor: colors.ivory, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.sansBold, fontSize: 13, color: colors.white },
  body: { padding: 22, gap: 14 },
  card: { paddingHorizontal: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#EEE7D9', gap: 12 },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { fontFamily: fonts.sans, fontSize: 14, color: colors.muted },
  rowValue: { fontFamily: fonts.sansSemiBold, fontSize: 14, color: colors.emerald, flexShrink: 1, textAlign: 'right' },
  reference: { fontFamily: fonts.sansBold, fontSize: 14, letterSpacing: 2, color: colors.goldText },
  pair: { flexDirection: 'row', gap: 12, marginTop: 6 },
  radius: { borderRadius: radius.card },
  note: { textAlign: 'center' },
});
