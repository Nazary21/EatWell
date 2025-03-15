import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '@/lib/theme/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

/**
 * Custom Button component using our design system tokens
 */
export const Button = ({
  onPress,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
}: ButtonProps) => {
  const theme = useTheme();
  
  // Get button style based on variant
  const getButtonStyle = () => {
    // Base style from our component library
    const baseStyle = theme.components.button[variant];
    
    // Size adjustments
    let sizeStyle = {};
    if (size === 'small') {
      sizeStyle = {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
      };
    } else if (size === 'large') {
      sizeStyle = {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
      };
    }
    
    // Width adjustment
    const widthStyle = fullWidth ? { width: '100%' } : {};
    
    // Disabled style
    const disabledStyle = disabled ? {
      opacity: 0.5,
      backgroundColor: variant === 'outline' || variant === 'text' 
        ? 'transparent' 
        : theme.colors.neutral[300],
    } : {};
    
    return {
      ...baseStyle,
      ...sizeStyle,
      ...widthStyle,
      ...disabledStyle,
    };
  };
  
  // Get text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.neutral[50];
      case 'secondary':
        return theme.colors.neutral[900];
      case 'outline':
        return theme.colors.purple[500];
      case 'text':
        return theme.colors.purple[500];
      default:
        return theme.colors.neutral[50];
    }
  };
  
  // Get text size based on button size
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.size.xs;
      case 'medium':
        return theme.typography.size.sm;
      case 'large':
        return theme.typography.size.md;
      default:
        return theme.typography.size.sm;
    }
  };
  
  const buttonStyle = getButtonStyle();
  const textColor = getTextColor();
  const textSize = getTextSize();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, buttonStyle, style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={textColor} 
          style={styles.loader} 
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, { color: textColor, fontSize: textSize }]}>
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  loader: {
    marginHorizontal: 8,
  },
}); 