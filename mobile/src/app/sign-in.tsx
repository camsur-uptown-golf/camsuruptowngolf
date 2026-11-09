import { openBrowserAsync } from 'expo-web-browser';
import { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/auth/auth-provider';
import { SITE_URL } from '@/lib/api';
import { googleSignInAvailable } from '@/lib/session';
import { colors, fonts, radius } from '@/theme/tokens';
import { PrimaryButton, TextLink } from '@/ui/buttons';
import { Eyebrow } from '@/ui/text';
import { Wordmark } from '@/ui/wordmark';

const LEATHER = require('../../assets/brand/leather.jpg');

const ERRORS = {
  credentials: 'That email and password do not match.',
  locked: 'Too many attempts. Please wait a few minutes and try again.',
  network: 'The club could not be reached. Please try again.',
  cancelled: 'Google sign-in was cancelled.',
  unavailable: 'Google sign-in is not available yet.',
  link: 'This email already has an account. Sign in with your password instead.',
  failed: 'Google sign-in did not work. Please try again.',
} as const;

/**
 * Ang unang screen (Brand Guidelines p.80): emerald na leather, ang master
 * logo, ang tagline at isang gintong "Member sign in". Members-only ang app;
 * ang mga bisita ay itinuturo sa website.
 */
export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const { signIn, signInWithGoogle } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [error, setError] = useState<keyof typeof ERRORS | null>(null);

  async function submit() {
    if (!email.trim() || !password) {
      setError('credentials');
      return;
    }
    setBusy(true);
    setError(null);
    const result = await signIn(email.trim(), password);
    setBusy(false);
    if (!result.ok) setError(result.error);
  }

  async function google() {
    setGoogleBusy(true);
    setError(null);
    const result = await signInWithGoogle();
    setGoogleBusy(false);
    /* Sariling pagsara ng browser ay hindi error na kailangang ipakita. */
    if (!result.ok && result.error !== 'cancelled') setError(result.error);
  }

  return (
    <ImageBackground source={LEATHER} resizeMode="cover" style={styles.root}>
      <View style={styles.shade} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.inner, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.brand}>
          <Wordmark size={open ? 92 : 180} />
        </View>

        {open ? (
          <View style={styles.sheet}>
            <Eyebrow>Members</Eyebrow>
            <Text style={styles.sheetTitle}>Sign in</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={colors.faint}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              style={styles.input}
              accessibilityLabel="Email"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.faint}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              onSubmitEditing={submit}
              style={styles.input}
              accessibilityLabel="Password"
            />
            {error ? (
              <Text style={styles.error} accessibilityLiveRegion="polite">
                {ERRORS[error]}
              </Text>
            ) : null}
            <PrimaryButton label="Sign in" onPress={submit} loading={busy} />
            {/* Wala ang Google kapag kulang ang native module (hal. Expo Go) — tingnan ang session.ts. */}
            {googleSignInAvailable ? (
              <>
                <View style={styles.or}>
                  <View style={styles.orLine} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.orLine} />
                </View>
                <Pressable accessibilityRole="button" onPress={googleBusy ? undefined : google} style={styles.google}>
                  {googleBusy ? <ActivityIndicator color={colors.emerald} /> : <Text style={styles.googleText}>Continue with Google</Text>}
                </Pressable>
              </>
            ) : null}
          </View>
        ) : (
          <View style={styles.bottom}>
            <Text style={styles.tagline}>Where the fairway meets the mountain.</Text>
            <PrimaryButton label="Member sign in" tone="gold" onPress={() => setOpen(true)} />
          </View>
        )}

        <View style={styles.footer}>
          <TextLink label="Not a member? Visit the website" tone="ivory" onPress={() => openBrowserAsync(SITE_URL)} />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.emerald },
  shade: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(3, 50, 27, 0.25)' },
  inner: { flex: 1, paddingHorizontal: 28, justifyContent: 'space-between' },
  brand: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottom: { gap: 22 },
  tagline: { fontFamily: fonts.serifItalic, fontSize: 19, color: 'rgba(243, 237, 225, 0.85)', textAlign: 'center' },
  sheet: { backgroundColor: colors.ivory, borderRadius: radius.card + 4, padding: 22, gap: 12 },
  sheetTitle: { fontFamily: fonts.serifRegular, fontSize: 30, color: colors.emerald, marginBottom: 4 },
  input: {
    height: 52,
    borderRadius: radius.tile,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    fontFamily: fonts.sansMedium,
    fontSize: 15,
    color: colors.onyx,
  },
  error: { fontFamily: fonts.sansMedium, fontSize: 13, color: '#A4502F' },
  or: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 2 },
  orLine: { flex: 1, height: 1, backgroundColor: colors.line },
  orText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.muted },
  google: {
    height: 52,
    borderRadius: radius.button,
    borderWidth: 1.5,
    borderColor: colors.emerald,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: { fontFamily: fonts.sansSemiBold, fontSize: 14, color: colors.emerald },
  footer: { alignItems: 'center', paddingTop: 16 },
});
