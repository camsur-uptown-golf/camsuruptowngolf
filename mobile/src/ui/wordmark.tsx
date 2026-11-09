import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme/tokens';

/* Ang crest lang, kinuha sa pinakamalinaw na logo ng club (public/camsur-uptown-logo.png, 1536px). */
const CREST = require('../../assets/brand/crest.png');
const CREST_RATIO = 940 / 1250;

/**
 * Ang master logo ng club: crest sa itaas, pangalan sa ilalim.
 *
 * TEXT ang pangalan, hindi larawan — laging matalas sa kahit anong screen, at
 * ang Cormorant Garamond ay ang serif na ng app (Brand Guidelines p.80). Ang
 * dating `master-logo.png` (618px) ay lumalabo kapag pinalaki sa phone.
 *
 * `size`: lapad ng crest; sumusunod dito ang laki ng mga titik.
 */
export function Wordmark({ size = 190 }: { size?: number }) {
  const k = size / 190;
  /* May espasyo rin pagkatapos ng huling titik (letterSpacing), kaya lumilihis
     pakaliwa ang salita; ibinabalik ng `paddingLeft` na kasinlaki nito sa gitna. */
  const spaced = (fontSize: number, lineHeight: number, spacing: number) => ({
    fontSize: fontSize * k,
    lineHeight: lineHeight * k,
    letterSpacing: spacing * k,
    paddingLeft: spacing * k,
  });
  return (
    <View style={styles.root} accessible accessibilityRole="image" accessibilityLabel="CamSur Uptown Golf, Est. 2027">
      <Image source={CREST} style={{ width: size, height: size / CREST_RATIO }} contentFit="contain" />
      <View style={[styles.words, { marginTop: 22 * k }]}>
        <Text style={[styles.name, spaced(44, 46, 5)]}>CAMSUR</Text>
        <Text style={[styles.name, spaced(44, 46, 5)]}>UPTOWN</Text>
        <Text style={[styles.name, spaced(27, 32, 11), { marginTop: 4 * k }]}>GOLF</Text>
        <View style={[styles.est, { gap: 12 * k, marginTop: 10 * k }]}>
          <View style={[styles.rule, { width: 34 * k }]} />
          <Text style={[styles.estText, { fontSize: 19 * k, letterSpacing: 1.5 * k }]}>Est. 2027</Text>
          <View style={[styles.rule, { width: 34 * k }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center' },
  words: { alignItems: 'center' },
  name: { fontFamily: fonts.serifBold, color: colors.gold, textAlign: 'center' },
  est: { flexDirection: 'row', alignItems: 'center' },
  rule: { height: 1.2, backgroundColor: colors.gold, opacity: 0.85 },
  estText: { fontFamily: fonts.serifBold, color: colors.gold },
});
