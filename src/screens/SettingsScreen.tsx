import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { SegmentedControl } from '../components/SegmentedControl';
import { ThemeSwitch } from '../components/ThemeSwitch';
import type { RootStackParamList } from '../navigation/types';
import { useAppTheme, type ThemeMode } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const {
    colors,
    mode,
    isDark,
    setMode,
    toggleTheme,
    profile,
    updateProfile,
    resetPreferences,
  } = useAppTheme();

  // Local, screen-specific interaction state (useState + useEffect).
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timer = setTimeout(() => setNotice(null), 2200);
    return () => clearTimeout(timer);
  }, [notice]);

  const handleReset = () => {
    resetPreferences();
    setNotice('Preferences restored to defaults');
  };

  return (
    <ScreenContainer>
      <AppHeader
        title="Settings"
        subtitle="Global preferences for the whole app"
        onBack={navigation.goBack}
      />

      <SectionTitle title="Profile" hint="Updates the dashboard instantly" />
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Field
          label="Display name"
          value={profile.name}
          placeholder="Your name"
          onChangeText={name => updateProfile({ name })}
        />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <Field
          label="Course / section"
          value={profile.course}
          placeholder="BS Computer Science"
          onChangeText={course => updateProfile({ course })}
        />
      </View>

      <SectionTitle title="Appearance" hint="Theme is shared across all screens" />
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <SegmentedControl
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
          value={mode}
          onChange={next => setMode(next as ThemeMode)}
        />

        <View style={styles.switchRow}>
          <View style={styles.switchText}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>
              Dark mode
            </Text>
            <Text style={[styles.switchHint, { color: colors.textMuted }]}>
              {isDark ? 'Dark palette is active' : 'Light palette is active'}
            </Text>
          </View>
          <ThemeSwitch value={isDark} onChange={toggleTheme} />
        </View>
      </View>

      <SectionTitle title="Live preview" />
      <View
        style={[
          styles.preview,
          { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.previewEyebrow, { color: colors.textMuted }]}>
          HOME DASHBOARD
        </Text>
        <Text style={[styles.previewName, { color: colors.text }]}>
          {profile.name || 'Student'}
        </Text>
        <Text style={[styles.previewCourse, { color: colors.textMuted }]}>
          {profile.course || 'React Native'}
        </Text>
      </View>

      <SectionTitle title="About" />
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Row label="Application" value="Activity #5 — Master Dashboard" />
        <Row label="React Native" value="0.88.1" />
        <Row label="Architecture" value="New Architecture (Fabric)" />
        <Row label="Global state" value="React Context API" last />
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          label="Reset preferences"
          variant="secondary"
          onPress={handleReset}
        />
        {notice ? (
          <Text style={[styles.notice, { color: colors.success }]}>
            {notice}
          </Text>
        ) : null}
      </View>
    </ScreenContainer>
  );
}

type FieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
};

function Field({ label, value, placeholder, onChangeText }: FieldProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.field}>
      <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        autoCapitalize="words"
        autoCorrect={false}
        maxLength={32}
        accessibilityLabel={label}
        style={[
          styles.input,
          {
            color: colors.text,
            borderColor: colors.border,
            backgroundColor: colors.surfaceAlt,
          },
        ]}
      />
    </View>
  );
}

function Row({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.row,
        !last && { borderBottomWidth: 1, borderBottomColor: colors.border },
      ]}
    >
      <Text style={[styles.rowLabel, { color: colors.textMuted }]}>{label}</Text>
      <Text
        style={[styles.rowValue, { color: colors.text }]}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  switchText: {
    flex: 1,
    paddingRight: 12,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  switchHint: {
    fontSize: 11,
    marginTop: 2,
  },
  preview: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  previewEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  previewName: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
  },
  previewCourse: {
    fontSize: 12,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    gap: 12,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  rowValue: {
    fontSize: 12,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
  },
  footer: {
    marginTop: 26,
    gap: 12,
  },
  notice: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
});
