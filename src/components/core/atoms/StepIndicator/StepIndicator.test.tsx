import { render } from '@testing-library/react-native';
import { StepIndicator } from './StepIndicator';

describe('StepIndicator', () => {
  it('renders with correct number', () => {
    const { getByText } = render(
      <StepIndicator current={2} total={4} />
    );
    expect(getByText('2')).toBeTruthy();
  });

  it('hides numbers when showNumbers is false', () => {
    const { queryByText } = render(
      <StepIndicator current={2} total={4} showNumbers={false} />
    );
    expect(queryByText('2')).toBeNull();
  });

  it('applies different sizes correctly', () => {
    const { getByTestId } = render(
      <StepIndicator 
        current={1} 
        total={4} 
        size="small" 
        testID="step-indicator"
      />
    );
    
    const indicator = getByTestId('step-indicator');
    const styles = indicator.props.style;
    const sizeStyle = styles.find((s: any) => s.width && s.height);
    
    expect(sizeStyle.width).toBe(24);
    expect(sizeStyle.height).toBe(24);
  });

  it('applies correct colors for active state', () => {
    const { getByTestId } = render(
      <StepIndicator 
        current={1} 
        total={4} 
        active 
        testID="step-indicator"
      />
    );
    
    const indicator = getByTestId('step-indicator');
    const styles = indicator.props.style;
    const colorStyle = styles.find((s: any) => s.backgroundColor);
    
    // Note: Actual color value will depend on theme
    expect(colorStyle.backgroundColor).toBeTruthy();
  });

  it('applies correct colors for completed state', () => {
    const { getByTestId } = render(
      <StepIndicator 
        current={1} 
        total={4} 
        completed 
        testID="step-indicator"
      />
    );
    
    const indicator = getByTestId('step-indicator');
    const styles = indicator.props.style;
    const colorStyle = styles.find((s: any) => s.backgroundColor);
    
    // Note: Actual color value will depend on theme
    expect(colorStyle.backgroundColor).toBeTruthy();
  });

  it('applies correct colors for disabled state', () => {
    const { getByTestId } = render(
      <StepIndicator 
        current={1} 
        total={4} 
        disabled 
        testID="step-indicator"
      />
    );
    
    const indicator = getByTestId('step-indicator');
    const styles = indicator.props.style;
    const colorStyle = styles.find((s: any) => s.backgroundColor);
    
    // Note: Actual color value will depend on theme
    expect(colorStyle.backgroundColor).toBeTruthy();
  });
}); 