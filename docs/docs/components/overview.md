# Komponenten-Übersicht

Die Smolitux UI Bibliothek bietet eine umfangreiche Sammlung von Komponenten, die in verschiedene Pakete aufgeteilt sind.

## Core-Komponenten (@smolitux/core)

### Basis-Komponenten

- **Accordion**: Ausklappbare Panels für platzsparende Informationsdarstellung
- **Alert**: Informations-, Warn- und Fehlermeldungen
- **Avatar**: Benutzerbilder und Platzhalter
- **Badge**: Numerische oder textuelle Kennzeichnungen
- **Button**: Aktionsschaltflächen in verschiedenen Varianten
- **Card**: Container für zusammengehörige Inhalte
- **Checkbox**: Auswahlfelder für Mehrfachauswahl
- **Dialog**: Modal-Dialoge für Benutzerinteraktionen
- **Drawer**: Seitliche Panels für Navigation oder zusätzliche Inhalte
- **Input**: Texteingabefelder
- **Radio**: Auswahlfelder für Einfachauswahl
- **Select**: Dropdown-Auswahlfelder
- **Switch**: Ein/Aus-Schalter
- **Tabs**: Registerkartennavigation
- **TextArea**: Mehrzeilige Texteingabefelder
- **Tooltip**: Informations-Tooltips

### Fortgeschrittene Komponenten

- **Breadcrumb**: Navigationspfade
- **Carousel**: Bildkarussell
- **ColorPicker**: Farbauswahl
- **DatePicker**: Datumsauswahl
- **FileUpload**: Datei-Upload
- **FormControl**: Formularsteuerung mit Validierung
- **MediaPlayer**: Audio- und Videoplayer
- **Menu**: Navigationsmenüs
- **Modal**: Modale Fenster
- **Pagination**: Seitennavigation
- **Popover**: Kontextuelle Overlays
- **ProgressBar**: Fortschrittsanzeigen
- **RadioGroup**: Gruppierte Radiobuttons
- **Skeleton**: Ladezustände
- **Slider**: Schieberegler
- **Stepper**: Schrittweise Prozesse
- **TabView**: Erweiterte Tabs mit Inhalten
- **Table**: Datentabellen
- **TimePicker**: Zeitauswahl
- **Toast**: Temporäre Benachrichtigungen

## Layout-Komponenten (@smolitux/layout)

- **Container**: Responsive Container mit maximaler Breite
- **Grid**: Flexibles Grid-System
- **Flex**: Flexbox-Layout
- **DashboardLayout**: Vorgefertigtes Dashboard-Layout
- **Header**: Anwendungsheader
- **Sidebar**: Seitenleiste für Navigation
- **Footer**: Anwendungsfußzeile

## Chart-Komponenten (@smolitux/charts)

- **AreaChart**: Flächendiagramme
- **BarChart**: Balkendiagramme
- **LineChart**: Liniendiagramme
- **PieChart**: Kreisdiagramme
- **RadarChart**: Radardiagramme
- **ScatterPlot**: Streudiagramme
- **Heatmap**: Heatmaps

## Theme-System (@smolitux/theme)

- **ThemeProvider**: Kontext-Provider für Theming
- **useTheme**: Hook für Themezugriff
- **ThemeUtilities**: Hilfsfunktionen für Theming

## Verwendung

Alle Komponenten sind vollständig dokumentiert und können in der Storybook-Dokumentation erkundet werden. Jede Komponente verfügt über Beispiele, Props-Dokumentation und Varianten.

```jsx
import { Button } from '@smolitux/core';

function MyComponent() {
  return (
    <Button 
      variant="primary" 
      size="md" 
      onClick={() => console.log('Clicked!')}
    >
      Klick mich
    </Button>
  );
}
```

Weitere Informationen zu jeder Komponente findest du in den entsprechenden Unterseiten dieser Dokumentation.
