# Smolitux UI Barrierefreiheits-Richtlinien

## Einführung

Diese Richtlinien beschreiben die Barrierefreiheitsanforderungen für die Smolitux UI Bibliothek. Alle Komponenten sollten gemäß den WCAG 2.1 AA-Richtlinien entwickelt werden, um eine inklusive Benutzererfahrung zu gewährleisten.

## Allgemeine Anforderungen

### 1. Semantische HTML-Struktur

- Verwende semantische HTML-Elemente (`button`, `a`, `nav`, `header`, `footer`, etc.)
- Verwende ARIA-Rollen nur dann, wenn semantische HTML-Elemente nicht ausreichen
- Stelle sicher, dass die Dokumentstruktur logisch und hierarchisch ist

### 2. Tastaturnavigation

- Alle interaktiven Elemente müssen mit der Tastatur bedienbar sein
- Die Tab-Reihenfolge muss logisch und vorhersehbar sein
- Fokus-Indikatoren müssen deutlich sichtbar sein
- Tastaturkürzel sollten dokumentiert und konsistent sein

### 3. ARIA-Attribute

- Verwende ARIA-Attribute, um die Semantik zu verbessern
- Stelle sicher, dass ARIA-Attribute korrekt verwendet werden
- Verwende ARIA-live-Regionen für dynamische Inhalte
- Verwende ARIA-expanded, ARIA-haspopup, etc. für interaktive Komponenten

### 4. Fokus-Management

- Implementiere Focus-Traps für Modals, Drawers und andere Overlays
- Setze den Fokus zurück, wenn Overlays geschlossen werden
- Vermeide das Verstecken von fokussierbaren Elementen, die nicht sichtbar sind

### 5. Farben und Kontrast

- Stelle sicher, dass der Farbkontrast den WCAG-Anforderungen entspricht (4.5:1 für normalen Text, 3:1 für großen Text)
- Verwende nicht nur Farbe, um Informationen zu vermitteln
- Biete alternative visuelle Hinweise (Icons, Muster, etc.)

### 6. Screenreader-Unterstützung

- Stelle sicher, dass alle Inhalte für Screenreader zugänglich sind
- Verwende alt-Texte für Bilder
- Verstecke dekorative Elemente vor Screenreadern
- Verwende sr-only-Klassen für zusätzliche Kontextinformationen

### 7. Animationen und Bewegung

- Biete Möglichkeiten, Animationen zu reduzieren oder zu deaktivieren
- Vermeide blinkende Inhalte, die Anfälle auslösen könnten
- Stelle sicher, dass Animationen nicht die Benutzererfahrung beeinträchtigen

## Komponenten-spezifische Anforderungen

### Formulare

- Jedes Formularfeld muss ein Label haben
- Fehlermeldungen müssen programmatisch mit dem Feld verknüpft sein
- Verwende fieldset und legend für Gruppen von Formularfeldern
- Biete klare Anweisungen und Hilfetexte

### Dialoge und Overlays

- Verwende role="dialog" und aria-modal="true"
- Implementiere Focus-Traps
- Biete eine Möglichkeit, das Overlay mit ESC zu schließen
- Setze den Fokus zurück, wenn das Overlay geschlossen wird

### Tabs und Akkordeons

- Verwende die korrekten ARIA-Rollen und -Attribute
- Implementiere Tastaturnavigation (Pfeiltasten)
- Stelle sicher, dass der aktive Tab/Akkordeon visuell hervorgehoben wird
- Verwende aria-selected und aria-expanded

### Dropdown-Menüs und Select-Felder

- Verwende die korrekten ARIA-Rollen und -Attribute
- Implementiere Tastaturnavigation
- Stelle sicher, dass der aktive Eintrag visuell hervorgehoben wird
- Verwende aria-expanded und aria-activedescendant

### Carousels und Slider

- Biete Steuerelemente zum Pausieren und Navigieren
- Implementiere Tastaturnavigation
- Verwende ARIA-Attribute, um den aktuellen Status zu kommunizieren
- Stelle sicher, dass Animationen nicht automatisch starten oder pausiert werden können

## Testen

### Automatisierte Tests

- Verwende axe-core oder ähnliche Tools für automatisierte Tests
- Integriere Barrierefreiheitstests in die CI/CD-Pipeline
- Verwende jest-axe für Komponententests

### Manuelle Tests

- Teste mit Screenreadern (NVDA, JAWS, VoiceOver)
- Teste mit Tastaturnavigation
- Teste mit verschiedenen Bildschirmgrößen und Zoomstufen
- Teste mit verschiedenen Farbschemata (Hochkontrast, Dunkelmodus)

## Ressourcen

- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)