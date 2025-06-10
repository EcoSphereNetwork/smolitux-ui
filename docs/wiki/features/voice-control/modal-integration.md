# Sprachgesteuerte Modale

Diese Anleitung zeigt, wie Sie die Voice-Control-Funktion von Smolitux UI nutzen können, um ein Modal per Sprachbefehl öffnen und schließen zu können.

## Voraussetzungen

- `@smolitux/voice-control` muss installiert sein.
- Die Anwendung wird mit `VoiceControlProvider` umschlossen, sodass Sprachbefehle global erkannt werden.

```tsx
import React from 'react';
import { VoiceControlProvider } from '@smolitux/voice-control';

function App() {
  return (
    <VoiceControlProvider engineType="tensorFlow">
      <YourApp />
    </VoiceControlProvider>
  );
}
```

## Komponenten mit Sprachsteuerung erweitern

Zur Registrierung der Befehle wird das HOC `withVoiceControl` verwendet. Damit lassen sich beliebige Komponenten mit Sprachfähigkeiten ausstatten.

```tsx
import { withVoiceControl } from '@smolitux/voice-control';
```

## Beispiel: VoiceModal

Für Modale stellt Smolitux UI bereits eine vorgfertigte `VoiceModal`-Komponente bereit. Sie hört auf Befehle wie `schließen` oder `cancel` und kann mit einem `VoiceButton` geöffnet werden.

```tsx
const [isOpen, setIsOpen] = useState(false);

<VoiceButton onClick={() => setIsOpen(true)} voiceCommands={["öffnen", "open"]}>
  Modal öffnen
</VoiceButton>

<VoiceModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Beispiel-Modal"
>
  <p>Dieses Modal kann mit Sprachbefehlen geschlossen werden.</p>
  <VoiceButton onClick={() => setIsOpen(false)}>Schließen</VoiceButton>
</VoiceModal>
```

Der `VoiceButton` registriert die Befehle `öffnen` und `open`, während das `VoiceModal` Befehle wie `schließen`, `close`, `abbrechen` und `cancel` erkennt.

## Eigene Befehle registrieren

Sie können weitere Befehle definieren, indem Sie das Prop `voiceCommands` übergeben oder das HOC direkt bei eigenen Komponenten einsetzen:

```tsx
const CustomModal = withVoiceControl(Modal, ["schließen", "cancel"]);
```

Damit lässt sich jede Komponente auf individuelle Sprachbefehle ansprechen.

## Zusammenfassung

1. `VoiceControlProvider` umschließt die App und erkennt Befehle.
2. Mit `withVoiceControl` werden Komponenten registriert.
3. `VoiceModal` kombiniert Modal und Sprachsteuerung für komfortables Öffnen und Schließen per Sprache.
