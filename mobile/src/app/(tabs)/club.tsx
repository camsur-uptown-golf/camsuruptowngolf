import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useMember } from '@/auth/auth-provider';
import { BAY_DURATIONS, BAY_TIMES, BAYS, DINING_TIMES, DINING_VENUES, MEMBERSHIP_TIERS, WELLNESS_TIMES, WELLNESS_TREATMENTS } from '@/data/sample';
import { sendClubRequest } from '@/lib/club-request';
import { colors, fonts, radius, shadow } from '@/theme/tokens';
import { Fade } from '@/ui/fade';
import { PrimaryButton, TextLink } from '@/ui/buttons';
import { Card, LeatherCard } from '@/ui/card';
import { Badge, Chip, ChipRow } from '@/ui/chips';
import { Icon } from '@/ui/icons';
import { Screen } from '@/ui/screen';
import { SlotTile } from '@/ui/slot';
import { Body, Eyebrow, ScreenTitle } from '@/ui/text';
import { Toggle } from '@/ui/toggle';

type ClubView = 'membership' | 'dining' | 'bays' | 'wellness';
const VIEWS: { id: ClubView; label: string }[] = [
  { id: 'membership', label: 'Membership' },
  { id: 'dining', label: 'Dining' },
  { id: 'bays', label: 'Practice bays' },
  { id: 'wellness', label: 'Wellness' },
];
const isView = (value: unknown): value is ClubView => VIEWS.some((v) => v.id === value);

const BAYS_IMAGE = require('../../../assets/brand/practice-bays.jpg');

/**
 * Club (Brand Guidelines p.78–79): membership at ang "Reserve" para sa dining,
 * practice bays at wellness. Request sa club ang bawat reserve (walang booking
 * system pa) — kinukumpirma ng team sa telepono o email.
 */
