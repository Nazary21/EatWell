import React from 'react';
import { SvgXml } from 'react-native-svg';

interface SvgIconProps {
  xml: string;
  width?: number;
  height?: number;
  color?: string;
}

/**
 * A component for rendering SVG icons with proper sizing
 */
export const SvgIcon: React.FC<SvgIconProps> = ({
  xml,
  width = 24,
  height = 24,
  color,
}) => {
  // If color is provided, replace both fill="currentColor" and other fill attributes
  let colorizedXml = xml;
  
  if (color) {
    // Replace fill="currentColor" with the provided color
    colorizedXml = colorizedXml.replace(/fill="currentColor"/g, `fill="${color}"`);
    
    // Replace other fill colors as needed - this is a simplified approach
    // For a more robust solution, a proper SVG parser would be better
    colorizedXml = colorizedXml.replace(/fill="#[0-9A-Fa-f]{3,6}"/g, `fill="${color}"`);
  }

  return (
    <SvgXml
      xml={colorizedXml}
      width={width}
      height={height}
    />
  );
}; 