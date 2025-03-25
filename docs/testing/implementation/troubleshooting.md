# Troubleshooting für die Testinfrastruktur

Dieses Dokument beschreibt die Probleme, die bei der Einrichtung der Testinfrastruktur aufgetreten sind, und mögliche Lösungen.

## Probleme

### 1. Abhängigkeitsprobleme mit Jest

Bei der Ausführung von Jest-Tests tritt folgender Fehler auf:

```
Error: Cannot find module '/workspace/smolitux-ui/node_modules/y18n/build/index.cjs'
```

Dieses Problem tritt auf, weil die y18n-Abhängigkeit nicht korrekt installiert ist oder Kompatibilitätsprobleme mit anderen Paketen hat.

### 2. Kompatibilitätsprobleme zwischen Paketen

Es gibt möglicherweise Kompatibilitätsprobleme zwischen den verschiedenen Versionen der Testbibliotheken, insbesondere zwischen Jest, React Testing Library und anderen Abhängigkeiten.

## Mögliche Lösungen

### 1. Abhängigkeiten neu installieren

Eine mögliche Lösung ist, die Abhängigkeiten neu zu installieren:

```bash
rm -rf node_modules
npm install
```

### 2. Spezifische Versionen installieren

Eine andere Lösung ist, spezifische Versionen der Abhängigkeiten zu installieren, die bekanntermaßen kompatibel sind:

```bash
npm install --save-dev jest@29.5.0 @types/jest@29.5.0 jest-environment-jsdom@29.5.0 @testing-library/react@14.0.0 @testing-library/user-event@14.0.0 @testing-library/jest-dom@6.1.0
```

### 3. Jest-Konfiguration anpassen

Die Jest-Konfiguration kann angepasst werden, um Kompatibilitätsprobleme zu vermeiden:

```javascript
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // CSS-Module-Mocking
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Alias-Auflösung für '@smolitux/'
    '^@smolitux/(.*)$': '<rootDir>/packages/@smolitux/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!y18n)/'
  ],
};

module.exports = config;
```

### 4. Alternative Testbibliotheken verwenden

Eine weitere Möglichkeit ist, alternative Testbibliotheken zu verwenden, die möglicherweise weniger Kompatibilitätsprobleme haben:

- Vitest statt Jest
- React Testing Library mit Vitest
- Testing Library User Event mit Vitest

## Nächste Schritte

1. **Abhängigkeiten bereinigen**: Alle Testabhängigkeiten entfernen und neu installieren
2. **Spezifische Versionen verwenden**: Bekannte kompatible Versionen der Testbibliotheken verwenden
3. **Konfiguration anpassen**: Die Jest-Konfiguration anpassen, um Kompatibilitätsprobleme zu vermeiden
4. **Alternative Testbibliotheken evaluieren**: Vitest und andere Alternativen evaluieren

## Fazit

Die Testinfrastruktur für die Smolitux UI-Bibliothek wurde eingerichtet, aber es gibt noch einige Probleme zu lösen. Die nächsten Schritte konzentrieren sich auf die Behebung dieser Probleme und die Implementierung von Tests für alle Komponenten.