import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Avatar, Surface } from 'react-native-paper';
import { CustomTheme } from '@/lib/theme/types';

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isUser: boolean;
  avatarUrl?: string;
}

/**
 * A component for displaying chat messages
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  timestamp,
  isUser,
  avatarUrl,
}) => {
  const theme = useTheme<CustomTheme>();

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      {!isUser && (
        <Avatar.Text 
          size={36}
          label="AI"
          style={styles.avatar}
          color="white"
          theme={{ colors: { primary: theme.colors.secondary } }}
        />
      )}

      <Surface
        style={[
          styles.bubble,
          {
            backgroundColor: isUser ? theme.colors.primary : theme.colors.surfaceVariant,
            borderRadius: theme.custom.radius.md,
            marginLeft: isUser ? 0 : 8,
            marginRight: isUser ? 8 : 0,
          },
        ]}
        elevation={0} // Explicitly set to 0 to remove shadow
      >
        <Text
          style={{
            color: isUser ? 'white' : theme.colors.onSurfaceVariant,
          }}
        >
          {message}
        </Text>
        <Text
          variant="bodySmall"
          style={{
            color: isUser ? 'rgba(255, 255, 255, 0.7)' : theme.colors.outline,
            alignSelf: 'flex-end',
            marginTop: 4,
          }}
        >
          {timestamp}
        </Text>
      </Surface>

      {isUser && (
        <Avatar.Text 
          size={36} 
          label="Me" 
          style={styles.avatar}
          color="white"
          theme={{ colors: { primary: theme.colors.primary } }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  botContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  avatar: {
    alignSelf: 'flex-end',
  },
  bubble: {
    padding: 12,
    flexShrink: 1,
  },
});
