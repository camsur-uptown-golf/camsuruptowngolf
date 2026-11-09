import { COURSE, LATE_START } from '@site/golf-booking';
import { useRouter, type Href } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useMember } from '@/auth/auth-provider';
import { fetchTeeTimes, type TeeSlot } from '@/lib/api';
import { reserveTeeTime } from '@/lib/booking-api';
import { addDays, dayParts, formatTime, todayInManila } from '@/lib/dates';
import { colors, fonts, radius, shadow } from '@/theme/tokens';
import { PrimaryButton } from '@/ui/buttons';
import { Card } from '@/ui/card';
import { Chip, ChipRow } from '@/ui/chips';
import { Icon } from '@/ui/icons';
import { Screen } from '@/ui/screen';
import { SlotTile } from '@/ui/slot';
import { Body, Eyebrow, ScreenTitle } from '@/ui/text';

type Format = '18' | '9' | 'twilight';
const FORMATS: { id: Format; label: string }[] = [
  { id: '18', label: '18 holes' },
  { id: '9', label: '9 holes' },
  { id: 'twilight', label: 'Twilight' },
];

const ERRORS: Record<string, string> = {
  taken: 'That time has just been taken. Please choose another.',
  time: 'That time is no longer available. Please choose another.',
  date: 'That date cannot be booked yet. Please choose another.',
  contact: 'Please add a mobile number so the club can reach you.',
};

