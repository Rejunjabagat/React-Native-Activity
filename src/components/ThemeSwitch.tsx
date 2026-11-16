import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  value: boolean;
  onChange: (next: boolean) => void;
  label?: string;
};

/** Animated on/off switch used for the global dark mode flag. */
export function ThemeSwitch({ value, onChange, label = 'Dark mode' }: Props) {
  const { colors } = useAppTheme();
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [progress, value]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 27],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      hitSlop={8}
      style={[
        styles.track,
        {
          backgroundColor: value ? colors.primary : colors.surfaceAlt,
          borderColor: value ? colors.primary : colors.border,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.knob,
          {
            backgroundColor: value ? colors.primaryText : colors.textMuted,
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 56,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
