// packages/@smolitux/core/src/components/MediaPlayer/MediaPlayer.tsx
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

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
}

/**
 * MediaPlayer-Komponente für Audio- und Videowiedergabe
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
    ...rest
  } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Expose the media element ref through the forwarded ref
  useImperativeHandle(ref, () => {
    if (type === 'audio') {
      return audioRef.current as unknown as HTMLDivElement;
    } else {
      return videoRef.current as unknown as HTMLDivElement;
    }
  });

  // Render sources
  const renderSources = () => {
    if (!sources || sources.length === 0) return null;
    
    return sources.map((source, index) => (
      <source
        key={`source-${index}`}
        src={source.src}
        type={source.type}
        data-testid="source-element"
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
        data-testid="track-element"
      />
    ));
  };

  // Style props
  const styleProps: React.CSSProperties = {};
  if (width) styleProps.width = width;
  if (height) styleProps.height = height;

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      data-testid="media-player"
      style={styleProps}
      {...rest}
    >
      {type === 'audio' ? (
        <audio
          ref={audioRef}
          data-testid="audio-element"
          className="w-full"
          src={src}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onVolumeChange={onVolumeChange}
          onPlay={onPlay}
          onPause={onPause}
        >
          {renderSources()}
          {renderTracks()}
        </audio>
      ) : (
        <video
          ref={videoRef}
          data-testid="video-element"
          className="w-full h-full"
          src={src}
          poster={poster}
          controls={controls}
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
        >
          {renderSources()}
          {renderTracks()}
        </video>
      )}
      
      {controls && !hideControls && (
        <div data-testid="media-controls" className="absolute bottom-0 left-0 right-0">
          <div 
            data-testid="progress-bar" 
            ref={progressBarRef} 
            className="h-1 bg-gray-600 w-full"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPosition = (e.clientX - rect.left) / rect.width;
              
              if (type === 'audio' && audioRef.current) {
                audioRef.current.currentTime = clickPosition * (audioRef.current.duration || 0);
              } else if (videoRef.current) {
                videoRef.current.currentTime = clickPosition * (videoRef.current.duration || 0);
              }
            }}
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPosition = (e.clientX - rect.left) / rect.width;
              
              if (type === 'audio' && audioRef.current) {
                audioRef.current.currentTime = clickPosition * (audioRef.current.duration || 0);
              } else if (videoRef.current) {
                videoRef.current.currentTime = clickPosition * (videoRef.current.duration || 0);
              }
            }}
          >
            <div className="h-full bg-primary-500" style={{ width: '0%' }}></div>
          </div>
          <div className="flex items-center p-2">
            <button 
              aria-label="Play" 
              className="mr-2"
              onClick={() => {
                if (type === 'audio' && audioRef.current) {
                  audioRef.current.play();
                } else if (videoRef.current) {
                  videoRef.current.play();
                }
              }}
            >▶</button>
            <button 
              aria-label="Pause" 
              className="mr-2"
              onClick={() => {
                if (type === 'audio' && audioRef.current) {
                  audioRef.current.pause();
                } else if (videoRef.current) {
                  videoRef.current.pause();
                }
              }}
            >⏸</button>
            <button 
              aria-label="Mute" 
              className="mr-2"
              onClick={() => {
                if (type === 'audio' && audioRef.current) {
                  audioRef.current.muted = true;
                } else if (videoRef.current) {
                  videoRef.current.muted = true;
                }
              }}
            >🔇</button>
            <button 
              aria-label="Unmute" 
              className="mr-2 hidden"
              onClick={() => {
                if (type === 'audio' && audioRef.current) {
                  audioRef.current.muted = false;
                } else if (videoRef.current) {
                  videoRef.current.muted = false;
                }
              }}
            >🔊</button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              defaultValue="1" 
              aria-label="Volume" 
              className="w-24 mr-2"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (type === 'audio' && audioRef.current) {
                  audioRef.current.volume = value;
                } else if (videoRef.current) {
                  videoRef.current.volume = value;
                }
              }}
            />
            <button 
              aria-label="Enter fullscreen"
              onClick={() => {
                if (containerRef.current) {
                  containerRef.current.requestFullscreen();
                }
              }}
            >⛶</button>
          </div>
        </div>
      )}
    </div>
  );
});

MediaPlayer.displayName = 'MediaPlayer';