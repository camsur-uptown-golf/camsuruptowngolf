import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, space } from '@/theme/tokens';

/**
 * Ivory na screen ng isang tab. `action`: ang iisang emerald na pindutan ng
 * flow, nakadikit sa ibaba sa itaas ng tab bar (p.76, p.79).
 */
export function Screen({ children, action, scroll = true, padTop = true }: { children: ReactNode; action?: ReactNode; scroll?: boolean; padTop?: boolean }) {
  const insets = useSafeAreaInsets();
  const top = padTop ? insets.top + 18 : 0;
  const body = scroll ? (
    <ScrollView
      style={styles.fill}
      contentContainerStyle={[styles.content, { paddingTop: top, paddingBottom: action ? 110 : 32 }]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.fill, styles.content, { paddingTop: top }]}>{children}</View>
  );
  return (
    <View style={styles.root}>
      {body}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.ivory },
  fill: { flex: 1 },
  content: { paddingHorizontal: space.screen, gap: space.gap },
  action: { position: 'absolute', left: space.screen, right: space.screen, bottom: 16 },
});
