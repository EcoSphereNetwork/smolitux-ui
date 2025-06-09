// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState } from 'react';
import { Card, Button, TabView } from '@smolitux/core';

export interface AnalyticsMetric {
  /** Name der Metrik */
  name: string;
  /** Wert der Metrik */
  value: number;
  /** Einheit der Metrik */
  unit?: string;
  /** Veränderung gegenüber dem Vorperiode */
  change?: number;
  /** Ist die Veränderung positiv? */
  isPositiveChange?: boolean;
  /** Beschreibung der Metrik */
  description?: string;
  /** Zusätzliche Metadaten zur Metrik */
  metadata?: Record<string, unknown>;
}

export interface AnalyticsTimeSeries {
  /** Name der Zeitreihe */
  name: string;
  /** Datenpunkte der Zeitreihe */
  data: {
    /** Zeitpunkt des Datenpunkts */
    date: Date;
    /** Wert des Datenpunkts */
    value: number;
  }[];
  /** Farbe der Zeitreihe */
  color?: string;
  /** Einheit der Zeitreihe */
  unit?: string;
  /** Beschreibung der Zeitreihe */
  description?: string;
  /** Zusätzliche Metadaten zur Zeitreihe */
  metadata?: Record<string, unknown>;
}

export interface AnalyticsSegment {
  /** Name des Segments */
  name: string;
  /** Wert des Segments */
  value: number;
  /** Farbe des Segments */
  color?: string;
  /** Beschreibung des Segments */
  description?: string;
  /** Zusätzliche Metadaten zum Segment */
  metadata?: Record<string, unknown>;
}

export interface AnalyticsInsight {
  /** Titel des Insights */
  title: string;
  /** Beschreibung des Insights */
  description: string;
  /** Typ des Insights */
  type: 'info' | 'success' | 'warning' | 'error';
  /** Zeitpunkt des Insights */
  timestamp: Date;
  /** Zusätzliche Metadaten zum Insight */
  metadata?: Record<string, unknown>;
}

export interface ContentAnalyticsProps {
  /** Titel der Analyse */
  title?: string;
  /** Beschreibung der Analyse */
  description?: string;
  /** Metriken */
  metrics: AnalyticsMetric[];
  /** Zeitreihen */
  timeSeries: AnalyticsTimeSeries[];
  /** Segmente */
  segments: {
    /** Name der Segmentgruppe */
    name: string;
    /** Segmente */
    data: AnalyticsSegment[];
  }[];
  /** Insights */
  insights: AnalyticsInsight[];
  /** Callback beim Aktualisieren der Analyse */
  onRefresh?: () => Promise<void>;
  /** Callback beim Ändern des Zeitraums */
  onTimeRangeChange?: (range: string) => Promise<void>;
  /** Callback beim Exportieren der Daten */
  onExport?: (format: 'csv' | 'json' | 'pdf') => Promise<void>;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Verfügbare Zeiträume */
  timeRanges?: string[];
  /** Aktueller Zeitraum */
  currentTimeRange?: string;
  /** Inhalt-ID */
  contentId?: string;
  /** Inhalt-Titel */
  contentTitle?: string;
  /** Inhalt-Typ */
  contentType?: 'audio' | 'video' | 'image' | 'article' | 'post';
  /** Inhalt-Thumbnail */
  contentThumbnail?: string;
}

/**
 * ContentAnalytics-Komponente für die Anzeige von KI-generierten Inhaltsanalysen
 */
