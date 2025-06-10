# Smolitux UI - Core Package Guidelines

This document provides guidelines for working with the `@smolitux/core` package in the Smolitux UI component library.

## 📋 Package Overview

The `@smolitux/core` package is the foundation of the Smolitux UI component library. It provides the essential UI components that are used throughout the application. These components are designed to be accessible, customizable, and performant.

## 🧩 Component Categories

The core package includes the following component categories:

### Button Components
- Button
- IconButton
- ButtonGroup
- ToggleButton

### Form Components
- Input
- Checkbox
- Radio
- Select
- Textarea
- Switch
- Slider
- FileUpload
- FormControl
- FormLabel
- FormHelperText
- FormErrorMessage

### Layout Components
- Box
- Flex
- Grid
- Stack
- Divider
- Center
- Container

### Feedback Components
- Alert
- Spinner
- Progress
- Skeleton
- Toast

### Overlay Components
- Modal
- Drawer
- Popover
- Tooltip
- Dialog

### Data Display Components
- Badge
- Card
- List
- Table
- Avatar
- Tag
- Accordion

### Navigation Components
- Breadcrumb
- Menu
- Tabs
- Pagination
- Stepper
- NavBar

## 🔧 Component Development Workflow

For each component in the core package, follow this workflow:

### 1. Analysis Phase (30 seconds)
```bash
COMPONENT="Button"  # Replace with target

# Quick component inspection
ls packages/@smolitux/core/src/components/$COMPONENT/
head -20 packages/@smolitux/core/src/components/$COMPONENT/$COMPONENT.tsx
```

### 2. Implementation Phase (2-3 minutes)
- Ensure proper TypeScript interfaces with JSDoc comments
- Use forwardRef pattern for all components
- Add proper ARIA attributes for accessibility
- Include data-testid attribute for testing

### 3. Testing Phase (2-3 minutes)
- Create comprehensive test suite with jest-axe for accessibility
- Test all component variants and states
- Test user interactions and keyboard navigation
- Test error states and edge cases

### 4. Documentation Phase (2 minutes)
- Create comprehensive Storybook stories
- Document all props with descriptions
- Include usage examples for all variants
- Document accessibility considerations

### 5. Validation Phase (30 seconds)
```bash
# Quick validation per component
npm run lint --workspace=@smolitux/core
npm test --workspace=@smolitux/core -- --testPathPattern="$COMPONENT" --passWithNoTests

# Update progress
echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
```

## 📊 Component Requirements

All core components must meet the following requirements:

### Accessibility
- WCAG 2.1 AA compliance
- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

### Customization
- Theme-aware styling
- Variant support
- Size support
- Color scheme support
- Custom class support

### Performance
- Optimized rendering
- Memoization where appropriate
- Efficient event handling
- Minimal dependencies

### TypeScript
- Strict typing
- Comprehensive interfaces
- JSDoc comments
- No `any` types
- Proper event typing

### Testing
- Unit tests
- Integration tests
- Accessibility tests
- Visual tests
- Edge case tests

### Documentation
- Comprehensive Storybook stories
- Usage examples
- Prop documentation
- Accessibility notes
- Best practices

## 🎯 Implementation Guidelines

### Button Component Example

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';

