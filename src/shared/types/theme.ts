import { MD3Theme } from 'react-native-paper';
import { ViewStyle } from 'react-native';

/**
 * Extension of the default Paper theme with our custom properties
 */
export interface CustomTheme extends MD3Theme {
  custom: {
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    radius: {
      none: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      full: number;
    };
    elevation: {
      none: {
        shadowColor: string;
        shadowOffset: {
          width: number;
          height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      xs: ViewStyle;
      sm: ViewStyle;
      md: ViewStyle;
      lg: ViewStyle;
      xl: ViewStyle;
    };
  };
}; 