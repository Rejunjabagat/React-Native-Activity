import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { StatusBar } from 'react-native';

import { darkColors, lightColors, type ThemeColors } from './colors';

export type ThemeMode = 'light' | 'dark';

export type Profile = {
  name: string;
  course: string;
};

export type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  profile: Profile;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  resetPreferences: () => void;
};

/** Paper first: the light theme is the canonical look of the app. */
const DEFAULT_MODE: ThemeMode = 'light';

const DEFAULT_PROFILE: Profile = {
  name: 'Rejun Q. Jabagat',
  course: 'BSCS 4-A',
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Global parameter #1 — Dark / Light theme.
  const [mode, setMode] = useState<ThemeMode>(DEFAULT_MODE);

  // Global parameter #2 — the user profile shown on the dashboard.
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  const toggleTheme = useCallback(() => {
    setMode(current => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setProfile(current => ({ ...current, ...patch }));
  }, []);

  const resetPreferences = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    setMode(DEFAULT_MODE);
  }, []);

  const isDark = mode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark,
      colors,
      profile,
      toggleTheme,
      setMode,
      updateProfile,
      resetPreferences,
    }),
    [mode, isDark, colors, profile, toggleTheme, updateProfile, resetPreferences],
  );

  // Keep the system status bar readable whenever the theme flips.
  useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);
  }, [isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used inside a <ThemeProvider>');
  }

  return context;
}
