// packages/@smolitux/core/src/components/MediaPlayer/MediaPlayer.a11y.tsx
import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect, useId } from 'react';

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
  /** Callback bei Fehler */
  onError?: (error: any) => void;
  /** Callback bei Laden des Mediums */
  onLoad?: () => void;
  /** Callback bei Abspielen des Mediums */
  onPlay?: () => void;
  /** Callback bei Pausieren des Mediums */
  onPause?: () => void;
  /** Callback bei Änderung der Abspielposition */
  onTimeUpdate?: () => void;
  /** Callback bei Änderung der Lautstärke */
  onVolumeChange?: () => void;
  /** Zusätzliche CSS-Klasse */
  className?: string;
  /** Zusätzliche Props */
  [key: string]: any;

  /** ARIA-Label für den Player */
  ariaLabel?: string;
  /** ARIA-Labelledby für den Player */
  ariaLabelledby?: string;
  /** ARIA-Describedby für den Player */
  ariaDescribedby?: string;
  /** ARIA-Live für den Player */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** ARIA-Atomic für den Player */
  ariaAtomic?: boolean;
  /** ARIA-Relevant für den Player */
  ariaRelevant?: string;
  /** ARIA-Busy für den Player */
  ariaBusy?: boolean;
  /** ARIA-Roledescription für den Player */
  ariaRoledescription?: string;

  /** Ob Untertitel standardmäßig aktiviert sein sollen */
  defaultCaptionsOn?: boolean;
  /** Ob Audiobeschreibungen standardmäßig aktiviert sein sollen */
  defaultDescriptionsOn?: boolean;
  /** Ob Tastaturkürzel aktiviert sein sollen */
  keyboardShortcuts?: boolean;
  /** Ob Screenreader-Ankündigungen aktiviert sein sollen */
  screenReaderAnnouncements?: boolean;
  /** Ob der Player eine Transkription haben soll */
  transcript?: React.ReactNode;
  /** Ob der Player eine Beschreibung haben soll */
  description?: string;
  /** Ob der Player eine Tastaturhilfe haben soll */
  keyboardHelp?: boolean;
  /** Ob der Player eine Fortschrittsanzeige haben soll */
  progressIndicator?: boolean;
  /** Ob der Player eine Lautstärkeanzeige haben soll */
  volumeIndicator?: boolean;
  /** Ob der Player eine Geschwindigkeitsanzeige haben soll */
  speedIndicator?: boolean;
  /** Ob der Player eine Untertitelanzeige haben soll */
  captionsIndicator?: boolean;
  /** Ob der Player eine Vollbildanzeige haben soll */
  fullscreenIndicator?: boolean;
}

export interface MediaPlayerRef {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  getElement: () => HTMLAudioElement | HTMLVideoElement | null;
}

/**
 * Barrierefreier MediaPlayer für Audio- und Videoinhalte
 *
 * @example
 * ```tsx
 * <MediaPlayerA11y
 *   src="https://example.com/video.mp4"
 *   type="video"
 *   controls
 *   ariaLabel="Beispielvideo"
 *   tracks={[
 *     { src: "/subtitles/de.vtt", srclang: "de", label: "Deutsch", kind: "subtitles", default: true }
 *   ]}
 * />
 * ```
 */
