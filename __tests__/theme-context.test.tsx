import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import {
  ThemeProvider,
  useAppTheme,
  type ThemeContextValue,
} from '../src/theme/ThemeContext';

let context: ThemeContextValue;

function Probe() {
  context = useAppTheme();
  return null;
}

function renderProbe() {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  act(() => {
    renderer = ReactTestRenderer.create(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
  });

  return renderer!;
}

describe('global preferences', () => {
  it('starts on the paper theme with the stored profile', () => {
    renderProbe();

    expect(context.mode).toBe('light');
    expect(context.isDark).toBe(false);
    expect(context.profile).toEqual({
      name: 'Rejun Q. Jabagat',
      course: 'BSCS 4-A',
    });
  });

  it('switches the palette through the context', () => {
    renderProbe();

    act(() => context.toggleTheme());
    expect(context.mode).toBe('dark');
    expect(context.isDark).toBe(true);
    expect(context.colors.background).toBe('#12120F');

    act(() => context.setMode('light'));
    expect(context.isDark).toBe(false);
    expect(context.colors.background).toBe('#F5F2EA');
  });

  it('patches the profile without dropping other fields', () => {
    renderProbe();

    act(() => context.updateProfile({ course: 'BSCS 4-B' }));
    expect(context.profile).toEqual({
      name: 'Rejun Q. Jabagat',
      course: 'BSCS 4-B',
    });
  });

  it('restores the defaults on reset', () => {
    renderProbe();

    act(() => context.setMode('dark'));
    act(() => context.updateProfile({ name: 'Temporary' }));
    act(() => context.resetPreferences());

    expect(context.mode).toBe('light');
    expect(context.profile.name).toBe('Rejun Q. Jabagat');
  });
});
