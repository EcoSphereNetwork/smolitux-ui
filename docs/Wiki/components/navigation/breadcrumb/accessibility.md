# Breadcrumb-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Breadcrumb-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Breadcrumb-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Navigation-Container
- `aria-label="Breadcrumb"`: Beschreibt den Zweck der Navigation

### Aktuelle Seite
- `aria-current="page"`: Kennzeichnet das aktuelle Element in der Breadcrumb-Navigation

### Icons und Separatoren
- `aria-hidden="true"`: Versteckt dekorative Elemente vor Screenreadern

## Strukturierte Daten (Schema.org)

Die Breadcrumb-Komponente implementiert das [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList) Markup für eine bessere Suchmaschinenoptimierung:

- `itemScope` und `itemType="https://schema.org/BreadcrumbList"` auf dem `<ol>`-Element
- `itemProp="itemListElement"`, `itemScope` und `itemType="https://schema.org/ListItem"` auf jedem `<li>`-Element
- `itemProp="item"` auf jedem Link oder Span
- `itemProp="name"` auf dem Text-Wrapper
- `itemProp="position"` mit dem Index als Inhalt

## Tastaturnavigation

Die Breadcrumb-Komponente unterstützt folgende Tastaturinteraktionen:

- **Tab**: Navigiert durch die Links in der Breadcrumb-Navigation
- **Enter**: Aktiviert den fokussierten Link

## Beispiele für barrierefreie Verwendung

### Standard-Breadcrumb

```tsx
<Breadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', active: true }
  ]}
/>
```

### Breadcrumb mit Home-Icon

```tsx
<Breadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', active: true }
  ]}
  showHomeIcon
/>
```

### Breadcrumb mit benutzerdefiniertem Separator

```tsx
<Breadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', active: true }
  ]}
  separator=">"
/>
```

### Breadcrumb mit Komponenten

```tsx
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Produkte</BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>Kategorie</BreadcrumbItem>
</Breadcrumb>
```

## Best Practices

1. **Konsistente Platzierung**: Platzieren Sie die Breadcrumb-Navigation immer an der gleichen Stelle auf allen Seiten
2. **Klare Hierarchie**: Stellen Sie sicher, dass die Breadcrumb-Navigation die Seitenhierarchie korrekt widerspiegelt
3. **Aktuelle Seite markieren**: Markieren Sie immer die aktuelle Seite mit `active: true` oder `isCurrentPage`
4. **Kurze Labels**: Verwenden Sie kurze, prägnante Labels für die Breadcrumb-Elemente
5. **Home-Link**: Beginnen Sie die Breadcrumb-Navigation immer mit einem Link zur Startseite

## Bekannte Einschränkungen

1. **Lange Breadcrumbs**: Sehr lange Breadcrumbs können auf kleinen Bildschirmen schwer zu bedienen sein
2. **Dynamische Breadcrumbs**: Dynamisch generierte Breadcrumbs können für Screenreader-Benutzer verwirrend sein, wenn sie sich unerwartet ändern

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
- [MDN Web Docs: ARIA: navigation role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role)
- [Schema.org: BreadcrumbList](https://schema.org/BreadcrumbList)