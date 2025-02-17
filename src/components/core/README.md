# Core Components

This directory contains the core UI components following atomic design principles.

## Component Documentation Template

Each component should have its own documentation following this template:

```markdown
# ComponentName

Brief description of the component and its purpose.

## Usage

```tsx
import { ComponentName } from '@/components/core';

function Example() {
  return <ComponentName prop="value" />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop | type | default | description |

## Variants

Describe any variants the component supports (with examples).

## Accessibility

Document accessibility features and considerations.

## Testing

Document testing approach and key test cases.

## Related Components

List related components and when to use each.
```

## Component Organization

Components are organized following atomic design principles:

### Atoms
Basic building blocks of the interface:
- Button
- Text
- Input
- Icon

### Molecules
Combinations of atoms:
- FormField
- SearchBar
- Alert

### Organisms
Complex UI components:
- Form
- Card
- Modal

## Development Guidelines

1. **TypeScript**
   - Use strict typing
   - Export component types
   - Document props with JSDoc

2. **Testing**
   - Write unit tests for all components
   - Include accessibility tests
   - Test all variants and states

3. **Documentation**
   - Follow the template above
   - Include usage examples
   - Document accessibility features

4. **Styling**
   - Use theme tokens
   - Support dark/light modes
   - Follow spacing system

5. **Props**
   - Extend base component types
   - Use consistent naming
   - Provide sensible defaults

## Component Creation Checklist

- [ ] Component implementation with TypeScript
- [ ] Props documentation with JSDoc
- [ ] Unit tests with React Testing Library
- [ ] Usage examples
- [ ] Accessibility implementation
- [ ] Theme integration
- [ ] README documentation
- [ ] Storybook stories (future) 