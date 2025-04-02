# Accordion-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Accordion-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Accordion-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Accordion
- `role="region"`: Identifiziert den Accordion-Container als Region
- `aria-multiselectable="true|false"`: Gibt an, ob mehrere Panels gleichzeitig geöffnet sein können

### AccordionItem Button
- `aria-expanded="true|false"`: Gibt an, ob das Panel geöffnet ist
- `aria-controls="PANEL_ID"`: Verweist auf die ID des zugehörigen Panels
- `aria-disabled="true|false"`: Gibt an, ob das Panel deaktiviert ist
- `id="BUTTON_ID"`: Eindeutige ID für den Button

### AccordionItem Content
- `role="region"`: Identifiziert den Inhaltsbereich als Region
- `aria-hidden="true|false"`: Gibt an, ob der Inhalt sichtbar ist
- `aria-labelledby="BUTTON_ID"`: Verweist auf die ID des zugehörigen Buttons
- `aria-describedby="DESCRIPTION_ID"` (optional): Verweist auf die ID einer zusätzlichen Beschreibung

## Tastaturnavigation

Die Accordion-Komponente unterstützt folgende Tastaturinteraktionen:

- **Tab**: Navigiert zu den Accordion-Buttons und dann zu den geöffneten Inhalten
- **Shift+Tab**: Navigiert rückwärts durch fokussierbare Elemente
- **Enter/Space**: Öffnet oder schließt das Panel
- **Home**: Bewegt den Fokus zum ersten Accordion-Button (wenn implementiert)
- **End**: Bewegt den Fokus zum letzten Accordion-Button (wenn implementiert)

## Fokus-Management

Die Accordion-Komponente implementiert folgende Fokus-Management-Strategien:

1. **Fokussierbare Inhalte**: Geöffnete Panels sind fokussierbar (`tabIndex={0}`)
2. **Visueller Fokus-Indikator**: Deutliche visuelle Anzeige des Fokus
3. **Fokus-Reihenfolge**: Logische Tab-Reihenfolge durch die Accordion-Elemente

## Beispiele für barrierefreie Verwendung

### Standard-Accordion

```tsx
<Accordion>
  <AccordionItem id="section1" title="Abschnitt 1">
    Inhalt von Abschnitt 1...
  </AccordionItem>
  <AccordionItem id="section2" title="Abschnitt 2">
    Inhalt von Abschnitt 2...
  </AccordionItem>
</Accordion>
```

### Accordion mit mehreren geöffneten Panels

```tsx
<Accordion allowMultiple>
  <AccordionItem id="section1" title="Abschnitt 1">
    Inhalt von Abschnitt 1...
  </AccordionItem>
  <AccordionItem id="section2" title="Abschnitt 2">
    Inhalt von Abschnitt 2...
  </AccordionItem>
</Accordion>
```

### Accordion mit Icons

```tsx
<Accordion iconStyle="plus">
  <AccordionItem id="section1" title="Abschnitt 1" icon={<InfoIcon />}>
    Inhalt von Abschnitt 1...
  </AccordionItem>
  <AccordionItem id="section2" title="Abschnitt 2" icon={<SettingsIcon />}>
    Inhalt von Abschnitt 2...
  </AccordionItem>
</Accordion>
```

### Accordion mit deaktiviertem Panel

```tsx
<Accordion>
  <AccordionItem id="section1" title="Abschnitt 1">
    Inhalt von Abschnitt 1...
  </AccordionItem>
  <AccordionItem id="section2" title="Abschnitt 2" disabled>
    Inhalt von Abschnitt 2...
  </AccordionItem>
</Accordion>
```

### Accordion mit Screenreader-Beschreibung

```tsx
<Accordion>
  <AccordionItem 
    id="section1" 
    title="Abschnitt 1"
    description="Dieser Abschnitt enthält wichtige Informationen"
  >
    Inhalt von Abschnitt 1...
  </AccordionItem>
</Accordion>
```

## Internationalisierung

Die Accordion-Komponente unterstützt Internationalisierung durch das `i18n`-Prop:

```tsx
<Accordion
  i18n={{
    expand: "Erweitern",
    collapse: "Einklappen"
  }}
>
  {/* ... */}
</Accordion>
```

## Best Practices

1. **Aussagekräftige Titel**: Verwenden Sie klare und präzise Titel für die Panels
2. **Konsistente Reihenfolge**: Halten Sie die Reihenfolge der Panels logisch und konsistent
3. **Visuelle Unterscheidung**: Stellen Sie sicher, dass geöffnete Panels visuell deutlich erkennbar sind
4. **Tastaturzugänglichkeit**: Testen Sie die Komponente mit der Tastatur
5. **Screenreader-Unterstützung**: Stellen Sie sicher, dass die Komponente mit Screenreadern zugänglich ist
6. **Responsive Design**: Stellen Sie sicher, dass das Accordion auf allen Bildschirmgrößen gut funktioniert

## Bekannte Einschränkungen

1. **Verschachtelte Accordions**: Können zu Verwirrung bei der Tastaturnavigation führen
2. **Zu viele Panels**: Können die Benutzerfreundlichkeit beeinträchtigen
3. **Dynamische Panels**: Änderungen in der Panel-Anzahl können zu Problemen mit dem Fokus führen

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [MDN Web Docs: ARIA: button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)
- [MDN Web Docs: ARIA: region role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role)