# Smolitux UI Test App

Diese Test-App demonstriert die Verwendung der Smolitux UI-Komponenten in einer React-Anwendung.

## Komponenten

Die App zeigt die Verwendung von Komponenten aus verschiedenen Smolitux-Paketen:

- **Core-Komponenten**: Button, Card, TabView
- **AI-Komponenten**: TrendingTopics
- **Blockchain-Komponenten**: TokenDisplay
- **Resonance-Komponenten**: FeedView

## Ausführung

Um die App zu starten:

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## Einfache HTML-Version

Für eine einfache Demonstration ohne Build-Prozess kann die Datei `simple-test.html` direkt im Browser geöffnet werden.

## Bekannte Probleme

- Die Vite-Entwicklungsumgebung hat Probleme mit einigen Node.js-spezifischen Modulen, die in den Smolitux-Paketen verwendet werden.
- Für eine produktionsreife Anwendung sollten die Smolitux-Pakete mit entsprechenden Browser-Polyfills konfiguriert werden.

## Typendefinitionen

Die Datei `src/types.d.ts` enthält Typdeklarationen für die Smolitux-Pakete, um TypeScript-Unterstützung zu ermöglichen.