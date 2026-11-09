import { requireOptionalNativeModule } from 'expo';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useClubFeed } from '@/lib/app-api';
import { clubImage } from '@/lib/club-images';
import { colors, fonts, radius, shadow } from '@/theme/tokens';
import { Fade } from '@/ui/fade';
import { Card } from '@/ui/card';
import { Icon } from '@/ui/icons';
import { Body, Eyebrow, ScreenTitle } from '@/ui/text';

/** Members' offer (Brand Guidelines p.78): isang hero offer, code at "Redeem". */
export default function OfferScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const feed = useClubFeed();
  const offer = feed?.offers.find((item) => String(item.id) === id);
  const others = feed?.offers.filter((item) => item !== offer) ?? [];
  const [copied, setCopied] = useState(false);

  if (!offer) {
    return (
      <View style={[styles.root, styles.missing, { paddingTop: insets.top + 40 }]}>
        <ScreenTitle>{feed ? 'Offer has ended' : 'Loading…'}</ScreenTitle>
        {feed ? <Body muted>This members’ offer is no longer available.</Body> : null}
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.redeem}>
          <Text style={styles.redeemText}>BACK</Text>
        </Pressable>
      </View>
    );
  }

  /* Kinokopya ang code kung may clipboard module ang app; kung wala (hal. ang
     lumang development build), ibinabahagi ito sa Share sheet. */
  async function redeem(code: string, title: string) {
    if (requireOptionalNativeModule('ExpoClipboard')) {
      const Clipboard = await import('expo-clipboard');
      await Clipboard.setStringAsync(code);
      setCopied(true);
      return;
    }
    await Share.share({ message: `${title} — code ${code}` }).catch(() => undefined);
  }

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={clubImage(offer.image)} style={StyleSheet.absoluteFill} contentFit="cover" />
          <Fade colors={['rgba(3,50,27,0)', 'rgba(3,50,27,0.35)', 'rgba(3,50,27,0.92)']} locations={[0.25, 0.55, 1]} />
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={[styles.back, { top: insets.top + 10 }]}>
            <View style={styles.backIcon}>
              <Icon name="chevron" size={20} color={colors.emerald} />
            </View>
          </Pressable>
          <View style={styles.heroText}>
            <Eyebrow tone="ivory">{offer.eyebrow || 'Members’ offer'}</Eyebrow>
            <Text style={styles.title}>{offer.title}</Text>
            <Text style={styles.text}>{offer.text}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.codeRow}>
            <View style={styles.code}>
              <Text style={styles.codeText}>{offer.code}</Text>
            </View>
            <Pressable accessibilityRole="button" onPress={() => redeem(offer.code, offer.title)} style={styles.redeem}>
              <Text style={styles.redeemText}>REDEEM</Text>
            </Pressable>
          </View>
          {copied ? <Body muted>Code copied — show it at the clubhouse.</Body> : null}

          {others.length > 0 ? <Eyebrow style={styles.more}>More for members</Eyebrow> : null}
          {others.map((item) => (
            <Pressable key={item.id} accessibilityRole="button" onPress={() => router.setParams({ id: String(item.id) })}>
              <Card style={styles.item}>
                <Image source={clubImage(item.image)} style={styles.thumb} contentFit="cover" />
                <View style={styles.itemText}>
                  <Eyebrow style={styles.itemKind}>{item.eyebrow || 'Members’ offer'}</Eyebrow>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Body muted style={styles.itemDetail} numberOfLines={2}>
                    {item.text}
                  </Body>
                </View>
                <Icon name="tag" size={22} color={colors.goldText} />
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.ivory },
  missing: { paddingHorizontal: 22, gap: 16 },
  hero: { height: 500, justifyContent: 'flex-end' },
  back: { position: 'absolute', left: 18 },
  backIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(243,237,225,0.92)', alignItems: 'center', justifyContent: 'center', transform: [{ scaleX: -1 }] },
  heroText: { padding: 22, gap: 8 },
  title: { fontFamily: fonts.serifRegular, fontSize: 44, lineHeight: 46, color: colors.ivory },
  text: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: 'rgba(243,237,225,0.9)' },
  body: { padding: 22, gap: 14 },
  codeRow: { flexDirection: 'row', gap: 12 },
  code: { flex: 1, height: 54, borderRadius: radius.button, borderWidth: 1.4, borderStyle: 'dashed', borderColor: colors.goldText, alignItems: 'center', justifyContent: 'center' },
  codeText: { fontFamily: fonts.sansBold, fontSize: 16, letterSpacing: 3.5, color: colors.emerald },
  redeem: { flex: 1, height: 54, borderRadius: radius.button, backgroundColor: colors.emerald, alignItems: 'center', justifyContent: 'center', ...shadow.card },
  redeemText: { fontFamily: fonts.sansBold, fontSize: 13, letterSpacing: 2.6, color: colors.white },
  more: { marginTop: 8 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12 },
  thumb: { width: 72, height: 72, borderRadius: 12 },
  itemText: { flex: 1, gap: 2 },
  itemKind: { fontSize: 10 },
  itemTitle: { fontFamily: fonts.serifRegular, fontSize: 21, color: colors.emerald },
  itemDetail: { fontSize: 12.5 },
});
