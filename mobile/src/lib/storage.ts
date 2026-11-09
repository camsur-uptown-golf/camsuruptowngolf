import { requireOptionalNativeModule } from 'expo';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Maliit na key–value na imbakan: SecureStore sa iOS/Android (naka-encrypt),
 * `localStorage` sa web preview.
 *
 * MAAARING WALANG SECURESTORE ANG HOST APP. Sa Expo Go o sa lumang
 * development build (bago idinagdag ang expo-secure-store) ay walang native
 * module na `ExpoSecureStore`, at nagka-crash ang buong app sa pag-import pa
 * lang. Kaya sinusuri muna kung naroon ito; kung wala, memory ang gamit —
 * gumagana ang app, pero mawawala ang sign-in kapag isinara ito.
 */
type SecureStoreModule = typeof import('expo-secure-store');

const native = Platform.OS !== 'web';
const hasSecureStore = native && requireOptionalNativeModule('ExpoSecureStore') !== null;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const SecureStore: SecureStoreModule | null = hasSecureStore ? require('expo-secure-store') : null;
const memory = new Map<string, string>();

if (native) {
  /* Diagnostic: lumalabas sa Metro log — kung aling app ang nagpapatakbo
     (storeClient = Expo Go) at kung aling native module ang mayroon. */
  console.info(
    `[native] host=${Constants.executionEnvironment} secureStore=${hasSecureStore} clipboard=${requireOptionalNativeModule('ExpoClipboard') !== null} linearGradient=${requireOptionalNativeModule('ExpoLinearGradient') !== null}`,
  );
}

export async function readItem(key: string): Promise<string | null> {
  if (!native) return globalThis.localStorage?.getItem(key) ?? null;
  if (!SecureStore) return memory.get(key) ?? null;
  return SecureStore.getItemAsync(key);
}

export async function writeItem(key: string, value: string): Promise<void> {
  if (!native) {
    globalThis.localStorage?.setItem(key, value);
    return;
  }
  if (!SecureStore) {
    memory.set(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

export async function removeItem(key: string): Promise<void> {
  if (!native) {
    globalThis.localStorage?.removeItem(key);
    return;
  }
  if (!SecureStore) {
    memory.delete(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}
