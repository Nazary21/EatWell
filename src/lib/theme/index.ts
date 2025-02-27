import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { ThemeMode } from '@/shared/types/common';
import { colors, spacing, radius, elevation, typography } from './tokens';

// Semantic tokens that map our color primitives to their usage
const lightSemanticTokens = {
  primary: colors.purple[500],
  secondary: colors.red[400],
  background: colors.neutral[50],
  surface: colors.neutral[50],
  text: colors.neutral[900],
  accent: colors.green[500],
  error: colors.red[500],
  success: colors.green[500],
  info: colors.blue[500],
  warning: colors.yellow[500],
  disabled: colors.neutral[300],
  placeholder: colors.neutral[400],
  backdrop: 'rgba(0, 0, 0, 0.5)',
  onSurface: colors.neutral[900],
  elevation: {
    level0: elevation.none.shadowColor,
    level1: elevation.sm.shadowColor,
    level2: elevation.md.shadowColor,
    level3: elevation.lg.shadowColor,
  },
};

const darkSemanticTokens = {
  ...lightSemanticTokens,
  background: colors.neutral[900],
  surface: colors.neutral[800],
  text: colors.neutral[50],
  onSurface: colors.neutral[50],
};

type FontScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'display';
type LetterSpacing = 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

// Convert our typography scale to MD3Type format
const createFontConfig = () => {
  const fontConfig: Record<string, any> = {};
  const scales: FontScale[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'display'];
  
  scales.forEach(scale => {
    fontConfig[scale] = {
      fontFamily: 'System',
      fontSize: typography.size[scale],
      fontWeight: '400',
      letterSpacing: typography.letterSpacing.normal, // Default to normal letter spacing
      lineHeight: typography.lineHeight[scale],
    };
  });
  
  return fontConfig;
};

// Create base themes with proper structure for Paper
const createTheme = (isLight: boolean) => {
  const baseTheme = isLight ? MD3LightTheme : MD3DarkTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.purple[500],
      secondary: colors.red[400],
      background: isLight ? colors.neutral[50] : colors.neutral[900],
      surface: isLight ? colors.neutral[50] : colors.neutral[800],
      error: colors.red[500],
      onSurface: isLight ? colors.neutral[900] : colors.neutral[50],
    },
    roundness: radius.md,
    custom: {
      spacing,
      radius,
      elevation,
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