# List Barrierefreiheit

## Implementierte Verbesserungen

Die List-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="list"` - Definiert das Element als Liste
- `role="listitem"` - Definiert die Listeneinträge
- `aria-label` - Bietet eine Beschreibung der Liste
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit der Liste
- `aria-disabled` - Zeigt an, ob ein Listeneintrag deaktiviert ist
- `aria-selected` - Zeigt an, ob ein Listeneintrag ausgewählt ist
- `role="img"` - Definiert Icons mit entsprechenden Labels
- `role="group"` - Gruppiert Aktionen in Listeneinträgen
- `tabIndex` - Ermöglicht die Tastaturnavigation zwischen Listeneinträgen

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Pfeiltasten
- Unterstützung für Home/End-Tasten zur Navigation zum ersten/letzten Element
- Enter/Space zum Auswählen von Listeneinträgen
- Unterschiedliche Navigationsmuster für horizontale und vertikale Listen
- Korrektes Fokus-Management zwischen Listeneinträgen

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Korrekte Ankündigung von Listenstrukturen
- Beschreibende Texte für Icons und Aktionen
- Korrekte Ankündigung von Beschreibungslisten
- Korrekte Ankündigung von primären und sekundären Texten

### Zusätzliche Funktionen

- Unterstützung für horizontale und vertikale Listen
- Barrierefreie Beschreibungslisten
- Barrierefreie Icons mit Labels
- Barrierefreie Aktionen mit Labels
- Selektierbare Listeneinträge mit korrekten ARIA-Attributen

## Beispiel-Implementierung

```tsx
<ListA11y ariaLabel="Meine Liste" description="Eine Liste mit Beispieleinträgen">
  <ListItemA11y primary="Item 1" secondary="Beschreibung 1" />
  <ListItemA11y primary="Item 2" secondary="Beschreibung 2" disabled />
  <ListItemA11y primary="Item 3" description="Zusätzliche Informationen für Screenreader" />
</ListA11y>

<ListA11y ariaLabel="Horizontale Navigation" horizontal selectable>
  <ListItemA11y id="home">Home</ListItemA11y>
  <ListItemA11y id="products">Products</ListItemA11y>
  <ListItemA11y id="about">About</ListItemA11y>
</ListA11y>

<ListA11y ariaLabel="Benutzerliste">
  <ListItemA11y>
    <ListItemIconA11y ariaLabel="Benutzer">
      <UserIcon />
    </ListItemIconA11y>
    <ListItemTextA11y primary="Max Mustermann" secondary="Administrator" />
    <ListItemActionA11y ariaLabel="Aktionen">
      <Button>Bearbeiten</Button>
    </ListItemActionA11y>
  </ListItemA11y>
</ListA11y>
```

## Barrierefreiheitstests

Die List-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Bei sehr langen Listen kann die Tastaturnavigation zeitaufwändig sein
- Die Komponente unterstützt derzeit keine virtuelle Scrolling-Funktionalität für sehr große Datensätze
- Bei verschachtelten Listen kann die Tastaturnavigation komplex werden
- Die Komponente unterstützt derzeit keine Drag-and-Drop-Funktionalität