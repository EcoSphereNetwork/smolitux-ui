# ContentAnalytics

Die `ContentAnalytics`-Komponente visualisiert KI-generierte Analysen für Inhalte wie Videos, Artikel oder Posts.

## Eigenschaften

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `title` | `string` | `'Inhaltsanalyse'` | Titel der Analyse |
| `description` | `string` | `undefined` | Beschreibung der Analyse |
| `metrics` | `AnalyticsMetric[]` | - | Metriken zur Anzeige |
| `timeSeries` | `AnalyticsTimeSeries[]` | - | Zeitreihen zur Anzeige |
| `segments` | `{ name: string; data: AnalyticsSegment[] }[]` | - | Segmente zur Anzeige |
| `insights` | `AnalyticsInsight[]` | - | Insights zur Anzeige |
| `onRefresh` | `() => Promise<void>` | `undefined` | Callback beim Aktualisieren der Analyse |
| `onTimeRangeChange` | `(range: string) => Promise<void>` | `undefined` | Callback beim Ändern des Zeitraums |
| `onExport` | `(format: 'csv' \| 'json' \| 'pdf') => Promise<void>` | `undefined` | Callback beim Exportieren der Daten |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `loading` | `boolean` | `false` | Ist die Komponente im Ladezustand? |
| `timeRanges` | `string[]` | `['7d', '30d', '90d', '1y', 'all']` | Verfügbare Zeiträume |
| `currentTimeRange` | `string` | `'30d'` | Aktueller Zeitraum |
| `contentId` | `string` | `undefined` | Inhalt-ID |
| `contentTitle` | `string` | `undefined` | Inhalt-Titel |
| `contentType` | `'audio' \| 'video' \| 'image' \| 'article' \| 'post'` | `undefined` | Inhalt-Typ |
| `contentThumbnail` | `string` | `undefined` | Inhalt-Thumbnail |

## Beispiel

```jsx
import { ContentAnalytics } from '@smolitux/ai';

const MyComponent = () => {
  const metrics = [
    { name: 'Aufrufe', value: 12500, unit: '', change: 5.2, isPositiveChange: true },
    { name: 'Likes', value: 450, unit: '', change: 2.8, isPositiveChange: true },
    { name: 'Kommentare', value: 78, unit: '', change: -1.5, isPositiveChange: false },
    { name: 'Shares', value: 120, unit: '', change: 8.3, isPositiveChange: true },
  ];

  const timeSeries = [
    {
      name: 'Aufrufe',
      data: [
        { date: new Date('2025-03-01'), value: 1200 },
        { date: new Date('2025-03-02'), value: 1500 },
        { date: new Date('2025-03-03'), value: 1800 },
        // ...weitere Datenpunkte
      ],
      unit: '',
    },
  ];

  const segments = [
    {
      name: 'Geräte',
      data: [
        { name: 'Desktop', value: 0.45, color: '#3B82F6' },
        { name: 'Mobile', value: 0.35, color: '#10B981' },
        { name: 'Tablet', value: 0.15, color: '#F59E0B' },
        { name: 'Andere', value: 0.05, color: '#EF4444' },
      ],
    },
  ];

  const insights = [
    {
      title: 'Hohe Engagement-Rate',
      description: 'Dieser Inhalt hat eine überdurchschnittliche Engagement-Rate von 8.2%.',
      type: 'success',
      timestamp: new Date(),
    },
  ];

  const handleRefresh = async () => {
    // Daten aktualisieren
    console.log('Daten werden aktualisiert...');
  };

  return (
    <ContentAnalytics
      title="Video-Analyse"
      description="Analyse der Performance des Videos 'Einführung in React'"
      metrics={metrics}
      timeSeries={timeSeries}
      segments={segments}
      insights={insights}
      onRefresh={handleRefresh}
      contentTitle="Einführung in React"
      contentType="video"
      contentThumbnail="https://example.com/thumbnail.jpg"
    />
  );
};
```