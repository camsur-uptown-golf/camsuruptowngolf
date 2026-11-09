import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme/tokens';

const HEAD = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/** `(2026, 10, 14)` → `"2026-11-14"`. */
export function isoDay(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Buwan ng club calendar (p.77): may tuldok ang mga araw na may event
 * (emerald o gold), at emerald na parisukat ang napiling araw.
 */
export function MonthGrid({
  year,
  month,
  selected,
  marks,
  onSelect,
}: {
  year: number;
  month: number;
  selected: string;
  marks: Record<string, 'emerald' | 'gold'>;
  onSelect: (day: string) => void;
}) {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const total = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array.from({ length: first }, () => null), ...Array.from({ length: total }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);

  return (
    <View>
      <View style={styles.row}>
        {HEAD.map((label, i) => (
          <Text key={`${label}-${i}`} style={styles.head}>
            {label}
          </Text>
        ))}
      </View>
      {Array.from({ length: cells.length / 7 }, (_, week) => (
        <View key={week} style={styles.row}>
          {cells.slice(week * 7, week * 7 + 7).map((day, i) => {
            if (!day) return <View key={`e-${week}-${i}`} style={styles.cell} />;
            const iso = isoDay(year, month, day);
            const on = iso === selected;
            const mark = marks[iso];
            return (
              <Pressable
                key={iso}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                accessibilityLabel={`${day}${mark ? ', has events' : ''}`}
                onPress={() => onSelect(iso)}
                style={styles.cell}
              >
                <View style={[styles.day, on && styles.dayOn]}>
                  <Text style={[styles.num, on && styles.numOn]}>{day}</Text>
                  <View style={[styles.dot, mark && { backgroundColor: on ? colors.gold : mark === 'gold' ? colors.gold : colors.emerald }]} />
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  head: { flex: 1, textAlign: 'center', fontFamily: fonts.sansSemiBold, fontSize: 11, color: colors.muted, paddingBottom: 10 },
  cell: { flex: 1, alignItems: 'center', paddingVertical: 3 },
  day: { width: 42, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 3 },
  dayOn: { backgroundColor: colors.emerald },
  num: { fontFamily: fonts.sansBold, fontSize: 15, color: colors.emerald },
  numOn: { color: colors.white },
  dot: { width: 5, height: 5, borderRadius: 3 },
});
