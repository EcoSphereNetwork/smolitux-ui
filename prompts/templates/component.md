# Komponenten-Template

## Komponenten-Struktur

```
Component/
├── Component.tsx            # Hauptimplementierung
├── Component.test.tsx       # Unit-Tests
├── Component.stories.tsx    # Storybook-Stories
└── index.ts                 # Re-Export
```

## Komponenten-Implementierung

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Komponenten-Varianten
 */
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * Komponenten-Größen
 */
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Komponenten-Props
 */
export interface ComponentProps {
  /** Komponenten-Inhalt */
  children?: React.ReactNode;
  /** Komponenten-Variante */
  variant?: ComponentVariant;
  /** Komponenten-Größe */
  size?: ComponentSize;
  /** Deaktiviert die Komponente */
  disabled?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Klick-Handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Komponente
 * 
 * Beschreibung der Komponente und ihrer Verwendung.
 */
export const Component = forwardRef<HTMLElement, ComponentProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const componentClasses = clsx(
      'component',
      `component--${variant}`,
      `component--${size}`,
      {
        'component--disabled': disabled,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={componentClasses}
        onClick={disabled ? undefined : onClick}
        data-testid="Component"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = 'Component';

export default Component;
```

## Komponenten-Tests

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Component } from './Component';

expect.extend(toHaveNoViolations);

describe('Component', () => {
  // Rendering-Tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<Component>Test</Component>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Component className="custom-class">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('custom-class');
    });
  });

  // Varianten-Tests
  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--primary');
    });

    it('renders secondary variant correctly', () => {
      render(<Component variant="secondary">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--secondary');
    });

    it('renders outline variant correctly', () => {
      render(<Component variant="outline">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--outline');
    });

    it('renders ghost variant correctly', () => {
      render(<Component variant="ghost">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--ghost');
    });
  });

  // Größen-Tests
  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--md');
    });

    it('renders small size correctly', () => {
      render(<Component size="sm">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--sm');
    });

    it('renders large size correctly', () => {
      render(<Component size="lg">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--lg');
    });
  });

  // Zustands-Tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Component disabled>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--disabled');
    });
  });

  // Interaktions-Tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Component onClick={handleClick}>Test</Component>);

      await user.click(screen.getByTestId('Component'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click events when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Component onClick={handleClick} disabled>Test</Component>);

      await user.click(screen.getByTestId('Component'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Ref-Tests
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Component ref={ref}>Test</Component>);
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current).toBe(screen.getByTestId('Component'));
    });
  });

  // Barrierefreiheits-Tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Component>Test</Component>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

## Komponenten-Stories

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Core/Component',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Beschreibung der Komponente und ihrer Verwendung.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Die visuelle Variante der Komponente',
      table: {
        type: { summary: 'ComponentVariant' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Die Größe der Komponente',
      table: {
        type: { summary: 'ComponentSize' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deaktiviert die Komponente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    children: {
      control: 'text',
      description: 'Der Inhalt der Komponente',
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
    children: 'Komponente',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="outline">Outline</Component>
      <Component variant="ghost">Ghost</Component>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Component>Default</Component>
      <Component disabled>Disabled</Component>
    </div>
  ),
};
```

## Komponenten-Index

```typescript
export { default as Component, type ComponentProps, type ComponentVariant, type ComponentSize } from './Component';
```