# Internationalisierung (i18n)

Die Smolitux UI Bibliothek bietet ein umfassendes Internationalisierungssystem, das die Erstellung mehrsprachiger Anwendungen erleichtert.

## Überblick

Das i18n-System besteht aus mehreren Komponenten:

- **I18nProvider**: Ein Provider für die Übersetzungsressourcen und die aktuelle Sprache
- **Hooks**: `useTranslation` und `useI18n` für den Zugriff auf Übersetzungen und i18n-Funktionen
- **Komponenten**: `LanguageSwitcher` für die einfache Sprachumschaltung
- **Übersetzungsressourcen**: Vorgefertigte Übersetzungen für allgemeine Texte, Komponenten und Validierungsmeldungen

## Unterstützte Sprachen

Das System unterstützt standardmäßig die folgenden Sprachen:

- Deutsch (DE) - Standardsprache
- Englisch (EN)
- Französisch (FR)
- Spanisch (ES)
- Italienisch (IT)

## Grundlegende Verwendung

### Einrichtung des I18nProvider

```tsx
import { I18nProvider } from '@smolitux/core';

function App() {
  return (
    <I18nProvider defaultLanguage="de">
      <YourApp />
    </I18nProvider>
  );
}
```

### Verwendung von Übersetzungen

```tsx
import { useTranslation } from '@smolitux/core';

function WelcomeMessage() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.message', { name: 'Max' })}</p>
    </div>
  );
}
```

### Sprachumschaltung

```tsx
import { LanguageSwitcher } from '@smolitux/core';

function Header() {
  return (
    <header>
      <nav>{/* ... */}</nav>
      <LanguageSwitcher />
    </header>
  );
}
```

## Erweiterte Funktionen

### Benutzerdefinierte Übersetzungsressourcen

Sie können eigene Übersetzungsressourcen hinzufügen:

```tsx
import { I18nProvider } from '@smolitux/core';

const customResources = {
  de: {
    myApp: {
      greeting: 'Hallo, {{name}}!',
      farewell: 'Auf Wiedersehen, {{name}}!'
    }
  },
  en: {
    myApp: {
      greeting: 'Hello, {{name}}!',
      farewell: 'Goodbye, {{name}}!'
    }
  }
};

function App() {
  return (
    <I18nProvider 
      defaultLanguage="de"
      resources={customResources}
    >
      <YourApp />
    </I18nProvider>
  );
}
```

### Zugriff auf i18n-Funktionen

Mit dem `useI18n` Hook können Sie auf alle i18n-Funktionen zugreifen:

```tsx
import { useI18n } from '@smolitux/core';

function LanguageControls() {
  const { 
    language,          // Aktuelle Sprache
    changeLanguage,    // Funktion zum Ändern der Sprache
    t,                 // Übersetzungsfunktion
    availableLanguages // Liste der verfügbaren Sprachen
  } = useI18n();
  
  return (
    <div>
      <p>{t('currentLanguage')}: {language}</p>
      
      <div>
        {availableLanguages.map(lang => (
          <button 
            key={lang}
            onClick={() => changeLanguage(lang)}
            disabled={lang === language}
          >
            {t(`languages.${lang}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Formatierung von Daten

Das i18n-System unterstützt auch die Formatierung von Daten wie Zahlen, Währungen und Datumsangaben:

```tsx
import { useI18n } from '@smolitux/core';

function PriceDisplay({ price, date }) {
  const { formatNumber, formatDate } = useI18n();
  
  return (
    <div>
      <p>Preis: {formatNumber(price, { style: 'currency', currency: 'EUR' })}</p>
      <p>Datum: {formatDate(date, { dateStyle: 'full' })}</p>
    </div>
  );
}
```

### Pluralisierung

Das System unterstützt auch Pluralisierung:

```tsx
import { useTranslation } from '@smolitux/core';

function ItemCount({ count }) {
  const t = useTranslation();
  
  return (
    <p>
      {t('items.count', { count, defaultValue_plural: '{{count}} Artikel', defaultValue: '{{count}} Artikel' })}
    </p>
  );
}
```

## Integration mit Komponenten

Alle Smolitux UI Komponenten sind bereits für die Internationalisierung vorbereitet:

```tsx
import { Button, Modal, useTranslation } from '@smolitux/core';

function ConfirmDialog({ isOpen, onClose, onConfirm }) {
  const t = useTranslation();
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={t('confirm.title')}
    >
      <p>{t('confirm.message')}</p>
      
      <div>
        <Button onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button onClick={onConfirm} variant="primary">
          {t('common.confirm')}
        </Button>
      </div>
    </Modal>
  );
}
```

## Sprachspezifische Formatierung

Das System berücksichtigt automatisch sprachspezifische Formatierungen:

```tsx
import { useI18n } from '@smolitux/core';

function NumberFormatExample() {
  const { formatNumber, language } = useI18n();
  const number = 1234567.89;
  
  // Wird je nach Sprache unterschiedlich formatiert:
  // DE: 1.234.567,89
  // EN: 1,234,567.89
  // FR: 1 234 567,89
  return <p>{formatNumber(number)}</p>;
}
```

## Sprachdetektierung

Das System kann die bevorzugte Sprache des Benutzers automatisch erkennen:

```tsx
import { I18nProvider } from '@smolitux/core';

function App() {
  return (
    <I18nProvider 
      defaultLanguage="de"
      detectBrowserLanguage={true}
    >
      <YourApp />
    </I18nProvider>
  );
}
```

## Namespaces

Sie können Übersetzungen in Namespaces organisieren:

```tsx
import { useTranslation } from '@smolitux/core';

function AdminPanel() {
  // Lädt Übersetzungen aus dem 'admin' Namespace
  const t = useTranslation('admin');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## Zusammenfassung

Das Internationalisierungssystem der Smolitux UI Bibliothek bietet:

- Einfache und flexible API für mehrsprachige Anwendungen
- Unterstützung für mehrere Sprachen (DE, EN, FR, ES, IT)
- Formatierung von Zahlen, Währungen und Datumsangaben
- Pluralisierung und Interpolation
- Integration mit Smolitux UI Komponenten
- Automatische Sprachdetektierung
- Namespace-Unterstützung für die Organisation von Übersetzungen