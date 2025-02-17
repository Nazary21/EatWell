# Button

A versatile button component that supports various styles, sizes, and states. Built on top of React Native Paper's Button component with consistent styling and behavior.

## Usage

```tsx
import { Button } from '@/components/core';

function Example() {
  return (
    <>
      {/* Basic usage */}
      <Button onPress={() => console.log('Pressed!')}>
        Click Me
      </Button>

      {/* With variants */}
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>

      {/* Different sizes */}
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>

      {/* States */}
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button fullWidth>Full Width</Button>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' \| 'danger' | 'primary' | The visual style of the button |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The size of the button |
| fullWidth | boolean | false | Whether the button should take up the full width |
| loading | boolean | false | Shows a loading spinner and disables the button |
| disabled | boolean | false | Whether the button is disabled |
| onPress | () => void | - | Function to call when button is pressed |
| children | React.ReactNode | - | Content to display inside the button |
| style | StyleProp<ViewStyle> | - | Additional styles for the button |
| testID | string | - | Test ID for testing |

## Variants

### Primary
The main call-to-action style. Use for primary actions.
```tsx
<Button variant="primary">Primary Action</Button>
```

### Secondary
Less prominent style. Use for secondary actions.
```tsx
<Button variant="secondary">Secondary Action</Button>
```

### Tertiary
Subtle style. Use for less important actions.
```tsx
<Button variant="tertiary">Tertiary Action</Button>
```

### Danger
Indicates destructive actions.
```tsx
<Button variant="danger">Delete</Button>
```

## Accessibility

- Includes proper role="button"
- Supports keyboard interaction
- Loading state announced to screen readers
- Disabled state properly handled
- Color contrast meets WCAG guidelines

## Testing

Key test cases:
- Renders with different variants
- Handles press events
- Shows loading state
- Disables interaction when loading/disabled
- Maintains accessibility in all states

Example:
```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

test('calls onPress when pressed', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <Button onPress={onPress}>Press Me</Button>
  );
  
  fireEvent.press(getByText('Press Me'));
  expect(onPress).toHaveBeenCalled();
});
```

## Related Components

- **IconButton**: For icon-only buttons
- **LinkButton**: For link-styled buttons
- **FAB**: For floating action buttons 