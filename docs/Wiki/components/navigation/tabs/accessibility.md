# Tabs-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Tabs-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Tabs-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### TabList
- `role="tablist"`: Identifiziert die Gruppe von Tabs
- `aria-orientation="horizontal"` oder `aria-orientation="vertical"`: Gibt die Orientierung der Tabs an

### Tab
- `role="tab"`: Identifiziert ein Tab-Element
- `aria-selected="true|false"`: Gibt an, ob das Tab ausgewählt ist
- `aria-disabled="true|false"`: Gibt an, ob das Tab deaktiviert ist
- `aria-controls="PANEL_ID"`: Verweist auf die ID des zugehörigen Panels
- `id="TAB_ID"`: Eindeutige ID für das Tab

### TabPanel
- `role="tabpanel"`: Identifiziert ein Panel-Element
- `aria-hidden="true|false"`: Gibt an, ob das Panel sichtbar ist
- `aria-labelledby="TAB_ID"`: Verweist auf die ID des zugehörigen Tabs
- `id="PANEL_ID"`: Eindeutige ID für das Panel

## Tastaturnavigation

Die Tabs-Komponente unterstützt folgende Tastaturinteraktionen:

### Horizontale Tabs
- **Tab**: Fokussiert das aktive Tab und dann die weiteren fokussierbaren Elemente
- **Shift+Tab**: Navigiert rückwärts durch fokussierbare Elemente
- **Pfeil rechts**: Bewegt den Fokus zum nächsten Tab
- **Pfeil links**: Bewegt den Fokus zum vorherigen Tab
- **Home**: Bewegt den Fokus zum ersten Tab
- **End**: Bewegt den Fokus zum letzten Tab
- **Enter/Space**: Aktiviert das fokussierte Tab

### Vertikale Tabs
- **Tab**: Fokussiert das aktive Tab und dann die weiteren fokussierbaren Elemente
- **Shift+Tab**: Navigiert rückwärts durch fokussierbare Elemente
- **Pfeil unten**: Bewegt den Fokus zum nächsten Tab
- **Pfeil oben**: Bewegt den Fokus zum vorherigen Tab
- **Home**: Bewegt den Fokus zum ersten Tab
- **End**: Bewegt den Fokus zum letzten Tab
- **Enter/Space**: Aktiviert das fokussierte Tab

## Fokus-Management

Die Tabs-Komponente implementiert folgende Fokus-Management-Strategien:

1. **Fokus-Falle**: Der Fokus bleibt innerhalb der Tabs, wenn mit Pfeiltasten navigiert wird
2. **Initialer Fokus**: Der Fokus wird automatisch auf das aktive Tab gesetzt
3. **Fokus-Wiederherstellung**: Der Fokus kehrt zum aktiven Tab zurück, wenn ein neues Tab ausgewählt wird

## Beispiele für barrierefreie Verwendung

### Standard-Tabs

```tsx
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt 1</TabPanel>
    <TabPanel>Inhalt 2</TabPanel>
    <TabPanel>Inhalt 3</TabPanel>
  </TabPanels>
</Tabs>
```

### Vertikale Tabs

```tsx
<Tabs orientation="vertical">
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt 1</TabPanel>
    <TabPanel>Inhalt 2</TabPanel>
    <TabPanel>Inhalt 3</TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit Icons

```tsx
<Tabs>
  <TabList>
    <Tab leftIcon={<HomeIcon />}>Home</Tab>
    <Tab leftIcon={<SettingsIcon />}>Einstellungen</Tab>
    <Tab leftIcon={<ProfileIcon />}>Profil</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Home-Inhalt</TabPanel>
    <TabPanel>Einstellungen-Inhalt</TabPanel>
    <TabPanel>Profil-Inhalt</TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit deaktiviertem Tab

```tsx
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab isDisabled>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt 1</TabPanel>
    <TabPanel>Inhalt 2</TabPanel>
    <TabPanel>Inhalt 3</TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit manueller Aktivierung

```tsx
<Tabs isManual>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt 1</TabPanel>
    <TabPanel>Inhalt 2</TabPanel>
    <TabPanel>Inhalt 3</TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit Lazy-Loading

```tsx
<Tabs isLazy>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt 1</TabPanel>
    <TabPanel>Inhalt 2</TabPanel>
    <TabPanel>Inhalt 3</TabPanel>
  </TabPanels>
</Tabs>
```

## Internationalisierung

Die Tabs-Komponente unterstützt Internationalisierung durch das `i18n`-Prop:

```tsx
<Tabs
  i18n={{
    tabSelected: "Tab ausgewählt",
    tabDisabled: "Tab deaktiviert"
  }}
>
  {/* ... */}
</Tabs>
```

## Best Practices

1. **Aussagekräftige Tab-Beschriftungen**: Verwenden Sie klare und präzise Beschriftungen für Tabs
2. **Konsistente Reihenfolge**: Halten Sie die Reihenfolge der Tabs konsistent
3. **Visuelle Unterscheidung**: Stellen Sie sicher, dass aktive Tabs visuell deutlich hervorgehoben sind
4. **Tastaturzugänglichkeit**: Testen Sie die Komponente mit der Tastatur
5. **Screenreader-Unterstützung**: Stellen Sie sicher, dass die Komponente mit Screenreadern zugänglich ist
6. **Responsive Design**: Stellen Sie sicher, dass die Tabs auf allen Bildschirmgrößen gut funktionieren

## Bekannte Einschränkungen

1. **Verschachtelte Tabs**: Können zu Verwirrung bei der Tastaturnavigation führen
2. **Zu viele Tabs**: Können die Benutzerfreundlichkeit beeinträchtigen
3. **Dynamische Tabs**: Änderungen in der Tab-Anzahl können zu Problemen mit dem Fokus führen

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [MDN Web Docs: ARIA: tab role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role)
- [MDN Web Docs: ARIA: tabpanel role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tabpanel_role)