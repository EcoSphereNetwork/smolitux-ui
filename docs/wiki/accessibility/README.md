# Barrierefreiheit in der Smolitux UI Bibliothek

## Übersicht

Die Smolitux UI Bibliothek wurde mit einem starken Fokus auf Barrierefreiheit entwickelt, um sicherzustellen, dass alle Benutzer, unabhängig von ihren Fähigkeiten oder Einschränkungen, die Komponenten effektiv nutzen können. Diese Dokumentation bietet einen Überblick über die implementierten Barrierefreiheitsverbesserungen und bewährte Praktiken.

Weitere Hinweise findest du im Dokument [Best Practices für barrierefreie Komponenten](./best-practices.md).

## Implementierte Komponenten

Die folgenden Komponenten wurden mit Barrierefreiheitsverbesserungen implementiert:

1. [Carousel](./components/carousel.md) - ARIA-Attribute, Tastaturnavigation, Pause-Funktion
2. [ColorPicker](./components/colorpicker.md) - ARIA-Attribute, Tastaturnavigation, Screenreader-Unterstützung
3. [Drawer](./components/drawer.md) - ARIA-Attribute, Fokus-Management
4. [Dropdown](./components/dropdown.md) - ARIA-Attribute, Tastaturnavigation
5. [Fade](./components/fade.md) - ARIA-Attribute für Animation
6. [FileUpload](./components/fileupload.md) - ARIA-Attribute, Tastaturunterstützung
7. [Flex](./components/flex.md) - Semantische Struktur und ARIA-Attribute
8. [Form](./components/form.md) - ARIA-Attribute, Fehlerbehandlung
9. [FormControl](./components/formcontrol.md) - ARIA-Attribute, Fehlerbehandlung
10. [FormField](./components/formfield.md) - ARIA-Attribute, Fehlerbehandlung
11. [Input](./components/input.md) - Verbesserte ARIA-Attribute, Fehlerbehandlung
12. [LanguageSwitcher](./components/languageswitcher.md) - Tastaturnavigation und Screenreader-Unterstützung
13. [List](./components/list.md) - ARIA-Attribute, Tastaturnavigation
14. [MediaPlayer](./components/mediaplayer.md) - Untertitel, Tastatursteuerung und ARIA-Attribute
15. [Menu](./components/menu.md) - ARIA-Attribute, Tastaturnavigation
16. [Pagination](./components/pagination.md) - ARIA-Attribute, Tastaturnavigation
17. [Popover](./components/popover.md) - Fokus-Management und ARIA-Attribute
18. [ProgressBar](./components/progressbar.md) - ARIA-Attribute, Screenreader-Unterstützung
19. [Radio](./components/radio.md) - Verbesserte ARIA-Attribute, Tastaturunterstützung
20. [Select](./components/select.md) - ARIA-Attribute, Tastaturnavigation
21. [Skeleton](./components/skeleton.md) - ARIA-Attribute, Screenreader-Unterstützung
22. [Slide](./components/slide.md) - ARIA-Attribute für Animation
23. [Slider](./components/slider.md) - ARIA-Attribute, Tastatursteuerung
24. [Spinner](./components/spinner.md) - ARIA-Attribute, Screenreader-Unterstützung
25. [Stepper](./components/stepper.md) - ARIA-Attribute, Tastaturnavigation
26. [Switch](./components/switch.md) - Verbesserte ARIA-Attribute, Tastaturunterstützung
27. [TabView](./components/tabview.md) - ARIA-Attribute, Tastaturnavigation
28. [TextArea](./components/textarea.md) - Verbesserte ARIA-Attribute, Fehlerbehandlung
29. [TimePicker](./components/timepicker.md) - ARIA-Attribute, Tastaturnavigation, Screenreader-Unterstützung
30. [Zoom](./components/zoom.md) - ARIA-Attribute für Animation

## Allgemeine Barrierefreiheitsverbesserungen

### ARIA-Attribute

Alle barrierefreien Komponenten unterstützen die folgenden ARIA-Attribute:

- `aria-label` - Bietet eine Beschreibung des Elements
- `aria-labelledby` - Verknüpft ein Label mit dem Element
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Element
- `aria-live` - Definiert eine Live-Region für Ankündigungen
- `aria-atomic` - Definiert, ob eine Live-Region als Ganzes aktualisiert wird
- `aria-relevant` - Definiert, welche Änderungen in einer Live-Region relevant sind
- `aria-busy` - Zeigt an, ob ein Element im Ladezustand ist
- `aria-hidden` - Versteckt ein Element vor Screenreadern
- `aria-expanded` - Zeigt an, ob ein Element erweitert ist
- `aria-haspopup` - Zeigt an, ob ein Element ein Popup hat
- `aria-controls` - Verknüpft ein Element mit einem anderen Element, das es steuert
- `aria-owns` - Definiert Elemente, die zu einem Element gehören
- `aria-current` - Zeigt an, ob ein Element der aktuelle Kontext ist
- `aria-roledescription` - Bietet eine benutzerdefinierte Rollenbeschreibung

### Tastaturunterstützung

Alle interaktiven Komponenten unterstützen die folgenden Tastaturinteraktionen:

- Fokussierbarkeit mit der Tab-Taste
- Aktivierung mit der Enter- oder Leertaste
- Schließen von Popups mit der Escape-Taste
- Navigation in Listen mit den Pfeiltasten
- Sprung zum Anfang/Ende mit Home/End-Tasten
- Benutzerdefinierte Tastaturkürzel für komplexe Komponenten

### Screenreader-Unterstützung

Alle Komponenten bieten Unterstützung für Screenreader durch:

- Semantisch korrekte HTML-Elemente
- Aussagekräftige ARIA-Attribute
- Ankündigungen für Statusänderungen
- Versteckte Beschreibungen für zusätzliche Informationen
- Korrekte Fokusreihenfolge

### Reduzierte Bewegung

Animationskomponenten respektieren die Einstellung `prefers-reduced-motion` des Benutzers und bieten:

- Deaktivierung von Animationen für Benutzer mit Bewegungsempfindlichkeit
- Sofortige Darstellung ohne Übergangseffekte
- Alternative statische Darstellungen

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

## Ressourcen

- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Web Docs: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
