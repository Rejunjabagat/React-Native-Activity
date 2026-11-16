import React from 'react';

import { ScreenContainer } from '../components/ScreenContainer';
import { AppCard } from '../components/AppCard';
import { IconButton } from '../components/IconButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionTitle } from '../components/SectionTitle';
import { StatCard } from '../components/StatCard';
import { ACTIVITIES } from '../data/activities';
import { useResponsive } from '../hooks/useResponsive';
import { useAppTheme } from '../theme/ThemeContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { colors, profile, mode, isDark, toggleTheme } = useAppTheme();
  const {
    columns,
    gutter,
    horizontalPadding,
    cardWidth,
    width,
    isTablet,
  } = useResponsive();

  const completed = ACTIVITIES.filter(item => item.status === 'done').length;
  const pending = ACTIVITIES.length - completed;
  const current = ACTIVITIES.find(item => item.status === 'current');

  return (
    <ScreenContainer contentStyle={{ paddingHorizontal: horizontalPadding }}>
      <View style={styles.topBar}>
        <View style={styles.topBarText}>
          <Text style={[styles.eyebrow, { color: colors.textMuted }]}>
            GOOD EVENING
          </Text>
          <Text
            style={[styles.greeting, { color: colors.text }]}
            numberOfLines={1}
          >
            {profile.name || 'Student'}
          </Text>
          <Text style={[styles.course, { color: colors.textMuted }]}>
            {profile.course || 'React Native'}
          </Text>
        </View>

        <View style={styles.topBarActions}>
          <IconButton
            label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            icon={isDark ? '☀️' : '🌙'}
            onPress={toggleTheme}
          />
          <IconButton
            label="Open settings"
            icon="⚙️"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </View>

      <View
        style={[
          styles.hero,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.heroHeader}>
          <View
            style={[styles.badge, { backgroundColor: `${colors.primary}1F` }]}
          >
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              ACTIVITY #5
            </Text>
          </View>
          <Text style={[styles.heroMeta, { color: colors.textMuted }]}>
            {mode === 'dark' ? 'Dark' : 'Light'} mode
          </Text>
        </View>

        <Text style={[styles.heroTitle, { color: colors.text }]}>
          React Native Mobile App
        </Text>
        <Text style={[styles.heroBody, { color: colors.textMuted }]}>
          A multi-screen dashboard with reusable components, a responsive
          Flexbox grid and global theme state shared across the whole app.
        </Text>

        <View style={styles.heroActions}>
          <PrimaryButton
            label="Open activity"
            onPress={() =>
              navigation.navigate('Activity', {
                id: current ? current.id : 'activity-5',
              })
            }
          />
        </View>
      </View>

      <View style={[styles.statsRow, { gap: gutter }]}>
        <StatCard label="Activities" value={String(ACTIVITIES.length)} />
        <StatCard label="Completed" value={String(completed)} accent={colors.success} />
        <StatCard label="Pending" value={String(pending)} accent={colors.accent} />
      </View>

      <SectionTitle
        title="Your activities"
        hint={`${columns} columns · ${Math.round(width)} dp wide${
          isTablet ? ' · tablet' : ''
        }`}
      />

      <View style={[styles.grid, { gap: gutter }]}>
        {ACTIVITIES.map(activity => (
          <AppCard
            key={activity.id}
            activity={activity}
            width={cardWidth}
            onPress={() =>
              navigation.navigate('Activity', { id: activity.id })
            }
          />
        ))}
      </View>

      <Text style={[styles.footer, { color: colors.textMuted }]}>
        Theme and profile are global — change them in Settings and this screen
        updates instantly.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  topBarText: {
    flex: 1,
    paddingRight: 12,
  },
  topBarActions: {
    flexDirection: 'row',
    gap: 10,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  course: {
    fontSize: 13,
    marginTop: 2,
  },
  hero: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    marginTop: 18,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  heroMeta: {
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 14,
    letterSpacing: -0.3,
  },
  heroBody: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  heroActions: {
    marginTop: 18,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  footer: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
});
