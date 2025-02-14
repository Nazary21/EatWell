import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={MD3LightTheme}>
    {children}
  </PaperProvider>
);

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Button onPress={() => {}}>Click me</Button>,
      { wrapper: Wrapper }
    );
    
    expect(getByText('Click me')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Click me</Button>,
      { wrapper: Wrapper }
    );
    
    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { getByTestId } = render(
      <Button loading onPress={() => {}}>Click me</Button>,
      { wrapper: Wrapper }
    );
    
    expect(getByTestId('button-loading')).toBeTruthy();
  });

  it('disables button when loading', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button loading onPress={onPress}>Click me</Button>,
      { wrapper: Wrapper }
    );
    
    fireEvent.press(getByText('Click me'));
    expect(onPress).not.toHaveBeenCalled();
  });
}); 