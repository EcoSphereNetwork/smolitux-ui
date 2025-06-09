# Smolitux UI Komponenten-Dokumentation

Diese Dokumentation beschreibt die verfügbaren Komponenten in der Smolitux UI-Bibliothek.

## Inhaltsverzeichnis

- [Einführung](#einführung)
- [Installation](#installation)
- [Basis-Komponenten](#basis-komponenten)
  - [Card](#card)
  - [Button](#button)
  - [ProgressBar](#progressbar)
  - [TabView](#tabview)
  - [Tooltip](#tooltip)
- [KI-Komponenten](#ki-komponenten)
  - [TrendingTopics](#trendingtopics)
  - [EngagementScore](#engagementscore)
  - [Voice-Komponenten](#voice-komponenten)
  - [Blockchain](#blockchain)
- [Styling](#styling)
- [Theming](#theming)
- [Barrierefreiheit](#barrierefreiheit)

## Einführung

Smolitux UI ist eine Komponenten-Bibliothek für React-Anwendungen, die eine Vielzahl von wiederverwendbaren UI-Komponenten bietet. Die Bibliothek ist modular aufgebaut und in verschiedene Pakete unterteilt, die je nach Bedarf importiert werden können.

## Installation

```bash
# Installation des gesamten Pakets
npm install @smolitux/ui

# Installation einzelner Pakete
npm install @smolitux/utils
npm install @smolitux/core
npm install @smolitux/ai
# usw.
```

## Basis-Komponenten

### Card

Die Card-Komponente dient als Container für verwandte Inhalte und Aktionen.

```jsx
import { Card } from '@smolitux/utils/components/patterns';

function Example() {
  return (
    <Card>
      <h2>Titel</h2>
      <p>Inhalt der Karte</p>
    </Card>
  );
}
```

#### Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `bordered` | `boolean` | `true` | Ob die Karte einen Rahmen haben soll |
| `shadowed` | `boolean` | `false` | Ob die Karte einen Schatten haben soll |
| `rounded` | `boolean` | `true` | Ob die Karte abgerundete Ecken haben soll |
| `padded` | `boolean` | `true` | Ob die Karte Innenabstand haben soll |
| `hoverable` | `boolean` | `false` | Ob die Karte einen Hover-Effekt haben soll |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `style` | `React.CSSProperties` | `{}` | Inline-Styles |
| `children` | `React.ReactNode` | - | Inhalt der Karte |

### Button

Die Button-Komponente dient zum Auslösen von Aktionen oder Ereignissen.

```jsx
import { Button } from '@smolitux/utils/components/patterns';

function Example() {
  return (
    <Button onClick={() => console.log('Geklickt!')}>
      Klick mich
    </Button>
  );
}
```

#### Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'link'` | `'solid'` | Variante des Buttons |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe des Buttons |
| `disabled` | `boolean` | `false` | Ob der Button deaktiviert ist |
| `loading` | `boolean` | `false` | Ob der Button im Ladezustand ist |
| `leftIcon` | `React.ReactNode` | - | Icon links vom Text |
| `rightIcon` | `React.ReactNode` | - | Icon rechts vom Text |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Typ des Buttons |
| `fullWidth` | `boolean` | `false` | Ob der Button die volle Breite einnehmen soll |
| `colorScheme` | `string` | `'primary'` | Farbschema des Buttons |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | - | Klick-Handler |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `style` | `React.CSSProperties` | `{}` | Inline-Styles |
| `children` | `React.ReactNode` | - | Inhalt des Buttons |

### ProgressBar

Die ProgressBar-Komponente zeigt den Fortschritt eines Vorgangs an.

```jsx
import { ProgressBar } from '@smolitux/utils/components/patterns';

function Example() {
  return (
    <ProgressBar value={75} max={100} showValue />
  );
}
```

#### Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `value` | `number` | - | Aktueller Wert |
| `max` | `number` | `100` | Maximaler Wert |
| `min` | `number` | `0` | Minimaler Wert |
| `showValue` | `boolean` | `false` | Ob der Wert angezeigt werden soll |
| `formatValue` | `(value: number, max: number) => string` | - | Funktion zur Formatierung des Werts |
| `indeterminate` | `boolean` | `false` | Ob der Fortschritt unbestimmt ist |
| `colorScheme` | `string` | `'primary'` | Farbschema der Fortschrittsanzeige |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe der Fortschrittsanzeige |
| `rounded` | `boolean` | `true` | Ob die Fortschrittsanzeige abgerundete Ecken haben soll |
| `animated` | `boolean` | `false` | Ob die Fortschrittsanzeige animiert sein soll |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `progressClassName` | `string` | `''` | Zusätzliche CSS-Klassen für das Fortschrittselement |
| `style` | `React.CSSProperties` | `{}` | Inline-Styles |

### TabView

Die TabView-Komponente ermöglicht die Organisation von Inhalten in Tabs.

```jsx
import { TabView } from '@smolitux/utils/components/patterns';

function Example() {
  return (
    <TabView
      tabs={[
        { id: 'tab1', label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
      ]}
      activeTab="tab1"
      onChange={(tabId) => console.log(`Tab ${tabId} ausgewählt`)}
    />
  );
}
```

#### Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `tabs` | `TabItem[]` | - | Array von Tab-Elementen |
| `activeTab` | `string` | - | ID des aktiven Tabs |
| `onChange` | `(tabId: string) => void` | - | Callback bei Tab-Wechsel |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ausrichtung der Tabs |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe der Tabs |
| `variant` | `'line' \| 'enclosed' \| 'soft-rounded' \| 'solid-rounded' \| 'unstyled'` | `'line'` | Variante der Tabs |
| `isFitted` | `boolean` | `false` | Ob die Tabs die volle Breite einnehmen sollen |
| `isLazy` | `boolean` | `true` | Ob Inhalte erst beim Aktivieren geladen werden sollen |
| `isManual` | `boolean` | `false` | Ob die Tab-Auswahl manuell gesteuert wird |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `tabListClassName` | `string` | `''` | Zusätzliche CSS-Klassen für die Tab-Liste |
| `tabPanelsClassName` | `string` | `''` | Zusätzliche CSS-Klassen für die Tab-Panels |
| `activeTabClassName` | `string` | `''` | Zusätzliche CSS-Klassen für den aktiven Tab |
| `inactiveTabClassName` | `string` | `''` | Zusätzliche CSS-Klassen für inaktive Tabs |

### Tooltip

Die Tooltip-Komponente zeigt zusätzliche Informationen an, wenn der Benutzer mit einem Element interagiert.

```jsx
import { Tooltip } from '@smolitux/utils/components/patterns';

function Example() {
  return (
    <Tooltip content="Zusätzliche Informationen">
      <button>Hover mich</button>
    </Tooltip>
  );
}
```

#### Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `content` | `React.ReactNode` | - | Inhalt des Tooltips |
| `children` | `React.ReactElement` | - | Element, das den Tooltip auslöst |
| `placement` | `TooltipPlacement` | `'top'` | Position des Tooltips |
| `disabled` | `boolean` | `false` | Ob der Tooltip deaktiviert ist |
| `showDelay` | `number` | `0` | Verzögerung vor dem Anzeigen (in ms) |
| `hideDelay` | `number` | `0` | Verzögerung vor dem Ausblenden (in ms) |
| `hasArrow` | `boolean` | `true` | Ob der Tooltip einen Pfeil haben soll |
| `isOpen` | `boolean` | - | Ob der Tooltip geöffnet ist |
| `defaultIsOpen` | `boolean` | `false` | Standard-Öffnungszustand |
| `onOpen` | `() => void` | - | Callback beim Öffnen |
| `onClose` | `() => void` | - | Callback beim Schließen |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `tooltipClassName` | `string` | `''` | Zusätzliche CSS-Klassen für den Tooltip |
| `arrowClassName` | `string` | `''` | Zusätzliche CSS-Klassen für den Pfeil |
| `tooltipStyle` | `React.CSSProperties` | `{}` | Inline-Styles für den Tooltip |
| `offset` | `number` | `8` | Abstand vom auslösenden Element (in px) |
| `closeOnClick` | `boolean` | `true` | Ob der Tooltip beim Klicken außerhalb geschlossen werden soll |
| `closeOnEsc` | `boolean` | `true` | Ob der Tooltip beim Drücken der Escape-Taste geschlossen werden soll |

## KI-Komponenten

### TrendingTopics

Die TrendingTopics-Komponente zeigt Trending-Themen und -Inhalte an.

```jsx
import { TrendingTopics } from '@smolitux/ai/components';

function Example() {
  return (
    <TrendingTopics
      title="Trending-Themen"
      topics={topics}
      onRefresh={handleRefresh}
    />
  );
}
```

### EngagementScore

Die EngagementScore-Komponente zeigt und erklärt Engagement-Scores.

```jsx
import { EngagementScore } from '@smolitux/ai/components';

function Example() {
  return (
    <EngagementScore
      title="Engagement-Analyse"
      score={78}
      metrics={metrics}
      onRefresh={handleRefresh}
    />
  );
}
```

## Voice-Komponenten

Die Voice-Komponenten integrieren Sprachbefehle in Standard-UI-Elemente. Eine Übersicht befindet sich unter [Voice-Komponenten](/docs/components/voice/index).

## Blockchain

Die Blockchain-Komponenten ermöglichen die Integration von Web3-Funktionalität. Weitere Details finden sich im Verzeichnis [Blockchain](./blockchain/README.md).

## Styling

Die Komponenten unterstützen verschiedene Styling-Optionen:

- **className**: Alle Komponenten akzeptieren eine `className`-Prop für zusätzliche CSS-Klassen.
- **style**: Alle Komponenten akzeptieren eine `style`-Prop für Inline-Styles.
- **Utility-Funktionen**: Das `@smolitux/utils`-Paket bietet Utility-Funktionen für Farben, Abstände, Typografie und mehr.

## Theming

Die Komponenten unterstützen ein flexibles Theming-System, das auf CSS-Variablen basiert. Sie können das Erscheinungsbild der Komponenten anpassen, indem Sie die CSS-Variablen überschreiben.

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --success-color: #10b981;
  --danger-color: #ef4444;
  --warning-color: #f59e0b;
  --info-color: #3b82f6;
}
```

## Barrierefreiheit

Alle Komponenten sind so konzipiert, dass sie den WCAG 2.1 AA-Richtlinien entsprechen. Sie unterstützen Tastaturnavigation, Screenreader und andere Hilfstechnologien.