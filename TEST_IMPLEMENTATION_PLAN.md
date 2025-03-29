# Smolitux UI Bibliothek - Testplan-Implementierung

## 1. Testinfrastruktur

### 1.1 Konfiguration der Testumgebung

#### Jest-Konfiguration
- Überprüfung und Korrektur der bestehenden Jest-Konfiguration
- Einrichtung der richtigen Transformationen für TypeScript und React
- Konfiguration der Testabdeckungsberichte

```javascript
// jest.config.js - Beispielkonfiguration
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'packages/@smolitux/*/src/**/*.{ts,tsx}',
    '!packages/@smolitux/*/src/**/*.stories.{ts,tsx}',
    '!packages/@smolitux/*/src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

#### Testing Library Setup
- Installation und Konfiguration von @testing-library/react
- Einrichtung von @testing-library/jest-dom für erweiterte Matcher
- Konfiguration von @testing-library/user-event für Benutzerinteraktionen

```javascript
// jest.setup.js
import '@testing-library/jest-dom';
```

### 1.2 Testordnerstruktur

Standardisierte Struktur für alle Komponenten:

```
ComponentName/
  ├── __tests__/
  │   ├── ComponentName.test.tsx     # Grundlegende Funktionstests
  │   ├── ComponentName.spec.tsx     # Erweiterte Funktionstests
  │   ├── ComponentName.a11y.test.tsx # Barrierefreiheitstests
  │   └── __snapshots__/             # Snapshot-Tests
  ├── ComponentName.tsx              # Komponente
  ├── ComponentName.stories.tsx      # Storybook-Stories
  └── index.ts                       # Export
```

## 2. Unit-Tests für Basiskomponenten

### 2.1 Button-Komponente

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly when disabled', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  it('renders correctly with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button', { name: /primary/i })).toHaveClass('primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button', { name: /secondary/i })).toHaveClass('secondary');
  });

  it('renders correctly with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button', { name: /small/i })).toHaveClass('sm');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button', { name: /large/i })).toHaveClass('lg');
  });

  it('renders with left icon', () => {
    render(<Button leftIcon={<span data-testid="left-icon" />}>With Icon</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    render(<Button rightIcon={<span data-testid="right-icon" />}>With Icon</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders in loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button', { name: /loading/i })).toHaveAttribute('aria-busy', 'true');
  });
});
```

### 2.2 Input-Komponente

```typescript
// Input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  });

  it('handles value change', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    await userEvent.type(screen.getByRole('textbox'), 'test@example.com');
    expect(handleChange).toHaveBeenCalledTimes('test@example.com'.length);
  });

  it('renders in disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders with helper text', () => {
    render(<Input helperText="This is a helper text" />);
    expect(screen.getByText(/this is a helper text/i)).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
```

## 3. Integrationstests für komplexe Komponenten

### 3.1 Form-Komponente

```typescript
// Form.spec.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Input, Button } from '../../..';

describe('Form Integration', () => {
  it('handles form submission', async () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    
    render(
      <Form onSubmit={handleSubmit}>
        <Input name="email" label="Email" />
        <Input name="password" type="password" label="Password" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('validates form fields', async () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    
    render(
      <Form onSubmit={handleSubmit} validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email is required';
        }
        return errors;
      }}>
        <Input name="email" label="Email" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
```

### 3.2 Modal-Komponente

```typescript
// Modal.spec.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, Button } from '../../..';

describe('Modal Integration', () => {
  it('opens and closes the modal', async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <Modal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </>
      );
    };
    
    render(<TestComponent />);
    
    // Modal should be closed initially
    expect(screen.queryByText(/test modal/i)).not.toBeInTheDocument();
    
    // Open modal
    await userEvent.click(screen.getByRole('button', { name: /open modal/i }));
    expect(screen.getByText(/test modal/i)).toBeInTheDocument();
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
    
    // Close modal
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/test modal/i)).not.toBeInTheDocument();
  });

  it('traps focus within the modal', async () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Focus Trap Test">
        <Button>First Button</Button>
        <Button>Second Button</Button>
        <Button>Third Button</Button>
      </Modal>
    );
    
    // Check initial focus is on close button
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /close/i }));
    
    // Tab through the modal
    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /first button/i }));
    
    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /second button/i }));
    
    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /third button/i }));
    
    // Tab should cycle back to close button
    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /close/i }));
  });
});
```

