import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Variant = 'outline' | 'solid' | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: 'sm' | 'md';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Small rectangular button with a monospaced, tracked-out label.
 * Used for navigation and secondary actions in headers and footers.
 */
export function TextButton({
  label,
  onPress,
  variant = 'outline',
  size = 'md',
  disabled = false,
  style,
}: Props) {
  const { colors } = useAppTheme();

  const isSolid = variant === 'solid';
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [
        styles.base,
        size === 'md' ? styles.md : styles.sm,
        {
          backgroundColor: isSolid ? colors.primary : 'transparent',
          borderColor: isSolid
            ? colors.primary
            : isGhost
              ? 'transparent'
              : colors.border,
          opacity: disabled ? 0.45 : pressed ? 0.55 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          size === 'md' ? styles.labelMd : styles.labelSm,
          {
            color: isSolid
              ? colors.primaryText
              : isGhost
                ? colors.textMuted
                : colors.text,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  label: {
    fontFamily: 'monospace',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  labelMd: {
    fontSize: 11,
    letterSpacing: 1.1,
  },
  labelSm: {
    fontSize: 10,
    letterSpacing: 1,
  },
});
