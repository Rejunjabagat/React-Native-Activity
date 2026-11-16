import { useWindowDimensions } from 'react-native';

export type Responsive = {
  width: number;
  height: number;
  isTablet: boolean;
  isCompact: boolean;
  columns: number;
  gutter: number;
  horizontalPadding: number;
  cardWidth: number;
};

/**
 * Single source of truth for the responsive dashboard grid.
 * Phones get 2 columns, tablets (>= 700dp) get 3, and everything scales
 * from the live window size so rotation is handled without a reload.
 */
export function useResponsive(): Responsive {
  const { width, height } = useWindowDimensions();

  const isTablet = width >= 700;
  const isCompact = width < 360;
  const columns = isTablet ? 3 : 2;
  const gutter = isTablet ? 20 : 14;
  const horizontalPadding = isTablet ? 32 : isCompact ? 14 : 18;

  const available = width - horizontalPadding * 2 - gutter * (columns - 1);
  const cardWidth = Math.max(140, available / columns);

  return {
    width,
    height,
    isTablet,
    isCompact,
    columns,
    gutter,
    horizontalPadding,
    cardWidth,
  };
}
