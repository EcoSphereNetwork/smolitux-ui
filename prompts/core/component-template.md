# Komponenten-Template

## Kontext

Eine UI-Komponente für die Smolitux UI Bibliothek soll entwickelt werden. Die Komponente muss den Anforderungen und Best Practices entsprechen.

## Ziel

Entwickle eine vollständige, produktionsreife UI-Komponente, die alle Qualitätsstandards erfüllt und einfach in andere Projekte integriert werden kann.

## Anforderungen

1. **Typsicherheit**: Verwende TypeScript mit strikten Typen und vermeide `any`
2. **Barrierefreiheit**: Die Komponente muss WCAG 2.1 AA-konform sein
3. **Modularität**: Die Komponente sollte unabhängig und wiederverwendbar sein
4. **Konsistenz**: Folge der einheitlichen API und Designsprache
5. **Testbarkeit**: Implementiere umfassende Unit- und Accessibility-Tests

## Komponenten-Struktur

```
Component/
├── Component.tsx            # Hauptimplementierung
├── Component.a11y.tsx       # Barrierefreiheits-Implementierung (optional)
├── Component.css            # Komponenten-spezifische Styles
├── Component.test.tsx       # Unit-Tests
└── index.ts                 # Re-Export
```

## Format

Bitte implementiere die angeforderte Komponente gemäß den oben genannten Anforderungen und der Struktur.