/**
 * Button sizes
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The variant of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Whether the button is full width */
  fullWidth?: boolean;
  /** Whether the button is loading */
  loading?: boolean;
  /** The icon to display before the button text */
  leftIcon?: React.ReactNode;
  /** The icon to display after the button text */
  rightIcon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Button component
 * 
 * The Button component is used to trigger an action or event, such as submitting a form,
 * opening a dialog, canceling an action, or performing a delete operation.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const buttonClasses = clsx(
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      {
        'btn--full-width': fullWidth,
        'btn--loading': loading,
        'btn--disabled': disabled || loading,
      },
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        type={type}
        data-testid="Button"
        {...props}
      >
        {loading && (
          <span className="btn__spinner" aria-hidden="true">
            {/* Spinner implementation */}
            <svg className="btn__spinner-icon" viewBox="0 0 24 24">
              <circle
                className="btn__spinner-circle"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </span>
        )}
        
        {leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
        
        <span className="btn__text">{children}</span>
        
        {rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

## 🧪 Testing Guidelines

### Button Component Test Example

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByTestId('Button')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('custom-class');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--primary');
    });

    it('renders secondary variant correctly', () => {
      render(<Button variant="secondary">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--secondary');
    });

    it('renders outline variant correctly', () => {
      render(<Button variant="outline">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--outline');
    });

    it('renders ghost variant correctly', () => {
      render(<Button variant="ghost">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--ghost');
    });

    it('renders link variant correctly', () => {
      render(<Button variant="link">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--link');
    });

    it('renders danger variant correctly', () => {
      render(<Button variant="danger">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--danger');
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--md');
    });

    it('renders extra small size correctly', () => {
      render(<Button size="xs">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--xs');
    });

    it('renders small size correctly', () => {
      render(<Button size="sm">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--sm');
    });

    it('renders large size correctly', () => {
      render(<Button size="lg">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--lg');
    });

    it('renders extra large size correctly', () => {
      render(<Button size="xl">Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--xl');
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Click me</Button>);
      expect(screen.getByTestId('Button')).toBeDisabled();
      expect(screen.getByTestId('Button')).toHaveClass('btn--disabled');
    });

    it('handles loading state', () => {
      render(<Button loading>Click me</Button>);
      expect(screen.getByTestId('Button')).toBeDisabled();
      expect(screen.getByTestId('Button')).toHaveClass('btn--loading');
      expect(screen.getByTestId('Button')).toHaveClass('btn--disabled');
    });

    it('handles full width', () => {
      render(<Button fullWidth>Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveClass('btn--full-width');
    });
  });

  // Icon tests
  describe('Icons', () => {
    it('renders left icon correctly', () => {
      render(<Button leftIcon={<span data-testid="left-icon" />}>Click me</Button>);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('left-icon').parentElement).toHaveClass('btn__icon--left');
    });

    it('renders right icon correctly', () => {
      render(<Button rightIcon={<span data-testid="right-icon" />}>Click me</Button>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon').parentElement).toHaveClass('btn__icon--right');
    });

    it('renders both icons correctly', () => {
      render(
        <Button
          leftIcon={<span data-testid="left-icon" />}
          rightIcon={<span data-testid="right-icon" />}
        >
          Click me
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByTestId('Button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Click me</Button>);

      await user.click(screen.getByTestId('Button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('prevents click when loading', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} loading>Click me</Button>);

      await user.click(screen.getByTestId('Button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Type tests
  describe('Types', () => {
    it('has button type by default', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByTestId('Button')).toHaveAttribute('type', 'button');
    });

    it('can have submit type', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByTestId('Button')).toHaveAttribute('type', 'submit');
    });

    it('can have reset type', () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByTestId('Button')).toHaveAttribute('type', 'reset');
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click me</Button>);
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByTestId('Button'));
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Button disabled>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when loading', async () => {
      const { container } = render(<Button loading>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

## 📚 Documentation Guidelines

### Button Component Story Example

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
        component: 'The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'danger'],
      description: 'The visual style of the button',
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'md' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take up the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    leftIcon: {
      control: { type: 'text' },
      description: 'Icon to display before the button text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'Icon to display after the button text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
      table: {
        type: { summary: 'function' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the button',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Button component comes in several variants to express different visual styles.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Button component comes in different sizes to fit various UI contexts.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button fullWidth>Full Width</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Button component can be in different states: normal, disabled, or loading.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        Left Icon
      </Button>
      <Button
        rightIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        Right Icon
      </Button>
      <Button
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        rightIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        Both Icons
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Button component can include icons before and/or after the text.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this playground to experiment with the Button component props.',
      },
    },
  },
};
```

## 🚨 Common Issues and Solutions

### Issue: Component renders incorrectly

**Cause**: Missing or incorrect CSS classes.

**Solution**:
```typescript
// Use clsx for conditional classes
import { clsx } from 'clsx';

const componentClasses = clsx(
  'base-class',
  `variant-class--${variant}`,
  {
    'state-class': state,
  },
  className
);
```

### Issue: Component doesn't forward ref

**Cause**: Missing or incorrect ref forwarding.

**Solution**:
```typescript
// Use forwardRef for all components
import React, { forwardRef } from 'react';

export const Component = forwardRef<HTMLElement, ComponentProps>(
  (props, ref) => {
    return <element ref={ref} {...props} />;
  }
);
```

### Issue: Component doesn't handle keyboard navigation

**Cause**: Missing keyboard event handlers.

**Solution**:
```typescript
// Add keyboard event handlers
const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onClick?.(event as unknown as React.MouseEvent<HTMLElement>);
  }
};

return <element onKeyDown={handleKeyDown} tabIndex={0} {...props} />;
```

### Issue: Component doesn't handle accessibility

**Cause**: Missing ARIA attributes.

**Solution**:
```typescript
// Add ARIA attributes
return (
  <element
    aria-label={ariaLabel}
    aria-disabled={disabled}
    aria-expanded={expanded}
    aria-controls={controlsId}
    {...props}
  />
);
```

These guidelines provide a solid foundation for working with the `@smolitux/core` package in the Smolitux UI component library. For more information, refer to the [Component Patterns](../component-patterns.md) and [Troubleshooting](../troubleshooting.md) documentation.