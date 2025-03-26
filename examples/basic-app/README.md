# Smolitux UI Demo-Anwendung

Diese Demo-Anwendung zeigt die Verwendung der Smolitux UI-Komponenten in einer einfachen React-Anwendung.

## Funktionen

- Demonstration der Basis-Komponenten (Card, Button, ProgressBar, TabView)
- Demonstration der KI-Komponenten (TrendingTopics, EngagementScore)
- Responsive Design
- Unterstützung für Light- und Dark-Mode

## Erste Schritte

### Voraussetzungen

- Node.js (v14 oder höher)
- npm oder yarn

### Installation

1. Klone das Repository:
   ```bash
   git clone https://github.com/EcoSphereNetwork/smolitux-ui.git
   cd smolitux-ui
   ```

2. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```

3. Starte die Demo-Anwendung:
   ```bash
   cd examples/basic-app
   npm run dev
   ```

4. Öffne die Anwendung im Browser:
   ```
   http://localhost:5173
   ```

## Projektstruktur

```
basic-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx           # Hauptkomponente der Anwendung
│   ├── main.tsx          # Einstiegspunkt der Anwendung
│   ├── index.css         # Globale Styles
│   └── mockData.ts       # Mock-Daten für die Komponenten
├── index.html            # HTML-Template
├── package.json          # Projekt-Konfiguration
├── tsconfig.json         # TypeScript-Konfiguration
└── vite.config.ts        # Vite-Konfiguration
```

## Verwendete Technologien

- React
- TypeScript
- Vite
- Smolitux UI-Komponenten

## Lizenz

MIT