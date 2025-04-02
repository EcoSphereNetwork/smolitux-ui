# Snapshot-Tests für Smolitux UI

Dieses Dokument beschreibt die Implementierung von Snapshot-Tests für die Smolitux UI-Bibliothek.

## Überblick

Snapshot-Tests sind eine Form von Regressionstests, die sicherstellen, dass die UI-Komponenten konsistent bleiben und keine unbeabsichtigten Änderungen auftreten. Sie erstellen eine "Momentaufnahme" des Komponentenbaums und vergleichen diese bei zukünftigen Tests mit der aktuellen Ausgabe.

Die folgenden Komponenten wurden mit Snapshot-Tests abgedeckt:

- Button
- Card
- Input

## Vorteile von Snapshot-Tests

- **Schnelle Erstellung**: Snapshot-Tests sind einfach zu erstellen und erfordern wenig Code.
- **Umfassende Abdeckung**: Sie testen die gesamte Ausgabe einer Komponente, einschließlich aller Kinder.
- **Visuelle Regressionserkennung**: Sie erkennen unbeabsichtigte Änderungen an der Komponente.
- **Dokumentation**: Sie dienen als Dokumentation für das erwartete Verhalten der Komponente.

## Implementierung

Die Snapshot-Tests wurden mit Jest und react-test-renderer implementiert. Für jede Komponente wurden Tests für verschiedene Zustände und Konfigurationen erstellt.

### Button-Komponente

Die Button-Komponente wurde mit Snapshot-Tests für verschiedene Varianten, Größen und Zustände abgedeckt.

```tsx
import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../Button';

describe('Button Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Button>Click me</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Weitere Tests...
});
```

### Card-Komponente

Die Card-Komponente wurde mit Snapshot-Tests für verschiedene Varianten, Größen und Zustände abgedeckt.

```tsx
import React from 'react';
import renderer from 'react-test-renderer';
import { Card } from '../Card';

describe('Card Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Card>Card Content</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Weitere Tests...
});
```

### Input-Komponente

Die Input-Komponente wurde mit Snapshot-Tests für verschiedene Varianten, Größen und Zustände abgedeckt.

```tsx
import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from '../Input';

describe('Input Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Weitere Tests...
});
```

## Ausführung der Tests

Die Snapshot-Tests können mit dem folgenden Befehl ausgeführt werden:

```bash
npm test
```

Um die Snapshots zu aktualisieren, wenn sich die Komponenten absichtlich geändert haben:

```bash
npm run test:update-snapshots
```

## Wartung der Snapshots

Snapshots sollten regelmäßig überprüft und aktualisiert werden, wenn sich die Komponenten absichtlich ändern. Wenn ein Snapshot-Test fehlschlägt, gibt es zwei Möglichkeiten:

1. **Die Änderung ist unbeabsichtigt**: In diesem Fall sollte der Code überprüft und korrigiert werden.
2. **Die Änderung ist beabsichtigt**: In diesem Fall sollten die Snapshots aktualisiert werden.

## Integration in CI/CD

Die Snapshot-Tests sind in die CI/CD-Pipeline integriert und werden bei jedem Pull Request ausgeführt. Wenn ein Snapshot-Test fehlschlägt, wird der Pull Request blockiert, bis das Problem behoben ist.

## Nächste Schritte

Die folgenden Schritte sind als Nächstes geplant:

1. **Implementierung von Snapshot-Tests für weitere Komponenten**: Checkbox, Radio, Select, TabView, etc.
2. **Integration mit Chromatic**: Für visuelle Regressionstests mit Storybook
3. **Automatisierte Snapshot-Updates**: Bei absichtlichen Änderungen

## Fazit

Die implementierten Snapshot-Tests bieten eine solide Grundlage für die Qualitätssicherung der Smolitux UI-Bibliothek. Sie stellen sicher, dass die Komponenten konsistent bleiben und keine unbeabsichtigten Änderungen auftreten.