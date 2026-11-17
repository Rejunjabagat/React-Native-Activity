import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionHeading } from '../components/SectionHeading';
import { SegmentedControl } from '../components/SegmentedControl';
import type { RootStackParamList } from '../navigation/types';
import { useAppTheme, type ThemeMode } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const { colors, mode, setMode, profile, updateProfile } = useAppTheme();

  return (
    <ScreenContainer>
      <AppHeader
        kicker="Preferences"
        title="Settings"
        subtitle="The values on this screen are shared by every other screen."
        onBack={navigation.goBack}
      />

      <SectionHeading
        index="01"
        title="Profile"
        hint="Shown on the dashboard"
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
        title="Theme"
        hint="Changes the whole app immediately"
      />

      <SegmentedControl
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
        value={mode}
        onChange={next => setMode(next as ThemeMode)}
      />

      <SectionHeading index="03" title="Dashboard preview" />

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
          {profile.course || 'BSCS'}
        </Text>
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
});
