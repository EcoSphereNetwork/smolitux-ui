# FeedFilter

`FeedFilter` erlaubt die Auswahl unterschiedlicher Feed-Kategorien.

## Import
```tsx
import { FeedFilter } from '@smolitux/resonance';
```

## Beispiel
```tsx
<FeedFilter filters={[{ id: 'latest', label: 'Neu' }]} onChange={id => console.log(id)} />
```
