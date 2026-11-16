import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  icon: string;
  label: string;
  onPress: () => void;
  size?: number;
  variant?: 'surface' | 'accent';
};

/** Small circular action button used in headers. */
export function IconButton({
  icon,
  label,
  onPress,
  size = 44,
  variant = 'surface',
}: Props) {
  const { colors } = useAppTheme();

  const background =
    variant === 'accent' ? colors.primary : colors.surface;
  const border = variant === 'accent' ? colors.primary : colors.border;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 3,
          backgroundColor: background,
          borderColor: border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.inner}>
        <Text style={[styles.icon, { fontSize: size * 0.42 }]}>{icon}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});
