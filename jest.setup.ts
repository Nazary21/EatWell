// Mock React Native Paper components
jest.mock('react-native-paper', () => {
  const RealModule = jest.requireActual('react-native-paper');
  const MockedModule = {
    ...RealModule,
    Text: 'Text',
    TextInput: 'TextInput',
    Button: 'Button',
    ActivityIndicator: 'ActivityIndicator',
    Modal: 'Modal',
    Switch: 'Switch',
    useTheme: () => ({
      colors: {
        primary: '#000',
        onSurfaceVariant: '#666',
        outline: '#999',
      }
    })
  };
  return MockedModule;
});

// Set up timers
jest.useFakeTimers();
global.setTimeout = jest.fn((cb, ms) => {
  cb();
  return {
    unref: jest.fn()
  };
});
global.clearTimeout = jest.fn();
global.setInterval = jest.fn();
global.clearInterval = jest.fn();
global.requestAnimationFrame = jest.fn(cb => cb());
global.cancelAnimationFrame = jest.fn(); 