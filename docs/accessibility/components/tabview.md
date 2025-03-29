# TabView Barrierefreiheit

## Implementierte Verbesserungen

Die TabView-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="tablist"` - Definiert die Gruppe von Tabs als Tabliste
- `role="tab"` - Definiert jedes Tab-Element als Tab
- `role="tabpanel"` - Definiert den Inhaltsbereich als Tab-Panel
- `aria-orientation` - Gibt die Ausrichtung der Tabs an (horizontal/vertikal)
- `aria-selected` - Zeigt an, welcher Tab ausgewählt ist
- `aria-controls` - Verknüpft jeden Tab mit seinem Panel
- `aria-labelledby` - Verknüpft jedes Panel mit seinem Tab
- `aria-disabled` - Zeigt an, ob ein Tab deaktiviert ist
- `aria-label` - Bietet eine Beschreibung der Tabliste
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit der Tabliste
- `aria-errormessage` - Verknüpft eine Fehlermeldung mit der Tabliste
- `aria-invalid` - Zeigt an, ob die Tabliste ungültig ist
- `aria-busy` - Zeigt an, ob die Tabliste im Ladezustand ist

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Tab-Taste
- Navigation zwischen Tabs mit Pfeiltasten
- Aktivierung von Tabs mit Enter oder Leertaste
- Sprung zum ersten Tab mit Home-Taste
- Sprung zum letzten Tab mit End-Taste
- Tastaturkürzel für direkten Zugriff auf Tabs (1-9)
- Zirkuläre Navigation (vom letzten zum ersten Tab und umgekehrt)
- Automatische oder manuelle Aktivierung von Tabs
- Überspringen von deaktivierten Tabs

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Live-Regionen für Statusänderungen
- Ankündigung von Tab-Wechseln
- Korrekte Ankündigung von Fehlermeldungen
- Unterstützung für benutzerdefinierte ARIA-Labels

### Zusätzliche Funktionen

- Unterstützung für vertikale und horizontale Tabs
- Unterstützung für verschiedene Tab-Positionen (oben, unten, links, rechts)
- Unterstützung für verschiedene Tab-Varianten (default, pills, buttons, underline, minimal)
- Unterstützung für verschiedene Tab-Größen
- Unterstützung für Icons und Badges in Tabs
- Unterstützung für Fehler-, Erfolgs- und Ladezustände
- Unterstützung für Hilfetext und Beschreibungen

## Beispiel-Implementierung

```tsx
// Einfache Tabs
<TabViewA11y
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Inhalt von Tab 2</div> }
  ]}
  ariaLabel="Beispiel-Tabs"
/>

// Tabs mit Icons und Badges
<TabViewA11y
  tabs={[
    { 
      id: 'home', 
      label: 'Home', 
      content: <div>Startseite</div>,
      icon: <HomeIcon />,
      badge: 'Neu',
      badgeColor: 'primary'
    },
    { 
      id: 'profile', 
      label: 'Profil', 
      content: <div>Benutzerprofil</div>,
      icon: <UserIcon />
    }
  ]}
  ariaLabel="Navigation"
/>

// Vertikale Tabs
<TabViewA11y
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Inhalt von Tab 2</div> }
  ]}
  ariaLabel="Vertikale Tabs"
  vertical
  position="left"
/>

// Tabs mit manueller Aktivierung
<TabViewA11y
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Inhalt von Tab 2</div> }
  ]}
  ariaLabel="Manuelle Tabs"
  manual
  description="Drücken Sie die Leertaste oder Enter, um einen Tab zu aktivieren"
/>
```

## Barrierefreiheitstests

Die TabView-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Visuelle Tests** zur Überprüfung der Farbkontraste und Fokus-Indikatoren

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine verschachtelten Tabs
- Die Komponente unterstützt derzeit keine dynamische Änderung der Tab-Anzahl
- Die Komponente unterstützt derzeit keine Drag-and-Drop-Umordnung von Tabs
- Die Komponente unterstützt derzeit keine Tabs mit Formularelementen
- Die Komponente unterstützt derzeit keine Tabs mit komplexen Inhalten wie Tabellen oder Listen