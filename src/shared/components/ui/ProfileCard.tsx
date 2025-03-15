import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';
import { CustomTheme } from '@/lib/theme/types';

interface ProfileCardProps {
  name: string;
  email?: string;
  avatar?: ImageSourcePropType;
  onEdit?: () => void;
}

/**
 * A card component for displaying user profile information
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  avatar,
  onEdit,
}) => {
  const theme = useTheme<CustomTheme>();

  return (
    <Surface
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.custom.radius.md,
          ...theme.custom.elevation.md,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image 
              source={avatar} 
              style={styles.avatar} 
            />
          ) : (
            <View 
              style={[
                styles.avatarPlaceholder, 
                { backgroundColor: theme.colors.primary + '20' }
              ]}
            >
              <Text style={{ fontSize: 40, color: theme.colors.primary }}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text variant="headlineSmall" style={styles.name}>
            {name}
          </Text>
          {email && (
            <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
              {email}
            </Text>
          )}
        </View>

        <IconButton
          icon="pencil"
          size={24}
          onPress={onEdit}
          style={styles.editButton}
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
});
