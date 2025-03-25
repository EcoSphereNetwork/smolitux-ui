# Smolitux UI Showcase

Diese Anwendung demonstriert alle Komponenten und Funktionen der Smolitux UI Bibliothek in einer interaktiven Showcase-Anwendung.

## Funktionen

- Präsentation aller Smolitux UI Komponenten
- Interaktive Beispiele mit Code-Snippets
- Demonstration der Theming-Funktionen
- Internationalisierung (i18n) mit mehreren Sprachen
- Formularvalidierung
- Animationen und Übergänge
- Diagramme und Visualisierungen

## Erste Schritte

### Installation

```bash
# Navigieren Sie zum Verzeichnis der Showcase-App
cd examples/showcase-app

# Installieren Sie die Abhängigkeiten
npm install
# oder
yarn install
```

### Entwicklungsserver starten

```bash
# Starten Sie den Entwicklungsserver
npm start
# oder
yarn start
```

Die Anwendung wird unter [http://localhost:3000](http://localhost:3000) geöffnet.

### Build für Produktion

```bash
# Erstellen Sie einen Produktions-Build
npm run build
# oder
yarn build
```

Die Build-Dateien werden im `dist`-Verzeichnis erstellt.

## Struktur der Anwendung

```
showcase-app/
├── public/              # Statische Dateien
├── src/
│   ├── components/      # Wiederverwendbare Komponenten
│   ├── layouts/         # Layout-Komponenten
│   ├── pages/           # Seiten der Anwendung
│   │   └── components/  # Komponenten-Seiten
│   ├── styles/          # CSS-Dateien
│   ├── App.tsx          # Hauptkomponente
│   └── main.tsx         # Einstiegspunkt
├── index.html           # HTML-Template
├── package.json         # Abhängigkeiten und Skripte
├── tsconfig.json        # TypeScript-Konfiguration
└── vite.config.ts       # Vite-Konfiguration
```

## Verwendete Technologien

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Smolitux UI](https://github.com/EcoSphereNetwork/smolitux-ui)

## Komponenten

Die Showcase-App demonstriert die folgenden Komponenten:

### Basis-Komponenten
- Button
- Input
- Card
- Alert
- Badge

### Formular-Komponenten
- Form
- FormField
- Select
- Checkbox
- Radio
- Switch
- DatePicker
- TimePicker
- ColorPicker
- FileUpload

### Layout-Komponenten
- Container
- Grid
- Flex

### Feedback-Komponenten
- Toast
- Modal
- Dialog
- Popover
- Tooltip

### Navigation-Komponenten
- Tabs
- Breadcrumb
- Pagination
- Menu
- Drawer

### Daten-Komponenten
- Table
- List

### Medien-Komponenten
- Carousel
- MediaPlayer

### Animations-Komponenten
- Fade
- Zoom
- Slide
- Collapse
- Motion
- AnimatePresence

### Chart-Komponenten
- LineChart
- BarChart
- PieChart
- ScatterPlot
- AreaChart

## Features

### Theming
Die Anwendung demonstriert die Theming-Funktionen der Smolitux UI Bibliothek, einschließlich:
- Farbschemata
- Typografie
- Abstände und Größen
- Responsives Design

### Internationalisierung (i18n)
Die Anwendung unterstützt mehrere Sprachen:
- Deutsch (Standard)
- Englisch
- Französisch
- Spanisch
- Italienisch

### Formularvalidierung
Die Anwendung demonstriert die Formularvalidierungsfunktionen:
- Vordefinierte Validatoren
- Benutzerdefinierte Validatoren
- Abhängige Validierung
- Verschiedene Validierungsstrategien

### Animationen
Die Anwendung demonstriert verschiedene Animationen und Übergänge:
- Einfache Übergänge (Fade, Zoom, Slide, Collapse)
- Komplexe Animationen mit Motion
- Animationssequenzen
- Benutzerdefinierte Keyframes

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.