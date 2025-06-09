/**
 * Gemeinsame Typdefinitionen für die Media-Komponenten.
 */

/**
 * Unterstützte Player-Ereignisse
 */
/**
 * Mögliche Ereignisse eines HTMLMediaElement.
 */
export type MediaEventType =
  | 'play'
  | 'pause'
  | 'ended'
  | 'timeUpdate'
  | 'volumeChange'
  | 'seeked'
  | 'loadedMetadata'
  | 'error';

/**
 * Quelle für Medieninhalte. Kann entweder eine URL oder eine lokale Datei sein.
 */
export type MediaSrc = string | File;

/**
 * Zustand des Players
 */
export interface PlayerState {
  /** Ob aktuell abgespielt wird */
  isPlaying: boolean;
  /** Aktuelle Position in Sekunden */
  currentTime: number;
  /** Gesamtdauer des Mediums in Sekunden */
  duration: number;
  /** Lautstärke (0-1) */
  volume: number;
  /** Ob der Player stummgeschaltet ist */
  muted: boolean;
  /** Ladevorgang aktiv */
  loading: boolean;
  /** Buffering aktiv */
  buffering: boolean;
  /** Vollbildmodus */
  fullscreen: boolean;
  /** Fehlermeldung falls vorhanden */
  error?: string;
}

/**
 * Konfiguration für die ImageGallery bzw. das MediaGrid
 */
export interface GalleryConfig {
  /** Anzahl der Spalten */
  columns: 1 | 2 | 3 | 4 | 5 | 6;
  /** Abstand zwischen den Elementen */
  gap: 'none' | 'small' | 'medium' | 'large';
  /** Responsive Layout verwenden */
  responsive?: boolean;
}
