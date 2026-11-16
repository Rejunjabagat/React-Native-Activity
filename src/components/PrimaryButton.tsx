import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

/** Full-width action button — square corners, monospaced label. */
export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
}: Props) {
  const { colors } = useAppTheme();

  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isPrimary ? colors.primary : 'transparent',
          borderColor: isPrimary ? colors.primary : colors.border,
          opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: isPrimary ? colors.primaryText : colors.text },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
