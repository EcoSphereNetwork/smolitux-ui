# Flexbox

Die **Flexbox**-Komponente ist eine leichte Wrapper-Komponente auf Basis von CSS Flexbox.
Sie unterstützt responsive Breakpoints und besitzt eine API, die mit den anderen Layout-Komponenten konsistent ist.

## Import
```tsx
import { Flex } from '@smolitux/layout';
```

## Verwendung
```tsx
<Flex direction={{ sm: 'column', md: 'row' }} gap={{ sm: 2, lg: 6 }}>
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

## Props
| Prop | Typ | Beschreibung |
|------|-----|--------------|
| `direction` | `'row'\|'row-reverse'\|'column'\|'column-reverse'` oder Objekt mit Breakpoints | Ausrichtung der Items |
| `gap` | Zahlenwert oder Breakpoint-Objekt | Abstand zwischen Items |
| `justifyContent` | Flexbox Justify-Werte oder Breakpoint-Objekt | Horizontale Ausrichtung |
| `alignItems` | Flexbox Align-Werte oder Breakpoint-Objekt | Vertikale Ausrichtung |
| `wrap` | `'nowrap'\|'wrap'\|'wrap-reverse'` oder Breakpoint-Objekt | Zeilenumbruch |
| `inline` | `boolean` | Als `inline-flex` rendern |
| `fullWidth` | `boolean` | Volle Breite einnehmen |
| `fullHeight` | `boolean` | Volle Höhe einnehmen |

Die Breakpoints `sm`, `md`, `lg` und `xl` entsprechen denen der übrigen Layout-Komponenten.
