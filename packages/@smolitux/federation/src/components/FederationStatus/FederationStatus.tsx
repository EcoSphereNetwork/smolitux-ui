import React, { useState } from 'react';
import { Card, Button, ProgressBar } from '@smolitux/core';
import { FederatedPlatform } from '../../types';

export interface FederationStatusProps {
  /** Föderierte Plattformen */
  platforms: FederatedPlatform[];
  /** Callback beim Aktualisieren der Plattformliste */
  onRefresh?: () => Promise<void>;
  /** Callback beim Verbinden mit einer Plattform */
  onConnect?: (platformId: string) => Promise<void>;
  /** Callback beim Trennen einer Plattform */
  onDisconnect?: (platformId: string) => Promise<void>;
  /** Callback beim Starten der Synchronisierung */
  onStartSync?: (platformId: string) => Promise<void>;
  /** Callback beim Stoppen der Synchronisierung */
  onStopSync?: (platformId: string) => Promise<void>;
  /** Callback beim Klicken auf eine Plattform */
  onPlatformClick?: (platform: FederatedPlatform) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Föderationsstatus */
  federationStatus?: {
    /** Ist die Föderation aktiv? */
    isActive: boolean;
    /** Anzahl der aktiven Verbindungen */
    activeConnections: number;
    /** Anzahl der verfügbaren Plattformen */
    availablePlatforms: number;
    /** Anzahl der synchronisierten Inhalte */
    syncedContent?: number;
    /** Letzte Aktivität */
    lastActivity?: Date;
    /** Fehler */
    error?: string;
  };
}

/**
 * FederationStatus-Komponente für die Anzeige des Föderationsstatus und der Verbindungen
 */
