import { Platform } from 'react-native';

/**
 * Platform-specific font configuration
 * Uses San Francisco on iOS and Inter on Android
 */

// Choose the proper font family based on platform
export const getFontFamily = () => {
  return Platform.OS === 'ios' ? undefined : 'Inter'; // undefined uses system font on iOS
};

// Font weight mapping to ensure consistency across platforms
export const fontWeights = {
  thin: Platform.OS === 'ios' ? '100' : '100',
  extraLight: Platform.OS === 'ios' ? '200' : '200',
  light: Platform.OS === 'ios' ? '300' : '300',
  regular: Platform.OS === 'ios' ? '400' : '400',
  medium: Platform.OS === 'ios' ? '500' : '500',
  semiBold: Platform.OS === 'ios' ? '600' : '600',
  bold: Platform.OS === 'ios' ? '700' : '700',
  extraBold: Platform.OS === 'ios' ? '800' : '800',
  black: Platform.OS === 'ios' ? '900' : '900',
};

// Font configuration for the theme
export const getFontConfig = () => {
  const fontFamily = getFontFamily();
  
  return {
    fontConfig: {
      // Headings
      headingLarge: {
        fontFamily,
        fontSize: 32,
        lineHeight: 40,
        fontWeight: fontWeights.bold,
      },
      headingMedium: {
        fontFamily,
        fontSize: 28,
        lineHeight: 36,
        fontWeight: fontWeights.bold,
      },
      headingSmall: {
        fontFamily,
        fontSize: 24,
        lineHeight: 32,
        fontWeight: fontWeights.bold,
      },
      
      // Body text
      bodyLarge: {
        fontFamily,
        fontSize: 18,
        lineHeight: 28,
        fontWeight: fontWeights.regular,
      },
      bodyMedium: {
        fontFamily,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: fontWeights.regular,
      },
      bodySmall: {
        fontFamily,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: fontWeights.regular,
      },
      
      // Labels
      labelLarge: {
        fontFamily,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: fontWeights.medium,
      },
      labelMedium: {
        fontFamily,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: fontWeights.medium,
      },
      labelSmall: {
        fontFamily,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: fontWeights.medium,
      },
      
      // Additional variants needed for React Native Paper
      // Title variants
      titleLarge: {
        fontFamily,
        fontSize: 22,
        lineHeight: 28,
        fontWeight: fontWeights.semiBold,
      },
      titleMedium: {
        fontFamily,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: fontWeights.semiBold,
      },
      titleSmall: {
        fontFamily,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: fontWeights.semiBold,
      },
      
      // Headline variants
      headlineLarge: {
        fontFamily,
        fontSize: 32,
        lineHeight: 40, 
        fontWeight: fontWeights.bold,
      },
      headlineMedium: {
        fontFamily,
        fontSize: 28,
        lineHeight: 36,
        fontWeight: fontWeights.bold,
      },
      headlineSmall: {
        fontFamily,
        fontSize: 24,
        lineHeight: 32,
        fontWeight: fontWeights.bold,
      },
      
      // Display variants
      displayLarge: {
        fontFamily,
        fontSize: 57,
        lineHeight: 64,
        fontWeight: fontWeights.bold,
      },
      displayMedium: {
        fontFamily,
        fontSize: 45,
        lineHeight: 52,
        fontWeight: fontWeights.bold,
      },
      displaySmall: {
        fontFamily,
        fontSize: 36,
        lineHeight: 44,
        fontWeight: fontWeights.bold,
      },
    },
  };
}; 