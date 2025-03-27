import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Input } from '@smolitux/core';
import { FederatedPlatform } from '../../types';


export type ActivityType = 
  | 'Create' 
  | 'Update' 
  | 'Delete' 
  | 'Follow' 
  | 'Add' 
  | 'Remove' 
  | 'Like' 
  | 'Announce' 
  | 'Block' 
  | 'Undo' 
  | 'Accept' 
  | 'Reject' 
  | 'Offer' 
  | 'Invite' 
  | 'View' 
  | 'Listen' 
  | 'Read' 
  | 'Move' 
  | 'Travel' 
  | 'Question';

export type ObjectType = 
  | 'Note' 
  | 'Article' 
  | 'Video' 
  | 'Audio' 
  | 'Image' 
  | 'Page' 
  | 'Event' 
  | 'Place' 
  | 'Profile' 
  | 'Relationship' 
  | 'Tombstone' 
  | 'Collection' 
  | 'OrderedCollection';

export interface ActivityObject {
  /** Eindeutige ID des Objekts */
  id: string;
  /** Typ des Objekts */
  type: ObjectType;
  /** Name des Objekts */
  name?: string;
  /** Inhalt des Objekts */
  content?: string;
  /** URL des Objekts */
  url?: string;
  /** Bild-URL des Objekts */
  image?: string;
  /** Zusammenfassung des Objekts */
  summary?: string;
  /** Veröffentlichungsdatum des Objekts */
  published?: Date;
  /** Aktualisierungsdatum des Objekts */
  updated?: Date;
  /** Zusätzliche Attribute des Objekts */
  [key: string]: any;
}

export interface ActivityActor {
  /** Eindeutige ID des Akteurs */
  id: string;
  /** Typ des Akteurs */
  type: 'Person' | 'Group' | 'Organization' | 'Service' | 'Application';
  /** Name des Akteurs */
  name?: string;
  /** Benutzername des Akteurs */
  preferredUsername?: string;
  /** Zusammenfassung des Akteurs */
  summary?: string;
  /** Bild-URL des Akteurs */
  icon?: string;
  /** URL des Akteurs */
  url?: string;
  /** Zusätzliche Attribute des Akteurs */
  [key: string]: any;
}

export interface ActivityStreamItem {
  /** Eindeutige ID der Aktivität */
  id: string;
  /** Typ der Aktivität */
  type: ActivityType;
  /** Akteur der Aktivität */
  actor: ActivityActor;
  /** Objekt der Aktivität */
  object: ActivityObject;
  /** Ziel der Aktivität */
  target?: ActivityObject;
  /** Ursprung der Aktivität */
  origin?: ActivityObject;
  /** Ergebnis der Aktivität */
  result?: ActivityObject;
  /** Zeitpunkt der Aktivität */
  published: Date;
  /** Plattform, von der die Aktivität stammt */
  platform: {
    id: string;
    name: string;
    url: string;
    logoUrl?: string;
  };
  /** Zusätzliche Attribute der Aktivität */
  [key: string]: any;
}

export interface ActivityStreamProps {
  /** Aktivitäten */
  activities: ActivityStreamItem[];
  /** Anzahl der Aktivitäten pro Seite */
  pageSize?: number;
  /** Callback beim Laden weiterer Aktivitäten */
  onLoadMore?: () => Promise<void>;
  /** Callback beim Klicken auf eine Aktivität */
  onActivityClick?: (activity: ActivityStreamItem) => void;
  /** Callback beim Klicken auf einen Akteur */
  onActorClick?: (actor: ActivityActor) => void;
  /** Callback beim Klicken auf ein Objekt */
  onObjectClick?: (object: ActivityObject) => void;
  /** Callback beim Aktualisieren der Aktivitäten */
  onRefresh?: () => Promise<void>;
  /** Callback beim Filtern der Aktivitäten */
  onFilter?: (filters: Record<string, any>) => Promise<void>;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Gibt es weitere Aktivitäten zum Laden? */
  hasMore?: boolean;
  /** Filteroptionen anzeigen? */
  showFilters?: boolean;
  /** Standardfilter */
  defaultFilters?: Record<string, any>;
}

/**
 * ActivityStream-Komponente für die Anzeige von ActivityPub-Aktivitäten und Interaktionen
 */
