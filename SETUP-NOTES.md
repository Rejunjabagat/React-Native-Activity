# React Native setup — this machine

## What's installed

| Piece | Detail |
|---|---|
| Project | `D:\Projects\MyApp` — React Native **0.88.1**, React 19.3.0, New Architecture (Fabric) + Hermes |
| Node / npm | v24.16.0 / 11.13.0 |
| JDK | Temurin 17.0.19 (`C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot`) |
| Android SDK | `D:\Users\jabag\AppData\Local\Android\Sdk` (`ANDROID_HOME`) |
| Platforms | android-34, 35, 36, 36.1, 37.0 |
| Build-tools | 34.0.0, 35.0.0, 36.0.0, 37.0.0 |
| NDK | 27.1.12297006, 28.2.13676358 |
| Emulator | 37.2.13, hardware accelerated by **AEHD 2.2** driver |
| AVD | `rn_pixel` → `D:\caches\avd` (Android 16 / API 36, x86_64) |
| adb | platform-tools 37.0.0 |

## Why everything lives on D:

C: is a 117.7 GB partition that was down to 0.4 GB free. These were redirected:

```
npm cache        -> D:\caches\npm      (npm config set cache D:\caches\npm)
GRADLE_USER_HOME -> D:\caches\gradle   (setx GRADLE_USER_HOME ...)
ANDROID_AVD_HOME -> D:\caches\avd      (setx ANDROID_AVD_HOME ...)
Metro cache      -> D:\caches\metro    (cacheStores in metro.config.js)
project          -> D:\Projects\MyApp
```

## Daily commands — just use the launcher

```powershell
cd D:\Projects\MyApp
powershell -ExecutionPolicy Bypass -File .\run-app.ps1
```

It checks free RAM first, boots the emulator, waits for Android to settle,
starts Metro with 2 workers, then builds/installs/launches the app.

Manual equivalent:

```powershell
& "$env:ANDROID_HOME\emulator\emulator.exe" -avd rn_pixel -gpu angle_indirect -memory 2048 -cores 2
cd D:\Projects\MyApp
npx react-native start --max-workers 2      # terminal 1
npx react-native run-android --no-packager  # terminal 2
```

Reload the app after editing: press <kbd>r</kbd> in the Metro terminal, or save the file (Fast Refresh).

Useful:
```powershell
adb devices                 # list connected devices
adb reverse tcp:8081 tcp:8081   # make Metro reachable from the device
adb logcat -s ReactNativeJS  # app logs
npx react-native doctor      # health check
```

## Known cosmetic issue with `react-native doctor`

`doctor` reports **Android SDK: Versions found N/A**. This is a false alarm — the
new `cmdline-tools` (rev 23) changed output from `platforms;android-36` to
`platforms/android-36`, which doctor's parser doesn't understand yet. Gradle
builds and installs work fine (verified: `app-debug.apk` builds and runs).

## Environment notes

- **RAM is the limiting factor.** The laptop has 9.9 GB; the emulator alone uses
  ~2.9 GB. With Chrome (17 procs), ChatGPT, WPS, Edge WebView, Discord and
  Spotify open, free RAM dropped to **0.5 GB** — that is what caused the
  "System UI isn't responding" dialogs and one emulator crash, *not* the app.
  Close Chrome/ChatGPT/WPS before starting the emulator, or use a real phone
  over USB (needs almost no host RAM and runs much faster).
- `java` on PATH resolves to Oracle **Java 8** first; Gradle is unaffected because
  `JAVA_HOME` points to JDK 17. If you hit odd Java errors in other tools, put
  `C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot\bin` before the Oracle entry.
- GPU mode `angle_indirect` is used because `-gpu host` crashed the emulator
  window with `UpdateLayeredWindowIndirect failed` on the Vega iGPU.
- After a cold boot, give Android ~25 seconds before launching the app; System
  UI settles down after that.
- `local.properties` (android/) pins `sdk.dir` to the SDK on D:.

## Recording on a physical phone

The release build signs with the debug keystore, so it installs on any phone:

```powershell
cd D:\Projects\MyApp\android
.\gradlew.bat assembleRelease "-PreactNativeArchitectures=arm64-v8a,armeabi-v7a"
# copy to the phone and open it
Copy-Item app\build\outputs\apk\release\app-release.apk D:\Projects\MyApp\dist\
```

Only `arm64-v8a` and `armeabi-v7a` are built because every real phone is ARM;
skipping the two x86 emulator ABIs cuts the native compile time roughly in half.
Build all four (`assembleRelease` with no override) only if you also want to run
the release build on the emulator.

Release output is git-ignored (`/dist`, `android/app/build`). The debug build is
for the emulator + Metro only — it will not run on a phone without the dev server.

