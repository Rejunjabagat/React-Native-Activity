import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActivityCard } from '../components/ActivityCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionHeading } from '../components/SectionHeading';
import { TextButton } from '../components/TextButton';
import { ENTRIES } from '../data/activities';
import { useResponsive } from '../hooks/useResponsive';
import type { RootStackParamList } from '../navigation/types';
import { useAppTheme } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { colors, profile } = useAppTheme();
  const {
    columns,
    gutter,
    horizontalPadding,
    cardWidth,
    width,
    isTablet,
  } = useResponsive();

  const openEntry = (id: string) => {
    const entry = ENTRIES.find(item => item.id === id);

    if (entry?.target === 'settings') {
      navigation.navigate('Settings');
      return;
    }

    if (entry?.target === 'activity') {
      navigation.navigate('Activity', { id: entry.id });
    }
  };

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
          {profile.course || 'BSCS'}
        </Text>
        <Text style={[styles.lede, { color: colors.textMuted }]}>
          Open an entry below. The theme and the name above come from Settings
          and change on every screen at once.
        </Text>
      </View>

      <SectionHeading
        index="01"
        title="Index"
        hint={`${columns} column${columns > 1 ? 's' : ''} · ${Math.round(
          width,
        )} dp${isTablet ? ' · tablet' : ''}`}
      />

      <View style={[styles.grid, { gap: gutter }]}>
        {ENTRIES.map((entry, index) => (
          <ActivityCard
            key={entry.id}
            entry={entry}
            index={index}
            width={cardWidth}
            onPress={
              entry.target ? () => openEntry(entry.id) : undefined
            }
          />
        ))}
      </View>

      <Text style={[styles.footer, { color: colors.textMuted }]}>
        Activity #5 · {profile.name} · {profile.course}
      </Text>
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
  lede: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 32,
  },
});
