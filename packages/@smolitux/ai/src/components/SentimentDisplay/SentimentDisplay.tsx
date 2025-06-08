import React, { useState } from 'react';
import { useResponseCache } from '../../utils/useResponseCache';
import { Card, Button, ProgressBar } from '@smolitux/core';

export interface SentimentScore {
  /** Positive Stimmung (0-1) */
  positive: number;
  /** Negative Stimmung (0-1) */
  negative: number;
  /** Neutrale Stimmung (0-1) */
  neutral: number;
  /** Gemischte Stimmung (0-1, optional) */
  mixed?: number;
}

export interface EmotionScore {
  /** Freude (0-1) */
  joy: number;
  /** Traurigkeit (0-1) */
  sadness: number;
  /** Angst (0-1) */
  fear: number;
  /** Wut (0-1) */
  anger: number;
  /** Überraschung (0-1) */
  surprise: number;
  /** Ekel (0-1) */
  disgust: number;
  /** Vertrauen (0-1, optional) */
  trust?: number;
  /** Vorfreude (0-1, optional) */
  anticipation?: number;
}

export interface SentimentTrend {
  /** Zeitpunkt */
  timestamp: Date;
  /** Stimmungswert (-1 bis 1) */
  value: number;
}

export interface SentimentTopic {
  /** Name des Themas */
  name: string;
  /** Stimmungswert (-1 bis 1) */
  sentiment: number;
  /** Häufigkeit des Themas */
  frequency: number;
  /** Relevanz des Themas (0-1) */
  relevance: number;
}

export interface SentimentDisplayProps {
  /** Titel der Stimmungsanzeige */
  title?: string;
  /** Beschreibung der Stimmungsanzeige */
  description?: string;
  /** Stimmungswerte */
  sentiment: SentimentScore;
  /** Emotionswerte */
  emotions?: EmotionScore;
  /** Stimmungstrend */
  trend?: SentimentTrend[];
  /** Themen mit Stimmungswerten */
  topics?: SentimentTopic[];
  /** Callback beim Aktualisieren der Stimmungsanalyse */
  onRefresh?: () => Promise<void>;
  /** Optionaler Fetcher, falls die Stimmungsdaten asynchron geladen werden */
  fetchSentiment?: () => Promise<SentimentScore>;
  /** Schlüssel für das Caching der Stimmungsdaten */
  cacheKey?: string;
  /** Callback beim Ändern des Zeitraums */
  onTimeRangeChange?: (range: string) => Promise<void>;
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
  contentType?: 'audio' | 'video' | 'image' | 'article' | 'post' | 'comments';
  /** Inhalt-Thumbnail */
  contentThumbnail?: string;
  /** Gesamtstimmung (-1 bis 1) */
  overallSentiment?: number;
  /** Stimmungsänderung */
  sentimentChange?: number;
  /** Anzahl der analysierten Elemente */
  analyzedCount?: number;
  /** Zeitpunkt der Analyse */
  analysisTimestamp?: Date;
  /** Stimmungsverteilung anzeigen? */
  showDistribution?: boolean;
  /** Emotionen anzeigen? */
  showEmotions?: boolean;
  /** Trend anzeigen? */
  showTrend?: boolean;
  /** Themen anzeigen? */
  showTopics?: boolean;
}

/**
 * SentimentDisplay-Komponente für die Visualisierung von Sentiment-Analysen für Inhalte
 */