export const ContentAnalytics: React.FC<ContentAnalyticsProps> = ({
  title = 'Inhaltsanalyse',
  description,
  metrics,
  timeSeries,
  segments,
  insights,
  onRefresh,
  onTimeRangeChange,
  onExport,
  className = '',
  loading = false,
  timeRanges = ['7d', '30d', '90d', '1y', 'all'],
  currentTimeRange = '30d',
  contentId,
  contentTitle,
  contentType,
  contentThumbnail,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(currentTimeRange);
  const [activeTab, setActiveTab] = useState<'overview' | 'engagement' | 'audience' | 'insights'>(
    'overview'
  );
  const [hoveredMetricIndex, setHoveredMetricIndex] = useState<number | null>(null);

  // Zeitraum ändern
  const handleTimeRangeChange = async (range: string) => {
    setSelectedTimeRange(range);

    if (onTimeRangeChange) {
      try {
        await onTimeRangeChange(range);
      } catch (error) {
        console.error('Fehler beim Ändern des Zeitraums:', error);
      }
    }
  };

  // Analyse aktualisieren
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return;

    setIsRefreshing(true);

    try {
      await onRefresh();
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Analyse:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Daten exportieren
  const handleExport = async (format: 'csv' | 'json' | 'pdf') => {
    if (!onExport) return;

    try {
      await onExport(format);
    } catch (error) {
      console.error(`Fehler beim Exportieren als ${format.toUpperCase()}:`, error);
    }
  };

  // Wert formatieren
  const formatValue = (value: number, unit?: string): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M${unit ? ` ${unit}` : ''}`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k${unit ? ` ${unit}` : ''}`;
    }
    return `${value}${unit ? ` ${unit}` : ''}`;
  };

  // Veränderung formatieren
  const formatChange = (change?: number): string => {
    if (change === undefined) return '';

    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  // Zeitreihe rendern
  const renderChart = (series: AnalyticsTimeSeries) => {
    // Hier würde normalerweise ein Chart-Rendering stattfinden
    // Da wir keine Chart-Bibliothek einbinden, zeigen wir einen Platzhalter an

    return (
      <div className="h-48 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{series.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {series.data.length} Datenpunkte
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Min: {formatValue(Math.min(...series.data.map((d) => d.value)), series.unit)}
            {' | '}
            Max: {formatValue(Math.max(...series.data.map((d) => d.value)), series.unit)}
          </p>
        </div>
      </div>
    );
  };

  // Segmentdiagramm rendern
  const renderSegmentChart = (segmentGroup: { name: string; data: AnalyticsSegment[] }) => {
    // Hier würde normalerweise ein Pie/Donut-Chart-Rendering stattfinden
    // Da wir keine Chart-Bibliothek einbinden, zeigen wir einen Platzhalter an

    return (
      <div className="h-48 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {segmentGroup.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {segmentGroup.data.length} Segmente
          </p>
          <div className="flex justify-center mt-2 space-x-2">
            {segmentGroup.data.slice(0, 5).map((segment, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: segment.color || getDefaultColor(index) }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Standardfarbe für Segmente
  const getDefaultColor = (index: number): string => {
    const colors = [
      '#3B82F6', // blue-500
      '#10B981', // emerald-500
      '#F59E0B', // amber-500
      '#EF4444', // red-500
      '#8B5CF6', // violet-500
      '#EC4899', // pink-500
      '#06B6D4', // cyan-500
      '#F97316', // orange-500
    ];

    return colors[index % colors.length];
  };

  // Insight-Icon
  const getInsightIcon = (type: AnalyticsInsight['type']) => {
    switch (type) {
      case 'info':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500 dark:text-green-400 flex items-center justify-center">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-500 dark:text-yellow-400 flex items-center justify-center">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 flex items-center justify-center">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2" />
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-2" />
          <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-48 bg-gray-200 dark:bg-gray-600 rounded" />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>

          <div className="flex space-x-2">
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2"
                aria-label="Analyse aktualisieren"
              >
                <svg
                  className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </Button>
            )}

            {onExport && (
              <div className="relative group">
                <Button variant="outline" size="sm">
                  Exportieren
                </Button>

                <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                  <div className="py-1">
                    <button
                      onClick={() => handleExport('csv')}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Als CSV exportieren
                    </button>
                    <button
                      onClick={() => handleExport('json')}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Als JSON exportieren
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Als PDF exportieren
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}

        {/* Inhaltsinformationen */}
        {contentTitle && (
          <div className="flex items-center mt-4">
            {contentThumbnail && (
              <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                <img
                  src={contentThumbnail}
                  alt={contentTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{contentTitle}</h4>

              <div className="flex items-center mt-1">
                {contentType && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {contentType}
                  </span>
                )}

                {contentId && (
                  <>
                    <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {contentId}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zeitraumauswahl */}
      {timeRanges.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex space-x-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedTimeRange === range
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {range === '7d' && '7 Tage'}
                {range === '30d' && '30 Tage'}
                {range === '90d' && '90 Tage'}
                {range === '1y' && '1 Jahr'}
                {range === 'all' && 'Alle Zeit'}
                {!['7d', '30d', '90d', '1y', 'all'].includes(range) && range}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <TabView
          tabs={[
            { id: 'overview', label: 'Übersicht' },
            { id: 'engagement', label: 'Engagement' },
            { id: 'audience', label: 'Zielgruppe' },
            { id: 'insights', label: 'Insights' },
          ]}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab as string)}
        />
      </div>

      {/* Inhalt */}
      <div className="p-6">
        {loading ? (
          renderPlaceholders()
        ) : (
          <>
            {/* Übersicht */}
            {activeTab === 'overview' && (
              <>
                {/* Metriken */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {metrics.slice(0, 4).map((metric, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onMouseEnter={() => setHoveredMetricIndex(index)}
                      onMouseLeave={() => setHoveredMetricIndex(null)}
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                        {formatValue(metric.value, metric.unit)}
                      </p>

                      {metric.change !== undefined && (
                        <p
                          className={`text-xs mt-1 ${
                            metric.isPositiveChange
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {formatChange(metric.change)}
                        </p>
                      )}

                      {hoveredMetricIndex === index && metric.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {metric.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Hauptzeitreihe */}
                {timeSeries.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Verlauf
                    </h4>
                    {renderChart(timeSeries[0])}
                  </div>
                )}

                {/* Segmente */}
                {segments.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {segments.slice(0, 2).map((segmentGroup, index) => (
                      <div key={index}>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {segmentGroup.name}
                        </h4>
                        {renderSegmentChart(segmentGroup)}
                      </div>
                    ))}
                  </div>
                )}

                {/* Top-Insights */}
                {insights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Top-Insights
                    </h4>
                    <div className="space-y-3">
                      {insights.slice(0, 3).map((insight, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-start"
                        >
                          {getInsightIcon(insight.type)}
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {insight.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {insight.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Engagement */}
            {activeTab === 'engagement' && (
              <>
                {/* Engagement-Metriken */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {metrics
                    .filter((metric) =>
                      [
                        'Aufrufe',
                        'Likes',
                        'Kommentare',
                        'Shares',
                        'Engagement-Rate',
                        'Durchschnittliche Wiedergabezeit',
                        'Abschlussrate',
                      ].includes(metric.name)
                    )
                    .slice(0, 4)
                    .map((metric, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onMouseEnter={() => setHoveredMetricIndex(index)}
                        onMouseLeave={() => setHoveredMetricIndex(null)}
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                          {formatValue(metric.value, metric.unit)}
                        </p>

                        {metric.change !== undefined && (
                          <p
                            className={`text-xs mt-1 ${
                              metric.isPositiveChange
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {formatChange(metric.change)}
                          </p>
                        )}

                        {hoveredMetricIndex === index && metric.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {metric.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>

                {/* Engagement-Zeitreihen */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {timeSeries
                    .filter((series) =>
                      ['Aufrufe', 'Likes', 'Kommentare', 'Shares', 'Engagement-Rate'].includes(
                        series.name
                      )
                    )
                    .slice(0, 4)
                    .map((series, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {series.name}
                        </h4>
                        {renderChart(series)}
                      </div>
                    ))}
                </div>

                {/* Engagement-Segmente */}
                {segments
                  .filter((segment) =>
                    [
                      'Interaktionstypen',
                      'Engagement-Quellen',
                      'Engagement nach Tageszeit',
                    ].includes(segment.name)
                  )
                  .slice(0, 2)
                  .map((segmentGroup, index) => (
                    <div key={index} className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {segmentGroup.name}
                      </h4>
                      {renderSegmentChart(segmentGroup)}
                    </div>
                  ))}
              </>
            )}

            {/* Zielgruppe */}
            {activeTab === 'audience' && (
              <>
                {/* Zielgruppen-Metriken */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {metrics
                    .filter((metric) =>
                      [
                        'Unique Viewers',
                        'Neue Follower',
                        'Absprungrate',
                        'Durchschnittliche Sitzungsdauer',
                      ].includes(metric.name)
                    )
                    .slice(0, 4)
                    .map((metric, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onMouseEnter={() => setHoveredMetricIndex(index)}
                        onMouseLeave={() => setHoveredMetricIndex(null)}
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                          {formatValue(metric.value, metric.unit)}
                        </p>

                        {metric.change !== undefined && (
                          <p
                            className={`text-xs mt-1 ${
                              metric.isPositiveChange
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {formatChange(metric.change)}
                          </p>
                        )}

                        {hoveredMetricIndex === index && metric.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {metric.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>

                {/* Zielgruppen-Segmente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {segments
                    .filter((segment) =>
                      [
                        'Altersgruppen',
                        'Geschlecht',
                        'Geografie',
                        'Geräte',
                        'Plattformen',
                      ].includes(segment.name)
                    )
                    .slice(0, 4)
                    .map((segmentGroup, index) => (
                      <div key={index}>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {segmentGroup.name}
                        </h4>
                        {renderSegmentChart(segmentGroup)}
                      </div>
                    ))}
                </div>

                {/* Zielgruppen-Zeitreihen */}
                {timeSeries
                  .filter((series) =>
                    ['Neue Follower', 'Unique Viewers', 'Wiederkehrende Besucher'].includes(
                      series.name
                    )
                  )
                  .slice(0, 2)
                  .map((series, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {series.name}
                      </h4>
                      {renderChart(series)}
                    </div>
                  ))}
              </>
            )}

            {/* Insights */}
            {activeTab === 'insights' && (
              <div className="space-y-4">
                {insights.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <p className="text-lg font-medium">Keine Insights verfügbar</p>
                    <p className="mt-2">
                      Es wurden noch keine Insights für diesen Inhalt generiert.
                    </p>
                  </div>
                ) : (
                  insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-start"
                    >
                      {getInsightIcon(insight.type)}
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {insight.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Intl.DateTimeFormat('de-DE', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }).format(insight.timestamp)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};
