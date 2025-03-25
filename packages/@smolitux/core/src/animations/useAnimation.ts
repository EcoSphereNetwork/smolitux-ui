import { useRef, useEffect, useState } from 'react';
import { keyframes, KeyframeAnimation } from './keyframes';
import { TransitionPreset, transitions, TransitionPresetName } from './transitions';

export type AnimationOptions = {
  keyframe: KeyframeAnimation | Record<string, any>;
  transition?: TransitionPresetName | TransitionPreset;
  delay?: number;
  duration?: number;
  easing?: string;
  iterationCount?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  playState?: 'running' | 'paused';
};

export type AnimationControls = {
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isRunning: boolean;
};

/**
 * Hook zum Anwenden von Keyframe-Animationen auf ein Element
 */
export const useAnimation = (
  options: AnimationOptions,
  deps: any[] = []
): [React.RefObject<HTMLElement>, AnimationControls] => {
  const ref = useRef<HTMLElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const animationRef = useRef<Animation | null>(null);
  
  // Keyframes auflösen
  const keyframeValue = typeof options.keyframe === 'string' 
    ? keyframes[options.keyframe as KeyframeAnimation] 
    : options.keyframe;
  
  // Transition-Optionen auflösen
  const transitionPreset = options.transition 
    ? (typeof options.transition === 'string' 
      ? transitions[options.transition] 
      : options.transition)
    : transitions.default;
  
  // Animation-Optionen erstellen
  const getAnimationOptions = (): KeyframeAnimationOptions => {
    return {
      duration: options.duration || transitionPreset.duration,
      easing: options.easing || transitionPreset.easing,
      delay: options.delay || transitionPreset.delay || 0,
      iterations: options.iterationCount || 1,
      direction: options.direction || 'normal',
      fill: options.fillMode || 'both',
    };
  };
  
  // Animation starten
  const start = () => {
    if (!ref.current) return;
    
    // Bestehende Animation stoppen
    if (animationRef.current) {
      animationRef.current.cancel();
    }
    
    // Neue Animation erstellen und starten
    animationRef.current = ref.current.animate(
      keyframeValue,
      getAnimationOptions()
    );
    
    // Event-Listener für Animation-Ende
    animationRef.current.onfinish = () => {
      setIsRunning(false);
    };
    
    setIsRunning(true);
  };
  
  // Animation stoppen
  const stop = () => {
    if (animationRef.current) {
      animationRef.current.cancel();
      setIsRunning(false);
    }
  };
  
  // Animation pausieren
  const pause = () => {
    if (animationRef.current) {
      animationRef.current.pause();
      setIsRunning(false);
    }
  };
  
  // Animation fortsetzen
  const resume = () => {
    if (animationRef.current) {
      animationRef.current.play();
      setIsRunning(true);
    }
  };
  
  // Animation bei Änderung der Dependencies neu starten
  useEffect(() => {
    if (ref.current) {
      start();
    }
    
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  
  return [ref, { start, stop, pause, resume, isRunning }];
};

export default useAnimation;