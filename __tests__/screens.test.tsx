import React from 'react';
import { Text, TextInput } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { ActivityScreen } from '../src/screens/ActivityScreen';
import { HomeScreen } from '../src/screens/HomeScreen';
import { SettingsScreen } from '../src/screens/SettingsScreen';
import { ThemeProvider } from '../src/theme/ThemeContext';

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
} as never;

const renderTree = (element: React.ReactElement) => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  act(() => {
    renderer = ReactTestRenderer.create(<ThemeProvider>{element}</ThemeProvider>);
  });

  return renderer!;
};

const textOf = (renderer: ReactTestRenderer.ReactTestRenderer) =>
  JSON.stringify(renderer.toJSON());

/** Press the checklist row that contains the given label. */
const pressRow = (
  renderer: ReactTestRenderer.ReactTestRenderer,
  label: string,
) => {
  const textNode = renderer.root
    .findAllByType(Text)
    .find(node => node.props.children === label);

  if (!textNode) {
    throw new Error(`Row not found: ${label}`);
  }

  let target: typeof textNode | null = textNode;
  while (target && typeof target.props.onPress !== 'function') {
    target = target.parent;
  }

  if (!target) {
    throw new Error(`No pressable around: ${label}`);
  }

  act(() => target!.props.onPress());
};

describe('screens', () => {
  it('renders the dashboard menu with the profile name', () => {
    const renderer = renderTree(
      <HomeScreen
        navigation={navigation}
        route={{ key: 'home', name: 'Home' } as never}
      />,
    );

    const text = textOf(renderer);

    expect(text).toContain('Rejun Q. Jabagat');
    expect(text).toContain('BSCS 4-A');
    expect(text).toContain('Activity #5');
    expect(text).toContain('Settings');
    expect(text).toContain('Final Project');
    expect(text).toContain('Available');
    expect(text).toContain('Planned');

    act(() => renderer.unmount());
  });

  it('updates the dashboard when the name is typed in Settings', () => {
    const renderer = renderTree(
      <>
        <HomeScreen
          navigation={navigation}
          route={{ key: 'home', name: 'Home' } as never}
        />
        <SettingsScreen
          navigation={navigation}
          route={{ key: 'settings', name: 'Settings' } as never}
        />
      </>,
    );

    const inputs = renderer.root.findAllByType(TextInput);
    expect(inputs).toHaveLength(2);

    act(() => inputs[0].props.onChangeText('Maria Santos'));

    // Dashboard greeting, dashboard footer and Settings preview all read the
    // same context value, so the new name must appear three times.
    const count = textOf(renderer).split('Maria Santos').length - 1;
    expect(count).toBeGreaterThanOrEqual(3);

    act(() => renderer.unmount());
  });

  it('tracks the requirements checklist on the activity screen', () => {
    const renderer = renderTree(
      <ActivityScreen
        navigation={navigation}
        route={
          { key: 'a5', name: 'Activity', params: { id: 'activity-5' } } as never
        }
      />,
    );

    expect(textOf(renderer)).toContain('0/7');
    expect(textOf(renderer)).toContain('0%');

    pressRow(renderer, 'Initialize a React Native project');
    pressRow(renderer, 'Build multi-screen navigation');

    const text = textOf(renderer);
    expect(text).toContain('2/7');
    expect(text).toContain('29%');

    act(() => renderer.unmount());
  });
});
