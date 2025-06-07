# Unit-Tests für smolitux UI Komponenten

Dieses Dokument beschreibt die Strategie und Implementierung von Unit-Tests für die Komponenten der smolitux UI-Bibliothek.

## 1. Allgemeine Teststrategie

Für jede Komponente sollten folgende Aspekte getestet werden:

1. **Rendering**: Die Komponente wird korrekt gerendert
2. **Props**: Verhaltensänderungen basierend auf verschiedenen Props
3. **Interaktionen**: Benutzerinteraktionen wie Klicks, Hover, etc.
4. **Zustände**: Verschiedene Zustände wie Loading, Error, Disabled
5. **Accessibility**: Tests für grundlegende A11y-Eigenschaften

## 2. Best Practices für Unit-Tests

1. **Isolation**: Jeder Test sollte isoliert von anderen Tests ausgeführt werden können
2. **Unabhängigkeit**: Tests sollten nicht von der Reihenfolge der Ausführung abhängen
3. **Lesbarkeit**: Tests sollten klar und verständlich sein
4. **Wartbarkeit**: Tests sollten einfach zu warten sein

## 3. Beispiele für Unit-Tests

### 3.1 Beispiel: Button-Komponente

```tsx
// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600'); // Primär-Variante als Default
  });

  test('applies different variant styles correctly', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary-600');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-gray-300');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-gray-700');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-sm');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-lg');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders loading state correctly', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders icons correctly', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon" />}>
        With Icon
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  test('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('opacity-50');
  });

  test('passes additional HTML attributes to button element', () => {
    render(<Button data-testid="custom-button">Custom Attr</Button>);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });
});
```

### 3.2 Beispiel: Input-Komponente

```tsx
// Input.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  test('renders with default props', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with correct value and handles change', async () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Hello');
    
    expect(handleChange).toHaveBeenCalledTimes(5); // Einmal pro Zeichen
  });

  test('shows error message when provided', () => {
    render(<Input error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('shows helper text when provided', () => {
    render(<Input helperText="Enter your name" />);
    expect(screen.getByText('Enter your name')).toBeInTheDocument();
  });

  test('applies disabled styles when disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveClass('bg-gray-100');
  });

  test('displays left and right icons correctly', () => {
    const leftIcon = <span data-testid="left-icon">L</span>;
    const rightIcon = <span data-testid="right-icon">R</span>;
    
    render(<Input leftIcon={leftIcon} rightIcon={rightIcon} />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('applies custom className correctly', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });
});
```

### 3.3 Beispiel: Card-Komponente

```tsx
// Card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  test('renders children correctly', () => {
    render(
      <Card>
        <div data-testid="card-content">Card Content</div>
      </Card>
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  test('renders title when provided', () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  test('renders footer when provided', () => {
    const footer = <div data-testid="card-footer">Footer</div>;
    render(<Card footer={footer}>Content</Card>);
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
  });

  test('applies different elevations correctly', () => {
    const { rerender } = render(<Card elevation="low">Content</Card>);
    expect(screen.getByText('Content').closest('.card')).toHaveClass('shadow-sm');

    rerender(<Card elevation="high">Content</Card>);
    expect(screen.getByText('Content').closest('.card')).toHaveClass('shadow-lg');
  });

  test('applies custom className correctly', () => {
    render(<Card className="custom-card">Content</Card>);
    expect(screen.getByText('Content').closest('.card')).toHaveClass('custom-card');
  });

  test('applies border when bordered prop is true', () => {
    render(<Card bordered>Content</Card>);
    expect(screen.getByText('Content').closest('.card')).toHaveClass('border');
  });
});
```

## 4. Komponenten mit Context testen

Für Komponenten, die Context verwenden (z.B. Theme-Context):

```tsx
// ThemeAwareComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';
import { ThemeAwareComponent } from '../ThemeAwareComponent';

describe('ThemeAwareComponent', () => {
  test('renders with light theme by default', () => {
    render(
      <ThemeProvider>
        <ThemeAwareComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-component')).toHaveClass('bg-white');
  });

  test('renders with dark theme when provided', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <ThemeAwareComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-component')).toHaveClass('bg-gray-800');
  });
});
```

## 5. Testen von seiteneffektbasierten Komponenten (useEffect)

Für Komponenten, die useEffect für Seiteneffekte verwenden:

```tsx
// DataFetcher.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DataFetcher } from '../DataFetcher';

// Mock der fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test data' }),
  })
) as jest.Mock;

describe('DataFetcher', () => {
  test('shows loading state initially', () => {
    render(<DataFetcher url="https://example.com/data" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows data after successful fetch', async () => {
    render(<DataFetcher url="https://example.com/data" />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('test data')).toBeInTheDocument();
    });
    
    expect(global.fetch).toHaveBeenCalledWith('https://example.com/data');
  });

  test('shows error message on fetch failure', async () => {
    // Überschreiben des Mocks für diesen Test
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    ) as jest.Mock;
    
    render(<DataFetcher url="https://example.com/data" />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });
});
```

## 6. Testkomponenten für komplexe Szenarien erstellen

Für komplexe Komponenten kann es hilfreich sein, eine Testkomponente zu erstellen:

```tsx
// ComplexComponent.test.tsx
import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComplexComponent } from '../ComplexComponent';

// Testkomponente, die den internen Zustand verwaltet
const TestWrapper = () => {
  const [value, setValue] = useState('');
  return (
    <ComplexComponent
      value={value}
      onChange={(newValue) => setValue(newValue)}
      data-testid="complex-component"
    />
  );
};

describe('ComplexComponent', () => {
  test('renders and handles state changes correctly', () => {
    render(<TestWrapper />);
    
    const component = screen.getByTestId('complex-component');
    expect(component).toBeInTheDocument();
    
    // Weiter mit Tests für interne Zustandsänderungen...
  });
});
```

## 7. Test-Mocks für externe Abhängigkeiten

Für Komponenten, die externe Dienste oder Bibliotheken verwenden:

```tsx
// Mocks erstellen
jest.mock('@smolitux/utils', () => ({
  formatDate: jest.fn((date) => '01/01/2023'),
  validateEmail: jest.fn((email) => email.includes('@')),
}));

// Im Test verwenden
import { formatDate, validateEmail } from '@smolitux/utils';

describe('FormattedDate', () => {
  test('uses formatDate utility correctly', () => {
    render(<FormattedDate date={new Date()} />);
    expect(formatDate).toHaveBeenCalled();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
  });
});
```

## 8. Test-Helpers für wiederkehrende Patterns

Für häufig verwendete Test-Patterns:

```tsx
// test-utils.ts
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';

// Custom render mit ThemeProvider
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { theme?: 'light' | 'dark' }
) => {
  const { theme = 'light', ...rest } = options || {};
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    ),
    ...rest,
  });
};

// Im Test verwenden
import { customRender } from '../../test-utils';

test('renders with theme', () => {
  customRender(<ThemeAwareComponent />, { theme: 'dark' });
  // Tests...
});
```
