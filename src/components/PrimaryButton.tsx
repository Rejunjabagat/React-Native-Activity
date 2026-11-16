import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

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
          backgroundColor: isPrimary ? colors.primary : colors.surfaceAlt,
          borderColor: isPrimary ? colors.primary : colors.border,
          opacity: disabled ? 0.45 : pressed ? 0.82 : 1,
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
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
