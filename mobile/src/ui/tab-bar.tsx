import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts } from '@/theme/tokens';
import { Icon, type IconName } from '@/ui/icons';

const ICONS: Record<string, IconName> = { index: 'home', book: 'flag', schedule: 'calendar', club: 'shield', profile: 'person' };
const LABELS: Record<string, string> = { index: 'Home', book: 'Book', schedule: 'Schedule', club: 'Club', profile: 'Profile' };

/** Limang tab lang (p.75): icon, label, at gintong tuldok sa ilalim ng aktibo. */
export function TabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, index) => {
        const active = state.index === index;
        const color = active ? colors.emerald : '#8C9188';
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={LABELS[route.name]}
            onPress={() => {
              if (!active) navigateToTab(route.key);
            }}
            style={styles.item}
          >
            <Icon name={ICONS[route.name] ?? 'home'} color={color} size={24} stroke={active ? 1.9 : 1.5} />
            <Text style={[styles.label, { color, fontFamily: active ? fonts.sansBold : fonts.sansMedium }]}>{LABELS[route.name]}</Text>
            <View style={[styles.dot, active && styles.dotOn]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: '#F7F3EA', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#D9D1C0', paddingTop: 10 },
  item: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 11 },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },
  dotOn: { backgroundColor: colors.gold },
});
