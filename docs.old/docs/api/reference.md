# API-Referenz

Diese Seite bietet eine detaillierte API-Referenz für alle Komponenten der Smolitux UI Bibliothek.

## Core-Komponenten

### Button

```tsx
import { Button } from '@smolitux/core';

<Button
  variant="primary"
  size="md"
  disabled={false}
  onClick={() => console.log('Button geklickt')}
>
  Klick mich
</Button>
```

#### Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `variant` | String | `'primary'` | Die Variante des Buttons |
| `size` | String | `'md'` | Die Größe des Buttons |
| `disabled` | Boolean | `false` | Deaktiviert den Button |

### Input

```tsx
import { Input } from '@smolitux/core';

<Input
  label="E-Mail"
  type="email"
  placeholder="name@beispiel.de"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Ungültige E-Mail-Adresse"
/>
```

## Layout-Komponenten

### Container

```tsx
import { Container } from '@smolitux/layout';

<Container maxWidth="lg" disableGutters={false}>
  <h1>Meine Seite</h1>
  <p>Inhalt, der auf verschiedenen Bildschirmgrößen konsistent angezeigt wird</p>
</Container>
```
