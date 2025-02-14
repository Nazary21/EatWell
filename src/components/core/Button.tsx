import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { ButtonProps as PaperButtonProps } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<PaperButtonProps, 'theme'> {
  /**
   * The visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;
  
  /**
   * Whether the button should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether the button should show a loading spinner
   * @default false
   */
  loading?: boolean;
}

/**
 * Primary button component for user interactions.
 * Extends React Native Paper's Button with consistent styling and behavior.
 */
export const Button = ({ 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  style,
  loading = false,
  disabled,
  ...props 
}: ButtonProps) => {
  const theme = useTheme();
  
  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.onPrimary,
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          textColor: theme.colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: theme.colors.error,
          textColor: theme.colors.onError,
        };
    }
  };

  const colors = getButtonColors();
  
  return (
    <PaperButton
      {...props}
      mode={variant === 'secondary' ? 'outlined' : 'contained'}
      style={[
        styles.base,
        styles[size],
        fullWidth && styles.fullWidth,
        { backgroundColor: colors.backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
      textColor={colors.textColor}
      disabled={disabled || loading}
      loading={loading}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
  },
  small: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
}); 