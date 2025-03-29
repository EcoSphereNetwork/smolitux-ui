# Checkbox-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Checkbox-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Checkbox-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Standard-Checkbox
- Nativer `<input type="checkbox">` mit impliziter Rolle `checkbox`
- `aria-checked="mixed"`: Für indeterminierten Zustand
- `aria-required="true"`: Wenn die Checkbox erforderlich ist
- `aria-invalid="true"`: Wenn die Checkbox ungültig ist
- `aria-disabled="true"`: Wenn die Checkbox deaktiviert ist
- `aria-describedby="ID"`: Verweist auf Hilfetexte, Beschreibungen oder Erfolgsmeldungen
- `aria-errormessage="ID"`: Verweist auf Fehlermeldungen

### Switch/Toggle
- `role="switch"`: Kennzeichnet die Checkbox als Schalter
- `aria-roledescription="Schalter"`: Beschreibt die Funktion für Screenreader
- Alle anderen Attribute wie bei Standard-Checkbox

### Button-Checkbox
- `role="checkbox"`: Explizite Rolle für Button-Checkboxen
- Alle anderen Attribute wie bei Standard-Checkbox

## Tastaturnavigation

Die Checkbox-Komponente unterstützt folgende Tastaturinteraktionen:

- **Tab**: Fokussiert die Checkbox
- **Space**: Aktiviert/deaktiviert die Checkbox
- **Enter**: Aktiviert/deaktiviert die Checkbox (bei Button-Checkbox)

## Screenreader-Unterstützung

Die Checkbox-Komponente bietet folgende Screenreader-Unterstützungen:

- **Beschreibende Labels**: Die Checkbox wird mit einem beschreibenden Label versehen
- **Erforderliche Felder**: Erforderliche Felder werden mit "(Erforderlich)" für Screenreader angekündigt
- **Fehlermeldungen**: Fehlermeldungen werden mit `role="alert"` und `aria-live="assertive"` angekündigt
- **Erfolgsmeldungen**: Erfolgsmeldungen werden mit `role="status"` und `aria-live="polite"` angekündigt
- **Versteckte Texte**: Zusätzliche Informationen für Screenreader durch `sr-only`-Klassen

## Beispiele für barrierefreie Verwendung

### Standard-Checkbox

```tsx
<Checkbox 
  label="Ich akzeptiere die AGB" 
/>
```

### Erforderliche Checkbox

```tsx
<Checkbox 
  label="Ich akzeptiere die AGB" 
  isRequired 
/>
```

### Checkbox mit Fehler

```tsx
<Checkbox 
  label="Ich akzeptiere die AGB" 
  isRequired 
  error="Bitte akzeptieren Sie die AGB, um fortzufahren" 
/>
```

### Checkbox mit Hilfetext

```tsx
<Checkbox 
  label="Newsletter abonnieren" 
  helperText="Sie können sich jederzeit wieder abmelden" 
/>
```

### Indeterminierte Checkbox

```tsx
<Checkbox 
  label="Alle auswählen" 
  indeterminate 
/>
```

### Switch-Checkbox

```tsx
<Checkbox 
  label="Benachrichtigungen aktivieren" 
  isSwitch 
/>
```

### Toggle-Checkbox

```tsx
<Checkbox 
  label="Dunkelmodus" 
  isToggle 
/>
```

### Button-Checkbox

```tsx
<Checkbox 
  label="Als Favorit markieren" 
  isButton 
/>
```

## Best Practices

1. **Beschreibende Labels**: Verwenden Sie klare, beschreibende Labels für Checkboxen
   - Gut: "Newsletter abonnieren" oder "Ich akzeptiere die AGB"
   - Schlecht: "Abonnieren" oder "Akzeptieren"

2. **Gruppierung**: Gruppieren Sie zusammengehörige Checkboxen
   - Verwenden Sie `<fieldset>` und `<legend>` für Gruppen von Checkboxen
   - Oder verwenden Sie die `CheckboxGroup`-Komponente

3. **Fehlermeldungen**: Stellen Sie klare Fehlermeldungen bereit
   - Beschreiben Sie das Problem und wie es behoben werden kann
   - Vermeiden Sie technische Fehlermeldungen

4. **Visuelle Unterscheidung**: Stellen Sie sicher, dass der Zustand der Checkbox visuell klar erkennbar ist
   - Ausreichender Kontrast zwischen ausgewähltem und nicht ausgewähltem Zustand
   - Deutliche visuelle Unterscheidung für indeterminierten Zustand

5. **Tastaturnavigation**: Stellen Sie sicher, dass die Checkbox mit der Tastatur bedienbar ist
   - Fokus-Indikatoren sollten deutlich sichtbar sein
   - Die Tab-Reihenfolge sollte logisch sein

## Bekannte Einschränkungen

1. **Komplexe Zustände**: Bei sehr komplexen Zuständen kann es für Screenreader-Benutzer schwierig sein, den aktuellen Zustand zu verstehen
2. **Benutzerdefinierte Styles**: Bei stark angepassten Styles kann die visuelle Unterscheidung zwischen den Zuständen beeinträchtigt werden

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
- [MDN Web Docs: ARIA: checkbox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)