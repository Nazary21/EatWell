import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import type { 
  BaseComponentProps,
  DisableableProps,
  SizeableProps 
} from '../../types';

export interface StepIndicatorProps extends 
  BaseComponentProps,
  DisableableProps,
  SizeableProps {
  /**
   * Current step number
   */
  current: number;
  
  /**
   * Total number of steps
   */
  total: number;
  
  /**
   * Whether to show step numbers
   * @default true
   */
  showNumbers?: boolean;
  
  /**
   * Whether this step is active
   * @default false
   */
  active?: boolean;
  
  /**
   * Whether this step is completed
   * @default false
   */
  completed?: boolean;
}

/**
 * StepIndicator component shows progress in a multi-step flow
 * 
 * @example
 * ```tsx
 * <StepIndicator
 *   current={2}
 *   total={4}
 *   size="medium"
 *   active
 * />
 * ```
 */
export const StepIndicator = ({
  current,
  total,
  size = 'medium',
  showNumbers = true,
  active = false,
  completed = false,
  disabled = false,
  style,
  testID,
}: StepIndicatorProps) => {
  const theme = useTheme();
  
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 40;
      default:
        return 32;
    }
  };
  
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.surfaceDisabled;
    if (completed) return theme.colors.primary;
    if (active) return theme.colors.primaryContainer;
    return theme.colors.surfaceVariant;
  };
  
  const getTextColor = () => {
    if (disabled) return theme.colors.onSurfaceDisabled;
    if (completed) return theme.colors.onPrimary;
    if (active) return theme.colors.onPrimaryContainer;
    return theme.colors.onSurfaceVariant;
  };
  
  const indicatorSize = getSize();
  
  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          width: indicatorSize,
          height: indicatorSize,
          backgroundColor: getBackgroundColor(),
        },
        style,
      ]}
    >
      {showNumbers && (
        <Text
          style={[
            styles.text,
            { color: getTextColor() },
          ]}
        >
          {current}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 