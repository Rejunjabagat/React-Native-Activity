# Activity #5 — React Native Mobile App

Rejun Q. Jabagat · BSCS 4-A

A multi-screen React Native app whose Home screen works as a menu. The job was
to build the shell for the final requirement, so the dashboard lists what exists
(Activity #5) and leaves room for the laboratories that come later.

## Screens

| Screen | File | Purpose |
|---|---|---|
| Home | `src/screens/HomeScreen.tsx` | Dashboard menu: profile greeting + index of entries |
| Activity #5 | `src/screens/ActivityScreen.tsx` | The activity's requirements as a checklist |
| Settings | `src/screens/SettingsScreen.tsx` | Global theme and profile name |

## How each instruction is met

| Instruction | Implementation |
|---|---|
| Initialize a React Native project | React Native CLI project (`android/`, `ios/`), TypeScript |
| Multi-screen navigation | `@react-navigation/native-stack` — `src/navigation/RootNavigator.tsx` |
| Home dashboard acts as a menu | `src/screens/HomeScreen.tsx` — cards open the activity screen or Settings |
| Reusable components | `src/components/` — `ActivityCard`, `AppHeader`, `TextButton`, `PrimaryButton`, `SectionHeading`, `SegmentedControl`, `ScreenContainer` |
| Hooks for local interaction | `useState` for the checklist and `useEffect` for the timer, both in `ActivityScreen`; `useMemo` for the formatted time |
| Responsive Flexbox | `flex`, `flexDirection`, `flexWrap`, `justifyContent`, `alignItems` + `ScrollView` / `SafeAreaView`; grid maths in `src/hooks/useResponsive.ts` |
| Global state | React Context API in `src/theme/ThemeContext.tsx` — theme and profile name |
| Instant update on the dashboard | Dashboard greeting, footer and Settings preview all read the same context value |

## Global state

`App.tsx` wraps the navigator in `ThemeProvider`. The provider holds two
parameters:

- `mode` (`light` / `dark`) and the palette derived from it
- `profile` (`name`, `course`)

`useAppTheme()` exposes them plus `toggleTheme`, `setMode` and `updateProfile`.
Because the provider sits above `NavigationContainer`, changing either value on
Settings repaints Home, Activity and Settings at the same moment — no prop
drilling and no remount.

## Responsive layout

`useResponsive()` reads `useWindowDimensions()` and returns the column count,
gutter, horizontal padding and card width.

| Window width | Columns | Horizontal padding | Gutter |
|---|---|---|---|
| under 320 dp | 1 | 14 | 14 |
| 320–359 dp | 2 | 14 | 14 |
| 360–699 dp | 2 | 20 | 14 |
| 700 dp and up | 3 | 32 | 20 |

Card width is `floor(available / columns)`, so the grid cannot overflow. On a
720×1612 phone that means 2 columns at 360 dp; rotating it to landscape gives
3 columns at 806 dp.

## Run

```powershell
npm install
npx react-native start          # terminal 1
npx react-native run-android    # terminal 2
```

Standalone build for a phone (no dev server needed):

```powershell
cd android
.\gradlew.bat assembleRelease
```

## Demo recording

1. Open the app — Home shows the name and course, with the index below.
2. Open **Settings** and type a new display name — the preview updates as you type.
3. Go back — the dashboard greeting already shows the new name.
4. In Settings, switch the theme to **Dark** — the app changes instantly.
5. Go back — Home is still dark; open Activity #5 and it is dark too.
6. Rotate the phone — the index re-flows from 2 to 3 columns without clipping.
7. On Activity #5, tick a few requirements — the counter, percentage and progress rule move, and the timer keeps counting.

Repository: <https://github.com/Rejunjabagat/React-Native-Activity>
