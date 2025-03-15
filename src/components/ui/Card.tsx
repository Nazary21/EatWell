import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '@/lib/theme/useTheme';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'dark';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padded?: boolean;
  fullWidth?: boolean;
}

/**
 * Card component that follows the design system
 * Can be used for content containers throughout the app
 */
export const Card = ({
  children,
  variant = 'default',
  padded = true, 
  fullWidth = false,
  style,
  ...props
}: CardProps) => {
  const theme = useTheme();
  
  // Get the base style for this card variant from our theme
  const cardStyle = theme.components.card[variant];
  
  // Apply conditional styles
  const containerStyle = [
    styles.container,
    cardStyle,
    !padded && styles.noPadding,
    fullWidth && styles.fullWidth,
    style,
  ];
  
  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  noPadding: {
    padding: 0,
  },
  fullWidth: {
    width: '100%',
  },
}); 