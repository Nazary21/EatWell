import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenHeaderProps {
  title: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

/**
 * A reusable header component for screen layouts
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  rightIcon,
  onRightIconPress,
  showBackButton = false,
  onBackPress,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.contentContainer}>
        {showBackButton && (
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={onBackPress}
            style={styles.backButton}
          />
        )}
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
        {rightIcon && (
          <IconButton
            icon={rightIcon}
            size={24}
            onPress={onRightIconPress}
            style={styles.rightButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 8,
  },
  rightButton: {
    marginLeft: 8,
  },
});
