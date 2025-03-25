# Barrierefreiheit (Accessibility)

Diese Seite enthält Richtlinien und Best Practices für die Erstellung barrierefreier Benutzeroberflächen mit Smolitux UI.

## Warum Barrierefreiheit wichtig ist

Barrierefreiheit (Accessibility, oft als a11y abgekürzt) stellt sicher, dass Anwendungen für alle Benutzer zugänglich sind, einschließlich Personen mit Behinderungen. Eine barrierefreie Anwendung bietet:

- **Inklusion**: Ermöglicht allen Benutzern die Nutzung Ihrer Anwendung
- **Bessere Benutzererfahrung**: Verbessert die Benutzererfahrung für alle, nicht nur für Personen mit Behinderungen
- **Rechtliche Konformität**: Erfüllt gesetzliche Anforderungen in vielen Ländern
- **SEO-Vorteile**: Verbessert die Suchmaschinenoptimierung

## WCAG-Richtlinien

Die Web Content Accessibility Guidelines (WCAG) definieren, wie Webinhalte für Menschen mit Behinderungen zugänglicher gemacht werden können. Die Richtlinien basieren auf vier Grundprinzipien:

1. **Wahrnehmbar**: Informationen und Benutzeroberflächen müssen für die Benutzer wahrnehmbar sein
2. **Bedienbar**: Benutzeroberflächen und Navigation müssen bedienbar sein
3. **Verständlich**: Informationen und Bedienung der Benutzeroberfläche müssen verständlich sein
4. **Robust**: Inhalte müssen robust genug sein, um von verschiedenen Benutzeragenten interpretiert werden zu können

## Barrierefreiheit in Smolitux UI

Alle Komponenten in Smolitux UI wurden mit Barrierefreiheit im Fokus entwickelt. Sie unterstützen:

- Tastaturnavigation
- Screenreader-Kompatibilität
- Ausreichende Farbkontraste
- Fokus-Management
- ARIA-Attribute

## Best Practices für barrierefreie Anwendungen

### Semantische HTML-Struktur

Verwenden Sie semantische HTML-Elemente, um die Struktur Ihrer Seite zu definieren.

```jsx
// ✅ Gut: Semantische HTML-Struktur
<header>
  <h1>Seitentitel</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">Über uns</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h2>Artikel-Überschrift</h2>
    <p>Artikel-Inhalt</p>
  </article>
</main>
<footer>
  <p>Copyright © 2025</p>
</footer>

// ❌ Schlecht: Nicht-semantische Struktur
<div class="header">
  <div class="title">Seitentitel</div>
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
    <div class="nav-item"><a href="/about">Über uns</a></div>
  </div>
</div>
<div class="content">
  <div class="article">
    <div class="article-title">Artikel-Überschrift</div>
    <div class="article-content">Artikel-Inhalt</div>
  </div>
</div>
<div class="footer">
  <div>Copyright © 2025</div>
</div>
```

### Tastaturnavigation

Stellen Sie sicher, dass alle interaktiven Elemente mit der Tastatur bedienbar sind.

```jsx
// ✅ Gut: Tastaturzugängliche Komponenten
<Button onClick={handleClick}>Klick mich</Button>

// ❌ Schlecht: Nicht-tastaturzugängliche Elemente
<div onClick={handleClick} style={{ cursor: 'pointer' }}>
  Klick mich
</div>
```

### Fokus-Management

Sorgen Sie für sichtbare Fokus-Indikatoren und logische Fokus-Reihenfolge.

```jsx
// ✅ Gut: Explizites Fokus-Management für Modals
function Modal({ isOpen, onClose, children }) {
  const modalRef = React.useRef(null);
  
  React.useEffect(() => {
    if (isOpen) {
      // Fokus auf das Modal setzen, wenn es geöffnet wird
      modalRef.current?.focus();
      
      // Fokus im Modal halten (Fokus-Falle)
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      {children}
      <Button onClick={onClose}>Schließen</Button>
    </div>
  );
}
```

