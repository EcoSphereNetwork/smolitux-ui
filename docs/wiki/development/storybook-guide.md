# Storybook Leitfaden

Storybook dient der interaktiven Dokumentation aller Komponenten von **Smolitux UI**. Dieses Dokument beschreibt die grundlegende Struktur der Stories und wie du Storybook nutzen kannst.

## Storybook starten

Führe im Projektverzeichnis folgenden Befehl aus:

```bash
npm run storybook
```

Anschließend ist die Oberfläche unter <http://localhost:6006> erreichbar.

## Struktur der Stories

- Alle Stories liegen neben den jeweiligen Komponenten und haben die Endung `.stories.tsx`.
- Barrierefreiheits-Tests werden in Dateien mit `.a11y.stories.tsx` gepflegt.
- Die globale Konfiguration befindet sich im Verzeichnis `.storybook/`.

## Beispiel einer Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Primärer Button für Benutzeraktionen',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Klick mich',
  },
};
```

## Storybook bauen

Um ein statisches Storybook zu erzeugen, nutze:

```bash
npm run build-storybook
```

Das Ergebnis findest du im Ordner `storybook-static`. Dieses Verzeichnis kann direkt auf einem Webserver bereitgestellt werden.

## Weitere Links

- [Dokumentationsstrategie](./documentation-strategy.md)
- [API-Referenz](../api/reference.md)
