import React, { useState, useRef, useEffect } from 'react';

export interface AudioPlayerProps {
  /** URL der Audiodatei */
  src: string;
  /** Titel des Tracks */
  title?: string;
  /** Künstler */
  artist?: string;
  /** Album */
  album?: string;
  /** Cover-Bild URL */
  coverImage?: string;
  /** Automatisch abspielen */
  autoPlay?: boolean;
  /** Loop aktivieren */
  loop?: boolean;
  /** Anfangsvolumen (0-1) */
  volume?: number;
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
 * AudioPlayer-Komponente für die Wiedergabe von Audioinhalten
 */
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  artist,
  album,
  coverImage,
  autoPlay = false,
  loop = false,
  volume = 0.8,
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
  const [isLoading, setIsLoading] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Initialisierung
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = currentVolume;
    audio.loop = loop;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate?.(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [loop, currentVolume, onTimeUpdate, onEnded]);
  
  // Wiedergabesteuerung
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.play().catch(error => {
        console.error('Fehler beim Abspielen:', error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  
  // Lautstärkesteuerung
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = isMuted ? 0 : currentVolume;
  }, [currentVolume, isMuted]);
  
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
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  // Zeit formatieren (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={`flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}>
      {/* Audio-Element */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        autoPlay={autoPlay}
        loop={loop}
      />
      
      {/* Cover und Metadaten */}
      <div className="flex items-center mb-4">
        {coverImage && (
          <div className="w-16 h-16 mr-4">
            <img
              src={coverImage}
              alt={`Cover für ${title}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
        
        <div className="flex-1">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {artist && <p className="text-sm text-gray-600 dark:text-gray-300">{artist}</p>}
          {album && <p className="text-xs text-gray-500 dark:text-gray-400">{album}</p>}
        </div>
      </div>
      
      {/* Fortschrittsbalken */}
      <div className="mb-2">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
          disabled={isLoading}
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Steuerelemente */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            disabled={isLoading}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={toggleMute}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
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
            className="w-20 h-2 ml-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};