export const FederationStatus: React.FC<FederationStatusProps> = ({
  platforms,
  onRefresh,
  onConnect,
  onDisconnect,
  onStartSync,
  onStopSync,
  onPlatformClick,
  className = '',
  loading = false,
  federationStatus,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedPlatformId, setExpandedPlatformId] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  // Plattformen nach Status sortieren
  const sortedPlatforms = [...platforms].sort((a, b) => {
    // Verbundene Plattformen zuerst
    if (a.connectionStatus === 'connected' && b.connectionStatus !== 'connected') return -1;
    if (a.connectionStatus !== 'connected' && b.connectionStatus === 'connected') return 1;

    // Dann verbindende Plattformen
    if (a.connectionStatus === 'connecting' && b.connectionStatus !== 'connecting') return -1;
    if (a.connectionStatus !== 'connecting' && b.connectionStatus === 'connecting') return 1;

    // Dann nach Namen
    return a.name.localeCompare(b.name);
  });

  // Plattformliste aktualisieren
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return;

    setIsRefreshing(true);

    try {
      await onRefresh();
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Plattformliste:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Mit Plattform verbinden
  const handleConnect = async (platformId: string) => {
    if (!onConnect) return;

    setActionInProgress(platformId);

    try {
      await onConnect(platformId);
    } catch (error) {
      console.error('Fehler beim Verbinden mit der Plattform:', error);
    } finally {
      setActionInProgress(null);
    }
  };

  // Verbindung zu Plattform trennen
  const handleDisconnect = async (platformId: string) => {
    if (!onDisconnect) return;

    setActionInProgress(platformId);

    try {
      await onDisconnect(platformId);
    } catch (error) {
      console.error('Fehler beim Trennen der Plattform:', error);
    } finally {
      setActionInProgress(null);
    }
  };

  // Synchronisierung starten
  const handleStartSync = async (platformId: string) => {
    if (!onStartSync) return;

    setActionInProgress(platformId);

    try {
      await onStartSync(platformId);
    } catch (error) {
      console.error('Fehler beim Starten der Synchronisierung:', error);
    } finally {
      setActionInProgress(null);
    }
  };

  // Synchronisierung stoppen
  const handleStopSync = async (platformId: string) => {
    if (!onStopSync) return;

    setActionInProgress(platformId);

    try {
      await onStopSync(platformId);
    } catch (error) {
      console.error('Fehler beim Stoppen der Synchronisierung:', error);
    } finally {
      setActionInProgress(null);
    }
  };

  // Plattform anklicken
  const handlePlatformClick = (platform: FederatedPlatform) => {
    if (onPlatformClick) {
      onPlatformClick(platform);
    } else {
      setExpandedPlatformId(expandedPlatformId === platform.id ? null : platform.id);
    }
  };

  // Verbindungsstatus-Badge
  const getConnectionStatusBadge = (status: FederatedPlatform['connectionStatus']) => {
    switch (status) {
      case 'connected':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
            Verbunden
          </span>
        );
      case 'connecting':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
            Verbindet...
          </span>
        );
      case 'disconnected':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400">
            Getrennt
          </span>
        );
      case 'error':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
            Fehler
          </span>
        );
      default:
        return null;
    }
  };

  // Datum formatieren
  const formatDate = (date?: Date): string => {
    if (!date) return 'Nie';

    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Latenz formatieren
  const formatLatency = (latency?: number): string => {
    if (latency === undefined) return 'Unbekannt';

    if (latency < 100) {
      return `${latency} ms (Ausgezeichnet)`;
    } else if (latency < 300) {
      return `${latency} ms (Gut)`;
    } else if (latency < 1000) {
      return `${latency} ms (Mittel)`;
    } else {
      return `${latency} ms (Langsam)`;
    }
  };

  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div
        key={`placeholder-${index}`}
        className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ));
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Föderationsstatus</h3>

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
      </div>

      {/* Föderationsstatus */}
      {federationStatus && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${federationStatus.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</p>
              </div>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {federationStatus.isActive ? 'Aktiv' : 'Inaktiv'}
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Verbindungen</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {federationStatus.activeConnections} / {federationStatus.availablePlatforms}
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Letzte Aktivität
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {formatDate(federationStatus.lastActivity)}
              </p>
            </div>
          </div>

          {federationStatus.error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
              <p className="font-medium">Fehler:</p>
              <p>{federationStatus.error}</p>
            </div>
          )}
        </div>
      )}

      {/* Plattformliste */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {loading ? (
          renderPlaceholders()
        ) : platforms.length === 0 ? (
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
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">Keine Plattformen gefunden</p>
            <p className="mt-2">Es wurden keine föderierten Plattformen gefunden.</p>
          </div>
        ) : (
          sortedPlatforms.map((platform) => (
            <div key={platform.id} className="divide-y divide-gray-200 dark:divide-gray-700">
              <div
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                onClick={() => handlePlatformClick(platform)}
              >
                <div className="flex items-center">
                  {/* Logo */}
                  <div className="flex-shrink-0">
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
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {platform.name}
                      </h4>

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

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{platform.url}</p>
                  </div>

                  {/* Status */}
                  <div className="ml-4">{getConnectionStatusBadge(platform.connectionStatus)}</div>
                </div>
              </div>

              {/* Erweiterte Informationen */}
              {expandedPlatformId === platform.id && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Letzte Synchronisierung
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(platform.lastSync)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Latenz</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatLatency(platform.latency)}
                      </p>
                    </div>

                    {platform.contentCount !== undefined && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Inhalte</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {platform.contentCount.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {platform.userCount !== undefined && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Benutzer</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {platform.userCount.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Synchronisierungsstatus */}
                  {platform.syncStatus && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Synchronisierungsstatus
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {platform.syncStatus.isActive ? 'Aktiv' : 'Inaktiv'}
                          {platform.syncStatus.syncedItems !== undefined &&
                            platform.syncStatus.totalItems !== undefined && (
                              <span className="ml-2">
                                ({platform.syncStatus.syncedItems} /{' '}
                                {platform.syncStatus.totalItems})
                              </span>
                            )}
                        </p>
                      </div>

                      {platform.syncStatus.progress !== undefined && (
                        <ProgressBar
                          value={platform.syncStatus.progress}
                          max={100}
                          className="mb-2"
                        />
                      )}

                      {platform.syncStatus.error && (
                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                          Fehler: {platform.syncStatus.error}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Aktionen */}
                  <div className="flex flex-wrap gap-2">
                    {platform.connectionStatus === 'connected' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDisconnect(platform.id);
                        }}
                        disabled={actionInProgress === platform.id}
                      >
                        {actionInProgress === platform.id ? 'Wird getrennt...' : 'Trennen'}
                      </Button>
                    ) : platform.connectionStatus === 'connecting' ? (
                      <Button variant="outline" size="sm" disabled={true}>
                        Verbindet...
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect(platform.id);
                        }}
                        disabled={
                          actionInProgress === platform.id || platform.connectionStatus === 'error'
                        }
                      >
                        {actionInProgress === platform.id ? 'Wird verbunden...' : 'Verbinden'}
                      </Button>
                    )}

                    {platform.connectionStatus === 'connected' && (
                      <>
                        {platform.syncStatus?.isActive ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStopSync(platform.id);
                            }}
                            disabled={actionInProgress === platform.id}
                          >
                            {actionInProgress === platform.id
                              ? 'Wird gestoppt...'
                              : 'Synchronisierung stoppen'}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartSync(platform.id);
                            }}
                            disabled={actionInProgress === platform.id}
                          >
                            {actionInProgress === platform.id
                              ? 'Wird gestartet...'
                              : 'Synchronisierung starten'}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
