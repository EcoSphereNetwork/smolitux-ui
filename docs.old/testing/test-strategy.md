# Teststrategie für Resonance UI Bibliothek

## 1. Testarten und -umfang

### 1.1 Testpyramide
```
                 [E2E-Tests]
               /             \
      [Integrationstest]   [UI-Tests]
        /         \         /       \
[Komponententests][API-Tests][Visueller Test][Accessibility-Test]
```

## 2. Komponententests

### 2.1 Unit-Test-Beispiel
```typescript
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click me</Button>
    );
    
    fireEvent.click(getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when prop is true', () => {
    const { getByText } = render(<Button disabled>Click me</Button>);
    const button = getByText('Click me');
    
    expect(button).toBeDisabled();
  });
});
```

### 2.2 Test-Coverage-Konfiguration
```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
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

## 3. Integrationstest-Strategie

### 3.1 Integrationstests mit React Testing Library
```typescript
// ComplexComponent.test.tsx
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComplexComponent } from './ComplexComponent';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

describe('ComplexComponent Integration', () => {
  it('fetches and renders data correctly', async () => {
    const { getByText, findByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ComplexComponent />
      </QueryClientProvider>
    );

    // Warte auf Datenladung
    const dataElement = await findByTestId('data-container');
    expect(dataElement).toBeInTheDocument();
  });

  it('handles user interactions', async () => {
    const { getByRole, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ComplexComponent />
      </QueryClientProvider>
    );

    // Simuliere Benutzerinteraktion
    const submitButton = getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    // Überprüfe Ergebnis
    await waitFor(() => {
      const successMessage = getByTestId('success-message');
      expect(successMessage).toBeInTheDocument();
    });
  });
});
```

## 4. E2E-Test-Strategie

### 4.1 Cypress E2E-Tests
```typescript
// dashboard.spec.ts
describe('Dashboard Integration', () => {
  beforeEach(() => {
    cy.login('testuser', 'password');
  });

  it('loads dashboard correctly', () => {
    cy.visit('/dashboard');
    
    // Prüfe Hauptelemente
    cy.get('[data-testid=dashboard-container]').should('be.visible');
    cy.get('[data-testid=user-profile]').should('contain', 'Test User');
  });

  it('navigates between dashboard sections', () => {
    cy.visit('/dashboard');
    
    // Navigiere zu Analytics
    cy.get('[data-testid=analytics-nav]').click();
    cy.url().should('include', '/dashboard/analytics');
    
    // Überprüfe Ladezustand
    cy.get('[data-testid=analytics-loader]').should('not.exist');
    cy.get('[data-testid=analytics-chart]').should('be.visible');
  });
});
```

## 5. Visueller Regressionstest

### 5.1 Storybook Visual Tests
```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary']
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

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true
  }
};
```

## 6. Accessibility-Testing

### 6.1 Accessibility-Test-Konfiguration
```typescript
// a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('Button should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 7. Performance-Testing

### 7.1 Lighthouse Performance-Tests
```javascript
// lighthouse.test.js
const lighthouse = require('lighthouse');
const { prepareAudit } = require('./test-utils');

describe('Performance Audit', () => {
  it('meets performance budget', async () => {
    const { lhr } = await lighthouse('http://localhost:3000', {
      onlyCategories: ['performance']
    });

    const performanceScore = lhr.categories.performance.score * 100;
    
    expect(performanceScore).toBeGreaterThanOrEqual(90);
  });
});
```

## 8. Test-Infrastruktur

### 8.1 Kontinuierliche Integration
```yaml
# .github/workflows/test.yml
name: Component Library Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Unit Tests
        run: npm run test:unit
      
      - name: Run Integration Tests
        run: npm run test:integration
      
      - name: Run E2E Tests
        run: npm run test:e2e
      
      - name: Run Accessibility Tests
        run: npm run test:a11y
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
```

## 9. Testdaten-Management

### 9.1 Mock-Daten-Strategie
```typescript
// mockData.ts
export const mockUserData = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  role: 'admin'
};

export const createMockApiResponse = (data, status = 200) => ({
  status,
  data,
  headers: {},
  config: {}
});
```

## 10. Testabdeckungs-Ziele

### 10.1 Coverage-Kriterien
- Komponententests: 90%
- Integrationstests: 80%
- E2E-Tests: Kritische Pfade
- Accessibility: 100% Konformität
- Performance: Lighthouse-Score > 90

Diese umfassende Teststrategie bietet einen ganzheitlichen Ansatz zur Qualitätssicherung der React-Bibliothek.