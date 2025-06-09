// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState } from 'react';
import { Card, Button } from '@smolitux/core';

export interface TrendingTopic {
  /** Eindeutige ID des Themas */
  id: string;
  /** Name des Themas */
  name: string;
  /** Beschreibung des Themas */
  description?: string;
  /** Kategorie des Themas */
  category?: string;
  /** Anzahl der Erwähnungen */
  mentionCount: number;
  /** Veränderung gegenüber der Vorperiode (in Prozent) */
  change?: number;
  /** Ist das Thema neu im Trend? */
  isNew?: boolean;
  /** Verwandte Themen */
  relatedTopics?: string[];
  /** Verwandte Inhalte */
  relatedContent?: {
    /** Eindeutige ID des Inhalts */
    id: string;
    /** Titel des Inhalts */
    title: string;
    /** URL des Inhalts */
    url: string;
    /** Typ des Inhalts */
    type: 'audio' | 'video' | 'image' | 'article' | 'post';
    /** Thumbnail des Inhalts */
    thumbnail?: string;
  }[];
  /** Zusätzliche Metadaten zum Thema */
  metadata?: Record<string, unknown>;
}

export interface TrendingTopicsProps {
  /** Titel der Komponente */
  title?: string;
  /** Beschreibung der Komponente */
  description?: string;
  /** Trending-Themen */
  topics: TrendingTopic[];
  /** Callback beim Aktualisieren der Themen */
  onRefresh?: () => Promise<void>;
  /** Callback beim Ändern des Zeitraums */
  onTimeRangeChange?: (range: string) => Promise<void>;
  /** Callback beim Ändern der Kategorie */
  onCategoryChange?: (category: string | null) => Promise<void>;
  /** Callback beim Klicken auf ein Thema */
  onTopicClick?: (topic: TrendingTopic) => void;
  /** Callback beim Klicken auf einen verwandten Inhalt */
  onContentClick?: (content: TrendingTopic['relatedContent'][0]) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Verfügbare Zeiträume */
  timeRanges?: string[];
  /** Aktueller Zeitraum */
  currentTimeRange?: string;
  /** Verfügbare Kategorien */
  categories?: string[];
  /** Aktuelle Kategorie */
  currentCategory?: string | null;
  /** Zeitpunkt der Analyse */
  analysisTimestamp?: Date;
  /** Maximale Anzahl der anzuzeigenden Themen */
  maxTopics?: number;
  /** Verwandte Inhalte anzeigen? */
  showRelatedContent?: boolean;
  /** Verwandte Themen anzeigen? */
  showRelatedTopics?: boolean;
  /** Veränderungen anzeigen? */
  showChanges?: boolean;
  /** Neue Themen hervorheben? */
  highlightNew?: boolean;
}

/**
 * TrendingTopics-Komponente für die Anzeige von Trending-Themen und -Inhalten
 */
export type TabId = 'trending' | 'rising' | 'new';

