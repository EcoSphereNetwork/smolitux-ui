# Abhängigkeiten

Diese Dokumentation beschreibt die Abhängigkeiten der Smolitux-UI-Bibliothek und wie sie verwaltet werden.

## Übersicht

Smolitux-UI verwendet verschiedene Abhängigkeiten, um die Entwicklung und den Betrieb der Komponenten zu unterstützen. Diese Abhängigkeiten sind in verschiedene Kategorien unterteilt:

1. **Produktionsabhängigkeiten**: Abhängigkeiten, die für den Betrieb der Komponenten erforderlich sind.
2. **Entwicklungsabhängigkeiten**: Abhängigkeiten, die für die Entwicklung der Komponenten erforderlich sind.
3. **Peer-Abhängigkeiten**: Abhängigkeiten, die von den Benutzern der Komponenten bereitgestellt werden müssen.

## Produktionsabhängigkeiten

Produktionsabhängigkeiten sind Abhängigkeiten, die für den Betrieb der Komponenten erforderlich sind. Sie werden in der `dependencies`-Sektion der `package.json`-Datei aufgeführt.

### Kernabhängigkeiten

- **React**: Die Basis-Bibliothek für die Komponenten.
- **React DOM**: Die DOM-spezifische Implementierung von React.
- **Emotion**: Eine CSS-in-JS-Bibliothek für das Styling der Komponenten.
- **Framer Motion**: Eine Animations-Bibliothek für die Komponenten.
- **date-fns**: Eine Bibliothek für die Datums- und Zeitformatierung.
- **lodash**: Eine Utility-Bibliothek für verschiedene Funktionen.

### Paketspezifische Abhängigkeiten

Jedes Paket kann spezifische Abhängigkeiten haben, die für die Funktionalität des Pakets erforderlich sind.

#### @smolitux/ai

- **TensorFlow.js**: Eine Bibliothek für maschinelles Lernen im Browser.
- **Natural**: Eine Bibliothek für natürliche Sprachverarbeitung.

#### @smolitux/blockchain

- **ethers.js**: Eine Bibliothek für die Interaktion mit der Ethereum-Blockchain.
- **web3.js**: Eine Alternative zu ethers.js.

#### @smolitux/charts

- **D3.js**: Eine Bibliothek für Datenvisualisierung.
- **Chart.js**: Eine Alternative zu D3.js.

#### @smolitux/resonance

- **@smolitux/utils**: Grundlegende Utility-Funktionen und -Komponenten.
- **@smolitux/ai**: KI-bezogene Komponenten.
- **@smolitux/blockchain**: Blockchain-bezogene Komponenten.
- **@smolitux/media**: Medien-bezogene Komponenten.
- **@smolitux/community**: Community-bezogene Komponenten.

## Entwicklungsabhängigkeiten

Entwicklungsabhängigkeiten sind Abhängigkeiten, die für die Entwicklung der Komponenten erforderlich sind. Sie werden in der `devDependencies`-Sektion der `package.json`-Datei aufgeführt.

### Build-Tools

- **TypeScript**: Eine typisierte Übermenge von JavaScript.
- **tsup**: Ein Tool zum Bündeln von TypeScript-Code.
- **Lerna**: Ein Tool zur Verwaltung von Monorepos.
- **ESLint**: Ein Tool zur statischen Codeanalyse.
- **Prettier**: Ein Tool zur Codeformatierung.

### Test-Tools

- **Jest**: Ein Test-Framework.
- **React Testing Library**: Eine Bibliothek zum Testen von React-Komponenten.
- **jest-dom**: Eine Erweiterung von Jest für DOM-spezifische Assertions.
- **jest-axe**: Eine Erweiterung von Jest für Barrierefreiheitstests.

### Dokumentations-Tools

- **Storybook**: Ein Tool zur Dokumentation und zum Testen von Komponenten.
- **@storybook/addon-essentials**: Grundlegende Storybook-Addons.
- **@storybook/addon-a11y**: Ein Storybook-Addon für Barrierefreiheitstests.
- **@storybook/addon-docs**: Ein Storybook-Addon für die Dokumentation.

### CI/CD-Tools

- **GitHub Actions**: Ein Tool für Continuous Integration und Continuous Deployment.
- **Chromatic**: Ein Tool für visuelle Regressionstests.
- **Playwright**: Ein Tool für End-to-End-Tests.

## Peer-Abhängigkeiten