export const SentimentDisplay: React.FC<SentimentDisplayProps> = ({
  title = 'Stimmungsanalyse',
  description,
  sentiment,
  emotions,
  trend,
  topics,
  onRefresh,
  fetchSentiment,
  onTimeRangeChange,
  className = '',
  loading = false,
  timeRanges = ['24h', '7d', '30d', '90d', 'all'],
  currentTimeRange = '7d',
  contentId,
  contentTitle,
  contentType,
  contentThumbnail,
  overallSentiment,
  sentimentChange,
  analyzedCount,
  analysisTimestamp,
  showDistribution = true,
  showEmotions = true,
  showTrend = true,
  showTopics = true,
  cacheKey = 'sentiment',
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(currentTimeRange);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  const { data: cachedSentiment, error: fetchError } = useResponseCache(
    cacheKey,
    async () => {
      if (fetchSentiment) {
        return fetchSentiment();
      }
      return sentiment;
    }
  );

  const effectiveSentiment = cachedSentiment || sentiment;

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

  // Stimmungswert in Text umwandeln
  const getSentimentText = (value: number): string => {
    if (value >= 0.6) return 'Sehr positiv';
    if (value >= 0.2) return 'Positiv';
    if (value >= -0.2) return 'Neutral';
    if (value >= -0.6) return 'Negativ';
    return 'Sehr negativ';
  };

  // Stimmungswert in Farbe umwandeln
  const getSentimentColor = (value: number): string => {
    if (value >= 0.6) return 'bg-green-500';
    if (value >= 0.2) return 'bg-green-400';
    if (value >= -0.2) return 'bg-gray-400';
    if (value >= -0.6) return 'bg-red-400';
    return 'bg-red-500';
  };

  // Stimmungswert in Textfarbe umwandeln
  const getSentimentTextColor = (value: number): string => {
    if (value >= 0.6) return 'text-green-500';
    if (value >= 0.2) return 'text-green-400';
    if (value >= -0.2) return 'text-gray-500';
    if (value >= -0.6) return 'text-red-400';
    return 'text-red-500';
  };

  // Stimmungsänderung formatieren
  const formatSentimentChange = (change?: number): string => {
    if (change === undefined) return '';

    const sign = change >= 0 ? '+' : '';
    return `${sign}${(change * 100).toFixed(1)}%`;
  };

  // Datum formatieren
  const formatDate = (date?: Date): string => {
    if (!date) return '';

    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Stimmungstrend rendern
  const renderTrendChart = () => {
    // Hier würde normalerweise ein Chart-Rendering stattfinden
    // Da wir keine Chart-Bibliothek einbinden, zeigen wir einen Platzhalter an

    if (!trend || trend.length === 0) return null;

    const minValue = Math.min(...trend.map((t) => t.value));
    const maxValue = Math.max(...trend.map((t) => t.value));
    const avgValue = trend.reduce((sum, t) => sum + t.value, 0) / trend.length;

    return (
      <div className="h-48 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Stimmungstrend</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {trend.length} Datenpunkte
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Min: {minValue.toFixed(2)}
            {' | '}
            Avg: {avgValue.toFixed(2)}
            {' | '}
            Max: {maxValue.toFixed(2)}
          </p>
        </div>
      </div>
    );
  };

  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-1/3 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg h-32" />
          <div className="md:w-2/3 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg h-32" />
        </div>

        <div className="mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  };

  // Gesamtstimmung berechnen, falls nicht angegeben
  const calculatedOverallSentiment =
    overallSentiment !== undefined
      ? overallSentiment
      : effectiveSentiment.positive - effectiveSentiment.negative;

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
          </div>
        </div>

        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}

        {fetchError && (
          <p className="text-sm text-red-500 mt-2" role="alert">
            Fehler beim Laden der Stimmungsdaten
          </p>
        )}

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
      {timeRanges.length > 0 && showTrend && (
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
                {range === '24h' && '24 Stunden'}
                {range === '7d' && '7 Tage'}
                {range === '30d' && '30 Tage'}
                {range === '90d' && '90 Tage'}
                {range === 'all' && 'Alle Zeit'}
                {!['24h', '7d', '30d', '90d', 'all'].includes(range) && range}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inhalt */}
      <div className="p-6">
        {loading ? (
          renderPlaceholders()
        ) : (
          <>
            {/* Gesamtstimmung und Stimmungsverteilung */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Gesamtstimmung */}
              <div className="md:w-1/3">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gesamtstimmung
                  </h4>

                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-24 h-24 rounded-full ${getSentimentColor(calculatedOverallSentiment)} opacity-20`}
                        />
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p
                          className={`text-2xl font-bold ${getSentimentTextColor(calculatedOverallSentiment)}`}
                        >
                          {(calculatedOverallSentiment * 100).toFixed(0)}%
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {getSentimentText(calculatedOverallSentiment)}
                        </p>

                        {sentimentChange !== undefined && (
                          <p
                            className={`text-xs mt-1 ${
                              sentimentChange >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {formatSentimentChange(sentimentChange)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    {analyzedCount !== undefined && (
                      <p>
                        Basierend auf {analyzedCount}{' '}
                        {contentType === 'comments' ? 'Kommentaren' : 'Elementen'}
                      </p>
                    )}

                    {analysisTimestamp && (
                      <p className="mt-1">Analysiert am {formatDate(analysisTimestamp)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stimmungsverteilung */}
              {showDistribution && (
                <div className="md:w-2/3">
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Stimmungsverteilung
                    </h4>

                    <div className="space-y-4">
                      {/* Positive Stimmung */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Positiv</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {(effectiveSentiment.positive * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={effectiveSentiment.positive * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-green-500"
                        />
                      </div>

                      {/* Neutrale Stimmung */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Neutral</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {(effectiveSentiment.neutral * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={effectiveSentiment.neutral * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-gray-400"
                        />
                      </div>

                      {/* Negative Stimmung */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Negativ</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {(effectiveSentiment.negative * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={effectiveSentiment.negative * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-red-500"
                        />
                      </div>

                      {/* Gemischte Stimmung */}
                      {effectiveSentiment.mixed !== undefined && (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Gemischt
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {(effectiveSentiment.mixed * 100).toFixed(1)}%
                            </span>
                          </div>
                          <ProgressBar
                            value={effectiveSentiment.mixed * 100}
                            max={100}
                            className="h-2 bg-gray-200 dark:bg-gray-600"
                            progressClassName="bg-purple-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stimmungstrend */}
            {showTrend && trend && trend.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stimmungstrend
                </h4>
                {renderTrendChart()}
              </div>
            )}

            {/* Emotionen und Themen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Emotionen */}
              {showEmotions && emotions && (
                <div>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Emotionen
                    </h4>

                    <div className="space-y-4">
                      {/* Freude */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Freude</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {(emotions.joy * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.joy * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-yellow-400"
                        />
                      </div>

                      {/* Traurigkeit */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Traurigkeit
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {(emotions.sadness * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.sadness * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-blue-400"
                        />
                      </div>

                      {/* Angst */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Angst</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {(emotions.fear * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.fear * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-purple-400"
                        />
                      </div>

                      {/* Wut */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Wut</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {(emotions.anger * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.anger * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-red-400"
                        />
                      </div>

                      {/* Überraschung */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Überraschung
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {(emotions.surprise * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.surprise * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-orange-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Themen */}
              {showTopics && topics && topics.length > 0 && (
                <div>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Themen und Stimmung
                    </h4>

                    <div className="space-y-3">
                      {topics.map((topic, index) => (
                        <div
                          key={index}
                          className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                          onMouseEnter={() => setHoveredTopic(topic.name)}
                          onMouseLeave={() => setHoveredTopic(null)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {topic.name}
                            </span>
                            <span
                              className={`text-xs font-medium ${getSentimentTextColor(topic.sentiment)}`}
                            >
                              {getSentimentText(topic.sentiment)}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <div className="flex-1 mr-2">
                              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${getSentimentColor(topic.sentiment)}`}
                                  style={{ width: `${topic.relevance * 100}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {(topic.frequency * 100).toFixed(0)}%
                            </span>
                          </div>

                          {hoveredTopic === topic.name && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              Relevanz: {(topic.relevance * 100).toFixed(0)}%
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
