import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Activity } from '../data/activities';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  activity: Activity;
  width: number;
  onPress: () => void;
};

const STATUS_LABEL: Record<Activity['status'], string> = {
  done: 'Done',
  current: 'In progress',
  upcoming: 'Upcoming',
};

/**
 * Catalogue card. Width comes from the grid so the card never overflows;
 * the current activity is marked with a tinted wash and a left ink bar.
 */
export function ActivityCard({ activity, width, onPress }: Props) {
  const { colors } = useAppTheme();

  const statusColor =
    activity.status === 'done'
      ? colors.success
      : activity.status === 'current'
        ? colors.accent
        : colors.textMuted;

  const isCurrent = activity.status === 'current';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${activity.title}, ${STATUS_LABEL[activity.status]}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          width,
          backgroundColor: isCurrent ? colors.tint : colors.surface,
          borderColor: isCurrent ? colors.primary : colors.border,
          borderLeftWidth: isCurrent ? 3 : 1,
          borderLeftColor: isCurrent ? colors.primary : colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.code, { color: colors.textMuted }]}>
          {activity.code}
        </Text>
        <Text
          style={[styles.status, { color: statusColor }]}
          numberOfLines={1}
        >
          {STATUS_LABEL[activity.status]}
        </Text>
      </View>

      <Text
        style={[styles.title, { color: colors.text }]}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {activity.title}
      </Text>

      <Text
        style={[styles.subtitle, { color: colors.textMuted }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {activity.subtitle}
      </Text>
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
