// packages/@smolitux/core/src/components/MediaPlayer/MediaPlayer.tsx
import React, { forwardRef, useState, useEffect, useRef } from 'react';
// Mock für useTheme
const useTheme = () => ({ themeMode: 'light' });

export type MediaType = 'audio' | 'video';

export interface MediaSource {
  /** URL der Mediendatei */
  src: string;
  /** MIME-Typ der Mediendatei */
  type?: string;
  /** Qualitätsbezeichnung (z.B. "HD", "SD", "HQ") */
  quality?: string;
  /** Bitrate in kbps */
  bitrate?: number;
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

export interface MediaChapter {
  /** Titel des Kapitels */
  title: string;
  /** Startzeit in Sekunden */
  startTime: number;
  /** Endzeit in Sekunden */
  endTime: number;
}

export interface MediaPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onTimeUpdate' | 'onVolumeChange'> {
  /** Typs des Mediums (Audio oder Video) */
  mediaType: MediaType;
  /** Medienquellen (für verschiedene Qualitätsstufen/Formate) */
  sources: MediaSource[];
  /** Untertitel-Tracks */
  tracks?: MediaTrack[];
  /** Kapitel */
  chapters?: MediaChapter[];
  /** Vorschaubild (nur für Video) */
  poster?: string;
  /** Titel des Mediums */
  title?: string;
  /** Künstler/Autor */
  artist?: string;
  /** Album/Sammlung */
  album?: string;
  /** Cover-Bild (für Audio) */
  artwork?: string;
  /** Automatisch abspielen */
  autoplay?: boolean;
  /** Wiederholen */
  loop?: boolean;
  /** Stummschalten */
  muted?: boolean;
  /** Abspielgeschwindigkeit */
  playbackRate?: number;
  /** Als nächstes abzuspielender Inhalt (für kontinuierliche Wiedergabe) */
  nextMedia?: {
    title: string;
    onPlay: () => void;
  };
  /** Als vorheriger Inhalt (für Playlist-Navigation) */
  prevMedia?: {
    title: string;
    onPlay: () => void;
  };
  /** Callback beim Abspielen */
  onPlay?: () => void;
  /** Callback beim Pausieren */
  onPause?: () => void;
  /** Callback beim Ende */
  onEnded?: () => void;
  /** Callback bei Zeitaktualisierung */
  onTimeUpdate?: (currentTime: number) => void;
  /** Callback bei Lautstärkeänderung */
  onVolumeChange?: (volume: number) => void;
  /** Callback bei Fehler */
  onError?: (error: any) => void;
  /** Callback bei Qualitätsänderung */
  onQualityChange?: (quality: string) => void;
  /** Callback bei Änderung des Vollbildmodus */
  onFullscreenChange?: (isFullscreen: boolean) => void;
  /** Zeige Steuerelemente an */
  controls?: boolean;
  /** Startet mit angezeigten Steuerelementen (sonst beim Mouseover) */
  showControlsOnLoad?: boolean;
  /** Größe des Players (nur für Video) */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Formatverhältnis (nur für Video) */
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
  /** Custom Thumbnail-Komponente */
  thumbnailComponent?: React.ReactNode;
  /** Plugins/Erweiterungen */
  plugins?: any[];
}

/**
 * MediaPlayer-Komponente für Audio- und Videowiedergabe
 * 
 * @example
 * ```tsx
 * <MediaPlayer 
 *   mediaType="video"
 *   title="Demo Video"
 *   sources={[{ src: "/demo-video.mp4", type: "video/mp4" }]}
 *   poster="/thumbnail.jpg"
 *   controls
 * />
 * ```
 */
