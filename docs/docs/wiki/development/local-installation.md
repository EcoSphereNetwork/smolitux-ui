# Lokale Installation von Smolitux-UI

Diese Anleitung beschreibt, wie Sie Smolitux-UI lokal installieren und entwickeln können.

## Voraussetzungen

- Node.js v16+ (empfohlen: v18+)
- npm v8+ (empfohlen: v9+)
- Git

## Installation

1. Repository klonen:

```bash
git clone https://github.com/EcoSphereNetwork/smolitux-ui.git
cd smolitux-ui
```

2. Auf den gewünschten Branch wechseln:

```bash
git checkout release-v0.2.1
```

3. Abhängigkeiten installieren:

```bash
# Installiert die Root-Abhängigkeiten
npm install

# Installiert die Abhängigkeiten aller Pakete
npm run install-deps
```

## Entwicklung

### Pakete bauen

Um alle Pakete zu bauen:

```bash
npm run build
```

Um ein bestimmtes Paket zu bauen:

```bash
# Utils-Paket bauen
npm run build:utils

# Core-Paket bauen
npm run build:core

# AI-Paket bauen
npm run build:ai

# Blockchain-Paket bauen
npm run build:blockchain

# Resonance-Paket bauen
npm run build:resonance
```

### Storybook starten

Um die Komponenten im Storybook zu sehen:

```bash
npm run storybook
```

Storybook wird dann unter http://localhost:6006 verfügbar sein.

### Tests ausführen

Um alle Tests auszuführen:

```bash
npm test
```

Um Tests im Watch-Modus auszuführen:

```bash
npm run test:watch
```

## Fehlerbehebung

### Problem: Fehler beim Bauen der Pakete

Wenn Sie Fehler beim Bauen der Pakete erhalten, versuchen Sie Folgendes:

1. Löschen Sie die node_modules-Verzeichnisse und die package-lock.json-Datei:

```bash
npm run clean
rm -rf package-lock.json
```

2. Installieren Sie die Abhängigkeiten neu:

```bash
npm install
npm run install-deps
```

3. Bauen Sie die Pakete in der richtigen Reihenfolge:

```bash
npm run build:utils
npm run build:core
npm run build:ai
npm run build:blockchain
npm run build:resonance
```

### Problem: TypeScript-Fehler

Wenn Sie TypeScript-Fehler erhalten, stellen Sie sicher, dass die tsconfig.json-Dateien korrekt konfiguriert sind:

1. Überprüfen Sie die zentrale tsconfig.base.json-Datei im Root-Verzeichnis.
2. Stellen Sie sicher, dass alle Pakete auf diese Datei verweisen.
3. Führen Sie den TypeScript-Compiler aus, um Fehler zu identifizieren:

```bash
npx tsc --noEmit
```

### Problem: Fehlende Abhängigkeiten

Wenn Sie Fehler wegen fehlender Abhängigkeiten erhalten, installieren Sie diese manuell:

```bash
npm install --save-dev <fehlende-abhängigkeit>
```

Oder für ein bestimmtes Paket:

```bash
cd packages/@smolitux/<paket>
npm install --save-dev <fehlende-abhängigkeit>
```

## Veröffentlichung

Um eine neue Version zu veröffentlichen:

1. Aktualisieren Sie die Versionsnummer in allen package.json-Dateien:

```bash
npx lerna version <neue-version> --no-push --no-git-tag-version
```

2. Aktualisieren Sie die CHANGELOG.md-Datei.

3. Committen Sie die Änderungen:

```bash
git add .
git commit -m "Release v<neue-version>"
```

4. Erstellen Sie einen Tag:

```bash
git tag v<neue-version>
```

5. Pushen Sie die Änderungen:

```bash
git push origin <branch>
git push origin v<neue-version>
```

6. Erstellen Sie einen Pull Request auf GitHub.

## Weitere Informationen

Weitere Informationen finden Sie in der [Dokumentation](./README.md).