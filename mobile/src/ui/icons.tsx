import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '@/theme/tokens';

/** Manipis na line icons, gaya ng sa tab bar at quick actions ng PDF (p.75). */
export type IconName =
  | 'home'
  | 'flag'
  | 'calendar'
  | 'shield'
  | 'person'
  | 'bell'
  | 'dining'
  | 'bay'
  | 'wellness'
  | 'star'
  | 'sun'
  | 'tag'
  | 'check'
  | 'plus'
  | 'minus'
  | 'chevron';

export function Icon({ name, size = 22, color = colors.emerald, stroke = 1.6 }: { name: IconName; size?: number; color?: string; stroke?: number }) {
  const p = { stroke: color, strokeWidth: stroke, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'home' && <Path {...p} d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-7.5Z" />}
      {name === 'flag' && <Path {...p} d="M6 21V4m0 0h10l-3 3.5L16 11H6" />}
      {name === 'calendar' && (
        <>
          <Rect {...p} x="4" y="5.5" width="16" height="14" rx="2" />
          <Path {...p} d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
        </>
      )}
      {name === 'shield' && <Path {...p} d="M12 3c2.6 1.6 5 2.3 7 2.3v6.2c0 4.2-3 7.4-7 9.5-4-2.1-7-5.3-7-9.5V5.3c2 0 4.4-.7 7-2.3Z" />}
      {name === 'person' && (
        <>
          <Circle {...p} cx="12" cy="8.5" r="3.5" />
          <Path {...p} d="M5 20c1-3.6 3.8-5.5 7-5.5s6 1.9 7 5.5" />
        </>
      )}
      {name === 'bell' && <Path {...p} d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14l1.5-1.5ZM10 20a2 2 0 0 0 4 0" />}
      {name === 'dining' && <Path {...p} d="M7 3v7.5M5 3v4.5a2 2 0 0 0 4 0V3M7 10.5V21M16.5 21V3c-2 1.4-3 3.8-3 6.5v3.5h3" />}
      {name === 'bay' && (
        <>
          <Circle {...p} cx="12" cy="13.5" r="2.2" />
          <Path {...p} d="M12 3v8.3M5 20h14" />
        </>
      )}
      {name === 'wellness' && <Path {...p} d="M12 20c-4 0-7-2.5-7-6.5 2.8 0 5 1.2 7 3.5 2-2.3 4.2-3.5 7-3.5 0 4-3 6.5-7 6.5Zm0-3c-1.6-2.3-1.9-5.6 0-9 1.9 3.4 1.6 6.7 0 9Z" />}
      {name === 'star' && <Path {...p} d="m12 4 2.4 5 5.4.7-4 3.7 1 5.4L12 16.2 7.2 18.8l1-5.4-4-3.7 5.4-.7L12 4Z" />}
      {name === 'sun' && (
        <>
          <Circle {...p} cx="12" cy="12" r="4" />
          <Path {...p} d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </>
      )}
      {name === 'tag' && (
        <>
          <Path {...p} d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.3 7.3a1 1 0 0 1-1.4 0l-8.3-8.3Z" />
          <Circle {...p} cx="8" cy="8" r="1.4" />
        </>
      )}
      {name === 'check' && <Path {...p} d="m5 12.5 4.5 4.5L19 7.5" />}
      {name === 'plus' && <Path {...p} d="M12 5v14M5 12h14" />}
      {name === 'minus' && <Path {...p} d="M5 12h14" />}
      {name === 'chevron' && <Path {...p} d="m9 5 7 7-7 7" />}
    </Svg>
  );
}
