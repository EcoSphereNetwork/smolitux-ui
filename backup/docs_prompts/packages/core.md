# @smolitux/core Package Prompt

**Version: 1.0.0**

This prompt provides specific guidance for working with the `@smolitux/core` package in the Smolitux UI component library.

## Package Overview

The `@smolitux/core` package contains foundational UI components that are used throughout the Smolitux ecosystem. These components form the building blocks for more complex components and features.

## Component Categories

1. **Inputs**: Button, Input, Checkbox, Radio, Select, Textarea
2. **Feedback**: Alert, Toast, Progress, Spinner
3. **Layout**: Card, Container, Divider, Grid
4. **Overlay**: Modal, Drawer, Popover, Tooltip
5. **Navigation**: Tabs, Menu, Breadcrumb, Pagination
6. **Data Display**: Table, List, Badge, Avatar

## Dependencies

The `@smolitux/core` package has minimal external dependencies:

- React and React DOM
- clsx for class name management
- TypeScript for type definitions

It should NOT depend on other Smolitux packages to avoid circular dependencies.

## Design Principles

1. **Simplicity**: Components should be simple and focused
2. **Flexibility**: Components should be customizable via props
3. **Accessibility**: Components should be fully accessible
4. **Performance**: Components should be optimized for performance
5. **Consistency**: Components should follow consistent patterns

## Implementation Guidelines

1. **Component Structure**:
   - Use functional components with React.forwardRef
   - Export both named and default exports
   - Include proper TypeScript interfaces
   - Use JSDoc comments for documentation

2. **Props**:
   - Include common props: className, children, disabled, etc.
   - Use specific event handler types
   - Provide sensible defaults
   - Use union types for variants

3. **Styling**:
   - Use CSS classes with BEM-like naming
   - Support className prop for customization
   - Use CSS variables for theming
   - Ensure responsive behavior

4. **Accessibility**:
   - Include proper ARIA attributes
   - Support keyboard navigation
   - Ensure screen reader compatibility
   - Test with jest-axe

## Testing Requirements

1. **Render Tests**: Verify components render without errors
2. **Prop Tests**: Verify props are applied correctly
3. **Event Tests**: Verify event handlers are called
4. **Accessibility Tests**: Verify accessibility compliance
5. **Ref Tests**: Verify ref forwarding works correctly

## Documentation Requirements

1. **Props Table**: Document all props with types and descriptions
2. **Examples**: Provide examples for common use cases
3. **Variants**: Showcase all component variants
4. **Accessibility**: Document accessibility features
5. **Best Practices**: Provide usage guidelines

## Common Patterns

### Button Component Pattern

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps {
  /** Button content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'smx-button',
          `smx-button--${variant}`,
          `smx-button--${size}`,
          {
            'smx-button--disabled': disabled,
            'smx-button--loading': loading,
          },
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        type={type}
        data-testid="Button"
        {...props}
      >
        {loading ? (
          <span className="smx-button__loading" aria-hidden="true">
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

### Form Component Pattern

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps {
  /** Input value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Input placeholder */
  placeholder?: string;
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  /** Disabled state */
  disabled?: boolean;
  /** Required state */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      type = 'text',
      disabled = false,
      required = false,
      error,
      className,
      name,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="smx-input-wrapper">
        <input
          ref={ref}
          className={clsx(
            'smx-input',
            {
              'smx-input--disabled': disabled,
              'smx-input--error': error,
            },
            className
          )}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          name={name}
          id={id}
          aria-invalid={!!error}
          data-testid="Input"
          {...props}
        />
        {error && (
          <div className="smx-input-error" aria-live="polite">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
```

## Priority Components

Focus on these components first, as they are most widely used:

1. Button
2. Input
3. Card
4. Modal
5. Table
6. Alert
7. Tabs
8. Form
9. Select
10. Checkbox

This package-specific prompt should be combined with the system prompt, task-specific prompts, and templates to create a complete instruction set for developing components in the `@smolitux/core` package.