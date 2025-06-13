# @smolitux/core Package Development Guide

## Package Overview

The `@smolitux/core` package is the foundation of the Smolitux UI component library. It provides the essential building blocks that all other packages depend on.

## Key Components

- **Button**: Primary interaction element
- **Input**: Text input field
- **Checkbox**: Selection control
- **Radio**: Single selection control
- **Select**: Dropdown selection
- **Modal**: Dialog window
- **Tooltip**: Contextual information
- **Badge**: Status indicator
- **Card**: Content container
- **Alert**: Notification element

## Component Requirements

All core components must:

1. **Be fully accessible** (WCAG 2.1 AA compliant)
2. **Support theming** via the `@smolitux/theme` package
3. **Be responsive** across all device sizes
4. **Support keyboard navigation**
5. **Include comprehensive tests** (≥95% coverage)
6. **Include Storybook documentation**

## Development Guidelines

### TypeScript

- Use strict typing (no `any` types)
- Define clear interfaces for all props
- Use discriminated unions for complex props
- Export all types and interfaces

### Styling

- Use CSS-in-JS with emotion
- Follow the design tokens from `@smolitux/theme`
- Support dark/light mode
- Support RTL languages
- Use responsive design patterns

### Accessibility

- Include proper ARIA attributes
- Support keyboard navigation
- Ensure sufficient color contrast
- Test with screen readers
- Add `data-testid` attributes for testing

### Performance

- Memoize components with `React.memo` when appropriate
- Avoid unnecessary re-renders
- Keep bundle size minimal
- Use lazy loading for complex components

## Testing Requirements

Each component must include:

1. **Rendering tests**: Verify the component renders correctly
2. **Props tests**: Verify props are applied correctly
3. **Event tests**: Verify event handlers are called
4. **Accessibility tests**: Verify accessibility compliance
5. **Ref forwarding tests**: Verify ref forwarding works correctly

## Documentation Requirements

Each component must include:

1. **Props documentation**: Clear descriptions of all props
2. **Usage examples**: Basic and advanced usage
3. **Variant showcases**: All available variants
4. **Accessibility notes**: Any special considerations
5. **API reference**: Complete API documentation

## Integration with Other Packages

The core package is used by all other packages. Ensure that:

1. Components are exported correctly
2. Types are exported for external use
3. Dependencies are minimal
4. Breaking changes are avoided

## Quality Checklist

Before marking a component as complete:

- [ ] Component implements all required features
- [ ] TypeScript strict mode passes
- [ ] All tests pass with ≥95% coverage
- [ ] Storybook documentation is complete
- [ ] Accessibility tests pass
- [ ] Bundle size is optimized
- [ ] Code is reviewed and approved