# Smolitux UI - Quick Start Guide

Diese Anleitung hilft dir beim Einstieg in die Smolitux UI Komponentenbibliothek.

## Voraussetzungen

- Node.js 16 oder hoher
- npm oder yarn
- Git

## Installation

### Installation in deinem Projekt

1. Installiere die Smolitux UI Pakete:

   ```bash
   # Mit npm
   npm install @smolitux/core @smolitux/theme
   
   # Mit yarn
   yarn add @smolitux/core @smolitux/theme
   
   # Optional: Layout-Komponenten
   npm install @smolitux/layout
   
   # Optional: Chart-Komponenten
   npm install @smolitux/charts
   ```

2. Konfiguriere den ThemeProvider in deiner App:

   ```jsx
   import React from 'react';
   import { ThemeProvider } from '@smolitux/theme';
   import { Button } from '@smolitux/core';
   
   function App() {
     return (
       <ThemeProvider>
         <div className="app">
           <Button variant="primary">Mein Button</Button>
         </div>
       </ThemeProvider>
     );
   }
   
   export default App;
   ```

## Entwicklung der Bibliothek

1. Klone das Repository:

   ```bash
   git clone https://github.com/EcoSphereNetwork/smolitux-ui.git
   cd smolitux-ui
   ```

2. Installiere die Abhangigkeiten:

   ```bash
   npm install
   ```

3. Starte die Storybook-Entwicklungsumgebung:

   ```bash
   npm run storybook
   ```

4. Fuhre Tests aus:

   ```bash
   npm test
   ```

## Verfugbare Pakete

Die Smolitux UI Bibliothek ist in mehrere Pakete aufgeteilt:

- **@smolitux/core**: Grundlegende UI-Komponenten (Buttons, Inputs, Cards, etc.)
- **@smolitux/theme**: Theme-Provider und Styling-Utilities
- **@smolitux/layout**: Layout-Komponenten (Container, Grid, Flex, etc.)
- **@smolitux/charts**: Datenvisualisierungskomponenten (LineChart, BarChart, etc.)

## Beispiel: Verwendung von Komponenten

```jsx
import React from 'react';
import { ThemeProvider } from '@smolitux/theme';
import { Button, Card, Input } from '@smolitux/core';
import { Container, Grid } from '@smolitux/layout';

function MyApp() {
  return (
    <ThemeProvider>
      <Container maxWidth="lg">
        <h1>Meine Anwendung</h1>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <Card.Header>Formular</Card.Header>
              <Card.Body>
                <Input label="Name" placeholder="Dein Name" />
                <Button variant="primary" className="mt-4">Absenden</Button>
              </Card.Body>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <Card.Header>Informationen</Card.Header>
              <Card.Body>
                <p>Hier sind weitere Informationen.</p>
              </Card.Body>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
```

## Nachste Schritte

- Lies den [Entwicklungsleitfaden](../development/guide.md)
- Schau dir die [API-Referenz](../api/reference.md) an
- Entdecke die [Komponenten-Dokumentation](../components/overview.md)
