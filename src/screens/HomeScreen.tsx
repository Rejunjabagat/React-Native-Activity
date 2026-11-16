import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActivityCard } from '../components/ActivityCard';
import { MetricsStrip } from '../components/MetricsStrip';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionHeading } from '../components/SectionHeading';
import { SegmentedControl } from '../components/SegmentedControl';
import { TextButton } from '../components/TextButton';
import { ACTIVITIES } from '../data/activities';
import { useResponsive } from '../hooks/useResponsive';
import type { RootStackParamList } from '../navigation/types';
import { useAppTheme, type ThemeMode } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const pad = (value: number) => String(value).padStart(2, '0');

export function HomeScreen({ navigation }: Props) {
  const { colors, profile, mode, setMode } = useAppTheme();
  const {
    columns,
    gutter,
    horizontalPadding,
    cardWidth,
    width,
    isTablet,
  } = useResponsive();

  const done = ACTIVITIES.filter(item => item.status === 'done').length;
  const pending = ACTIVITIES.length - done;
  const current = ACTIVITIES.find(item => item.status === 'current') ?? ACTIVITIES[0];

  return (
    <ScreenContainer contentStyle={{ paddingHorizontal: horizontalPadding }}>
      <View style={styles.masthead}>
        <Text style={[styles.mastheadMeta, { color: colors.textMuted }]}>
          BSCS Lab · 2026
        </Text>
        <TextButton
          label="Settings"
          size="sm"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <View style={[styles.rule, { backgroundColor: colors.border }]} />

      <View style={styles.intro}>
        <Text style={[styles.kicker, { color: colors.textMuted }]}>
          Dashboard
        </Text>
        <Text
          style={[styles.name, { color: colors.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.68}
          accessibilityRole="header"
        >
          {profile.name || 'Student'}
        </Text>
        <Text style={[styles.program, { color: colors.textMuted }]}>
          {profile.course || 'BSCS'} · Activity 05
        </Text>
      </View>

      <View style={styles.appearanceRow}>
        <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
          Appearance
        </Text>
        <View style={styles.appearanceControl}>
          <SegmentedControl
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
            value={mode}
            onChange={next => setMode(next as ThemeMode)}
          />
        </View>
      </View>

      <SectionHeading index="01" title="Current focus" />
      <View
        style={[
          styles.focus,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderLeftColor: colors.primary,
          },
        ]}
      >
        <Text style={[styles.focusMeta, { color: colors.textMuted }]}>
          {current.code} · {current.subtitle}
        </Text>
        <Text style={[styles.focusTitle, { color: colors.text }]}>
          {current.title}
        </Text>
        <Text style={[styles.focusBody, { color: colors.textMuted }]}>
          {current.description}
        </Text>
        <View style={styles.focusAction}>
          <PrimaryButton
            label="Open activity"
            onPress={() =>
              navigation.navigate('Activity', { id: current.id })
            }
          />
        </View>
      </View>

      <View style={styles.metrics}>
        <MetricsStrip
          items={[
            { label: 'entries', value: pad(ACTIVITIES.length) },
            { label: 'done', value: pad(done), accent: colors.success },
            { label: 'pending', value: pad(pending), accent: colors.accent },
          ]}
        />
      </View>

      <SectionHeading
        index="02"
        title="Index"
        hint={`${columns} column${columns > 1 ? 's' : ''} · ${Math.round(
          width,
        )} dp${isTablet ? ' · tablet' : ''}`}
      />

      <View style={[styles.grid, { gap: gutter }]}>
        {ACTIVITIES.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            width={cardWidth}
            onPress={() =>
              navigation.navigate('Activity', { id: activity.id })
            }
          />
        ))}
      </View>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          Tap an entry to open its screen.
        </Text>
        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          {profile.name} · {profile.course}
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  masthead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  mastheadMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  rule: {
    height: 1,
    marginTop: 10,
  },
  intro: {
    paddingTop: 26,
  },
  kicker: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'serif',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 40,
  },
  program: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 22,
  },
  fieldLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  appearanceControl: {
    flex: 1,
  },
  focus: {
    borderRadius: 4,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 18,
  },
  focusMeta: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  focusTitle: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 10,
    lineHeight: 27,
  },
  focusBody: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  focusAction: {
    marginTop: 18,
  },
  metrics: {
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    borderTopWidth: 1,
    marginTop: 32,
    paddingTop: 12,
    gap: 4,
  },
  footerText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
