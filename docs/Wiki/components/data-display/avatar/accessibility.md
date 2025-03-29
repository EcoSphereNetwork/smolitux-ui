# Avatar-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Avatar-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Avatar-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Avatar-Container
- `role="img"`: Identifiziert den Avatar als Bild
- `aria-label="..."`: Beschreibt den Avatar für Screenreader
- `id="avatar-[unique-id]"`: Eindeutige ID für ARIA-Referenzen

### Daten-Attribute
- `data-size="xs|sm|md|lg|xl"`: Gibt die Größe des Avatars an
- `data-shape="circle|square|rounded"`: Gibt die Form des Avatars an
- `data-status="online|offline|away|busy"`: Gibt den Status des Avatars an

### Status-Indikator
- `aria-hidden="true"`: Versteckt den visuellen Status-Indikator vor Screenreadern
- `<span class="sr-only">Status: Online</span>`: Textuelle Beschreibung des Status für Screenreader

### Bild und Fallback-Inhalte
- `aria-hidden="true"`: Versteckt das Bild und Fallback-Inhalte vor Screenreadern, da der Container bereits ein `aria-label` hat

## Screenreader-Unterstützung

Die Avatar-Komponente bietet folgende Screenreader-Unterstützungen:

- **Beschreibende Labels**: Der Avatar wird mit einem beschreibenden Label versehen, das den Namen oder den Alt-Text enthält
- **Status-Ankündigungen**: Der Status des Avatars wird für Screenreader angekündigt
- **Versteckte Texte**: Zusätzliche Informationen für Screenreader durch `sr-only`-Klassen

## Beispiele für barrierefreie Verwendung

### Standard-Avatar mit Namen

```tsx
<Avatar name="Max Mustermann" />
```

Der Screenreader wird "Avatar von Max Mustermann" ankündigen.

### Avatar mit Bild und Alt-Text

```tsx
<Avatar 
  src="/images/profile.jpg" 
  alt="Profilbild von Max Mustermann" 
/>
```

Der Screenreader wird "Profilbild von Max Mustermann" ankündigen.

### Avatar mit Status

```tsx
<Avatar 
  name="Max Mustermann" 
  status="online" 
/>
```

Der Screenreader wird "Avatar von Max Mustermann, Status: Online" ankündigen.

### Avatar in verschiedenen Größen

```tsx
<Avatar 
  name="Max Mustermann" 
  size="lg" 
/>
```

### Avatar mit verschiedenen Formen

```tsx
<Avatar 
  name="Max Mustermann" 
  shape="square" 
/>
```

## Best Practices

1. **Beschreibende Alt-Texte**: Verwenden Sie beschreibende Alt-Texte für Avatare mit Bildern
   - Gut: `alt="Profilbild von Max Mustermann"`
   - Schlecht: `alt="Avatar"` oder `alt="Bild"`

2. **Namen für Fallback-Avatare**: Geben Sie immer einen Namen an, wenn kein Bild vorhanden ist
   - Dies ermöglicht die Anzeige von Initialen und eine bessere Screenreader-Ankündigung

3. **Status-Informationen**: Wenn der Avatar einen Status anzeigt, stellen Sie sicher, dass dieser für Screenreader zugänglich ist
   - Die Komponente fügt automatisch eine textuelle Beschreibung des Status hinzu

4. **Konsistente Größen**: Verwenden Sie konsistente Größen für Avatare in ähnlichen Kontexten
   - Dies verbessert die visuelle Konsistenz und Benutzererfahrung

5. **Ausreichender Kontrast**: Stellen Sie sicher, dass die Initialen ausreichenden Kontrast zum Hintergrund haben
   - Die Komponente verwendet automatisch kontrastreiche Farbkombinationen

## Bekannte Einschränkungen

1. **Benutzerdefinierte Komponenten**: Wenn Sie `customComponent` verwenden, müssen Sie selbst für die Barrierefreiheit sorgen
2. **Gruppierte Avatare**: Bei gruppierten Avataren (`group={true}`) sollte ein übergeordnetes Element eine beschreibende Rolle und Label haben

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Images](https://www.w3.org/WAI/tutorials/images/)
- [MDN Web Docs: ARIA: img role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role)
- [WebAIM: Alternative Text](https://webaim.org/techniques/alttext/)