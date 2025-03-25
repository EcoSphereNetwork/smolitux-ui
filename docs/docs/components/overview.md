# Smolitux UI Komponenten Übersicht

Smolitux UI bietet eine umfangreiche Sammlung von React-Komponenten, die in verschiedene Kategorien unterteilt sind, um die Entwicklung moderner Benutzeroberflächen zu erleichtern.

## Core-Komponenten

Die Core-Komponenten bilden das Fundament der Smolitux UI Bibliothek und bieten grundlegende UI-Elemente für die Erstellung von Benutzeroberflächen.

### Formular-Komponenten

- **Button**: Standard-Schaltflächen mit verschiedenen Stilen und Größen
- **Input**: Texteingabefelder mit Validierung und verschiedenen Stilen
- **TextArea**: Mehrzeilige Texteingabefelder
- **Select**: Dropdown-Auswahlfelder mit Suchfunktion
- **Checkbox**: Kontrollkästchen für Mehrfachauswahl
- **Radio**: Optionsfelder für Einzelauswahl
- **RadioGroup**: Gruppierung von Optionsfeldern
- **Switch**: Ein-/Aus-Schalter als Alternative zu Checkboxen
- **Slider**: Schieberegler für numerische Eingaben
- **DatePicker**: Kalender zur Datumsauswahl
- **TimePicker**: Komponente zur Zeitauswahl
- **ColorPicker**: Farbauswahl-Komponente
- **FileUpload**: Komponente zum Hochladen von Dateien
- **FormControl**: Container für Formularelemente mit Label und Validierung

### Feedback-Komponenten

- **Alert**: Benachrichtigungen und Warnmeldungen
- **Toast**: Temporäre Benachrichtigungen
- **ProgressBar**: Fortschrittsanzeige
- **Skeleton**: Ladezustand-Platzhalter

### Navigation-Komponenten

- **Menu**: Navigationsmenüs
- **Pagination**: Seitennavigation für Tabellen und Listen
- **Breadcrumb**: Brotkrumen-Navigation
- **Tabs**: Tab-Navigation
- **TabView**: Tab-Container mit Inhalten

### Layout-Komponenten

- **Card**: Container für Inhalte mit Rahmen und Schatten
- **Modal**: Dialogfenster
- **Dialog**: Einfache Dialogfenster
- **Drawer**: Seitliche Panels
- **Popover**: Schwebende Infoboxen
- **Tooltip**: Kurze Hilfetexte bei Hover

### Medien-Komponenten

- **Avatar**: Benutzerbilder oder Platzhalter
- **Badge**: Kennzeichnungen und Zähler
- **MediaPlayer**: Audio- und Video-Player

### Daten-Komponenten

- **Table**: Tabellen zur Datenanzeige
- **Accordion**: Ausklappbare Panels

## Layout-Komponenten

Die Layout-Komponenten bieten Strukturen für die Organisation von Inhalten auf der Seite.

- **Container**: Zentrierter Container mit maximaler Breite
- **Grid**: Flexibles Rastersystem
- **Flex**: Flexbox-basiertes Layout
- **Sidebar**: Seitenleiste für Navigation
- **Header**: Kopfbereich für Anwendungen
- **Footer**: Fußbereich für Anwendungen
- **DashboardLayout**: Komplettes Layout für Dashboard-Anwendungen

## Chart-Komponenten

Die Chart-Komponenten ermöglichen die Visualisierung von Daten in verschiedenen Diagrammtypen.

- **LineChart**: Liniendiagramm
- **BarChart**: Balkendiagramm
- **PieChart**: Kreisdiagramm
- **AreaChart**: Flächendiagramm
- **ScatterPlot**: Streudiagramm
- **Heatmap**: Heatmap-Diagramm
- **RadarChart**: Radar-/Netzdiagramm

## Verwendung

Alle Komponenten können einfach aus den entsprechenden Paketen importiert werden:

```jsx
// Core-Komponenten
import { Button, Input, Card } from '@smolitux/core';

// Layout-Komponenten
import { Container, Grid } from '@smolitux/layout';

// Chart-Komponenten
import { LineChart, BarChart } from '@smolitux/charts';
```

Weitere Informationen zur Verwendung der einzelnen Komponenten finden Sie in der jeweiligen Komponentendokumentation.