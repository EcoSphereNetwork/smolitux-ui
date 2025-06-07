# Collapse-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Collapse-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Collapse-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Standard-Attribute
- `role="region"`: Kennzeichnet den Collapse als eigenständigen Inhaltsbereich
- `aria-expanded="true|false"`: Gibt an, ob der Inhalt ausgeklappt ist
- `aria-hidden="true|false"`: Gibt an, ob der Inhalt versteckt ist
- `id="collapse-[unique-id]"`: Eindeutige ID für ARIA-Referenzen

### Optionale Attribute
- `aria-labelledby="ID"`: Verweist auf die ID des Elements, das den Collapse beschreibt (z.B. eine Überschrift)
- `aria-describedby="ID"`: Verweist auf die ID des Elements, das zusätzliche Informationen zum Collapse enthält
- `role="tabpanel"`: Alternative Rolle, wenn der Collapse als Tab-Panel verwendet wird

### Daten-Attribute
- `data-state="entering|entered|exiting|exited"`: Gibt den aktuellen Übergangszustand an
- `data-orientation="vertical|horizontal"`: Gibt die Ausrichtung des Collapse an

## Tastaturnavigation

Die Collapse-Komponente selbst bietet keine direkte Tastaturnavigation, da sie in der Regel durch andere Komponenten (z.B. Buttons, Accordion) gesteuert wird. Die steuernde Komponente sollte folgende Tastaturinteraktionen unterstützen:

- **Tab**: Fokussiert das steuernde Element
- **Enter/Space**: Klappt den Collapse ein oder aus

## Screenreader-Unterstützung

Die Collapse-Komponente bietet folgende Screenreader-Unterstützungen:

- **Zustandsankündigungen**: Der Zustand des Collapse (ausgeklappt/eingeklappt) wird durch `aria-expanded` und `aria-hidden` für Screenreader angekündigt
- **Regionsmarkierung**: Der Collapse wird als eigenständige Region markiert, was die Navigation erleichtert

## Beispiele für barrierefreie Verwendung

### Standard-Collapse

```tsx
<Button 
  onClick={() => setOpen(!open)} 
  aria-expanded={open} 
  aria-controls="collapse-content"
>
  {open ? 'Weniger anzeigen' : 'Mehr anzeigen'}
</Button>

<Collapse 
  in={open}
  ariaProps={{
    id: 'collapse-content',
    'aria-labelledby': 'collapse-header'
  }}
>
  <div>
    <h3 id="collapse-header">Zusätzliche Informationen</h3>
    <p>Hier steht der ausklappbare Inhalt.</p>
  </div>
</Collapse>
```

### Collapse als Tab-Panel

```tsx
<Tabs>
  <TabList>
    <Tab id="tab-1">Tab 1</Tab>
    <Tab id="tab-2">Tab 2</Tab>
  </TabList>
  
  <Collapse 
    in={activeTab === 'tab-1'}
    ariaProps={{
      role: 'tabpanel',
      'aria-labelledby': 'tab-1',
      id: 'panel-1'
    }}
  >
    <div>Inhalt von Tab 1</div>
  </Collapse>
  
  <Collapse 
    in={activeTab === 'tab-2'}
    ariaProps={{
      role: 'tabpanel',
      'aria-labelledby': 'tab-2',
      id: 'panel-2'
    }}
  >
    <div>Inhalt von Tab 2</div>
  </Collapse>
</Tabs>
```

### Collapse mit Beschreibung

```tsx
<Button 
  onClick={() => setOpen(!open)} 
  aria-expanded={open} 
  aria-controls="collapse-content"
>
  Hilfe anzeigen
</Button>

<p id="collapse-description">Klicken Sie auf den Button, um Hilfe anzuzeigen.</p>

<Collapse 
  in={open}
  ariaProps={{
    id: 'collapse-content',
    'aria-describedby': 'collapse-description'
  }}
>
  <div>
    <p>Hier stehen Hilfeinformationen.</p>
  </div>
</Collapse>
```

## Best Practices

1. **Verbindung mit steuerndem Element**: Verbinden Sie den Collapse immer mit dem steuernden Element
   - Verwenden Sie `aria-controls` im steuernden Element, das auf die ID des Collapse verweist
   - Verwenden Sie `aria-expanded` im steuernden Element, um den Zustand anzuzeigen

2. **Beschreibende Labels**: Verwenden Sie beschreibende Labels für den Collapse-Inhalt
   - Verwenden Sie `aria-labelledby`, das auf eine Überschrift im Collapse-Inhalt verweist
   - Oder verwenden Sie `aria-label` direkt im steuernden Element

3. **Konsistente Zustände**: Stellen Sie sicher, dass der Zustand des Collapse konsistent ist
   - Der Wert von `aria-expanded` im steuernden Element sollte mit dem `in`-Prop des Collapse übereinstimmen
   - Der Wert von `aria-hidden` im Collapse sollte das Gegenteil von `in`-Prop sein

4. **Animationen**: Achten Sie darauf, dass Animationen nicht zu schnell oder zu langsam sind
   - Zu schnelle Animationen können verwirrend sein
   - Zu langsame Animationen können frustrierend sein
   - Verwenden Sie `prefers-reduced-motion`, um Animationen zu reduzieren, wenn der Benutzer dies wünscht

5. **Unmount vs. Hidden**: Entscheiden Sie bewusst, ob der Inhalt aus dem DOM entfernt werden soll
   - `unmountOnExit={true}`: Der Inhalt wird aus dem DOM entfernt, wenn er nicht sichtbar ist
   - `unmountOnExit={false}`: Der Inhalt bleibt im DOM, ist aber versteckt

## Bekannte Einschränkungen

1. **Screenreader-Ankündigungen**: Einige Screenreader kündigen den Zustandswechsel möglicherweise nicht sofort an
2. **Tastaturnavigation innerhalb des Collapse**: Wenn der Collapse eingeklappt ist, sind die Elemente darin nicht mit der Tastatur erreichbar
3. **Verschachtelte Collapses**: Bei verschachtelten Collapses kann es zu Verwirrung kommen, wenn die ARIA-Attribute nicht korrekt gesetzt sind

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [MDN Web Docs: ARIA: region role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role)
- [WebAIM: Accessible Accordions](https://webaim.org/techniques/aria/#accordion)