import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { keyframes, KeyframeAnimation } from './keyframes';
import { transitions, TransitionPresetName, TransitionPreset } from './transitions';

export type MotionVariants = Record<string, React.CSSProperties>;

export type MotionProps = {
  /**
   * Das HTML-Element, das gerendert werden soll
   */
  as?: React.ElementType;
  
  /**
   * Die aktuelle Variante, die angewendet werden soll
   */
  variant?: string;
  
  /**
   * Die verfügbaren Varianten für die Animation
   */
  variants?: MotionVariants;
  
  /**
   * Die initiale Animation, die beim Mounten angewendet werden soll
   */
  initial?: string | React.CSSProperties;
  
  /**
   * Die Animation, die beim Unmounten angewendet werden soll
   */
  exit?: string | React.CSSProperties;
  
  /**
   * Die Animation, die beim Hovern angewendet werden soll
   */
  whileHover?: string | React.CSSProperties;
  
  /**
   * Die Animation, die beim Fokussieren angewendet werden soll
   */
  whileFocus?: string | React.CSSProperties;
  
  /**
   * Die Animation, die beim Drücken angewendet werden soll
   */
  whileTap?: string | React.CSSProperties;
  
  /**
   * Die Keyframe-Animation, die angewendet werden soll
   */
  animate?: KeyframeAnimation | Record<string, any>;
  
  /**
   * Die Übergangseinstellungen
   */
  transition?: TransitionPresetName | TransitionPreset;
  
  /**
   * Ob die Animation wiederholt werden soll
   */
  repeat?: number | 'infinite';
  
  /**
   * Ob die Animation automatisch starten soll
   */
  autoplay?: boolean;
  
  /**
   * Callback, wenn die Animation startet
   */
  onAnimationStart?: () => void;
  
  /**
   * Callback, wenn die Animation endet
   */
  onAnimationComplete?: () => void;
  
  /**
   * Zusätzliche CSS-Eigenschaften
   */
  style?: React.CSSProperties;
  
  /**
   * Zusätzliche CSS-Klassen
   */
  className?: string;
  
  /**
   * Die Kinder der Komponente
   */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Komponente zum Erstellen von animierten Elementen
 */
export const Motion = forwardRef<HTMLElement, MotionProps>(
  (
    {
      as: Component = 'div',
      variant,
      variants = {},
      initial,
      exit,
      whileHover,
      whileFocus,
      whileTap,
      animate,
      transition = 'default',
      repeat = 1,
      autoplay = true,
      onAnimationStart,
      onAnimationComplete,
      style,
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = useRef<HTMLElement>(null);
    const ref = (forwardedRef || innerRef) as React.RefObject<HTMLElement>;
    const [currentVariant, setCurrentVariant] = useState<string | null>(
      variant || (initial ? 'initial' : null)
    );
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const animationRef = useRef<Animation | null>(null);
    
    // Varianten mit initial und exit erweitern
    const allVariants = {
      ...variants,
      ...(initial && typeof initial === 'object' ? { initial } : {}),
      ...(exit && typeof exit === 'object' ? { exit } : {}),
      ...(whileHover && typeof whileHover === 'object' ? { hover: whileHover } : {}),
      ...(whileFocus && typeof whileFocus === 'object' ? { focus: whileFocus } : {}),
      ...(whileTap && typeof whileTap === 'object' ? { tap: whileTap } : {}),
    };
    
    // Transition-Optionen auflösen
    const transitionPreset = typeof transition === 'string' 
      ? transitions[transition] 
      : transition;
    
    // Keyframe-Animation starten
    useEffect(() => {
      if (!animate || !ref.current) return;
      
      // Bestehende Animation stoppen
      if (animationRef.current) {
        animationRef.current.cancel();
      }
      
      // Keyframes auflösen
      const keyframeValue = typeof animate === 'string' 
        ? keyframes[animate as KeyframeAnimation] 
        : animate;
      
      // Animation erstellen und starten
      animationRef.current = ref.current.animate(keyframeValue as Keyframe[], {
        duration: transitionPreset.duration,
        easing: transitionPreset.easing,
        delay: (transitionPreset as any).delay || 0,
        iterations: repeat === 'infinite' ? Infinity : repeat,
        fill: 'both',
      });
      
      // Event-Listener für Animation
      if (onAnimationStart) {
        (animationRef.current as any).onstart = onAnimationStart;
      }
      
      if (onAnimationComplete) {
        animationRef.current.onfinish = onAnimationComplete;
      }
      
      // Animation pausieren, wenn autoplay=false
      if (!autoplay) {
        animationRef.current.pause();
      }
      
      return () => {
        if (animationRef.current) {
          animationRef.current.cancel();
        }
      };
    }, [animate, autoplay, onAnimationComplete, onAnimationStart, ref, repeat, transitionPreset]);
    
    // Variante aktualisieren, wenn sich variant ändert
    useEffect(() => {
      if (variant) {
        setCurrentVariant(variant);
      }
    }, [variant]);
    
    // Aktuelle Variante basierend auf Zustand bestimmen
    const getCurrentStyle = (): React.CSSProperties => {
      let variantStyle: React.CSSProperties = {};
      
      // Basis-Variante anwenden
      if (currentVariant && typeof currentVariant === 'string' && 
          (currentVariant === 'tap' || currentVariant === 'focus' || 
           currentVariant === 'hover' || currentVariant === 'exit' || 
           currentVariant === 'initial') && 
          allVariants[currentVariant]) {
        variantStyle = { ...variantStyle, ...allVariants[currentVariant] };
      }
      
      // Interaktions-Varianten anwenden
      if (isHovered && allVariants.hover) {
        variantStyle = { ...variantStyle, ...allVariants.hover };
      }
      
      if (isFocused && allVariants.focus) {
        variantStyle = { ...variantStyle, ...allVariants.focus };
      }
      
      if (isPressed && allVariants.tap) {
        variantStyle = { ...variantStyle, ...allVariants.tap };
      }
      
      // Transition hinzufügen
      const delay = (transitionPreset as any).delay || 0;
      const transitionValue = `all ${transitionPreset.duration}ms ${transitionPreset.easing}${
        delay > 0 ? ` ${delay}ms` : ''
      }`;
      
      return {
        transition: transitionValue,
        ...variantStyle,
        ...style,
      };
    };
    
    // Event-Handler für Interaktionen
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      setIsHovered(true);
      props.onMouseEnter?.(e);
    };
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      setIsHovered(false);
      setIsPressed(false);
      props.onMouseLeave?.(e);
    };
    
    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };
    
    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
      setIsPressed(true);
      props.onMouseDown?.(e);
    };
    
    const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
      setIsPressed(false);
      props.onMouseUp?.(e);
    };
    
    return (
      <Component
        ref={ref}
        className={className}
        style={getCurrentStyle()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Motion.displayName = 'Motion';

export default Motion;