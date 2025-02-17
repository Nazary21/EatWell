# StepIndicator

A circular indicator component that shows progress in a multi-step flow. Supports different states (active, completed, disabled) and sizes.

## Usage

```tsx
import { StepIndicator } from '@/components/core/atoms';

function Example() {
  return (
    <>
      {/* Basic usage */}
      <StepIndicator current={1} total={4} />

      {/* Different states */}
      <StepIndicator current={1} total={4} active />
      <StepIndicator current={1} total={4} completed />
      <StepIndicator current={1} total={4} disabled />

      {/* Different sizes */}
      <StepIndicator current={1} total={4} size="small" />
      <StepIndicator current={1} total={4} size="medium" />
      <StepIndicator current={1} total={4} size="large" />

      {/* Without numbers */}
      <StepIndicator current={1} total={4} showNumbers={false} />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| current | number | - | Current step number |
| total | number | - | Total number of steps |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Size of the indicator |
| showNumbers | boolean | true | Whether to show step numbers |
| active | boolean | false | Whether this step is active |
| completed | boolean | false | Whether this step is completed |
| disabled | boolean | false | Whether the indicator is disabled |
| style | StyleProp<ViewStyle> | - | Additional styles |
| testID | string | - | Test ID for testing |

## States

### Active
Indicates the current step:
```tsx
<StepIndicator current={2} total={4} active />
```

### Completed
Shows a completed step:
```tsx
<StepIndicator current={1} total={4} completed />
```

### Disabled
Shows a disabled step:
```tsx
<StepIndicator current={3} total={4} disabled />
```

## Sizes

- **Small**: 24px (compact views)
- **Medium**: 32px (default)
- **Large**: 40px (prominent displays)

## Accessibility

- Uses semantic colors for different states
- Maintains proper color contrast
- Supports screen reader announcements
- Includes proper ARIA attributes

## Testing

Key test cases:
- Renders with different states (active, completed, disabled)
- Shows/hides numbers correctly
- Applies different sizes properly
- Maintains accessibility in all states

Example:
```tsx
import { render } from '@testing-library/react-native';
import { StepIndicator } from './StepIndicator';

test('renders with correct number', () => {
  const { getByText } = render(
    <StepIndicator current={2} total={4} />
  );
  expect(getByText('2')).toBeTruthy();
});
```

## Related Components

- **ProgressBar**: For linear progress indication
- **StepHeader**: Contains StepIndicator with additional information
- **OnboardingStep**: Uses StepIndicator in onboarding flow 