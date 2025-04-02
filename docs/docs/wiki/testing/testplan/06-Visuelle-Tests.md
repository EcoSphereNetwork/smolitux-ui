# Visuelle Regressionstests

Dieses Dokument beschreibt die Strategie und Implementierung von visuellen Regressionstests für die Komponenten der smolitux UI-Bibliothek.

## 1. Zweck visueller Regressionstests

Visuelle Regressionstests sind eine wichtige Ergänzung zu Unit- und Integrationstests, da sie sicherstellen, dass das visuelle Erscheinungsbild der Komponenten konsistent bleibt. Diese Tests sind besonders wichtig für:

1. Erkennung unbeabsichtigter Änderungen im Design
2. Sicherstellung der korrekten Darstellung in verschiedenen Zuständen
3. Validierung der visuellen Konsistenz über alle Komponenten hinweg
4. Überprüfung von Designänderungen und Theme-Anwendungen

## 2. Tools für visuelle Regressionstests

### 2.1 Chromatic

Chromatic ist ein Tool für visuelle Regressionstests, das eng mit Storybook integriert ist. Es erfasst Snapshots aller Storybook-Stories und vergleicht sie mit früheren Versionen.

```bash
# Installation
npm install --save-dev chromatic

# Ausführung
npx chromatic --project-token=<your-token>
```

### 2.2 Storybook

Storybook dient als Grundlage für visuelle Tests. Jede Komponente sollte Stories für ihre verschiedenen Zustände haben. Diese Stories werden dann für die visuellen Tests verwendet.

### 2.3 Jest-Snapshots

Jest-Snapshots können für kleinere, weniger komplexe visuelle Tests verwendet werden:

```tsx
// Button.snapshot.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Snapshots', () => {
  test('primary button matches snapshot', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondary button matches snapshot', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled button matches snapshot', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## 3. Einrichtung von Storybook für visuelle Tests

### 3.1 Storybook-Konfiguration

Die `.storybook/main.js`-Datei sollte für visuelle Tests konfiguriert werden:

```javascript
module.exports = {
  stories: [
    '../packages/@smolitux/**/*.stories.@(tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport', // Für responsive Tests
  ],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
```

### 3.2 Theme-Provider in Storybook

Erstellen Sie eine `.storybook/preview.js` für globale Dekorationen:

```javascript
import React from 'react';
import { ThemeProvider } from '@smolitux/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'padded',
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1a202c' },
    ],
  },
};

export const decorators = [
  (Story, context) => {
    // Bestimme Theme basierend auf ausgewähltem Hintergrund
    const themeMode = context.globals.backgrounds?.value === '#1a202c' ? 'dark' : 'light';
    
    return (
      <ThemeProvider initialTheme={themeMode}>
        <Story />
      </ThemeProvider>
    );
  },
];

// Füge Theme-Wechsel-Tool hinzu
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun', title: 'Light' },
        { value: 'dark', icon: 'moon', title: 'Dark' },
      ],
      showName: true,
    },
  },
};
```

## 4. Story-Struktur für visuelle Tests

Jede Komponente sollte Stories für ihre verschiedenen Zustände haben:

### 4.1 Beispiel: Button-Stories

```tsx
// Button.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
    },
    leftIcon: {
      control: { disable: true },
      description: 'Icon to display on the left side',
    },
    rightIcon: {
      control: { disable: true },
      description: 'Icon to display on the right side',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Button with Left Icon',
    leftIcon: <span>👈</span>,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Button with Right Icon',
    rightIcon: <span>👉</span>,
  },
};
```

### 4.2 Beispiel: Komponenten-Zustände in Stories

```tsx
// Input.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    // Kontrolldefinitionen hier...
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'john.doe',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    value: '123',
    error: 'Password must be at least 8 characters',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    helperText: 'Your unique identifier',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read Only Field',
    value: 'Cannot be changed',
    disabled: true,
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: <span>🔍</span>,
    rightIcon: <span>❌</span>,
  },
};
```

## 5. Chromatic-Integration mit GitHub Actions

Für die automatische Ausführung von visuellen Tests bei jedem Pull Request:

```yaml
# .github/workflows/visual-testing.yml
name: Visual Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - name: Run Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

## 6. Best Practices für visuelle Tests

1. **Vollständige Abdeckung**: Erstellen Sie Stories für alle Komponenten und Zustände
2. **Konsistente Benennung**: Verwenden Sie konsistente Namenskonventionen für Stories
3. **Responsive Tests**: Testen Sie das Erscheinungsbild in verschiedenen Viewport-Größen
4. **Theme-Tests**: Testen Sie Light- und Dark-Mode-Varianten
5. **Komponenteninteraktion**: Tests für interaktive Zustände (hover, focus, active)
6. **Animationen und Übergänge**: Deaktivieren Sie Animationen für stabile visuelle Tests

## 7. Workflow für visuelle Tests

1. **Entwicklung**: Entwickler erstellen/ändern eine Komponente und ihre Stories
2. **Lokale Tests**: Testen mit lokalem Storybook
3. **Pull Request**: Änderungen werden geprüft und Chromatic erfasst Snapshots
4. **Review**: Das Team überprüft visuelle Änderungen in der Chromatic-UI
5. **Akzeptanz**: Änderungen werden als neue Baseline akzeptiert oder abgelehnt
6. **Integration**: Nach Genehmigung werden Änderungen in den Hauptzweig integriert

## 8. Visuelle Testdokumentation

Zusätzlich zu den automatisierten Tests sollte eine visuelle Testdokumentation geführt werden:

```markdown
# Visuelle Testdokumentation

## Button-Komponente

### Getestete Zustände
- [x] Primary, Secondary, Outline, Ghost Varianten
- [x] Small, Medium, Large Größen
- [x] Disabled Zustand
- [x] Loading Zustand
- [x] Mit Icons (links/rechts)
- [x] Full Width

### Responsive Tests
- [x] Mobile (320px)
- [x] Tablet (768px)
- [x] Desktop (1024px+)

### Theme Tests
- [x] Light Mode
- [x] Dark Mode
```
