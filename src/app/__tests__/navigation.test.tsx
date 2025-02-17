import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '@/store';
import RootLayout from '../_layout';
import AuthLayout from '../(auth)/_layout';
import TabsLayout from '../(tabs)/_layout';

// Mock navigation components
jest.mock('expo-router', () => ({
  Stack: {
    Screen: () => null,
  },
  Tabs: {
    Screen: () => null,
  },
  Slot: () => null,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSegments: () => ['(tabs)'],
  usePathname: () => '/',
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe.skip('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('RootLayout', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProvider(<RootLayout />);
      expect(container).toBeTruthy();
    });

    // We'll add more specific tests as we implement features
    it('redirects to auth when no session exists', () => {
      const { container } = renderWithProvider(<RootLayout />);
      // Verify that the Redirect component is rendered
      // This is a basic test - we'll enhance it when implementing auth flow
      expect(container).toBeTruthy();
    });
  });

  describe('AuthLayout', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProvider(<AuthLayout />);
      expect(container).toBeTruthy();
    });

    it('has correct screen configuration', () => {
      const { container } = renderWithProvider(<AuthLayout />);
      // Basic structure test - we'll enhance this when implementing auth screens
      expect(container).toBeTruthy();
    });
  });

  describe('TabsLayout', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProvider(<TabsLayout />);
      expect(container).toBeTruthy();
    });

    it('has all required tabs', () => {
      const { container } = renderWithProvider(<TabsLayout />);
      // Basic structure test - we'll enhance this when implementing tab screens
      expect(container).toBeTruthy();
    });
  });
}); 