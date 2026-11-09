import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { useCallback, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { useAuth, useMember } from '@/auth/auth-provider';
import { SITE_URL } from '@/lib/api';
import { useRounds } from '@/lib/next-round';
import { ensurePermission, notificationsAvailable, permissionGranted, setUpPush } from '@/lib/notifications';
import { colors, fonts } from '@/theme/tokens';
import { OutlineButton, PrimaryButton, TextLink } from '@/ui/buttons';
import { Card, LeatherCard } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Body, Eyebrow, ScreenTitle } from '@/ui/text';

const SHIELD = require('../../../assets/brand/shield.png');
const WORDMARK = require('../../../assets/brand/master-logo.png');

/**
 * Member card (Brand Guidelines p.75): leather card at QR para sa pagdating.
 * Wala pang handicap at guest passes sa sistema ng club, kaya ang mga round
 * (nalaro at paparating) ang nasa mga tile.
 */
export default function ProfileScreen() {
  const member = useMember();
  const { signOut } = useAuth();
  const router = useRouter();
  const { upcoming, past } = useRounds();
  const played = past.filter((round) => round.status === 'confirmed').length;
  const [reminders, setReminders] = useState<boolean | null>(null);

  useFocusEffect(
    useCallback(() => {
      permissionGranted().then(setReminders);
    }, []),
  );

  async function turnOnReminders() {
    const granted = await ensurePermission();
    setReminders(granted);
    if (granted) await setUpPush();
    else await Linking.openSettings().catch(() => undefined);
  }
  const since = member.since ? new Date(member.since).getUTCFullYear() : 2026;
  const name = `${member.firstName} ${member.lastName}`.trim();

  return (
    <Screen>
      <View>
        <Eyebrow>Digital membership</Eyebrow>
        <ScreenTitle>Member card</ScreenTitle>
      </View>

      <LeatherCard stitched style={styles.card}>
        <View style={styles.cardTop}>
          <Image source={SHIELD} style={styles.shield} contentFit="contain" />
          {/* "Member" lang: Founding/Full Golf/Corporate ang tiers ng Brand
              Guidelines, pero Birdie/Eagle/Albatross pa ang nasa backend —
              hindi pa nagpapasya ang club kung alin ang tatagal. */}
          <View style={styles.tier}>
            <Eyebrow tone="ivory">Member</Eyebrow>
            <Text style={styles.since}>Since {since}</Text>
          </View>
        </View>
        <View style={styles.cardBottom}>
          <View style={styles.flex}>
            <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
              {name}
            </Text>
            <Text style={styles.number}>{member.memberNumber}</Text>
          </View>
          <Image source={WORDMARK} style={styles.wordmark} contentFit="contain" accessibilityLabel="CamSur Uptown Golf" />
        </View>
      </LeatherCard>

      <Card style={styles.qr}>
        <QRCode value={`CUG:${member.memberNumber.replace(/[^0-9]/g, '')}:${member.email}`} size={176} color={colors.emerald} backgroundColor={colors.white} />
        <Text style={styles.qrNote}>Show at arrival, pro shop and bars</Text>
      </Card>

      <View style={styles.tiles}>
        <Card style={styles.tile}>
          <Eyebrow style={styles.small}>Rounds played</Eyebrow>
          <Text style={styles.value}>{played}</Text>
        </Card>
        <Card style={styles.tile}>
          <Eyebrow style={styles.small}>Upcoming rounds</Eyebrow>
          <Text style={styles.value}>{upcoming.length}</Text>
        </Card>
      </View>

      <PrimaryButton label="My bookings" onPress={() => router.push('/bookings')} />

      {notificationsAvailable && reminders === false ? (
        <Card style={styles.reminders}>
          <Text style={styles.remindersTitle}>Tee-time reminders are off</Text>
          <Body muted style={styles.remindersText}>
            Get a reminder the day before and two hours before each round, and a note when the club confirms your booking.
          </Body>
          <View style={styles.row}>
            <OutlineButton label="Turn on reminders" onPress={turnOnReminders} />
          </View>
        </Card>
      ) : null}

      <Body muted style={styles.email}>
        Signed in as {member.email}
      </Body>
      <View style={styles.row}>
        <OutlineButton label="Sign out" onPress={signOut} />
      </View>
      <View style={styles.center}>
        <TextLink label="Visit the website" onPress={() => openBrowserAsync(SITE_URL)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: { height: 220, justifyContent: 'space-between', padding: 24 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  shield: { width: 46, height: 62 },
  tier: { alignItems: 'flex-end', gap: 6 },
  since: { fontFamily: fonts.sans, fontSize: 13, color: 'rgba(243,237,225,0.85)' },
  cardBottom: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  name: { fontFamily: fonts.serifRegular, fontSize: 30, color: colors.ivory },
  number: { fontFamily: fonts.sansBold, fontSize: 13, letterSpacing: 3, color: colors.gold, marginTop: 4 },
  wordmark: { width: 52, height: 62, opacity: 0.85 },
  qr: { alignItems: 'center', gap: 16, paddingVertical: 24 },
  qrNote: { fontFamily: fonts.sansSemiBold, fontSize: 13, color: colors.emerald },
  tiles: { flexDirection: 'row', gap: 12 },
  tile: { flex: 1, gap: 4 },
  small: { fontSize: 10 },
  value: { fontFamily: fonts.serifRegular, fontSize: 32, color: colors.emerald },
  reminders: { gap: 8 },
  remindersTitle: { fontFamily: fonts.sansSemiBold, fontSize: 14, color: colors.emerald },
  remindersText: { fontSize: 12.5 },
  email: { textAlign: 'center', marginTop: 4, fontSize: 12.5 },
  row: { flexDirection: 'row' },
  center: { alignItems: 'center', paddingBottom: 8 },
});
