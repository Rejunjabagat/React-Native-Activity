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
  /** Low-contrast wash used for highlighted cards. */
  tint: string;
};

/**
 * Palette: warm paper and ink.
 * Deliberately low-saturation so the UI reads like a printed lab report
 * rather than a stock app template. One green accent, one brick accent.
 */
export const lightColors: ThemeColors = {
  background: '#F5F2EA',
  surface: '#FFFCF4',
  surfaceAlt: '#EBE6DA',
  text: '#1A1A17',
  textMuted: '#6B6659',
  border: '#D8D2C3',
  primary: '#1F4B3E',
  primaryText: '#FBF8F0',
  accent: '#9E512C',
  success: '#2C6B45',
  overlay: 'rgba(26, 26, 23, 0.06)',
  tint: 'rgba(31, 75, 62, 0.08)',
};

export const darkColors: ThemeColors = {
  background: '#12120F',
  surface: '#1A1A16',
  surfaceAlt: '#24241E',
  text: '#EFEBE0',
  textMuted: '#9B968A',
  border: '#33332B',
  primary: '#8CBFA7',
  primaryText: '#0E1F19',
  accent: '#C8794E',
  success: '#7CC294',
  overlay: 'rgba(239, 235, 224, 0.07)',
  tint: 'rgba(140, 191, 167, 0.13)',
};
