// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState } from 'react';
import { Card, Button, ProgressBar, Tooltip } from '@smolitux/core';

export interface EngagementMetric {
  /** Name der Metrik */
  name: string;
  /** Wert der Metrik */
  value: number;
  /** Gewichtung der Metrik (0-1) */
  weight: number;
  /** Beschreibung der Metrik */
  description?: string;
  /** Benchmark-Wert (Durchschnitt) */
  benchmark?: number;
  /** Ist ein höherer Wert besser? */
  higherIsBetter?: boolean;
}

export interface EngagementScoreProps {
  /** Titel der Komponente */
  title?: string;
  /** Beschreibung der Komponente */
  description?: string;
  /** Engagement-Score (0-100) */
  score: number;
  /** Metriken, die zum Score beitragen */
  metrics: EngagementMetric[];
  /** Callback beim Aktualisieren der Analyse */
  onRefresh?: () => Promise<void>;
  /** Callback beim Klicken auf eine Metrik */
  onMetricClick?: (metric: EngagementMetric) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Inhalt-ID */
  contentId?: string;
  /** Inhalt-Titel */
  contentTitle?: string;
  /** Inhalt-Typ */
  contentType?: 'audio' | 'video' | 'image' | 'article' | 'post';
  /** Inhalt-Thumbnail */
  contentThumbnail?: string;
  /** Vergleichswert (z.B. Durchschnitt der Plattform) */
  benchmarkScore?: number;
  /** Vergleichstext */
  benchmarkText?: string;
  /** Empfehlungen zur Verbesserung des Scores */
  recommendations?: string[];
  /** Zeitpunkt der Analyse */
  analysisTimestamp?: Date;
  /** Detaillierte Erklärung anzeigen? */
  showExplanation?: boolean;
  /** Empfehlungen anzeigen? */
  showRecommendations?: boolean;
  /** Vergleich anzeigen? */
  showBenchmark?: boolean;
}

/**
 * EngagementScore-Komponente für die Anzeige und Erklärung von Engagement-Scores
 */
