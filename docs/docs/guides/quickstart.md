# Schnellstart-Anleitung

Diese Anleitung hilft Ihnen, schnell mit Smolitux UI zu beginnen und die Komponenten in Ihrem React-Projekt zu verwenden.

## Installation

Installieren Sie die Smolitux UI Pakete über npm oder yarn:

```bash
# Mit npm
npm install @smolitux/core @smolitux/layout @smolitux/charts

# Mit yarn
yarn add @smolitux/core @smolitux/layout @smolitux/charts
```

## Einrichtung

Smolitux UI verwendet ein Theming-System, das über den `ThemeProvider` bereitgestellt wird. Wickeln Sie Ihre Anwendung in den `ThemeProvider` ein, um das Standard-Theme zu verwenden:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@smolitux/theme';
import App from './App';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
```

## Verwendung der Komponenten

Nach der Installation können Sie die Komponenten direkt in Ihren React-Komponenten importieren und verwenden:

```jsx
import React, { useState } from 'react';
import { Button, Input, Card } from '@smolitux/core';
import { Container, Grid } from '@smolitux/layout';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Anmeldung verarbeiten
    console.log('Anmeldung mit:', email, password);
  };

  return (
    <Container>
      <Card title="Anmelden">
        <form onSubmit={handleSubmit}>
          <Grid spacing="md">
            <Input
              label="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary">
              Anmelden
            </Button>
          </Grid>
        </form>
      </Card>
    </Container>
  );
}

export default LoginForm;
```

## Anpassung des Themes

Sie können das Standard-Theme anpassen, indem Sie ein benutzerdefiniertes Theme an den `ThemeProvider` übergeben:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@smolitux/theme';
import App from './App';

// Benutzerdefiniertes Theme erstellen
const customTheme = createTheme({
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    error: '#e74c3c',
    warning: '#f39c12',
    info: '#1abc9c',
    success: '#27ae60',
  },
  fonts: {
    body: '"Open Sans", sans-serif',
    heading: '"Montserrat", sans-serif',
  },
  // Weitere Theme-Anpassungen...
});

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
```

## Responsive Design

Smolitux UI Komponenten sind standardmäßig responsiv. Das Grid-System unterstützt verschiedene Breakpoints:

```jsx
import { Grid } from '@smolitux/layout';

function ResponsiveLayout() {
  return (
    <Grid>
      {/* Diese Spalte nimmt 12/12 auf mobilen Geräten, 6/12 auf Tablets und 4/12 auf Desktop-Geräten ein */}
      <Grid.Item xs={12} md={6} lg={4}>
        Inhalt 1
      </Grid.Item>
      <Grid.Item xs={12} md={6} lg={4}>
        Inhalt 2
      </Grid.Item>
      <Grid.Item xs={12} md={12} lg={4}>
        Inhalt 3
      </Grid.Item>
    </Grid>
  );
}
```

## Nächste Schritte

- Erkunden Sie die [Komponenten-Übersicht](../components/overview.md), um alle verfügbaren Komponenten kennenzulernen
- Lesen Sie die detaillierte Dokumentation für jede Komponente
- Sehen Sie sich die [API-Referenz](../api/reference.md) für fortgeschrittene Anpassungen an