import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/shared/components/ui/ScreenHeader';
import { ChatMessage } from '@/shared/components/ui/ChatMessage';
import { CustomTheme } from '@/lib/theme/types';
import { useChat } from '@/features/chat/context/ChatContext';

// Sample data for demonstration
const initialMessages = [
  {
    id: '1',
    text: 'Hello! I am your nutrition assistant. How can I help you today?',
    timestamp: '10:30 AM',
    isUser: false,
  },
  {
    id: '2',
    text: 'Can you suggest some high protein meals for lunch?',
    timestamp: '10:31 AM',
    isUser: true,
  },
  {
    id: '3',
    text: 'Sure! Here are some high protein lunch options: Grilled chicken salad (30g protein), Tuna wrap (25g protein), Quinoa bowl with tofu (22g protein), or a Turkey sandwich (20g protein). Would you like more details on any of these?',
    timestamp: '10:32 AM',
    isUser: false,
  },
];

export default function ChatScreen() {
  const theme = useTheme<CustomTheme>();
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Send message via context
    await sendMessage(input);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScreenHeader title="Assistant" />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessage
              message={item.text}
              timestamp={new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              isUser={item.isUser}
            />
          )}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Assistant is thinking...</Text>
          </View>
        )}
        
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.background }]}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.outline}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            style={[styles.sendButton, { 
              backgroundColor: input.trim() === '' ? theme.colors.surfaceVariant : theme.colors.primary
            }]}
            disabled={input.trim() === ''}
          >
            <IconButton
              icon="send"
              size={24}
              iconColor="white"
              onPress={handleSend}
              disabled={input.trim() === ''}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  loadingText: {
    marginLeft: 8,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    borderRadius: 25,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