Peer-Abhängigkeiten sind Abhängigkeiten, die von den Benutzern der Komponenten bereitgestellt werden müssen. Sie werden in der `peerDependencies`-Sektion der `package.json`-Datei aufgeführt.

- **React**: Die Basis-Bibliothek für die Komponenten.
- **React DOM**: Die DOM-spezifische Implementierung von React.

## Abhängigkeitsverwaltung

Die Abhängigkeiten werden mit npm verwaltet. npm ist der Paketmanager für Node.js und wird verwendet, um Abhängigkeiten zu installieren, zu aktualisieren und zu entfernen.

### Installation von Abhängigkeiten

```bash
# Installation einer Produktionsabhängigkeit
npm install <package-name>

# Installation einer Entwicklungsabhängigkeit
npm install --save-dev <package-name>

# Installation einer Peer-Abhängigkeit
npm install --save-peer <package-name>
```

### Aktualisierung von Abhängigkeiten

```bash
# Aktualisierung einer Abhängigkeit
npm update <package-name>

# Aktualisierung aller Abhängigkeiten
npm update
```

### Entfernung von Abhängigkeiten

```bash
# Entfernung einer Abhängigkeit
npm uninstall <package-name>
```

### Prüfung von Abhängigkeiten

```bash
# Prüfung auf veraltete Abhängigkeiten
npm outdated

# Prüfung auf Sicherheitslücken
npm audit
```

## Versionierung

Die Versionierung der Abhängigkeiten folgt Semantic Versioning (MAJOR.MINOR.PATCH).

- **MAJOR**: Inkompatible API-Änderungen
- **MINOR**: Neue Funktionen, die abwärtskompatibel sind
- **PATCH**: Abwärtskompatible Bugfixes

### Versionsspezifikation

Die Versionsspezifikation in der `package.json`-Datei kann verschiedene Formen annehmen:

- **Exakte Version**: `"react": "18.2.0"`
- **Kompatible Version**: `"react": "^18.2.0"` (akzeptiert 18.2.0 oder höher, aber nicht 19.0.0)
- **Ungefähre Version**: `"react": "~18.2.0"` (akzeptiert 18.2.0 oder höher, aber nicht 18.3.0)
- **Bereichsversion**: `"react": ">=18.2.0 <19.0.0"` (akzeptiert 18.2.0 oder höher, aber nicht 19.0.0)

## Sicherheit

Die Sicherheit der Abhängigkeiten ist ein wichtiger Aspekt der Abhängigkeitsverwaltung. npm bietet verschiedene Tools, um Sicherheitslücken in Abhängigkeiten zu identifizieren und zu beheben.

### npm audit

`npm audit` ist ein Befehl, der die Abhängigkeiten auf bekannte Sicherheitslücken überprüft.

```bash
npm audit
```

### npm audit fix

`npm audit fix` ist ein Befehl, der versucht, bekannte Sicherheitslücken in Abhängigkeiten zu beheben.

```bash
npm audit fix
```

### GitHub Dependabot

GitHub Dependabot ist ein Tool, das automatisch Pull Requests erstellt, um veraltete oder unsichere Abhängigkeiten zu aktualisieren.

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

## Best Practices

### Minimierung von Abhängigkeiten

Die Anzahl der Abhängigkeiten sollte minimiert werden, um die Komplexität und die Größe der Bibliothek zu reduzieren.

### Regelmäßige Aktualisierung

Abhängigkeiten sollten regelmäßig aktualisiert werden, um Sicherheitslücken zu beheben und von neuen Funktionen zu profitieren.

### Pinning von Versionen

Versionen sollten gepinnt werden, um sicherzustellen, dass die Bibliothek mit einer bestimmten Version einer Abhängigkeit funktioniert.

### Verwendung von Lockfiles

Lockfiles (`package-lock.json`) sollten verwendet werden, um sicherzustellen, dass alle Entwickler und CI/CD-Systeme die gleichen Versionen der Abhängigkeiten verwenden.

### Überprüfung von Lizenzen

Die Lizenzen der Abhängigkeiten sollten überprüft werden, um sicherzustellen, dass sie mit der Lizenz der Bibliothek kompatibel sind.

## Fazit

Die Verwaltung von Abhängigkeiten ist ein wichtiger Aspekt der Entwicklung und des Betriebs der Smolitux-UI-Bibliothek. Durch die Verwendung moderner Tools und Best Practices können wir sicherstellen, dass die Bibliothek sicher, stabil und wartbar ist.