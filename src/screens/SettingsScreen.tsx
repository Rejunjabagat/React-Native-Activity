import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionHeading } from '../components/SectionHeading';
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

    const timer = setTimeout(() => setNotice(null), 2400);
    return () => clearTimeout(timer);
  }, [notice]);

  const handleReset = () => {
    resetPreferences();
    setNotice('Defaults restored');
  };

  return (
    <ScreenContainer>
      <AppHeader
        kicker="Preferences"
        title="Settings"
        subtitle="One set of values, read by every screen in the app."
        onBack={navigation.goBack}
      />

      <SectionHeading
        index="01"
        title="Identity"
        hint="Appears in the dashboard greeting"
      />

      <Field
        label="Display name"
        value={profile.name}
        placeholder="Your name"
        maxLength={32}
        onChangeText={name => updateProfile({ name })}
      />
      <Field
        label="Course and section"
        value={profile.course}
        placeholder="BSCS 4-A"
        maxLength={28}
        onChangeText={course => updateProfile({ course })}
      />

      <SectionHeading
        index="02"
        title="Appearance"
        hint="Switches instantly, app-wide"
      />

      <SegmentedControl
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
        value={mode}
        onChange={next => setMode(next as ThemeMode)}
      />

      <View style={[styles.switchRow, { borderTopColor: colors.border }]}>
        <View style={styles.switchText}>
          <Text style={[styles.switchLabel, { color: colors.text }]}>
            Dark mode
          </Text>
          <Text style={[styles.switchHint, { color: colors.textMuted }]}>
            {isDark ? 'Ink palette' : 'Paper palette'}
          </Text>
        </View>
        <ThemeSwitch value={isDark} onChange={toggleTheme} />
      </View>

      <SectionHeading
        index="03"
        title="Preview"
        hint="What the dashboard header renders"
      />

      <View
        style={[
          styles.preview,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderLeftColor: colors.primary,
          },
        ]}
      >
        <Text style={[styles.previewKicker, { color: colors.textMuted }]}>
          Dashboard
        </Text>
        <Text
          style={[styles.previewName, { color: colors.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {profile.name || 'Student'}
        </Text>
        <Text style={[styles.previewCourse, { color: colors.textMuted }]}>
          {profile.course || 'BSCS'} · Activity 05
        </Text>
      </View>

      <SectionHeading index="04" title="About" />

      <View style={[styles.table, { borderTopColor: colors.border }]}>
        <Row label="Application" value="Activity 05 shell" />
        <Row label="React Native" value="0.88.1 · Fabric" />
        <Row label="Navigation" value="native-stack v7" />
        <Row label="Global state" value="Context API" last />
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
  maxLength: number;
  onChangeText: (value: string) => void;
};

/** Underlined text field — no boxes, so the page keeps its report-like rhythm. */
function Field({
  label,
  value,
  placeholder,
  maxLength,
  onChangeText,
}: FieldProps) {
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
        maxLength={maxLength}
        accessibilityLabel={label}
        style={[
          styles.input,
          {
            color: colors.text,
            borderBottomColor: colors.border,
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
        { borderBottomColor: colors.border },
        last && styles.rowLast,
      ]}
    >
      <Text style={[styles.rowLabel, { color: colors.textMuted }]}>
        {label}
      </Text>
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
  field: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  input: {
    fontFamily: 'serif',
    fontSize: 17,
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: 16,
    paddingTop: 16,
  },
  switchText: {
    flex: 1,
    paddingRight: 12,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  switchHint: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginTop: 3,
  },
  preview: {
    borderRadius: 4,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 18,
  },
  previewKicker: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  previewName: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  previewCourse: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  table: {
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  rowValue: {
    flexShrink: 1,
    fontSize: 12,
    textAlign: 'right',
  },
  footer: {
    marginTop: 28,
    gap: 12,
  },
  notice: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
