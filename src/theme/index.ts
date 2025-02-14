import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { colors } from './colors';
import { createTypography } from './typography';
import metrics from './spacing';

// Extend the MD3Theme type to include our custom theme properties
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      success: string;
      warning: string;
      info: string;
      surfaceLight: string;
      surfaceMedium: string;
      surfaceDark: string;
    }
  }
}

// Create typography with default scale
const typography = createTypography();

// Create base theme with our customizations
const baseTheme = {
  ...metrics,
  roundness: metrics.borderRadius.md,
  animation: {
    scale: 1.0,
  },
};

// Create light theme
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  ...baseTheme,
  colors: colors.light,
  dark: false,
};

// Create dark theme
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  ...baseTheme,
  colors: colors.dark,
  dark: true,
};

// Export theme type
export type AppTheme = typeof lightTheme;

// Export theme utilities
export { colors, typography, metrics };

// Default export
export default {
  light: lightTheme,
  dark: darkTheme,
}; 