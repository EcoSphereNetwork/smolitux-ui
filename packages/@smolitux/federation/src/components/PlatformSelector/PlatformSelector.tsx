import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '@smolitux/core';

export interface FederatedPlatform {
  /** Eindeutige ID der Plattform */
  id: string;
  /** Name der Plattform */
  name: string;
  /** URL der Plattform */
  url: string;
  /** Logo-URL der Plattform */
  logoUrl?: string;
  /** Beschreibung der Plattform */
  description?: string;
  /** Ist die Plattform aktiv? */
  isActive: boolean;
  /** Ist die Plattform vertrauenswürdig? */
  isTrusted?: boolean;
  /** Anzahl der Inhalte auf der Plattform */
  contentCount?: number;
  /** Anzahl der Benutzer auf der Plattform */
  userCount?: number;
  /** Kategorie der Plattform */
  category?: string;
  /** Zusätzliche Metadaten zur Plattform */
  metadata?: Record<string, any>;
}

export interface PlatformSelectorProps {
  /** Verfügbare Plattformen */
  platforms: FederatedPlatform[];
  /** Ausgewählte Plattformen */
  selectedPlatforms?: string[];
  /** Callback bei Änderung der ausgewählten Plattformen */
  onSelectionChange: (platformIds: string[]) => void;
  /** Callback beim Hinzufügen einer neuen Plattform */
  onAddPlatform?: (url: string) => Promise<void>;
  /** Callback beim Entfernen einer Plattform */
  onRemovePlatform?: (platformId: string) => Promise<void>;
  /** Callback beim Aktualisieren der Plattformliste */
  onRefresh?: () => Promise<void>;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Mehrfachauswahl erlauben? */
  multiSelect?: boolean;
  /** Hinzufügen neuer Plattformen erlauben? */
  allowAddNew?: boolean;
  /** Entfernen von Plattformen erlauben? */
  allowRemove?: boolean;
  /** Kategoriefilter anzeigen? */
  showCategoryFilter?: boolean;
  /** Suchfeld anzeigen? */
  showSearch?: boolean;
  /** Vertrauenswürdigkeitsfilter anzeigen? */
  showTrustFilter?: boolean;
}

/**
 * PlatformSelector-Komponente für die Auswahl und Konfiguration von Föderationsplattformen
 */
