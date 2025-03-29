# Dropdown Barrierefreiheit

## Implementierte Verbesserungen

Die Dropdown-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen implementiert:

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

### Tastaturnavigation

- Enter/Space zum Öffnen/Schließen des Dropdowns
- Pfeiltasten (↑/↓) zur Navigation zwischen Menüeinträgen
- Home/End zum Springen zum ersten/letzten Eintrag
- Escape zum Schließen des Dropdowns
- Tab-Navigation durch alle interaktiven Elemente
- Buchstaben-Navigation zum schnellen Springen zu Einträgen

### Fokus-Management

- Automatischer Fokus auf das erste Element beim Öffnen
- Rückgabe des Fokus zum Trigger-Button beim Schließen
- Sichtbare Fokus-Indikatoren für alle interaktiven Elemente
- Zyklische Tab-Navigation innerhalb des Dropdowns

### Screenreader-Unterstützung

- Beschreibende Texte für Dropdown-Elemente
- Ankündigungen von Status-Änderungen
- Versteckte Hilfstexte mit `sr-only`-Klassen
- Korrekte Hierarchie von Elementen

## Beispiel-Implementierung

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

## Barrierefreiheitstests

Die Dropdown-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Bei sehr komplexen Menüs kann die Tastaturnavigation umständlich sein
- Bei verschachtelten Dropdowns kann das Fokus-Management komplex werden