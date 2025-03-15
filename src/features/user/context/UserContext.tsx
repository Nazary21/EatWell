import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProfile, UserPreferences } from '@/services/api/types';

// Define the shape of the UserContext
interface UserContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateUser: (userData: Partial<User>) => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
  updatePreferences: (preferencesData: Partial<UserPreferences>) => void;
  signOut: () => void;
}

// Sample user data for the UI skeleton
const sampleUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  preferences: {
    notifications: true,
    darkMode: false,
    useMetricSystem: true,
  }
};

const sampleProfile: UserProfile = {
  height: 180,
  weight: 75,
  goalWeight: 70,
  birthday: '1990-01-01',
  gender: 'male',
  activityLevel: 'moderate',
};

// Create the context with a default undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component that wraps the app and makes user object available
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(sampleUser);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(sampleProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load user data on mount
  useEffect(() => {
    // This would normally fetch user data from an API or local storage
    // For now, we're using the sample data
    setIsLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        setUser(sampleUser);
        setUserProfile(sampleProfile);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load user data');
      setIsLoading(false);
    }
  }, []);

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => 
      prevUser ? { ...prevUser, ...userData } : null
    );
  };

  // Update profile data
  const updateProfile = (profileData: Partial<UserProfile>) => {
    setUserProfile(prevProfile => 
      prevProfile ? { ...prevProfile, ...profileData } : null
    );
  };

  // Update preferences
  const updatePreferences = (preferencesData: Partial<UserPreferences>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      
      return {
        ...prevUser,
        preferences: {
          ...prevUser.preferences,
          ...preferencesData,
        }
      };
    });
  };

  // Sign out
  const signOut = () => {
    // In a real app, this would clear tokens, etc.
    setUser(null);
    setUserProfile(null);
  };

  // The value that will be provided to consumers of this context
  const value = {
    user,
    userProfile,
    isLoading,
    error,
    updateUser,
    updateProfile,
    updatePreferences,
    signOut,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}; 