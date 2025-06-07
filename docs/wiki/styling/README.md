# Smolitux UI Styling-Dokumentation

Diese Dokumentation beschreibt die verfügbaren Styling-Utilities in der Smolitux UI-Bibliothek.

## Inhaltsverzeichnis

- [Einführung](#einführung)
- [Farben](#farben)
- [Abstände](#abstände)
- [Typografie](#typografie)
- [Responsive Design](#responsive-design)
- [Theming](#theming)
- [Utility-Klassen](#utility-klassen)

## Einführung

Das Styling-System von Smolitux UI bietet eine Sammlung von Utility-Funktionen und -Klassen, die das Styling von Komponenten vereinfachen. Es basiert auf einem konsistenten Design-System mit vordefiniertem Farben, Abständen, Typografie und mehr.

## Farben

Das Farbsystem basiert auf einer Palette von Farben mit verschiedenen Schattierungen.

```typescript
import { colors, getColor, lighten, darken, alpha } from '@smolitux/utils/styling';

// Verwendung der Farbpalette
const primaryColor = colors.primary[500]; // #3b82f6

// Farbe aus dem Theme abrufen
const dangerColor = getColor('danger', 500); // #ef4444
const primaryLight = getColor('primary.100'); // #dbeafe

// Farbe aufhellen
const lightBlue = lighten('#3b82f6', 0.2); // Hellt die Farbe um 20% auf

// Farbe abdunkeln
const darkBlue = darken('#3b82f6', 0.2); // Dunkelt die Farbe um 20% ab

// Alpha-Wert hinzufügen
const transparentBlue = alpha('#3b82f6', 0.5); // rgba(59, 130, 246, 0.5)
```

### Farbpalette

Die Farbpalette umfasst die folgenden Farben mit Schattierungen von 50 bis 950:

- **primary**: Blau-Töne für primäre Aktionen und Hervorhebungen
- **gray**: Grau-Töne für Text, Hintergründe und Ränder
- **success**: Grün-Töne für Erfolgs-Zustände
- **danger**: Rot-Töne für Fehler und Warnungen
- **warning**: Gelb-Töne für Warnungen
- **info**: Blau-Töne für Informationen

## Abstände

Das Abstandssystem basiert auf einer Skala von Werten, die konsistente Abstände in der gesamten Anwendung gewährleisten.

```typescript
import { spacing, getSpacing, m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py } from '@smolitux/utils/styling';

// Abstand aus der Skala abrufen
const space4 = spacing[4]; // 1rem

// Abstand abrufen (unterstützt Zahlen und Strings)
const space = getSpacing(4); // 1rem
const customSpace = getSpacing('2.5rem'); // 2.5rem

// Margin-Utilities
const marginStyles = m(4); // { margin: '1rem' }
const marginTopStyles = mt(2); // { marginTop: '0.5rem' }
const marginRightStyles = mr(3); // { marginRight: '0.75rem' }
const marginBottomStyles = mb(4); // { marginBottom: '1rem' }
const marginLeftStyles = ml(2); // { marginLeft: '0.5rem' }
const marginXStyles = mx(4); // { marginLeft: '1rem', marginRight: '1rem' }
const marginYStyles = my(4); // { marginTop: '1rem', marginBottom: '1rem' }

// Padding-Utilities
const paddingStyles = p(4); // { padding: '1rem' }
const paddingTopStyles = pt(2); // { paddingTop: '0.5rem' }
const paddingRightStyles = pr(3); // { paddingRight: '0.75rem' }
const paddingBottomStyles = pb(4); // { paddingBottom: '1rem' }
const paddingLeftStyles = pl(2); // { paddingLeft: '0.5rem' }
const paddingXStyles = px(4); // { paddingLeft: '1rem', paddingRight: '1rem' }
const paddingYStyles = py(4); // { paddingTop: '1rem', paddingBottom: '1rem' }
```

### Abstandsskala

Die Abstandsskala umfasst die folgenden Werte:

- **0**: 0
- **px**: 1px
- **0.5**: 0.125rem (2px)
- **1**: 0.25rem (4px)
- **1.5**: 0.375rem (6px)
- **2**: 0.5rem (8px)
- **2.5**: 0.625rem (10px)
- **3**: 0.75rem (12px)
- **3.5**: 0.875rem (14px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)
- **32**: 8rem (128px)
- **40**: 10rem (160px)
- **48**: 12rem (192px)
- **56**: 14rem (224px)
- **64**: 16rem (256px)

## Typografie

Das Typografie-System bietet konsistente Schriftgrößen, -gewichte und -stile.

```typescript
import { 
  fontFamily, 
  fontSize, 
  fontWeight, 
  lineHeight, 
  letterSpacing,
  createFontSize,
  createFontWeight,
  createLineHeight,
  createLetterSpacing,
  truncate,
  textAlign,
  textTransform
} from '@smolitux/utils/styling';

// Schriftfamilien
const sansFont = fontFamily.sans;
const monoFont = fontFamily.mono;

// Schriftgrößen
const textBase = fontSize.base; // 1rem
const textLg = fontSize.lg; // 1.125rem

// Schriftgewichte
const normalWeight = fontWeight.normal; // 400
const boldWeight = fontWeight.bold; // 700

// Zeilenhöhen
const normalLineHeight = lineHeight.normal; // 1.5
const tightLineHeight = lineHeight.tight; // 1.25

// Buchstabenabstände
const normalLetterSpacing = letterSpacing.normal; // 0em
const wideLetterSpacing = letterSpacing.wide; // 0.025em

// Typografie-Styles erstellen
const headingStyles = {
  ...createFontSize('2xl'), // { fontSize: '1.5rem' }
  ...createFontWeight('bold'), // { fontWeight: 700 }
  ...createLineHeight('tight'), // { lineHeight: 1.25 }
  ...createLetterSpacing('tight'), // { letterSpacing: '-0.025em' }
};

// Text-Utilities
const truncatedText = truncate; // { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
const centeredText = textAlign.center; // { textAlign: 'center' }
const uppercaseText = textTransform.uppercase; // { textTransform: 'uppercase' }
```

### Schriftgrößen

Die Schriftgrößenskala umfasst die folgenden Werte:

- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)
- **6xl**: 3.75rem (60px)
- **7xl**: 4.5rem (72px)
- **8xl**: 6rem (96px)
- **9xl**: 8rem (128px)

## Responsive Design

Das Responsive-Design-System ermöglicht die Erstellung von Layouts, die sich an verschiedene Bildschirmgrößen anpassen.

```typescript
import { 
  breakpoints, 
  createMediaQuery, 
  responsive, 
  sm, 
  md, 
  lg, 
  xl, 
  xxl,
  createResponsiveStyles
} from '@smolitux/utils/styling';

// Breakpoints
const tabletBreakpoint = breakpoints.md; // 768px
const desktopBreakpoint = breakpoints.lg; // 1024px

// Media-Queries erstellen
const tabletMediaQuery = createMediaQuery('md'); // @media (min-width: 768px)
const customMediaQuery = createMediaQuery('1200px'); // @media (min-width: 1200px)

// Responsive Styles erstellen
const responsiveStyles = {
  fontSize: '1rem',
  ...sm({ fontSize: '1.25rem' }), // @media (min-width: 640px) { fontSize: '1.25rem' }
  ...md({ fontSize: '1.5rem' }), // @media (min-width: 768px) { fontSize: '1.5rem' }
  ...lg({ fontSize: '1.75rem' }), // @media (min-width: 1024px) { fontSize: '1.75rem' }
};

// Responsive Styles für eine Eigenschaft erstellen
const responsiveFontSize = createResponsiveStyles('fontSize', {
  base: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '1.75rem',
  xl: '2rem',
  '2xl': '2.25rem',
});
```

### Breakpoints

Die Breakpoints umfassen die folgenden Werte:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Theming

Das Theming-System ermöglicht die Anpassung des Erscheinungsbilds der Komponenten.

```typescript
import { defaultTheme, createTheme } from '@smolitux/utils/styling';

// Standard-Theme verwenden
const theme = defaultTheme;

// Benutzerdefiniertes Theme erstellen
const customTheme = createTheme({
  colors: {
    primary: {
      500: '#8b5cf6', // Lila statt Blau
    },
  },
  fontFamily: {
    sans: 'Roboto, sans-serif',
  },
});
```

## Utility-Klassen

Die Bibliothek bietet auch CSS-Utility-Klassen, die direkt in JSX verwendet werden können.

```jsx
// Beispiel für die Verwendung von Utility-Klassen
function Example() {
  return (
    <div className="text-primary-600 dark:text-primary-400">
      <p className="text-gray-700 dark:text-gray-300">
        Ein Beispieltext mit Utility-Klassen.
      </p>
      <button className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
        Klick mich
      </button>
    </div>
  );
}
```

### Verfügbare Utility-Klassen

- **Farben**: `text-{color}-{shade}`, `bg-{color}-{shade}`, `border-{color}-{shade}`
- **Dark Mode**: `dark:text-{color}-{shade}`, `dark:bg-{color}-{shade}`, `dark:border-{color}-{shade}`
- **Hover**: `hover:text-{color}-{shade}`, `hover:bg-{color}-{shade}`, `hover:border-{color}-{shade}`
- **Focus**: `focus:outline-none`, `focus:ring-{width}`, `focus:ring-{color}-{shade}`
- **Animationen**: `animate-spin`, `animate-pulse`
- **Sichtbarkeit**: `invisible`, `opacity-0`
- **Z-Index**: `z-{value}`