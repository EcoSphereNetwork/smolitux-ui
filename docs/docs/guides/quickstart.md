---
sidebar_position: 1
---

# Schnellstart-Anleitung

Diese Anleitung hilft Ihnen, schnell mit Smolitux-UI zu beginnen.

## Installation

Sie können Smolitux-UI über npm oder yarn installieren:

```bash
# Mit npm
npm install @smolitux/ui

# Mit yarn
yarn add @smolitux/ui
```

## Grundlegende Verwendung

Hier ist ein einfaches Beispiel, wie Sie Smolitux-UI in Ihrer Anwendung verwenden können:

```jsx
import React from 'react';
import { Button, Container, Card } from '@smolitux/ui';

function App() {
  return (
    <Container>
      <Card title="Willkommen bei Smolitux-UI">
        <p>Dies ist ein einfaches Beispiel für die Verwendung von Smolitux-UI-Komponenten.</p>
        <Button variant="primary">Klick mich</Button>
      </Card>
    </Container>
  );
}

export default App;
```

## Theming

Smolitux-UI unterstützt Theming, um das Erscheinungsbild an Ihre Marke anzupassen:

```jsx
import React from 'react';
import { ThemeProvider, createTheme } from '@smolitux/ui';

// Erstellen Sie ein benutzerdefiniertes Theme
const theme = createTheme({
  colors: {
    primary: '#0066cc',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
  },
  // Weitere Theme-Optionen...
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Ihre Anwendung hier */}
    </ThemeProvider>
  );
}

export default App;
```

## Nächste Schritte

- Erkunden Sie die [Komponenten-Dokumentation](../components/overview) für detaillierte Informationen zu jeder Komponente
- Sehen Sie sich die [Beispiele](../examples/form-examples) für Formulare an
- Lesen Sie die [Entwicklungsanleitung](../development/guide) für weitere Informationen