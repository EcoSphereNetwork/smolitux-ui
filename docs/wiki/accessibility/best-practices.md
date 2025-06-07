# Best Practices für barrierefreie Komponenten

Diese Richtlinien zeigen, wie Smolitux UI Komponenten zugänglich implementiert werden. Sie basieren auf den WCAG 2.1 AA-Standards.

## Struktur und Semantik

- Nutze semantische HTML-Elemente und verwende ARIA nur, wenn nötig.
- Beschrifte interaktive Elemente mit `aria-label`, `aria-labelledby` oder sichtbarem Text.
- Vermeide es, Informationen ausschließlich über Farbe zu vermitteln.

## Tastaturbedienung

- Alle interaktiven Komponenten müssen per Tastatur bedienbar sein.
- Die Tab-Reihenfolge und Fokusindikatoren sollen nachvollziehbar sein.
- Komplexe Widgets brauchen Fokus-Management und `Escape` zum Schließen.

## Screenreader-Unterstützung

- Verwende `aria-live` und `aria-busy` für Statusänderungen.
- Nutze `aria-roledescription` für komplexe Widgets.
- Nutze versteckte Inhalte nur für Screenreader (`sr-only`).

## Bewegung und Animation

- Respektiere `prefers-reduced-motion` und biete Alternativen ohne Animation.
- Animationen dürfen nicht von Inhalt oder Bedienung ablenken.

## Beispiele

```tsx
<Button aria-label="Menü öffnen" onClick={openMenu}>
  <MenuIcon />
</Button>

<Modal isOpen={isOpen} onClose={close} initialFocusRef={closeButtonRef}>
  <button ref={closeButtonRef} onClick={close}>Schließen</button>
</Modal>
```

Weitere Informationen findest du in den [Barrierefreiheits-Richtlinien](../guidelines/accessibility.md) und in den komponentenspezifischen Dokumenten.
