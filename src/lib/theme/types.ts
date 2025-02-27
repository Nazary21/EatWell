import { MD3Theme } from 'react-native-paper';

// Custom properties we're adding to the theme
interface CustomThemeProperties {
  custom: {
    spacing: {
      none: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      xxxl: number;
    };
    radius: {
      none: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    elevation: {
      none: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      sm: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      md: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      lg: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
    };
  };
}

// Extend the MD3Theme with our custom properties
export type CustomTheme = MD3Theme & CustomThemeProperties;

// Theme mode type
export type ThemeMode = 'light' | 'dark' | 'system';

// Types for custom components that need theme
export interface ThemedComponentProps {
  theme?: CustomTheme;
}

// Types for custom chart components
export interface ChartProps extends ThemedComponentProps {
  data: number[];
  labels?: string[];
  height?: number;
  width?: number;
}

// Types for custom card components
export interface CardProps extends ThemedComponentProps {
  title?: string;
  subtitle?: string;
  elevation?: number;
  style?: any;
  children?: React.ReactNode;
}

// Types for metric display
export interface MetricProps extends ThemedComponentProps {
  value: number | string;
  label: string;
  unit?: string;
  trend?: number;
  style?: any;
}

// Types for goal progress
export interface GoalProgressProps extends ThemedComponentProps {
  current: number;
  target: number;
  label: string;
  unit?: string;
  style?: any;
}

// Types for chat components
export interface ChatMessageProps extends ThemedComponentProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
  status?: 'sent' | 'delivered' | 'read';
}

// Types for profile components
export interface ProfileStatsProps extends ThemedComponentProps {
  stats: {
    label: string;
    value: number | string;
    unit?: string;
  }[];
}

// Helper type for style variants
export type StyleVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

// Re-export other types
export * from './tokens'; 