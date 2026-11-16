import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { MetricsStrip } from '../components/MetricsStrip';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionHeading } from '../components/SectionHeading';
import { getActivityById } from '../data/activities';
import type { RootStackParamList } from '../navigation/types';
import { useAppTheme } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Activity'>;

export function ActivityScreen({ navigation, route }: Props) {
  const { colors } = useAppTheme();
  const activity = getActivityById(route.params.id);

  // Local, screen-specific state: the reviewer's checklist.
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [seconds, setSeconds] = useState(0);

  // useEffect with cleanup — a small "time on screen" counter.
  useEffect(() => {
    const timer = setInterval(() => setSeconds(value => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const requirements = activity?.requirements ?? [];
  const doneCount = requirements.filter(item => checked[item]).length;
  const progress = requirements.length ? doneCount / requirements.length : 0;

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${minutes}:${rest.toString().padStart(2, '0')}`;
  }, [seconds]);

  if (!activity) {
    return (
      <ScreenContainer>
        <AppHeader kicker="Activity" title="Not found" onBack={navigation.goBack} />
        <Text style={[styles.body, { color: colors.textMuted }]}>
          This entry does not exist yet.
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppHeader
        kicker={`Activity ${activity.code}`}
        title={activity.title}
        subtitle={activity.subtitle}
        onBack={navigation.goBack}
      />

      <Text style={[styles.description, { color: colors.text }]}>
        {activity.description}
      </Text>

      <View style={styles.metrics}>
        <MetricsStrip
          items={[
            {
              label: 'status',
              value:
                activity.status === 'current'
                  ? 'Active'
                  : activity.status === 'done'
                    ? 'Done'
                    : 'Next',
              accent:
                activity.status === 'done'
                  ? colors.success
                  : activity.status === 'current'
                    ? colors.accent
                    : undefined,
            },
            {
              label: 'reviewed',
              value: `${doneCount}/${requirements.length}`,
            },
            { label: 'time', value: formattedTime },
          ]}
        />
      </View>

      <SectionHeading
        index="01"
        title="Checklist"
        hint="Tap a line to mark it reviewed"
      />

      <View style={styles.progressRow}>
        <View style={[styles.track, { backgroundColor: colors.surfaceAlt }]}>
          <View
            style={[
              styles.fill,
              {
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: colors.success,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textMuted }]}>
          {Math.round(progress * 100)}%
        </Text>
      </View>

      <View>
        {requirements.map((item, index) => {
          const isChecked = !!checked[item];

          return (
            <Pressable
              key={item}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isChecked }}
              accessibilityLabel={item}
              onPress={() =>
                setChecked(previous => ({
                  ...previous,
                  [item]: !previous[item],
                }))
              }
              style={({ pressed }) => [
                styles.row,
                {
                  borderBottomColor: colors.border,
                  opacity: pressed ? 0.6 : 1,
                },
              ]}
            >
              <Text style={[styles.rowIndex, { color: colors.textMuted }]}>
                {String(index + 1).padStart(2, '0')}
              </Text>

              <View
                style={[
                  styles.box,
                  {
                    borderColor: isChecked ? colors.primary : colors.border,
                    backgroundColor: isChecked
                      ? colors.primary
                      : 'transparent',
                  },
                ]}
              >
                {isChecked ? (
                  <View
                    style={[
                      styles.boxMark,
                      { backgroundColor: colors.primaryText },
                    ]}
                  />
                ) : null}
              </View>

              <Text
                style={[
                  styles.rowLabel,
                  {
                    color: isChecked ? colors.textMuted : colors.text,
                    textDecorationLine: isChecked ? 'line-through' : 'none',
                  },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="Back to dashboard"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 18,
  },
  metrics: {
    marginTop: 22,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  track: {
    flex: 1,
    height: 3,
  },
  fill: {
    height: 3,
  },
  progressText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.8,
    fontVariant: ['tabular-nums'],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  rowIndex: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.8,
    fontVariant: ['tabular-nums'],
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxMark: {
    width: 8,
    height: 8,
  },
  rowLabel: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    marginTop: 26,
  },
});