## 4. Barrierefreiheitstests

### 4.1 Accessibility-Tests mit jest-axe

```typescript
// Button.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when disabled', async () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with icon', async () => {
    const { container } = render(
      <Button leftIcon={<span aria-hidden="true">🔍</span>}>
        Search
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 5. Visuelle Tests

### 5.1 Storybook-Integration

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'link', 'solid', 'outline'],
      description: 'The visual style of the button'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link'
  }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true
  }
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true
  }
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Button with Icon',
    leftIcon: <span>🔍</span>
  }
};

export const WithRightIcon: Story = {
  args: {
    children: 'Button with Icon',
    rightIcon: <span>→</span>
  }
};
```

### 5.2 Snapshot-Tests

```typescript
// Button.test.tsx (zusätzliche Tests)
import { render } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Snapshots', () => {
  it('matches primary button snapshot', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container).toMatchSnapshot();
  });

  it('matches secondary button snapshot', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container).toMatchSnapshot();
  });

  it('matches disabled button snapshot', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    expect(container).toMatchSnapshot();
  });

  it('matches loading button snapshot', () => {
    const { container } = render(<Button loading>Loading</Button>);
    expect(container).toMatchSnapshot();
  });
});
```

## 6. Browserkompatibilitätstests

### 6.1 Playwright-Tests

```typescript
// button.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
  });

  test('renders correctly in Chrome', async ({ page }) => {
    const button = page.locator('button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Primary Button');
  });

  test('handles click events', async ({ page }) => {
    const button = page.locator('button');
    await button.click();
    // Verify click behavior (e.g., check for a specific class or state)
  });

  test('renders correctly when disabled', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-button--disabled');
    const button = page.locator('button');
    await expect(button).toBeDisabled();
  });
});
```

## 7. CI/CD-Integration

### 7.1 GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Lint
      run: npm run lint
    
    - name: Build
      run: npm run build
    
    - name: Test
      run: npm run test:ci
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Run accessibility tests
      run: npm run test:a11y
```

## 8. Implementierungsplan

### Phase 1: Testinfrastruktur (Tag 1-2)
- Jest-Konfiguration korrigieren
- Testing Library einrichten
- Erste einfache Tests implementieren

### Phase 2: Unit-Tests (Tag 3-5)
- Tests für Button implementieren
- Tests für Input implementieren
- Tests für Select implementieren
- Tests für Card implementieren
- Tests für Alert implementieren
- Tests für Badge implementieren

### Phase 3: Integrationstests (Tag 6-8)
- Tests für Form implementieren
- Tests für Modal implementieren
- Tests für TabView implementieren
- Tests für Table implementieren

### Phase 4: Spezielle Tests (Tag 9-11)
- Tests für DatePicker implementieren
- Tests für TimePicker implementieren
- Tests für FileUpload implementieren
- Barrierefreiheitstests implementieren

### Phase 5: Visuelle Tests (Tag 12-14)
- Storybook-Integration
- Snapshot-Tests implementieren
- Visuelle Regressionstests einrichten

### Phase 6: Browserkompatibilitätstests (Tag 15-16)
- Playwright-Tests einrichten
- Tests für verschiedene Browser implementieren

### Phase 7: CI/CD-Integration (Tag 17-18)
- GitHub Actions Workflow einrichten
- Automatisierte Tests bei Pull Requests
- Testabdeckungsberichte einrichten

### Phase 8: Dokumentation und Finalisierung (Tag 19-20)
- Testdokumentation aktualisieren
- Testabdeckung überprüfen und verbessern
- Abschließende Tests und Qualitätssicherung