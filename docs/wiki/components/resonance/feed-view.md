# FeedView

Die `FeedView`-Komponente zeigt eine Liste von Beiträgen an und bietet optional Filter- und Ladefunktionen.

## Import
```tsx
import { FeedView } from '@smolitux/resonance';
```

## Beispiel
```tsx
const items = [/* FeedItemData[] */];
<FeedView feedItems={items} onLoadMore={() => {/* ... */}} />
```
