import React from 'react';
import { Surface, SurfaceProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';

/**
 * A simplified wrapper around the react-native-paper Surface component
 * that eliminates shadows by default (elevation set to 0).
 * 
 * This component is used to create consistent card-like elements
 * throughout the app without shadows. It preserves all other functionality
 * of the Surface component while making the default styling simpler.
 * 
 * If needed, elevation can be passed as a prop to add shadows back.
 */
export const CustomSurface: React.FC<SurfaceProps> = ({ 
  children, 
  elevation = 0, // Default to 0 elevation to remove shadow
  style,
  ...props 
}) => {
  return (
    <Surface 
      elevation={elevation} 
      style={[styles.surface, style]} 
      {...props}
    >
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    backgroundColor: 'white',
    overflow: 'hidden', // Fix for shadow display issues
  },
}); 