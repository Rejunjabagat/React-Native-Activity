import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  value: boolean;
  onChange: (next: boolean) => void;
  label?: string;
};

/**
 * Rectangular on/off switch. Intentionally not a pill — the hard edges match
 * the rest of the interface.
 */
export function ThemeSwitch({ value, onChange, label = 'Dark mode' }: Props) {
  const { colors } = useAppTheme();
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 140,
      useNativeDriver: true,
    }).start();
  }, [progress, value]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 23],
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
    width: 46,
    height: 26,
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 2,
  },
});