export const ActivityStream: React.FC<ActivityStreamProps> = ({
  activities,
  pageSize = 10,
  onLoadMore,
  onActivityClick,
  onActorClick,
  onObjectClick,
  onRefresh,
  onFilter,
  className = '',
  loading = false,
  hasMore = false,
  showFilters = true,
  defaultFilters = {},
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const streamRef = useRef<HTMLDivElement>(null);
  
  // Weitere Aktivitäten laden
  const handleLoadMore = async () => {
    if (!onLoadMore || loadingMore) return;
    
    setLoadingMore(true);
    
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Fehler beim Laden weiterer Aktivitäten:', error);
    } finally {
      setLoadingMore(false);
    }
  };
  
  // Aktivitäten aktualisieren
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return;
    
    setIsRefreshing(true);
    
    try {
      await onRefresh();
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Aktivitäten:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Filter anwenden
  const applyFilters = async () => {
    if (!onFilter) return;
    
    try {
      await onFilter({
        ...filters,
        search: searchQuery,
      });
    } catch (error) {
      console.error('Fehler beim Filtern der Aktivitäten:', error);
    }
  };
  
  // Filter zurücksetzen
  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
    
    if (onFilter) {
      onFilter(defaultFilters);
    }
  };
  
  // Auf Aktivität klicken
  const handleActivityClick = (activity: ActivityStreamItem) => {
    if (onActivityClick) {
      onActivityClick(activity);
    }
  };
  
  // Auf Akteur klicken
  const handleActorClick = (actor: ActivityActor, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (onActorClick) {
      onActorClick(actor);
    }
  };
  
  // Auf Objekt klicken
  const handleObjectClick = (object: ActivityObject, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (onObjectClick) {
      onObjectClick(object);
    }
  };
  
  // Zeitpunkt formatieren
  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    // Weniger als eine Minute
    if (diff < 60 * 1000) {
      return 'Gerade eben';
    }
    
    // Weniger als eine Stunde
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `Vor ${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
    }
    
    // Weniger als ein Tag
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `Vor ${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
    }
    
    // Weniger als eine Woche
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `Vor ${days} ${days === 1 ? 'Tag' : 'Tagen'}`;
    }
    
    // Datum formatieren
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(timestamp);
  };
  
  // Aktivitätstext generieren
  const getActivityText = (activity: ActivityStreamItem): string => {
    const { type, object } = activity;
    
    switch (type) {
      case 'Create':
        return `hat ${getObjectTypeText(object.type)} erstellt`;
      case 'Update':
        return `hat ${getObjectTypeText(object.type)} aktualisiert`;
      case 'Delete':
        return `hat ${getObjectTypeText(object.type)} gelöscht`;
      case 'Follow':
        return `folgt ${object.name || 'jemandem'}`;
      case 'Add':
        return `hat ${getObjectTypeText(object.type)} hinzugefügt`;
      case 'Remove':
        return `hat ${getObjectTypeText(object.type)} entfernt`;
      case 'Like':
        return `gefällt ${getObjectTypeText(object.type)}`;
      case 'Announce':
        return `hat ${getObjectTypeText(object.type)} geteilt`;
      case 'Block':
        return `hat ${object.name || 'jemanden'} blockiert`;
      case 'Undo':
        return `hat eine Aktion rückgängig gemacht`;
      case 'Accept':
        return `hat ${getObjectTypeText(object.type)} akzeptiert`;
      case 'Reject':
        return `hat ${getObjectTypeText(object.type)} abgelehnt`;
      case 'Offer':
        return `bietet ${getObjectTypeText(object.type)} an`;
      case 'Invite':
        return `lädt zu ${getObjectTypeText(object.type)} ein`;
      case 'View':
        return `hat ${getObjectTypeText(object.type)} angesehen`;
      case 'Listen':
        return `hat ${getObjectTypeText(object.type)} angehört`;
      case 'Read':
        return `hat ${getObjectTypeText(object.type)} gelesen`;
      case 'Move':
        return `hat ${getObjectTypeText(object.type)} verschoben`;
      case 'Travel':
        return `ist nach ${object.name || 'irgendwo'} gereist`;
      case 'Question':
        return `hat eine Frage gestellt`;
      default:
        return `hat eine Aktivität ausgeführt`;
    }
  };
  
  // Objekttyp-Text generieren
  const getObjectTypeText = (type: ObjectType): string => {
    switch (type) {
      case 'Note':
        return 'eine Notiz';
      case 'Article':
        return 'einen Artikel';
      case 'Video':
        return 'ein Video';
      case 'Audio':
        return 'einen Audiobeitrag';
      case 'Image':
        return 'ein Bild';
      case 'Page':
        return 'eine Seite';
      case 'Event':
        return 'ein Ereignis';
      case 'Place':
        return 'einen Ort';
      case 'Profile':
        return 'ein Profil';
      case 'Relationship':
        return 'eine Beziehung';
      case 'Tombstone':
        return 'einen gelöschten Inhalt';
      case 'Collection':
        return 'eine Sammlung';
      case 'OrderedCollection':
        return 'eine geordnete Sammlung';
      default:
        return 'einen Inhalt';
    }
  };
  
  // Icon für Aktivitätstyp
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'Create':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      case 'Update':
        return (
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      case 'Delete':
        return (
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        );
      case 'Follow':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500 dark:text-purple-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'Like':
        return (
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        );
      case 'Announce':
        return (
          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/20 text-teal-500 dark:text-teal-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };
  
  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return Array.from({ length: pageSize }).map((_, index) => (
      <div key={`placeholder-${index}`} className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      </div>
    ));
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          ActivityPub Stream
        </h3>
        
        <div className="flex space-x-2">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2"
              aria-label="Aktivitäten aktualisieren"
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
          
          {showFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="p-2"
              aria-label="Filter anzeigen/ausblenden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </Button>
          )}
        </div>
      </div>
      
      {/* Filter */}
      {showFilterPanel && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 space-y-4">
          {/* Suchfeld */}
          <div>
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Aktivitäten durchsuchen..."
              className="w-full"
            />
          </div>
          
          {/* Aktivitätstyp-Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Aktivitätstyp
            </h4>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters({ ...filters, type: undefined })}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  !filters.type
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Alle
              </button>
              
              {['Create', 'Update', 'Delete', 'Follow', 'Like', 'Announce'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilters({ ...filters, type })}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    filters.type === type
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          {/* Objekttyp-Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Objekttyp
            </h4>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters({ ...filters, objectType: undefined })}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  !filters.objectType
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Alle
              </button>
              
              {['Note', 'Article', 'Video', 'Audio', 'Image'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilters({ ...filters, objectType: type })}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    filters.objectType === type
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          {/* Plattform-Filter */}
          {filters.platforms && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Plattformen
              </h4>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({ ...filters, platform: undefined })}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    !filters.platform
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Alle
                </button>
                
                {Array.from(new Set(activities.map(a => a.platform.id))).map(platformId => {
                  const platform = activities.find(a => a.platform.id === platformId)?.platform;
                  if (!platform) return null;
                  
                  return (
                    <button
                      key={platformId}
                      onClick={() => setFilters({ ...filters, platform: platformId })}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        filters.platform === platformId
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {platform.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Filter-Aktionen */}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
            >
              Zurücksetzen
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              onClick={applyFilters}
            >
              Anwenden
            </Button>
          </div>
        </div>
      )}
      
      {/* Aktivitätsliste */}
      <div ref={streamRef} className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
        {loading && activities.length === 0 ? (
          renderPlaceholders()
        ) : activities.length === 0 ? (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <p className="text-lg font-medium">Keine Aktivitäten vorhanden</p>
            <p className="mt-2">Es wurden noch keine ActivityPub-Aktivitäten gefunden.</p>
          </div>
        ) : (
          activities.map(activity => (
            <div
              key={activity.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="flex items-start">
                {/* Akteur-Avatar oder Aktivitätsicon */}
                <div className="flex-shrink-0">
                  {activity.actor.icon ? (
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                      onClick={e => handleActorClick(activity.actor, e)}
                    >
                      <img
                        src={activity.actor.icon}
                        alt={activity.actor.name || activity.actor.preferredUsername || 'Akteur'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    getActivityIcon(activity.type)
                  )}
                </div>
                
                {/* Aktivitätsinhalt */}
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm">
                        <span
                          className="font-medium text-gray-900 dark:text-white hover:underline cursor-pointer"
                          onClick={e => handleActorClick(activity.actor, e)}
                        >
                          {activity.actor.name || activity.actor.preferredUsername || 'Unbekannter Akteur'}
                        </span>{' '}
                        <span className="text-gray-600 dark:text-gray-300">
                          {getActivityText(activity)}
                        </span>
                      </p>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                        <span>{formatTimestamp(activity.published)}</span>
                        <span className="mx-1">•</span>
                        <span className="flex items-center">
                          {activity.platform.logoUrl ? (
                            <img
                              src={activity.platform.logoUrl}
                              alt={activity.platform.name}
                              className="w-3 h-3 rounded-full mr-1"
                            />
                          ) : (
                            <span className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 inline-block mr-1" />
                          )}
                          {activity.platform.name}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Objektinhalt (falls vorhanden) */}
                  {activity.object.content && (
                    <div
                      className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md cursor-pointer"
                      onClick={e => handleObjectClick(activity.object, e)}
                    >
                      {activity.object.name && (
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {activity.object.name}
                        </p>
                      )}
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {activity.object.content}
                      </p>
                    </div>
                  )}
                  
                  {/* Objektbild (falls vorhanden) */}
                  {activity.object.image && (
                    <div
                      className="mt-2 rounded-md overflow-hidden cursor-pointer"
                      onClick={e => handleObjectClick(activity.object, e)}
                    >
                      <img
                        src={activity.object.image}
                        alt={activity.object.name || 'Medienvorschau'}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Lade-Indikator */}
        {loading && activities.length > 0 && (
          <div className="p-4 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary-500 border-r-transparent" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Aktivitäten werden geladen...
            </p>
          </div>
        )}
      </div>
      
      {/* Weitere laden */}
      {!loading && hasMore && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="w-full"
          >
            {loadingMore ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary-500 border-r-transparent mr-2" />
                Wird geladen...
              </>
            ) : (
              'Weitere Aktivitäten laden'
            )}
          </Button>
        </div>
      )}
    </Card>
  );
};
