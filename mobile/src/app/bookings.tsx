import { useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Reservation, ReservationStatus } from '@/lib/booking-api';
import { formatTime, shortDate } from '@/lib/dates';
import { useRounds } from '@/lib/next-round';
import { colors, fonts } from '@/theme/tokens';
import { PrimaryButton, TextLink } from '@/ui/buttons';
import { Card } from '@/ui/card';
import { Icon } from '@/ui/icons';
import { Screen } from '@/ui/screen';
import { Body, Eyebrow, ScreenTitle } from '@/ui/text';

const STATUS: Record<ReservationStatus, string> = {
  held: 'Downpayment due',
  confirmed: 'Confirmed',
  expired: 'Hold expired',
  cancelled: 'Cancelled',
};

/** "My bookings": lahat ng tee time ng member, paparating muna. */
export default function BookingsScreen() {
  const router = useRouter();
  const { upcoming, past, loading } = useRounds();

  const row = (booking: Reservation, dim = false) => (
    <Pressable key={booking.code} accessibilityRole="button" onPress={() => router.push(`/booking/${booking.code}` as Href)}>
      <Card style={[styles.item, dim && styles.dim]}>
        <Icon name="flag" size={24} color={booking.status === 'held' ? colors.goldText : colors.emerald} />
        <View style={styles.itemText}>
          <Eyebrow style={styles.small}>{STATUS[booking.status]}</Eyebrow>
          <Text style={styles.itemTitle}>
            {shortDate(booking.date)} · {formatTime(booking.time)}
          </Text>
          <Body muted style={styles.detail}>
            Championship {booking.holes} · Hole {booking.tee} · {booking.playerNames.length}{' '}
            {booking.playerNames.length === 1 ? 'player' : 'players'}
          </Body>
        </View>
        <Icon name="chevron" size={18} color={colors.muted} />
      </Card>
    </Pressable>
  );

  return (
    <Screen>
      <View style={styles.back}>
        <TextLink label="‹ Back" onPress={() => router.back()} />
      </View>
      <View>
        <Eyebrow>Tee times</Eyebrow>
        <ScreenTitle>My bookings</ScreenTitle>
      </View>

      {loading ? <Body muted>Loading your bookings…</Body> : null}
      {!loading && upcoming.length === 0 ? (
        <Card style={styles.empty}>
          <Body muted>No rounds coming up.</Body>
          <PrimaryButton label="Book a tee time" onPress={() => router.push('/book')} />
        </Card>
      ) : null}
      {upcoming.map((booking) => row(booking))}

      {past.length > 0 ? <Eyebrow style={styles.section}>Past and cancelled</Eyebrow> : null}
      {past.slice(0, 20).map((booking) => row(booking, true))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  dim: { opacity: 0.65 },
  itemText: { flex: 1, gap: 2 },
  small: { fontSize: 10, letterSpacing: 2.2 },
  itemTitle: { fontFamily: fonts.serifRegular, fontSize: 22, color: colors.emerald },
  detail: { fontSize: 12.5 },
  empty: { gap: 14 },
  section: { marginTop: 8 },
});
