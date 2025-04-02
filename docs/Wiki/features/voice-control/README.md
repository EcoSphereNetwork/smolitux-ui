# Sprachsteuerung für Smolitux-UI

Diese Dokumentation beschreibt die Sprachsteuerungsfunktionalität für die Smolitux-UI-Bibliothek, die eine vollständige Steuerung aller UI-Komponenten durch Sprachbefehle ermöglicht.

## Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Architektur](#architektur)
3. [Implementierung](#implementierung)
4. [Komponenten-Integration](#komponenten-integration)
5. [TensorFlow.js-Integration](#tensorflowjs-integration)
6. [Barrierefreiheit](#barrierefreiheit)
7. [Mehrsprachige Unterstützung](#mehrsprachige-unterstützung)
8. [Leistungsoptimierung](#leistungsoptimierung)
9. [Beispiele](#beispiele)

## Übersicht

Die Sprachsteuerungsfunktionalität ermöglicht Benutzern, mit Smolitux-UI-Komponenten durch Sprachbefehle zu interagieren. Dies verbessert die Barrierefreiheit und bietet eine alternative Eingabemethode für verschiedene Anwendungsfälle.

### Hauptfunktionen

- **Vollständige Komponentensteuerung**: Alle Smolitux-UI-Komponenten können mit Sprachbefehlen gesteuert werden
- **Mehrere Erkennungs-Backends**: Unterstützung für Web Speech API, TensorFlow.js und externe Dienste
- **Offline-Funktionalität**: Lokale Spracherkennung mit TensorFlow.js ohne Internetverbindung
- **Barrierefreiheit**: Verbesserte Zugänglichkeit für Benutzer mit eingeschränkter Mobilität
- **Mehrsprachige Unterstützung**: Unterstützung für verschiedene Sprachen und Dialekte
- **Anpassbare Befehle**: Benutzerdefinierte Sprachbefehle für spezifische Anwendungsfälle

## Architektur

Die Sprachsteuerungsarchitektur besteht aus mehreren Schichten:

```
┌─────────────────────────────────────────────────────────────┐
│                  Smolitux-UI Komponenten                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Button    │  │    Input    │  │  Andere Komponenten │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                VoiceControlProvider (Context)               │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    VoiceControlManager                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Recognition │  │  Command    │  │     Feedback        │  │
│  │   Engine    │  │  Processor  │  │     Manager         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Speech Recognition API                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Web Speech  │  │ TensorFlow  │  │ Externe Dienste     │  │
│  │     API     │  │     JS      │  │ (Google, Azure)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Hauptkomponenten

1. **VoiceControlProvider**: Ein React Context Provider, der die Sprachsteuerungsfunktionalität für alle Komponenten bereitstellt.

2. **VoiceControlManager**: Verwaltet die Spracherkennung, Befehlsverarbeitung und Feedback.
   - **Recognition Engine**: Verarbeitet Audioeingaben und konvertiert sie in Text.
   - **Command Processor**: Interpretiert erkannte Texte und ordnet sie Komponentenaktionen zu.
   - **Feedback Manager**: Bietet akustisches und visuelles Feedback für Benutzerinteraktionen.

3. **Speech Recognition API**: Abstraktionsschicht für verschiedene Spracherkennungs-Backends.
   - **Web Speech API**: Browserbasierte Spracherkennung.
   - **TensorFlow.js**: Lokale Spracherkennungsmodelle.
   - **Externe Dienste**: Integration mit Cloud-basierten Spracherkennungsdiensten.

4. **Komponenten-Integration**: Jede Smolitux-UI-Komponente wird mit Sprachsteuerungsfunktionen erweitert.

## Implementierung

Die Implementierung der Sprachsteuerungsfunktionalität ist in mehrere Module aufgeteilt:

1. **VoiceControlProvider**: Stellt einen React Context bereit, der die Sprachsteuerungsfunktionalität für alle Komponenten zugänglich macht.

2. **Recognition Engines**: Verschiedene Implementierungen für die Spracherkennung:
   - **WebSpeechRecognitionEngine**: Verwendet die Web Speech API des Browsers.
   - **TensorFlowRecognitionEngine**: Verwendet TensorFlow.js für lokale Spracherkennung.
   - **ExternalServiceEngine**: Integriert externe Spracherkennungsdienste.

3. **Command Processor**: Verarbeitet erkannte Texte und ordnet sie Komponentenaktionen zu.

4. **Feedback Manager**: Bietet visuelles und akustisches Feedback für Benutzerinteraktionen.

5. **HOC und Hooks**: Higher-Order Components und React Hooks für die einfache Integration in Komponenten.

Weitere Details zur Implementierung finden Sie in der [Implementierungsdokumentation](./implementation-guide.md).

## Komponenten-Integration

Alle Smolitux-UI-Komponenten können mit Sprachsteuerungsfunktionen erweitert werden. Die Integration erfolgt über das `withVoiceControl` Higher-Order Component (HOC) und den `useVoiceControl` Hook.

Beispiel für eine sprachgesteuerte Button-Komponente:

```tsx
import React from 'react';
import { Button, ButtonProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceButtonProps = ButtonProps & VoiceControlProps;

const VoiceButtonBase: React.FC<VoiceButtonProps> = ({ 
  onVoiceCommand, 
  onClick,
  children,
  ...props 
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    if (command.toLowerCase() === 'klick' || command.toLowerCase() === 'click') {
      // Simuliere einen Klick-Event
      const buttonElement = document.getElementById(props.id || '');
      if (buttonElement) {
        buttonElement.click();
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Button
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export const VoiceButton = withVoiceControl(
  VoiceButtonBase, 
  ['klick', 'click', 'drücken', 'press']
);
```

Weitere Details zur Komponenten-Integration finden Sie in der [Komponenten-Integrationsdokumentation](./component-integration.md).

## TensorFlow.js-Integration

Für Anwendungen, die TensorFlow verwenden, bietet die Sprachsteuerungsarchitektur eine nahtlose Integration mit TensorFlow.js-basierten Spracherkennungsmodellen.

Vorteile der TensorFlow.js-Integration:

- **Offline-Funktionalität**: Spracherkennung funktioniert auch ohne Internetverbindung
- **Anpassbare Modelle**: Möglichkeit, eigene Modelle zu trainieren und anzupassen
- **Datenschutz**: Audiodaten werden lokal verarbeitet und nicht an externe Server gesendet

Beispiel für die Verwendung der TensorFlow.js-Integration:

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
        scoreThreshold: 0.75
      }}
    >
      <YourApp />
    </VoiceControlProvider>
  );
}
```

Weitere Details zur TensorFlow.js-Integration finden Sie in der [TensorFlow.js-Integrationsdokumentation](./tensorflow-integration.md).

## Barrierefreiheit

Die Sprachsteuerungsfunktionalität verbessert die Barrierefreiheit der Smolitux-UI-Bibliothek durch:

- **ARIA-Attribute**: Alle sprachgesteuerten Komponenten enthalten ARIA-Attribute, die auf die verfügbaren Sprachbefehle hinweisen.
- **Tastaturunterstützung**: Tastaturkürzel zum Starten und Stoppen der Spracherkennung.
- **Visuelles Feedback**: Visuelle Indikatoren für den Spracherkennungsstatus.
- **Akustisches Feedback**: Akustische Signale für Benutzerinteraktionen.

Beispiel für barrierefreie Sprachsteuerung:

```tsx
<VoiceButton
  aria-label="Speichern"
  aria-describedby="voice-command-hint"
  voiceCommands={['speichern', 'sichern']}
>
  Speichern
</VoiceButton>

<div id="voice-command-hint" className="sr-only">
  Sie können diesen Button mit den Sprachbefehlen "speichern" oder "sichern" aktivieren.
</div>
```

## Mehrsprachige Unterstützung

Die Sprachsteuerungsfunktionalität unterstützt mehrere Sprachen und Dialekte:

- **Sprachkonfiguration**: Konfiguration der Erkennungssprache über den `language`-Parameter.
- **Lokalisierte Befehle**: Vordefinierte Befehle für verschiedene Sprachen.
- **Sprachspezifische Modelle**: TensorFlow.js-Modelle für verschiedene Sprachen.

Beispiel für mehrsprachige Unterstützung:

```tsx
import React from 'react';
import { VoiceControlProvider } from '@smolitux/voice-control';
import { localizedCommands } from './localizedCommands';

function App() {
  // Sprache basierend auf Benutzereinstellungen oder Browser-Sprache
  const userLanguage = navigator.language || 'de-DE';
  
  return (
    <VoiceControlProvider language={userLanguage}>
      <YourApp />
    </VoiceControlProvider>
  );
}
```

## Leistungsoptimierung

Für eine optimale Leistung bietet die Sprachsteuerungsfunktionalität verschiedene Optimierungsmöglichkeiten:

- **Lazy Loading**: Lazy Loading der Sprachsteuerungskomponenten und Modelle.
- **WebWorker**: Ausführung der Spracherkennung in einem WebWorker für bessere Leistung.
- **Modellquantisierung**: Verwendung quantisierter TensorFlow.js-Modelle für geringere Größe und schnellere Inferenz.
- **Selektives Laden**: Laden nur der benötigten Sprachmodelle basierend auf der Benutzersprache.

Beispiel für Lazy Loading:

```tsx
import React, { lazy, Suspense } from 'react';

// Lazy-Laden der Sprachsteuerungskomponenten
const VoiceControlProvider = lazy(() => import('@smolitux/voice-control/VoiceControlProvider'));
const VoiceButton = lazy(() => import('@smolitux/voice-control/VoiceButton'));

function App() {
  return (
    <Suspense fallback={<div>Lade Sprachsteuerung...</div>}>
      <VoiceControlProvider>
        <Suspense fallback={<button>Lade...</button>}>
          <VoiceButton>Klick mich</VoiceButton>
        </Suspense>
      </VoiceControlProvider>
    </Suspense>
  );
}
```

## Beispiele

### Grundlegende Verwendung

```tsx
import React from 'react';
import { VoiceControlProvider } from '@smolitux/voice-control';
import { VoiceButton, VoiceInput } from '@smolitux/voice-control/components';

function App() {
  return (
    <VoiceControlProvider>
      <div className="app">
        <h1>Sprachgesteuerte Anwendung</h1>
        
        <VoiceButton>Klick mich</VoiceButton>
        
        <VoiceInput 
          placeholder="Sprich, um Text einzugeben"
          voiceCommands={['eingabe', 'löschen']}
        />
      </div>
    </VoiceControlProvider>
  );
}
```

### Komplexe Formulare

```tsx
import React from 'react';
import { VoiceControlProvider } from '@smolitux/voice-control';
import { VoiceForm, VoiceInput, VoiceSelect, VoiceCheckbox, VoiceButton } from '@smolitux/voice-control/components';

function App() {
  return (
    <VoiceControlProvider>
      <div className="app">
        <h1>Sprachgesteuertes Formular</h1>
        
        <VoiceForm 
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted');
          }}
          voiceCommands={['formular absenden', 'formular zurücksetzen']}
        >
          <VoiceInput 
            name="name"
            label="Name"
            placeholder="Geben Sie Ihren Namen ein"
            voiceCommands={['name eingeben']}
          />
          
          <VoiceSelect 
            name="category"
            label="Kategorie"
            options={[
              { value: 'tech', label: 'Technologie' },
              { value: 'science', label: 'Wissenschaft' },
              { value: 'art', label: 'Kunst' }
            ]}
            voiceCommands={['kategorie auswählen', 'technologie wählen', 'wissenschaft wählen', 'kunst wählen']}
          />
          
          <VoiceCheckbox 
            name="terms"
            label="Ich stimme den AGB zu"
            voiceCommands={['agb akzeptieren', 'agb ablehnen']}
          />
          
          <VoiceButton type="submit">Absenden</VoiceButton>
        </VoiceForm>
      </div>
    </VoiceControlProvider>
  );
}
```

### Diagramme und Datenvisualisierung

```tsx
import React from 'react';
import { VoiceControlProvider } from '@smolitux/voice-control';
import { VoiceLineChart } from '@smolitux/voice-control/components';

function App() {
  return (
    <VoiceControlProvider>
      <div className="app">
        <h1>Sprachgesteuertes Diagramm</h1>
        
        <VoiceLineChart
          data={chartData}
          voiceCommands={[
            'zoom in', 
            'zoom out', 
            'zeige details', 
            'vergleiche mit vorjahr'
          ]}
          onVoiceCommand={(cmd) => {
            console.log(`Voice command: ${cmd}`);
            // Implementiere Diagrammaktionen basierend auf Sprachbefehlen
          }}
        />
      </div>
    </VoiceControlProvider>
  );
}
```

## Weitere Dokumentation

- [Architektur-Dokumentation](./voice-control-architecture.md)
- [Implementierungsleitfaden](./implementation-guide.md)
- [Komponenten-Integration](./component-integration.md)
- [TensorFlow.js-Integration](./tensorflow-integration.md)