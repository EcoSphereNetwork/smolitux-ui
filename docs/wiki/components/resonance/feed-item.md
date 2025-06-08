# FeedItem

Einzelner Eintrag innerhalb eines Feeds.

## Import
```tsx
import { FeedItem } from '@smolitux/resonance';
```

## Beispiel
```tsx
<FeedItem item={{ id: '1', author: { id: 'u1', name: 'Alice' }, createdAt: new Date().toISOString(), contentType: 'text', content: { text: 'Hallo' } }} />
```
