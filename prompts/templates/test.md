# Test-Template

## Test-Struktur

```
Component/
├── Component.test.tsx       # Unit-Tests
└── Component.a11y.test.tsx  # Barrierefreiheits-Tests (optional)
```

## Unit-Tests

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@smolitux/theme';
import { Component } from './Component';

describe('Component', () => {
  // Rendering-Tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(
        <ThemeProvider>
          <Component>Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <ThemeProvider>
          <Component>Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ThemeProvider>
          <Component className="custom-class">Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('custom-class');
    });
  });

  // Varianten-Tests
  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(
        <ThemeProvider>
          <Component>Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('component--primary');
    });

    it('renders secondary variant correctly', () => {
      render(
        <ThemeProvider>
          <Component variant="secondary">Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('component--secondary');
    });

    it('renders outline variant correctly', () => {
      render(
        <ThemeProvider>
          <Component variant="outline">Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('component--outline');
    });

    it('renders ghost variant correctly', () => {
      render(
        <ThemeProvider>
          <Component variant="ghost">Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('component--ghost');
    });
  });

  // Größen-Tests
  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(
        <ThemeProvider>
          <Component>Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('component--md');
    });

    it('renders small size correctly', () => {
      render(
        <ThemeProvider>
          <Component size="sm">Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('component--sm');
    });

    it('renders large size correctly', () => {
      render(
        <ThemeProvider>
          <Component size="lg">Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('component--lg');
    });
  });

  // Zustands-Tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(
        <ThemeProvider>
          <Component disabled>Test</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toHaveClass('component--disabled');
    });
  });

  // Interaktions-Tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <ThemeProvider>
          <Component onClick={handleClick}>Test</Component>
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('Component'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click events when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <ThemeProvider>
          <Component onClick={handleClick} disabled>Test</Component>
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('Component'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Ref-Tests
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <ThemeProvider>
          <Component ref={ref}>Test</Component>
        </ThemeProvider>
      );
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current).toBe(screen.getByTestId('Component'));
    });
  });

  // Theming-Tests
  describe('Theming', () => {
    it('applies theme correctly', () => {
      render(
        <ThemeProvider>
          <Component>Test</Component>
        </ThemeProvider>
      );
      // Hier können spezifische Theme-Tests durchgeführt werden
      // z.B. Überprüfung von Farben, Schriftarten, etc.
    });

    it('applies dark theme correctly', () => {
      render(
        <ThemeProvider themeMode="dark">
          <Component>Test</Component>
        </ThemeProvider>
      );
      // Hier können spezifische Dark-Theme-Tests durchgeführt werden
    });
  });

  // Edge-Case-Tests
  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(
        <ThemeProvider>
          <Component></Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(
        <ThemeProvider>
          <Component>{null}</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(
        <ThemeProvider>
          <Component>{undefined}</Component>
        </ThemeProvider>
      );
      expect(screen.getByTestId('Component')).toBeInTheDocument();
    });
  });
});
```

## Barrierefreiheits-Tests

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '@smolitux/theme';
import { Component } from './Component';

expect.extend(toHaveNoViolations);

describe('Component Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Component>Test</Component>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(
      <ThemeProvider>
        <Component disabled>Test</Component>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with different variants', async () => {
    const { container } = render(
      <ThemeProvider>
        <div>
          <Component variant="primary">Primary</Component>
          <Component variant="secondary">Secondary</Component>
          <Component variant="outline">Outline</Component>
          <Component variant="ghost">Ghost</Component>
        </div>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with different sizes', async () => {
    const { container } = render(
      <ThemeProvider>
        <div>
          <Component size="sm">Small</Component>
          <Component size="md">Medium</Component>
          <Component size="lg">Large</Component>
        </div>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in dark mode', async () => {
    const { container } = render(
      <ThemeProvider themeMode="dark">
        <Component>Test</Component>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Snapshot-Tests

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';
import { Component } from './Component';

describe('Component Snapshots', () => {
  it('matches snapshot with default props', () => {
    const { container } = render(
      <ThemeProvider>
        <Component>Test</Component>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with custom props', () => {
    const { container } = render(
      <ThemeProvider>
        <Component variant="secondary" size="lg" disabled>Test</Component>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot in dark mode', () => {
    const { container } = render(
      <ThemeProvider themeMode="dark">
        <Component>Test</Component>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
```

## Integrations-Tests

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@smolitux/theme';
import { Component } from './Component';
import { AnotherComponent } from '../AnotherComponent';

describe('Component Integration', () => {
  it('integrates with AnotherComponent', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <ThemeProvider>
        <AnotherComponent>
          <Component onClick={handleClick}>Test</Component>
        </AnotherComponent>
      </ThemeProvider>
    );

    await user.click(screen.getByTestId('Component'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('works with form elements', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(
      <ThemeProvider>
        <form onSubmit={handleSubmit}>
          <Component type="submit">Submit</Component>
        </form>
      </ThemeProvider>
    );

    await user.click(screen.getByTestId('Component'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
```

## Performance-Tests

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';
import { Component } from './Component';

describe('Component Performance', () => {
  it('renders efficiently', () => {
    const start = performance.now();
    render(
      <ThemeProvider>
        <Component>Test</Component>
      </ThemeProvider>
    );
    const end = performance.now();
    const renderTime = end - start;
    
    // Erwartete Renderzeit sollte unter 16ms sein (60fps)
    expect(renderTime).toBeLessThan(16);
  });

  it('handles many instances efficiently', () => {
    const start = performance.now();
    render(
      <ThemeProvider>
        <div>
          {Array.from({ length: 100 }).map((_, i) => (
            <Component key={i}>Test {i}</Component>
          ))}
        </div>
      </ThemeProvider>
    );
    const end = performance.now();
    const renderTime = end - start;
    
    // Erwartete Renderzeit für 100 Instanzen
    expect(renderTime).toBeLessThan(100);
  });
});
```