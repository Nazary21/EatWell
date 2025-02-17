# Testing Patterns

This document outlines the testing patterns and best practices for the CalTrackerReact project.

## 🎯 Testing Goals

1. **Reliability**: Ensure the application works as expected
2. **Maintainability**: Keep tests easy to understand and maintain
3. **Coverage**: Focus on critical paths and core functionality
4. **Performance**: Keep test suite execution time reasonable

## 📋 Test Types

### 1. Unit Tests
- Test individual components and functions
- Focus on isolated behavior
- Use mocks for external dependencies
- Located in `__tests__` directories next to the code being tested

Example:
```typescript
describe('Component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Component />);
    expect(getByTestId('component')).toBeTruthy();
  });
});
```

### 2. Integration Tests
- Test component interactions
- Test Redux store integration
- Test navigation flows
- Located in feature-specific test directories

Example:
```typescript
describe('Feature Flow', () => {
  it('should complete the flow', async () => {
    const { getByTestId, store } = renderWithProvider(<FeatureComponent />);
    await act(async () => {
      fireEvent.press(getByTestId('button'));
    });
    expect(store.getState().feature.completed).toBe(true);
  });
});
```

### 3. Redux Tests
- Test reducers independently
- Test action creators
- Test async thunks
- Located in `store/__tests__` directory

Example:
```typescript
describe('featureSlice', () => {
  it('should handle action', () => {
    const initialState = { value: 0 };
    const nextState = reducer(initialState, action());
    expect(nextState.value).toBe(1);
  });
});
```

## 🛠 Testing Utilities

### 1. Test Providers
```typescript
const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};
```

### 2. Common Mocks
```typescript
// Navigation mock
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

// AsyncStorage mock
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
```

## 📝 Naming Conventions

1. Test files: `*.test.tsx` or `*.test.ts`
2. Test suites: Describe the component/feature being tested
3. Test cases: Should start with "should" and describe expected behavior
4. Test IDs: Use kebab-case and be descriptive

## 🎨 Component Testing Pattern

```typescript
describe('ComponentName', () => {
  // Setup
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Rendering
  it('should render correctly', () => {
    const { getByTestId } = render(<Component />);
    expect(getByTestId('component')).toBeTruthy();
  });

  // Props
  it('should handle props correctly', () => {
    const { rerender, getByText } = render(<Component text="Hello" />);
    expect(getByText('Hello')).toBeTruthy();
    
    rerender(<Component text="World" />);
    expect(getByText('World')).toBeTruthy();
  });

  // User Interactions
  it('should handle user interactions', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<Component onPress={onPress} />);
    fireEvent.press(getByTestId('button'));
    expect(onPress).toHaveBeenCalled();
  });

  // Async Operations
  it('should handle async operations', async () => {
    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.press(getByTestId('async-button'));
    });
    expect(getByTestId('result')).toBeTruthy();
  });
});
```

## 🚨 Error Handling Testing

1. Test error states
2. Test loading states
3. Test edge cases
4. Test validation

Example:
```typescript
it('should handle errors', async () => {
  const { getByTestId, getByText } = render(<Component />);
  
  // Trigger error state
  await act(async () => {
    fireEvent.press(getByTestId('error-button'));
  });
  
  expect(getByText('Error message')).toBeTruthy();
});
```

## 🔄 Redux Testing Pattern

```typescript
describe('Redux Flow', () => {
  // Test store setup
  const store = configureStore({
    reducer: {
      feature: featureReducer,
    },
  });

  // Action creators
  it('should create actions', () => {
    const action = createAction('payload');
    expect(action.type).toBe('feature/action');
    expect(action.payload).toBe('payload');
  });

  // Reducers
  it('should handle state changes', () => {
    const initialState = { value: 0 };
    const nextState = reducer(initialState, increment());
    expect(nextState.value).toBe(1);
  });

  // Async thunks
  it('should handle async operations', async () => {
    await store.dispatch(asyncThunk());
    expect(store.getState().feature.loading).toBe(false);
  });
});
```

## 🏃‍♂️ Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test path/to/file.test.ts

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🎯 Test Coverage Goals

- Components: 80% coverage
- Redux: 90% coverage
- Utils: 90% coverage
- Critical paths: 100% coverage

## 🚫 What Not to Test

1. Third-party components (unless wrapped)
2. Configuration files
3. Constants
4. Pure styling
5. Generated code

## 📈 Performance Considerations

1. Use `beforeAll` for expensive setup
2. Mock heavy computations
3. Use `describe.skip` for WIP tests
4. Keep test files focused and organized

## 🔄 Continuous Integration

Tests are run on:
1. Pull requests
2. Merges to main
3. Release builds

## 📚 Resources

1. [Jest Documentation](https://jestjs.io/docs/getting-started)
2. [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
3. [Redux Testing](https://redux.js.org/usage/writing-tests)

## 🔄 Updates

This document should be updated when:
1. New testing patterns are established
2. Best practices change
3. New testing tools are added
4. Common issues are discovered 