# Smolitux UI Barrierefreiheit

Diese Dokumentation enthält Informationen zur Barrierefreiheit der Smolitux UI Bibliothek.

## Übersicht

Die Smolitux UI Bibliothek strebt an, allen Benutzern eine barrierefreie Erfahrung zu bieten, unabhängig von ihren Fähigkeiten oder der Art, wie sie mit der Anwendung interagieren. Wir folgen den WCAG 2.1 AA-Richtlinien und implementieren Best Practices für barrierefreie Webkomponenten.

## Inhaltsverzeichnis

1. [Barrierefreiheits-Richtlinien](./ACCESSIBILITY_GUIDELINES.md) - Allgemeine Richtlinien für die Entwicklung barrierefreier Komponenten
2. [Implementierungsbeispiele](./IMPLEMENTATION_EXAMPLES.md) - Konkrete Codebeispiele für die Implementierung von Barrierefreiheitsfunktionen
3. [Komponentenstatus](./COMPONENT_STATUS.md) - Aktueller Status der Barrierefreiheitsverbesserungen

## Komponenten-Dokumentation

Detaillierte Dokumentation zu den Barrierefreiheitsverbesserungen für spezifische Komponenten:

- [Carousel](./components/carousel.md)
- [ColorPicker](./components/colorpicker.md)
- [Drawer](./components/drawer.md)

## Testen auf Barrierefreiheit

Wir verwenden verschiedene Methoden, um die Barrierefreiheit unserer Komponenten zu testen:

### Automatisierte Tests

```bash
# Führe alle Barrierefreiheitstests aus
npm run test:a11y

# Generiere einen Barrierefreiheitsbericht
npm run test:a11y:report
```

### Manuelle Tests

Für manuelle Tests empfehlen wir:

1. **Tastaturnavigation** - Testen Sie die Komponenten ohne Maus
2. **Screenreader** - Testen Sie mit NVDA, JAWS oder VoiceOver
3. **Zoom** - Testen Sie mit verschiedenen Zoomstufen (bis zu 200%)
4. **Kontrast** - Überprüfen Sie den Farbkontrast mit Tools wie dem WAVE Browser-Plugin

## Beitragen

Wenn Sie zur Verbesserung der Barrierefreiheit beitragen möchten, beachten Sie bitte die [Barrierefreiheits-Richtlinien](./ACCESSIBILITY_GUIDELINES.md) und stellen Sie sicher, dass Ihre Änderungen die Barrierefreiheit nicht beeinträchtigen.

## Ressourcen

- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)