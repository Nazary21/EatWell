# EatWell Design System

## Overview
EatWell's design system is built on top of Material Design 3 (via React Native Paper) while maintaining the flexibility to implement custom designs. This document outlines our design system's core principles and implementation details.

## Foundation

### Design Tokens

Our design system is built on a foundation of design tokens - primitive values that form the building blocks of our UI.

#### Color Tokens
We use semantic color scales that provide a full range of shades:

```typescript
// Color primitives (examples)
colors: {
  purple: {
    50: '#F4F3FF',  // Lightest
    100: '#EBE9FF',
    // ...
    500: '#6C63FF', // Base
    // ...
    900: '#1F177A'  // Darkest
  },
  red: {
    50: '#FFF3F3',
    // ...
    400: '#FF6B6B', // Base
    // ...
    900: '#7A1717'
  },
  // Additional color scales...
}
```

#### Semantic Color Mapping
These primitive colors are mapped to semantic uses:

```typescript
{
  primary: colors.purple[500],    // Primary actions, key UI elements
  secondary: colors.red[400],     // Secondary actions, highlights
  background: colors.neutral[50], // Main background
  surface: colors.neutral[50],    // Card and elevated surface background
  text: colors.neutral[900],      // Primary text color
  // ... other semantic colors
}
```

#### Spacing Tokens
```typescript
spacing: {
  none: 0,
  xs: 4,    // Tiny gaps
  sm: 8,    // Small padding
  md: 16,   // Standard spacing
  lg: 24,   // Large gaps
  xl: 32,   // Section spacing
  xxl: 48,  // Screen padding
  xxxl: 64, // Major sections
}
```

#### Border Radius Tokens
```typescript
radius: {
  none: 0,
  sm: 4,    // Subtle rounding
  md: 8,    // Standard rounding
  lg: 12,   // Cards, buttons
  xl: 24,   // Modal corners
  full: 9999, // Circular elements
}
```

### Theme Configuration
Our theme system extends Material Design 3 with these tokens:

```typescript
interface CustomTheme extends MD3Theme {
  colors: {
    // Semantic colors mapped from primitives
    primary: string;
    secondary: string;
    // ... other colors
  };
  spacing: typeof spacing;
  roundness: {
    small: number;    // maps to radius.sm
    medium: number;   // maps to radius.md
    large: number;    // maps to radius.lg
    extraLarge: number; // maps to radius.xl
  };
}
```

### Color System

#### Base Colors
```typescript
{
  primary: '#6C63FF',    // Main purple - primary actions, key UI elements
  secondary: '#FF6B6B',  // Red accent - secondary actions, highlights
  background: '#FFFFFF', // Main background
  surface: '#F7F7F7',    // Card and elevated surface background
  text: '#2D3142',      // Primary text color
}
```

#### Semantic Colors
```typescript
{
  accent: '#4CAF50',    // Success states, positive actions
  error: '#FF5252',     // Error states, destructive actions
  warning: '#FFC107',   // Warning states, cautionary actions
  info: '#2196F3',      // Information states, neutral actions
  disabled: '#BDBDBD',  // Disabled states
  placeholder: '#9E9E9E' // Placeholder text
}
```

### Typography

Our type system is based on Material Design's type scale with custom adjustments:

#### Scale
- Display: Large (57px), Medium (45px), Small (36px)
- Headline: Large (32px), Medium (28px), Small (24px)
- Title: Large (22px), Medium (16px), Small (14px)
- Label: Large (14px), Medium (12px), Small (11px)
- Body: Large (16px), Medium (14px), Small (12px)

#### Usage Guidelines
- Display: Hero sections, major features
- Headline: Section headers, screen titles
- Title: Card headers, subsections
- Label: Buttons, tags, metadata
- Body: General content, descriptions

## Component Types

We will build components incrementally as needed, but they will follow these type definitions:

### Base Components
```typescript
interface ThemedComponentProps {
  theme?: CustomTheme;
}
```

### Data Display
```typescript
interface MetricProps {
  value: number | string;
  label: string;
  unit?: string;
  trend?: number;
}

interface ChartProps {
  data: number[];
  labels?: string[];
  height?: number;
  width?: number;
}
```

### Layout Components
```typescript
interface CardProps {
  title?: string;
  subtitle?: string;
  elevation?: number;
  style?: any;
  children?: React.ReactNode;
}
```

### Interactive Elements
```typescript
interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
  status?: 'sent' | 'delivered' | 'read';
}
```

## Implementation Strategy

### 1. Component Development Approach
- Build components only as needed for features
- Start with Material components as base
- Extend and customize as required
- Maintain consistency with design specs

### 2. Theme Integration
```typescript
// Example usage in components
import { useTheme } from 'react-native-paper';
import type { CustomTheme } from '@/lib/theme/types';

function MyComponent() {
  const theme = useTheme<CustomTheme>();
  // Access theme.roundness.medium, theme.colors.primary, etc.
}
```

### 3. Dark Mode Support
- All components should support both light and dark themes
- Use semantic color tokens instead of hard-coded values
- Test components in both modes

## Best Practices

1. **Component Creation**
   - Create components when implementing features
   - Avoid premature abstraction
   - Document component usage and props

2. **Styling**
   - Use theme values for colors, spacing, and typography
   - Maintain consistent spacing and sizing
   - Follow Material Design principles for elevation and hierarchy

3. **Accessibility**
   - Maintain proper contrast ratios
   - Support dynamic text sizing
   - Include proper accessibility labels

## Future Considerations

As we build features, we'll expand this design system to include:

1. **Component Library**
   - Custom navigation elements
   - Data visualization components
   - Form elements
   - Feedback components

2. **Animation Guidelines**
   - Loading states
   - Transitions
   - Micro-interactions

3. **Pattern Library**
   - Common UI patterns
   - Layout templates
   - Navigation patterns

## Usage

### Using Tokens in Components
```typescript
import { useTheme } from 'react-native-paper';
import type { CustomTheme } from '@/lib/theme/types';

function MyComponent() {
  const theme = useTheme<CustomTheme>();
  
  return (
    <View style={{
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness.medium,
    }}>
      {/* Component content */}
    </View>
  );
}
```

### Color Scale Usage
- 50-200: Backgrounds, hover states
- 300-400: Secondary elements
- 500: Primary/base color
- 600-700: Hover/active states
- 800-900: Text, high-contrast elements
