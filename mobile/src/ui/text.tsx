import type { ReactNode } from 'react';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { colors, fonts } from '@/theme/tokens';

type Props = { children: ReactNode; style?: TextStyle | TextStyle[] } & Omit<TextProps, 'style'>;

/** Gintong caps na eyebrow, +240 tracking (p.80). */
export function Eyebrow({ children, style, tone = 'gold', ...rest }: Props & { tone?: 'gold' | 'ivory' | 'muted' }) {
  const color = tone === 'ivory' ? colors.gold : tone === 'muted' ? colors.muted : colors.goldText;
  return (
    <Text {...rest} style={[styles.eyebrow, { color }, style]}>
      {typeof children === 'string' ? children.toUpperCase() : children}
    </Text>
  );
}

/** Pamagat ng screen — Cormorant Garamond. */
export function ScreenTitle({ children, style, ...rest }: Props) {
  return (
    <Text {...rest} accessibilityRole="header" style={[styles.title, style]}>
      {children}
    </Text>
  );
}

/** Serif para sa pangalan at numero. */
export function Serif({ children, style, ...rest }: Props) {
  return (
    <Text {...rest} style={[styles.serif, style]}>
      {children}
    </Text>
  );
}

/** Montserrat na body text. */
export function Body({ children, style, muted, ...rest }: Props & { muted?: boolean }) {
  return (
    <Text {...rest} style={[styles.body, muted && { color: colors.muted }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  eyebrow: { fontFamily: fonts.sansBold, fontSize: 11, letterSpacing: 2.6 },
  title: { fontFamily: fonts.serifRegular, fontSize: 34, lineHeight: 40, color: colors.emerald, letterSpacing: -0.3 },
  serif: { fontFamily: fonts.serifRegular, fontSize: 22, color: colors.emerald },
  body: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.onyx },
});
