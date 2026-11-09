import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { setUpPush, tearDownPush } from '@/lib/notifications';
import { fetchMe, signIn as apiSignIn, signInWithGoogle as apiSignInWithGoogle, signOut as apiSignOut, type AppMember, type SignInResult } from '@/lib/session';

type AuthState = {
  status: 'loading' | 'signedOut' | 'signedIn';
  member: AppMember | null;
  signIn: (email: string, password: string) => Promise<SignInResult>;
  signInWithGoogle: () => Promise<SignInResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

/** Hawak ang naka-sign-in na member; sinusuri ang naitabing token sa pagbukas. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<AppMember | null>(null);
  const [status, setStatus] = useState<AuthState['status']>('loading');

  useEffect(() => {
    let alive = true;
    fetchMe().then((me) => {
      if (!alive) return;
      setMember(me);
      setStatus(me ? 'signedIn' : 'signedOut');
      if (me) setUpPush();
    });
    return () => {
      alive = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await apiSignIn(email, password);
    if (result.ok) {
      setMember(result.member);
      setStatus('signedIn');
      setUpPush();
    }
    return result;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const result = await apiSignInWithGoogle();
    if (result.ok) {
      setMember(result.member);
      setStatus('signedIn');
      setUpPush();
    }
    return result;
  }, []);

  const signOut = useCallback(async () => {
    /* Habang may token pa: alisin ang push token ng phone sa server. */
    await tearDownPush().catch(() => undefined);
    await apiSignOut();
    setMember(null);
    setStatus('signedOut');
  }, []);

  const value = useMemo(() => ({ status, member, signIn, signInWithGoogle, signOut }), [status, member, signIn, signInWithGoogle, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside <AuthProvider>');
  return value;
}

const SIGNED_OUT: AppMember = { firstName: '', lastName: '', email: '', mobile: null, plan: null, since: '', memberNumber: '' };

/**
 * Ang member na naka-sign-in — para sa mga screen sa loob ng (tabs). Sa
 * maikling sandali sa pag-sign-out (bago ang redirect) ay walang member,
 * kaya isang walang-lamang member ang ibinabalik sa halip na mag-crash.
 */
export function useMember(): AppMember {
  return useAuth().member ?? SIGNED_OUT;
}
