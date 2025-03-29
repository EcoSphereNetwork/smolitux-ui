# Flex Barrierefreiheit

## Implementierte Verbesserungen

Die Flex-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### Semantische Struktur

- Unterstützung für semantische HTML-Elemente (`div`, `section`, `article`, `main`, `aside`, `header`, `footer`, `nav`, `form`, `fieldset`)
- Korrekte Verwendung von ARIA-Rollen für verschiedene Anwendungsfälle
- Möglichkeit, benutzerdefinierte ARIA-Attribute zu setzen
- Unterstützung für Landmark-Regionen (z.B. `<FlexA11y as="nav" role="navigation">`)

### ARIA-Attribute

- `role` - Definiert die Rolle des Elements
- `aria-label` - Bietet eine Beschreibung des Elements
- `aria-labelledby` - Verknüpft ein Label mit dem Element
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Element
- `aria-owns` - Definiert Elemente, die zu diesem Element gehören
- `aria-controls` - Definiert Elemente, die von diesem Element gesteuert werden
- `aria-expanded` - Zeigt an, ob ein Element erweitert ist
- `aria-haspopup` - Zeigt an, ob ein Element ein Popup hat
- `aria-hidden` - Versteckt ein Element vor Screenreadern
- `aria-live` - Definiert eine Live-Region
- `aria-relevant` - Definiert, welche Änderungen in einer Live-Region relevant sind
- `aria-atomic` - Definiert, ob eine Live-Region als Ganzes aktualisiert wird
- `aria-busy` - Zeigt an, ob ein Element im Ladezustand ist
- `aria-current` - Zeigt an, ob ein Element der aktuelle Kontext ist
- `aria-roledescription` - Bietet eine benutzerdefinierte Rollenbeschreibung
- `aria-keyshortcuts` - Definiert Tastaturkürzel für ein Element
- `aria-setsize` - Definiert die Größe einer Gruppe
- `aria-posinset` - Definiert die Position eines Elements in einer Gruppe
- `aria-level` - Definiert die Hierarchieebene eines Elements

### Tastaturunterstützung

- Unterstützung für `tabIndex` zur Steuerung der Tabulatorreihenfolge
- Möglichkeit, Flex-Container fokussierbar zu machen
- Unterstützung für Tastaturkürzel durch `aria-keyshortcuts`

## Beispiel-Implementierung

```tsx
// Einfache Flex-Box
<FlexA11y gap={4} alignItems="center">
  <Icon name="user" aria-hidden="true" />
  <span>Benutzername</span>
</FlexA11y>

// Navigation mit semantischer Struktur
<FlexA11y 
  as="nav" 
  role="navigation" 
  ariaLabel="Hauptnavigation"
  gap={4}
>
  <a href="/">Startseite</a>
  <a href="/produkte">Produkte</a>
  <a href="/kontakt">Kontakt</a>
</FlexA11y>

// Hauptinhalt mit semantischer Struktur
<FlexA11y 
  as="main" 
  role="main"
  direction="column"
  gap={6}
>
  <h1>Willkommen</h1>
  <p>Dies ist der Hauptinhalt der Seite.</p>
</FlexA11y>

// Seitenleiste mit semantischer Struktur
<FlexA11y 
  as="aside" 
  role="complementary"
  ariaLabel="Verwandte Informationen"
  direction="column"
  gap={4}
>
  <h2>Verwandte Artikel</h2>
  <ul>
    <li><a href="/artikel/1">Artikel 1</a></li>
    <li><a href="/artikel/2">Artikel 2</a></li>
  </ul>
</FlexA11y>

// Formular mit semantischer Struktur
<FlexA11y 
  as="form" 
  role="form"
  ariaLabel="Kontaktformular"
  direction="column"
  gap={4}
>
  <label htmlFor="name">Name</label>
  <input id="name" type="text" />
  <button type="submit">Absenden</button>
</FlexA11y>

// Live-Region für Statusmeldungen
<FlexA11y 
  ariaLive="polite" 
  ariaAtomic={true}
  ariaRelevant="additions text"
>
  <div>Status: Erfolgreich gespeichert</div>
</FlexA11y>
```

## Barrierefreiheitstests

Die Flex-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Manuelle Tests** zur Überprüfung der semantischen Struktur
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine automatische Anpassung der Rolle basierend auf dem gewählten Element
- Die Komponente unterstützt derzeit keine automatische Validierung der ARIA-Attribute
- Die Komponente unterstützt derzeit keine automatische Generierung von IDs für ARIA-Attribute