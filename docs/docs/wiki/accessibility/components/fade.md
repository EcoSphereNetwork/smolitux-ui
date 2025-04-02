# Fade Barrierefreiheit

## Implementierte Verbesserungen

Die Fade-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `aria-live` - Informiert Screenreader über Änderungen im Inhalt
- `aria-atomic` - Gibt an, ob der gesamte Inhalt oder nur Änderungen angekündigt werden sollen
- `aria-relevant` - Gibt an, welche Arten von Änderungen angekündigt werden sollen
- `aria-busy` - Zeigt an, dass sich der Inhalt gerade ändert
- `aria-describedby` - Verknüpft eine Beschreibung der Animation mit dem Element

### Reduzierte Bewegung

- Respektiert die Einstellung `prefers-reduced-motion` des Benutzers
- Deaktiviert Animationen, wenn der Benutzer reduzierte Bewegung bevorzugt
- Bietet eine Option, um Animationen manuell zu deaktivieren

### Screenreader-Unterstützung

- Beschreibende Texte für Animationen
- Versteckte Hilfstexte mit `sr-only`-Klassen
- Ankündigungen von Status-Änderungen

## Beispiel-Implementierung

```tsx
<Fade 
  in={isVisible} 
  aria-label="Inhalt" 
  animationDescription="Inhalt wird ein- oder ausgeblendet"
  respectReducedMotion={true}
>
  <div>Inhalt, der ein- und ausgeblendet wird</div>
</Fade>
```

## Barrierefreiheitstests

Die Fade-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
3. **Reduzierte-Bewegung-Tests** zur Sicherstellung, dass Animationen deaktiviert werden können

## Bekannte Einschränkungen

- Einige ältere Screenreader können Probleme mit dynamischen Inhalten haben
- Die Erkennung von `prefers-reduced-motion` funktioniert nur im Browser, nicht bei serverseitigem Rendering