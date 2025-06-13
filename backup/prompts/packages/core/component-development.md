# @smolitux/core - Komponenten-Entwicklungs-Prompt

## Kontext

Das @smolitux/core Paket enthält die grundlegenden UI-Komponenten der Smolitux-Bibliothek. Diese Komponenten bilden die Basis für komplexere Komponenten und Features. Jede Komponente muss hohen Qualitätsstandards entsprechen, insbesondere in Bezug auf Typsicherheit, Barrierefreiheit und Testabdeckung.

## Ziel

Entwickle eine vollständige, produktionsreife UI-Komponente für das @smolitux/core Paket, die alle Qualitätsstandards erfüllt und einfach in andere Projekte integriert werden kann.

## Anforderungen

### Allgemeine Anforderungen

1. **Typsicherheit**: Verwende TypeScript mit strikten Typen und vermeide `any`
2. **Barrierefreiheit**: Die Komponente muss WCAG 2.1 AA-konform sein
3. **Modularität**: Die Komponente sollte unabhängig und wiederverwendbar sein
4. **Konsistenz**: Folge der einheitlichen API und Designsprache
5. **Testbarkeit**: Implementiere umfassende Unit- und Accessibility-Tests

### Komponenten-Struktur

```
Component/
├── Component.tsx            # Hauptimplementierung
├── Component.a11y.tsx       # Barrierefreiheits-Implementierung (optional)
├── Component.css            # Komponenten-spezifische Styles
├── Component.test.tsx       # Unit-Tests
├── __tests__/               # Testverzeichnis (alternativ)
│   └── Component.test.tsx   # Unit-Tests
└── index.ts                 # Re-Export
```

### Implementierungs-Muster

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '@smolitux/utils';
import './Component.css';

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Beschreibung der Prop */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Beschreibung der Prop */
  size?: 'sm' | 'md' | 'lg';
  /** Beschreibung der Prop */
  disabled?: boolean;
}

/**
 * Komponenten-Beschreibung
 */
export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'primary', size = 'md', disabled = false, className, children, ...rest }, ref) => {
    const classes = clsx(
      'component',
      `component--${variant}`,
      `component--${size}`,
      disabled && 'component--disabled',
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        aria-disabled={disabled}
        data-testid="component"
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = 'Component';
export default Component;
```

### Test-Muster

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Component } from './Component';

describe('Component', () => {
  it('renders without crashing', () => {
    render(<Component>Test</Component>);
    expect(screen.getByTestId('component')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Component className="custom">Test</Component>);
    expect(screen.getByTestId('component')).toHaveClass('custom');
  });

  it('applies variant class', () => {
    render(<Component variant="secondary">Test</Component>);
    expect(screen.getByTestId('component')).toHaveClass('component--secondary');
  });

  it('applies size class', () => {
    render(<Component size="lg">Test</Component>);
    expect(screen.getByTestId('component')).toHaveClass('component--lg');
  });

  it('applies disabled state', () => {
    render(<Component disabled>Test</Component>);
    const component = screen.getByTestId('component');
    expect(component).toHaveClass('component--disabled');
    expect(component).toHaveAttribute('aria-disabled', 'true');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Component ref={ref}>Test</Component>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### CSS-Muster

```css
.component {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
}

/* Variants */
.component--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.component--secondary {
  background-color: var(--color-secondary);
  color: var(--color-white);
}

.component--danger {
  background-color: var(--color-danger);
  color: var(--color-white);
}

/* Sizes */
.component--sm {
  font-size: var(--font-size-sm);
  padding: var(--spacing-1) var(--spacing-2);
}

.component--md {
  font-size: var(--font-size-md);
  padding: var(--spacing-2) var(--spacing-4);
}

.component--lg {
  font-size: var(--font-size-lg);
  padding: var(--spacing-3) var(--spacing-6);
}

/* States */
.component--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Index-Muster

```tsx
export { default, type ComponentProps } from './Component';
```

## Beispiele

### Button-Komponente

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '@smolitux/utils';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
}

/**
 * Button component for user interactions
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = clsx(
      'button',
      `button--${variant}`,
      `button--${size}`,
      loading && 'button--loading',
      fullWidth && 'button--full-width',
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        data-testid="button"
        {...rest}
      >
        {loading ? (
          <>
            <span className="button__loading-spinner" aria-hidden="true" />
            <span className="button__loading-text">{children}</span>
          </>
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

### Alert-Komponente

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '@smolitux/utils';
import './Alert.css';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert variant */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Alert title */
  title?: string;
  /** Show close button */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
}

/**
 * Alert component for feedback messages
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      closable = false,
      onClose,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = clsx(
      'alert',
      `alert--${variant}`,
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        role="alert"
        data-testid="alert"
        {...rest}
      >
        {title && <div className="alert__title">{title}</div>}
        <div className="alert__content">{children}</div>
        {closable && (
          <button
            className="alert__close"
            aria-label="Close alert"
            onClick={onClose}
            data-testid="alert-close"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
export default Alert;
```

## Format

Bitte implementiere die angeforderte Komponente gemäß den oben genannten Anforderungen und Mustern. Achte besonders auf:

1. **Vollständigkeit**: Implementiere alle erforderlichen Dateien
2. **Qualität**: Folge den Best Practices für TypeScript, React und Barrierefreiheit
3. **Testbarkeit**: Implementiere umfassende Tests
4. **Dokumentation**: Dokumentiere alle Props und die Verwendung der Komponente

## Komponenten-Anforderungen

**Komponente**: [KOMPONENTEN_NAME]

**Beschreibung**: [KOMPONENTEN_BESCHREIBUNG]

**Props**:
- [PROP_NAME]: [PROP_BESCHREIBUNG]
- [PROP_NAME]: [PROP_BESCHREIBUNG]
- ...

**Varianten**:
- [VARIANTE]: [VARIANTEN_BESCHREIBUNG]
- [VARIANTE]: [VARIANTEN_BESCHREIBUNG]
- ...

**Größen**:
- [GRÖSSE]: [GRÖSSEN_BESCHREIBUNG]
- [GRÖSSE]: [GRÖSSEN_BESCHREIBUNG]
- ...

**Zustände**:
- [ZUSTAND]: [ZUSTANDS_BESCHREIBUNG]
- [ZUSTAND]: [ZUSTANDS_BESCHREIBUNG]
- ...

**Barrierefreiheit**:
- [ARIA_ATTRIBUT]: [ARIA_BESCHREIBUNG]
- [KEYBOARD_NAVIGATION]: [KEYBOARD_BESCHREIBUNG]
- ...

**Interaktionen**:
- [INTERAKTION]: [INTERAKTIONS_BESCHREIBUNG]
- [INTERAKTION]: [INTERAKTIONS_BESCHREIBUNG]
- ...

**Besondere Anforderungen**:
- [ANFORDERUNG]: [ANFORDERUNGS_BESCHREIBUNG]
- [ANFORDERUNG]: [ANFORDERUNGS_BESCHREIBUNG]
- ...