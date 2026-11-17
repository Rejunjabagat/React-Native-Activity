import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionHeading } from '../components/SectionHeading';
import { getEntryById } from '../data/activities';
import type { RootStackParamList } from '../navigation/types';
import { useAppTheme } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Activity'>;

export function ActivityScreen({ navigation, route }: Props) {
  const { colors } = useAppTheme();
  const entry = getEntryById(route.params.id);

  // Local, screen-specific state: the reviewer's checklist.
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [seconds, setSeconds] = useState(0);

  // useEffect with cleanup — time spent on this screen.
  useEffect(() => {
    const timer = setInterval(() => setSeconds(value => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const requirements = entry?.requirements ?? [];
  const doneCount = requirements.filter(item => checked[item]).length;
  const progress = requirements.length ? doneCount / requirements.length : 0;

  const elapsed = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${minutes}:${rest.toString().padStart(2, '0')}`;
  }, [seconds]);

  if (!entry) {
    return (
      <ScreenContainer>
        <AppHeader title="Not found" onBack={navigation.goBack} />
        <Text style={[styles.description, { color: colors.textMuted }]}>
          This entry does not exist.
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppHeader
        kicker={entry.title}
        title={entry.subtitle}
        onBack={navigation.goBack}
      />

      <Text style={[styles.description, { color: colors.text }]}>
        {entry.description}
      </Text>

      <View style={[styles.counters, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
        <View style={styles.counter}>
          <Text style={[styles.counterValue, { color: colors.text }]}>
            {`${doneCount}/${requirements.length}`}
          </Text>
          <Text style={[styles.counterLabel, { color: colors.textMuted }]}>
            reviewed
          </Text>
        </View>
        <View
          style={[
            styles.counter,
            styles.counterDivider,
            { borderLeftColor: colors.border },
          ]}
        >
          <Text style={[styles.counterValue, { color: colors.text }]}>
            {elapsed}
          </Text>
          <Text style={[styles.counterLabel, { color: colors.textMuted }]}>
            on screen
          </Text>
        </View>
      </View>

      <SectionHeading
        index="01"
        title="Requirements"
        hint="Tap a line to mark it reviewed"
      />

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
      <Text style={[styles.percent, { color: colors.textMuted }]}>
        {`${Math.round(progress * 100)}% complete`}
      </Text>

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
  counters: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 22,
    paddingVertical: 14,
  },
  counter: {
    flex: 1,
    minWidth: 0,
  },
  counterDivider: {
    borderLeftWidth: 1,
    paddingLeft: 14,
  },
  counterValue: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    fontVariant: ['tabular-nums'],
  },
  counterLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  track: {
    height: 3,
    marginBottom: 8,
  },
  fill: {
    height: 3,
  },
  percent: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
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
  actions: {
    marginTop: 26,
  },
});
