# Button-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Button-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Button-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Standard-Button
- `role="button"`: Wird automatisch für das `<button>`-Element gesetzt
- `type="button|submit|reset"`: Definiert den Button-Typ
- `data-variant="primary|secondary|..."`: Gibt die visuelle Variante des Buttons an
- `data-testid="button"`: Für Testbarkeit

### Zustandsspezifische Attribute
- `disabled`: Nativer HTML-Attribut für deaktivierte Buttons
- `aria-disabled="true|false"`: Für Screenreader, wenn der Button deaktiviert ist
- `aria-busy="true|false"`: Zeigt an, dass der Button im Ladezustand ist
- `data-loading="true"`: Zeigt den Ladezustand an
- `data-state="on|off"`: Für Toggle-Buttons, zeigt den aktuellen Zustand an
- `aria-pressed="true|false"`: Für Toggle-Buttons, zeigt den gedrückten Zustand an

### Dropdown-Button Attribute
- `aria-haspopup="true"`: Zeigt an, dass der Button ein Popup/Dropdown öffnet
- `aria-expanded="true|false"`: Zeigt an, ob das Dropdown geöffnet ist
- `aria-controls="ID"`: Verweist auf die ID des kontrollierten Dropdown-Menüs

### Link-Button Attribute
- `role="button"`: Zeigt an, dass der Link als Button fungiert
- `aria-disabled="true|false"`: Für Screenreader, wenn der Link-Button deaktiviert ist

### Icon-Button Attribute
- `aria-label="Beschreibung"`: Beschreibt den Zweck des Icon-Buttons für Screenreader

## Tastaturnavigation

Die Button-Komponente unterstützt folgende Tastaturinteraktionen:

- **Tab**: Fokussiert den Button
- **Enter/Space**: Aktiviert den Button
- **Escape**: Schließt ein geöffnetes Dropdown (wenn der Button ein Dropdown-Trigger ist)

## Fokus-Management

Die Button-Komponente implementiert folgende Fokus-Management-Strategien:

- **Fokus-Indikatoren**: Deutliche visuelle Anzeige des Fokus durch einen Ring um den Button
- **Fokus-Reihenfolge**: Logische Tab-Reihenfolge durch die native Button-Funktionalität

## Screenreader-Unterstützung

Die Button-Komponente bietet folgende Screenreader-Unterstützungen:

- **Zustandsankündigungen**: Screenreader kündigen den Zustand des Buttons an (deaktiviert, gedrückt, etc.)
- **Versteckte Texte**: Zusätzliche Informationen für Screenreader durch `sr-only`-Klassen
- **Icon-Beschreibungen**: Icons werden mit `aria-hidden="true"` vor Screenreadern versteckt, wenn sie dekorativ sind

## Beispiele für barrierefreie Verwendung

### Standard-Button

```tsx
<Button variant="primary" onClick={handleClick}>
  Speichern
</Button>
```

### Deaktivierter Button

```tsx
<Button disabled>
  Deaktiviert
</Button>
```

### Loading-Button

```tsx
<Button loading loadingText="Wird gespeichert...">
  Speichern
</Button>
```

### Icon-Button

```tsx
<Button 
  isIconButton 
  leftIcon={<Icon name="trash" />} 
  aria-label="Löschen"
/>
```

### Toggle-Button

```tsx
<Button 
  isToggle 
  isToggleOn={isActive} 
  onClick={() => setIsActive(!isActive)}
>
  {isActive ? 'Aktiv' : 'Inaktiv'}
</Button>
```

### Dropdown-Button

```tsx
<Button 
  isDropdownTrigger 
  aria-expanded={isOpen ? 'true' : 'false'} 
  aria-controls="dropdown-menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Menü öffnen
</Button>
<div id="dropdown-menu" hidden={!isOpen}>
  {/* Dropdown-Inhalt */}
</div>
```

### Link-Button

```tsx
<Button 
  isLink 
  href="https://example.com" 
  target="_blank"
>
  Externe Seite öffnen
</Button>
```

## Best Practices

1. **Beschreibende Labels**: Verwenden Sie klare, beschreibende Labels für Buttons
   - Vermeiden Sie generische Labels wie "Klicken Sie hier"
   - Verwenden Sie Verben, die die Aktion beschreiben (z.B. "Speichern", "Löschen")

2. **Icon-Buttons mit Labels**: Stellen Sie sicher, dass Icon-Buttons immer ein `aria-label` haben
   - Beispiel: `<Button isIconButton leftIcon={<Icon />} aria-label="Löschen" />`

3. **Zustandsanzeige**: Machen Sie den Zustand des Buttons visuell und für Screenreader erkennbar
   - Verwenden Sie `aria-pressed` für Toggle-Buttons
   - Verwenden Sie `aria-expanded` für Dropdown-Buttons

4. **Fokus-Reihenfolge**: Achten Sie auf eine logische Tab-Reihenfolge
   - Vermeiden Sie negative `tabIndex`-Werte
   - Gruppieren Sie zusammengehörige Buttons

5. **Ausreichender Kontrast**: Stellen Sie sicher, dass der Button ausreichenden Kontrast hat
   - Mindestens 4.5:1 für normalen Text
   - Mindestens 3:1 für große Texte und UI-Komponenten

6. **Ausreichende Größe**: Machen Sie Buttons groß genug für die Bedienung auf Touchscreens
   - Mindestens 44x44 Pixel für Touch-Targets

## Bekannte Einschränkungen

1. **Komplexe Zustände**: Bei sehr komplexen Zuständen kann es für Screenreader-Benutzer schwierig sein, den aktuellen Zustand zu verstehen
2. **Icon-Buttons ohne Label**: Icon-Buttons ohne `aria-label` sind für Screenreader-Benutzer nicht zugänglich
3. **Dropdown-Buttons**: Die Verbindung zwischen Dropdown-Button und Dropdown-Menü muss manuell mit `aria-controls` hergestellt werden

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [MDN Web Docs: ARIA: button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)
- [WebAIM: Creating Accessible Buttons](https://webaim.org/techniques/forms/controls)