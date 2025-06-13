# @smolitux/theme Package Development Guide

## Package Overview

The `@smolitux/theme` package provides the design system foundation for the Smolitux UI library. It defines design tokens, color palettes, typography, spacing, and other visual aspects that ensure consistency across all components.

## Key Components

- **ThemeProvider**: Context provider for theme values
- **useTheme**: Hook for accessing theme values
- **ColorTokens**: Color palette definitions
- **TypographyTokens**: Typography definitions
- **SpacingTokens**: Spacing scale definitions
- **BorderTokens**: Border radius and width definitions
- **ShadowTokens**: Shadow definitions
- **ZIndexTokens**: Z-index scale definitions
- **DarkModeToggle**: Component for toggling dark mode
- **GlobalStyles**: Global CSS styles

## Component Requirements

All theme components must:

1. **Be fully typed** with TypeScript
2. **Support light and dark modes**
3. **Be accessible** (WCAG 2.1 AA compliant)
4. **Include comprehensive tests** (≥95% coverage)
5. **Include Storybook documentation**

## Development Guidelines

### TypeScript

- Use strict typing (no `any` types)
- Define clear interfaces for all tokens
- Export all types and interfaces
- Use discriminated unions for complex types

### Theming

- Use CSS variables for theme values
- Support both light and dark modes
- Support custom theme overrides
- Ensure sufficient color contrast
- Use semantic color naming

### Performance

- Memoize theme context values
- Avoid unnecessary re-renders
- Keep bundle size minimal

## Testing Requirements

Each component must include:

1. **Rendering tests**: Verify the component renders correctly
2. **Theme switching tests**: Verify theme switching works correctly
3. **Custom theme tests**: Verify custom themes can be applied
4. **Hook tests**: Verify hooks return correct values
5. **Context tests**: Verify context provides correct values

## Documentation Requirements

Each component must include:

1. **Props documentation**: Clear descriptions of all props
2. **Usage examples**: Basic and advanced usage
3. **Theme customization examples**: How to customize themes
4. **API reference**: Complete API documentation

## Integration with Other Packages

The theme package is used by all other packages. Ensure that:

1. Theme values are exported correctly
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