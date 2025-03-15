import React from 'react';
import { SvgXml } from 'react-native-svg';

interface PlusIconProps {
  size?: number;
  color?: string;
}

const PLUS_ICON = `
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 3.79102C14.4832 3.79102 14.875 4.18277 14.875 4.66602V13.1243H23.3333C23.8165 13.1243 24.2083 13.5161 24.2083 13.9993C24.2083 14.4826 23.8165 14.8743 23.3333 14.8743H14.875V23.3327C14.875 23.8159 14.4832 24.2077 14 24.2077C13.5167 24.2077 13.125 23.8159 13.125 23.3327V14.8743H4.66663C4.18338 14.8743 3.79163 14.4826 3.79163 13.9993C3.79163 13.5161 4.18338 13.1243 4.66663 13.1243H13.125V4.66602C13.125 4.18277 13.5167 3.79102 14 3.79102Z" fill="currentColor"/>
</svg>
`;

export const PlusIcon: React.FC<PlusIconProps> = ({ size = 28, color = 'white' }) => {
  // Replace fill color with the provided color
  const iconWithColor = PLUS_ICON.replace(/fill="currentColor"/g, `fill="${color}"`);
  
  return (
    <SvgXml xml={iconWithColor} width={size} height={size} />
  );
};

export default PlusIcon; 