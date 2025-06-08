// packages/@smolitux/core/src/components/MediaPlayer/MediaPlayer.improved.tsx
import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';

// Versuche den Theme-Import, mit Fallback für Tests und Entwicklung
let useTheme: () => { themeMode: string; colors?: Record<string, unknown> };
try {
  useTheme = require('@smolitux/theme').useTheme;
} catch (e) {
  // Fallback für Tests und Entwicklung
  useTheme = () => ({ themeMode: 'light', colors: { primary: { 500: '#3182ce' } } });
}

export interface MediaSource {
  /** URL der Mediendatei */
  src: string;
  /** MIME-Typ der Mediendatei */
  type?: string;
}

export interface MediaTrack {
  /** URL der Untertiteldatei */
  src: string;
  /** Sprachcode (z.B. "de", "en") */
  srclang: string;
  /** Beschreibung (z.B. "Deutsch", "English") */
  label: string;
  /** Ist der Track standardmäßig aktiviert? */
  default?: boolean;
  /** Art des Tracks (z.B. "subtitles", "captions") */
  kind?: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
}

export interface MediaPlayerProps {
  /** URL der Mediendatei */
  src?: string;
  /** Mehrere Quellen für das Medium */
  sources?: MediaSource[];
  /** Untertitel und andere Tracks */
  tracks?: MediaTrack[];
  /** Typ des Mediums (Audio oder Video) */
  type?: 'audio' | 'video';
  /** Vorschaubild für Videos */
  poster?: string;
  /** Steuerelemente anzeigen */
  controls?: boolean;
  /** Steuerelemente ausblenden */
  hideControls?: boolean;
  /** Automatisch abspielen */
  autoPlay?: boolean;
  /** Stummschalten */
  muted?: boolean;
  /** In Schleife abspielen */
  loop?: boolean;
  /** Breite des Players */
  width?: string | number;
  /** Höhe des Players */
  height?: string | number;
  /** Callback bei Ende des Mediums */
  onEnded?: () => void;
  /** Callback bei Zeitaktualisierung */
  onTimeUpdate?: () => void;
  /** Callback bei Lautstärkeänderung */
  onVolumeChange?: () => void;
  /** Callback bei Start des Abspielens */
  onPlay?: () => void;
  /** Callback bei Pause */
  onPause?: () => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Daten-Testid für Tests */
  'data-testid'?: string;
}

/**
 * MediaPlayer-Komponente für Audio- und Videowiedergabe
 *
 * @example
 * ```tsx
 * <MediaPlayer
 *   src="https://example.com/video.mp4"
 *   type="video"
 *   poster="https://example.com/poster.jpg"
 *   controls
 * />
 * ```
 */
