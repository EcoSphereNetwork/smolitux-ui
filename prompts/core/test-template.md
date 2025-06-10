# Test-Template

## Kontext

Tests für eine UI-Komponente der Smolitux UI Bibliothek sollen entwickelt werden. Die Tests müssen umfassend sein und alle Aspekte der Komponente abdecken.

## Ziel

Entwickle umfassende Tests für eine UI-Komponente, die alle Funktionalitäten, Zustände und Barrierefreiheitsaspekte abdecken.

## Anforderungen

1. **Unit-Tests**: Teste alle Funktionalitäten und Zustände der Komponente
2. **Barrierefreiheitstests**: Teste die WCAG 2.1 AA-Konformität
3. **Snapshot-Tests**: Erstelle Snapshots für visuelle Regression-Tests
4. **Interaktionstests**: Teste Benutzerinteraktionen mit der Komponente
5. **Edge-Cases**: Teste Grenzfälle und Fehlerbehandlung

## Test-Struktur

```
Component/
├── Component.test.tsx       # Unit-Tests
├── Component.a11y.test.tsx  # Barrierefreiheitstests (optional)
└── __snapshots__/           # Snapshot-Tests
```

## Format

Bitte implementiere die angeforderten Tests gemäß den oben genannten Anforderungen und der Struktur.
