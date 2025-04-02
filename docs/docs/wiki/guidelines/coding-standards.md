# Coding Standards

Diese Dokumentation beschreibt die Coding Standards für die Smolitux-UI-Bibliothek.

## Allgemeine Richtlinien

1. **Lesbarkeit**: Schreiben Sie lesbaren und selbsterklärenden Code.
2. **Einfachheit**: Halten Sie den Code so einfach wie möglich.
3. **Konsistenz**: Folgen Sie konsistenten Mustern und Konventionen.
4. **Modularität**: Schreiben Sie modularen und wiederverwendbaren Code.
5. **Testbarkeit**: Schreiben Sie testbaren Code.

## Formatierung

1. **Einrückung**: Verwenden Sie 2 Leerzeichen für die Einrückung.
2. **Zeilenumbrüche**: Begrenzen Sie Zeilen auf 100 Zeichen.
3. **Klammern**: Öffnende Klammern stehen am Ende der Zeile, schließende Klammern stehen in einer eigenen Zeile.
4. **Leerzeichen**: Verwenden Sie Leerzeichen um Operatoren und nach Kommas.
5. **Semikolons**: Verwenden Sie Semikolons am Ende jeder Anweisung.

```tsx
// Gut
function example(param1, param2) {
  const result = param1 + param2;
  return result;
}

// Schlecht
function example ( param1,param2 ){
const result=param1+param2
return result
}
```

## Benennung

1. **Variablen und Funktionen**: Verwenden Sie camelCase für Variablen und Funktionen.
2. **Komponenten**: Verwenden Sie PascalCase für Komponenten.
3. **Konstanten**: Verwenden Sie UPPER_SNAKE_CASE für Konstanten.
4. **Typen und Interfaces**: Verwenden Sie PascalCase für Typen und Interfaces.
5. **Dateien**: Verwenden Sie PascalCase für Komponentendateien und camelCase für andere Dateien.

```tsx
// Variablen und Funktionen
const userName = 'John';
function calculateTotal() { ... }

// Komponenten
const UserProfile = () => { ... };

// Konstanten
const MAX_ITEMS = 10;

// Typen und Interfaces
interface UserData { ... }
type ButtonVariant = 'primary' | 'secondary';
```

## TypeScript

1. **Typen**: Definieren Sie explizite Typen für alle Variablen, Parameter und Rückgabewerte.
2. **Interfaces**: Verwenden Sie Interfaces für Objekte und Props.
3. **Generics**: Verwenden Sie Generics für wiederverwendbare Typen.
4. **Enums**: Vermeiden Sie Enums, verwenden Sie stattdessen Union Types.
5. **any**: Vermeiden Sie den Typ `any`, verwenden Sie stattdessen `unknown` oder spezifische Typen.

```tsx
// Gut
interface User {
  id: string;
  name: string;
  age: number;
}

function getUser(id: string): User | null {
  // ...
}

// Schlecht
function getUser(id): any {
  // ...
}
```

## React

1. **Funktionale Komponenten**: Verwenden Sie funktionale Komponenten mit Hooks.
2. **Props**: Definieren Sie Props-Interfaces für alle Komponenten.
3. **Hooks**: Folgen Sie den Regeln für Hooks.
4. **Memoization**: Verwenden Sie `useMemo` und `useCallback` für teure Berechnungen und Callbacks.
5. **Rendering**: Vermeiden Sie unnötige Renderings.

```tsx
// Gut
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Schlecht
const Button = (props) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.label}
    </button>
  );
};
```

## Kommentare

1. **JSDoc**: Verwenden Sie JSDoc-Kommentare für Komponenten, Funktionen und Typen.
2. **Inline-Kommentare**: Verwenden Sie Inline-Kommentare für komplexe Logik.
3. **TODO-Kommentare**: Markieren Sie unvollständigen Code mit TODO-Kommentaren.
4. **Vermeiden**: Vermeiden Sie offensichtliche Kommentare.
5. **Aktualisieren**: Halten Sie Kommentare aktuell.

