# SentimentDisplay

Die `SentimentDisplay`-Komponente visualisiert Stimmungsanalysen für Inhalte wie Videos, Artikel, Posts oder Kommentare.

## Eigenschaften

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `title` | `string` | `'Stimmungsanalyse'` | Titel der Stimmungsanzeige |
| `description` | `string` | `undefined` | Beschreibung der Stimmungsanzeige |
| `sentiment` | `SentimentScore` | - | Stimmungswerte (positive, negative, neutral, mixed) |
| `emotions` | `EmotionScore` | `undefined` | Emotionswerte (joy, sadness, fear, anger, surprise, disgust) |
| `trend` | `SentimentTrend[]` | `undefined` | Stimmungstrend über Zeit |
| `topics` | `SentimentTopic[]` | `undefined` | Themen mit Stimmungswerten |
| `onRefresh` | `() => Promise<void>` | `undefined` | Callback beim Aktualisieren der Stimmungsanalyse |
| `onTimeRangeChange` | `(range: string) => Promise<void>` | `undefined` | Callback beim Ändern des Zeitraums |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `loading` | `boolean` | `false` | Ist die Komponente im Ladezustand? |
| `timeRanges` | `string[]` | `['24h', '7d', '30d', '90d', 'all']` | Verfügbare Zeiträume |
| `currentTimeRange` | `string` | `'7d'` | Aktueller Zeitraum |
| `contentId` | `string` | `undefined` | Inhalt-ID |
| `contentTitle` | `string` | `undefined` | Inhalt-Titel |
| `contentType` | `'audio' \| 'video' \| 'image' \| 'article' \| 'post' \| 'comments'` | `undefined` | Inhalt-Typ |
| `contentThumbnail` | `string` | `undefined` | Inhalt-Thumbnail |
| `overallSentiment` | `number` | `undefined` | Gesamtstimmung (-1 bis 1) |
| `sentimentChange` | `number` | `undefined` | Stimmungsänderung |
| `analyzedCount` | `number` | `undefined` | Anzahl der analysierten Elemente |
| `analysisTimestamp` | `Date` | `undefined` | Zeitpunkt der Analyse |
| `showDistribution` | `boolean` | `true` | Stimmungsverteilung anzeigen? |
| `showEmotions` | `boolean` | `true` | Emotionen anzeigen? |
| `showTrend` | `boolean` | `true` | Trend anzeigen? |
| `showTopics` | `boolean` | `true` | Themen anzeigen? |

## Beispiel

```jsx
import { SentimentDisplay } from '@smolitux/ai';

const MyComponent = () => {
  const sentiment = {
    positive: 0.65,
    negative: 0.15,
    neutral: 0.20,
    mixed: 0.0,
  };

  const emotions = {
    joy: 0.55,
    sadness: 0.10,
    fear: 0.05,
    anger: 0.15,
    surprise: 0.10,
    disgust: 0.05,
  };

  const trend = [
    { timestamp: new Date('2025-03-01'), value: 0.3 },
    { timestamp: new Date('2025-03-02'), value: 0.4 },
    { timestamp: new Date('2025-03-03'), value: 0.5 },
    // ...weitere Datenpunkte
  ];

  const topics = [
    { name: 'Produktqualität', sentiment: 0.8, frequency: 0.35, relevance: 0.9 },
    { name: 'Kundenservice', sentiment: -0.3, frequency: 0.25, relevance: 0.8 },
    { name: 'Preis', sentiment: 0.1, frequency: 0.20, relevance: 0.7 },
    { name: 'Lieferung', sentiment: 0.5, frequency: 0.15, relevance: 0.6 },
  ];

  const handleRefresh = async () => {
    // Daten aktualisieren
    console.log('Daten werden aktualisiert...');
  };

  return (
    <SentimentDisplay
      title="Kommentar-Stimmungsanalyse"
      description="Analyse der Stimmung in Kommentaren zum Produkt 'Smartphone X'"
      sentiment={sentiment}
      emotions={emotions}
      trend={trend}
      topics={topics}
      onRefresh={handleRefresh}
      contentTitle="Smartphone X"
      contentType="comments"
      overallSentiment={0.5}
      sentimentChange={0.1}
      analyzedCount={250}
      analysisTimestamp={new Date()}
    />
  );
};
```