# RecommendationCarousel

Die `RecommendationCarousel`-Komponente zeigt KI-generierte Inhaltsempfehlungen in einem Karussell an.

## Eigenschaften

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `groups` | `RecommendationGroup[]` | - | Empfehlungsgruppen |
| `visibleItems` | `number` | `4` | Anzahl der sichtbaren Elemente |
| `onItemClick` | `(item: RecommendationItem) => void` | `undefined` | Callback beim Klicken auf ein empfohlenes Element |
| `onCreatorClick` | `(creatorId: string) => void` | `undefined` | Callback beim Klicken auf einen Ersteller |
| `onRefresh` | `() => Promise<void>` | `undefined` | Callback beim Aktualisieren der Empfehlungen |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `loading` | `boolean` | `false` | Ist die Komponente im Ladezustand? |
| `autoScroll` | `boolean` | `false` | Automatisches Scrollen aktivieren |
| `autoScrollInterval` | `number` | `5000` | Intervall für automatisches Scrollen (in ms) |

## Beispiel

```jsx
import { RecommendationCarousel } from '@smolitux/ai';

const MyComponent = () => {
  const recommendationGroups = [
    {
      id: 'trending',
      title: 'Trending',
      description: 'Beliebte Inhalte, die gerade im Trend liegen',
      items: [
        {
          id: '1',
          title: 'Einführung in React',
          description: 'Eine Einführung in die React-Bibliothek',
          url: 'https://example.com/react-intro',
          thumbnailUrl: 'https://example.com/thumbnails/react-intro.jpg',
          type: 'video',
          creator: {
            id: 'user1',
            name: 'Max Mustermann',
            avatarUrl: 'https://example.com/avatars/max.jpg',
          },
          relevance: 0.95,
          reason: 'Basierend auf deinen Interessen an Webentwicklung',
        },
        // ... weitere Empfehlungen
      ],
    },
    {
      id: 'forYou',
      title: 'Für dich',
      description: 'Personalisierte Empfehlungen basierend auf deinen Interessen',
      items: [
        // ... Empfehlungen
      ],
    },
  ];

  const handleItemClick = (item) => {
    console.log('Empfehlung angeklickt:', item);
    window.open(item.url, '_blank');
  };

  const handleCreatorClick = (creatorId) => {
    console.log('Ersteller angeklickt:', creatorId);
  };

  const handleRefresh = async () => {
    console.log('Empfehlungen werden aktualisiert...');
    // Hier würden neue Empfehlungen geladen werden
  };

  return (
    <RecommendationCarousel
      groups={recommendationGroups}
      visibleItems={4}
      onItemClick={handleItemClick}
      onCreatorClick={handleCreatorClick}
      onRefresh={handleRefresh}
      autoScroll={true}
      autoScrollInterval={7000}
    />
  );
};
```