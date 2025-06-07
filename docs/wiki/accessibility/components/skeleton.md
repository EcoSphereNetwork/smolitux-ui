# Skeleton Barrierefreiheit

## Implementierte Verbesserungen

Die Skeleton-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="status"` - Definiert das Element als Statusanzeige
- `aria-label` - Bietet eine Beschreibung des Skeletons
- `aria-busy` - Zeigt an, ob der Skeleton aktiv ist
- `aria-live` - Definiert, wie der Skeleton von Screenreadern angekündigt wird
- `aria-atomic` - Sorgt dafür, dass der gesamte Inhalt des Elements angekündigt wird
- `aria-relevant` - Definiert, welche Änderungen angekündigt werden sollen
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Skeleton
- `aria-hidden="true"` - Versteckt die visuellen Skeleton-Elemente vor Screenreadern

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Live-Regionen für Statusänderungen
- Korrekte Ankündigung von Ladezuständen
- Unterstützung für verschiedene Dringlichkeitsstufen (polite/assertive)
- Unterstützung für verschiedene Relevanztypen (additions/removals/text/all)

### Zusätzliche Funktionen

- Benutzerdefinierte Labels für den Skeleton
- Benutzerdefinierte Beschreibungen für Screenreader
- Unterstützung für verschiedene Varianten (text, circular, rectangular, rounded)
- Unterstützung für verschiedene Animationen (pulse, wave, none)
- Unterstützung für geladene Inhalte mit nahtlosem Übergang

## Beispiel-Implementierung

```tsx
<SkeletonA11y 
  ariaLabel="Lädt Text" 
  description="Bitte warten Sie, während der Text geladen wird"
  variant="text"
  width={200}
  height={20}
/>

<SkeletonA11y 
  ariaLabel="Lädt Profilbild" 
  variant="circular"
  animation="pulse"
  width={50}
  height={50}
/>

<SkeletonA11y 
  ariaLabel="Lädt Artikel" 
  count={3}
  gap={16}
  isLoaded={isLoaded}
  hideWhenLoaded
>
  <ArticleContent />
</SkeletonA11y>
```

## Barrierefreiheitstests

Die Skeleton-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
3. **Visuelle Tests** zur Überprüfung der Farbkontraste und Größen

## Bekannte Einschränkungen

- Animierte Elemente können bei einigen Nutzern mit vestibulären Störungen Probleme verursachen
- Bei sehr schnellen Statusänderungen können Screenreader möglicherweise nicht alle Änderungen ankündigen
- Die Komponente unterstützt derzeit keine Anpassung der Animation für Nutzer, die reduzierte Bewegung bevorzugen
- Die Komponente unterstützt derzeit keine komplexen Layouts für Skeleton-Strukturen