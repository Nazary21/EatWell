import React from 'react';
import { UserProvider } from '@/features/user/context/UserContext';
import { NutritionProvider } from '@/features/nutrition/context/NutritionContext';
import { ChatProvider } from '@/features/chat/context/ChatContext';

/**
 * AppProvider combines all context providers in the application
 * This provides a centralized state management solution
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UserProvider>
      <NutritionProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </NutritionProvider>
    </UserProvider>
  );
}; 