export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platforms,
  selectedPlatforms = [],
  onSelectionChange,
  onAddPlatform,
  onRemovePlatform,
  onRefresh,
  className = '',
  loading = false,
  multiSelect = true,
  allowAddNew = true,
  allowRemove = true,
  showCategoryFilter = true,
  showSearch = true,
  showTrustFilter = true,
}) => {
  const [selection, setSelection] = useState<string[]>(selectedPlatforms);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPlatformUrl, setNewPlatformUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showTrustedOnly, setShowTrustedOnly] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verfügbare Kategorien aus den Plattformen extrahieren
  const categories = Array.from(
    new Set(
      platforms
        .map(platform => platform.category)
        .filter(Boolean) as string[]
    )
  ).sort();
  
  // Aktualisiere die Auswahl, wenn sich die Props ändern
  useEffect(() => {
    setSelection(selectedPlatforms);
  }, [selectedPlatforms]);
  
  // Plattformen filtern
  const filteredPlatforms = platforms.filter(platform => {
    // Nach Name oder URL filtern
    const matchesSearch =
      !searchQuery ||
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Nach Kategorie filtern
    const matchesCategory = !activeCategory || platform.category === activeCategory;
    
    // Nach Vertrauenswürdigkeit filtern
    const matchesTrust = !showTrustedOnly || platform.isTrusted;
    
    return matchesSearch && matchesCategory && matchesTrust;
  });
  
  // Plattform auswählen/abwählen
  const togglePlatform = (platformId: string) => {
    let newSelection: string[];
    
    if (multiSelect) {
      // Mehrfachauswahl: Plattform hinzufügen oder entfernen
      newSelection = selection.includes(platformId)
        ? selection.filter(id => id !== platformId)
        : [...selection, platformId];
    } else {
      // Einzelauswahl: Nur diese Plattform auswählen oder Auswahl aufheben
      newSelection = selection.includes(platformId) ? [] : [platformId];
    }
    
    setSelection(newSelection);
    onSelectionChange(newSelection);
  };
  
  // Alle Plattformen auswählen
  const selectAll = () => {
    const allIds = filteredPlatforms.map(platform => platform.id);
    setSelection(allIds);
    onSelectionChange(allIds);
  };
  
  // Alle Plattformen abwählen
  const deselectAll = () => {
    setSelection([]);
    onSelectionChange([]);
  };
  
  // Nur vertrauenswürdige Plattformen auswählen
  const selectTrusted = () => {
    const trustedIds = filteredPlatforms
      .filter(platform => platform.isTrusted)
      .map(platform => platform.id);
    
    setSelection(trustedIds);
    onSelectionChange(trustedIds);
  };
  
  // Neue Plattform hinzufügen
  const handleAddPlatform = async () => {
    if (!onAddPlatform || !newPlatformUrl.trim()) return;
    
    setIsAdding(true);
    setError(null);
    
    try {
      await onAddPlatform(newPlatformUrl);
      setNewPlatformUrl('');
      setShowAddForm(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Hinzufügen der Plattform.';
      setError(errorMessage);
    } finally {
      setIsAdding(false);
    }
  };
  
  // Plattform entfernen
  const handleRemovePlatform = async (platformId: string) => {
    if (!onRemovePlatform) return;
    
    setIsRemoving(platformId);
    
    try {
      await onRemovePlatform(platformId);
      // Aus der Auswahl entfernen
      if (selection.includes(platformId)) {
        const newSelection = selection.filter(id => id !== platformId);
        setSelection(newSelection);
        onSelectionChange(newSelection);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Entfernen der Plattform.';
      console.error(errorMessage);
    } finally {
      setIsRemoving(null);
    }
  };
  
  // Plattformliste aktualisieren
  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    
    try {
      await onRefresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Aktualisieren der Plattformliste.';
      console.error(errorMessage);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div key={`placeholder-${index}`} className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ));
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Föderierte Plattformen
        </h3>
        
        <div className="flex space-x-2">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2"
              aria-label="Plattformliste aktualisieren"
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
          
          {allowAddNew && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Abbrechen' : 'Plattform hinzufügen'}
            </Button>
          )}
        </div>
      </div>
      
      {/* Formular zum Hinzufügen einer neuen Plattform */}
      {showAddForm && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              value={newPlatformUrl}
              onChange={e => setNewPlatformUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
            />
            
            <Button
              variant="primary"
              onClick={handleAddPlatform}
              disabled={!newPlatformUrl.trim() || isAdding}
            >
              {isAdding ? 'Wird hinzugefügt...' : 'Hinzufügen'}
            </Button>
          </div>
          
          {error && (
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Geben Sie die URL einer föderierten Plattform ein, um sie hinzuzufügen.
            Die Plattform muss das ActivityPub-Protokoll unterstützen.
          </p>
        </div>
      )}
      
      {/* Filter */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4">
        {/* Suchfeld */}
        {showSearch && (
          <div>
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Plattformen durchsuchen..."
              className="w-full"
            />
          </div>
        )}
        
        {/* Filteroptionen */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Kategoriefilter */}
          {showCategoryFilter && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activeCategory === null
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Alle
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activeCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          
          {/* Vertrauenswürdigkeitsfilter */}
          {showTrustFilter && (
            <div className="flex items-center">
              <label className="flex items-center text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTrustedOnly}
                  onChange={() => setShowTrustedOnly(!showTrustedOnly)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                Nur vertrauenswürdige Plattformen
              </label>
            </div>
          )}
        </div>
        
        {/* Auswahloptionen */}
        {multiSelect && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={selectAll}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
            >
              Alle auswählen
            </button>
            <button
              onClick={deselectAll}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
            >
              Alle abwählen
            </button>
            <button
              onClick={selectTrusted}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
            >
              Nur vertrauenswürdige
            </button>
          </div>
        )}
      </div>
      
      {/* Plattformliste */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {loading ? (
          renderPlaceholders()
        ) : filteredPlatforms.length === 0 ? (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">Keine Plattformen gefunden</p>
            <p className="mt-2">
              {searchQuery
                ? 'Keine Plattformen entsprechen Ihren Suchkriterien.'
                : 'Es wurden keine föderierten Plattformen gefunden.'}
            </p>
          </div>
        ) : (
          filteredPlatforms.map(platform => (
            <div
              key={platform.id}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                selection.includes(platform.id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              }`}
            >
              <div className="flex items-start">
                {/* Checkbox für Mehrfachauswahl */}
                <div className="flex-shrink-0 mr-3">
                  <input
                    type="checkbox"
                    checked={selection.includes(platform.id)}
                    onChange={() => togglePlatform(platform.id)}
                    className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                
                {/* Logo */}
                <div className="flex-shrink-0 mr-3">
                  {platform.logoUrl ? (
                    <img
                      src={platform.logoUrl}
                      alt={platform.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-bold">
                      {platform.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Informationen */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {platform.name}
                    </h4>
                    
                    {platform.isTrusted && (
                      <svg className="w-4 h-4 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    
                    {platform.category && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {platform.category}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {platform.url}
                  </p>
                  
                  {platform.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                      {platform.description}
                    </p>
                  )}
                  
                  {/* Statistiken */}
                  <div className="flex items-center mt-2 space-x-4">
                    {platform.contentCount !== undefined && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {platform.contentCount.toLocaleString()} Inhalte
                      </span>
                    )}
                    
                    {platform.userCount !== undefined && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {platform.userCount.toLocaleString()} Benutzer
                      </span>
                    )}
                    
                    {!platform.isActive && (
                      <span className="text-xs text-red-500 dark:text-red-400">
                        Inaktiv
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Aktionen */}
                {allowRemove && onRemovePlatform && (
                  <button
                    onClick={() => handleRemovePlatform(platform.id)}
                    disabled={isRemoving === platform.id}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                    aria-label="Plattform entfernen"
                  >
                    {isRemoving === platform.id ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
        {selection.length > 0 ? (
          <p>
            {selection.length} Plattform{selection.length !== 1 ? 'en' : ''} ausgewählt
          </p>
        ) : (
          <p>Keine Plattformen ausgewählt</p>
        )}
      </div>
    </Card>
  );
};