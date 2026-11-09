import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
} from '@expo-google-fonts/cormorant-garamond';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import type { Href } from 'expo-router';

import { AuthProvider, useAuth } from '@/auth/auth-provider';
import { onNotificationOpened } from '@/lib/notifications';
import { colors } from '@/theme/tokens';

SplashScreen.preventAutoHideAsync();

/**
 * Ugat ng member app (Brand Guidelines 2026, "The Member App", p.74–80).
 *
 * Members-only: walang token → /sign-in; naka-sign-in → ang limang tab.
 * Cormorant Garamond para sa titles at numero, Montserrat para sa UI (p.80).
 * Nananatili ang splash hanggang maikarga ang fonts at ang session.
 */
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  if (!fontsLoaded && fontError === null) return null;

  return (
    <AuthProvider>
      <ThemeProvider value={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: colors.emerald, background: colors.ivory, card: colors.ivory } }}>
        <StatusBar style="dark" />
        <Gate />
      </ThemeProvider>
    </AuthProvider>
  );
}

function Gate() {
  const { status } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const onSignIn = segments[0] === 'sign-in';

  useEffect(() => {
    if (status === 'loading') return;
    SplashScreen.hideAsync();
    if (status === 'signedOut' && !onSignIn) router.replace('/sign-in');
    if (status === 'signedIn' && onSignIn) router.replace('/');
  }, [status, onSignIn, router]);

  /* Pinindot na abiso (paalala, "booking confirmed", bagong event) → ang screen nito. */
  useEffect(() => {
    if (status !== 'signedIn') return;
    return onNotificationOpened((url) => router.push(url as Href));
  }, [status, router]);

  if (status === 'loading') return null;
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.ivory } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="sign-in" options={{ animation: 'fade' }} />
      <Stack.Screen name="booking/[code]" options={{ presentation: 'card' }} />
      <Stack.Screen name="offer/[id]" />
      <Stack.Screen name="bookings" />
    </Stack>
  );
}