export const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  title = 'Trending-Themen',
  description,
  topics,
  onRefresh,
  onTimeRangeChange,
  onCategoryChange,
  onTopicClick,
  onContentClick,
  className = '',
  loading = false,
  timeRanges = ['24h', '7d', '30d', '90d'],
  currentTimeRange = '24h',
  categories = [],
  currentCategory = null,
  analysisTimestamp,
  maxTopics = 10,
  showRelatedContent = true,
  showRelatedTopics = true,
  showChanges = true,
  highlightNew = true,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(currentTimeRange);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(currentCategory);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('trending');

  // Themen nach Tab filtern und sortieren
  const filteredTopics = topics
    .filter((topic) => {
      if (selectedCategory && topic.category !== selectedCategory) {
        return false;
      }

      if (activeTab === 'new' && !topic.isNew) {
        return false;
      }

      if (activeTab === 'rising' && (!topic.change || topic.change <= 0)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (activeTab === 'trending') {
        return b.mentionCount - a.mentionCount;
      }

      if (activeTab === 'rising') {
        return (b.change || 0) - (a.change || 0);
      }

      if (activeTab === 'new') {
        return b.mentionCount - a.mentionCount;
      }

      return 0;
    })
    .slice(0, maxTopics);

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

  // Kategorie ändern
  const handleCategoryChange = async (category: string | null) => {
    setSelectedCategory(category);

    if (onCategoryChange) {
      try {
        await onCategoryChange(category);
      } catch (error) {
        console.error('Fehler beim Ändern der Kategorie:', error);
      }
    }
  };

  // Themen aktualisieren
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return;

    setIsRefreshing(true);

    try {
      await onRefresh();
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Themen:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Thema anklicken
  const handleTopicClick = (topic: TrendingTopic) => {
    if (onTopicClick) {
      onTopicClick(topic);
    } else {
      setExpandedTopicId(expandedTopicId === topic.id ? null : topic.id);
    }
  };

  // Verwandten Inhalt anklicken
  const handleContentClick = (content: TrendingTopic['relatedContent'][0]) => {
    if (onContentClick) {
      onContentClick(content);
    }
  };

  // Veränderung formatieren
  const formatChange = (change?: number): string => {
    if (change === undefined) return '';

    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
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
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg h-16" />
          ))}
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
                aria-label="Themen aktualisieren"
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

        {analysisTimestamp && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Letzte Aktualisierung: {formatDate(analysisTimestamp)}
          </p>
        )}
      </div>

      {/* Filter */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          {/* Zeitraumauswahl */}
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
                {!['24h', '7d', '30d', '90d'].includes(range) && range}
              </button>
            ))}
          </div>

          {/* Kategorieauswahl */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedCategory === null
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Alle
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          {(
            [
              { id: 'trending', label: 'Trending' },
              { id: 'rising', label: 'Aufsteigend' },
              { id: 'new', label: 'Neu' },
            ] as { id: TabId; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-1 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          renderPlaceholders()
        ) : filteredTopics.length === 0 ? (
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
            <p className="text-lg font-medium">Keine Themen gefunden</p>
            <p className="mt-2">
              {activeTab === 'trending' && 'Es wurden keine Trending-Themen gefunden.'}
              {activeTab === 'rising' && 'Es wurden keine aufsteigenden Themen gefunden.'}
              {activeTab === 'new' && 'Es wurden keine neuen Themen gefunden.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTopics.map((topic, index) => (
              <div key={topic.id} className="divide-y divide-gray-200 dark:divide-gray-700">
                <div
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    expandedTopicId === topic.id
                      ? 'bg-gray-50 dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                  onClick={() => handleTopicClick(topic)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-gray-900 dark:text-white mr-2">
                        {index + 1}.
                      </span>

                      <div>
                        <div className="flex items-center">
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            {topic.name}
                          </h4>

                          {highlightNew && topic.isNew && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                              Neu
                            </span>
                          )}

                          {topic.category && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                              {topic.category}
                            </span>
                          )}
                        </div>

                        {topic.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {topic.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {topic.mentionCount.toLocaleString()} Erwähnungen
                        </p>

                        {showChanges && topic.change !== undefined && (
                          <p
                            className={`text-xs ${
                              topic.change > 0
                                ? 'text-green-600 dark:text-green-400'
                                : topic.change < 0
                                  ? 'text-red-600 dark:text-red-400'
                                  : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {formatChange(topic.change)}
                          </p>
                        )}
                      </div>

                      <svg
                        className={`w-5 h-5 ml-3 text-gray-400 transition-transform ${
                          expandedTopicId === topic.id ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Erweiterte Informationen */}
                {expandedTopicId === topic.id && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800">
                    {/* Beschreibung */}
                    {topic.description && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Beschreibung
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {topic.description}
                        </p>
                      </div>
                    )}

                    {/* Verwandte Themen */}
                    {showRelatedTopics && topic.relatedTopics && topic.relatedTopics.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Verwandte Themen
                        </h5>

                        <div className="flex flex-wrap gap-2">
                          {topic.relatedTopics.map((relatedTopic) => (
                            <span
                              key={relatedTopic}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                              {relatedTopic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Verwandte Inhalte */}
                    {showRelatedContent &&
                      topic.relatedContent &&
                      topic.relatedContent.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Verwandte Inhalte
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {topic.relatedContent.map((content) => (
                              <div
                                key={content.id}
                                className="flex items-start p-2 rounded-md bg-white dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleContentClick(content);
                                }}
                              >
                                {content.thumbnail && (
                                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-3">
                                    <img
                                      src={content.thumbnail}
                                      alt={content.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}

                                <div className="flex-1 min-w-0">
                                  <h6 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {content.title}
                                  </h6>

                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                                    <span className="capitalize">{content.type}</span>

                                    {content.url && (
                                      <a
                                        href={content.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-primary-600 dark:text-primary-400 hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Öffnen
                                      </a>
                                    )}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
