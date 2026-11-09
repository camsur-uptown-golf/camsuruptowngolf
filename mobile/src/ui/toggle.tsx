import { Pressable, StyleSheet, View } from 'react-native';

import { colors } from '@/theme/tokens';

/** Emerald na track, gintong knob (p.79–80). */
export function Toggle({ value, onChange, label }: { value: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      hitSlop={8}
      style={[styles.track, { backgroundColor: value ? colors.emerald : '#D9D1C0' }]}
    >
      <View style={[styles.knob, value ? styles.on : styles.off]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { width: 52, height: 30, borderRadius: 15, padding: 3, justifyContent: 'center' },
  knob: { width: 24, height: 24, borderRadius: 12 },
  on: { backgroundColor: colors.gold, alignSelf: 'flex-end' },
  off: { backgroundColor: colors.white, alignSelf: 'flex-start' },
});
