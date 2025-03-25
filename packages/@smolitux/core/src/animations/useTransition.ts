import { useState, useEffect, useRef } from 'react';
import { TransitionPreset, transitions, TransitionPresetName } from './transitions';

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export type TransitionOptions = {
  in: boolean;
  timeout?: number | { enter?: number; exit?: number };
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  transition?: TransitionPresetName | TransitionPreset;
  onEnter?: (() => void) | null;
  onEntering?: (() => void) | null;
  onEntered?: (() => void) | null;
  onExit?: (() => void) | null;
  onExiting?: (() => void) | null;
  onExited?: (() => void) | null;
};

export type TransitionResult = {
  state: TransitionState;
  isVisible: boolean;
  ref: React.RefObject<HTMLElement>;
  style: React.CSSProperties;
};

/**
 * Hook zum Erstellen von Übergangseffekten für das Erscheinen/Verschwinden von Elementen
 */
export const useTransition = (options: TransitionOptions): TransitionResult => {
  const {
    in: inProp,
    timeout = 300,
    mountOnEnter = false,
    unmountOnExit = false,
    appear = false,
    transition = 'default',
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  } = options;
  
  const [state, setState] = useState<TransitionState>(() => {
    if (inProp) {
      return appear ? 'entering' : 'entered';
    }
    return mountOnEnter ? 'exited' : 'exited';
  });
  
  const [mounted, setMounted] = useState(() => {
    if (inProp) return true;
    return !mountOnEnter;
  });
  
  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Transition-Optionen auflösen
  const transitionPreset = typeof transition === 'string' 
    ? transitions[transition] 
    : transition;
  
  // Timeout-Werte auflösen
  const getTimeout = (type: 'enter' | 'exit'): number => {
    if (typeof timeout === 'number') {
      return timeout;
    }
    return timeout[type] !== undefined ? timeout[type]! : transitionPreset.duration;
  };
  
  // Zustandsübergänge verwalten
  useEffect(() => {
    // Timeout löschen, wenn die Komponente unmountet
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    let nextState: TransitionState | null = null;
    let timeout: NodeJS.Timeout | null = null;
    let callback: (() => void) | null = null;
    
    const performStateChange = () => {
      if (nextState === null) return;
      
      // Aktuellen Timeout löschen
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // Zustand aktualisieren
      setState(nextState);
      
      // Callback ausführen
      if (callback) {
        callback();
      }
    };
    
    if (inProp) {
      // Eintrittsübergang
      if (!mounted) {
        setMounted(true);
      }
      
      if (state === 'exited' || state === 'exiting') {
        nextState = 'entering';
        callback = onEnter || null;
        
        timeoutRef.current = setTimeout(() => {
          nextState = 'entered';
          callback = onEntered || null;
          performStateChange();
        }, getTimeout('enter'));
        
        performStateChange();
        onEntering?.();
      }
    } else {
      // Austrittsübergang
      if (state === 'entering' || state === 'entered') {
        nextState = 'exiting';
        callback = onExit || null;
        
        timeoutRef.current = setTimeout(() => {
          nextState = 'exited';
          callback = onExited || null;
          
          if (unmountOnExit) {
            setMounted(false);
          }
          
          performStateChange();
        }, getTimeout('exit'));
        
        performStateChange();
        onExiting?.();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProp, state]);
  
  // CSS-Stil basierend auf dem aktuellen Zustand
  const getStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transition: `opacity ${transitionPreset.duration}ms ${transitionPreset.easing}`,
    };
    
    switch (state) {
      case 'entering':
        return {
          ...baseStyle,
          opacity: 1,
        };
      case 'entered':
        return {
          ...baseStyle,
          opacity: 1,
        };
      case 'exiting':
        return {
          ...baseStyle,
          opacity: 0,
        };
      case 'exited':
        return {
          ...baseStyle,
          opacity: 0,
          display: unmountOnExit ? 'none' : undefined,
        };
      default:
        return baseStyle;
    }
  };
  
  return {
    state,
    isVisible: mounted,
    ref,
    style: getStyle(),
  };
};

export default useTransition;