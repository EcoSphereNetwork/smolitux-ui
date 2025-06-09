// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState, useRef, useEffect } from 'react';
import type { MediaSrc } from '../../types';

export interface VideoPlayerProps {
  /** Quelle der Videodatei */
  src: MediaSrc;
  /** Poster-Bild URL */
  poster?: string;
  /** Titel des Videos */
  title?: string;
  /** Automatisch abspielen */
  autoPlay?: boolean;
  /** Loop aktivieren */
  loop?: boolean;
  /** Anfangsvolumen (0-1) */
  volume?: number;
  /** Kontrollen anzeigen */
  controls?: boolean;
  /** Vollbildmodus erlauben */
  allowFullscreen?: boolean;
  /** Callback bei Wiedergabestart */
  onPlay?: () => void;
  /** Callback bei Wiedergabepause */
  onPause?: () => void;
  /** Callback bei Wiedergabeende */
  onEnded?: () => void;
  /** Callback bei Zeitaktualisierung */
  onTimeUpdate?: (currentTime: number) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * VideoPlayer-Komponente für die Wiedergabe von Videoinhalten
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  autoPlay = false,
  loop = false,
  volume = 0.8,
  controls = true,
  allowFullscreen = true,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [srcUrl, setSrcUrl] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Quelle aufbereiten (String oder File)
  useEffect(() => {
    if (typeof src === 'string') {
      setSrcUrl(src);
      return;
    }
    const url = URL.createObjectURL(src);
    setSrcUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [src]);

  // Initialisierung
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = currentVolume;
    video.loop = loop;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      setIsBuffering(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [loop, currentVolume, onTimeUpdate, onEnded]);

  // Wiedergabesteuerung
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch((error) => {
        console.error('Fehler beim Abspielen:', error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Lautstärkesteuerung
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = isMuted ? 0 : currentVolume;
  }, [currentVolume, isMuted]);

  // Vollbildmodus
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Kontrollen ausblenden nach Inaktivität
  useEffect(() => {
    if (!controls) return;

    const handleMouseMove = () => {
      setIsControlsVisible(true);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseMove);
        container.removeEventListener('mouseleave', () => {});
      }

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [controls, isPlaying]);

  // Wiedergabe starten/pausieren
  const togglePlayPause = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);

    if (newIsPlaying) {
      onPlay?.();
    } else {
      onPause?.();
    }
  };

  // Lautstärke ändern
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Stummschaltung umschalten
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Wiedergabeposition ändern
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Vollbildmodus umschalten
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Zeit formatieren (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black rounded-lg ${className}`}
      onClick={() => {
        if (!controls) return;
        togglePlayPause();
      }}
    >
      {/* Video-Element */}
      <video
        ref={videoRef}
        src={srcUrl}
        poster={poster}
        preload="metadata"
        className="w-full h-full"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Titel */}
      {title && isControlsVisible && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      )}

      {/* Lade-Indikator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Puffer-Indikator */}
      {isBuffering && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play/Pause-Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button
            onClick={togglePlayPause}
            className="p-4 rounded-full bg-white/20 hover:bg-white/30 focus:outline-none"
            aria-label="Play"
          >
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}

      {/* Kontrollen */}
      {controls && isControlsVisible && (
        <div
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fortschrittsbalken */}
          <div className="mb-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200/30 rounded-full appearance-none cursor-pointer"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-white mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Steuerelemente */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={togglePlayPause}
                className="p-2 text-white hover:text-gray-200 focus:outline-none"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 ml-2 text-white hover:text-gray-200 focus:outline-none"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : currentVolume}
                onChange={handleVolumeChange}
                className="w-20 h-2 ml-2 bg-gray-200/30 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {allowFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="p-2 text-white hover:text-gray-200 focus:outline-none"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
