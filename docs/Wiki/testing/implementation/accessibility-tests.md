# Barrierefreiheitstests für Smolitux UI Komponenten

Dieser Leitfaden beschreibt die Implementierung von Barrierefreiheitstests (Accessibility Tests) für die Smolitux UI Komponenten, um sicherzustellen, dass alle Komponenten den WCAG 2.1 AA-Standards entsprechen.

## Warum Barrierefreiheitstests?

Barrierefreiheit ist ein wesentlicher Aspekt moderner Webanwendungen. Durch die Implementierung von Barrierefreiheitstests stellen wir sicher, dass:

1. Alle Benutzer, unabhängig von ihren Fähigkeiten, unsere Komponenten nutzen können
2. Wir gesetzliche Anforderungen erfüllen
3. Die Benutzererfahrung für alle verbessert wird
4. SEO-Vorteile erzielt werden

## Testmethoden

### 1. Automatisierte Tests mit jest-axe

Wir verwenden [jest-axe](https://github.com/nickcolley/jest-axe) für automatisierte Barrierefreiheitstests in unseren Jest-Tests.

#### Installation

```bash
npm install --save-dev jest-axe @types/jest-axe
```

#### Beispiel-Implementierung

```tsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations when disabled', async () => {
    const { container } = render(<Button isDisabled>Disabled Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations as icon button with aria-label', async () => {
    const { container } = render(
      <Button isIconButton leftIcon={<span>🔍</span>} aria-label="Search" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 2. Manuelle Tests mit Screenreadern

Automatisierte Tests können nicht alle Barrierefreiheitsprobleme erkennen. Daher sind manuelle Tests mit Screenreadern unerlässlich.

#### Zu testende Screenreader:

- **NVDA** (Windows)
- **VoiceOver** (macOS/iOS)
- **JAWS** (Windows, kommerziell)
- **TalkBack** (Android)

#### Testprozess:

1. Komponente mit Screenreader navigieren
2. Überprüfen, ob alle Informationen korrekt vorgelesen werden
3. Überprüfen, ob alle interaktiven Elemente bedienbar sind
4. Testen mit ausschließlicher Tastaturnavigation

### 3. Tastaturnavigationstests

Alle interaktiven Komponenten müssen vollständig mit der Tastatur bedienbar sein.

#### Zu testende Aspekte:

- **Fokusreihenfolge**: Logische Tab-Reihenfolge
- **Fokus-Sichtbarkeit**: Deutlich sichtbarer Fokusindikator
- **Tastaturaktivierung**: Aktivierung mit Enter/Space
- **Tastaturnavigation**: Für komplexe Komponenten (z.B. Dropdown mit Pfeiltasten)
- **Tastaturfallen**: Keine "Fallen", aus denen man nicht herausnavigieren kann

#### Beispiel-Testfall:

```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Keyboard Navigation', () => {
  it('should be focusable with tab key', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    
    // Prüfen, ob der Button fokussierbar ist
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('should be activatable with Enter key', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByRole('button');
    
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be activatable with Space key', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByRole('button');
    
    button.focus();
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 4. Farbkontrast und visuelle Tests

Wir müssen sicherstellen, dass alle Komponenten ausreichenden Farbkontrast bieten.

#### Tools:

- **Storybook a11y addon**: Automatische Kontrastprüfung
- **Lighthouse**: Für umfassendere Prüfungen
- **WebAIM Color Contrast Checker**: Für manuelle Überprüfungen

#### Zu testende Aspekte:

- Text zu Hintergrund: Mindestens 4.5:1 (AA) oder 7:1 (AAA)
- Große Texte: Mindestens 3:1 (AA)
- UI-Komponenten und grafische Objekte: Mindestens 3:1

## Barrierefreiheits-Checkliste für Komponenten

Für jede Komponente sollten folgende Aspekte überprüft werden:

### Semantik und Struktur
- [ ] Korrekte HTML-Elemente werden verwendet
- [ ] Semantische Struktur ist logisch
- [ ] Überschriften werden korrekt verwendet

### ARIA-Attribute
- [ ] Korrekte ARIA-Rollen werden verwendet
- [ ] ARIA-Attribute werden korrekt gesetzt
- [ ] ARIA-Zustände werden aktualisiert (z.B. aria-expanded, aria-selected)

### Tastaturnavigation
- [ ] Alle interaktiven Elemente sind mit der Tastatur bedienbar
- [ ] Fokusreihenfolge ist logisch
- [ ] Fokusindikator ist deutlich sichtbar
- [ ] Keine Tastaturfallen

### Visuelles Design
- [ ] Ausreichender Farbkontrast
- [ ] Informationen werden nicht nur durch Farbe vermittelt
- [ ] Text ist auf 200% vergrößerbar ohne Funktionsverlust
- [ ] Responsive Design funktioniert bei verschiedenen Viewport-Größen

### Screenreader-Unterstützung
- [ ] Alle Inhalte sind für Screenreader zugänglich
- [ ] Alternative Texte für Bilder und Icons
- [ ] Statusänderungen werden angekündigt
- [ ] Komplexe Komponenten haben klare Anweisungen

## Integration in den Entwicklungsprozess

### 1. Automatisierte Tests in CI/CD

Barrierefreiheitstests sollten in die CI/CD-Pipeline integriert werden:

```yaml
# Beispiel für GitHub Actions
jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Run accessibility tests
        run: npm run test:a11y
```

### 2. Pull-Request-Checkliste

Jeder Pull Request sollte eine Barrierefreiheits-Checkliste enthalten:

```markdown
## Barrierefreiheits-Checkliste
- [ ] Automatisierte Tests bestanden
- [ ] Manuelle Screenreader-Tests durchgeführt
- [ ] Tastaturnavigation getestet
- [ ] Farbkontrast überprüft
- [ ] ARIA-Attribute korrekt implementiert
```

### 3. Dokumentation

Jede Komponente sollte einen Abschnitt zur Barrierefreiheit in ihrer Dokumentation enthalten:

```markdown
## Barrierefreiheit

Die Button-Komponente wurde für optimale Barrierefreiheit entwickelt:

- Verwendet native Button-Elemente für optimale Screenreader-Unterstützung
- Unterstützt Tastaturaktivierung mit Enter und Space
- Bietet sichtbaren Fokusindikator
- Setzt korrekte ARIA-Attribute für verschiedene Zustände
- Erfüllt WCAG 2.1 AA-Kontrastanforderungen
```

## Ressourcen und Tools

- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [Storybook a11y addon](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [NVDA Screenreader](https://www.nvaccess.org/)
- [axe DevTools](https://www.deque.com/axe/)

## Fazit

Die Implementierung umfassender Barrierefreiheitstests ist ein kontinuierlicher Prozess. Durch die Integration dieser Tests in unseren Entwicklungsprozess stellen wir sicher, dass die Smolitux UI Komponenten für alle Benutzer zugänglich sind und den WCAG 2.1 AA-Standards entsprechen.