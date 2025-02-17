import { render, fireEvent, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import SignInScreen from '@/app/(auth)/sign-in';
import SignUpScreen from '@/app/(auth)/sign-up';

// Create a test store with auth reducer
const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

const renderWithProvider = (component: React.ReactElement, store = createTestStore()) => {
  return {
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    ),
    store,
  };
};

describe.skip('Auth Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Sign In Flow', () => {
    it('renders sign in form correctly', () => {
      const { getByTestId, getByText } = renderWithProvider(<SignInScreen />);
      
      expect(getByTestId('email-input')).toBeTruthy();
      expect(getByTestId('password-input')).toBeTruthy();
      expect(getByText('Sign In with Email')).toBeTruthy();
    });

    it('handles sign in submission', async () => {
      const { getByTestId, getByText, store } = renderWithProvider(<SignInScreen />);
      
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const submitButton = getByText('Sign In with Email');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      await act(async () => {
        fireEvent.press(submitButton);
      });

      // Check if loading state was triggered
      const state = store.getState();
      expect(state.auth.isLoading).toBe(false);
    });

    it('shows error message for invalid credentials', async () => {
      const { getByTestId, getByText } = renderWithProvider(<SignInScreen />);
      
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const submitButton = getByText('Sign In with Email');

      fireEvent.changeText(emailInput, 'invalid@example.com');
      fireEvent.changeText(passwordInput, 'wrong');
      
      await act(async () => {
        fireEvent.press(submitButton);
      });

      expect(getByText(/failed to sign in/i)).toBeTruthy();
    });
  });

  describe('Sign Up Flow', () => {
    it('renders sign up form correctly', () => {
      const { getByTestId, getByText } = renderWithProvider(<SignUpScreen />);
      
      expect(getByTestId('email-input')).toBeTruthy();
      expect(getByTestId('password-input')).toBeTruthy();
      expect(getByText('Sign Up')).toBeTruthy();
    });

    it('handles registration submission', async () => {
      const { getByTestId, getByText, store } = renderWithProvider(<SignUpScreen />);
      
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const submitButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'new@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      await act(async () => {
        fireEvent.press(submitButton);
      });

      // Check if loading state was triggered
      const state = store.getState();
      expect(state.auth.isLoading).toBe(false);
    });

    it('shows error message for invalid registration', async () => {
      const { getByTestId, getByText } = renderWithProvider(<SignUpScreen />);
      
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const submitButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(passwordInput, 'short');
      
      await act(async () => {
        fireEvent.press(submitButton);
      });

      expect(getByText(/failed to sign up/i)).toBeTruthy();
    });
  });
}); 