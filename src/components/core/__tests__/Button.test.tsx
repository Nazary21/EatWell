import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';
import { PaperProvider } from 'react-native-paper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe.skip('Button', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Button testID="test-button" onPress={() => {}}>Click me</Button>,
      { wrapper: Wrapper }
    );
    
    const button = getByTestId('test-button');
    const text = getByTestId('test-button-text');
    
    expect(button).toBeTruthy();
    expect(text.props.children).toBe('Click me');
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button testID="test-button" onPress={onPress}>Click me</Button>,
      { wrapper: Wrapper }
    );
    
    fireEvent.press(getByTestId('test-button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { getByTestId, queryByTestId } = render(
      <Button testID="test-button" loading onPress={() => {}}>Click me</Button>,
      { wrapper: Wrapper }
    );
    
    expect(getByTestId('test-button-loading')).toBeTruthy();
    expect(queryByTestId('test-button-text')).toBeNull();
  });

  it('disables button when loading', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button testID="test-button" loading onPress={onPress}>Click me</Button>,
      { wrapper: Wrapper }
    );
    
    const button = getByTestId('test-button');
    expect(button.props.disabled).toBe(true);
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies correct styles for different variants', () => {
    const { getByTestId, rerender } = render(
      <Button testID="test-button" variant="primary" onPress={() => {}}>
        Primary
      </Button>,
      { wrapper: Wrapper }
    );

    // Test primary variant
    let button = getByTestId('test-button');
    expect(button.props.style).toContainEqual(expect.objectContaining({
      opacity: 1
    }));

    // Test secondary variant
    rerender(
      <Button testID="test-button" variant="secondary" onPress={() => {}}>
        Secondary
      </Button>
    );
    button = getByTestId('test-button');
    expect(button.props.style).toContainEqual(expect.objectContaining({
      opacity: 1
    }));

    // Test danger variant
    rerender(
      <Button testID="test-button" variant="danger" onPress={() => {}}>
        Danger
      </Button>
    );
    button = getByTestId('test-button');
    expect(button.props.style).toContainEqual(expect.objectContaining({
      opacity: 1
    }));
  });

  it('applies disabled styles correctly', () => {
    const { getByTestId } = render(
      <Button testID="test-button" disabled onPress={() => {}}>
        Disabled
      </Button>,
      { wrapper: Wrapper }
    );

    const button = getByTestId('test-button');
    expect(button.props.style).toContainEqual(expect.objectContaining({
      opacity: 0.6
    }));
  });
}); 