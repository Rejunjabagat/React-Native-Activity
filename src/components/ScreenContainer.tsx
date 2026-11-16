import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Shared page shell: safe-area aware background + the horizontal padding
 * that every screen uses, so padding never drifts between screens.
 */
export function ScreenContainer({ children, scroll = true, contentStyle }: Props) {
  const { colors } = useAppTheme();

  if (!scroll) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: colors.background }]}
        edges={['top', 'left', 'right']}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={[styles.content, contentStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 32,
  },
});