export const EngagementScore: React.FC<EngagementScoreProps> = ({
  title = 'Engagement-Score',
  description,
  score,
  metrics,
  onRefresh,
  onMetricClick,
  className = '',
  loading = false,
  contentId,
  contentTitle,
  contentType,
  contentThumbnail,
  benchmarkScore,
  benchmarkText = 'Durchschnitt',
  recommendations = [],
  analysisTimestamp,
  showExplanation = true,
  showRecommendations = true,
  showBenchmark = true,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredMetricIndex, setHoveredMetricIndex] = useState<number | null>(null);

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

  // Metrik anklicken
  const handleMetricClick = (metric: EngagementMetric) => {
    if (onMetricClick) {
      onMetricClick(metric);
    }
  };

  // Score-Farbe basierend auf dem Wert
  const getScoreColor = (value: number): string => {
    if (value >= 80) return 'text-green-500 dark:text-green-400';
    if (value >= 60) return 'text-blue-500 dark:text-blue-400';
    if (value >= 40) return 'text-yellow-500 dark:text-yellow-400';
    if (value >= 20) return 'text-orange-500 dark:text-orange-400';
    return 'text-red-500 dark:text-red-400';
  };

  // Score-Hintergrundfarbe basierend auf dem Wert
  const getScoreBackgroundColor = (value: number): string => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    if (value >= 40) return 'bg-yellow-500';
    if (value >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Score-Text basierend auf dem Wert
  const getScoreText = (value: number): string => {
    if (value >= 80) return 'Ausgezeichnet';
    if (value >= 60) return 'Gut';
    if (value >= 40) return 'Durchschnittlich';
    if (value >= 20) return 'Verbesserungswürdig';
    return 'Niedrig';
  };

  // Metrik-Farbe basierend auf dem Wert und Benchmark
  const getMetricColor = (metric: EngagementMetric): string => {
    if (!metric.benchmark) {
      return 'text-gray-700 dark:text-gray-300';
    }

    const ratio = metric.value / metric.benchmark;

    if (metric.higherIsBetter !== false) {
      if (ratio >= 1.5) return 'text-green-500 dark:text-green-400';
      if (ratio >= 1) return 'text-blue-500 dark:text-blue-400';
      if (ratio >= 0.75) return 'text-yellow-500 dark:text-yellow-400';
      if (ratio >= 0.5) return 'text-orange-500 dark:text-orange-400';
      return 'text-red-500 dark:text-red-400';
    } else {
      if (ratio <= 0.5) return 'text-green-500 dark:text-green-400';
      if (ratio <= 1) return 'text-blue-500 dark:text-blue-400';
      if (ratio <= 1.25) return 'text-yellow-500 dark:text-yellow-400';
      if (ratio <= 1.5) return 'text-orange-500 dark:text-orange-400';
      return 'text-red-500 dark:text-red-400';
    }
  };

  // Metrik-Wert formatieren
  const formatMetricValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    if (Number.isInteger(value)) {
      return value.toString();
    }
    return value.toFixed(2);
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
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>

          <div className="flex space-x-2">
            {onRefresh && (
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
              </button>
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

      <div className="p-6">
        {loading ? (
          renderPlaceholders()
        ) : (
          <>
            {/* Score und Benchmark */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Score */}
              <div className="md:w-1/3">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Engagement-Score
                  </h4>

                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32" viewBox="0 0 100 100">
                        {/* Hintergrundkreis */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="10"
                          className="dark:stroke-gray-600"
                        />

                        {/* Score-Kreis */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={getScoreBackgroundColor(score)}
                          strokeWidth="10"
                          strokeDasharray={`${(score / 100) * 283} 283`}
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className={`text-2xl font-bold ${getScoreColor(score)}`}>
                          {Math.round(score)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {getScoreText(score)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    {analysisTimestamp && <p>Analysiert am {formatDate(analysisTimestamp)}</p>}
                  </div>
                </div>
              </div>

              {/* Benchmark und Erklärung */}
              <div className="md:w-2/3">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm h-full">
                  {showBenchmark && benchmarkScore !== undefined && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Vergleich
                      </h4>

                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            0
                          </span>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            100
                          </span>
                        </div>

                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                          {/* Benchmark-Marker */}
                          <div
                            className="absolute h-4 w-1 bg-gray-400 dark:bg-gray-500 rounded-full transform -translate-y-1"
                            style={{ left: `${benchmarkScore}%` }}
                          />

                          {/* Score-Balken */}
                          <div
                            className={`h-2 rounded-full ${getScoreBackgroundColor(score)}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${getScoreBackgroundColor(score)} mr-1`}
                            />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              Ihr Score: {Math.round(score)}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500 mr-1" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {benchmarkText}: {Math.round(benchmarkScore)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showExplanation && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Was bedeutet dieser Score?
                      </h4>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Der Engagement-Score misst, wie gut Ihr Inhalt bei der Zielgruppe ankommt
                        und Interaktionen auslöst. Ein höherer Score bedeutet, dass Ihr Inhalt mehr
                        Engagement erzeugt als vergleichbare Inhalte.
                      </p>

                      {score >= 80 && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                          Ihr Inhalt erzielt ein ausgezeichnetes Engagement und übertrifft die
                          meisten vergleichbaren Inhalte.
                        </p>
                      )}

                      {score >= 60 && score < 80 && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                          Ihr Inhalt erzielt ein gutes Engagement und übertrifft viele vergleichbare
                          Inhalte.
                        </p>
                      )}

                      {score >= 40 && score < 60 && (
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                          Ihr Inhalt erzielt ein durchschnittliches Engagement, vergleichbar mit
                          ähnlichen Inhalten.
                        </p>
                      )}

                      {score >= 20 && score < 40 && (
                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                          Ihr Inhalt erzielt ein unterdurchschnittliches Engagement und könnte
                          verbessert werden.
                        </p>
                      )}

                      {score < 20 && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          Ihr Inhalt erzielt ein niedriges Engagement und sollte überarbeitet
                          werden.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Metriken */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Engagement-Metriken
              </h4>

              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleMetricClick(metric)}
                    onMouseEnter={() => setHoveredMetricIndex(index)}
                    onMouseLeave={() => setHoveredMetricIndex(null)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {metric.name}
                        </span>

                        {metric.description && (
                          <div className="relative inline-block">
                            <svg
                              className="w-4 h-4 ml-1 text-gray-400 dark:text-gray-500 cursor-help"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
                              {metric.description}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getMetricColor(metric)}`}>
                          {formatMetricValue(metric.value)}
                        </span>

                        {metric.benchmark && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            / {formatMetricValue(metric.benchmark)} {benchmarkText}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative pt-1">
                      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        {metric.benchmark && (
                          <div
                            className="absolute h-4 w-1 bg-gray-400 dark:bg-gray-500 rounded-full transform -translate-y-1"
                            style={{
                              left: `${(metric.benchmark / (metric.benchmark * 2)) * 100}%`,
                            }}
                          />
                        )}

                        <div
                          className={`h-2 rounded-full ${getScoreBackgroundColor(
                            metric.benchmark ? (metric.value / metric.benchmark) * 50 + 50 : 50
                          )}`}
                          style={{
                            width: `${
                              metric.benchmark
                                ? Math.min(100, (metric.value / metric.benchmark) * 100)
                                : 50
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    {hoveredMetricIndex === index && (
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                        <span>Gewichtung: {(metric.weight * 100).toFixed(0)}%</span>

                        {metric.benchmark && (
                          <span>
                            {metric.higherIsBetter !== false
                              ? metric.value >= metric.benchmark
                                ? `+${((metric.value / metric.benchmark - 1) * 100).toFixed(0)}% über ${benchmarkText}`
                                : `${((metric.value / metric.benchmark - 1) * 100).toFixed(0)}% unter ${benchmarkText}`
                              : metric.value <= metric.benchmark
                                ? `+${((1 - metric.value / metric.benchmark) * 100).toFixed(0)}% besser als ${benchmarkText}`
                                : `${((metric.value / metric.benchmark - 1) * 100).toFixed(0)}% schlechter als ${benchmarkText}`}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Empfehlungen */}
            {showRecommendations && recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Empfehlungen zur Verbesserung
                </h4>

                <div className="space-y-2">
                  {recommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-start"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
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
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
