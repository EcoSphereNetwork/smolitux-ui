// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Card } from '@smolitux/core';
import { SearchResult, FederatedSearchProps } from '../../types';

/**
 * FederatedSearch-Komponente für die Suche über mehrere föderierte Plattformen
 */
export const FederatedSearch: React.FC<FederatedSearchProps> = ({
  platforms,
  onSearch,
  onResultClick,
  onPlatformsChange,
  className = '',
  placeholder = 'Suche über föderierte Plattformen...',
  defaultActivePlatforms,
  defaultFilters = {},
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activePlatforms, setActivePlatforms] = useState<string[]>(
    defaultActivePlatforms || platforms.filter((p) => p.isActive).map((p) => p.id)
  );
  const [filters, setFilters] = useState<Record<string, unknown>>(defaultFilters);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Aktive Plattformen aktualisieren, wenn sich die verfügbaren Plattformen ändern
  useEffect(() => {
    if (!defaultActivePlatforms) {
      setActivePlatforms(platforms.filter((p) => p.isActive).map((p) => p.id));
    }
  }, [platforms, defaultActivePlatforms]);

  // Suche durchführen
  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const searchResults = await onSearch(query, activePlatforms, filters);
      setResults(searchResults);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Suche fehlgeschlagen.';
      setError(errorMessage);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Suche bei Enter-Taste durchführen
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Plattform aktivieren/deaktivieren
  const togglePlatform = (platformId: string) => {
    const newActivePlatforms = activePlatforms.includes(platformId)
      ? activePlatforms.filter((id) => id !== platformId)
      : [...activePlatforms, platformId];

    setActivePlatforms(newActivePlatforms);

    if (onPlatformsChange) {
      onPlatformsChange(newActivePlatforms);
    }
  };

  // Filter ändern
  const handleFilterChange = (key: string, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Alle Plattformen aktivieren
  const selectAllPlatforms = () => {
    const allPlatformIds = platforms.map((p) => p.id);
    setActivePlatforms(allPlatformIds);

    if (onPlatformsChange) {
      onPlatformsChange(allPlatformIds);
    }
  };

  // Alle Plattformen deaktivieren
  const deselectAllPlatforms = () => {
    setActivePlatforms([]);

    if (onPlatformsChange) {
      onPlatformsChange([]);
    }
  };

  // Nur vertrauenswürdige Plattformen aktivieren
  const selectTrustedPlatforms = () => {
    const trustedPlatformIds = platforms.filter((p) => p.isTrusted).map((p) => p.id);

    setActivePlatforms(trustedPlatformIds);

    if (onPlatformsChange) {
      onPlatformsChange(trustedPlatformIds);
    }
  };

  // Suchergebnis anklicken
  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    } else {
      window.open(result.url, '_blank');
    }
  };

  // Datum formatieren
  const formatDate = (date?: Date): string => {
    if (!date) return '';

    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Icon für Ergebnistyp
  const getResultTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'audio':
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        );
      case 'video':
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        );
      case 'image':
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case 'post':
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        );
      case 'user':
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
    }
  };

  return (
    <div className={className}>
      {/* Suchleiste */}
      <div className="mb-4">
        <div className="flex">
          <div className="relative flex-1">
            <Input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="pr-10"
            />

            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <Button
            variant="primary"
            onClick={handleSearch}
            disabled={!query.trim() || isSearching}
            className="ml-2"
          >
            {isSearching ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2"
            aria-label="Filter"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Filter und Plattformen */}
      {showFilters && (
        <Card className="mb-4 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter und Plattformen
            </h3>

            <div className="flex space-x-2">
              <button
                onClick={selectAllPlatforms}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                Alle auswählen
              </button>
              <button
                onClick={deselectAllPlatforms}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                Alle abwählen
              </button>
              <button
                onClick={selectTrustedPlatforms}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                Nur vertrauenswürdige
              </button>
            </div>
          </div>

          {/* Plattformen */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Plattformen
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    activePlatforms.includes(platform.id)
                      ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => togglePlatform(platform.id)}
                >
                  {platform.logoUrl ? (
                    <img
                      src={platform.logoUrl}
                      alt={platform.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold mr-2">
                      {platform.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {platform.name}
                  </span>

                  {platform.isTrusted && (
                    <svg
                      className="w-4 h-4 ml-1 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inhaltstyp-Filter */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Inhaltstyp
            </h4>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('type', 'all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === 'all' || !filters.type
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Alle
              </button>
              <button
                onClick={() => handleFilterChange('type', 'audio')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === 'audio'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Audio
              </button>
              <button
                onClick={() => handleFilterChange('type', 'video')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === 'video'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Video
              </button>
              <button
                onClick={() => handleFilterChange('type', 'image')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === 'image'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Bild
              </button>
              <button
                onClick={() => handleFilterChange('type', 'post')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === 'post'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Beitrag
              </button>
              <button
                onClick={() => handleFilterChange('type', 'user')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Benutzer
              </button>
            </div>
          </div>

          {/* Sortierung */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sortierung
            </h4>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('sort', 'relevance')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.sort === 'relevance' || !filters.sort
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Relevanz
              </button>
              <button
                onClick={() => handleFilterChange('sort', 'date')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.sort === 'date'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Datum
              </button>
              <button
                onClick={() => handleFilterChange('sort', 'platform')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.sort === 'platform'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Plattform
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Fehleranzeige */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
          <p className="font-medium">Fehler bei der Suche:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Suchergebnisse */}
      {results.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {results.length} Ergebnisse für "{query}"
          </p>

          {results.map((result) => (
            <Card
              key={result.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleResultClick(result)}
            >
              <div className="flex">
                {/* Thumbnail */}
                {result.thumbnailUrl ? (
                  <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden mr-4">
                    <img
                      src={result.thumbnailUrl}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-md bg-gray-200 dark:bg-gray-700 mr-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    {getResultTypeIcon(result.type)}
                  </div>
                )}

                {/* Inhalt */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {result.title}
                      </h3>

                      <div className="flex items-center mt-1">
                        {/* Plattform */}
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          {result.platform.logoUrl ? (
                            <img
                              src={result.platform.logoUrl}
                              alt={result.platform.name}
                              className="w-4 h-4 rounded-full mr-1"
                            />
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold mr-1">
                              {result.platform.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span>{result.platform.name}</span>
                        </div>

                        {/* Typ */}
                        <div className="flex items-center ml-3 text-sm text-gray-500 dark:text-gray-400">
                          <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mx-1" />
                          <span className="capitalize">
                            {result.type === 'audio' && 'Audio'}
                            {result.type === 'video' && 'Video'}
                            {result.type === 'image' && 'Bild'}
                            {result.type === 'post' && 'Beitrag'}
                            {result.type === 'user' && 'Benutzer'}
                            {result.type === 'other' && 'Sonstiges'}
                          </span>
                        </div>

                        {/* Datum */}
                        {result.createdAt && (
                          <div className="flex items-center ml-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mx-1" />
                            <span>{formatDate(result.createdAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Relevanz */}
                    {result.relevance !== undefined && (
                      <div className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300">
                        {result.relevance}%
                      </div>
                    )}
                  </div>

                  {/* Beschreibung */}
                  {result.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {result.description}
                    </p>
                  )}

                  {/* Ersteller */}
                  {result.creator && (
                    <div className="mt-3 flex items-center">
                      {result.creator.avatarUrl ? (
                        <img
                          src={result.creator.avatarUrl}
                          alt={result.creator.name}
                          className="w-5 h-5 rounded-full mr-1"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold mr-1">
                          {result.creator.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {result.creator.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : query && !isSearching && !error ? (
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-lg font-medium">Keine Ergebnisse gefunden</p>
          <p className="mt-2">
            Versuchen Sie, Ihre Suchbegriffe zu ändern oder andere Plattformen auszuwählen.
          </p>
        </div>
      ) : null}
    </div>
  );
};
