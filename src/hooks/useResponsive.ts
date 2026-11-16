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
 *
 * Widths below 320 dp (folded phones, split screen) drop to a single column so
 * the grid can never overflow; tablets (>= 700 dp) get three columns.
 * Everything derives from the live window size, so rotation is instant.
 */
export function useResponsive(): Responsive {
  const { width, height } = useWindowDimensions();

  const isCompact = width < 360;
  const isTablet = width >= 700;
  const columns = width < 320 ? 1 : isTablet ? 3 : 2;
  const gutter = isTablet ? 20 : 14;
  const horizontalPadding = isTablet ? 32 : isCompact ? 14 : 20;

  const available = width - horizontalPadding * 2 - gutter * (columns - 1);
  const cardWidth = Math.max(110, Math.floor(available / columns));

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
