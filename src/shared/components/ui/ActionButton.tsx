import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { CustomTheme } from '@/lib/theme/types';

interface ActionButtonProps {
  icon: string;
  onPress: () => void;
  label?: string;
  style?: object;
}

/**
 * A reusable floating action button component
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  onPress,
  label,
  style,
}) => {
  const theme = useTheme<CustomTheme>();

  return (
    <FAB
      icon={icon}
      onPress={onPress}
      label={label}
      style={[
        styles.fab,
        {
          backgroundColor: theme.colors.primary,
        },
        style,
      ]}
      color="white"
      size="medium"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 16,
  },
});
