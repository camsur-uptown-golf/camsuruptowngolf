import type { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, shadow } from '@/theme/tokens';

const LEATHER = require('../../assets/brand/leather.jpg');

/** Puting card na may malambot na kanto at banayad na emerald na anino. */
export function Card({ children, style, padded = true }: { children: ReactNode; style?: StyleProp<ViewStyle>; padded?: boolean }) {
  return <View style={[styles.card, padded && styles.padded, shadow.card, style]}>{children}</View>;
}

/**
 * Emerald na leather (p.75, p.78, p.80). `stitched`: ang gintong tahing
 * dashed sa loob ng gilid, gaya ng member card.
 */
export function LeatherCard({ children, style, stitched = false }: { children: ReactNode; style?: StyleProp<ViewStyle>; stitched?: boolean }) {
  return (
    <ImageBackground source={LEATHER} resizeMode="cover" style={[styles.leather, shadow.card, style]} imageStyle={styles.leatherImage}>
      <View style={styles.leatherShade} />
      {stitched ? <View pointerEvents="none" style={styles.stitch} /> : null}
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: radius.card },
  padded: { padding: 18 },
  leather: { borderRadius: radius.card, overflow: 'hidden', backgroundColor: colors.emerald, padding: 20 },
  leatherImage: { borderRadius: radius.card },
  leatherShade: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(3, 50, 27, 0.35)' },
  stitch: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: radius.card - 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(226, 199, 122, 0.55)',
  },
});
