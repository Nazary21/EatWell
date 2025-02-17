import '@testing-library/jest-native/extend-expect';

// Mock React Native Paper theme
jest.mock('react-native-paper', () => ({
  useTheme: () => ({
    colors: {
      primary: '#8b5cf6',
      background: '#FFFFFF',
      error: '#ef4444',
    },
  }),
  Button: 'Button',
  TextInput: 'TextInput',
  PaperProvider: 'PaperProvider',
}));

// Mock Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  Link: 'Link',
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);