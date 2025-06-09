// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState } from 'react';
import { Card, Button } from '@smolitux/core';
import { usePrivacyConsent } from '../../privacy';
import { PrivacySettings } from '../../privacy';

export type ActivityType =
  | 'post'
  | 'comment'
  | 'like'
  | 'follow'
  | 'mention'
  | 'share'
  | 'upload'
  | 'reward'
  | 'stake'
  | 'unstake';

export interface ActivityItem {
  /** Eindeutige ID der Aktivität */
  id: string;
  /** Typ der Aktivität */
  type: ActivityType;
  /** Benutzer, der die Aktivität ausgeführt hat */
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
  };
  /** Zeitpunkt der Aktivität */
  timestamp: Date;
  /** Ziel der Aktivität (z.B. Post, Benutzer, etc.) */
  target?: {
    id: string;
    type: 'post' | 'comment' | 'user' | 'media';
    title?: string;
    content?: string;
    thumbnailUrl?: string;
  };
  /** Zusätzliche Metadaten zur Aktivität */
  metadata?: Record<string, unknown>;
}

export interface ActivityFeedProps {
  /** Aktivitäten */
  activities: ActivityItem[];
  /** Anzahl der Aktivitäten pro Seite */
  pageSize?: number;
  /** Callback beim Laden weiterer Aktivitäten */
  onLoadMore?: () => Promise<void>;
  /** Callback beim Klicken auf eine Aktivität */
  onActivityClick?: (activity: ActivityItem) => void;
  /** Callback beim Klicken auf einen Benutzer */
  onUserClick?: (userId: string) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Gibt es weitere Aktivitäten zum Laden? */
  hasMore?: boolean;
}

/**
 * ActivityFeed-Komponente für die Anzeige von Benutzeraktivitäten
 */
export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  pageSize = 10,
  onLoadMore,
  onActivityClick,
  onUserClick,
  className = '',
  loading = false,
  hasMore = false,
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const { preferences } = usePrivacyConsent();
  const [showPrivacy, setShowPrivacy] = useState(false);

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

  // Auf Aktivität klicken
  const handleActivityClick = (activity: ActivityItem) => {
    if (onActivityClick) {
      onActivityClick(activity);
    }
  };

  // Auf Benutzer klicken
  const handleUserClick = (userId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    if (onUserClick) {
      onUserClick(userId);
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

  // Icon für Aktivitätstyp
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'post':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500 dark:text-green-400 flex items-center justify-center">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        );
      case 'like':
        return (
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        );
      case 'follow':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500 dark:text-purple-400 flex items-center justify-center">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        );
      case 'mention':
        return (
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
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
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
        );
      case 'share':
        return (
          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/20 text-teal-500 dark:text-teal-400 flex items-center justify-center">
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </div>
        );
      case 'upload':
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-500 dark:text-yellow-400 flex items-center justify-center">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
        );
      case 'reward':
        return (
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 flex items-center justify-center">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case 'stake':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        );
      case 'unstake':
        return (
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 flex items-center justify-center">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  // Aktivitätstext generieren
  const getActivityText = (activity: ActivityItem): string => {
    const { type, user, target, metadata } = activity;

    switch (type) {
      case 'post':
        return `hat einen neuen Beitrag erstellt`;
      case 'comment':
        return `hat einen Kommentar hinterlassen${target ? ` zu "${target.title || 'einem Beitrag'}"` : ''}`;
      case 'like':
        return `hat ${target ? `"${target.title || 'einen Beitrag'}"` : 'etwas'} geliked`;
      case 'follow':
        return `folgt jetzt ${target ? target.title || 'einem Benutzer' : 'dir'}`;
      case 'mention':
        return `hat ${target ? `dich in "${target.title || 'einem Beitrag'}"` : 'dich'} erwähnt`;
      case 'share':
        return `hat ${target ? `"${target.title || 'einen Beitrag'}"` : 'etwas'} geteilt`;
      case 'upload':
        return `hat ${target ? `"${target.title || 'einen Inhalt'}"` : 'einen neuen Inhalt'} hochgeladen`;
      case 'reward':
        return `hat ${metadata?.amount ? `${metadata.amount} ${metadata.tokenSymbol || 'Token'}` : 'eine Belohnung'} erhalten`;
      case 'stake':
        return `hat ${metadata?.amount ? `${metadata.amount} ${metadata.tokenSymbol || 'Token'}` : 'Token'} gestaked`;
      case 'unstake':
        return `hat ${metadata?.amount ? `${metadata.amount} ${metadata.tokenSymbol || 'Token'}` : 'Token'} unstaked`;
      default:
        return 'hat eine Aktivität ausgeführt';
    }
  };

  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return Array.from({ length: pageSize }).map((_, index) => (
      <div
        key={`placeholder-${index}`}
        className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse"
      >
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
    <>
      <Card className={`overflow-hidden ${className}`}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aktivitäten</h3>
          <Button variant="text" size="sm" onClick={() => setShowPrivacy(true)}>
            Privacy
          </Button>
        </div>

        {!preferences.personalization && (
          <div className="p-4 text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
            Personalisierte Inhalte sind deaktiviert. Sie können diese Einstellung im
            Datenschutzmenü ändern.
          </div>
        )}

        {/* Aktivitätsliste */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading && activities.length === 0 ? (
            renderPlaceholders()
          ) : activities.length === 0 ? (
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <p className="text-lg font-medium">Keine Aktivitäten vorhanden</p>
              <p className="mt-2">Es wurden noch keine Aktivitäten aufgezeichnet.</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-start">
                  {/* Benutzeravatar oder Aktivitätsicon */}
                  <div className="flex-shrink-0">
                    {activity.user.avatarUrl ? (
                      <div
                        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                        onClick={(e) => handleUserClick(activity.user.id, e)}
                      >
                        <img
                          src={activity.user.avatarUrl}
                          alt={activity.user.name}
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
                            onClick={(e) => handleUserClick(activity.user.id, e)}
                          >
                            {activity.user.name}
                          </span>{' '}
                          <span className="text-gray-600 dark:text-gray-300">
                            {getActivityText(activity)}
                          </span>
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatTimestamp(activity.timestamp)}
                        </p>
                      </div>
                    </div>

                    {/* Zielinhalt (falls vorhanden) */}
                    {activity.target && activity.target.content && (
                      <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                          {activity.target.content}
                        </p>
                      </div>
                    )}

                    {/* Mediavorschau (falls vorhanden) */}
                    {activity.target && activity.target.thumbnailUrl && (
                      <div className="mt-2 rounded-md overflow-hidden">
                        <img
                          src={activity.target.thumbnailUrl}
                          alt={activity.target.title || 'Medienvorschau'}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}

                    {/* Metadaten (falls vorhanden) */}
                    {activity.metadata && activity.type === 'reward' && (
                      <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <svg
                          className="w-4 h-4 mr-1 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                        </svg>
                        <span>
                          {activity.metadata.amount} {activity.metadata.tokenSymbol || 'Token'}
                        </span>
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
      <PrivacySettings open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
};
