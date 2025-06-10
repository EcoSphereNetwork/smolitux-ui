# @smolitux/core - Codex Development Guide

**Package-specific guide for AI agents working on the @smolitux/core package**

## 📋 Package Overview

The `@smolitux/core` package contains foundational UI components that are used throughout the Smolitux ecosystem. These components form the building blocks for more complex components and features.

## 🧩 Component Categories

1. **Inputs**: Button, Input, Checkbox, Radio, Select, Textarea
2. **Feedback**: Alert, Toast, Progress, Spinner
3. **Layout**: Card, Container, Divider, Grid
4. **Overlay**: Modal, Drawer, Popover, Tooltip
5. **Navigation**: Tabs, Menu, Breadcrumb, Pagination
6. **Data Display**: Table, List, Badge, Avatar

## 🔄 Dependencies

The `@smolitux/core` package has minimal external dependencies:

- React and React DOM
- clsx for class name management
- TypeScript for type definitions

It should NOT depend on other Smolitux packages to avoid circular dependencies.

## 🎯 Priority Components

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

## 🔧 Implementation Patterns

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

## 🧪 Testing Patterns

### Button Test Pattern

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Test</Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('custom-class');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    
    await user.click(screen.getByTestId('Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Test</Button>);
    
    await user.click(screen.getByTestId('Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 📚 Documentation Patterns

### Button Story Pattern

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
```

## 🚀 Development Workflow

1. **Analysis**: Check current state of the component
2. **Implementation**: Develop the component following the patterns
3. **Testing**: Write comprehensive tests
4. **Documentation**: Create Storybook stories
5. **Validation**: Ensure the component meets quality standards

## 📚 Additional Resources

- [Main Development Guide](/AGENTS.md)
- [Core Component Templates](/docs/prompts/templates/component.md)
- [Core Package Prompt](/docs/prompts/packages/core.md)

For more detailed guidance, use the prompt builder:

```bash
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package core --task component-development --template component
```