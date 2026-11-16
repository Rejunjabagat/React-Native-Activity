import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  label: string;
  value: string;
  accent?: string;
};

export function StatCard({ label, value, accent }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.value, { color: accent ?? colors.text }]}>
        {value}
      </Text>
      <Text
        style={[styles.label, { color: colors.textMuted }]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
});
