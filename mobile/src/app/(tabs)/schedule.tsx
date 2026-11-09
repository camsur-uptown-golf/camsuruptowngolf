import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useClubFeed, type ClubEvent } from '@/lib/app-api';
import { clubImage } from '@/lib/club-images';
import { addDays, dayEyebrow, dayParts, formatTime, monthLabel, shortDate, todayInManila } from '@/lib/dates';
import { useRounds } from '@/lib/next-round';
import { colors, fonts } from '@/theme/tokens';
import { Card } from '@/ui/card';
import { Chip, ChipRow } from '@/ui/chips';
import { Icon, type IconName } from '@/ui/icons';
import { MonthGrid } from '@/ui/month-grid';
import { Screen } from '@/ui/screen';
import { Body, Eyebrow, ScreenTitle } from '@/ui/text';

type View_ = 'calendar' | 'mine';

type ScheduleItem = {
  /** `HH:MM`, 24-oras. */
  time: string;
  kind: 'Tee time' | ClubEvent['kind'];
  title: string;
  detail: string;
  icon: IconName;
  tone: 'emerald' | 'gold';
  when?: string;
};

const NO_EVENTS: ClubEvent[] = [];
const tone = (event: ClubEvent): ScheduleItem['tone'] => (event.kind === 'Tournament' ? 'emerald' : 'gold');

/** `"06:40"` → `"6:40"`, `"15:00"` → `"15:00"` (24-oras, gaya ng p.77). */
const clock = (time: string) => time.replace(/^0/, '');

