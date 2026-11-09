import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, radius } from '@/theme/tokens';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  tone?: 'emerald' | 'gold';
};

/** Ang iisang emerald na aksyon ng bawat flow (p.79–80). */
export function PrimaryButton({ label, onPress, disabled, loading, tone = 'emerald' }: ButtonProps) {
  const gold = tone === 'gold';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled || loading) }}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.primary,
        { backgroundColor: gold ? colors.gold : colors.emerald },
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={gold ? colors.emerald : colors.white} />
      ) : (
        <Text style={[styles.primaryLabel, { color: gold ? colors.emerald : colors.white }]}>{label.toUpperCase()}</Text>
      )}
    </Pressable>
  );
}

/** Emerald na balangkas — "ADD TO CALENDAR", "INVITE". */
export function OutlineButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.outline, pressed && styles.pressed]}>
      <Text style={styles.outlineLabel} numberOfLines={1} adjustsFontSizeToFit>
        {label.toUpperCase()}
      </Text>
    </Pressable>
  );
}

/** Maliit na text link. */
export function TextLink({ label, onPress, tone = 'emerald' }: { label: string; onPress?: () => void; tone?: 'emerald' | 'gold' | 'ivory' }) {
  const color = tone === 'gold' ? colors.goldText : tone === 'ivory' ? colors.ivory : colors.emerald;
  return (
    <Pressable accessibilityRole="link" onPress={onPress} hitSlop={10}>
      <Text style={[styles.link, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: { height: 56, borderRadius: radius.button, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  primaryLabel: { fontFamily: fonts.sansBold, fontSize: 13, letterSpacing: 2.6 },
  outline: {
    flex: 1,
    height: 52,
    borderRadius: radius.button,
    borderWidth: 1.5,
    borderColor: colors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  outlineLabel: { fontFamily: fonts.sansBold, fontSize: 11.5, letterSpacing: 1.6, color: colors.emerald },
  link: { fontFamily: fonts.sansSemiBold, fontSize: 13, textDecorationLine: 'underline' },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
});
