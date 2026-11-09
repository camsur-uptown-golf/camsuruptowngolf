import { Image } from 'expo-image';
import { Link, useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useMember } from '@/auth/auth-provider';
import { useClubFeed } from '@/lib/app-api';
import { formatTime, hourInManila, shortDate } from '@/lib/dates';
import { useNextRound } from '@/lib/next-round';
import { colors, fonts, radius, shadow } from '@/theme/tokens';
import { Fade } from '@/ui/fade';
import { LeatherCard, Card } from '@/ui/card';
import { Badge } from '@/ui/chips';
import { Icon, type IconName } from '@/ui/icons';
import { Screen } from '@/ui/screen';
import { Body, Eyebrow, ScreenTitle } from '@/ui/text';

const SHIELD = require('../../../assets/brand/shield.png');
const COURSE = require('../../../assets/brand/course-hero.jpg');

const ACTIONS: { label: string; icon: IconName; href: Href }[] = [
  { label: 'Tee time', icon: 'flag', href: '/book' },
  { label: 'Dining', icon: 'dining', href: '/club?view=dining' },
  { label: 'Practice bay', icon: 'bay', href: '/club?view=bays' },
  { label: 'Wellness', icon: 'wellness', href: '/club?view=wellness' },
];

function greeting() {
  const hour = hourInManila();
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
}

/** Home (Brand Guidelines p.75): ang susunod na round, mabilis na aksyon, panahon at ang offer. */
export default function HomeScreen() {
  const member = useMember();
  const router = useRouter();
  const { round } = useNextRound();
  const feed = useClubFeed();
  const weather = feed?.weather;
  const offer = feed?.offers[0];

  return (
    <Screen>
      <View style={styles.top}>
        <Image source={SHIELD} style={styles.shield} contentFit="contain" accessibilityLabel="CamSur Uptown Golf" />
        <Link href="/bookings" asChild>
          <Pressable accessibilityRole="button" accessibilityLabel="My bookings" hitSlop={10}>
            <Icon name="bell" size={24} />
            {round?.status === 'held' ? <View style={styles.bellDot} /> : null}
          </Pressable>
        </Link>
      </View>

      <View>
        <Eyebrow>{greeting()}</Eyebrow>
        <ScreenTitle style={styles.name}>{member.firstName || 'Member'}</ScreenTitle>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push(round ? (`/booking/${round.code}` as Href) : '/book')}
        style={[styles.round, shadow.card]}
      >
        <Image source={COURSE} style={StyleSheet.absoluteFill} contentFit="cover" />
        <Fade colors={['rgba(3,50,27,0)', 'rgba(3,50,27,0.15)', 'rgba(3,50,27,0.88)']} />
        <View style={styles.roundText}>
          <Eyebrow tone="ivory">{round ? 'Your next round' : 'No round booked'}</Eyebrow>
          <Text style={styles.roundTitle}>
            {round ? `${shortDate(round.date)} · ${formatTime(round.time)}` : 'Book your next round'}
          </Text>
          <Text style={styles.roundDetail}>
            {round
              ? `Championship ${round.holes} · Hole ${round.tee} tee · ${round.playerNames.length} ${round.playerNames.length === 1 ? 'player' : 'players'}`
              : 'Championship 18 · choose a date and time'}
          </Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        {ACTIONS.map((action) => (
          <Link key={action.label} href={action.href} asChild>
            <Pressable accessibilityRole="button" style={styles.action}>
              <View style={[styles.actionTile, shadow.card]}>
                <Icon name={action.icon} size={26} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {weather ? (
        <Card style={styles.weather}>
          <Icon name="sun" size={28} color={colors.goldText} />
          <View style={styles.weatherText}>
            <Text style={styles.weatherTitle}>
              {weather.temperature}°C · {weather.summary}
            </Text>
            <Body muted style={styles.weatherDetail} numberOfLines={1}>
              Now at the club · Pili, Camarines Sur
            </Body>
          </View>
        </Card>
      ) : null}

      {offer ? (
        <Pressable accessibilityRole="button" onPress={() => router.push(`/offer/${offer.id}` as Href)}>
          <LeatherCard style={styles.offer}>
            <View style={styles.offerText}>
              <Eyebrow tone="ivory">Members’ offer</Eyebrow>
              <Text style={styles.offerTitle}>{offer.title}</Text>
            </View>
            <Badge label="View" />
          </LeatherCard>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shield: { width: 38, height: 52 },
  bellDot: { position: 'absolute', top: 0, right: 1, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.gold },
  name: { fontSize: 40, lineHeight: 46, marginTop: 2 },
  round: { height: 252, borderRadius: radius.card + 4, overflow: 'hidden', justifyContent: 'flex-end' },
  roundText: { padding: 18, gap: 4 },
  roundTitle: { fontFamily: fonts.serifRegular, fontSize: 28, color: colors.ivory },
  roundDetail: { fontFamily: fonts.sansMedium, fontSize: 13, color: 'rgba(243,237,225,0.9)' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  action: { alignItems: 'center', gap: 8, width: '24%' },
  actionTile: { width: 66, height: 66, borderRadius: 18, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontFamily: fonts.sansSemiBold, fontSize: 12.5, color: colors.emerald },
  weather: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  weatherText: { flex: 1 },
  weatherTitle: { fontFamily: fonts.sansSemiBold, fontSize: 14, color: colors.emerald },
  weatherDetail: { fontSize: 12 },
  offer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18 },
  offerText: { gap: 4, flex: 1 },
  offerTitle: { fontFamily: fonts.serifRegular, fontSize: 24, color: colors.ivory },
});