/** Schedule (Brand Guidelines p.77): ang club calendar at ang sariling schedule ng member. */
export default function ScheduleScreen() {
  const today = todayInManila();
  const [year, month] = [Number(today.slice(0, 4)), Number(today.slice(5, 7)) - 1];
  const events = useClubFeed()?.events ?? NO_EVENTS;
  const { upcoming: rounds } = useRounds();

  const [view, setView] = useState<View_>('calendar');
  const [selected, setSelected] = useState(today);
  const tomorrow = addDays(today, 1);
  const [day, setDay] = useState<string>(today);

  const marks = useMemo(() => {
    const out: Record<string, 'emerald' | 'gold'> = {};
    for (const event of events) out[event.date] ??= tone(event);
    return out;
  }, [events]);
  const dayEvents = events.filter((event) => event.date === selected);

  /* Ang mga round ng member (totoo, mula sa server) at, sa "Upcoming", ang
     susunod na mga event ng club. */
  const items = useMemo((): ScheduleItem[] => {
    const tee = rounds.map(
      (round): ScheduleItem & { date: string } => ({
        date: round.date,
        time: round.time,
        kind: 'Tee time',
        title: `Championship ${round.holes}`,
        detail: `Hole ${round.tee} · ${round.playerNames.length} ${round.playerNames.length === 1 ? 'player' : 'players'}${round.status === 'held' ? ' · downpayment due' : ''}`,
        icon: 'flag',
        tone: 'emerald',
      }),
    );
    if (day === 'upcoming') {
      const later = events
        .filter((event) => event.date > tomorrow)
        .slice(0, 4)
        .map((event) => ({ date: event.date, time: event.time, kind: event.kind, title: event.title, detail: event.detail, icon: 'star' as const, tone: tone(event) }));
      return [...tee.filter((item) => item.date > tomorrow), ...later]
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
        .map((item) => ({ ...item, when: shortDate(item.date) }));
    }
    const onDay = events
      .filter((event) => event.date === day)
      .map((event) => ({ date: event.date, time: event.time, kind: event.kind, title: event.title, detail: event.detail, icon: 'star' as const, tone: tone(event) }));
    return [...tee.filter((item) => item.date === day), ...onDay].sort((a, b) => a.time.localeCompare(b.time));
  }, [day, tomorrow, rounds, events]);

  return (
    <Screen>
      <ChipRow>
        <Chip label="Club calendar" selected={view === 'calendar'} onPress={() => setView('calendar')} />
        <Chip label="My schedule" selected={view === 'mine'} onPress={() => setView('mine')} />
      </ChipRow>

      {view === 'calendar' ? (
        <>
          <View>
            <Eyebrow>{monthLabel(year, month)}</Eyebrow>
            <ScreenTitle>Club calendar</ScreenTitle>
          </View>
          <Card style={styles.calendar}>
            <MonthGrid year={year} month={month} selected={selected} marks={marks} onSelect={setSelected} />
          </Card>
          <View style={styles.dayHead}>
            <Eyebrow>{dayEyebrow(selected)}</Eyebrow>
            <Text style={styles.count}>
              {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
            </Text>
          </View>
          {dayEvents.length === 0 ? <Body muted>No club events on this day.</Body> : null}
          {dayEvents.map((event) => (
            <Card key={event.id} style={styles.event}>
              <Image source={clubImage(event.image)} style={styles.thumb} contentFit="cover" />
              <View style={styles.eventText}>
                <Eyebrow style={styles.small}>{`${event.kind} · ${formatTime(event.time)}`}</Eyebrow>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Body muted style={styles.detail}>
                  {event.detail}
                </Body>
              </View>
            </Card>
          ))}
        </>
      ) : (
        <>
          <View>
            <Eyebrow>Today and tomorrow</Eyebrow>
            <ScreenTitle>My schedule</ScreenTitle>
          </View>
          <ChipRow>
            {[today, tomorrow].map((iso) => {
              const p = dayParts(iso);
              return <Chip key={iso} label={`${p.weekday} ${p.day}`} selected={day === iso} onPress={() => setDay(iso)} />;
            })}
            <Chip label="Upcoming" selected={day === 'upcoming'} onPress={() => setDay('upcoming')} />
          </ChipRow>
          <View>
            {items.map((item, index) => (
              <View key={`${item.title}-${index}`} style={styles.line}>
                <View style={styles.timeCol}>
                  <Text style={styles.time}>{item.when ?? clock(item.time)}</Text>
                </View>
                <View style={styles.rail}>
                  <View style={[styles.node, { backgroundColor: item.tone === 'gold' ? colors.gold : colors.emerald }]} />
                  {index < items.length - 1 ? <View style={styles.track} /> : null}
                </View>
                <Card style={styles.item}>
                  <Icon name={item.icon} size={24} color={item.tone === 'gold' ? colors.goldText : colors.emerald} />
                  <View style={styles.itemText}>
                    <Eyebrow style={styles.small}>{item.kind}</Eyebrow>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Body muted style={styles.detail}>
                      {item.detail}
                    </Body>
                  </View>
                </Card>
              </View>
            ))}
            {items.length === 0 ? <Body muted>Nothing on your schedule.</Body> : null}
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  calendar: { paddingHorizontal: 8 },
  dayHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  count: { fontFamily: fonts.sansBold, fontSize: 12, color: colors.emerald },
  event: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12 },
  thumb: { width: 76, height: 76, borderRadius: 12 },
  eventText: { flex: 1, gap: 3 },
  small: { fontSize: 10, letterSpacing: 2.2 },
  eventTitle: { fontFamily: fonts.serifRegular, fontSize: 23, color: colors.emerald },
  detail: { fontSize: 12.5 },
  line: { flexDirection: 'row', alignItems: 'stretch' },
  timeCol: { width: 54, paddingTop: 22 },
  time: { fontFamily: fonts.sansSemiBold, fontSize: 12.5, color: colors.emerald },
  rail: { width: 18, alignItems: 'center' },
  node: { width: 11, height: 11, borderRadius: 6, marginTop: 25 },
  track: { flex: 1, width: 1.5, backgroundColor: '#D8CDB5', marginTop: 4 },
  item: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, marginLeft: 8, marginBottom: 12, paddingVertical: 14 },
  itemText: { flex: 1, gap: 2 },
  itemTitle: { fontFamily: fonts.serifRegular, fontSize: 22, color: colors.emerald },
});
