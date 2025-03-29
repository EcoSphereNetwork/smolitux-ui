# Smolitux UI Bibliothek 

Eine moderne React-Komponentenbibliothek für die einheitliche Gestaltung von MVPs.

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
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>
      <Button variant="solid">Solid Button (Alias für primary)</Button>
      <Button variant="outline">Outline Button (Alias für ghost)</Button>
      <Button isLoading>Lädt...</Button>
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

- [x] Button-Komponente mit zusätzlichen Varianten (solid, outline) erweitern
- [x] TabView-Komponente mit onChange-Prop für bessere Kompatibilität erweitern
- [ ] Weitere Kern-Komponenten implementieren
- [ ] Diagramm-Bibliothek ausbauen
- [ ] Beispiel-App erweitern
- [ ] E2E-Tests hinzufügen
- [ ] Dokumentation verbessern

## 📄 Lizenz

MIT


---
---

### Wiki Building with Docusaurus

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
