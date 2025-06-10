# Option-Komponente

Die `Option`-Komponente repräsentiert einen auswählbaren Eintrag innerhalb der `Select`-Komponente.

## Verwendung

```tsx
import { Select } from '@smolitux/core';

<Select>
  <Select.Option value="1">Option 1</Select.Option>
  <Select.Option value="2" disabled>
    Option 2
  </Select.Option>
</Select>;
```

## Props

| Prop          | Typ               | Standard | Beschreibung              |
| ------------- | ----------------- | -------- | ------------------------- |
| `value`       | `string`          | –        | Wert der Option           |
| `children`    | `React.ReactNode` | –        | Anzeigeinhalt             |
| `disabled`    | `boolean`         | `false`  | Deaktiviert die Option    |
| `description` | `string`          | –        | Zusätzliche Beschreibung  |
| `icon`        | `React.ReactNode` | –        | Optionales Icon           |
| `group`       | `string`          | –        | Gruppierung für Optgroups |

```

```
