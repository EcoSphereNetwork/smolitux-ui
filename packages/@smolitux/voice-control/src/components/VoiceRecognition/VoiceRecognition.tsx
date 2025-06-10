import React, { forwardRef, useEffect, useState, useRef } from 'react';

export interface VoiceRecognitionProps {
  language?: string;
  onResult?: (transcript: string, isFinal: boolean) => void;
  autoStart?: boolean;
  className?: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export const VoiceRecognition = forwardRef<HTMLDivElement, VoiceRecognitionProps>(
  (
    { language = 'en-US', onResult, autoStart = false, className },
    ref
  ) => {
    const [supported, setSupported] = useState<boolean>(false);
    const [listening, setListening] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) {
        setSupported(false);
        setError('Speech recognition not supported');
        return;
      }
      setSupported(true);
      const recognition = new SR();
      recognition.lang = language;
      recognition.interimResults = true;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onerror = (e) => {
        setError(e.error);
        setListening(false);
      };
      recognition.onresult = (e) => {
        const last = e.results[e.results.length - 1];
        const transcript = last[0].transcript;
        onResult?.(transcript, last.isFinal);
      };

      recognitionRef.current = recognition;
      if (autoStart) recognition.start();

      return () => {
        recognition.stop();
      };
    }, [language, autoStart, onResult]);

    const toggle = () => {
      const r = recognitionRef.current;
      if (!r) return;
      try {
        if (listening) r.stop();
        else r.start();
      } catch {
        // ignore start errors when already started
      }
    };

    if (!supported) {
      return (
        <div ref={ref} className={className} role="status">
          {error || 'Speech recognition not supported'}
        </div>
      );
    }

    return (
      <div ref={ref} className={className}>
        <button type="button" onClick={toggle} disabled={!!error}>
          {listening ? 'Stop' : 'Start'}
        </button>
        {error && <div role="alert">{error}</div>}
      </div>
    );
  }
);

VoiceRecognition.displayName = 'VoiceRecognition';

export default VoiceRecognition;
