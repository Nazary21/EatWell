import { MD3Colors } from 'react-native-paper/lib/typescript/types';

// Base palette
const palette = {
  // Primary
  purple: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',  // Primary color
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  // Secondary
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  // Neutral
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  // Accent
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  // Semantic
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

// Extended MD3Colors type
type ExtendedMD3Colors = MD3Colors & {
  success: string;
  warning: string;
  info: string;
  surfaceLight: string;
  surfaceMedium: string;
  surfaceDark: string;
};

// Light theme
export const lightColors: ExtendedMD3Colors = {
  // Primary colors
  primary: palette.purple[500],
  onPrimary: '#ffffff',
  primaryContainer: palette.purple[100],
  onPrimaryContainer: palette.purple[900],
  
  // Secondary colors
  secondary: palette.blue[500],
  onSecondary: '#ffffff',
  secondaryContainer: palette.blue[100],
  onSecondaryContainer: palette.blue[600],
  
  // Tertiary colors
  tertiary: palette.orange[500],
  onTertiary: '#ffffff',
  tertiaryContainer: '#fff7ed',
  onTertiaryContainer: palette.orange[600],
  
  // Background and surface
  background: '#ffffff',
  onBackground: palette.gray[900],
  surface: '#ffffff',
  onSurface: palette.gray[900],
  surfaceVariant: palette.gray[100],
  onSurfaceVariant: palette.gray[700],
  surfaceDisabled: palette.gray[100],
  onSurfaceDisabled: palette.gray[400],
  
  // Error colors
  error: palette.error,
  onError: '#ffffff',
  errorContainer: '#fef2f2',
  onErrorContainer: '#7f1d1d',
  
  // Other
  outline: palette.gray[300],
  outlineVariant: palette.gray[200],
  inverseSurface: palette.gray[900],
  inverseOnSurface: palette.gray[100],
  inversePrimary: palette.purple[200],
  shadow: palette.gray[900],
  scrim: palette.gray[900],
  backdrop: 'rgba(0, 0, 0, 0.5)',
  
  elevation: {
    level0: 'transparent',
    level1: palette.gray[50],
    level2: palette.gray[100],
    level3: palette.gray[200],
    level4: palette.gray[300],
    level5: palette.gray[400],
  },
  
  // Custom semantic colors
  success: palette.success,
  warning: palette.warning,
  info: palette.info,
  
  // Custom surface colors
  surfaceLight: palette.gray[50],
  surfaceMedium: palette.gray[100],
  surfaceDark: palette.gray[200],
};

// Dark theme
export const darkColors: ExtendedMD3Colors = {
  // Primary colors
  primary: palette.purple[400],
  onPrimary: '#ffffff',
  primaryContainer: palette.purple[800],
  onPrimaryContainer: palette.purple[100],
  
  // Secondary colors
  secondary: palette.blue[400],
  onSecondary: '#ffffff',
  secondaryContainer: palette.blue[800],
  onSecondaryContainer: palette.blue[100],
  
  // Tertiary colors
  tertiary: palette.orange[400],
  onTertiary: '#ffffff',
  tertiaryContainer: palette.orange[900],
  onTertiaryContainer: palette.orange[100],
  
  // Background and surface
  background: palette.gray[900],
  onBackground: palette.gray[100],
  surface: palette.gray[900],
  onSurface: palette.gray[100],
  surfaceVariant: palette.gray[800],
  onSurfaceVariant: palette.gray[300],
  surfaceDisabled: palette.gray[800],
  onSurfaceDisabled: palette.gray[600],
  
  // Error colors
  error: palette.error,
  onError: '#ffffff',
  errorContainer: '#7f1d1d',
  onErrorContainer: '#fef2f2',
  
  // Other
  outline: palette.gray[700],
  outlineVariant: palette.gray[800],
  inverseSurface: palette.gray[100],
  inverseOnSurface: palette.gray[900],
  inversePrimary: palette.purple[300],
  shadow: '#000000',
  scrim: '#000000',
  backdrop: 'rgba(0, 0, 0, 0.7)',
  
  elevation: {
    level0: 'transparent',
    level1: palette.gray[800],
    level2: palette.gray[700],
    level3: palette.gray[600],
    level4: palette.gray[500],
    level5: palette.gray[400],
  },
  
  // Custom semantic colors
  success: palette.success,
  warning: palette.warning,
  info: palette.info,
  
  // Custom surface colors
  surfaceLight: palette.gray[800],
  surfaceMedium: palette.gray[700],
  surfaceDark: palette.gray[600],
};

export const colors = {
  light: lightColors,
  dark: darkColors,
  palette,
};

export default colors; 