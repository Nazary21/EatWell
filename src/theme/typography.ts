import { MD3TypescaleKey, MD3Type } from 'react-native-paper/lib/typescript/types';

// Font families
export const fonts = {
  regular: {
    fontFamily: 'Inter_400Regular',
  },
  medium: {
    fontFamily: 'Inter_500Medium',
  },
  bold: {
    fontFamily: 'Inter_700Bold',
  },
  display: {
    fontFamily: 'PlusJakartaSans_700Bold',
  },
};

// Type scale following Material Design 3
export const createTypography = (scale: number = 1): Record<MD3TypescaleKey, MD3Type> => ({
  displayLarge: {
    ...fonts.display,
    lineHeight: 64 * scale,
    fontSize: 57 * scale,
    letterSpacing: 0,
    fontWeight: '700',
  },
  displayMedium: {
    ...fonts.display,
    lineHeight: 52 * scale,
    fontSize: 45 * scale,
    letterSpacing: 0,
    fontWeight: '700',
  },
  displaySmall: {
    ...fonts.display,
    lineHeight: 44 * scale,
    fontSize: 36 * scale,
    letterSpacing: 0,
    fontWeight: '700',
  },
  headlineLarge: {
    ...fonts.display,
    lineHeight: 40 * scale,
    fontSize: 32 * scale,
    letterSpacing: 0,
    fontWeight: '700',
  },
  headlineMedium: {
    ...fonts.display,
    lineHeight: 36 * scale,
    fontSize: 28 * scale,
    letterSpacing: 0,
    fontWeight: '700',
  },
  headlineSmall: {
    ...fonts.display,
    lineHeight: 32 * scale,
    fontSize: 24 * scale,
    letterSpacing: 0,
    fontWeight: '700',
  },
  titleLarge: {
    ...fonts.medium,
    lineHeight: 28 * scale,
    fontSize: 22 * scale,
    letterSpacing: 0,
    fontWeight: '500',
  },
  titleMedium: {
    ...fonts.medium,
    lineHeight: 24 * scale,
    fontSize: 16 * scale,
    letterSpacing: 0.15,
    fontWeight: '500',
  },
  titleSmall: {
    ...fonts.medium,
    lineHeight: 20 * scale,
    fontSize: 14 * scale,
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  labelLarge: {
    ...fonts.medium,
    lineHeight: 20 * scale,
    fontSize: 14 * scale,
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  labelMedium: {
    ...fonts.medium,
    lineHeight: 16 * scale,
    fontSize: 12 * scale,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  labelSmall: {
    ...fonts.medium,
    lineHeight: 16 * scale,
    fontSize: 11 * scale,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  bodyLarge: {
    ...fonts.regular,
    lineHeight: 24 * scale,
    fontSize: 16 * scale,
    letterSpacing: 0.15,
    fontWeight: '400',
  },
  bodyMedium: {
    ...fonts.regular,
    lineHeight: 20 * scale,
    fontSize: 14 * scale,
    letterSpacing: 0.25,
    fontWeight: '400',
  },
  bodySmall: {
    ...fonts.regular,
    lineHeight: 16 * scale,
    fontSize: 12 * scale,
    letterSpacing: 0.4,
    fontWeight: '400',
  },
});

export const typography = createTypography();

export default typography; 