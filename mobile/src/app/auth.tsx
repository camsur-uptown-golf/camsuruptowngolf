import { Redirect } from 'expo-router';

/**
 * Pagbalik mula sa "Continue with Google" (`camsurgolf://auth?code=…`). Ang
 * `signInWithGoogle` sa session.ts na ang humahawak sa code; kapag binuksan
 * pa rin ng router ang link na ito, bumalik lang sa simula.
 */
export default function AuthReturn() {
  return <Redirect href="/" />;
}
