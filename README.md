# Smolitux UI Bibliothek

Eine moderne React-Komponentenbibliothek zur Erstellung konsistenter Benutzeroberflächen.

> **Hinweis:** Die vollständige Dokumentation ist im [Wiki](https://ecospherenetwork.github.io/smolitux-ui/wiki/) zu finden. Informationen zur Barrierefreiheit stehen in der [Barrierefreiheits-Dokumentation](/docs/wiki/accessibility/README.md).

## Überblick

Smolitux UI ist als Monorepo organisiert. Die wichtigsten Pakete liegen unter `packages/@smolitux/`.

### Enthaltene Pakete

- **@smolitux/core** – Basis‑UI‑Komponenten
- **@smolitux/theme** – Theming und Styling
- **@smolitux/layout** – Layout‑Helfer
- **@smolitux/charts** – Diagramme
- **@smolitux/ai** – KI‑Funktionen
- **@smolitux/blockchain** – Blockchain‑Komponenten
- **@smolitux/community** – Community‑Module
- **@smolitux/federation** – Micro‑Frontend‑Support
- **@smolitux/media** – Medien‑Komponenten
- **@smolitux/resonance** – Soziale Funktionen
- **@smolitux/testing** – Test‑Utilities
- **@smolitux/utils** – Gemeinsame Hilfsfunktionen
- **@smolitux/voice-control** – Sprachsteuerung für UI‑Elemente

## Installation

Diese Bibliothek setzt **Node.js 20** oder höher voraus.

```bash
npm install @smolitux/core @smolitux/theme
# oder
yarn add @smolitux/core @smolitux/theme
```

## Schnellstart

```tsx
import { ThemeProvider } from '@smolitux/theme';
import { Button } from '@smolitux/core';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Los geht's</Button>
    </ThemeProvider>
  );
}
```

## Dokumentation

- [Wiki](https://ecospherenetwork.github.io/smolitux-ui/wiki/)
- Storybook mit `npm run storybook`
- Beispielprojekte im Ordner `examples/`

## Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Storybook starten
npm run storybook

# Pakete bauen
npm run build

# Linting
npm run lint

# Tests ausführen
npm run test
```

## Lizenz

MIT
