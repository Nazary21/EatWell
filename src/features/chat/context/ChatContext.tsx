import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatMessage } from '@/services/api/types';

// Define the shape of the ChatContext
interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

// Sample messages for the UI skeleton
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    userId: '1',
    isUser: false,
    text: 'Hello! I am your nutrition assistant. How can I help you today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
  },
  {
    id: '2',
    userId: '1',
    isUser: true,
    text: 'Can you suggest some high protein meals for lunch?',
    timestamp: new Date(Date.now() - 1000 * 60).toISOString(), // 1 minute ago
  },
  {
    id: '3',
    userId: '1',
    isUser: false,
    text: 'Sure! Here are some high protein lunch options: Grilled chicken salad (30g protein), Tuna wrap (25g protein), Quinoa bowl with tofu (22g protein), or a Turkey sandwich (20g protein). Would you like more details on any of these?',
    timestamp: new Date().toISOString(), // now
  },
];

// Create the context with a default undefined value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated response based on user input
  const getAIResponse = async (userText: string): Promise<string> => {
    // In a real app, this would call an AI service
    const commonPhrases = {
      "hello": "Hello! How can I assist you with your nutrition today?",
      "hi": "Hi there! How can I help you reach your nutrition goals?",
      "food": "I can provide information on various foods and their nutritional content. What would you like to know?",
      "calories": "Calories are a measure of energy in food. Are you looking to track your caloric intake?",
      "meal plan": "I can help you create a personalized meal plan. Would you like that?",
      "recipe": "I know many healthy recipes. What kind of dish are you interested in?",
      "protein": "Protein is essential for muscle growth. Good sources include lean meats, eggs, beans, and tofu.",
      "water": "Staying hydrated is important! Aim for about 8 glasses of water daily.",
      "exercise": "Exercise paired with good nutrition leads to the best results. Are you looking for workout suggestions too?",
    };
    
    // Simple keyword matching for a responsive demo
    for (const [keyword, response] of Object.entries(commonPhrases)) {
      if (userText.toLowerCase().includes(keyword)) {
        return response;
      }
    }
    
    // Default response
    return "I'm analyzing your question. That's an interesting topic! Would you like me to provide more specific nutrition information about that?";
  };

  // Send a new message
  const sendMessage = async (text: string): Promise<void> => {
    try {
      // Create user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: '1', // hard-coded for now
        isUser: true,
        text,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Show loading
      setIsLoading(true);
      
      // Get AI response (simulated delay for demo)
      const responseText = await new Promise<string>(resolve => {
        setTimeout(async () => {
          const response = await getAIResponse(text);
          resolve(response);
        }, 1000);
      });
      
      // Create AI response message
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: '1',
        isUser: false,
        text: responseText,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to send message');
      setIsLoading(false);
    }
  };

  // Clear all messages
  const clearMessages = (): void => {
    setMessages([]);
  };

  // The value that will be provided to consumers of this context
  const value = {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  
  return context;
}; 