# Menu Barrierefreiheit

## Implementierte Verbesserungen

Die Menu-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="menu"` - Definiert das Element als Menü
- `aria-orientation` - Gibt an, ob das Menü horizontal oder vertikal ausgerichtet ist
- `aria-label` - Bietet eine Beschreibung des Menüs
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Menü
- `role="menuitem"` - Definiert die Menüeinträge
- `aria-disabled` - Zeigt an, ob ein Menüeintrag deaktiviert ist
- `aria-selected` - Zeigt an, ob ein Menüeintrag ausgewählt ist
- `aria-haspopup` - Zeigt an, ob ein Menüeintrag ein Untermenü hat
- `aria-expanded` - Zeigt an, ob ein Untermenü geöffnet ist
- `aria-controls` - Verknüpft ein Untermenü mit seinem übergeordneten Menüeintrag

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Pfeiltasten
- Unterstützung für Home/End-Tasten zur Navigation zum ersten/letzten Element
- Escape-Taste zum Schließen von Untermenüs
- Enter/Space zum Aktivieren von Menüeinträgen
- Pfeiltasten zum Öffnen/Schließen von Untermenüs
- Korrektes Fokus-Management zwischen Menüeinträgen

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Korrekte Ankündigung von Menüstrukturen
- Beschreibende Texte für Icons und Aktionen
- Korrekte Ankündigung von Untermenüs
- Korrekte Ankündigung von Tastenkombinationen

### Zusätzliche Funktionen

- Unterstützung für horizontale und vertikale Menüs
- Barrierefreie Untermenüs
- Barrierefreie Tastenkombinationen
- Barrierefreie Badges und Icons

## Beispiel-Implementierung

```tsx
<MenuA11y ariaLabel="Hauptnavigation" direction="horizontal">
  <MenuItemA11y id="home">Home</MenuItemA11y>
  <MenuItemA11y 
    id="products" 
    submenu={
      <>
        <MenuItemA11y id="product1">Product 1</MenuItemA11y>
        <MenuItemA11y id="product2">Product 2</MenuItemA11y>
      </>
    }
  >
    Products
  </MenuItemA11y>
  <MenuItemA11y id="about" description="Über uns und unsere Mission">About</MenuItemA11y>
  <MenuItemA11y id="contact" disabled>Contact</MenuItemA11y>
</MenuA11y>
```

## Barrierefreiheitstests

Die Menu-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Bei sehr komplexen verschachtelten Menüs kann die Tastaturnavigation umständlich werden
- Die Komponente unterstützt derzeit keine Drag-and-Drop-Funktionalität
- Bei sehr vielen Menüeinträgen kann die Navigation für Tastaturbenutzer zeitaufwändig sein
- Die Komponente unterstützt derzeit keine automatische Positionierung von Untermenüs basierend auf dem verfügbaren Platz