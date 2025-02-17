import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

/**
 * Base props that all components should support
 */
export interface BaseComponentProps {
  /**
   * Optional style overrides for the root element
   */
  style?: StyleProp<ViewStyle>;
  
  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Props for components that can show loading state
 */
export interface LoadableProps {
  /**
   * Whether the component is in a loading state
   * @default false
   */
  loading?: boolean;
}

/**
 * Common size variants for components
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * Common style variants for components
 */
export type StyleVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';

/**
 * Props for components that support different sizes
 */
export interface SizeableProps {
  /**
   * The size variant of the component
   * @default 'medium'
   */
  size?: ComponentSize;
}

/**
 * Props for components that support different style variants
 */
export interface VariantProps {
  /**
   * The style variant of the component
   * @default 'primary'
   */
  variant?: StyleVariant;
}

/**
 * Props for components that can fill their container width
 */
export interface FullWidthProps {
  /**
   * Whether the component should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Helper type to create theme-aware styles
 */
export type ThemedStyle = (theme: MD3Theme) => StyleProp<ViewStyle | TextStyle>;

/**
 * Common props shared by form field components
 */
export interface FormFieldProps extends BaseComponentProps, DisableableProps {
  /**
   * The label text for the field
   */
  label: string;
  
  /**
   * Optional helper text to display below the field
   */
  helperText?: string;
  
  /**
   * Error message to display (also sets error state)
   */
  error?: string;
  
  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;
}

/**
 * Common validation result type
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
} 