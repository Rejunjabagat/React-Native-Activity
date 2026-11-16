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
  done: 'DONE',
  current: 'IN PROGRESS',
  upcoming: 'UPCOMING',
};

/** Reusable dashboard card — one instance per activity, width supplied by the grid. */
export function AppCard({ activity, width, onPress }: Props) {
  const { colors } = useAppTheme();

  const statusColor =
    activity.status === 'done'
      ? colors.success
      : activity.status === 'current'
        ? colors.primary
        : colors.textMuted;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${activity.title}, ${STATUS_LABEL[activity.status]}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          width,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.top}>
        <View
          style={[styles.iconWrap, { backgroundColor: `${activity.accent}22` }]}
        >
          <Text style={styles.icon}>{activity.icon}</Text>
        </View>
        <View style={[styles.dot, { backgroundColor: statusColor }]} />
      </View>

      <Text
        style={[styles.title, { color: colors.text }]}
        numberOfLines={2}
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

      <Text style={[styles.status, { color: statusColor }]}>
        {STATUS_LABEL[activity.status]}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    minHeight: 148,
    justifyContent: 'space-between',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  subtitle: {
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
  },
  status: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 10,
  },
});
