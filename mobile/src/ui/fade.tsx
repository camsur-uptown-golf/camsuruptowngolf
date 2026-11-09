import { useId } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

/**
 * Patayong gradient (itaas → ibaba) gamit ang react-native-svg.
 *
 * Hindi `expo-linear-gradient`: wala ang native view nito sa development build
 * na naka-install sa mga phone (Oct 21), samantalang kasama na roon ang
 * react-native-svg. Pareho ang anyo.
 */
export function Fade({
  colors,
  locations,
  style = StyleSheet.absoluteFill,
}: {
  colors: readonly string[];
  locations?: readonly number[];
  style?: StyleProp<ViewStyle>;
}) {
  const id = `fade-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <View pointerEvents="none" style={style}>
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            {colors.map((color, i) => (
              <Stop key={`${color}-${i}`} offset={locations?.[i] ?? i / Math.max(1, colors.length - 1)} stopColor={toHex(color)} stopOpacity={toAlpha(color)} />
            ))}
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

/** `rgba(3,50,27,0.8)` → `#03321b`; ang hex ay ibinabalik nang buo. */
function toHex(color: string) {
  const m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/i.exec(color);
  if (!m) return color;
  return `#${[m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, '0')).join('')}`;
}

/** Ang alpha ng `rgba(...)`, o 1. */
function toAlpha(color: string) {
  const m = /^rgba\([^)]*,\s*([\d.]+)\)$/i.exec(color);
  return m ? Number(m[1]) : 1;
}
