/**
 * Design tokens for the EatWell app
 * These are the primitive values that make up our design system
 */

// Color Primitives
export const colors = {
  // Primary Purple Scale
  purple: {
    50: '#F4F3FF',
    100: '#EBE9FF',
    200: '#D9D6FF',
    300: '#B9B3FF',
    400: '#9A91FF',
    500: '#6C63FF', // Our primary color
    600: '#5447DB',
    700: '#3F33B7',
    800: '#2D2393',
    900: '#1F177A'
  },
  
  // Secondary Green Scale
  green: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Success color
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20'
  },

  // Accent Red Scale
  red: {
    50: '#FFF3F3',
    100: '#FFE6E6',
    200: '#FFB3B3',
    300: '#FF8080',
    400: '#FF6B6B', // Our accent color
    500: '#FF4D4D',
    600: '#DB3A3A',
    700: '#B72B2B',
    800: '#931F1F',
    900: '#7A1717'
  },

  // Neutral/Gray Scale
  neutral: {
    50: '#F7F7F7',  // Surface background
    100: '#E6E6E6',
    200: '#CCCCCC',
    300: '#B3B3B3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4D4D4D',
    800: '#333333',
    900: '#2D3142'  // Text color
  },

  // Info Blue Scale
  blue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Info color
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1'
  },

  // Warning Yellow Scale
  yellow: {
    50: '#FFFDE7',
    100: '#FFF9C4',
    200: '#FFF59D',
    300: '#FFF176',
    400: '#FFEE58',
    500: '#FFC107', // Warning color
    600: '#FFCA28',
    700: '#FFB300',
    800: '#FFA000',
    900: '#FF8F00'
  },
  
  // Dark Theme Background Shades
  darkTheme: {
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    onSurface: '#E1E1E1',
    onSurfaceVariant: '#BBBBBB',
  }
};

// Spacing Scale
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Typography Scale (in pixels)
export const typography = {
  size: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 22,
    xxl: 28,
    xxxl: 36,
    display: 57,
  },
  lineHeight: {
    xs: 16,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 36,
    xxxl: 44,
    display: 64,
  },
  letterSpacing: {
    tight: -0.25,
    normal: 0,
    wide: 0.15,
    wider: 0.25,
    widest: 0.5,
  },
};

// Border Radius
export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 24,
  full: 9999,
};

// Elevation/Shadow
export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
  },
}; 