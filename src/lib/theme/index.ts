import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { ThemeMode } from '@/shared/types/common';
import { colors, spacing, radius, elevation, typography } from './tokens';
import { getFontConfig } from './fonts';

// Semantic tokens that map our color primitives to their usage
const lightSemanticTokens = {
  primary: colors.purple[500],
  secondary: colors.green[500],
  tertiary: colors.red[400],
  background: colors.neutral[50],
  surface: colors.neutral[50],
  surfaceVariant: colors.neutral[100],
  text: colors.neutral[900],
  accent: colors.red[400],
  error: colors.red[500],
  success: colors.green[500],
  info: colors.blue[500],
  warning: colors.yellow[500],
  disabled: colors.neutral[300],
  placeholder: colors.neutral[400],
  backdrop: 'rgba(0, 0, 0, 0.5)',
  onSurface: colors.neutral[900],
  onSurfaceVariant: colors.neutral[700],
  elevation: {
    level0: elevation.none.shadowColor,
    level1: elevation.sm.shadowColor,
    level2: elevation.md.shadowColor,
    level3: elevation.lg.shadowColor,
  },
};

const darkSemanticTokens = {
  ...lightSemanticTokens,
  background: colors.darkTheme.background,
  surface: colors.darkTheme.surface,
  surfaceVariant: colors.darkTheme.surfaceVariant,
  text: colors.darkTheme.onSurface,
  onSurface: colors.darkTheme.onSurface,
  onSurfaceVariant: colors.darkTheme.onSurfaceVariant,
};

type FontScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'display';
type LetterSpacing = 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

// Valid font weight values
type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold' | 'normal';

// Convert our typography scale to MD3Type format
const createFontConfig = () => {
  const fontConfig: Record<string, any> = {};
  const scales: FontScale[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'display'];
  
  scales.forEach(scale => {
    fontConfig[scale] = {
      fontFamily: 'System',
      fontSize: typography.size[scale],
      fontWeight: '400' as FontWeight, // Cast to the correct type
      letterSpacing: typography.letterSpacing.normal, // Default to normal letter spacing
      lineHeight: typography.lineHeight[scale],
    };
  });
  
  return fontConfig;
};

// Create base themes with proper structure for Paper
export const createTheme = (isLight: boolean) => {
  const baseTheme = isLight ? MD3LightTheme : MD3DarkTheme;
  const semanticTokens = isLight ? lightSemanticTokens : darkSemanticTokens;
  const { fontConfig } = getFontConfig();

  // Since we're extending the base theme, just use its structure
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: semanticTokens.primary,
      secondary: semanticTokens.secondary,
      tertiary: semanticTokens.tertiary,
      background: semanticTokens.background,
      surface: semanticTokens.surface,
      surfaceVariant: semanticTokens.surfaceVariant,
      error: semanticTokens.error,
      onSurface: semanticTokens.onSurface,
      onSurfaceVariant: semanticTokens.onSurfaceVariant,
      outline: semanticTokens.placeholder,
    },
    roundness: radius.md,
    // Use font config directly
    fonts: fontConfig,
    custom: {
      spacing,
      radius,
      elevation,
      typography,
    },
  };
};

export const lightTheme = createTheme(true);
export const darkTheme = createTheme(false);

// Theme selector
export const getTheme = (mode: ThemeMode) => {
  switch (mode) {
    case 'dark':
      return darkTheme;
    case 'light':
      return lightTheme;
    default:
      return lightTheme;
  }
};