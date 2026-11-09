import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius } from '@/theme/tokens';

/** "Selected" (emerald) o "Filter chip" (ivory na may balangkas) — p.80. */
export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: Boolean(selected) }}
      onPress={onPress}
      style={[styles.chip, selected ? styles.selected : styles.filter]}
    >
      <Text style={[styles.label, { color: selected ? colors.white : colors.emerald }]}>{label}</Text>
    </Pressable>
  );
}

/** Isang hanay ng chips na naii-scroll pahalang. */
export function ChipRow({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {children}
    </ScrollView>
  );
}

/** Gintong badge — "FEW LEFT", "VIEW". */
export function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeLabel}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { height: 38, paddingHorizontal: 16, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  selected: { backgroundColor: colors.emerald },
  filter: { backgroundColor: colors.ivory, borderWidth: 1.2, borderColor: '#CFC5B1' },
  label: { fontFamily: fonts.sansSemiBold, fontSize: 13 },
  row: { gap: 8, paddingRight: 8 },
  badge: { backgroundColor: colors.gold, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' },
  badgeLabel: { fontFamily: fonts.sansBold, fontSize: 11, letterSpacing: 2, color: colors.emerald },
});
