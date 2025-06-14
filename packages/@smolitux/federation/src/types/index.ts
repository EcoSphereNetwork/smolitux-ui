// src/types/index.ts
// (Formerly the content of types.ts)

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
  /** Verbindungsstatus */
  connectionStatus?: 'connected' | 'connecting' | 'disconnected' | 'error';
  /** Latenz in Millisekunden */
  latency?: number;
  /** Letzte Synchronisierung */
  lastSync?: Date;
  /** Synchronisierungsstatus */
  syncStatus?: {
    /** Ist die Synchronisierung aktiv? */
    isActive: boolean;
    /** Fortschritt der Synchronisierung (0-100) */
    progress?: number;
    /** Anzahl der synchronisierten Elemente */
    syncedItems?: number;
    /** Anzahl der zu synchronisierenden Elemente */
    totalItems?: number;
    /** Fehler bei der Synchronisierung */
    error?: string;
  };
  /** Unterstützt die Plattform das Teilen von Inhalten? */
  supportsSharing?: boolean;
  /** Unterstützte Inhaltstypen */
  supportedContentTypes?: ('text' | 'image' | 'video' | 'audio' | 'link')[];
  /** Maximale Textlänge */
  maxTextLength?: number;
  /** Zusätzliche Metadaten zur Plattform */
  metadata?: Record<string, unknown>;
}

// Search related types
export interface SearchResult {
  /** Eindeutige ID des Suchergebnisses */
  id: string;
  /** Titel des Suchergebnisses */
  title: string;
  /** Beschreibung des Suchergebnisses */
  description?: string;
  /** URL des Suchergebnisses */
  url: string;
  /** Thumbnail-URL des Suchergebnisses */
  thumbnailUrl?: string;
  /** Typ des Suchergebnisses */
  type: 'audio' | 'video' | 'image' | 'post' | 'user' | 'other';
  /** Plattform, von der das Suchergebnis stammt */
  platform: {
    id: string;
    name: string;
    url: string;
    logoUrl?: string;
  };
  /** Ersteller des Suchergebnisses */
  creator?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  /** Erstellungsdatum des Suchergebnisses */
  createdAt?: Date;
  /** Relevanz des Suchergebnisses (0-100) */
  relevance?: number;
  /** Zusätzliche Metadaten zum Suchergebnis */
  metadata?: Record<string, unknown>;
}

export interface FederatedSearchProps {
  /** Verfügbare Plattformen */
  platforms: FederatedPlatform[];
  /** Callback bei der Suche */
  onSearch: (
    query: string,
    platforms: string[],
    filters: Record<string, unknown>
  ) => Promise<SearchResult[]>;
  /** Callback beim Klicken auf ein Suchergebnis */
  onResultClick?: (result: SearchResult) => void;
  /** Callback beim Ändern der aktiven Plattformen */
  onPlatformsChange?: (platformIds: string[]) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Platzhaltertext für das Suchfeld */
  placeholder?: string;
  /** Standardmäßig aktive Plattformen */
  defaultActivePlatforms?: string[];
  /** Standardmäßige Suchfilter */
  defaultFilters?: Record<string, unknown>;
}

export type ProtocolCapability = 'messages' | 'presence' | 'search' | 'media';

export interface ProtocolEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export type AuthMethod = 'none' | 'token' | 'basic' | 'oauth2';

export interface SupportedProtocol {
  name: 'ActivityPub' | 'ATProtocol' | 'Matrix' | 'Nostr' | 'RSS';
  version: string;
  capabilities: ProtocolCapability[];
  endpoints: ProtocolEndpoint[];
  authentication: AuthMethod[];
}

export interface ProtocolMessage {
  protocol: SupportedProtocol['name'];
  content: Record<string, unknown>;
}

export interface ProtocolConnection {
  protocol: SupportedProtocol['name'];
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
}

export interface ProtocolErrorHandling {
  retries?: number;
  retryDelay?: number;
}

export interface ProtocolAuth {
  token?: string;
  username?: string;
  password?: string;
}

export interface ProtocolHandlerProps {
  protocols: SupportedProtocol[];
  onMessage?: (message: ProtocolMessage) => void;
  onConnection?: (connection: ProtocolConnection) => void;
  errorHandling?: ProtocolErrorHandling;
  authentication?: ProtocolAuth;
  className?: string;
}