export default function ClubScreen() {
  const member = useMember();
  const router = useRouter();
  const params = useLocalSearchParams<{ view?: string }>();
  const view: ClubView = isView(params.view) ? params.view : 'membership';

  const [venue, setVenue] = useState<string>(DINING_VENUES[0].id);
  const [party, setParty] = useState(2);
  const [changingParty, setChangingParty] = useState(false);
  const [diningTime, setDiningTime] = useState<string>(DINING_TIMES[2]);
  const [bay, setBay] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>(BAY_DURATIONS[1]);
  const [bayTime, setBayTime] = useState<string>(BAY_TIMES[2]);
  const [coach, setCoach] = useState(true);
  const [treatment, setTreatment] = useState<string>(WELLNESS_TREATMENTS[0].id);
  const [wellnessTime, setWellnessTime] = useState<string>(WELLNESS_TIMES[1]);
  const [tier, setTier] = useState<string>(MEMBERSHIP_TIERS[0].id);

  const [mobile, setMobile] = useState(member.mobile ?? '');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const venueName = DINING_VENUES.find((v) => v.id === venue)?.name ?? '';
  const treatmentName = WELLNESS_TREATMENTS.find((t) => t.id === treatment)?.name ?? '';
  const tierName = MEMBERSHIP_TIERS.find((t) => t.id === tier)?.name ?? '';
  const freeBays = BAYS.filter((b) => b.free).length;

  function pick(next: ClubView) {
    setSent(null);
    setFailed(false);
    router.setParams({ view: next });
  }

  async function request(label: string, interest: string, timeframe: string, guests: number) {
    if (!mobile.trim()) {
      setFailed(true);
      return;
    }
    setBusy(true);
    setFailed(false);
    const ok = await sendClubRequest({ member, mobile: mobile.trim(), interest, timeframe, guests });
    setBusy(false);
    if (ok) setSent(label);
    else setFailed(true);
  }

  let action: ReactNode = null;
  if (!sent) {
    if (view === 'membership')
      action = <PrimaryButton label="Enquire about membership" loading={busy} onPress={() => request(`${tierName} membership`, 'Membership', `${tierName} membership`, 1)} />;
    if (view === 'dining')
      action = <PrimaryButton label={`Reserve at ${diningTime}`} loading={busy} onPress={() => request(`${venueName} · ${diningTime}`, `Dining — ${venueName}`, `Tonight ${diningTime} · party of ${party}`, party)} />;
    if (view === 'bays')
      action = (
        <PrimaryButton
          label={bay ? `Book bay ${bay} · ${bayTime}` : 'Choose a bay'}
          disabled={!bay}
          loading={busy}
          onPress={() => request(`Bay ${bay} · ${bayTime}`, `Practice bay ${bay}${coach ? ' + coach' : ''}`, `Today ${bayTime} · ${duration}`, 1)}
        />
      );
    if (view === 'wellness')
      action = <PrimaryButton label={`Request · ${wellnessTime}`} loading={busy} onPress={() => request(`${treatmentName} · ${wellnessTime}`, `Wellness — ${treatmentName}`, `Today ${wellnessTime}`, 1)} />;
  }

  return (
    <Screen action={action}>
      <ChipRow>
        {VIEWS.map((item) => (
          <Chip key={item.id} label={item.label} selected={view === item.id} onPress={() => pick(item.id)} />
        ))}
      </ChipRow>

      {sent ? (
        <Card style={styles.sent}>
          <View style={styles.sentIcon}>
            <Icon name="check" size={30} color={colors.gold} stroke={2.2} />
          </View>
          <Eyebrow>Request sent</Eyebrow>
          <ScreenTitle style={styles.sentTitle}>{sent}</ScreenTitle>
          <Body muted style={styles.center}>
            The club will confirm by phone or email.
          </Body>
          <TextLink label="Make another request" onPress={() => setSent(null)} />
        </Card>
      ) : view === 'membership' ? (
        <>
          <View>
            <Eyebrow>Join the club</Eyebrow>
            <ScreenTitle>Membership</ScreenTitle>
          </View>
          {MEMBERSHIP_TIERS.map((item) => {
            const body = (
              <>
                <View style={styles.tierHead}>
                  <Eyebrow tone={item.leather ? 'ivory' : 'gold'}>{item.eyebrow}</Eyebrow>
                  {item.badge ? <Badge label={item.badge} /> : null}
                </View>
                <Text style={[styles.tierName, item.leather && styles.onLeather]}>{item.name}</Text>
                {item.benefits.map((benefit) => (
                  <Text key={benefit} style={[styles.benefit, item.leather && styles.onLeatherSoft]}>
                    — {benefit}
                  </Text>
                ))}
              </>
            );
            const selected = tier === item.id;
            return (
              <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ selected }} onPress={() => setTier(item.id)}>
                {item.leather ? (
                  <LeatherCard style={[styles.tier, selected && styles.tierOn]}>{body}</LeatherCard>
                ) : (
                  <Card style={[styles.tier, selected && styles.tierOn]}>{body}</Card>
                )}
              </Pressable>
            );
          })}
        </>
      ) : (
        <>
          <View>
            <Eyebrow>Dining · Bays · Wellness</Eyebrow>
            <ScreenTitle>Reserve</ScreenTitle>
          </View>

          {view === 'dining' ? (
            <>
              {DINING_VENUES.map((item) => (
                <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ selected: venue === item.id }} onPress={() => setVenue(item.id)}>
                  <ImageCard image={item.image} eyebrow={item.eyebrow} title={item.name} detail={item.detail} selected={venue === item.id} />
                </Pressable>
              ))}
              <View style={styles.rowHead}>
                <Eyebrow>{`Tonight · Party of ${party}`}</Eyebrow>
                <TextLink label={changingParty ? 'Done' : 'Change'} onPress={() => setChangingParty((v) => !v)} />
              </View>
              {changingParty ? (
                <ChipRow>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <Chip key={n} label={String(n)} selected={party === n} onPress={() => setParty(n)} />
                  ))}
                </ChipRow>
              ) : null}
              <ChipRow>
                {DINING_TIMES.map((t) => (
                  <Chip key={t} label={t} selected={diningTime === t} onPress={() => setDiningTime(t)} />
                ))}
              </ChipRow>
            </>
          ) : null}

          {view === 'bays' ? (
            <>
              <ImageCard image={BAYS_IMAGE} eyebrow="Covered · Floodlit" title="Practice bays" detail="Ball tracking · lake views" short />
              <View style={styles.rowHead}>
                <Eyebrow>Choose a bay · Today</Eyebrow>
                <Text style={styles.free}>{freeBays} free</Text>
              </View>
              <View style={styles.bays}>
                {BAYS.map((item) => (
                  <View key={item.id} style={styles.bayCell}>
                    <SlotTile serif sublabel="BAY" label={item.id} state={!item.free ? 'full' : bay === item.id ? 'selected' : 'open'} onPress={() => setBay(item.id)} />
                  </View>
                ))}
              </View>
              <ChipRow>
                {BAY_DURATIONS.map((d) => (
                  <Chip key={d} label={d} selected={duration === d} onPress={() => setDuration(d)} />
                ))}
              </ChipRow>
              <ChipRow>
                {BAY_TIMES.map((t) => (
                  <Chip key={t} label={t} selected={bayTime === t} onPress={() => setBayTime(t)} />
                ))}
              </ChipRow>
              <Card style={styles.coach}>
                <Icon name="person" size={24} color={colors.goldText} />
                <View style={styles.flex}>
                  <Text style={styles.coachTitle}>Add a coach</Text>
                  <Body muted style={styles.small}>
                    30-min swing review with the club pro
                  </Body>
                </View>
                <Toggle value={coach} onChange={setCoach} label="Add a coach" />
              </Card>
            </>
          ) : null}

          {view === 'wellness' ? (
            <>
              {WELLNESS_TREATMENTS.map((item) => {
                const on = treatment === item.id;
                return (
                  <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ selected: on }} onPress={() => setTreatment(item.id)}>
                    <Card style={[styles.treatment, on && styles.treatmentOn]}>
                      <Icon name="wellness" size={24} color={on ? colors.gold : colors.goldText} />
                      <View style={styles.flex}>
                        <Text style={[styles.treatmentName, on && styles.onLeather]}>{item.name}</Text>
                        <Text style={[styles.treatmentDetail, on && styles.onLeatherSoft]}>{item.detail}</Text>
                      </View>
                    </Card>
                  </Pressable>
                );
              })}
              <Eyebrow>Today</Eyebrow>
              <ChipRow>
                {WELLNESS_TIMES.map((t) => (
                  <Chip key={t} label={t} selected={wellnessTime === t} onPress={() => setWellnessTime(t)} />
                ))}
              </ChipRow>
            </>
          ) : null}
        </>
      )}

      {!sent && !member.mobile ? (
        <Card>
          <Eyebrow>Mobile number</Eyebrow>
          <TextInput value={mobile} onChangeText={setMobile} placeholder="+63 9XX XXX XXXX" placeholderTextColor={colors.faint} keyboardType="phone-pad" style={styles.input} accessibilityLabel="Mobile number" />
        </Card>
      ) : null}
      {failed ? <Text style={styles.error}>{mobile.trim() ? 'The request could not be sent. Please try again.' : 'Please add a mobile number so the club can confirm.'}</Text> : null}
    </Screen>
  );
}

