import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from './IconButton';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

/** Screen header with an optional back button and a right-hand action slot. */
export function AppHeader({ title, subtitle, onBack, right }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      {onBack ? (
        <IconButton icon="←" label="Go back" onPress={onBack} />
      ) : null}

      <View style={[styles.textBlock, onBack && styles.textBlockWithBack]}>
        <Text
          style={[styles.title, { color: colors.text }]}
          numberOfLines={1}
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

      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 10,
  },
  textBlock: {
    flex: 1,
  },
  textBlockWithBack: {
    paddingLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    marginLeft: 12,
  },
});
