import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
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
        <AppHeader title="Not found" onBack={navigation.goBack} />
        <Text style={{ color: colors.textMuted }}>
          This activity does not exist yet.
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppHeader
        title="Activity detail"
        subtitle={activity.title}
        onBack={navigation.goBack}
      />

      <View
        style={[
          styles.hero,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderLeftColor: activity.accent,
          },
        ]}
      >
        <View style={styles.heroTop}>
          <View
            style={[styles.iconWrap, { backgroundColor: `${activity.accent}22` }]}
          >
            <Text style={styles.icon}>{activity.icon}</Text>
          </View>
          <View
            style={[styles.chip, { backgroundColor: `${activity.accent}22` }]}
          >
            <Text style={[styles.chipText, { color: activity.accent }]}>
              {activity.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          {activity.title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {activity.subtitle}
        </Text>
        <Text style={[styles.description, { color: colors.textMuted }]}>
          {activity.description}
        </Text>
      </View>

      <SectionTitle
        title="Checklist"
        hint={`${doneCount} of ${requirements.length} reviewed · ${formattedTime} on screen`}
      />

      <View
        style={[
          styles.checklist,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        {requirements.map((item, index) => {
          const isChecked = !!checked[item];

          return (
            <Pressable
              key={item}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isChecked }}
              accessibilityLabel={item}
              onPress={() =>
                setChecked(current => ({ ...current, [item]: !current[item] }))
              }
              style={({ pressed }) => [
                styles.checkRow,
                index !== requirements.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: isChecked ? colors.primary : colors.border,
                    backgroundColor: isChecked
                      ? colors.primary
                      : 'transparent',
                  },
                ]}
              >
                {isChecked ? (
                  <Text
                    style={[
                      styles.checkMark,
                      { color: colors.primaryText },
                    ]}
                  >
                    ✓
                  </Text>
                ) : null}
              </View>
              <Text
                style={[
                  styles.checkLabel,
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

        <View style={[styles.progressTrack, { backgroundColor: colors.surfaceAlt }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: colors.success,
              },
            ]}
          />
        </View>
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
  hero: {
    borderRadius: 20,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 18,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 3,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  checklist: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 14,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 16,
  },
  checkLabel: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 999,
  },
  actions: {
    marginTop: 22,
  },
});
