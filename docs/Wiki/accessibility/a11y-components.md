# Barrierefreie Komponenten (A11y)

Die Smolitux UI Bibliothek bietet spezielle barrierefreie Versionen vieler Komponenten, die mit dem Suffix `A11y` gekennzeichnet sind. Diese Komponenten wurden speziell entwickelt, um höchste Barrierefreiheitsstandards zu erfüllen und sind ideal für Anwendungen, die WCAG 2.1 AA oder AAA Konformität anstreben.

## Verfügbare A11y-Komponenten

Die folgenden Komponenten sind in barrierefreien Versionen verfügbar:

| Standard-Komponente | Barrierefreie Version | Status |
|---------------------|------------------------|--------|
| `Button` | `Button.A11y` oder `ButtonA11y` | ✅ Implementiert |
| `Checkbox` | `CheckboxA11y` | ✅ Implementiert |
| `Dropdown` | `DropdownA11y` | ✅ Implementiert |
| `Input` | `InputA11y` | ✅ Implementiert |
| `Modal` | `ModalA11y` | ✅ Implementiert |
| `Select` | `SelectA11y` | ✅ Implementiert |
| `Flex` | `FlexA11y` | ✅ Implementiert |
| `TabView` | `TabViewA11y` | ✅ Implementiert |
| `Zoom` | `ZoomA11y` | ✅ Implementiert |
| `Accordion` | `AccordionA11y` | 🚧 In Entwicklung |
| `Toast` | `ToastA11y` | 🚧 In Entwicklung |
| `Tooltip` | `TooltipA11y` | 🚧 In Entwicklung |

## Gemeinsame Funktionen der A11y-Komponenten

Alle barrierefreien Komponenten bieten folgende Verbesserungen:

### 1. Automatische ID-Generierung

Die Komponenten generieren automatisch eindeutige IDs für ARIA-Attribute, sodass keine manuellen IDs angegeben werden müssen.

```tsx
// Die ID wird automatisch generiert
<InputA11y label="Email" />

// Entspricht etwa:
<label id="email-label-xyz" for="email-input-xyz">Email</label>
<input id="email-input-xyz" aria-labelledby="email-label-xyz" />
```

### 2. Erweiterte ARIA-Attribute

Die Komponenten verwenden umfassende ARIA-Attribute, um Screenreader-Benutzern ein besseres Verständnis der Benutzeroberfläche zu ermöglichen.

```tsx
<ButtonA11y
  isPressed={true}
  controls="panel-1"
  expanded={true}
  hasPopup="dialog"
>
  Einstellungen
</ButtonA11y>
```

### 3. Live-Regionen für Statusänderungen

Viele Komponenten verwenden Live-Regionen, um Statusänderungen für Screenreader anzukündigen.

```tsx
<ModalA11y
  isOpen={isOpen}
  onClose={onClose}
  announceOnOpen={true}
  openAnnouncement="Dialog geöffnet: Bestätigen Sie Ihre Auswahl"
>
  {/* ... */}
</ModalA11y>
```

### 4. Verbessertes Fokus-Management

Die Komponenten bieten erweiterte Fokus-Management-Funktionen:

- Automatischer Fokus auf relevante Elemente
- Rückgabe des Fokus nach dem Schließen
- Fokus-Fallen für modale Dialoge
- Sichtbare Fokus-Indikatoren

```tsx
<ModalA11y
  autoFocus={true}
  initialFocusRef={inputRef}
  returnFocus={true}
  trapFocus={true}
>
  {/* ... */}
</ModalA11y>
```

### 5. Erweiterte Tastaturunterstützung

Alle Komponenten unterstützen umfassende Tastaturnavigation und -interaktion.

## Wann sollten A11y-Komponenten verwendet werden?

Die barrierefreien Komponenten sollten in folgenden Fällen verwendet werden:

1. **Öffentliche Webseiten**: Webseiten, die für die Allgemeinheit zugänglich sind
2. **Regierungswebseiten**: Webseiten, die gesetzlichen Barrierefreiheitsanforderungen unterliegen
3. **Unternehmensanwendungen**: Interne Anwendungen, die von Mitarbeitern mit Behinderungen genutzt werden
4. **Bildungsplattformen**: Lernplattformen, die für alle Studierenden zugänglich sein müssen
5. **Gesundheitsanwendungen**: Anwendungen im Gesundheitswesen, die von Patienten mit verschiedenen Fähigkeiten genutzt werden

## Beispiel: Barrierefreies Formular

```tsx
<form>
  <InputA11y
    label="Email"
    type="email"
    required
    helperText="Wir werden Ihre Email niemals teilen"
  />
  
  <CheckboxA11y
    label="Ich akzeptiere die Nutzungsbedingungen"
    required
    description="Sie müssen die Nutzungsbedingungen akzeptieren, um fortzufahren"
  />
  
  <ButtonA11y
    type="submit"
    variant="primary"
    description="Sendet das Formular ab und erstellt Ihr Konto"
  >
    Konto erstellen
  </ButtonA11y>
</form>
```

## Barrierefreiheitstests

Alle barrierefreien Komponenten wurden mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge
5. **Kontrast-Tests** zur Sicherstellung ausreichender Kontrastverhältnisse

## Migrationshinweise

Wenn Sie von Standard-Komponenten zu barrierefreien Komponenten migrieren möchten, beachten Sie folgende Hinweise:

1. Ersetzen Sie die Komponenten-Namen durch ihre A11y-Äquivalente
2. Überprüfen Sie die Props, da A11y-Komponenten oft zusätzliche Props bieten
3. Entfernen Sie manuelle ARIA-Attribute, die von den A11y-Komponenten automatisch gesetzt werden
4. Nutzen Sie die erweiterten Barrierefreiheitsfunktionen wie Live-Regionen und Fokus-Management

```tsx
// Vorher
<Dropdown>
  <DropdownToggle aria-label="Optionen">Menü</DropdownToggle>
  <DropdownMenu id="dropdown-menu">
    <DropdownItem value="edit">Bearbeiten</DropdownItem>
  </DropdownMenu>
</Dropdown>

// Nachher
<DropdownA11y>
  <DropdownToggleA11y>Menü</DropdownToggleA11y>
  <DropdownMenuA11y>
    <DropdownItemA11y value="edit">Bearbeiten</DropdownItemA11y>
  </DropdownMenuA11y>
</DropdownA11y>
```

## Ressourcen

- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/)
- [Smolitux UI Barrierefreiheits-Testplan](../testing/accessibility-testing.md)