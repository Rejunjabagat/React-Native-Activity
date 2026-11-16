export type ThemeColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  accent: string;
  success: string;
  overlay: string;
};

export const lightColors: ThemeColors = {
  background: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceAlt: '#EAEEF7',
  text: '#0F1420',
  textMuted: '#5B6478',
  border: '#DFE4EF',
  primary: '#2F6BFF',
  primaryText: '#FFFFFF',
  accent: '#FF7A59',
  success: '#12B76A',
  overlay: 'rgba(15, 20, 32, 0.06)',
};

export const darkColors: ThemeColors = {
  background: '#0A0E16',
  surface: '#141A26',
  surfaceAlt: '#1E2635',
  text: '#F3F6FC',
  textMuted: '#96A2B8',
  border: '#242E40',
  primary: '#5B93FF',
  primaryText: '#06101F',
  accent: '#FF8F70',
  success: '#2ED47A',
  overlay: 'rgba(243, 246, 252, 0.07)',
};