export const MediaPlayerA11y = forwardRef<MediaPlayerRef, MediaPlayerProps>(
  (
    {
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
      onError,
      onLoad,
      onPlay,
      onPause,
      onTimeUpdate,
      onVolumeChange,
      className = '',
      ariaLabel,
      ariaLabelledby,
      ariaDescribedby,
      ariaLive,
      ariaAtomic,
      ariaRelevant,
      ariaBusy,
      ariaRoledescription,
      defaultCaptionsOn = false,
      defaultDescriptionsOn = false,
      keyboardShortcuts = true,
      screenReaderAnnouncements = true,
      transcript,
      description,
      keyboardHelp = true,
      progressIndicator = true,
      volumeIndicator = true,
      speedIndicator = true,
      captionsIndicator = true,
      fullscreenIndicator = true,
      ...rest
    },
    ref
  ) => {
    // Refs
    const audioRef = useRef<HTMLAudioElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressIndicatorRef = useRef<HTMLDivElement>(null);
    const volumeSliderRef = useRef<HTMLInputElement>(null);
    const speedSliderRef = useRef<HTMLSelectElement>(null);
    const captionsButtonRef = useRef<HTMLButtonElement>(null);
    const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
    const transcriptRef = useRef<HTMLDivElement>(null);

    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(muted);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [captionsOn, setCaptionsOn] = useState(defaultCaptionsOn);
    const [descriptionsOn, setDescriptionsOn] = useState(defaultDescriptionsOn);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
    const [announcement, setAnnouncement] = useState('');

    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const playerId = `media-player-${uniqueId}`;
    const descriptionId = `media-description-${uniqueId}`;
    const announcementId = `media-announcement-${uniqueId}`;
    const keyboardHelpId = `media-keyboard-help-${uniqueId}`;
    const transcriptId = `media-transcript-${uniqueId}`;

    // Imperativ-Handle für Ref
    useImperativeHandle(ref, () => ({
      play: () => {
        if (type === 'audio' && audioRef.current) {
          audioRef.current.play();
        } else if (videoRef.current) {
          videoRef.current.play();
        }
      },
      pause: () => {
        if (type === 'audio' && audioRef.current) {
          audioRef.current.pause();
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      stop: () => {
        if (type === 'audio' && audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } else if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
      seek: (time: number) => {
        if (type === 'audio' && audioRef.current) {
          audioRef.current.currentTime = time;
        } else if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      setVolume: (vol: number) => {
        if (type === 'audio' && audioRef.current) {
          audioRef.current.volume = vol;
        } else if (videoRef.current) {
          videoRef.current.volume = vol;
        }
        setVolume(vol);
      },
      mute: () => {
        if (type === 'audio' && audioRef.current) {
          audioRef.current.muted = true;
        } else if (videoRef.current) {
          videoRef.current.muted = true;
        }
        setIsMuted(true);
      },
      unmute: () => {
        if (type === 'audio' && audioRef.current) {
          audioRef.current.muted = false;
        } else if (videoRef.current) {
          videoRef.current.muted = false;
        }
        setIsMuted(false);
      },
      togglePlay: () => {
        if (isPlaying) {
          if (type === 'audio' && audioRef.current) {
            audioRef.current.pause();
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        } else {
          if (type === 'audio' && audioRef.current) {
            audioRef.current.play();
          } else if (videoRef.current) {
            videoRef.current.play();
          }
        }
      },
      toggleMute: () => {
        if (isMuted) {
          if (type === 'audio' && audioRef.current) {
            audioRef.current.muted = false;
          } else if (videoRef.current) {
            videoRef.current.muted = false;
          }
          setIsMuted(false);
        } else {
          if (type === 'audio' && audioRef.current) {
            audioRef.current.muted = true;
          } else if (videoRef.current) {
            videoRef.current.muted = true;
          }
          setIsMuted(true);
        }
      },
      getElement: () => {
        if (type === 'audio') {
          return audioRef.current;
        } else {
          return videoRef.current;
        }
      },
    }));

    // Event-Handler
    const handleTimeUpdate = () => {
      const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
      if (mediaElement) {
        setCurrentTime(mediaElement.currentTime);
        setProgress((mediaElement.currentTime / mediaElement.duration) * 100);
      }

      if (onTimeUpdate) {
        onTimeUpdate();
      }
    };

    const handleLoadedMetadata = () => {
      const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
      if (mediaElement) {
        setDuration(mediaElement.duration);
      }

      if (onLoad) {
        onLoad();
      }

      // Ankündigung für Screenreader
      if (screenReaderAnnouncements) {
        const mediaType = type === 'audio' ? 'Audio' : 'Video';
        setAnnouncement(`${mediaType} geladen. Dauer: ${formatTime(mediaElement?.duration || 0)}.`);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);

      if (onPlay) {
        onPlay();
      }

      // Ankündigung für Screenreader
      if (screenReaderAnnouncements) {
        setAnnouncement('Wiedergabe gestartet.');
      }
    };

    const handlePause = () => {
      setIsPlaying(false);

      if (onPause) {
        onPause();
      }

      // Ankündigung für Screenreader
      if (screenReaderAnnouncements) {
        setAnnouncement('Wiedergabe pausiert.');
      }
    };

    const handleVolumeChange = () => {
      const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
      if (mediaElement) {
        setVolume(mediaElement.volume);
        setIsMuted(mediaElement.muted);
      }

      if (onVolumeChange) {
        onVolumeChange();
      }

      // Ankündigung für Screenreader
      if (screenReaderAnnouncements) {
        if (mediaElement?.muted) {
          setAnnouncement('Ton stummgeschaltet.');
        } else {
          setAnnouncement(`Lautstärke: ${Math.round(mediaElement?.volume * 100)}%.`);
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);

      if (onEnded) {
        onEnded();
      }

      // Ankündigung für Screenreader
      if (screenReaderAnnouncements) {
        setAnnouncement('Wiedergabe beendet.');
      }
    };

    const handleError = (error: any) => {
      if (onError) {
        onError(error);
      }

      // Ankündigung für Screenreader
      if (screenReaderAnnouncements) {
        setAnnouncement('Fehler bei der Wiedergabe.');
      }
    };

    // Tastaturkürzel
    useEffect(() => {
      if (!keyboardShortcuts) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        // Nur reagieren, wenn der Player fokussiert ist
        if (!containerRef.current?.contains(document.activeElement)) return;

        switch (e.key) {
          case ' ':
          case 'k':
            e.preventDefault();
            if (isPlaying) {
              if (type === 'audio' && audioRef.current) {
                audioRef.current.pause();
              } else if (videoRef.current) {
                videoRef.current.pause();
              }
            } else {
              if (type === 'audio' && audioRef.current) {
                audioRef.current.play();
              } else if (videoRef.current) {
                videoRef.current.play();
              }
            }
            break;
          case 'ArrowLeft':
            e.preventDefault();
            if (type === 'audio' && audioRef.current) {
              audioRef.current.currentTime -= 5;
            } else if (videoRef.current) {
              videoRef.current.currentTime -= 5;
            }
            // Ankündigung für Screenreader
            if (screenReaderAnnouncements) {
              setAnnouncement('5 Sekunden zurück.');
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (type === 'audio' && audioRef.current) {
              audioRef.current.currentTime += 5;
            } else if (videoRef.current) {
              videoRef.current.currentTime += 5;
            }
            // Ankündigung für Screenreader
            if (screenReaderAnnouncements) {
              setAnnouncement('5 Sekunden vor.');
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (type === 'audio' && audioRef.current) {
              audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.1);
            } else if (videoRef.current) {
              videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
            }
            break;
          case 'ArrowDown':
            e.preventDefault();
            if (type === 'audio' && audioRef.current) {
              audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1);
            } else if (videoRef.current) {
              videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
            }
            break;
          case 'm':
            e.preventDefault();
            if (type === 'audio' && audioRef.current) {
              audioRef.current.muted = !audioRef.current.muted;
            } else if (videoRef.current) {
              videoRef.current.muted = !videoRef.current.muted;
            }
            break;
          case 'f':
            e.preventDefault();
            if (type === 'video') {
              toggleFullscreen();
            }
            break;
          case 'c':
            e.preventDefault();
            setCaptionsOn(!captionsOn);
            // Ankündigung für Screenreader
            if (screenReaderAnnouncements) {
              setAnnouncement(captionsOn ? 'Untertitel deaktiviert.' : 'Untertitel aktiviert.');
            }
            break;
          case '0':
          case 'Home':
            e.preventDefault();
            if (type === 'audio' && audioRef.current) {
              audioRef.current.currentTime = 0;
            } else if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
            // Ankündigung für Screenreader
            if (screenReaderAnnouncements) {
              setAnnouncement('Zum Anfang gesprungen.');
            }
            break;
          case 'End':
            e.preventDefault();
            if (type === 'audio' && audioRef.current) {
              audioRef.current.currentTime = audioRef.current.duration;
            } else if (videoRef.current) {
              videoRef.current.currentTime = videoRef.current.duration;
            }
            // Ankündigung für Screenreader
            if (screenReaderAnnouncements) {
              setAnnouncement('Zum Ende gesprungen.');
            }
            break;
          case '?':
            e.preventDefault();
            setShowKeyboardHelp(!showKeyboardHelp);
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [
      isPlaying,
      captionsOn,
      keyboardShortcuts,
      screenReaderAnnouncements,
      showKeyboardHelp,
      type,
    ]);

    // Vollbildmodus
    const toggleFullscreen = () => {
      if (!containerRef.current) return;

      if (!document.fullscreenElement) {
        containerRef.current
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
            // Ankündigung für Screenreader
            if (screenReaderAnnouncements) {
              setAnnouncement('Vollbildmodus aktiviert.');
            }
          })
          .catch((err) => {
            console.error(`Fehler beim Aktivieren des Vollbildmodus: ${err.message}`);
          });
      } else {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
            // Ankündigung für Screenreader
            if (screenReaderAnnouncements) {
              setAnnouncement('Vollbildmodus deaktiviert.');
            }
          })
          .catch((err) => {
            console.error(`Fehler beim Deaktivieren des Vollbildmodus: ${err.message}`);
          });
      }
    };

    // Formatiere Zeit (Sekunden -> MM:SS)
    const formatTime = (seconds: number): string => {
      if (isNaN(seconds)) return '00:00';

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);

      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Rendere Quellen
    const renderSources = () => {
      if (src) {
        return <source src={src} />;
      }

      return sources.map((source, index) => (
        <source key={index} src={source.src} type={source.type} />
      ));
    };

    // Rendere Tracks
    const renderTracks = () => {
      return tracks.map((track, index) => (
        <track
          key={index}
          src={track.src}
          kind={track.kind || 'subtitles'}
          srclang={track.srclang}
          label={track.label}
          default={track.default || (index === 0 && defaultCaptionsOn)}
        />
      ));
    };

    // Rendere Tastaturhilfe
    const renderKeyboardHelp = () => {
      if (!keyboardHelp || !showKeyboardHelp) return null;

      return (
        <div
          id={keyboardHelpId}
          className="absolute top-0 left-0 right-0 bg-black bg-opacity-80 text-white p-4 z-10"
          role="dialog"
          aria-label="Tastaturkürzel"
        >
          <h3 className="text-lg font-bold mb-2">Tastaturkürzel</h3>
          <ul className="list-disc pl-5">
            <li>Leertaste oder K: Wiedergabe starten/pausieren</li>
            <li>Pfeiltaste links: 5 Sekunden zurück</li>
            <li>Pfeiltaste rechts: 5 Sekunden vor</li>
            <li>Pfeiltaste hoch: Lautstärke erhöhen</li>
            <li>Pfeiltaste runter: Lautstärke verringern</li>
            <li>M: Stummschalten ein/aus</li>
            <li>F: Vollbildmodus ein/aus</li>
            <li>C: Untertitel ein/aus</li>
            <li>0 oder Pos1: Zum Anfang springen</li>
            <li>Ende: Zum Ende springen</li>
            <li>?: Tastaturhilfe ein/aus</li>
          </ul>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 rounded"
            onClick={() => setShowKeyboardHelp(false)}
          >
            Schließen
          </button>
        </div>
      );
    };

    // Rendere Transkript
    const renderTranscript = () => {
      if (!transcript) return null;

      return (
        <div
          ref={transcriptRef}
          id={transcriptId}
          className="mt-4 p-4 border border-gray-300 rounded max-h-60 overflow-y-auto"
          aria-label="Transkript"
          tabIndex={0}
        >
          <h3 className="text-lg font-bold mb-2">Transkript</h3>
          {transcript}
        </div>
      );
    };

    // Rendere Beschreibung
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={descriptionId} className="sr-only">
          {description}
        </div>
      );
    };

    // Rendere Ankündigung
    const renderAnnouncement = () => {
      if (!screenReaderAnnouncements) return null;

      return (
        <div
          id={announcementId}
          className="sr-only"
          aria-live={ariaLive || 'polite'}
          aria-atomic={ariaAtomic || true}
        >
          {announcement}
        </div>
      );
    };

    // Rendere Steuerelemente
    const renderControls = () => {
      if (!controls || hideControls) return null;

      return (
        <div
          data-testid="media-controls"
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2"
          role="toolbar"
          aria-label="Mediensteuerung"
        >
          {progressIndicator && (
            <div
              data-testid="progress-bar"
              ref={progressBarRef}
              className="h-2 bg-gray-600 w-full mb-2 relative"
              role="slider"
              aria-label="Fortschritt"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-valuetext={`${formatTime(currentTime)} von ${formatTime(duration)}`}
              tabIndex={0}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPosition = (e.clientX - rect.left) / rect.width;

                if (type === 'audio' && audioRef.current) {
                  audioRef.current.currentTime = clickPosition * audioRef.current.duration;
                } else if (videoRef.current) {
                  videoRef.current.currentTime = clickPosition * videoRef.current.duration;
                }

                // Ankündigung für Screenreader
                if (screenReaderAnnouncements) {
                  const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
                  if (mediaElement) {
                    const newTime = clickPosition * mediaElement.duration;
                    setAnnouncement(`Zu ${formatTime(newTime)} gesprungen.`);
                  }
                }
              }}
              onKeyDown={(e) => {
                const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
                if (!mediaElement) return;

                switch (e.key) {
                  case 'ArrowLeft':
                    e.preventDefault();
                    mediaElement.currentTime = Math.max(0, mediaElement.currentTime - 5);
                    break;
                  case 'ArrowRight':
                    e.preventDefault();
                    mediaElement.currentTime = Math.min(
                      mediaElement.duration,
                      mediaElement.currentTime + 5
                    );
                    break;
                  case 'Home':
                    e.preventDefault();
                    mediaElement.currentTime = 0;
                    break;
                  case 'End':
                    e.preventDefault();
                    mediaElement.currentTime = mediaElement.duration;
                    break;
                }
              }}
            >
              <div
                ref={progressIndicatorRef}
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                aria-label={isPlaying ? 'Pausieren' : 'Abspielen'}
                className="mr-2 p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => {
                  if (isPlaying) {
                    if (type === 'audio' && audioRef.current) {
                      audioRef.current.pause();
                    } else if (videoRef.current) {
                      videoRef.current.pause();
                    }
                  } else {
                    if (type === 'audio' && audioRef.current) {
                      audioRef.current.play();
                    } else if (videoRef.current) {
                      videoRef.current.play();
                    }
                  }
                }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button
                aria-label={isMuted ? 'Ton einschalten' : 'Stummschalten'}
                className="mr-2 p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => {
                  if (type === 'audio' && audioRef.current) {
                    audioRef.current.muted = !audioRef.current.muted;
                  } else if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted;
                  }
                }}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>

              {volumeIndicator && (
                <div className="mr-4 flex items-center">
                  <label htmlFor="volume-slider" className="sr-only">
                    Lautstärke
                  </label>
                  <input
                    id="volume-slider"
                    ref={volumeSliderRef}
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    className="w-20"
                    aria-label="Lautstärke"
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      if (type === 'audio' && audioRef.current) {
                        audioRef.current.volume = newVolume;
                      } else if (videoRef.current) {
                        videoRef.current.volume = newVolume;
                      }
                    }}
                  />
                </div>
              )}

              <span className="mr-4" aria-live="polite">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center">
              {speedIndicator && (
                <div className="mr-2">
                  <label htmlFor="speed-selector" className="sr-only">
                    Geschwindigkeit
                  </label>
                  <select
                    id="speed-selector"
                    ref={speedSliderRef}
                    value={playbackSpeed}
                    className="bg-transparent border border-gray-500 rounded p-1 text-sm"
                    aria-label="Wiedergabegeschwindigkeit"
                    onChange={(e) => {
                      const newSpeed = parseFloat(e.target.value);
                      if (type === 'audio' && audioRef.current) {
                        audioRef.current.playbackRate = newSpeed;
                      } else if (videoRef.current) {
                        videoRef.current.playbackRate = newSpeed;
                      }
                      setPlaybackSpeed(newSpeed);

                      // Ankündigung für Screenreader
                      if (screenReaderAnnouncements) {
                        setAnnouncement(`Geschwindigkeit: ${newSpeed}x.`);
                      }
                    }}
                  >
                    <option value="0.25">0.25x</option>
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="1.75">1.75x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
              )}

              {captionsIndicator && tracks.length > 0 && (
                <button
                  ref={captionsButtonRef}
                  aria-label={captionsOn ? 'Untertitel ausschalten' : 'Untertitel einschalten'}
                  aria-pressed={captionsOn}
                  className={`mr-2 p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${captionsOn ? 'bg-blue-500' : ''}`}
                  onClick={() => {
                    setCaptionsOn(!captionsOn);

                    const mediaElement = type === 'audio' ? audioRef.current : videoRef.current;
                    if (mediaElement && mediaElement.textTracks) {
                      for (let i = 0; i < mediaElement.textTracks.length; i++) {
                        mediaElement.textTracks[i].mode = !captionsOn ? 'showing' : 'hidden';
                      }
                    }

                    // Ankündigung für Screenreader
                    if (screenReaderAnnouncements) {
                      setAnnouncement(
                        captionsOn ? 'Untertitel deaktiviert.' : 'Untertitel aktiviert.'
                      );
                    }
                  }}
                >
                  CC
                </button>
              )}

              {type === 'video' && fullscreenIndicator && (
                <button
                  ref={fullscreenButtonRef}
                  aria-label={isFullscreen ? 'Vollbildmodus beenden' : 'Vollbildmodus'}
                  aria-pressed={isFullscreen}
                  className="p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? '⤓' : '⤢'}
                </button>
              )}

              {keyboardHelp && (
                <button
                  aria-label="Tastaturhilfe anzeigen"
                  className="ml-2 p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                >
                  ?
                </button>
              )}
            </div>
          </div>
        </div>
      );
    };

    const styleProps: React.CSSProperties = {};
    if (width) styleProps.width = width;
    if (height) styleProps.height = height;

    // ARIA-Attribute
    const ariaAttributes = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby || (description ? descriptionId : undefined),
      'aria-busy': ariaBusy,
      'aria-roledescription':
        ariaRoledescription || `${type === 'audio' ? 'Audio' : 'Video'} Player`,
    };

    // Filtere undefined-Werte aus den ARIA-Attributen
    const filteredAriaAttributes = Object.entries(ariaAttributes)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return (
      <div
        ref={containerRef}
        id={playerId}
        className={`relative ${className}`}
        data-testid="media-player"
        style={styleProps}
        {...filteredAriaAttributes}
        {...rest}
      >
        {renderDescription()}
        {renderAnnouncement()}
        {renderKeyboardHelp()}

        {type === 'audio' ? (
          <audio
            ref={audioRef}
            data-testid="audio-element"
            controls={controls && hideControls}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            className="w-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={handlePlay}
            onPause={handlePause}
            onVolumeChange={handleVolumeChange}
            onEnded={handleEnded}
            onError={handleError}
          >
            {renderSources()}
            {renderTracks()}
            Ihr Browser unterstützt das Audio-Element nicht.
          </audio>
        ) : (
          <video
            ref={videoRef}
            data-testid="video-element"
            controls={controls && hideControls}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            poster={poster}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={handlePlay}
            onPause={handlePause}
            onVolumeChange={handleVolumeChange}
            onEnded={handleEnded}
            onError={handleError}
          >
            {renderSources()}
            {renderTracks()}
            Ihr Browser unterstützt das Video-Element nicht.
          </video>
        )}

        {renderControls()}
        {renderTranscript()}
      </div>
    );
  }
);

MediaPlayerA11y.displayName = 'MediaPlayerA11y';

export default MediaPlayerA11y;