### ARIA-Attribute

Verwenden Sie ARIA-Attribute, um die Semantik von Elementen zu verbessern, wenn HTML allein nicht ausreicht.

```jsx
// ✅ Gut: Verwendung von ARIA-Attributen
<Tabs>
  <TabList aria-label="Registerkarten">
    <Tab id="tab-1" aria-controls="panel-1">Tab 1</Tab>
    <Tab id="tab-2" aria-controls="panel-2">Tab 2</Tab>
  </TabList>
  <TabPanel id="panel-1" aria-labelledby="tab-1">
    Inhalt von Tab 1
  </TabPanel>
  <TabPanel id="panel-2" aria-labelledby="tab-2">
    Inhalt von Tab 2
  </TabPanel>
</Tabs>

// ❌ Schlecht: Fehlende ARIA-Attribute
<div>
  <div>
    <div onClick={() => setActiveTab(0)}>Tab 1</div>
    <div onClick={() => setActiveTab(1)}>Tab 2</div>
  </div>
  <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
    Inhalt von Tab 1
  </div>
  <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
    Inhalt von Tab 2
  </div>
</div>
```

### Farbkontraste

Stellen Sie sicher, dass Text und interaktive Elemente ausreichenden Kontrast haben.

```jsx
// ✅ Gut: Ausreichender Farbkontrast
<Text color="gray.800" bg="white">
  Dieser Text hat einen guten Kontrast
</Text>

// ❌ Schlecht: Unzureichender Farbkontrast
<Text color="gray.400" bg="gray.200">
  Dieser Text hat einen schlechten Kontrast
</Text>
```

### Alternative Texte für Bilder

Fügen Sie allen Bildern alternative Texte hinzu.

```jsx
// ✅ Gut: Bild mit alternativem Text
<img src="/logo.png" alt="Firmenlogo" />

// ✅ Gut: Dekoratives Bild
<img src="/decoration.png" alt="" role="presentation" />

// ❌ Schlecht: Bild ohne alternativen Text
<img src="/logo.png" />
```

### Formular-Zugänglichkeit

Stellen Sie sicher, dass Formulare für alle Benutzer zugänglich sind.

```jsx
// ✅ Gut: Zugängliches Formular
<form>
  <FormControl id="email" label="E-Mail-Adresse" error={errors.email}>
    <Input
      type="email"
      name="email"
      value={email}
      onChange={handleChange}
      aria-describedby="email-hint"
      required
    />
    <FormHelperText id="email-hint">
      Wir werden Ihre E-Mail niemals weitergeben.
    </FormHelperText>
  </FormControl>
  
  <Button type="submit">Absenden</Button>
</form>

// ❌ Schlecht: Unzugängliches Formular
<form>
  <div>
    <input
      type="email"
      placeholder="E-Mail-Adresse"
      value={email}
      onChange={handleChange}
    />
    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
  </div>
  
  <button>Absenden</button>
</form>
```

### Dynamische Inhalte

Informieren Sie Screenreader über dynamische Änderungen auf der Seite.

```jsx
// ✅ Gut: Benachrichtigung über dynamische Änderungen
function Notification({ message }) {
  return (
    <div role="alert" aria-live="polite">
      {message}
    </div>
  );
}

// ❌ Schlecht: Keine Benachrichtigung über Änderungen
function Notification({ message }) {
  return <div>{message}</div>;
}
```

## Komponenten-spezifische Richtlinien

### Buttons

- Verwenden Sie `<button>` für Aktionen und `<a>` für Links
- Fügen Sie `aria-label` hinzu, wenn der Text nicht ausreichend beschreibend ist
- Stellen Sie sicher, dass Buttons einen sichtbaren Fokus-Zustand haben

