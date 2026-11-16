import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  index: string;
  title: string;
  hint?: string;
  action?: React.ReactNode;
};

/**
 * Numbered section break: a hairline rule, then "01 Section name".
 * Gives the screens the outline of a written report rather than a card stack.
 */
export function SectionHeading({ index, title, hint, action }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.wrap, { borderTopColor: colors.border }]}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={[styles.index, { color: colors.textMuted }]}>
            {index}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </View>
        {action}
      </View>
      {hint ? (
        <Text style={[styles.hint, { color: colors.textMuted }]}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 28,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingRight: 12,
  },
  index: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    marginRight: 10,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  hint: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 6,
  },
});
