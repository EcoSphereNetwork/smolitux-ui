import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { cn } from '@smolitux/utils';

export interface SpeechSynthesisProps {
  text: string;
  className?: string;
  voice?: SpeechSynthesisVoice | null;
  rate?: number;
  pitch?: number;
  volume?: number;
  autoPlay?: boolean;
  showControls?: boolean;
  showSettings?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (error: string) => void;
  onBoundary?: (event: SpeechSynthesisEvent) => void;
}

export const SpeechSynthesis = forwardRef<HTMLDivElement, SpeechSynthesisProps>(
  ({
    text,
    className,
    voice = null,
    rate = 1,
    pitch = 1,
    volume = 1,
    autoPlay = false,
    showControls = true,
    showSettings = false,
    onStart,
    onEnd,
    onPause,
    onResume,
    onError,
    onBoundary,
    ...props
  }, ref) => {
    const [isSupported, setIsSupported] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(voice);
    const [currentRate, setCurrentRate] = useState(rate);
    const [currentPitch, setCurrentPitch] = useState(pitch);
    const [currentVolume, setCurrentVolume] = useState(volume);
    const [error, setError] = useState<string | null>(null);

    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
      setIsSupported('speechSynthesis' in window);

      if (!('speechSynthesis' in window)) {
        setError('Speech synthesis not supported in this browser');
        return;
      }

      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);

        if (!selectedVoice && availableVoices.length > 0) {
          const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
          setSelectedVoice(defaultVoice);
        }
      };

      loadVoices();
      speechSynthesis.addEventListener('voiceschanged', loadVoices);

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
        if (utteranceRef.current) {
          speechSynthesis.cancel();
        }
      };
    }, [selectedVoice]);

    useEffect(() => {
      if (autoPlay && text && isSupported) {
        speak();
      }
    }, [autoPlay, text, isSupported]);

    const createUtterance = () => {
      if (!text) return null;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = currentRate;
      utterance.pitch = currentPitch;
      utterance.volume = currentVolume;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setError(null);
        onStart?.();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        onEnd?.();
      };

      utterance.onpause = () => {
        setIsPaused(true);
        onPause?.();
      };

      utterance.onresume = () => {
        setIsPaused(false);
        onResume?.();
      };

      utterance.onerror = (event) => {
        const errorMessage = `Speech synthesis error: ${event.error}`;
        setError(errorMessage);
        setIsSpeaking(false);
        setIsPaused(false);
        onError?.(errorMessage);
      };

      utterance.onboundary = (event) => {
        onBoundary?.(event);
      };

      return utterance;
    };

    const speak = () => {
      if (!isSupported || !text) return;
      speechSynthesis.cancel();

      const utterance = createUtterance();
      if (!utterance) return;

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    };

    const pause = () => {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
      }
    };

    const resume = () => {
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      }
    };

    const stop = () => {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    };

    const togglePlayPause = () => {
      if (!isSpeaking) {
        speak();
      } else if (isPaused) {
        resume();
      } else {
        pause();
      }
    };

    if (!isSupported) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center p-4 bg-destructive/10 border border-destructive/20 rounded-lg',
            className
          )}
          {...props}
        >
          <span className="text-destructive">
            Speech synthesis not supported in this browser
          </span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-card border border-border rounded-lg p-4 space-y-4',
          className
        )}
        role="region"
        aria-label="Text to speech controls"
        {...props}
      >
        <div className="bg-muted p-3 rounded-md">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Text to speak:
          </div>
          <div className="text-sm">{text || 'No text provided'}</div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md">
            <div className="text-destructive text-sm">{error}</div>
          </div>
        )}

        {showControls && (
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlayPause}
              disabled={!text || !!error}
              className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label={
                !isSpeaking
                  ? 'Start speaking'
                  : isPaused
                  ? 'Resume speaking'
                  : 'Pause speaking'
              }
            >
              {!isSpeaking ? (
                <Play className="w-4 h-4 ml-0.5" />
              ) : isPaused ? (
                <Play className="w-4 h-4 ml-0.5" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={stop}
              disabled={!isSpeaking || !!error}
              className="flex items-center justify-center w-10 h-10 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Stop speaking"
            >
              <Square className="w-4 h-4" />
            </button>

            <div className="flex-1 text-sm text-muted-foreground">
              {error ? (
                'Error occurred'
              ) : isSpeaking ? (
                isPaused ? 'Paused' : 'Speaking...'
              ) : (
                'Ready'
              )}
            </div>
          </div>
        )}

        {showSettings && (
          <div className="space-y-3 border-t border-border pt-4">
            <div className="text-sm font-medium">Settings</div>

            <div>
              <label className="text-xs text-muted-foreground">Voice</label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice || null);
                }}
                className="w-full mt-1 px-2 py-1 text-sm border border-border rounded bg-background"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Rate: {currentRate.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={currentRate}
                onChange={(e) => setCurrentRate(parseFloat(e.target.value))}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Pitch: {currentPitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={currentPitch}
                onChange={(e) => setCurrentPitch(parseFloat(e.target.value))}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Volume: {Math.round(currentVolume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentVolume}
                onChange={(e) => setCurrentVolume(parseFloat(e.target.value))}
                className="w-full mt-1"
              />
            </div>
          </div>
        )}

        <div className="sr-only" aria-live="polite">
          {error && `Error: ${error}`}
          {isSpeaking && (isPaused ? 'Speech paused' : 'Speaking text')}
        </div>
      </div>
    );
  }
);

SpeechSynthesis.displayName = 'SpeechSynthesis';
