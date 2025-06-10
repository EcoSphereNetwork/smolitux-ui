# Smolitux UI - Testing Package

This document provides package-specific guidance for AI agents working with the `@smolitux/testing` package in the Smolitux UI component library.

## 📋 Package Overview

The `@smolitux/testing` package provides testing utilities for the Smolitux UI component library. These utilities are used throughout the application to test components, hooks, and utilities.

## 🧩 Testing Utility Categories

The testing package includes the following utility categories:

### Render Utilities
- `render`: Render a component with theme provider
- `renderHook`: Render a hook with theme provider
- `renderWithRouter`: Render a component with router
- `renderWithForm`: Render a component with form context

### Mock Utilities
- `mockConsole`: Mock console methods
- `mockFetch`: Mock fetch API
- `mockIntersectionObserver`: Mock IntersectionObserver
- `mockMatchMedia`: Mock matchMedia
- `mockResizeObserver`: Mock ResizeObserver

### Event Utilities
- `fireEvent`: Fire DOM events
- `userEvent`: Simulate user events
- `waitFor`: Wait for element to appear
- `waitForElementToBeRemoved`: Wait for element to be removed
- `act`: Wrap test code in act

### Assertion Utilities
- `toHaveNoViolations`: Jest matcher for axe
- `toBeVisible`: Jest matcher for visibility
- `toBeDisabled`: Jest matcher for disabled state
- `toHaveClass`: Jest matcher for class
- `toHaveStyle`: Jest matcher for style

### Test Data Utilities
- `generateTestId`: Generate test ID
- `generateTestData`: Generate test data
- `generateTestUser`: Generate test user
- `generateTestForm`: Generate test form
- `generateTestTable`: Generate test table

## 🔧 Development Workflow

For each utility in the testing package, follow this workflow:

### 1. Analysis Phase
```bash
UTILITY="render"  # Replace with target

# Quick utility inspection
grep -r "$UTILITY" packages/@smolitux/testing/src
```

### 2. Completion Phase
```bash
# Create or update utility
# Edit the utility file directly
```

### 3. Validation Phase
```bash
# Validate utility
bash scripts/workflows/validate-quality.sh --package testing
```

### 4. Progress Tracking Phase
```bash
# Generate coverage dashboard
bash scripts/workflows/generate-coverage-dashboard.sh
```

## 📊 Testing Utility Requirements

All testing utilities must meet the following requirements:

### Performance
- Optimized implementation
- Minimal dependencies
- Efficient algorithms
- Memoization where appropriate

### TypeScript
- Strict typing
- Comprehensive interfaces
- JSDoc comments
- No `any` types
- Proper generic types

### Testing
- Unit tests
- Edge case tests
- Performance tests
- Browser compatibility tests

### Documentation
- Comprehensive JSDoc comments
- Usage examples
- Parameter documentation
- Return value documentation
- Edge case documentation

## 🚨 Common Issues and Solutions

### Issue: Utility doesn't handle theme provider

**Cause**: Missing theme provider wrapper.

**Solution**:
```typescript
// Add theme provider wrapper
import { ThemeProvider } from '@smolitux/theme';
import { render as rtlRender } from '@testing-library/react';

function render(ui: React.ReactElement, options = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
```

### Issue: Utility doesn't handle router

**Cause**: Missing router wrapper.

**Solution**:
```typescript
// Add router wrapper
import { BrowserRouter } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';

function renderWithRouter(ui: React.ReactElement, options = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
```

### Issue: Utility doesn't handle form context

**Cause**: Missing form context wrapper.

**Solution**:
```typescript
// Add form context wrapper
import { FormProvider, useForm } from 'react-hook-form';
import { render as rtlRender } from '@testing-library/react';

function renderWithForm(ui: React.ReactElement, options = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
```

### Issue: Utility doesn't handle accessibility

**Cause**: Missing accessibility testing.

**Solution**:
```typescript
// Add accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

async function testAccessibility(ui: React.ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
```

## 📚 Additional Resources

- [Testing Package Guidelines](../../docs/wiki/codex/package-specific/testing.md)
- [Component Patterns](../../docs/wiki/codex/component-patterns.md)
- [Troubleshooting](../../docs/wiki/codex/troubleshooting.md)
- [Component Status](../../COMPONENT_STATUS.md)
- [Prompt System](../../prompts/README.md)