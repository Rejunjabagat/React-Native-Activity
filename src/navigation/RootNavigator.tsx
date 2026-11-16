import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';

import type { RootStackParamList } from './types';
import { ActivityScreen } from '../screens/ActivityScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useAppTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { colors, isDark } = useAppTheme();

  const navigationTheme = useMemo<Theme>(() => {
    const base = isDark ? DarkTheme : DefaultTheme;

    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.accent,
      },
    };
  }, [colors, isDark]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
