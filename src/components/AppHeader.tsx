import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TextButton } from './TextButton';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

/** Screen masthead: optional back button, serif title, monospace subtitle. */
export function AppHeader({ kicker, title, subtitle, onBack, right }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        {onBack ? <TextButton label="Back" size="sm" onPress={onBack} /> : <View />}
        {right}
      </View>

      {kicker ? (
        <Text style={[styles.kicker, { color: colors.textMuted }]}>
          {kicker}
        </Text>
      ) : null}

      <Text
        style={[styles.title, { color: colors.text }]}
        numberOfLines={2}
        accessibilityRole="header"
      >
        {title}
      </Text>

      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 30,
    marginBottom: 20,
  },
  kicker: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.4,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
});