```jsx
// ✅ Gut: Zugängliche Buttons
<Button aria-label="Schließen">✕</Button>
<Button isLoading aria-label="Daten werden geladen">Speichern</Button>

// ❌ Schlecht: Unzugängliche Buttons
<div onClick={handleClose}>✕</div>
<Button isLoading>...</Button>
```

### Modals und Dialoge

- Verwenden Sie `aria-modal="true"` und `role="dialog"`
- Setzen Sie den Fokus in das Modal, wenn es geöffnet wird
- Stellen Sie sicher, dass der Fokus im Modal bleibt (Fokus-Falle)
- Ermöglichen Sie das Schließen mit der Escape-Taste

```jsx
// ✅ Gut: Zugängliches Modal
<Modal
  isOpen={isOpen}
  onClose={onClose}
  initialFocusRef={initialFocusRef}
  aria-labelledby="modal-title"
>
  <ModalHeader id="modal-title">Modal-Titel</ModalHeader>
  <ModalBody>Modal-Inhalt</ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>Schließen</Button>
  </ModalFooter>
</Modal>
```

### Formulare

- Verwenden Sie Labels für alle Formularelemente
- Gruppieren Sie zusammengehörige Formularelemente
- Zeigen Sie Validierungsfehler klar an
- Verwenden Sie `aria-describedby` für zusätzliche Beschreibungen

```jsx
// ✅ Gut: Zugängliches Formular
<FormControl id="password" label="Passwort" error={errors.password}>
  <Input
    type="password"
    value={password}
    onChange={handleChange}
    aria-describedby="password-requirements"
  />
  <FormHelperText id="password-requirements">
    Das Passwort muss mindestens 8 Zeichen lang sein und einen Großbuchstaben enthalten.
  </FormHelperText>
</FormControl>
```

### Tabs

- Verwenden Sie die richtige ARIA-Rolle und -Attribute
- Stellen Sie sicher, dass Tabs mit der Tastatur bedienbar sind

```jsx
// ✅ Gut: Zugängliche Tabs
<Tabs>
  <TabList aria-label="Registerkarten">
    <Tab>Profil</Tab>
    <Tab>Einstellungen</Tab>
    <Tab>Benachrichtigungen</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Profilinhalt</TabPanel>
    <TabPanel>Einstellungsinhalt</TabPanel>
    <TabPanel>Benachrichtigungsinhalt</TabPanel>
  </TabPanels>
</Tabs>
```

### Tooltips und Popovers

- Stellen Sie sicher, dass Tooltips mit der Tastatur aktiviert werden können
- Verwenden Sie `aria-describedby` für Tooltips

```jsx
// ✅ Gut: Zugänglicher Tooltip
<Tooltip label="Mehr Informationen">
  <Button aria-label="Hilfe">?</Button>
</Tooltip>
```

## Testen auf Barrierefreiheit

### Manuelle Tests

- Navigieren Sie durch Ihre Anwendung nur mit der Tastatur
- Testen Sie mit einem Screenreader (z.B. NVDA, JAWS, VoiceOver)
- Überprüfen Sie die Farbkontraste
- Zoomen Sie die Seite auf 200%

### Automatisierte Tests

- Verwenden Sie Tools wie axe, Lighthouse oder WAVE
- Integrieren Sie Barrierefreiheitstests in Ihre CI/CD-Pipeline

```jsx
// Beispiel für einen automatisierten Test mit jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyComponent from './MyComponent';

expect.extend(toHaveNoViolations);

test('MyComponent sollte keine Barrierefreiheitsprobleme haben', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Ressourcen

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Web Docs: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Zusammenfassung

Barrierefreiheit ist ein wichtiger Aspekt der Webentwicklung, der allen Benutzern zugute kommt. Durch die Befolgung dieser Richtlinien und die Verwendung der barrierefreien Komponenten von Smolitux UI können Sie sicherstellen, dass Ihre Anwendungen für alle Benutzer zugänglich sind.