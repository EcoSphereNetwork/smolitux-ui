# Smolitux UI Komponenten-Testing

## 🎯 Ziel

Entwickle umfassende Tests für eine Smolitux UI-Komponente, die alle Funktionalitäten, Interaktionen und Barrierefreiheitsaspekte abdecken.

## 📋 Komponenten-Spezifikation

```typescript
// Komponenten-Name: {{COMPONENT_NAME}}
// Paket: @smolitux/{{PACKAGE_NAME}}
// Beschreibung: {{COMPONENT_DESCRIPTION}}

export interface {{COMPONENT_NAME}}Props {
  /** Beschreibung der Prop */
  prop1?: string;
  /** Beschreibung der Prop */
  prop2?: number;
  /** Beschreibung der Prop */
  children?: React.ReactNode;
  // Weitere Props...
}
```

## 🧪 Test-Kategorien

### 1. Rendering-Tests

- Teste, ob die Komponente korrekt gerendert wird
- Teste, ob die Komponente mit verschiedenen Props korrekt gerendert wird
- Teste, ob die Komponente mit Kindern korrekt gerendert wird
- Teste, ob die Komponente mit verschiedenen Größen korrekt gerendert wird
- Teste, ob die Komponente mit verschiedenen Varianten korrekt gerendert wird

### 2. Interaktions-Tests

- Teste, ob die Komponente auf Klicks reagiert
- Teste, ob die Komponente auf Tastatureingaben reagiert
- Teste, ob die Komponente auf Hover reagiert
- Teste, ob die Komponente auf Focus reagiert
- Teste, ob die Komponente auf Blur reagiert

### 3. Barrierefreiheits-Tests

- Teste, ob die Komponente keine Barrierefreiheitsverletzungen hat
- Teste, ob die Komponente mit Screenreadern kompatibel ist
- Teste, ob die Komponente mit Tastatur bedienbar ist
- Teste, ob die Komponente mit hohem Kontrast lesbar ist
- Teste, ob die Komponente mit verschiedenen Schriftgrößen lesbar ist

### 4. Theming-Tests

- Teste, ob die Komponente mit verschiedenen Themes korrekt gerendert wird
- Teste, ob die Komponente im Dark Mode korrekt gerendert wird
- Teste, ob die Komponente mit benutzerdefinierten Themes korrekt gerendert wird

### 5. Edge-Case-Tests

- Teste, ob die Komponente mit leeren Props korrekt gerendert wird
- Teste, ob die Komponente mit ungültigen Props korrekt gerendert wird
- Teste, ob die Komponente mit extremen Werten korrekt gerendert wird
- Teste, ob die Komponente mit fehlenden Props korrekt gerendert wird

## 🧪 Test-Template

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@smolitux/theme';
import { {{COMPONENT_NAME}} } from './{{COMPONENT_NAME}}';

describe('{{COMPONENT_NAME}}', () => {
  // Rendering-Tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(
        <ThemeProvider>
          <{{COMPONENT_NAME}} />
        </ThemeProvider>
      );
      // Assertions...
    });

    it('renders correctly with custom props', () => {
      render(
        <ThemeProvider>
          <{{COMPONENT_NAME}} prop1="value1" prop2={42} />
        </ThemeProvider>
      );
      // Assertions...
    });

    it('renders correctly with children', () => {
      render(
        <ThemeProvider>
          <{{COMPONENT_NAME}}>Child content</{{COMPONENT_NAME}}>
        </ThemeProvider>
      );
      // Assertions...
    });
  });

  // Interaktions-Tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <ThemeProvider>
          <{{COMPONENT_NAME}} onClick={handleClick} />
        </ThemeProvider>
      );
      
      const element = screen.getByTestId('{{COMPONENT_NAME}}');
      await user.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      render(
        <ThemeProvider>
          <{{COMPONENT_NAME}} onKeyDown={handleKeyDown} />
        </ThemeProvider>
      );
      
      const element = screen.getByTestId('{{COMPONENT_NAME}}');
      element.focus();
      await user.keyboard('{enter}');
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  // Barrierefreiheits-Tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ThemeProvider>
          <{{COMPONENT_NAME}} />
        </ThemeProvider>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('is keyboard navigable', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <{{COMPONENT_NAME}} />
        </ThemeProvider>
      );
      
      // Tab to the component
      await user.tab();
      const element = screen.getByTestId('{{COMPONENT_NAME}}');
      expect(element).toHaveFocus();
    });
  });

  // Theming-Tests
  describe('Theming', () => {
    it('renders correctly with dark theme', () => {
      render(
        <ThemeProvider themeMode="dark">
          <{{COMPONENT_NAME}} />
        </ThemeProvider>
      );
      // Assertions...
    });

    it('renders correctly with custom theme', () => {
      render(
        <ThemeProvider theme={{ colors: { primary: { 500: '#ff0000' } } }}>
          <{{COMPONENT_NAME}} />
        </ThemeProvider>
      );
      // Assertions...
    });
  });

  // Edge-Case-Tests
  describe('Edge Cases', () => {
    it('renders correctly with empty props', () => {
      render(
        <ThemeProvider>
          <{{COMPONENT_NAME}} />
        </ThemeProvider>
      );
      // Assertions...
    });

    it('renders correctly with extreme values', () => {
      render(
        <ThemeProvider>
          <{{COMPONENT_NAME}} prop1="very long string value that might cause layout issues" prop2={999999} />
        </ThemeProvider>
      );
      // Assertions...
    });
  });
});
```

## 📋 Checkliste

- [ ] Rendering-Tests geschrieben
- [ ] Interaktions-Tests geschrieben
- [ ] Barrierefreiheits-Tests geschrieben
- [ ] Theming-Tests geschrieben
- [ ] Edge-Case-Tests geschrieben
- [ ] Alle Tests bestehen
- [ ] Test-Abdeckung > 95%