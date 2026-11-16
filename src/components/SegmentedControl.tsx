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

/** Two-up selector with square corners, used for the theme choice. */
export function SegmentedControl({ options, value, onChange }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.track, { borderColor: colors.border }]}>
      {options.map((option, index) => {
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
              index > 0 && styles.segmentDivider,
              index > 0 && { borderLeftColor: colors.border },
              active && { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? colors.primaryText : colors.textMuted },
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
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
  },
  segmentDivider: {
    borderLeftWidth: 1,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
