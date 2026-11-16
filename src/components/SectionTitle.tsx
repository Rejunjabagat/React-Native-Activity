import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  hint?: string;
  action?: React.ReactNode;
};

export function SectionTitle({ title, hint, action }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {hint ? (
          <Text style={[styles.hint, { color: colors.textMuted }]}>{hint}</Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 12,
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  hint: {
    fontSize: 11,
    marginTop: 3,
  },
});