```tsx
/**
 * Button-Komponente für Aktionen.
 * @param {ButtonProps} props - Die Props für die Button-Komponente.
 * @returns {JSX.Element} Die Button-Komponente.
 */
const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  // Komplexe Logik, die einen Kommentar benötigt
  const handleClick = useCallback(() => {
    // TODO: Implementieren Sie Tracking
    onClick();
  }, [onClick]);

  return (
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

## Fehlerbehandlung

1. **Try-Catch**: Verwenden Sie try-catch-Blöcke für fehleranfällige Operationen.
2. **Error-Boundaries**: Verwenden Sie Error-Boundaries für React-Komponenten.
3. **Fehlertypen**: Definieren Sie spezifische Fehlertypen.
4. **Logging**: Loggen Sie Fehler mit ausreichend Kontext.
5. **Benutzerfreundlichkeit**: Zeigen Sie benutzerfreundliche Fehlermeldungen an.

```tsx
try {
  const data = await fetchData();
  processData(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
  showErrorMessage('Failed to load data. Please try again later.');
}
```

## Imports

1. **Gruppierung**: Gruppieren Sie Imports nach Typ.
2. **Sortierung**: Sortieren Sie Imports alphabetisch innerhalb jeder Gruppe.
3. **Aliase**: Vermeiden Sie Import-Aliase, es sei denn, sie sind notwendig.
4. **Pfade**: Verwenden Sie relative Pfade für lokale Imports und absolute Pfade für Pakete.
5. **Destrukturierung**: Verwenden Sie Destrukturierung für spezifische Imports.

```tsx
// Externe Pakete
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

// Interne Module
import { Button } from '@smolitux/utils/src/components/patterns';
import { Box, Flex, Text } from '@smolitux/utils/src/components/primitives';

// Lokale Imports
import { formatDate } from '../../utils/formatters';
import { validateInput } from '../../utils/validators';
```

## Tests

1. **Testabdeckung**: Streben Sie eine hohe Testabdeckung an.
2. **Isolation**: Testen Sie Komponenten isoliert.
3. **Mocking**: Mocken Sie externe Abhängigkeiten.
4. **Assertions**: Verwenden Sie aussagekräftige Assertions.
5. **Beschreibungen**: Schreiben Sie klare Test-Beschreibungen.

```tsx
describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button label="Click me" onClick={onClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

## Performance

1. **Memoization**: Verwenden Sie `useMemo` und `useCallback` für teure Berechnungen und Callbacks.
2. **Virtualisierung**: Verwenden Sie Virtualisierung für lange Listen.
3. **Code-Splitting**: Verwenden Sie Code-Splitting für große Komponenten.
4. **Lazy-Loading**: Verwenden Sie Lazy-Loading für Komponenten, die nicht sofort benötigt werden.
5. **Optimierung**: Optimieren Sie Renderings mit `React.memo` und `shouldComponentUpdate`.

```tsx
// Memoization
const expensiveCalculation = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Virtualisierung
import { VirtualList } from 'react-virtualized';

const List = ({ items }) => {
  return (
    <VirtualList
      width={500}
      height={500}
      rowCount={items.length}
      rowHeight={50}
      rowRenderer={({ index, key, style }) => (
        <div key={key} style={style}>
          {items[index]}
        </div>
      )}
    />
  );
};

// Code-Splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
};
```

## Sicherheit

1. **XSS**: Vermeiden Sie XSS-Angriffe durch Escaping von Benutzereingaben.
2. **CSRF**: Schützen Sie vor CSRF-Angriffen.
3. **Abhängigkeiten**: Halten Sie Abhängigkeiten aktuell.
4. **Secrets**: Speichern Sie keine Secrets im Client-Code.
5. **Validierung**: Validieren Sie Benutzereingaben sowohl im Client als auch im Server.

```tsx
// Gut
const UserContent = ({ content }) => {
  return <div>{content}</div>; // React escaped automatisch
};

// Schlecht
const UserContent = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />; // Gefährlich!
};
```

## Barrierefreiheit

1. **Semantik**: Verwenden Sie semantische HTML-Elemente.
2. **ARIA**: Verwenden Sie ARIA-Attribute, wenn semantisches HTML nicht ausreicht.
3. **Keyboard**: Stellen Sie sicher, dass alle Interaktionen mit der Tastatur möglich sind.
4. **Kontrast**: Stellen Sie sicher, dass der Kontrast ausreichend ist.
5. **Screenreader**: Testen Sie mit Screenreadern.

```tsx
// Gut
<button onClick={handleClick} aria-label="Close dialog">
  <span aria-hidden="true">&times;</span>
</button>

// Schlecht
<div onClick={handleClick}>&times;</div>
```

## Internationalisierung

1. **Strings**: Externalisieren Sie alle Strings für Übersetzungen.
2. **Formatierung**: Verwenden Sie lokalisierte Formatierung für Datum, Zeit und Zahlen.
3. **Richtung**: Unterstützen Sie bidirektionalen Text.
4. **Pluralisierung**: Verwenden Sie Pluralisierungsregeln.
5. **Kontextualisierung**: Geben Sie Kontext für Übersetzungen an.

```tsx
// Gut
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation();
  return <h1>{t('welcome.title')}</h1>;
};

// Schlecht
const Welcome = () => {
  return <h1>Welcome to our app</h1>;
};
```

## Versionierung

1. **Semantic Versioning**: Folgen Sie Semantic Versioning (MAJOR.MINOR.PATCH).
2. **Changelog**: Führen Sie ein Changelog.
3. **Breaking Changes**: Dokumentieren Sie Breaking Changes.
4. **Deprecation**: Markieren Sie veraltete Funktionen als veraltet.
5. **Migration**: Stellen Sie Migrationsleitfäden bereit.

```tsx
// Veraltet
/**
 * @deprecated Verwenden Sie stattdessen NewComponent.
 */
export const OldComponent = () => {
  return <div>Old Component</div>;
};
```

## Dokumentation

1. **README**: Stellen Sie eine README-Datei bereit.
2. **JSDoc**: Dokumentieren Sie Komponenten, Funktionen und Typen mit JSDoc.
3. **Beispiele**: Geben Sie Beispiele für die Verwendung.
4. **Storybook**: Erstellen Sie Storybook-Geschichten für Komponenten.
5. **API-Referenz**: Stellen Sie eine API-Referenz bereit.

```tsx
/**
 * Button-Komponente für Aktionen.
 * 
 * @example
 * ```tsx
 * <Button label="Click me" onClick={() => console.log('Clicked')} />
 * ```
 * 
 * @param {ButtonProps} props - Die Props für die Button-Komponente.
 * @returns {JSX.Element} Die Button-Komponente.
 */
export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  // ...
};
```