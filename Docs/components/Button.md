# Button Component

## Purpose
A customizable button component that provides consistent styling and behavior across the app. Built on top of React Native Paper's Button component with our theme integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'danger' | 'primary' | Visual style variant |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Button size |
| fullWidth | boolean | false | Whether button takes full width |
| loading | boolean | false | Shows loading spinner |
| disabled | boolean | false | Disables button interactions |
| onPress | () => void | - | Press handler |
| children | React.ReactNode | - | Button content |

Plus all other React Native Paper Button props (except 'theme').

## Usage Examples

### Basic Usage
```tsx
import { Button } from '@/components/core/Button';

// Primary button (default)
<Button onPress={handlePress}>
  Click Me
</Button>

// Secondary button
<Button 
  variant="secondary"
  onPress={handlePress}
>
  Cancel
</Button>

// Danger button
<Button 
  variant="danger"
  onPress={handleDelete}
>
  Delete
</Button>
```

### Size Variants
```tsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### Loading State
```tsx
<Button 
  loading={isSubmitting}
  onPress={handleSubmit}
>
  Submit
</Button>
```

### Full Width
```tsx
<Button fullWidth>
  Full Width Button
</Button>
```

## Accessibility
- Minimum touch target size: 44x44 points
- Loading state is announced to screen readers
- Disabled state is properly conveyed
- Color contrast meets WCAG guidelines
- Haptic feedback on press

## Design Guidelines
- Use primary buttons for main actions
- Use secondary buttons for alternative actions
- Use danger buttons sparingly, only for destructive actions
- Maintain consistent spacing around buttons
- Group related buttons together
- Consider button hierarchy in layouts

## Best Practices
✅ Do:
- Use clear, action-oriented labels
- Keep button text concise
- Use loading state for async actions
- Group related buttons consistently
- Consider mobile touch targets

❌ Don't:
- Use multiple primary buttons in one view
- Disable buttons without explanation
- Use danger variant for non-destructive actions
- Nest buttons within buttons
- Use full-width for inline buttons

## Implementation Notes
- Built on React Native Paper's Button
- Integrated with app theme system
- Consistent with Material Design guidelines
- Optimized for performance
- Type-safe implementation 