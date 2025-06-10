# Komponenten-Entwicklung Workflow

## Übersicht

Dieser Workflow beschreibt den Prozess zur Entwicklung einer neuen Komponente oder zur Verbesserung einer bestehenden Komponente in der Smolitux UI-Bibliothek.

## Schritte

### 1. Anforderungsanalyse

Analysiere die Anforderungen an die Komponente:

- Welche Funktionalität soll die Komponente bieten?
- Welche Props soll die Komponente unterstützen?
- Welche Varianten soll die Komponente haben?
- Welche Größen soll die Komponente unterstützen?
- Welche Zustände soll die Komponente haben?
- Welche Barrierefreiheitsanforderungen gibt es?

### 2. Komponenten-Design

Entwerfe die Komponente:

- Definiere die Props und ihre Typen
- Definiere die Varianten und Größen
- Definiere die Zustände
- Definiere die Barrierefreiheitsattribute
- Definiere die Styling-Anforderungen

### 3. Implementierung

Implementiere die Komponente:

- Erstelle die Komponenten-Dateien
- Implementiere die Komponenten-Logik
- Implementiere das Styling
- Implementiere die Barrierefreiheit
- Implementiere die Varianten und Größen
- Implementiere die Zustände

### 4. Tests

Teste die Komponente:

- Schreibe Unit-Tests
- Schreibe Barrierefreiheitstests
- Schreibe Integrationstests
- Schreibe Snapshot-Tests
- Führe manuelle Tests durch

### 5. Dokumentation

Dokumentiere die Komponente:

- Erstelle Storybook-Stories
- Dokumentiere die Props
- Dokumentiere die Varianten und Größen
- Dokumentiere die Zustände
- Dokumentiere die Barrierefreiheit
- Dokumentiere Best Practices

### 6. Review

Überprüfe die Komponente:

- Überprüfe die Implementierung
- Überprüfe die Tests
- Überprüfe die Dokumentation
- Überprüfe die Barrierefreiheit
- Überprüfe die Performance

### 7. Veröffentlichung

Veröffentliche die Komponente:

- Führe einen finalen Build durch
- Aktualisiere die Versionsnummer
- Erstelle einen Pull Request
- Führe einen Code-Review durch
- Merge den Pull Request
- Veröffentliche die neue Version

## Checkliste

### Implementierung

- [ ] Komponenten-Dateien erstellt
- [ ] Props definiert und typisiert
- [ ] Varianten und Größen implementiert
- [ ] Zustände implementiert
- [ ] Barrierefreiheit implementiert
- [ ] Styling implementiert
- [ ] Responsive Design implementiert
- [ ] Theming-Unterstützung implementiert
- [ ] Ref-Forwarding implementiert
- [ ] Event-Handler implementiert
- [ ] Fehlerbehandlung implementiert
- [ ] Performance-Optimierungen implementiert

### Tests

- [ ] Unit-Tests geschrieben
- [ ] Barrierefreiheitstests geschrieben
- [ ] Integrationstests geschrieben
- [ ] Snapshot-Tests geschrieben
- [ ] Manuelle Tests durchgeführt
- [ ] Edge-Cases getestet
- [ ] Performance-Tests durchgeführt

### Dokumentation

- [ ] Storybook-Stories erstellt
- [ ] Props dokumentiert
- [ ] Varianten und Größen dokumentiert
- [ ] Zustände dokumentiert
- [ ] Barrierefreiheit dokumentiert
- [ ] Best Practices dokumentiert
- [ ] Beispiele erstellt

## Beispiel

### Button-Komponente

#### Anforderungsanalyse

- Funktionalität: Klickbarer Button mit verschiedenen Varianten und Größen
- Props: variant, size, disabled, loading, fullWidth, leftIcon, rightIcon, onClick
- Varianten: primary, secondary, outline, ghost, link, danger
- Größen: xs, sm, md, lg, xl
- Zustände: default, hover, active, focus, disabled, loading
- Barrierefreiheit: Tastaturnavigation, ARIA-Attribute, Kontrast

#### Komponenten-Design

```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
```

#### Implementierung

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

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

#### Tests

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
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

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByTestId('Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Dokumentation

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
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button leftIcon={<span>👈</span>}>Left Icon</Button>
      <Button rightIcon={<span>👉</span>}>Right Icon</Button>
      <Button leftIcon={<span>👈</span>} rightIcon={<span>👉</span>}>Both Icons</Button>
    </div>
  ),
};
```