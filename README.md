# Smolitux UI Bibliothek

![CI](https://github.com/EcoSphereNetwork/smolitux-ui/workflows/CI/badge.svg)
![Release](https://github.com/EcoSphereNetwork/smolitux-ui/workflows/Release/badge.svg)
![Coverage](https://img.shields.io/codecov/c/github/EcoSphereNetwork/smolitux-ui)
![License](https://img.shields.io/github/license/EcoSphereNetwork/smolitux-ui)
![Version](https://img.shields.io/npm/v/@smolitux/core)

Eine moderne React-Komponentenbibliothek für die einheitliche Gestaltung von Anwendungen im Smolitux Ökosystem.

## 📦 Packages

- **@smolitux/core**: Grundlegende UI-Komponenten
- **@smolitux/theme**: Theming und Styling
- **@smolitux/icons**: Icon-Bibliothek
- **@smolitux/layout**: Layout-Komponenten
- **@smolitux/charts**: Diagramm-Komponenten
- **@smolitux/types**: Gemeinsame TypeScript-Typen

## 🚀 Installation

```bash
# Mit npm
npm install @smolitux/core @smolitux/theme

# Mit yarn
yarn add @smolitux/core @smolitux/theme
```

## 🔧 Einrichtung

Zuerst müssen Sie den ThemeProvider in Ihrer App einrichten:

```jsx
import { ThemeProvider } from '@smolitux/theme';

function App() {
  return (
    <ThemeProvider>
      {/* Ihre App-Komponenten hier */}
    </ThemeProvider>
  );
}
```

## 💡 Verwendung

### Buttons

```jsx
import { Button } from '@smolitux/core';

function MyComponent() {
  return (
    <div>
      <Button variant="primary">Primärer Button</Button>
      <Button variant="secondary">Sekundärer Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button loading>Lädt...</Button>
    </div>
  );
}
```

### Formulare

```jsx
import { Input, Select } from '@smolitux/core';

function MyForm() {
  return (
    <form>
      <Input 
        label="E-Mail"
        type="email"
        placeholder="beispiel@domain.de"
        helperText="Wir werden Ihre E-Mail niemals weitergeben."
      />
      
      <Select
        label="Kategorie"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]}
      />
    </form>
  );
}
```

### Dark Mode

Die Bibliothek unterstützt automatisch Light und Dark Mode. Um zwischen den Modi zu wechseln:

```jsx
import { useTheme } from '@smolitux/theme';

function ThemeSwitcher() {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {themeMode === 'light' ? 'Zu Dark Mode wechseln' : 'Zu Light Mode wechseln'}
    </button>
  );
}
```

## 🧩 Komponenten

Die smolitux UI Bibliothek enthält folgende Komponenten:

### Core

- Alert
- Badge
- Button
- Card
- Input
- Modal
- Select
- TabView
- (weitere in Entwicklung)

### Layout

- Container
- Grid
- Flexbox
- Sidebar
- (weitere in Entwicklung)

### Charts (in Entwicklung)

- LineChart
- BarChart
- PieChart
- AreaChart

## 🎨 Theme Anpassung

Sie können das Standard-Theme anpassen:

```jsx
import { ThemeProvider } from '@smolitux/theme';

// Eigene Theme-Konfiguration
const customTheme = {
  colors: {
    primary: {
      500: '#0075E1', // Hauptfarbe anpassen
      // ...andere Farbwerte
    },
    // ...weitere Farben
  },
  // ...weitere Theme-Eigenschaften
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Ihre App-Komponenten hier */}
    </ThemeProvider>
  );
}
```

## 🧪 Beispiel-App

Um die Beispiel-App zu starten:

```bash
# Monorepo-Setup
npm run bootstrap

# Starten der Beispiel-App
npm run dev
```

## 📚 Dokumentation

Für die vollständige Dokumentation nutzen Sie Storybook:

```bash
npm run storybook
```

Besuchen Sie dann http://localhost:6006

## 🛠️ Entwicklung

```bash
# Alle Abhängigkeiten installieren
npm run bootstrap

# Entwicklungsmodus für alle Pakete starten
npm run dev

# Pakete bauen
npm run build

# Tests ausführen
npm run test

# Linting durchführen
npm run lint
```

### Neue Komponenten hinzufügen

1. Erstellen Sie eine neue Komponente im entsprechenden Paket unter `/src/components/`
2. Folgen Sie dem Stil und der Struktur vorhandener Komponenten
3. Fügen Sie Exports zur `index.ts` des Pakets hinzu
4. Schreiben Sie Tests für Ihre Komponente
5. Erstellen Sie eine Storybook-Story für die Dokumentation

### Beitragen

Wir freuen uns über Beiträge zur smolitux UI Bibliothek! Bitte beachten Sie folgende Richtlinien:

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/awesome-feature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some awesome feature'`)
4. Pushen Sie den Branch (`git push origin feature/awesome-feature`)
5. Erstellen Sie einen Pull Request

### Coding-Standards

- Verwenden Sie TypeScript für alle Komponenten
- Schreiben Sie JSDoc-Kommentare für Komponenten und Props
- Folgen Sie den Barrierefreiheits-Richtlinien (WCAG 2.1 AA)
- Halten Sie die Komponenten atomar und wiederverwendbar

## 📋 ToDo-Liste

- [ ] Weitere Kern-Komponenten implementieren
- [ ] Diagramm-Bibliothek ausbauen
- [ ] Beispiel-App erweitern
- [x] E2E-Tests hinzufügen
- [x] CI/CD-Pipeline einrichten
- [ ] Dokumentation verbessern

## 🔄 Continuous Integration

Dieses Projekt verwendet GitHub Actions für Continuous Integration und Continuous Deployment:

- **CI-Pipeline**: Führt bei jedem Pull Request und Push auf main/develop automatisch Lint, Build und Tests aus
- **Release-Pipeline**: Veröffentlicht neue Versionen auf npm und aktualisiert die Dokumentation
- **Test-Abdeckung**: Wird automatisch an Codecov gesendet
- **Visuelle Regressionstests**: Werden mit Chromatic durchgeführt (optional)
- **E2E-Tests**: Werden mit Playwright für verschiedene Browser ausgeführt

## 📄 Lizenz

MIT
