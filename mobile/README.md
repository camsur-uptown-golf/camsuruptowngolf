# CamSur Uptown Golf — mobile app

Expo (SDK 58) + Expo Router. Ang backend ay ang Next.js site sa labas ng folder na ito — pareho ang `/api/*`.

## Patakbuhin

1. Sa root ng repo, patakbuhin ang website: `npm run dev` (port 3000).
2. Dito sa `mobile/`:

```bash
npm install
npx expo start
```

- **Phone:** i-install ang **Expo Go**, i-scan ang QR code. Dapat nasa iisang Wi‑Fi ang phone at ang Mac.
- **iOS Simulator:** pindutin ang `i` (kailangan ng Xcode).
- **Android Emulator:** pindutin ang `a` (kailangan ng Android Studio).
- **Web preview:** pindutin ang `w`.

Sa dev, kusang tinatawag ng app ang `http://<IP ng Mac>:3000`. Para sa staging o production, itakda ang `EXPO_PUBLIC_API_URL` (tingnan ang `src/lib/api.ts`).

## Mga screen

| Tab | File | Laman |
|---|---|---|
| Home | `src/app/index.tsx` | Hero, tee time at stays shortcuts, contact |
| Book | `src/app/book.tsx` | Totoong availability mula sa `GET /api/tee-times`; ang bayad ay sa website pa |
| Stays | `src/app/stays.tsx` | Villa Del Rey; availability sa website |
| Members | `src/app/account.tsx` | Login sa website (wala pang token auth ang API) |

## Bago i-commit

```bash
npx tsc --noEmit
npx eslint .
```
