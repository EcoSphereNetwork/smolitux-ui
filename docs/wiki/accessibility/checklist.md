# Barrierefreiheits-Checkliste

Diese Checkliste hilft dabei, Smolitux UI Komponenten auf WCAG 2.1 AA-Konformität zu prüfen.

## Semantik und Struktur
- [ ] Korrekte HTML-Elemente werden verwendet
- [ ] Semantische Struktur ist logisch
- [ ] Überschriften werden korrekt verwendet

## ARIA-Attribute
- [ ] Korrekte ARIA-Rollen werden verwendet
- [ ] ARIA-Attribute werden korrekt gesetzt
- [ ] ARIA-Zustände werden aktualisiert (z.B. `aria-expanded`, `aria-selected`)

## Tastaturnavigation
- [ ] Alle interaktiven Elemente sind mit der Tastatur bedienbar
- [ ] Fokusreihenfolge ist logisch
- [ ] Fokusindikator ist deutlich sichtbar
- [ ] Keine Tastaturfallen

## Visuelles Design
- [ ] Ausreichender Farbkontrast
- [ ] Informationen werden nicht nur durch Farbe vermittelt
- [ ] Text ist auf 200% vergrößerbar ohne Funktionsverlust
- [ ] Responsive Design funktioniert bei verschiedenen Viewport-Größen

## Screenreader-Unterstützung
- [ ] Alle Inhalte sind für Screenreader zugänglich
- [ ] Alternative Texte für Bilder und Icons
- [ ] Statusänderungen werden angekündigt
- [ ] Komplexe Komponenten haben klare Anweisungen

Weitere Hinweise zu automatisierten Tests findest du im Dokument [Accessibility Tests](../testing/implementation/accessibility-tests.md).
