import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Entry } from '../data/activities';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  entry: Entry;
  index: number;
  width: number;
  onPress?: () => void;
};

/**
 * Dashboard menu card. Width is supplied by the grid, so it cannot overflow.
 * Entries that have not been built yet are rendered flat and not pressable.
 */
export function ActivityCard({ entry, index, width, onPress }: Props) {
  const { colors } = useAppTheme();

  const isOpen = entry.status === 'open';
  const statusLabel = isOpen ? 'Available' : 'Planned';
  const statusColor = isOpen ? colors.accent : colors.textMuted;

  const body = (
    <>
      <View style={styles.topRow}>
        <Text style={[styles.code, { color: colors.textMuted }]}>
          {String(index + 1).padStart(2, '0')}
        </Text>
        <Text style={[styles.status, { color: statusColor }]}>
          {statusLabel}
        </Text>
      </View>

      <Text
        style={[styles.title, { color: colors.text }]}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {entry.title}
      </Text>

      <Text
        style={[styles.subtitle, { color: colors.textMuted }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {entry.subtitle}
      </Text>
    </>
  );

  if (!onPress) {
    return (
      <View
        style={[
          styles.card,
          {
            width,
            backgroundColor: 'transparent',
            borderColor: colors.border,
          },
        ]}
      >
        {body}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${entry.title}, ${statusLabel}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          width,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderLeftWidth: 3,
          borderLeftColor: colors.primary,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 14,
    minHeight: 138,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1,
  },
  status: {
    flexShrink: 1,
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    textAlign: 'right',
    marginLeft: 6,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
  },
});
