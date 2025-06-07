# Theming-Richtlinien für Smolitux UI

## Einführung

Das Theming-System der Smolitux UI Bibliothek ermöglicht es, das Erscheinungsbild der Komponenten konsistent anzupassen. Diese Richtlinien beschreiben, wie das Theming-System funktioniert und wie es verwendet werden kann.

## Grundkonzepte

### Design-Tokens

Design-Tokens sind die grundlegenden Bausteine des Theming-Systems. Sie repräsentieren visuelle Eigenschaften wie Farben, Abstände, Typografie und mehr. Diese Tokens werden in Tailwind CSS konfiguriert und sind über Klassen in allen Komponenten verfügbar.

### Farbsystem

Das Farbsystem basiert auf semantischen Farbvariablen, die in verschiedenen Kontexten verwendet werden:

- **Primärfarbe**: Hauptfarbe der Anwendung, verwendet für primäre Aktionen und Hervorhebungen
- **Sekundärfarbe**: Ergänzende Farbe, verwendet für sekundäre Aktionen und Elemente
- **Erfolgsfarbe**: Grüntöne für erfolgreiche Aktionen und positive Zustände
- **Warnfarbe**: Gelb-/Orangetöne für Warnungen und Aufmerksamkeit erfordernde Zustände
- **Fehlerfarbe**: Rottöne für Fehler und kritische Zustände
- **Infofarbe**: Blautöne für informative Zustände und Hinweise
- **Neutrale Farben**: Grautöne für Text, Hintergründe und Ränder

Jede semantische Farbe hat verschiedene Schattierungen (50-900), die für verschiedene Zustände und Kontraste verwendet werden.

### Abstände und Größen

Wir verwenden ein konsistentes Abstandssystem mit folgenden Werten:

- **none**: 0px
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

Diese Abstände werden für Margins, Paddings, Gaps und andere Abstandseigenschaften verwendet.

### Typografie

Das Typografiesystem definiert Schriftfamilien, -größen, -gewichte und Zeilenhöhen:

- **Schriftfamilien**: Sans-serif (UI), Serif (Inhalte), Monospace (Code)
- **Schriftgrößen**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
- **Schriftgewichte**: light, normal, medium, semibold, bold
- **Zeilenhöhen**: tight, normal, relaxed, loose

### Radien und Schatten

Für konsistente Formen und Tiefe:

- **Radien**: none, sm, md, lg, xl, full
- **Schatten**: none, sm, md, lg, xl, inner

## Implementierung des Themings

### Tailwind-Konfiguration

Die Design-Tokens werden in der Tailwind-Konfiguration definiert:

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ...weitere Schattierungen
        600: '#0284c7',
        // ...weitere Schattierungen
      },
      // ...weitere Farben
    },
    spacing: {
      none: '0',
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    // ...weitere Token-Definitionen
  },
  // ...weitere Konfiguration
};
```

### CSS-Variablen

Für dynamisches Theming verwenden wir CSS-Variablen:

```css
:root {
  --color-primary-50: theme('colors.primary.50');
  --color-primary-100: theme('colors.primary.100');
  /* ...weitere Variablen */
}

.dark {
  --color-primary-50: theme('colors.primary.900');
  --color-primary-100: theme('colors.primary.800');
  /* ...weitere Variablen für Dark Mode */
}
```

### Verwendung in Komponenten

Komponenten verwenden die Design-Tokens über Tailwind-Klassen:

```tsx
<button 
  className={classNames(
    'px-md py-sm rounded-md font-medium',
    variant === 'primary' && 'bg-primary-600 text-white hover:bg-primary-700',
    variant === 'secondary' && 'bg-secondary-600 text-white hover:bg-secondary-700',
    size === 'sm' && 'text-sm',
    size === 'lg' && 'text-lg',
  )}
>
  {children}
</button>
```

## Anpassung des Themes

### Globale Theme-Anpassung

Das Theme kann global angepasst werden, indem die Tailwind-Konfiguration überschrieben wird:

```js
// custom-theme.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Überschreiben der Primärfarbe
          600: '#0070f3',
        },
      },
    },
  },
};
```

### Komponenten-spezifische Anpassung

Komponenten können über Props angepasst werden:

```tsx
<Button 
  variant="primary"
  size="lg"
  className="custom-button-class"
>
  Angepasster Button
</Button>
```

### Theme-Provider

Für dynamisches Theming verwenden wir einen Theme-Provider:

```tsx
import { ThemeProvider } from '@smolitux/core';

function App() {
  return (
    <ThemeProvider theme="light" customTheme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Dark Mode

Smolitux UI unterstützt Dark Mode über Tailwind's Dark Mode-Funktionalität:

```tsx
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  Inhalt mit Dark Mode-Unterstützung
</div>
```

Der Dark Mode kann über den Theme-Provider gesteuert werden:

```tsx
<ThemeProvider theme="dark">
  <YourApp />
</ThemeProvider>
```

## Responsive Design

Alle Komponenten sind responsiv gestaltet und verwenden Tailwind's Breakpoint-System:

```tsx
<div className="flex-col sm:flex-row md:flex-col lg:flex-row">
  Responsives Layout
</div>
```

Die Standard-Breakpoints sind:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Barrierefreiheit und Theming

Bei der Anpassung des Themes ist es wichtig, die Barrierefreiheit zu berücksichtigen:

1. **Farbkontrast**: Stelle sicher, dass der Kontrast zwischen Text und Hintergrund den WCAG-Richtlinien entspricht (mindestens 4,5:1 für normalen Text, 3:1 für großen Text).
2. **Fokusindikatoren**: Behalte deutliche Fokusindikatoren bei, auch wenn das Theme angepasst wird.
3. **Konsistenz**: Halte die visuelle Hierarchie und Bedeutung von Farben konsistent.

## Best Practices

1. **Verwende semantische Farben**: Nutze die semantischen Farbvariablen statt direkter Farbwerte.
2. **Respektiere das Abstandssystem**: Verwende die definierten Abstandswerte für konsistente Layouts.
3. **Teste verschiedene Themes**: Teste deine Komponenten mit verschiedenen Themes und im Dark Mode.
4. **Berücksichtige Barrierefreiheit**: Stelle sicher, dass angepasste Themes die Barrierefreiheitsrichtlinien erfüllen.
5. **Dokumentiere Theme-Anpassungen**: Dokumentiere, wie deine Komponenten auf Theme-Änderungen reagieren.

## Beispiele

### Beispiel: Button mit verschiedenen Themes

```tsx
// Standard-Theme
<Button variant="primary">Standard Button</Button>

// Angepasstes Theme
<ThemeProvider customTheme={customTheme}>
  <Button variant="primary">Angepasster Button</Button>
</ThemeProvider>

// Dark Mode
<ThemeProvider theme="dark">
  <Button variant="primary">Dark Mode Button</Button>
</ThemeProvider>
```

### Beispiel: Responsive Card mit Theme-Anpassung

```tsx
<Card 
  className="bg-white dark:bg-gray-800 p-sm md:p-md lg:p-lg"
  titleClassName="text-lg md:text-xl text-primary-700 dark:text-primary-300"
>
  <h2>Responsive Card</h2>
  <p>Inhalt mit Theme-Anpassung</p>
</Card>
```

## Ressourcen

- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [WCAG Farbkontrast-Richtlinien](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Material Design Theming](https://material.io/design/material-theming/overview.html)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)