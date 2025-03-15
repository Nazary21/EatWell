# EatWell Design System

## Overview

The EatWell app uses a comprehensive design system built on top of React Native Paper. This documentation explains the key concepts, components, and usage patterns.

## Design Tokens

Design tokens are the fundamental building blocks of our visual design. They represent the smallest elements of the design system and are used to create a consistent look and feel across the app.

### Color Tokens

Our color system is organized into three levels:

1. **Primitive Colors**: Base color scales (purple, green, neutral, etc.)
2. **Semantic Colors**: Purpose-based colors (primary, secondary, background, etc.)
3. **Component Colors**: Specific colors for UI components

#### Primary Purple Scale
- Used for primary actions, headers, and key UI elements
- Range from 50 (lightest) to 900 (darkest)

#### Secondary Green Scale
- Used for success states, positive feedback, and secondary actions
- Range from 50 (lightest) to 900 (darkest)

#### Accent Red Scale
- Used for errors, warnings, and destructive actions
- Range from 50 (lightest) to 900 (darkest)

#### Neutral Scale (Grays)
- Used for text, backgrounds, dividers
- Range from 50 (lightest) to 900 (darkest)

### Spacing

We use a consistent spacing scale throughout the app:

- `xs`: 4px - Minimal spacing, used for tight UIs
- `sm`: 8px - Standard small spacing
- `md`: 16px - Default spacing for most elements
- `lg`: 24px - Larger separation between sections
- `xl`: 32px - Major section dividers
- `xxl`: 48px - Screen padding or major elements separation

### Typography

Typography scale follows a similar naming convention:

- Size: xs, sm, md, lg, xl, xxl, xxxl, display
- Weight: regular, medium, semiBold, bold
- Letter Spacing: tight, normal, wide, wider, widest

### Border Radius

- `none`: 0
- `xs`: 2px
- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `xxl`: 24px
- `full`: 9999px (for circles/pills)

### Elevation (Shadows)

- `none`: No shadow
- `xs`: Subtle shadow
- `sm`: Light shadow
- `md`: Medium shadow
- `lg`: Pronounced shadow
- `xl`: Heavy shadow

## Using the Theme System

### The `useTheme` Hook

The primary way to access the theme in components is through the `useTheme` hook:

```tsx
import { useTheme } from '@/lib/theme/useTheme';

const MyComponent = () => {
  const theme = useTheme();
  
  // Now you can access tokens:
  const backgroundColor = theme.colors.neutral[50];
  const spacing = theme.spacing.md;
  
  return (
    <View style={{ 
      backgroundColor, 
      padding: spacing 
    }}>
      {/* Component content */}
    </View>
  );
};
```

### Component Styles

The theme includes pre-defined styles for common components:

```tsx
import { useTheme } from '@/lib/theme/useTheme';

const MyComponent = () => {
  const theme = useTheme();
  
  // Access component styles:
  const cardStyle = theme.components.card.elevated;
  
  return (
    <View style={cardStyle}>
      {/* Card content */}
    </View>
  );
};
```

### Core UI Components

We provide a set of core UI components that are pre-styled with our design tokens:

- `Button`: For actions and commands
- `Card`: For content containers
- `Badge`: For status indicators
- And many more...

Example:

```tsx
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const MyScreen = () => {
  return (
    <Card variant="elevated">
      <Text>Card content</Text>
      <Button variant="primary" onPress={() => {}}>
        Primary Action
      </Button>
    </Card>
  );
};
```

## Dark Mode Support

The design system automatically supports dark mode with appropriate color mappings. When the theme mode changes, semantic color tokens are updated to reflect the appropriate light or dark values.

## Best Practices

1. **Always use tokens:** Avoid hardcoded values for colors, spacing, etc.
2. **Use semantic colors:** Use tokens like `primary` instead of directly accessing `purple[500]`
3. **Responsive design:** Use responsive sizing for different screen sizes
4. **Consistent components:** Use the provided UI components for consistency
5. **Extend, don't override:** Build on top of the existing system rather than creating one-off styles

## Future Improvements

- Animation system
- Responsive layouts for tablet
- Additional component variants
- Accessibility enhancements 