# LanguageSwitcher Barrierefreiheit

## Implementierte Verbesserungen

Die LanguageSwitcher-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="combobox"` - Definiert den Dropdown-Sprachumschalter als Combobox
- `role="listbox"` - Definiert die Liste der Sprachoptionen als Listbox
- `role="option"` - Definiert jede Sprachoption als Option
- `role="radiogroup"` - Definiert die Buttons/Flags-Variante als Radiogruppe
- `role="radio"` - Definiert jede Sprachoption in der Radiogruppe als Radio
- `aria-label` - Bietet eine Beschreibung des Sprachumschalters
- `aria-labelledby` - Verknüpft ein Label mit dem Sprachumschalter
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Sprachumschalter
- `aria-haspopup` - Zeigt an, dass der Sprachumschalter ein Popup hat
- `aria-expanded` - Zeigt an, ob das Dropdown geöffnet ist
- `aria-controls` - Verknüpft den Sprachumschalter mit der Optionsliste
- `aria-selected` - Zeigt an, welche Sprachoption ausgewählt ist
- `aria-checked` - Zeigt an, welche Sprachoption in der Radiogruppe ausgewählt ist
- `aria-disabled` - Zeigt an, ob der Sprachumschalter deaktiviert ist
- `aria-busy` - Zeigt an, ob der Sprachumschalter im Ladezustand ist
- `aria-keyshortcuts` - Definiert Tastaturkürzel für den Sprachumschalter

### Tastaturunterstützung

- Öffnen des Dropdowns mit Enter oder Leertaste
- Schließen des Dropdowns mit Escape
- Navigation zwischen den Sprachoptionen mit Pfeiltasten
- Sprung zur ersten/letzten Sprachoption mit Home/End
- Auswahl einer Sprachoption mit Enter oder Leertaste
- Fokus-Management für alle interaktiven Elemente
- Visuelle Fokus-Indikatoren

### Screenreader-Unterstützung

- Versteckte Labels für Screenreader
- Versteckte Beschreibungen für zusätzliche Informationen
- Live-Regionen für Statusänderungen
- Ankündigung von Sprachänderungen
- Versteckte Texte für Flaggen-Variante
- Korrekte Ankündigung der ausgewählten Sprache

## Beispiel-Implementierung

```tsx
// Dropdown-Variante
<LanguageSwitcherA11y
  variant="dropdown"
  locales={['de', 'en', 'fr']}
  showName
  showFlag
  ariaLabel="Sprache auswählen"
  description="Wählen Sie Ihre bevorzugte Sprache"
/>

// Select-Variante
<LanguageSwitcherA11y
  variant="select"
  locales={['de', 'en', 'fr']}
  showName
  showCode
  ariaLabel="Sprache auswählen"
/>

// Buttons-Variante
<LanguageSwitcherA11y
  variant="buttons"
  locales={['de', 'en', 'fr']}
  showName
  ariaLabel="Sprache auswählen"
/>

// Flags-Variante
<LanguageSwitcherA11y
  variant="flags"
  locales={['de', 'en', 'fr']}
  ariaLabel="Sprache auswählen"
/>

// Minimal-Variante
<LanguageSwitcherA11y
  variant="minimal"
  locales={['de', 'en', 'fr']}
  ariaLabel="Sprache auswählen"
/>

// Mit Tastaturkürzel
<LanguageSwitcherA11y
  variant="dropdown"
  locales={['de', 'en', 'fr']}
  ariaLabel="Sprache auswählen"
  ariaKeyshortcuts="Alt+L"
/>

// Deaktivierter Zustand
<LanguageSwitcherA11y
  variant="dropdown"
  locales={['de', 'en', 'fr']}
  ariaLabel="Sprache auswählen"
  disabled
/>
```

## Barrierefreiheitstests

Die LanguageSwitcher-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Visuelle Tests** zur Überprüfung der Farbkontraste und Fokus-Indikatoren

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine automatische Anpassung der Sprache basierend auf den Browsereinstellungen
- Die Komponente unterstützt derzeit keine automatische Übersetzung der Sprachnamen in die aktuelle Sprache
- Die Komponente unterstützt derzeit keine automatische Anpassung der Leserichtung basierend auf der ausgewählten Sprache
- Die Komponente unterstützt derzeit keine automatische Anpassung der Flaggen basierend auf der ausgewählten Sprache