/** Book a tee time (Brand Guidelines p.76) — totoong availability at hold. */
export default function BookScreen() {
  const member = useMember();
  const router = useRouter();
  const today = todayInManila();
  const days = useMemo(() => Array.from({ length: Math.min(14, COURSE.bookAheadDays + 1) }, (_, i) => addDays(today, i)), [today]);

  const [date, setDate] = useState(days[0]);
  const [format, setFormat] = useState<Format>('18');
  /* Naka-key sa petsa at format ang sagot, kaya walang setState sa simula ng effect. */
  const [result, setResult] = useState<{ key: string; slots: TeeSlot[] | null; error: boolean } | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [players, setPlayers] = useState(4);
  const [mobile, setMobile] = useState(member.mobile ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const holes = format === '9' ? 9 : 18;
  const key = `${date}|${format}`;
  const slots = result?.key === key ? result.slots : null;
  const loadError = result?.key === key && result.error;

  useEffect(() => {
    let alive = true;
    fetchTeeTimes(date, holes)
      .then((response) => {
        if (!alive) return;
        const tee1 = response.tees[1];
        setResult({ key, slots: format === 'twilight' ? tee1.filter((slot) => slot.time >= LATE_START) : tee1, error: false });
      })
      .catch(() => alive && setResult({ key, slots: null, error: true }));
    return () => {
      alive = false;
    };
  }, [key, date, holes, format]);

  const groups = useMemo(() => {
    if (!slots) return [];
    if (format === 'twilight') return [{ label: 'Twilight · Hole 1 tee', slots }];
    return [
      { label: 'Morning · Hole 1 tee', slots: slots.filter((slot) => slot.time < '12:00') },
      { label: 'Afternoon · Hole 1 tee', slots: slots.filter((slot) => slot.time >= '12:00') },
    ].filter((group) => group.slots.length > 0);
  }, [slots, format]);

  async function reserve() {
    if (!time) return;
    if (!mobile.trim()) {
      setError(ERRORS.contact);
      return;
    }
    setBusy(true);
    setError(null);
    const name = `${member.firstName} ${member.lastName}`.trim();
    const result = await reserveTeeTime({
      date,
      holes,
      tee: 1,
      time,
      players,
      playerNames: Array.from({ length: players }, (_, i) => (i === 0 ? name : `Guest ${i}`)),
      addons: { cart: 1 },
      villa: null,
      contactName: name,
      contactEmail: member.email,
      contactPhone: mobile.trim(),
    });
    setBusy(false);
    if (!result.ok) {
      setError(ERRORS[result.error] ?? 'The booking could not be made. Please try again.');
      return;
    }
    router.push(`/booking/${result.code}` as Href);
  }

  return (
    <Screen
      action={<PrimaryButton label={time ? `Reserve ${formatTime(time)}` : 'Choose a tee time'} onPress={reserve} disabled={!time} loading={busy} />}
    >
      <View>
        <Eyebrow>Championship 18 · Par 72</Eyebrow>
        <ScreenTitle>Book a tee time</ScreenTitle>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.days}>
        {days.map((day) => {
          const parts = dayParts(day);
          const selected = day === date;
          return (
            <Pressable
              key={day}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${parts.weekday} ${parts.day} ${parts.month}`}
              onPress={() => {
                setDate(day);
                setTime(null);
              }}
              style={[styles.day, selected ? styles.daySelected : shadow.card]}
            >
              <Text style={[styles.dayWeek, selected && styles.onEmerald]}>{parts.weekday}</Text>
              <Text style={[styles.dayNum, selected && styles.onEmerald]}>{parts.day}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ChipRow>
        {FORMATS.map((item) => (
          <Chip key={item.id} label={item.label} selected={format === item.id} onPress={() => {
              setFormat(item.id);
              setTime(null);
            }} />
        ))}
      </ChipRow>

      {loadError ? (
        <Body muted>Tee times could not be loaded. Please check your connection and try again.</Body>
      ) : !slots ? (
        <ActivityIndicator color={colors.emerald} style={styles.loading} />
      ) : groups.length === 0 ? (
        <Body muted>No tee times are left on this day. Please choose another date.</Body>
      ) : (
        groups.map((group) => (
          <View key={group.label} style={styles.group}>
            <View style={styles.groupHead}>
              <Eyebrow>{group.label}</Eyebrow>
              <Text style={styles.cart}>Cart included</Text>
            </View>
            <View style={styles.grid}>
              {group.slots.map((slot) => (
                <View key={slot.time} style={styles.cell}>
                  <SlotTile
                    label={formatTime(slot.time).replace(/ (AM|PM)$/, '')}
                    state={slot.status !== 'open' ? 'full' : slot.time === time ? 'selected' : 'open'}
                    onPress={() => setTime(slot.time)}
                  />
                </View>
              ))}
            </View>
          </View>
        ))
      )}

      <Card style={styles.players}>
        <View style={styles.playersText}>
          <Text style={styles.playersTitle}>Players</Text>
          <Body muted style={styles.playersDetail}>
            {players === 1 ? 'Just you' : `You + ${players - 1} ${players - 1 === 1 ? 'guest' : 'guests'}`}
          </Body>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Fewer players" disabled={players <= 1} onPress={() => setPlayers((n) => Math.max(1, n - 1))} style={[styles.step, styles.stepOutline, players <= 1 && styles.stepOff]}>
          <Icon name="minus" size={18} />
        </Pressable>
        <Text style={styles.count}>{players}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="More players" disabled={players >= COURSE.maxPlayers} onPress={() => setPlayers((n) => Math.min(COURSE.maxPlayers, n + 1))} style={[styles.step, styles.stepFill, players >= COURSE.maxPlayers && styles.stepOff]}>
          <Icon name="plus" size={18} color={colors.white} />
        </Pressable>
      </Card>

      {!member.mobile ? (
        <Card>
          <Eyebrow>Mobile number</Eyebrow>
          <TextInput
            value={mobile}
            onChangeText={setMobile}
            placeholder="+63 9XX XXX XXXX"
            placeholderTextColor={colors.faint}
            keyboardType="phone-pad"
            style={styles.input}
            accessibilityLabel="Mobile number"
          />
        </Card>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  days: { gap: 9, paddingVertical: 4, paddingRight: 8 },
  day: { width: 58, height: 76, borderRadius: radius.tile, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', gap: 2 },
  daySelected: { backgroundColor: colors.emerald },
  dayWeek: { fontFamily: fonts.sansSemiBold, fontSize: 12, color: colors.emerald },
  dayNum: { fontFamily: fonts.serifRegular, fontSize: 26, lineHeight: 30, color: colors.emerald },
  onEmerald: { color: colors.white },
  loading: { marginVertical: 30 },
  group: { gap: 10 },
  groupHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cart: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 },
  cell: { width: '25%', padding: 4 },
  players: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  playersText: { flex: 1 },
  playersTitle: { fontFamily: fonts.sansSemiBold, fontSize: 15, color: colors.emerald },
  playersDetail: { fontSize: 13 },
  step: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  stepOutline: { borderWidth: 1.2, borderColor: '#CFC5B1' },
  stepFill: { backgroundColor: colors.emerald },
  stepOff: { opacity: 0.35 },
  count: { fontFamily: fonts.serifRegular, fontSize: 26, color: colors.emerald, minWidth: 18, textAlign: 'center' },
  input: { marginTop: 8, height: 48, borderRadius: radius.tile, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 14, fontFamily: fonts.sansMedium, fontSize: 15, color: colors.onyx },
  error: { fontFamily: fonts.sansMedium, fontSize: 13, color: '#A4502F' },
});
