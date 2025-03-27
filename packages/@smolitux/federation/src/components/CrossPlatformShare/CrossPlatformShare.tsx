import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Modal } from '@smolitux/core';
import { FederatedPlatform } from '../../types';

export interface ShareableContent {
  /** Eindeutige ID des Inhalts */
  id: string;
  /** Titel des Inhalts */
  title?: string;
  /** Textinhalt */
  text?: string;
  /** URL des Inhalts */
  url?: string;
  /** Bild-URL des Inhalts */
  imageUrl?: string;
  /** Typ des Inhalts */
  type: 'text' | 'image' | 'video' | 'audio' | 'link';
  /** Zusätzliche Metadaten zum Inhalt */
  metadata?: Record<string, any>;
}

export interface ShareResult {
  /** Eindeutige ID des Teilvorgangs */
  id: string;
  /** ID der Plattform */
  platformId: string;
  /** ID des geteilten Inhalts */
  contentId: string;
  /** Status des Teilvorgangs */
  status: 'pending' | 'success' | 'error';
  /** URL des geteilten Inhalts auf der Zielplattform */
  sharedUrl?: string;
  /** Fehlermeldung */
  error?: string;
  /** Zeitpunkt des Teilvorgangs */
  timestamp: Date;
}

export interface CrossPlatformShareProps {
  /** Verfügbare Plattformen */
  platforms: FederatedPlatform[];
  /** Zu teilender Inhalt */
  content: ShareableContent;
  /** Callback beim Teilen des Inhalts */
  onShare: (platformIds: string[], content: ShareableContent) => Promise<ShareResult[]>;
  /** Callback beim Schließen des Dialogs */
  onClose?: () => void;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Ist die Komponente als Dialog geöffnet? */
  isOpen?: boolean;
  /** Standardmäßig ausgewählte Plattformen */
  defaultSelectedPlatforms?: string[];
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Titel des Dialogs */
  title?: string;
  /** Beschreibung des Dialogs */
  description?: string;
  /** Kann der Inhalt bearbeitet werden? */
  editable?: boolean;
  /** Maximale Anzahl an Plattformen, die ausgewählt werden können */
  maxPlatforms?: number;
}

/**
 * CrossPlatformShare-Komponente für das Teilen von Inhalten über föderierte Plattformen
 */
