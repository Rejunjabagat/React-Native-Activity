# BSCS Lab — Activity #5

A multi-screen React Native app built for **Hands-on Activity #5 (By Pair)** and
kept as the shell for the final requirement.

| | |
|---|---|
| **App name** | `BSCS Lab` |
| **Student** | Rejun Q. Jabagat — BSCS 4-A |
| **Framework** | React Native **0.88.1** (CLI, New Architecture / Fabric + Hermes) |
| **Language** | TypeScript |
| **Navigation** | `@react-navigation/native-stack` v7 |
| **Global state** | **React Context API** (`src/theme/ThemeContext.tsx`) |
| **Repository** | <https://github.com/Rejunjabagat/React-Native-Activity> |
| **Tested on** | Android 16 (API 36) emulator — 1080×2400 phone and 800×1280 tablet profile |

---

## 1. Requirement coverage

| Requirement | Where it lives |
|---|---|
| **Project setup** (RN CLI) | `android/` and `ios/` native projects from `@react-native-community/cli` |
| **Multi-screen navigation** | `src/navigation/RootNavigator.tsx` — `Home → Activity → Settings` native stack |
| **Home dashboard acts as a menu** | `src/screens/HomeScreen.tsx` — numbered index of every activity |
| **Reusable components** | `src/components/` — `ActivityCard`, `MetricsStrip`, `SectionHeading`, `AppHeader`, `TextButton`, `PrimaryButton`, `SegmentedControl`, `ThemeSwitch`, `ScreenContainer` |
| **Hooks for local interaction** | checklist + on-screen timer with cleanup (`ActivityScreen`), transient notice with cleanup (`SettingsScreen`), animated switch (`ThemeSwitch`), `useMemo` / `useCallback` in the provider |
| **Responsive Flexbox** | `src/hooks/useResponsive.ts` and `flex / flexDirection / flexWrap / justifyContent / alignItems` in every screen; `ScrollView` + `SafeAreaView` stop overflow |
| **Global state** | Context holds **theme** *and* **profile name / course**; writing either one repaints all screens |
| **Dark / Light toggle** | `SegmentedControl` on the Home dashboard, plus segmented control and switch on Settings |
| **Profile name** | Editable on Settings, shown in the dashboard greeting and live preview |

---

## 2. Design notes

The interface is styled as a **printed lab report** rather than a generic app
dashboard. The choices are deliberate and repeat across every screen:

- **Paper and ink palette.** Warm off-white paper, near-black ink, one deep
  green accent and one brick accent for "in progress". No gradients, no shadows.
- **Type does the hierarchy.** Headings are set in the platform serif face;
  metadata, counts and labels are monospaced and tracked out. Body copy stays in
  the default sans face. Nothing relies on colour alone to show structure.
- **Hairline rules instead of cards.** Sections are divided by 1 px rules and
  numbered `01, 02, 03`, so the screen reads like a document outline.
- **Square geometry.** 4 px corner radius on inputs, cards and buttons; the
  switch is rectangular. No pill-shaped chips, no floating action buttons.
- **No icon font or emoji.** Every action is a labelled monospaced button, which
  also keeps the interface screen-reader friendly.
- **Editorial spacing.** One measure of text, a 4 / 8 / 12 / 20 / 28 vertical
  rhythm, and left-aligned copy at every width.

---

## 3. Architecture

```
App.tsx                         SafeAreaProvider → ThemeProvider → RootNavigator
src/
├─ theme/
│  ├─ colors.ts                 paper + ink palettes (single token file)
│  └─ ThemeContext.tsx          GLOBAL STATE: mode, colors, profile, actions
├─ navigation/
│  ├─ types.ts                  RootStackParamList (typed routes)
│  └─ RootNavigator.tsx         native stack + navigation theme sync
├─ hooks/
│  └─ useResponsive.ts          window size → columns / gutter / padding / card width
├─ data/
│  └─ activities.ts             typed catalogue that feeds the dashboard index
├─ components/                  reusable, presentational primitives
└─ screens/
   ├─ HomeScreen.tsx            masthead, appearance control, focus card, index grid
   ├─ ActivityScreen.tsx        activity detail, checklist, progress, timer
   └─ SettingsScreen.tsx        identity, appearance, preview, about
```

### Global state flow

```
ThemeProvider (Context)
   ├── mode: 'light' | 'dark'      → palette, status bar, navigation theme
   ├── profile: { name, course }   → Home greeting, Settings preview, footer
   ├── toggleTheme() / setMode()
   ├── updateProfile(patch)
   └── resetPreferences()
        │
        ├── HomeScreen      reads colours + profile
        ├── ActivityScreen  reads colours
        └── SettingsScreen  reads and writes both values
```

Because the provider sits above the navigator, typing a name or flipping the
theme updates the dashboard immediately — no prop drilling, no remount.

### Responsive strategy

`useResponsive()` derives everything from `useWindowDimensions()`:

| Window width | Columns | Horizontal padding | Gutter |
|---|---|---|---|
| `< 320 dp` (folded phone, split screen) | 1 | 14 | 14 |
| `320–359 dp` (compact) | 2 | 14 | 14 |
| `360–699 dp` (phone) | 2 | 20 | 14 |
| `≥ 700 dp` (tablet, landscape) | 3 | 32 | 20 |

Card width is `floor(available / columns)`, computed from the live window, so
the grid cannot overflow. Rotation re-flows it without a reload.

---

## 4. Run it

```powershell
cd D:\Projects\MyApp
npm install
npx react-native start --max-workers 2      # terminal 1
npx react-native run-android                # terminal 2
```

On this machine the emulator is already configured, so:

```powershell
powershell -ExecutionPolicy Bypass -File .\run-app.ps1
```

### Self-contained APK (for a phone without a dev server)

```powershell
cd android
.\gradlew.bat assembleRelease
# android\app\build\outputs\apk\release\app-release.apk
```

Copy that file to the phone, allow install from the file manager, and open
**BSCS Lab**. No Metro server and no USB debugging required.

Quality gates used:

```powershell
npx tsc --noEmit      # 0 errors
npx eslint src App.tsx  # 0 errors
```

---

## 5. Demo script

One continuous take, 60–90 seconds, recorded on the phone:

1. Open **BSCS Lab** — the dashboard starts on the paper (light) theme with the
   greeting **Rejun Q. Jabagat / BSCS 4-A**.
2. Tap **Dark** in the *Appearance* selector → the whole app switches instantly.
3. Open **Settings** → change *Display name* → the **Preview** block updates as
   you type.
4. Press back → the dashboard greeting already shows the new name. This proves
   the value lives in Context, above the screens.
5. Change the theme again from Settings; it is still applied when you return.
6. Rotate the phone to landscape → the index re-flows from **2 to 3 columns**,
   and the layout still fits without clipping.
7. Open an entry → tick checklist lines → the counter, percentage and progress
   rule update; the on-screen timer keeps running.
8. Tap **Reset preferences** → the original name and theme come back.

Submit the repository link with the recording:

<https://github.com/Rejunjabagat/React-Native-Activity>