function ImageCard({ image, eyebrow, title, detail, selected, short }: { image: number; eyebrow: string; title: string; detail: string; selected?: boolean; short?: boolean }) {
  return (
    <View style={[styles.imageCard, short && styles.imageCardShort, selected && styles.imageCardOn, shadow.card]}>
      <Image source={image} style={StyleSheet.absoluteFill} contentFit="cover" />
      <Fade colors={['rgba(3,50,27,0)', 'rgba(3,50,27,0.25)', 'rgba(3,50,27,0.85)']} />
      <View style={styles.imageText}>
        <Eyebrow tone="ivory">{eyebrow}</Eyebrow>
        <Text style={styles.imageTitle}>{title}</Text>
        <Text style={styles.imageDetail}>{detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { textAlign: 'center' },
  tier: { gap: 6 },
  tierOn: { borderWidth: 2, borderColor: colors.gold },
  tierHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tierName: { fontFamily: fonts.serifRegular, fontSize: 32, color: colors.emerald, marginBottom: 4 },
  benefit: { fontFamily: fonts.sans, fontSize: 13.5, lineHeight: 22, color: colors.onyx },
  onLeather: { color: colors.ivory },
  onLeatherSoft: { color: 'rgba(243,237,225,0.85)' },
  rowHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  free: { fontFamily: fonts.sansBold, fontSize: 12, color: colors.emerald },
  bays: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 },
  bayCell: { width: '16.66%', padding: 4 },
  coach: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  coachTitle: { fontFamily: fonts.sansSemiBold, fontSize: 15, color: colors.emerald },
  small: { fontSize: 12.5 },
  imageCard: { height: 180, borderRadius: radius.card + 2, overflow: 'hidden', justifyContent: 'flex-end' },
  imageCardShort: { height: 150 },
  imageCardOn: { borderWidth: 2.5, borderColor: colors.gold },
  imageText: { padding: 16, gap: 2 },
  imageTitle: { fontFamily: fonts.serifRegular, fontSize: 28, color: colors.ivory },
  imageDetail: { fontFamily: fonts.sansMedium, fontSize: 13, color: 'rgba(243,237,225,0.9)' },
  treatment: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  treatmentOn: { backgroundColor: colors.emerald },
  treatmentName: { fontFamily: fonts.serifRegular, fontSize: 22, color: colors.emerald },
  treatmentDetail: { fontFamily: fonts.sans, fontSize: 12.5, color: colors.muted },
  sent: { alignItems: 'center', gap: 10, paddingVertical: 30 },
  sentIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.emerald, alignItems: 'center', justifyContent: 'center' },
  sentTitle: { textAlign: 'center', fontSize: 28, lineHeight: 34 },
  input: { marginTop: 8, height: 48, borderRadius: radius.tile, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 14, fontFamily: fonts.sansMedium, fontSize: 15, color: colors.onyx },
  error: { fontFamily: fonts.sansMedium, fontSize: 13, color: '#A4502F' },
});
