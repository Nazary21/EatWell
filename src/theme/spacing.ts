// Base unit for spacing (4px)
const UNIT = 4;

// Spacing scale
export const spacing = {
  // Basic spacing
  none: 0,
  xxs: UNIT, // 4px
  xs: UNIT * 2, // 8px
  sm: UNIT * 3, // 12px
  md: UNIT * 4, // 16px
  lg: UNIT * 6, // 24px
  xl: UNIT * 8, // 32px
  xxl: UNIT * 12, // 48px
  
  // Layout spacing
  screenPadding: UNIT * 4, // 16px
  sectionSpacing: UNIT * 6, // 24px
  contentSpacing: UNIT * 4, // 16px
  
  // Component specific
  cardPadding: UNIT * 4, // 16px
  buttonPadding: UNIT * 3, // 12px
  inputPadding: UNIT * 3, // 12px
  
  // Helper function to get custom spacing
  custom: (multiplier: number) => UNIT * multiplier,
} as const;

// Border radius scale
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Elevation/Shadow scale
export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

export default {
  spacing,
  borderRadius,
  elevation,
}; 