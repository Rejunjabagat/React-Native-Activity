import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

export type Metric = {
  label: string;
  value: string;
  accent?: string;
};

type Props = {
  items: Metric[];
};

/**
 * Ledger-style figure row: numbers set in serif, labels in monospace,
 * separated by hairlines instead of being boxed into three equal cards.
 */
export function MetricsStrip({ items }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.row,
        {
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        },
      ]}
    >
      {items.map((item, index) => (
        <View
          key={item.label}
          style={[
            styles.cell,
            index > 0 && styles.cellDivider,
            index > 0 && { borderLeftColor: colors.border },
          ]}
        >
          <Text
            style={[styles.value, { color: item.accent ?? colors.text }]}
            numberOfLines={1}
          >
            {item.value}
          </Text>
          <Text
            style={[styles.label, { color: colors.textMuted }]}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  cell: {
    flex: 1,
    minWidth: 0,
  },
  cellDivider: {
    borderLeftWidth: 1,
    paddingLeft: 14,
  },
  value: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
    fontVariant: ['tabular-nums'],
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
  },
});
