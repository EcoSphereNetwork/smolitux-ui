# Sprachsteuerung in Smolitux UI

Diese Anleitung zeigt, wie Sie die Sprachsteuerungsfunktionen von Smolitux UI nutzen und insbesondere ein Modal per Sprachbefehl öffnen und schließen können.

## 1. Voice Control Infrastruktur

Die Sprachsteuerung basiert auf dem `VoiceControlProvider` und dem `withVoiceControl` Higher-Order Component (HOC). Der Provider stellt Registrierungsfunktionen bereit:

```ts
const registerComponent = (id: string, commands: string[]) =>
  manager.registerComponent(id, commands);
const unregisterComponent = (id: string) => manager.unregisterComponent(id);
```

## 2. Komponenten mit `withVoiceControl` erweitern

Binden Sie interaktive Komponenten mit dem HOC ein. Dadurch werden sie automatisch registriert und reagieren auf erkannte Befehle:

```ts
export function withVoiceControl<P extends object>(
  Component: React.ComponentType<P>,
  defaultCommands: string[] = []
) {
  return React.forwardRef<unknown, P & VoiceControlProps>((props, ref) => {
    const { voiceCommands = defaultCommands, voiceEnabled = true, onVoiceCommand, ...rest } = props;
    ...
    useEffect(() => {
      if (voiceEnabled && voiceCommands.length > 0) {
        registerComponent(id, voiceCommands);
      }
      return () => {
        if (voiceEnabled) {
          unregisterComponent(id);
        }
      };
    }, [id, registerComponent, unregisterComponent, voiceEnabled, voiceCommands]);

    useEffect(() => {
      if (targetComponent === id && lastCommand && onVoiceCommand) {
        onVoiceCommand(lastCommand);
      }
    }, [id, lastCommand, onVoiceCommand, targetComponent]);

    return <Component ref={ref || componentRef} {...(rest as P)} />;
  });
}
```

## 3. Modal per Sprachbefehl steuern

Das folgende Beispiel zeigt eine `VoiceModal`, die auf Befehle wie „schließen“ oder „cancel" reagiert. Ein `VoiceButton` öffnet das Modal mit Befehlen wie „öffnen" oder „open":

```tsx
// src/components/voice/VoiceModal.tsx
import React from 'react';
import { Modal, ModalProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceModalProps = ModalProps & VoiceControlProps;

const VoiceModalBase: React.FC<VoiceModalProps> = ({
  onVoiceCommand,
  onClose,
  children,
  ...props
}) => {
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();

    // Befehle zum Schließen des Modals
    if (
      lowerCommand === 'schließen' ||
      lowerCommand === 'close' ||
      lowerCommand === 'abbrechen' ||
      lowerCommand === 'cancel'
    ) {
      if (onClose) {
        onClose();
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Modal onClose={onClose} {...props}>
      {children}
    </Modal>
  );
};

export const VoiceModal = withVoiceControl(
  VoiceModalBase,
  ['schließen', 'close', 'abbrechen', 'cancel']
);

const [isOpen, setIsOpen] = useState(false);

<VoiceButton onClick={() => setIsOpen(true)} voiceCommands={['öffnen', 'open']}>
  Modal öffnen
</VoiceButton>

<VoiceModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Beispiel-Modal">
  <p>Dieses Modal kann mit Sprachbefehlen geschlossen werden.</p>
  <VoiceButton onClick={() => setIsOpen(false)}>Schließen</VoiceButton>
</VoiceModal>
```

## 4. Provider einbinden

Um die Sprachsteuerung zu aktivieren, umgeben Sie Ihre App mit dem `VoiceControlProvider` und konfigurieren Sie ggf. eine Erkennungs-Engine:

```tsx
import React from 'react';
import { VoiceControlProvider } from '@smolitux/voice-control';

function App() {
  return (
    <VoiceControlProvider
      engineType="tensorFlow"
      tensorFlowOptions={{
        modelType: 'BROWSER_FFT',
        vocabulary: 'general',
        scoreThreshold: 0.75,
      }}
    >
      <YourApp />
    </VoiceControlProvider>
  );
}
```

## Zusammenfassung

1. Binden Sie `VoiceControlProvider` global ein.
2. Verwenden Sie `withVoiceControl`, um Komponenten mit Sprachbefehlen auszustatten.
3. Nutzen Sie eine `VoiceModal`, um Dialoge per Sprache zu öffnen und zu schließen.
4. Registrieren Sie individuelle Befehle über die `voiceCommands`‑Prop.

Damit lässt sich die Modalsteuerung vollständig per Sprache bedienen.

