# Component Template

**Version: 1.0.0**

This template provides a standardized structure for creating components in the Smolitux UI library.

## Basic Component Template

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the {{ComponentName}} component
 */
export interface {{ComponentName}}Props {
  /** Content to display inside the component */
  children?: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

/**
 * {{ComponentName}} component
 *
 * @description
 * A brief description of the component's purpose and usage.
 *
 * @example
 * ```tsx
 * <{{ComponentName}} variant="primary">Content</{{ComponentName}}>
 * ```
 */
export const {{ComponentName}} = forwardRef<HTMLElement, {{ComponentName}}Props>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      onClick,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    return (
      <element
        ref={ref}
        className={clsx(
          'smx-{{componentName}}',
          `smx-{{componentName}}--${variant}`,
          `smx-{{componentName}}--${size}`,
          {
            'smx-{{componentName}}--disabled': disabled,
          },
          className
        )}
        disabled={disabled}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-disabled={disabled}
        data-testid="{{ComponentName}}"
        {...props}
      >
        {children}
      </element>
    );
  }
);

{{ComponentName}}.displayName = '{{ComponentName}}';

export default {{ComponentName}};
```

## Test Template

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { {{ComponentName}} } from './{{ComponentName}}';

expect.extend(toHaveNoViolations);

describe('{{ComponentName}}', () => {
  // Rendering tests
  it('renders without crashing', () => {
    render(<{{ComponentName}}>Test</{{ComponentName}}>);
    expect(screen.getByTestId('{{ComponentName}}')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<{{ComponentName}}>Test Content</{{ComponentName}}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<{{ComponentName}} className="custom-class">Test</{{ComponentName}}>);
    expect(screen.getByTestId('{{ComponentName}}')).toHaveClass('custom-class');
  });

  // Variant tests
  it('applies the correct variant class', () => {
    render(<{{ComponentName}} variant="secondary">Test</{{ComponentName}}>);
    expect(screen.getByTestId('{{ComponentName}}')).toHaveClass('smx-{{componentName}}--secondary');
  });

  // Size tests
  it('applies the correct size class', () => {
    render(<{{ComponentName}} size="lg">Test</{{ComponentName}}>);
    expect(screen.getByTestId('{{ComponentName}}')).toHaveClass('smx-{{componentName}}--lg');
  });

  // Disabled state tests
  it('applies disabled state correctly', () => {
    render(<{{ComponentName}} disabled>Test</{{ComponentName}}>);
    const element = screen.getByTestId('{{ComponentName}}');
    expect(element).toHaveClass('smx-{{componentName}}--disabled');
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  // Interaction tests
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<{{ComponentName}} onClick={handleClick}>Test</{{ComponentName}}>);
    
    await user.click(screen.getByTestId('{{ComponentName}}'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<{{ComponentName}} onClick={handleClick} disabled>Test</{{ComponentName}}>);
    
    await user.click(screen.getByTestId('{{ComponentName}}'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Focus tests
  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(
      <{{ComponentName}} onFocus={handleFocus} onBlur={handleBlur}>
        Test
      </{{ComponentName}}>
    );
    
    const element = screen.getByTestId('{{ComponentName}}');
    await user.tab();
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Ref tests
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<{{ComponentName}} ref={ref}>Test</{{ComponentName}}>);
    expect(ref.current).not.toBeNull();
  });

  // Accessibility tests
  it('has no accessibility violations', async () => {
    const { container } = render(<{{ComponentName}}>Test</{{ComponentName}}>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { {{ComponentName}} } from './{{ComponentName}}';

const meta: Meta<typeof {{ComponentName}}> = {
  title: 'Components/{{PackageName}}/{{ComponentName}}',
  component: {{ComponentName}},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
{{ComponentName}} is a versatile component that supports multiple variants and sizes.

## Features
- Multiple variants (primary, secondary, tertiary, danger)
- Multiple sizes (sm, md, lg)
- Disabled state
- Full accessibility support
- Event handling for click, focus, and blur
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: 'Visual variant of the component',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the component',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
    },
    children: {
      control: { type: 'text' },
      description: 'Content to display inside the component',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
    onFocus: {
      action: 'focused',
      description: 'Focus event handler',
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default {{ComponentName}}',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary {{ComponentName}}',
    variant: 'secondary',
    size: 'md',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary {{ComponentName}}',
    variant: 'tertiary',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger {{ComponentName}}',
    variant: 'danger',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small {{ComponentName}}',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium {{ComponentName}}',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large {{ComponentName}}',
    variant: 'primary',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled {{ComponentName}}',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <{{ComponentName}} variant="primary">Primary</{{ComponentName}}>
        <{{ComponentName}} variant="secondary">Secondary</{{ComponentName}}>
        <{{ComponentName}} variant="tertiary">Tertiary</{{ComponentName}}>
        <{{ComponentName}} variant="danger">Danger</{{ComponentName}}>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <{{ComponentName}} size="sm">Small</{{ComponentName}}>
        <{{ComponentName}} size="md">Medium</{{ComponentName}}>
        <{{ComponentName}} size="lg">Large</{{ComponentName}}>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <{{ComponentName}} disabled>Disabled</{{ComponentName}}>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Interactive {{ComponentName}}',
    variant: 'primary',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive example of the {{ComponentName}} component.',
      },
    },
  },
};
```

## Usage

To use this template:

1. Replace `{{ComponentName}}` with the actual component name (e.g., `Button`)
2. Replace `{{componentName}}` with the lowercase version (e.g., `button`)
3. Replace `{{PackageName}}` with the package name (e.g., `Core`)
4. Replace `element` with the appropriate HTML element (e.g., `button`, `div`)
5. Adjust props, variants, and sizes as needed for the specific component
6. Add component-specific functionality and tests

This template should be combined with the system prompt, package-specific prompts, and task-specific prompts to create a complete instruction set for developing components in the Smolitux UI library.