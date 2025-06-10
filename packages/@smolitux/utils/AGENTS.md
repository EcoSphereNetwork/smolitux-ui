# Smolitux UI - Utils Package

This document provides package-specific guidance for AI agents working with the `@smolitux/utils` package in the Smolitux UI component library.

## 📋 Package Overview

The `@smolitux/utils` package provides utility functions for the Smolitux UI component library. These utilities are used throughout the application to handle common tasks such as formatting, validation, and DOM manipulation.

## 🧩 Utility Categories

The utils package includes the following utility categories:

### DOM Utilities
- `getElementPosition`: Get the position of an element
- `getScrollPosition`: Get the scroll position of the window
- `isElementInViewport`: Check if an element is in the viewport
- `focusElement`: Focus an element
- `trapFocus`: Trap focus within an element

### Format Utilities
- `formatDate`: Format a date
- `formatNumber`: Format a number
- `formatCurrency`: Format a currency
- `formatPercentage`: Format a percentage
- `formatFileSize`: Format a file size

### Validation Utilities
- `isEmail`: Check if a string is a valid email
- `isURL`: Check if a string is a valid URL
- `isPhoneNumber`: Check if a string is a valid phone number
- `isNumeric`: Check if a string is numeric
- `isAlphanumeric`: Check if a string is alphanumeric

### Object Utilities
- `deepMerge`: Deep merge two objects
- `deepClone`: Deep clone an object
- `omit`: Omit properties from an object
- `pick`: Pick properties from an object
- `isEqual`: Check if two objects are equal

### Array Utilities
- `chunk`: Split an array into chunks
- `unique`: Get unique values from an array
- `flatten`: Flatten an array
- `groupBy`: Group an array by a key
- `sortBy`: Sort an array by a key

### String Utilities
- `capitalize`: Capitalize a string
- `truncate`: Truncate a string
- `slugify`: Convert a string to a slug
- `camelCase`: Convert a string to camelCase
- `kebabCase`: Convert a string to kebab-case

### Color Utilities
- `hexToRgb`: Convert a hex color to RGB
- `rgbToHex`: Convert an RGB color to hex
- `darken`: Darken a color
- `lighten`: Lighten a color
- `getContrastColor`: Get a contrast color

### Accessibility Utilities
- `getAriaLabel`: Get an ARIA label for an element
- `getAriaDescribedBy`: Get an ARIA describedby for an element
- `getAriaLabelledBy`: Get an ARIA labelledby for an element
- `getAriaControls`: Get an ARIA controls for an element
- `getAriaExpanded`: Get an ARIA expanded for an element

## 🔧 Development Workflow

For each utility in the utils package, follow this workflow:

### 1. Analysis Phase
```bash
UTILITY="formatDate"  # Replace with target

# Quick utility inspection
grep -r "$UTILITY" packages/@smolitux/utils/src
```

### 2. Completion Phase
```bash
# Create or update utility
# Edit the utility file directly
```

### 3. Validation Phase
```bash
# Validate utility
bash scripts/workflows/validate-quality.sh --package utils
```

### 4. Progress Tracking Phase
```bash
# Generate coverage dashboard
bash scripts/workflows/generate-coverage-dashboard.sh
```

## 📊 Utility Requirements

All utils utilities must meet the following requirements:

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

### Issue: Utility doesn't handle edge cases

**Cause**: Missing edge case handling.

**Solution**:
```typescript
// Add edge case handling
function formatDate(date: Date | string | number): string {
  // Handle invalid input
  if (!date) {
    return '';
  }

  // Handle different input types
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;

  // Handle invalid date
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  // Format date
  return dateObj.toLocaleDateString();
}
```

### Issue: Utility doesn't handle browser compatibility

**Cause**: Using modern APIs without fallbacks.

**Solution**:
```typescript
// Add browser compatibility
function isElementInViewport(element: HTMLElement): boolean {
  // Use IntersectionObserver if available
  if ('IntersectionObserver' in window) {
    return useIntersectionObserver(element);
  }

  // Fallback for older browsers
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

### Issue: Utility doesn't handle performance

**Cause**: Inefficient implementation.

**Solution**:
```typescript
// Add memoization
const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Use memoization for expensive operations
const expensiveOperation = memoize((input: string) => {
  // Expensive operation
  return input.split('').reverse().join('');
});
```

### Issue: Utility doesn't handle accessibility

**Cause**: Missing accessibility considerations.

**Solution**:
```typescript
// Add accessibility considerations
function getAriaLabel(element: HTMLElement): string {
  // Check for aria-label attribute
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) {
    return ariaLabel;
  }

  // Check for aria-labelledby attribute
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy);
    if (labelElement) {
      return labelElement.textContent || '';
    }
  }

  // Check for label element
  if (element.id) {
    const labelElement = document.querySelector(`label[for="${element.id}"]`);
    if (labelElement) {
      return labelElement.textContent || '';
    }
  }

  // Fallback to title attribute
  return element.title || '';
}
```

## 📚 Additional Resources

- [Utils Package Guidelines](../../docs/wiki/codex/package-specific/utils.md)
- [Component Patterns](../../docs/wiki/codex/component-patterns.md)
- [Troubleshooting](../../docs/wiki/codex/troubleshooting.md)
- [Component Status](../../COMPONENT_STATUS.md)
- [Prompt System](../../prompts/README.md)