export const MediaPlayer = forwardRef<HTMLDivElement, MediaPlayerProps>(({
  mediaType,
  sources,
  tracks = [],
  chapters = [],
  poster,
  title,
  artist,
  album,
  artwork,
  autoplay = false,
  loop = false,
  muted = false,
  playbackRate = 1,
  nextMedia,
  prevMedia,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  onError,
  onQualityChange,
  onFullscreenChange,
  controls = true,
  showControlsOnLoad = true,
  size = 'md',
  aspectRatio = '16:9',
  thumbnailComponent,
  plugins = [],
  className = '',
  ...rest
}, ref) => {
  const { themeMode } = useTheme();
  
  // Refs für Media-Elemente
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Zustand für den Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(showControlsOnLoad);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(sources[0]?.quality || '');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);
  const [activeChapter, setActiveChapter] = useState<MediaChapter | null>(null);
  
  // Timer für das Ausblenden der Steuerelemente
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Bei Initialisierung oder Änderung der Quelle
  useEffect(() => {
    if (mediaRef.current) {
      // Event-Listener hinzufügen
      const media = mediaRef.current;
      
      const handleLoadedMetadata = () => {
        setDuration(media.duration);
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(media.currentTime);
        onTimeUpdate?.(media.currentTime);
        
        // Aktives Kapitel bestimmen
        if (chapters.length > 0) {
          const currentChapter = chapters.find(
            chapter => media.currentTime >= chapter.startTime && media.currentTime < chapter.endTime
          ) || null;
          
          setActiveChapter(currentChapter);
        }
      };
      
      const handleProgress = () => {
        if (media.buffered.length > 0) {
          setBuffered(media.buffered.end(media.buffered.length - 1));
        }
      };
      
      const handlePlay = () => {
        setIsPlaying(true);
        onPlay?.();
      };
      
      const handlePause = () => {
        setIsPlaying(false);
        onPause?.();
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        onEnded?.();
      };
      
      const handleVolumeChange = () => {
        setVolume(media.volume);
        setIsMuted(media.muted);
        onVolumeChange?.(media.volume);
      };
      
      const handleError = (e: any) => {
        console.error('Media error:', e);
        onError?.(e);
      };
      
      // Event-Listener hinzufügen
      media.addEventListener('loadedmetadata', handleLoadedMetadata);
      media.addEventListener('timeupdate', handleTimeUpdate);
      media.addEventListener('progress', handleProgress);
      media.addEventListener('play', handlePlay);
      media.addEventListener('pause', handlePause);
      media.addEventListener('ended', handleEnded);
      media.addEventListener('volumechange', handleVolumeChange);
      media.addEventListener('error', handleError);
      
      // Initiale Werte setzen
      media.volume = volume;
      media.muted = isMuted;
      media.playbackRate = playbackRate;
      
      // Cleanup
      return () => {
        media.removeEventListener('loadedmetadata', handleLoadedMetadata);
        media.removeEventListener('timeupdate', handleTimeUpdate);
        media.removeEventListener('progress', handleProgress);
        media.removeEventListener('play', handlePlay);
        media.removeEventListener('pause', handlePause);
        media.removeEventListener('ended', handleEnded);
        media.removeEventListener('volumechange', handleVolumeChange);
        media.removeEventListener('error', handleError);
      };
    }
  }, [sources, chapters, onTimeUpdate, onPlay, onPause, onEnded, onVolumeChange, onError, playbackRate]);
  
  // Steuerelemente-Timer
  useEffect(() => {
    if (controls && isPlaying) {
      const startHideTimer = () => {
        if (controlsTimerRef.current) {
          clearTimeout(controlsTimerRef.current);
        }
        
        controlsTimerRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      };
      
      if (showControls) {
        startHideTimer();
      }
      
      return () => {
        if (controlsTimerRef.current) {
          clearTimeout(controlsTimerRef.current);
        }
      };
    }
  }, [controls, showControls, isPlaying]);
  
  // Vollbildmodus überwachen
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = 
        document.fullscreenElement !== null ||
        (document as any).webkitFullscreenElement !== null;
      
      setIsFullscreen(isCurrentlyFullscreen);
      onFullscreenChange?.(isCurrentlyFullscreen);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [onFullscreenChange]);
  
  // Play/Pause umschalten
  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
    }
  };
  
  // Fortschritt ändern (Vorspulen/Zurückspulen)
  const changeProgress = (value: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };
  
  // Zu Zeitpunkt springen
  const seekTo = (time: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = Math.max(0, Math.min(time, duration));
    }
  };
  
  // Lautstärke ändern
  const changeVolume = (value: number) => {
    if (mediaRef.current) {
      mediaRef.current.volume = value;
      setVolume(value);
      
      if (value > 0 && isMuted) {
        mediaRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };
  
  // Stummschalten umschalten
  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Vollbild umschalten
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };
  
  // Qualität ändern
  const changeQuality = (quality: string) => {
    const newSource = sources.find(source => source.quality === quality);
    if (newSource && mediaRef.current) {
      const currentTime = mediaRef.current.currentTime;
      const wasPlaying = !mediaRef.current.paused;
      
      mediaRef.current.src = newSource.src;
      mediaRef.current.currentTime = currentTime;
      
      if (wasPlaying) {
        mediaRef.current.play();
      }
      
      setSelectedQuality(quality);
      onQualityChange?.(quality);
    }
    
    setShowQualityMenu(false);
  };
  
  // Zu Kapitel springen
  const jumpToChapter = (chapter: MediaChapter) => {
    seekTo(chapter.startTime);
  };
  
  // Vorheriges/Nächstes Medium abspielen
  const playPreviousMedia = () => {
    if (prevMedia) {
      prevMedia.onPlay();
    } else {
      // Zum Anfang springen
      seekTo(0);
    }
  };
  
  const playNextMedia = () => {
    if (nextMedia) {
      nextMedia.onPlay();
    } else if (loop) {
      // Zum Anfang springen und neu starten
      seekTo(0);
      mediaRef.current?.play();
    }
  };
  
  // Hilfsfunktion für die Zeitformatierung
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Hilfsfunktion für Mausposition auf Fortschrittsbalken
  const handleProgressBarHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const time = position * duration;
      setHoveredTime(time);
    }
  };
  
  // Auf Größe basierte Styles
  const sizeStyles = {
    sm: {
      width: '320px',
      height: mediaType === 'video' ? '180px' : '60px'
    },
    md: {
      width: '480px',
      height: mediaType === 'video' ? '270px' : '80px'
    },
    lg: {
      width: '640px',
      height: mediaType === 'video' ? '360px' : '100px'
    },
    full: {
      width: '100%',
      height: mediaType === 'video' ? 'auto' : '120px'
    }
  };
  
  // Seitenverhältnis (für Video)
  const aspectRatioStyles: Record<string, string> = {
    '16:9': 'pb-[56.25%]', // 9/16 = 0.5625
    '4:3': 'pb-[75%]',     // 3/4 = 0.75
    '1:1': 'pb-[100%]',    // 1/1 = 1
    '21:9': 'pb-[42.85%]'  // 9/21 = 0.4285
  };
  
  // Icon-Komponenten
  const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
    </svg>
  );
  
  const PauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
    </svg>
  );
  
  const VolumeHighIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="currentColor" />
    </svg>
  );
  
  const VolumeMuteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.34 2.93L2.93 4.34L7.29 8.7L7 9H3V15H7L12 20V13.41L16.18 17.59C15.69 17.97 15.16 18.29 14.58 18.53V20.71C15.85 20.29 17 19.5 17.97 18.49L19.66 20.18L21.07 18.77L4.34 2.93ZM12 4L9.91 6.09L12 8.18V4ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.62 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.5 12.43 16.5 12.21 16.5 12Z" fill="currentColor" />
    </svg>
  );
  
  const FullscreenIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor" />
    </svg>
  );
  
  const FullscreenExitIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16H8V19H10V14H5V16ZM8 8H5V10H10V5H8V8ZM14 19H16V16H19V14H14V19ZM16 8V5H14V10H19V8H16Z" fill="currentColor" />
    </svg>
  );
  
  const SettingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.4 21.19L14.76 18.65C15.35 18.41 15.89 18.09 16.38 17.71L18.77 18.67C18.99 18.75 19.24 18.67 19.36 18.45L21.28 15.13C21.4 14.91 21.34 14.66 21.16 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor" />
    </svg>
  );
  
  const PrevIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6H8V18H6V6ZM9.5 12L18 18V6L9.5 12Z" fill="currentColor" />
    </svg>
  );
  
  const NextIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z" fill="currentColor" />
    </svg>
  );
  
  return (
    <div 
      ref={(el) => {
        // Combine refs
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
        if (containerRef) {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
      }}
      className={`
        smolitux-media-player relative overflow-hidden bg-black text-white
        ${className}
      `}
      style={size === 'full' && mediaType === 'video' ? {} : sizeStyles[size]}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }}
      onMouseMove={() => {
        if (controls) {
          setShowControls(true);
          
          if (controlsTimerRef.current) {
            clearTimeout(controlsTimerRef.current);
          }
          
          if (isPlaying) {
            controlsTimerRef.current = setTimeout(() => {
              setShowControls(false);
            }, 3000);
          }
        }
      }}
      {...rest}
    >
      {/* Video-Inhalt */}
      {mediaType === 'video' && (
        <div className={`relative ${size === 'full' ? aspectRatioStyles[aspectRatio] : ''}`}>
          {/* Video-Element */}
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            className={`absolute top-0 left-0 w-full h-full object-contain bg-black ${controls && !showControls ? 'cursor-none' : ''}`}
            poster={poster}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            playsInline
            onClick={togglePlay}
          >
            {sources.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))}
            {tracks.map((track, index) => (
              <track 
                key={index}
                src={track.src}
                kind={track.kind || 'subtitles'}
                srcLang={track.srclang}
                label={track.label}
                default={track.default}
              />
            ))}
            Your browser does not support the video tag.
          </video>
          
          {/* Thumbnail/Poster-Overlay */}
          {!isPlaying && thumbnailComponent && (
            <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center">
              {thumbnailComponent}
            </div>
          )}
          
          {/* Center Play Button (Big) */}
          {!isPlaying && (
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20
                         bg-black bg-opacity-50 rounded-full p-4 cursor-pointer"
              onClick={togglePlay}
            >
              <PlayIcon />
            </div>
          )}
        </div>
      )}
      
      {/* Audio-Inhalt */}
      {mediaType === 'audio' && (
        <div className="flex items-center">
          {/* Album Cover */}
          {artwork && (
            <div className="flex-shrink-0 mr-4">
              <img 
                src={artwork} 
                alt={`${title || 'Audio'} cover`} 
                className="w-16 h-16 rounded-md object-cover"
              />
            </div>
          )}
          
          {/* Audio-Element (versteckt) */}
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            className="hidden"
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
          >
            {sources.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))}
            Your browser does not support the audio tag.
          </audio>
          
          {/* Metadaten */}
          <div className="flex-grow">
            {title && <div className="font-medium text-white">{title}</div>}
            {artist && <div className="text-sm text-gray-300">{artist}</div>}
            {album && <div className="text-xs text-gray-400">{album}</div>}
          </div>
        </div>
      )}
      
      {/* Steuerelemente */}
      {controls && showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300">
          {/* Obere Zeile mit Titel und Einstellungen */}
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium truncate max-w-[70%]">
              {title}
              {artist && ` - ${artist}`}
            </div>
            
            {/* Qualitätsauswahl und andere Einstellungen */}
            <div className="relative">
              <button
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="p-1 text-white hover:text-primary-300 focus:outline-none"
                aria-label="Settings"
              >
                <SettingsIcon />
              </button>
              
              {/* Qualitätsauswahl Dropdown */}
              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded shadow-lg p-2 w-32">
                  <div className="text-xs text-gray-400 mb-1 px-2">Quality</div>
                  {sources.filter(s => s.quality).map((source, index) => (
                    <button
                      key={index}
                      className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-800 ${
                        selectedQuality === source.quality ? 'text-primary-400' : 'text-white'
                      }`}
                      onClick={() => changeQuality(source.quality || '')}
                    >
                      {source.quality}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Fortschrittsbalken */}
          <div 
            ref={progressBarRef}
            className="relative h-1 bg-gray-600 rounded cursor-pointer mb-2 group"
            onClick={(e) => {
              if (progressBarRef.current) {
                const rect = progressBarRef.current.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                changeProgress(pos * duration);
              }
            }}
            onMouseMove={handleProgressBarHover}
            onMouseLeave={() => setHoveredTime(null)}
          >
            {/* Gepufferter Bereich */}
            <div 
              className="absolute top-0 left-0 h-full bg-gray-500 rounded"
              style={{ width: `${(buffered / duration) * 100}%` }}
            />
            
            {/* Abgespielter Bereich */}
            <div 
              className="absolute top-0 left-0 h-full bg-primary-500 rounded group-hover:bg-primary-400"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            
            {/* Playhead */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-primary-300 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${(currentTime / duration) * 100}% - 6px)` }}
            />
            
            {/* Zeit-Tooltip */}
            {hoveredTime !== null && (
              <div 
                className="absolute bottom-full mb-2 bg-gray-900 text-white text-xs rounded py-1 px-2 transform -translate-x-1/2 pointer-events-none"
                style={{ left: `${(hoveredTime / duration) * 100}%` }}
              >
                {formatTime(hoveredTime)}
              </div>
            )}
            
            {/* Kapitelmarker */}
            {chapters.map((chapter, index) => (
              <div 
                key={index}
                className="absolute top-0 h-full w-0.5 bg-white opacity-50 hover:opacity-100 cursor-pointer"
                style={{ left: `${(chapter.startTime / duration) * 100}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  jumpToChapter(chapter);
                }}
                title={chapter.title}
              />
            ))}
          </div>
          
          {/* Untere Zeile mit Steuerungen und Zeitanzeige */}
          <div className="flex items-center justify-between">
            {/* Linke Steuerungen */}
            <div className="flex items-center space-x-2">
              {/* Vorheriges Medium */}
              {prevMedia && (
                <button
                  onClick={playPreviousMedia}
                  className="p-1 text-white hover:text-primary-300 focus:outline-none"
                  aria-label="Previous"
                >
                  <PrevIcon />
                </button>
              )}
              
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="p-1 text-white hover:text-primary-300 focus:outline-none"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              
              {/* Nächstes Medium */}
              {nextMedia && (
                <button
                  onClick={playNextMedia}
                  className="p-1 text-white hover:text-primary-300 focus:outline-none"
                  aria-label="Next"
                >
                  <NextIcon />
                </button>
              )}
              
              {/* Lautstärke */}
              <div 
                className="relative"
                onMouseEnter={() => setShowVolumeControl(true)}
                onMouseLeave={() => setShowVolumeControl(false)}
              >
                <button
                  onClick={toggleMute}
                  className="p-1 text-white hover:text-primary-300 focus:outline-none"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeMuteIcon /> : <VolumeHighIcon />}
                </button>
                
                {/* Lautstärke-Slider */}
                {showVolumeControl && (
                  <div className="absolute bottom-full left-0 mb-2 bg-gray-900 rounded shadow-lg p-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => changeVolume(parseFloat(e.target.value))}
                      className="w-24 accent-primary-500"
                    />
                  </div>
                )}
              </div>
              
              {/* Aktives Kapitel anzeigen */}
              {activeChapter && (
                <div className="hidden md:block text-xs text-gray-300 ml-2">
                  {activeChapter.title}
                </div>
              )}
            </div>
            
            {/* Zeitanzeige */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              
              {/* Vollbild-Button (nur für Video) */}
              {mediaType === 'video' && (
                <button
                  onClick={toggleFullscreen}
                  className="p-1 text-white hover:text-primary-300 focus:outline-none"
                  aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay für den Maus-Cursor, wenn keine Steuerelemente angezeigt werden */}
      {controls && isPlaying && !showControls && (
        <div 
          className="absolute inset-0 cursor-none" 
          onClick={togglePlay}
        />
      )}
      
      {/* Fehlermeldung */}
      {mediaRef.current?.error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-white text-center p-4">
            <div className="text-red-500 font-bold mb-2">Fehler beim Abspielen des Mediums</div>
            <div className="text-sm">{mediaRef.current.error.message}</div>
          </div>
        </div>
      )}
      
      {/* Animation-Stile */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .smolitux-media-player {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
});

MediaPlayer.displayName = 'MediaPlayer';

export default MediaPlayer;
