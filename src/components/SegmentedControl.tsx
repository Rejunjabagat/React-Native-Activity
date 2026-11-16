import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

export type SegmentOption = {
  value: string;
  label: string;
};

type Props = {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
};

/** Pill-style single-choice control (used for Light / Dark). */
export function SegmentedControl({ options, value, onChange }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.track,
        { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
      ]}
    >
      {options.map(option => {
        const active = option.value === value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={option.label}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              active && {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? colors.text : colors.textMuted },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
});