export const CrossPlatformShare: React.FC<CrossPlatformShareProps> = ({
  platforms,
  content,
  onShare,
  onClose,
  loading = false,
  isOpen = false,
  defaultSelectedPlatforms = [],
  className = '',
  title = 'Inhalt teilen',
  description = 'Teilen Sie diesen Inhalt auf föderierten Plattformen',
  editable = true,
  maxPlatforms,
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(defaultSelectedPlatforms);
  const [editedContent, setEditedContent] = useState<ShareableContent>(content);
  const [isSharing, setIsSharing] = useState(false);
  const [shareResults, setShareResults] = useState<ShareResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Inhalt aktualisieren, wenn sich die Props ändern
  useEffect(() => {
    setEditedContent(content);
  }, [content]);
  
  // Plattform auswählen/abwählen
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      // Prüfen, ob die maximale Anzahl an Plattformen erreicht ist
      if (maxPlatforms && selectedPlatforms.length >= maxPlatforms) {
        return;
      }
      
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };
  
  // Inhalt teilen
  const handleShare = async () => {
    if (selectedPlatforms.length === 0) {
      setError('Bitte wählen Sie mindestens eine Plattform aus.');
      return;
    }
    
    setIsSharing(true);
    setError(null);
    
    try {
      const results = await onShare(selectedPlatforms, editedContent);
      setShareResults(results);
      
      // Prüfen, ob es Fehler gab
      const hasErrors = results.some(result => result.status === 'error');
      if (hasErrors) {
        setError('Beim Teilen auf einigen Plattformen sind Fehler aufgetreten.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Teilen des Inhalts.';
      setError(errorMessage);
    } finally {
      setIsSharing(false);
    }
  };
  
  // Dialog schließen
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  
  // Text bearbeiten
  const handleTextChange = (text: string) => {
    setEditedContent({
      ...editedContent,
      text,
    });
  };
  
  // Titel bearbeiten
  const handleTitleChange = (title: string) => {
    setEditedContent({
      ...editedContent,
      title,
    });
  };
  
  // Textlänge für eine Plattform prüfen
  const checkTextLength = (platformId: string): boolean => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform || !platform.maxTextLength || !editedContent.text) {
      return true;
    }
    
    return editedContent.text.length <= platform.maxTextLength;
  };
  
  // Inhaltstyp für eine Plattform prüfen
  const checkContentType = (platformId: string): boolean => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform || !platform.supportedContentTypes) {
      return true;
    }
    
    return platform.supportedContentTypes.includes(editedContent.type);
  };
  
  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6" />
        
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
        
        <div className="flex justify-end space-x-2">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    );
  };
  
  // Komponente als Dialog rendern
  if (isOpen) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
      >
        <div className="p-4">
          {loading ? (
            renderPlaceholders()
          ) : (
            <>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {description}
                </p>
              )}
              
              {/* Inhaltsvorschau und Bearbeitung */}
              <div className="mb-6">
                {editable && editedContent.title !== undefined && (
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Titel
                    </label>
                    <Input
                      id="title"
                      value={editedContent.title}
                      onChange={e => handleTitleChange(e.target.value)}
                      placeholder="Titel des Inhalts"
                    />
                  </div>
                )}
                
                {editable && editedContent.text !== undefined && (
                  <div className="mb-4">
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Text
                    </label>
                    <textarea
                      id="text"
                      value={editedContent.text}
                      onChange={e => handleTextChange(e.target.value)}
                      placeholder="Text des Inhalts"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      rows={4}
                    />
                    
                    {/* Textlängenbegrenzung */}
                    {selectedPlatforms.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedPlatforms.map(platformId => {
                          const platform = platforms.find(p => p.id === platformId);
                          if (!platform || !platform.maxTextLength || !editedContent.text) {
                            return null;
                          }
                          
                          const textLength = editedContent.text.length;
                          const maxLength = platform.maxTextLength;
                          const isValid = textLength <= maxLength;
                          
                          return (
                            <span
                              key={platformId}
                              className={`text-xs ${
                                isValid
                                  ? 'text-gray-500 dark:text-gray-400'
                                  : 'text-red-500 dark:text-red-400'
                              }`}
                            >
                              {platform.name}: {textLength}/{maxLength} Zeichen
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Inhaltsvorschau */}
                {!editable && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {editedContent.title && (
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                        {editedContent.title}
                      </h3>
                    )}
                    
                    {editedContent.text && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {editedContent.text}
                      </p>
                    )}
                    
                    {editedContent.imageUrl && (
                      <div className="mt-2 rounded-md overflow-hidden">
                        <img
                          src={editedContent.imageUrl}
                          alt={editedContent.title || 'Bild'}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                    
                    {editedContent.url && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                        {editedContent.url}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Plattformauswahl */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plattformen auswählen
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {platforms
                    .filter(platform => platform.isActive && platform.supportsSharing)
                    .map(platform => {
                      const isSelected = selectedPlatforms.includes(platform.id);
                      const isValidText = checkTextLength(platform.id);
                      const isValidType = checkContentType(platform.id);
                      const isDisabled = !isValidText || !isValidType;
                      
                      return (
                        <div
                          key={platform.id}
                          className={`p-3 rounded-md border cursor-pointer transition-colors ${
                            isSelected
                              ? isDisabled
                                ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                                : 'bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                          } ${isDisabled ? 'opacity-60' : ''}`}
                          onClick={() => !isDisabled && togglePlatform(platform.id)}
                        >
                          <div className="flex items-center">
                            {/* Logo */}
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
                            
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                              {platform.name}
                            </span>
                            
                            {/* Auswahlindikator */}
                            {isSelected && !isDisabled && (
                              <svg className="w-5 h-5 ml-auto text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                            
                            {/* Fehlerindikator */}
                            {isSelected && isDisabled && (
                              <svg className="w-5 h-5 ml-auto text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          
                          {/* Fehlermeldung */}
                          {isSelected && !isValidText && (
                            <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                              Text zu lang
                            </p>
                          )}
                          
                          {isSelected && !isValidType && (
                            <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                              Inhaltstyp nicht unterstützt
                            </p>
                          )}
                        </div>
                      );
                    })}
                </div>
                
                {platforms.filter(platform => platform.isActive && platform.supportsSharing).length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Keine Plattformen verfügbar, die das Teilen unterstützen.
                  </p>
                )}
              </div>
              
              {/* Fehlermeldung */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              {/* Ergebnisse */}
              {shareResults.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ergebnisse
                  </h3>
                  
                  <div className="space-y-2">
                    {shareResults.map(result => {
                      const platform = platforms.find(p => p.id === result.platformId);
                      
                      return (
                        <div
                          key={result.id}
                          className={`p-3 rounded-md ${
                            result.status === 'success'
                              ? 'bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800'
                              : result.status === 'error'
                              ? 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800'
                              : 'bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800'
                          }`}
                        >
                          <div className="flex items-center">
                            {/* Logo */}
                            {platform?.logoUrl ? (
                              <img
                                src={platform.logoUrl}
                                alt={platform.name}
                                className="w-5 h-5 rounded-full mr-2"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold mr-2">
                                {platform?.name.charAt(0).toUpperCase() || '?'}
                              </div>
                            )}
                            
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {platform?.name || 'Unbekannte Plattform'}
                            </span>
                            
                            <span className="ml-auto text-xs font-medium">
                              {result.status === 'success' && (
                                <span className="text-green-600 dark:text-green-400">Erfolgreich</span>
                              )}
                              {result.status === 'error' && (
                                <span className="text-red-600 dark:text-red-400">Fehler</span>
                              )}
                              {result.status === 'pending' && (
                                <span className="text-yellow-600 dark:text-yellow-400">Ausstehend</span>
                              )}
                            </span>
                          </div>
                          
                          {result.status === 'success' && result.sharedUrl && (
                            <a
                              href={result.sharedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-1 block"
                            >
                              Geteilten Inhalt anzeigen
                            </a>
                          )}
                          
                          {result.status === 'error' && result.error && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                              {result.error}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Aktionen */}
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                >
                  Abbrechen
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleShare}
                  disabled={
                    isSharing ||
                    selectedPlatforms.length === 0 ||
                    selectedPlatforms.some(platformId => !checkTextLength(platformId) || !checkContentType(platformId))
                  }
                >
                  {isSharing ? 'Wird geteilt...' : 'Teilen'}
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    );
  }
  
  // Komponente als Card rendern
  return (
    <Card className={className}>
      <div className="p-4">
        {loading ? (
          renderPlaceholders()
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {description}
              </p>
            )}
            
            {/* Inhaltsvorschau und Bearbeitung */}
            <div className="mb-6">
              {editable && editedContent.title !== undefined && (
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Titel
                  </label>
                  <Input
                    id="title"
                    value={editedContent.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    placeholder="Titel des Inhalts"
                  />
                </div>
              )}
              
              {editable && editedContent.text !== undefined && (
                <div className="mb-4">
                  <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Text
                  </label>
                  <textarea
                    id="text"
                    value={editedContent.text}
                    onChange={e => handleTextChange(e.target.value)}
                    placeholder="Text des Inhalts"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    rows={4}
                  />
                  
                  {/* Textlängenbegrenzung */}
                  {selectedPlatforms.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedPlatforms.map(platformId => {
                        const platform = platforms.find(p => p.id === platformId);
                        if (!platform || !platform.maxTextLength || !editedContent.text) {
                          return null;
                        }
                        
                        const textLength = editedContent.text.length;
                        const maxLength = platform.maxTextLength;
                        const isValid = textLength <= maxLength;
                        
                        return (
                          <span
                            key={platformId}
                            className={`text-xs ${
                              isValid
                                ? 'text-gray-500 dark:text-gray-400'
                                : 'text-red-500 dark:text-red-400'
                            }`}
                          >
                            {platform.name}: {textLength}/{maxLength} Zeichen
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              
              {/* Inhaltsvorschau */}
              {!editable && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {editedContent.title && (
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                      {editedContent.title}
                    </h3>
                  )}
                  
                  {editedContent.text && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {editedContent.text}
                    </p>
                  )}
                  
                  {editedContent.imageUrl && (
                    <div className="mt-2 rounded-md overflow-hidden">
                      <img
                        src={editedContent.imageUrl}
                        alt={editedContent.title || 'Bild'}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                  
                  {editedContent.url && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                      {editedContent.url}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {/* Plattformauswahl */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Plattformen auswählen
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {platforms
                  .filter(platform => platform.isActive && platform.supportsSharing)
                  .map(platform => {
                    const isSelected = selectedPlatforms.includes(platform.id);
                    const isValidText = checkTextLength(platform.id);
                    const isValidType = checkContentType(platform.id);
                    const isDisabled = !isValidText || !isValidType;
                    
                    return (
                      <div
                        key={platform.id}
                        className={`p-3 rounded-md border cursor-pointer transition-colors ${
                          isSelected
                            ? isDisabled
                              ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                              : 'bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        } ${isDisabled ? 'opacity-60' : ''}`}
                        onClick={() => !isDisabled && togglePlatform(platform.id)}
                      >
                        <div className="flex items-center">
                          {/* Logo */}
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
                          
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                            {platform.name}
                          </span>
                          
                          {/* Auswahlindikator */}
                          {isSelected && !isDisabled && (
                            <svg className="w-5 h-5 ml-auto text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          
                          {/* Fehlerindikator */}
                          {isSelected && isDisabled && (
                            <svg className="w-5 h-5 ml-auto text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.
                        </div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>
           
           {/* Aktionen */}
           <div className="flex justify-end space-x-2">
             <Button
               variant="outline"
               onClick={handleClose}
             >
               Abbrechen
             </Button>
             
             <Button
               variant="primary"
               onClick={handleShare}
               disabled={isSharing || selectedPlatforms.length === 0 || 
                 selectedPlatforms.some(platformId => !checkTextLength(platformId) || !checkContentType(platformId))}
             >
               {isSharing ? 'Wird geteilt...' : 'Teilen'}
             </Button>
           </div>
         </Card>
       );
     };
