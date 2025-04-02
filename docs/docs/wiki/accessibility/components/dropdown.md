# Dropdown Barrierefreiheit

Die Smolitux UI Bibliothek bietet zwei Versionen der Dropdown-Komponente:

1. **Standard-Dropdown**: Grundlegende Barrierefreiheitsfunktionen
2. **DropdownA11y**: Erweiterte Barrierefreiheitsfunktionen mit umfassender ARIA-Unterstützung

## Standard-Dropdown

Die Standard-Dropdown-Komponente wurde mit grundlegenden Barrierefreiheitsverbesserungen implementiert:

### ARIA-Attribute

- `aria-haspopup="menu"` - Zeigt an, dass der Button ein Menü öffnet
- `aria-expanded` - Zeigt an, ob das Dropdown geöffnet ist
- `aria-controls` - Verknüpft den Button mit dem Menü
- `aria-labelledby` - Verknüpft das Menü mit dem Button
- `role="menu"` - Definiert das Dropdown als Menü
- `role="menuitem"` - Definiert die Einträge als Menüeinträge
- `aria-orientation="vertical"` - Gibt die Orientierung des Menüs an
- `aria-disabled` - Zeigt an, ob ein Element deaktiviert ist
- `aria-selected` - Zeigt an, welches Element ausgewählt ist
- `aria-describedby` - Verknüpft zusätzliche Beschreibungen mit Elementen

### Beispiel-Implementierung (Standard)

```tsx
<Dropdown>
  <DropdownToggle>Options</DropdownToggle>
  <DropdownMenu>
    <DropdownItem value="edit">Edit</DropdownItem>
    <DropdownDivider />
    <DropdownItem value="delete" description="Permanently delete this item">Delete</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

## DropdownA11y (Erweiterte Barrierefreiheit)

Die `DropdownA11y`-Komponente bietet erweiterte Barrierefreiheitsfunktionen und ist für Anwendungen gedacht, die höchste Barrierefreiheitsstandards erfüllen müssen.

### Erweiterte Funktionen

#### Automatische ID-Generierung

Die Komponente generiert automatisch eindeutige IDs für ARIA-Attribute, sodass keine manuellen IDs angegeben werden müssen.

```tsx
// Die IDs werden automatisch generiert
<DropdownA11y>
  <DropdownToggleA11y>Options</DropdownToggleA11y>
  <DropdownMenuA11y>
    <DropdownItemA11y value="edit">Edit</DropdownItemA11y>
  </DropdownMenuA11y>
</DropdownA11y>
```

#### Live-Regionen für Screenreader

Die Komponente verwendet Live-Regionen, um Statusänderungen für Screenreader anzukündigen:

```tsx
<DropdownA11y 
  announceOnOpen={true}
  openAnnouncement="Dropdown-Menü geöffnet"
  announceOnClose={true}
  closeAnnouncement="Dropdown-Menü geschlossen"
>
  {/* ... */}
</DropdownA11y>
```

#### Erweiterte Tastaturnavigation

- **Pfeiltasten (↑/↓)**: Navigation zwischen Menüeinträgen
- **Home/End**: Springen zum ersten/letzten Eintrag
- **Escape**: Schließen des Dropdowns
- **Enter/Space**: Auswählen eines Eintrags
- **Buchstaben-Navigation**: Schnelles Springen zu Einträgen

#### Verbessertes Fokus-Management

- `autoFocus={true}`: Automatischer Fokus auf das erste Element beim Öffnen
- `returnFocus={true}`: Rückgabe des Fokus zum Trigger-Button beim Schließen
- `trapFocus={true}`: Fokus innerhalb des Dropdowns halten

### Vollständiges Beispiel (DropdownA11y)

```tsx
<DropdownA11y
  autoFocus={true}
  returnFocus={true}
  trapFocus={true}
  closeOnEsc={true}
  closeOnClickOutside={true}
  closeOnSelect={true}
  onSelect={(value) => console.log(`Selected: ${value}`)}
  aria-label="Optionen-Menü"
>
  <DropdownToggleA11y>
    Optionen
  </DropdownToggleA11y>
  <DropdownMenuA11y>
    <DropdownItemA11y value="edit" icon={<EditIcon />}>
      Bearbeiten
    </DropdownItemA11y>
    <DropdownDividerA11y label="Gefahrenzone" />
    <DropdownItemA11y 
      value="delete" 
      icon={<DeleteIcon />}
      description="Löscht das Element dauerhaft"
    >
      Löschen
    </DropdownItemA11y>
  </DropdownMenuA11y>
</DropdownA11y>
```

## Vergleich der Komponenten

| Funktion | Standard-Dropdown | DropdownA11y |
|----------|-------------------|--------------|
| Grundlegende ARIA-Attribute | ✅ | ✅ |
| Automatische ID-Generierung | ❌ | ✅ |
| Live-Regionen | ❌ | ✅ |
| Erweiterte Tastaturnavigation | ✅ | ✅ |
| Fokus-Falle | ❌ | ✅ |
| Automatischer Fokus | ✅ | ✅ (konfigurierbar) |
| Fokus-Rückgabe | ✅ | ✅ (konfigurierbar) |
| Screenreader-Ankündigungen | ❌ | ✅ |
| Beschreibungen für Screenreader | ✅ | ✅ |

## Barrierefreiheitstests

Beide Dropdown-Komponenten wurden mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Wann sollte welche Komponente verwendet werden?

- **Standard-Dropdown**: Für die meisten Anwendungsfälle ausreichend, wenn grundlegende Barrierefreiheit benötigt wird.
- **DropdownA11y**: Für Anwendungen, die höchste Barrierefreiheitsstandards erfüllen müssen, wie öffentliche Webseiten, Regierungswebseiten oder Anwendungen mit strengen Compliance-Anforderungen (WCAG 2.1 AA/AAA).

## Bekannte Einschränkungen

- Bei sehr komplexen Menüs kann die Tastaturnavigation umständlich sein
- Bei verschachtelten Dropdowns kann das Fokus-Management komplex werden