export const MediaPlayer = forwardRef<HTMLDivElement, MediaPlayerProps>((props, ref) => {
  const {
    src,
    sources = [],
    tracks = [],
    type = 'video',
    poster,
    controls = true,
    hideControls = false,
    autoPlay = false,
    muted = false,
    loop = false,
    width,
    height,
    onEnded,
    onTimeUpdate,
    onVolumeChange,
    onPlay,
    onPause,
    className = '',
    'data-testid': dataTestId = 'media-player',
    ...rest
  } = props;

  // Theme-Werte
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Expose the media element ref through the forwarded ref
  useImperativeHandle(ref, () => {
    if (type === 'audio') {
      return audioRef.current as unknown as HTMLDivElement;
    } else {
      return videoRef.current as unknown as HTMLDivElement;
    }
  });

  // Aktualisiere den Fortschrittsbalken
  useEffect(() => {
    const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
    if (!mediaElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(mediaElement.currentTime);
      setDuration(mediaElement.duration || 0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      setIsMuted(mediaElement.muted);
      setVolume(mediaElement.volume);
    };

    mediaElement.addEventListener('timeupdate', handleTimeUpdate);
    mediaElement.addEventListener('play', handlePlay);
    mediaElement.addEventListener('pause', handlePause);
    mediaElement.addEventListener('volumechange', handleVolumeChange);

    return () => {
      mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
      mediaElement.removeEventListener('play', handlePlay);
      mediaElement.removeEventListener('pause', handlePause);
      mediaElement.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [type]);

  // Überwache Fullscreen-Änderungen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Render sources
  const renderSources = () => {
    if (!sources || sources.length === 0) return null;

    return sources.map((source, index) => (
      <source
        key={`source-${index}`}
        src={source.src}
        type={source.type}
        data-testid={`${dataTestId}-source-${index}`}
      />
    ));
  };

  // Render tracks
  const renderTracks = () => {
    if (!tracks || tracks.length === 0) return null;

    return tracks.map((track, index) => (
      <track
        key={`track-${index}`}
        src={track.src}
        kind={track.kind}
        srcLang={track.srclang}
        label={track.label}
        default={track.default}
        data-testid={`${dataTestId}-track-${index}`}
      />
    ));
  };

  // Medien abspielen
  const playMedia = () => {
    const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
    if (mediaElement) {
      mediaElement.play().catch((error) => {
        console.error('Error playing media:', error);
      });
    }
  };

  // Medien pausieren
  const pauseMedia = () => {
    const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
    if (mediaElement) {
      mediaElement.pause();
    }
  };

  // Medien stummschalten
  const muteMedia = () => {
    const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
    if (mediaElement) {
      mediaElement.muted = true;
      setIsMuted(true);
    }
  };

  // Medien Ton einschalten
  const unmuteMedia = () => {
    const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
    if (mediaElement) {
      mediaElement.muted = false;
      setIsMuted(false);
    }
  };

  // Lautstärke ändern
  const changeVolume = (value: number) => {
    const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
    if (mediaElement) {
      mediaElement.volume = value;
      setVolume(value);
    }
  };

  // Zu Position springen
  const seekTo = (position: number) => {
    const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
    if (mediaElement) {
      mediaElement.currentTime = position * (mediaElement.duration || 0);
    }
  };

  // Vollbildmodus umschalten
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      if (typeof document.exitFullscreen === 'function') {
        try {
          document.exitFullscreen();
        } catch (err) {
          console.error('Error exiting fullscreen:', err);
        }
      }
    } else {
      if (typeof containerRef.current.requestFullscreen === 'function') {
        try {
          containerRef.current.requestFullscreen();
        } catch (err) {
          console.error('Error entering fullscreen:', err);
        }
      }
    }
  };

  // Formatiere Zeit (Sekunden -> MM:SS)
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '00:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Style props
  const styleProps: React.CSSProperties = {};
  if (width) styleProps.width = width;
  if (height) styleProps.height = height;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      data-testid={dataTestId}
      style={styleProps}
      {...rest}
    >
      {type === 'audio' ? (
        <audio
          ref={audioRef}
          data-testid={`${dataTestId}-audio`}
          className="w-full"
          src={src}
          controls={controls && hideControls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onVolumeChange={onVolumeChange}
          onPlay={onPlay}
          onPause={onPause}
          aria-label="Audio player"
        >
          {renderSources()}
          {renderTracks()}
          Your browser does not support the audio element.
        </audio>
      ) : (
        <video
          ref={videoRef}
          data-testid={`${dataTestId}-video`}
          className="w-full h-full"
          src={src}
          poster={poster}
          controls={controls && hideControls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          width={width}
          height={height}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onVolumeChange={onVolumeChange}
          onPlay={onPlay}
          onPause={onPause}
          aria-label="Video player"
        >
          {renderSources()}
          {renderTracks()}
          Your browser does not support the video element.
        </video>
      )}

      {controls && !hideControls && (
        <div
          data-testid={`${dataTestId}-controls`}
          className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
          aria-label="Media controls"
        >
          {/* Progress bar */}
          <div
            data-testid={`${dataTestId}-progress-bar`}
            ref={progressBarRef}
            className="h-2 bg-gray-600 w-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPosition = (e.clientX - rect.left) / rect.width;
              seekTo(clickPosition);
            }}
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPosition = (e.clientX - rect.left) / rect.width;
              seekTo(clickPosition);
            }}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={duration ? (currentTime / duration) * 100 : 0}
          >
            <div
              className="h-full bg-primary-500"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center">
              {/* Play/Pause button */}
              {isPlaying ? (
                <button
                  type="button"
                  aria-label="Pause"
                  className="mr-2 text-white hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1"
                  onClick={pauseMedia}
                  data-testid={`${dataTestId}-pause-button`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Play"
                  className="mr-2 text-white hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1"
                  onClick={playMedia}
                  data-testid={`${dataTestId}-play-button`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              )}

              {/* Mute/Unmute button */}
              {isMuted ? (
                <button
                  type="button"
                  aria-label="Unmute"
                  className="mr-2 text-white hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1"
                  onClick={unmuteMedia}
                  data-testid={`${dataTestId}-unmute-button`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      clipRule="evenodd"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Mute"
                  className="mr-2 text-white hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1"
                  onClick={muteMedia}
                  data-testid={`${dataTestId}-mute-button`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                </button>
              )}

              {/* Volume slider */}
              <div className="relative mr-4 w-24">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  aria-label="Volume"
                  className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  onChange={(e) => changeVolume(parseFloat(e.target.value))}
                  data-testid={`${dataTestId}-volume-slider`}
                />
              </div>

              {/* Time display */}
              <span className="text-white text-sm mr-4" data-testid={`${dataTestId}-time-display`}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center">
              {/* Fullscreen button */}
              <button
                type="button"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="text-white hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1"
                onClick={toggleFullscreen}
                data-testid={`${dataTestId}-fullscreen-button`}
              >
                {isFullscreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 9V4.5M9 9H4.5M15 9H19.5M15 9V4.5M15 15v4.5M15 15h4.5M9 15H4.5M9 15v4.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

MediaPlayer.displayName = 'MediaPlayer';

export default MediaPlayer;
