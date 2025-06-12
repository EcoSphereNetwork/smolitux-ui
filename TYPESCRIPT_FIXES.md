# TypeScript-Fehler und Lösungen für Smolitux UI

Dieses Dokument enthält eine Übersicht der TypeScript-Fehler, die in der Smolitux UI-Bibliothek aufgetreten sind, sowie die Lösungsansätze.

## 🔍 Übersicht der deaktivierten Komponenten

Folgende Komponenten wurden vorübergehend deaktiviert, um einen erfolgreichen Build zu ermöglichen:

1. **FormField**: Probleme mit der Typzuweisung für Labels und Refs – *Behoben ✅*
2. **Menu und MenuItem**: Probleme mit Refs und Event-Handlern
3. **MenuDivider und MenuDropdown**: Abhängigkeiten zu Menu-Komponenten
4. **FileUpload**: Probleme mit FormControlContextType
5. **DatePicker**: Probleme mit Refs und booleschen Werten
6. **TimePicker**: Probleme mit Refs und Prop-Typen
7. **Validierungskomponenten**: Probleme mit generischen Typen
8. **Internationalisierungskomponenten**: Probleme mit Kontext-Typen

## 🛠️ Lösungsansätze für häufige Fehler

### 1. Ref-Probleme

**Fehler:**
```
Cannot assign to 'current' because it is a read-only property.
```

**Lösung:**
```typescript
// Falsch
const myRef = useRef<HTMLElement>(null);
myRef.current = node;

// Richtig
const myRef = useRef<HTMLElement | null>(null) as React.MutableRefObject<HTMLElement | null>;
if (node) {
  myRef.current = node;
}
```

### 2. Generische Typen

**Fehler:**
```
Type 'T' is not assignable to type 'unknown'.
```

**Lösung:**
```typescript
// Falsch
function useGeneric<T>(value: T): T {
  const [state, setState] = useState<unknown>(value);
  return state as T;
}

// Richtig
function useGeneric<T>(value: T): T {
  const [state, setState] = useState<T>(value);
  return state;
}
```

### 3. Event-Handler-Typen

**Fehler:**
```
Type '(event: MouseEvent<HTMLLIElement, MouseEvent>) => void' is not assignable to type 'MouseEventHandler<HTMLAnchorElement>'.
```

**Lösung:**
```typescript
// Falsch
const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
  // ...
};

// Richtig
const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  // ...
};
```

### 4. Prop-Typen

**Fehler:**
```
Type 'string | TimeValue | undefined' is not assignable to type 'string | number | readonly string[] | undefined'.
```

**Lösung:**
```typescript
// Falsch
interface Props extends HTMLAttributes<HTMLInputElement> {
  value?: string | CustomType;
}

// Richtig
interface Props {
  value?: string | CustomType;
}
```

### 5. Null-Safety

**Fehler:**
```
Type 'boolean | null' is not assignable to type 'boolean'.
```

**Lösung:**
```typescript
// Falsch
const isValid: boolean = someCondition ? true : null;

// Richtig
const isValid: boolean = someCondition ? true : false;
// oder
const isValid = Boolean(someCondition);
```

## 📋 Prioritätenliste für die Fehlerbehebung

1. **FormField**: Hohe Priorität, da es eine grundlegende Komponente ist
2. **Menu und MenuItem**: Hohe Priorität, da sie für die Navigation wichtig sind
3. **DatePicker und TimePicker**: Mittlere Priorität, komplexe Komponenten
4. **FileUpload**: Mittlere Priorität
5. **Validierungskomponenten**: Hohe Priorität, da sie für Formulare wichtig sind
6. **Internationalisierungskomponenten**: Mittlere Priorität

## 🧪 Teststrategien

Für jede Komponente sollten folgende Tests durchgeführt werden:

1. **Rendering-Tests**: Überprüfen, ob die Komponente korrekt gerendert wird
2. **Prop-Tests**: Überprüfen, ob die Props korrekt verarbeitet werden
3. **Event-Tests**: Überprüfen, ob Events korrekt ausgelöst werden
4. **Ref-Tests**: Überprüfen, ob Refs korrekt weitergeleitet werden
5. **A11y-Tests**: Überprüfen, ob die Komponente barrierefrei ist

## 🚀 Nächste Schritte

1. **FormField-Komponente aktivieren**: Die FormField-Komponente ist eine grundlegende Komponente und sollte zuerst aktiviert werden
2. **Menu-Komponenten aktivieren**: Die Menu-Komponenten sind für die Navigation wichtig
3. **Validierungskomponenten aktivieren**: Die Validierungskomponenten sind für Formulare wichtig
4. **DatePicker und TimePicker aktivieren**: Diese Komponenten sind komplex, aber wichtig für Datumsauswahl
5. **FileUpload aktivieren**: Diese Komponente ist für Datei-Uploads wichtig
6. **Internationalisierungskomponenten aktivieren**: Diese Komponenten sind für die Mehrsprachigkeit wichtig