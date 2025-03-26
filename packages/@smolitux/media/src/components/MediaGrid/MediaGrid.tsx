import React, { useState, useEffect } from 'react';
import { Card } from '@smolitux/core';

export type MediaType = 'audio' | 'video' | 'image' | 'all';

export interface MediaItem {
  /** Eindeutige ID des Medienelements */
  id: string;
  /** Titel des Medienelements */
  title: string;
  /** Beschreibung des Medienelements */
  description?: string;
  /** URL des Medienelements */
  url: string;
  /** Thumbnail-URL des Medienelements */
  thumbnailUrl: string;
  /** Typ des Medienelements */
  type: 'audio' | 'video' | 'image';
  /** Ersteller des Medienelements */
  creator: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  /** Erstellungsdatum des Medienelements */
  createdAt: Date;
  /** Dauer des Medienelements (in Sekunden) */
  duration?: number;
  /** Anzahl der Aufrufe */
  views: number;
  /** Anzahl der Likes */
  likes: number;
  /** Anzahl der Kommentare */
  comments: number;
  /** Tags des Medienelements */
  tags?: string[];
  /** Ist das Medienelement ein Premium-Inhalt? */
  isPremium?: boolean;
}

export interface MediaGridProps {
  /** Medienelemente */
  items: MediaItem[];
  /** Anzahl der Spalten (1-6) */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Abstand zwischen den Elementen */
  gap?: 'none' | 'small' | 'medium' | 'large';
  /** Filteroptionen anzeigen */
  showFilters?: boolean;
  /** Sortieroptionen anzeigen */
  showSorting?: boolean;
  /** Callback beim Klicken auf ein Medienelement */
  onItemClick?: (item: MediaItem) => void;
  /** Callback beim Filtern der Medienelemente */
  onFilter?: (type: MediaType, tags: string[]) => void;
  /** Callback beim Sortieren der Medienelemente */
  onSort?: (sortBy: string, order: 'asc' | 'desc') => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Anzahl der Platzhalter im Ladezustand */
  loadingPlaceholders?: number;
}

/**
 * MediaGrid-Komponente für die Anzeige von Medienelementen in einem Raster
 */
export const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  columns = 3,
  gap = 'medium',
  showFilters = false,
  showSorting = false,
  onItemClick,
  onFilter,
  onSort,
  className = '',
  loading = false,
  loadingPlaceholders = 6,
}) => {
  const [activeType, setActiveType] = useState<MediaType>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  
  // Verfügbare Tags aus den Medienelementen extrahieren
  useEffect(() => {
    const tags = new Set<string>();
    
    items.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => tags.add(tag));
      }
    });
    
    setAvailableTags(Array.from(tags).sort());
  }, [items]);
  
  // Typ-Filter ändern
  const handleTypeChange = (type: MediaType) => {
    setActiveType(type);
    
    if (onFilter) {
      onFilter(type, activeTags);
    }
  };
  
  // Tag-Filter ändern
  const handleTagToggle = (tag: string) => {
    const newTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag];
    
    setActiveTags(newTags);
    
    if (onFilter) {
      onFilter(activeType, newTags);
    }
  };
  
  // Sortierung ändern
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    
    if (onSort) {
      onSort(event.target.value, sortOrder);
    }
  };
  
  // Sortierreihenfolge ändern
  const handleOrderChange = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    if (onSort) {
      onSort(sortBy, newOrder);
    }
  };
  
  // Dauer formatieren (mm:ss)
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Anzahl formatieren (1.2k, 3.4M)
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };
  
  // Datum formatieren
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  // CSS-Klassen für das Grid
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
  }[columns];
  
  const gapClasses = {
    none: 'gap-0',
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6',
  }[gap];
  
  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return Array.from({ length: loadingPlaceholders }).map((_, index) => (
      <Card key={`placeholder-${index}`} className="overflow-hidden">
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20 ml-2" />
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
          </div>
        </div>
      </Card>
    ));
  };
  
  return (
    <div className={className}>
      {/* Filter- und Sortieroptionen */}
      {(showFilters || showSorting) && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Filteroptionen */}
          {showFilters && (
            <div className="space-y-4">
              {/* Typ-Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTypeChange('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeType === 'all'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Alle
                </button>
                <button
                  onClick={() => handleTypeChange('audio')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeType === 'audio'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Audio
                </button>
                <button
                  onClick={() => handleTypeChange('video')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeType === 'video'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Video
                </button>
                <button
                  onClick={() => handleTypeChange('image')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeType === 'image'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Bild
                </button>
              </div>
              
              {/* Tag-Filter */}
              {availableTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activeTags.includes(tag)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Sortieroptionen */}
          {showSorting && (
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="createdAt">Datum</option>
                <option value="views">Aufrufe</option>
                <option value="likes">Likes</option>
                <option value="title">Titel</option>
              </select>
              
              <button
                onClick={handleOrderChange}
                className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                aria-label={sortOrder === 'asc' ? 'Absteigend sortieren' : 'Aufsteigend sortieren'}
              >
                {sortOrder === 'asc' ? (
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Medienraster */}
      <div className={`grid ${gridClasses} ${gapClasses}`}>
        {loading ? (
          renderPlaceholders()
        ) : items.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <p className="text-lg font-medium">Keine Medien gefunden</p>
            <p className="mt-2">Versuchen Sie, Ihre Filterkriterien anzupassen oder später wiederzukommen.</p>
          </div>
        ) : (
          items.map(item => (
            <Card
              key={item.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onItemClick?.(item)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Typ-Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white">
                  {item.type === 'audio' && (
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                      </svg>
                      Audio
                    </span>
                  )}
                  {item.type === 'video' && (
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Video
                    </span>
                  )}
                  {item.type === 'image' && (
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                      Bild
                    </span>
                  )}
                </div>
                
                {/* Premium-Badge */}
                {item.isPremium && (
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium bg-yellow-500 text-white">
                    Premium
                  </div>
                )}
                
                {/* Dauer */}
                {item.duration && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white">
                    {formatDuration(item.duration)}
                  </div>
                )}
              </div>
              
              {/* Inhalt */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {item.title}
                </h3>
                
                {item.description && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {item.description}
                  </p>
                )}
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {item.creator.avatarUrl ? (
                      <img
                        src={item.creator.avatarUrl}
                        alt={item.creator.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-bold">
                        {item.creator.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                      {item.creator.name}
                    </span>
                  </div>
                  
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                
                {/* Statistiken */}
                <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {formatCount(item.views)}
                  </span>
                  
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {formatCount(item.likes)}
                  </span>
                  
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {formatCount(item.comments)}
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};