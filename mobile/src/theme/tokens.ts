import { Platform } from 'react-native';

/**
 * Ang design tokens ng member app — Brand Guidelines 2026, "App UI kit"
 * (p.80): ivory na screen, emerald para sa aksyon, Pili Gold para sa status.
 */
export const colors = {
  emerald: '#03321B',
  gold: '#E2C77A',
  goldText: '#B4913F',
  ivory: '#F3EDE1',
  moss: '#2E5126',
  onyx: '#151513',
  white: '#FFFFFF',
  muted: '#5D685F',
  faint: '#9A9F94',
  line: '#E4DCCB',
  full: '#C9BFA9',
} as const;

export const fonts = {
  serif: 'CormorantGaramond_500Medium',
  serifRegular: 'CormorantGaramond_400Regular',
  serifItalic: 'CormorantGaramond_400Regular_Italic',
  serifBold: 'CormorantGaramond_600SemiBold',
  sans: 'Montserrat_400Regular',
  sansMedium: 'Montserrat_500Medium',
  sansSemiBold: 'Montserrat_600SemiBold',
  sansBold: 'Montserrat_700Bold',
} as const;

export const radius = { card: 18, tile: 14, button: 16, pill: 999 } as const;

/** Banayad na emerald na anino (p.80 "gentle emerald shadows"). */
export const shadow = {
  card: Platform.select({
    web: { boxShadow: '0 10px 24px -14px rgba(3, 50, 27, 0.35)' },
    default: {
      shadowColor: '#03321B',
      shadowOpacity: 0.12,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
  }),
} as const;

export const space = { screen: 22, gap: 14 } as const;
