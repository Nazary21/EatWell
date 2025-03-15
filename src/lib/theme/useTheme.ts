import { useTheme as usePaperTheme } from 'react-native-paper';
import { colors, spacing, radius, elevation, typography } from './tokens';
import { componentStyles } from './components';
import { CustomTheme } from '@/shared/types/theme';

/**
 * Custom hook that provides access to theme tokens and component styles
 * Extends react-native-paper's useTheme with our additional properties
 * 
 * @returns {Object} Theme object with tokens and component styles
 */
export const useTheme = () => {
  const theme = usePaperTheme() as CustomTheme;
  
  return {
    ...theme,
    // Direct access to token collections
    colors,
    spacing,
    radius,
    elevation,
    typography,
    // Component styles
    components: componentStyles,
  };
};

/**
 * Helper function to create responsive size values based on screen width
 * Can be used for creating adaptive layouts
 * 
 * @param {number} size - Base size in logical pixels
 * @param {number} factor - Scale factor for responsiveness (default: 0.5)
 * @returns {number} Responsive size value
 */
export const responsiveSize = (size: number, factor: number = 0.5): number => {
  // This is a placeholder implementation
  // In a real app, you would use something like Dimensions.get('window').width
  // to calculate responsive sizes based on screen width
  return size;
}; 