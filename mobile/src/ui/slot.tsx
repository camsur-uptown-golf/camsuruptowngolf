import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, radius } from '@/theme/tokens';

export type SlotState = 'open' | 'selected' | 'full';

/**
 * Tee time o bay — tatlong anyo (p.80): selected (emerald), open (puti),
 * full (dashed, may guhit sa gitna, hindi napipindot).
 */
export function SlotTile({
  label,
  state,
  onPress,
  sublabel,
  serif,
}: {
  label: string;
  state: SlotState;
  onPress?: () => void;
  sublabel?: string;
  serif?: boolean;
}) {
  const full = state === 'full';
  const selected = state === 'selected';
  const color = selected ? colors.white : full ? colors.full : colors.emerald;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${sublabel ? `${sublabel} ` : ''}${label}${full ? ', full' : ''}`}
      accessibilityState={{ selected, disabled: full }}
      disabled={full}
      onPress={onPress}
      style={[styles.tile, selected ? styles.selected : full ? styles.full : styles.open]}
    >
      {sublabel ? <Text style={[styles.sub, { color: selected ? colors.gold : full ? colors.full : colors.muted }]}>{sublabel}</Text> : null}
      <Text
        style={[
          serif ? styles.serifLabel : styles.label,
          { color },
          full && styles.struck,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: { flex: 1, minHeight: 48, borderRadius: radius.tile, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  open: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
  selected: { backgroundColor: colors.emerald },
  full: { backgroundColor: 'transparent', borderWidth: 1.2, borderStyle: 'dashed', borderColor: colors.full },
  label: { fontFamily: fonts.sansBold, fontSize: 15 },
  serifLabel: { fontFamily: fonts.serifRegular, fontSize: 22, lineHeight: 24 },
  sub: { fontFamily: fonts.sansBold, fontSize: 9, letterSpacing: 1.6, marginBottom: 2 },
  struck: { textDecorationLine: 'line-through' },
});
