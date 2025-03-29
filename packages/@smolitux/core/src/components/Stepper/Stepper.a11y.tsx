// packages/@smolitux/core/src/components/Stepper/Stepper.a11y.tsx
import React, { createContext, useContext, useMemo, useState, useEffect, useRef, useId, KeyboardEvent } from 'react';
import './Stepper.css';

export interface Step {
  /** Eindeutige ID des Schritts */
  id: string;
  /** Titel des Schritts */
  title: React.ReactNode;
  /** Beschreibung des Schritts (optional) */
  description?: React.ReactNode;
  /** Icon des Schritts (optional) */
  icon?: React.ReactNode;
  /** Ist der Schritt optional? */
  optional?: boolean;
  /** Ist der Schritt deaktiviert? */
  disabled?: boolean;
  /** Benutzerdefinierte Daten für den Schritt */
  data?: any;
  /** ARIA-Label für den Schritt */
  ariaLabel?: string;
  /** Zusätzliche Beschreibung für Screenreader */
  screenReaderDescription?: string;
}

export type StepStatus = 'upcoming' | 'current' | 'completed' | 'error';

export interface StepperContextProps {
  /** Aktiver Schritt-Index */
  activeStep: number;
  /** Schritte */
  steps: Step[];
  /** Orientierung des Steppers */
  orientation: 'horizontal' | 'vertical';
  /** Variante des Steppers */
  variant: 'default' | 'outlined' | 'contained';
  /** Größe des Steppers */
  size: 'sm' | 'md' | 'lg';
  /** Zum nächsten Schritt gehen */
  nextStep: () => void;
  /** Zum vorherigen Schritt gehen */
  prevStep: () => void;
  /** Zu einem bestimmten Schritt gehen */
  goToStep: (index: number) => void;
  /** Status eines Schritts abrufen */
  getStepStatus: (index: number) => StepStatus;
  /** Fokus auf einen bestimmten Schritt setzen */
  focusStep: (index: number) => void;
  /** Aktuell fokussierter Schritt */
  focusedStep: number;
  /** Ist der Stepper im Tastaturnavigationsmodus? */
  isKeyboardNavigation: boolean;
}

const StepperContext = createContext<StepperContextProps | undefined>(undefined);

export const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepperContext must be used within a Stepper');
  }
  return context;
};

export interface StepperProps {
  /** Schritte des Steppers */
  steps: Step[];
  /** Aktiver Schritt-Index */
  activeStep?: number;
  /** Callback bei Änderung des aktiven Schritts */
  onStepChange?: (index: number) => void;
  /** Orientierung des Steppers */
  orientation?: 'horizontal' | 'vertical';
  /** Variante des Steppers */
  variant?: 'default' | 'outlined' | 'contained';
  /** Größe des Steppers */
  size?: 'sm' | 'md' | 'lg';
  /** Benutzerdefinierte CSS-Klasse */
  className?: string;
  /** Benutzerdefinierte CSS-Klasse für die Schritte */
  stepsClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Verbindungslinien */
  connectorClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Schritt-Labels */
  labelClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Schritt-Beschreibungen */
  descriptionClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Schritt-Icons */
  iconClassName?: string;
  /** Alternativer Connector zwischen den Schritten */
  connector?: React.ReactNode;
  /** Alternativer Inhalt für abgeschlossene Schritte */
  completedIcon?: React.ReactNode;
  /** Alternativer Inhalt für aktive Schritte */
  activeIcon?: React.ReactNode;
  /** Alternativer Inhalt für zukünftige Schritte */
  upcomingIcon?: React.ReactNode;
  /** Alternativer Inhalt für Schritte mit Fehler */
  errorIcon?: React.ReactNode;
  /** Ob die Schritte anklickbar sein sollen */
  clickable?: boolean;
  /** Ob die Schritte alternierend angezeigt werden sollen */
  alternativeLabel?: boolean;
  /** Ob die Verbindungslinien nicht angezeigt werden sollen */
  nonLinear?: boolean;
  /** Ob die Schritte nummeriert werden sollen */
  numbered?: boolean;
  /** Ob die Beschreibungen angezeigt werden sollen */
  showDescription?: boolean;
  /** Ob die optionalen Labels angezeigt werden sollen */
  showOptionalLabel?: boolean;
  /** Text für optionale Schritte */
  optionalLabel?: string;
  /** Ob die Schritte vollständig angezeigt werden sollen */
  fullWidth?: boolean;
  /** ARIA-Label für den Stepper */
  ariaLabel?: string;
  /** Beschreibung für Screenreader */
  description?: string;
  /** Ob die Tastaturnavigation aktiviert sein soll */
  keyboardNavigation?: boolean;
  /** Ob die Schritte automatisch fokussiert werden sollen */
  autoFocus?: boolean;
  /** Ob die Schritte eine Live-Region haben sollen */
  liveRegion?: boolean;
  /** Ob die Schritte eine Ankündigung haben sollen */
  announce?: boolean;
  /** Ob die Schritte eine Fehlerbehandlung haben sollen */
  error?: string;
  /** Ob die Schritte eine Erfolgsbehandlung haben sollen */
  success?: string;
  /** Ob die Schritte eine Ladebehandlung haben sollen */
  loading?: boolean;
  /** Ob die Schritte eine Hilfetext haben sollen */
  helperText?: string;
  /** Ob die Schritte eine Tooltip haben sollen */
  tooltip?: string;
  /** Ob die Schritte eine Tastaturkürzel haben sollen */
  keyboardShortcuts?: boolean;
  /** Ob die Schritte eine Fokus-Verwaltung haben sollen */
  focusManagement?: boolean;
  /** Ob die Schritte eine Screenreader-Unterstützung haben sollen */
  screenReaderSupport?: boolean;
  /** Ob die Schritte eine High-Contrast-Unterstützung haben sollen */
  highContrastSupport?: boolean;
  /** Ob die Schritte eine Farbkontrast-Unterstützung haben sollen */
  colorContrastSupport?: boolean;
  /** Ob die Schritte eine Zoom-Unterstützung haben sollen */
  zoomSupport?: boolean;
  /** Ob die Schritte eine Tastatur-Unterstützung haben sollen */
  keyboardSupport?: boolean;
  /** Ob die Schritte eine Maus-Unterstützung haben sollen */
  mouseSupport?: boolean;
  /** Ob die Schritte eine Touch-Unterstützung haben sollen */
  touchSupport?: boolean;
  /** Ob die Schritte eine Sprach-Unterstützung haben sollen */
  voiceSupport?: boolean;
  /** Ob die Schritte eine Gesten-Unterstützung haben sollen */
  gestureSupport?: boolean;
  /** Ob die Schritte eine Animation-Unterstützung haben sollen */
  animationSupport?: boolean;
  /** Ob die Schritte eine Transition-Unterstützung haben sollen */
  transitionSupport?: boolean;
  /** Ob die Schritte eine Responsive-Unterstützung haben sollen */
  responsiveSupport?: boolean;
  /** Ob die Schritte eine Mobile-Unterstützung haben sollen */
  mobileSupport?: boolean;
  /** Ob die Schritte eine Desktop-Unterstützung haben sollen */
  desktopSupport?: boolean;
  /** Ob die Schritte eine Tablet-Unterstützung haben sollen */
  tabletSupport?: boolean;
  /** Ob die Schritte eine Print-Unterstützung haben sollen */
  printSupport?: boolean;
  /** Ob die Schritte eine RTL-Unterstützung haben sollen */
  rtlSupport?: boolean;
  /** Ob die Schritte eine LTR-Unterstützung haben sollen */
  ltrSupport?: boolean;
  /** Ob die Schritte eine Internationalisierung-Unterstützung haben sollen */
  i18nSupport?: boolean;
  /** Ob die Schritte eine Lokalisierung-Unterstützung haben sollen */
  l10nSupport?: boolean;
  /** Ob die Schritte eine Globalisierung-Unterstützung haben sollen */
  g11nSupport?: boolean;
  /** Ob die Schritte eine Barrierefreiheit-Unterstützung haben sollen */
  a11ySupport?: boolean;
}

/**
 * Barrierefreie Stepper-Komponente zur Anzeige eines mehrstufigen Prozesses
 * 
 * @example
 * ```tsx
 * <StepperA11y
 *   steps={[
 *     { id: 'step1', title: 'Schritt 1', description: 'Beschreibung 1' },
 *     { id: 'step2', title: 'Schritt 2', description: 'Beschreibung 2' },
 *     { id: 'step3', title: 'Schritt 3', description: 'Beschreibung 3' }
 *   ]}
 *   activeStep={1}
 *   ariaLabel="Prozess-Schritte"
 * />
 * ```
 */
export const StepperA11y: React.FC<StepperProps> = ({
  steps,
  activeStep = 0,
  onStepChange,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className = '',
  stepsClassName = '',
  connectorClassName = '',
  labelClassName = '',
  descriptionClassName = '',
  iconClassName = '',
  connector,
  completedIcon,
  activeIcon,
  upcomingIcon,
  errorIcon,
  clickable = false,
  alternativeLabel = false,
  nonLinear = false,
  numbered = true,
  showDescription = true,
  showOptionalLabel = true,
  optionalLabel = 'Optional',
  fullWidth = false,
  ariaLabel,
  description,
  keyboardNavigation = true,
  autoFocus = false,
  liveRegion = true,
  announce = true,
  error,
  success,
  loading = false,
  helperText,
  tooltip,
  keyboardShortcuts = true,
  focusManagement = true,
  screenReaderSupport = true,
  highContrastSupport = true,
  colorContrastSupport = true,
  zoomSupport = true,
  keyboardSupport = true,
  mouseSupport = true,
  touchSupport = true,
  voiceSupport = true,
  gestureSupport = true,
  animationSupport = true,
  transitionSupport = true,
  responsiveSupport = true,
  mobileSupport = true,
  desktopSupport = true,
  tabletSupport = true,
  printSupport = true,
  rtlSupport = true,
  ltrSupport = true,
  i18nSupport = true,
  l10nSupport = true,
  g11nSupport = true,
  a11ySupport = true,
}) => {
  // Generiere eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  const stepperId = `stepper-${uniqueId}`;
  
  // State für den aktiven Schritt
  const [internalActiveStep, setInternalActiveStep] = useState(activeStep);
  
  // State für den fokussierten Schritt
  const [focusedStep, setFocusedStep] = useState<number>(-1);
  
  // State für Tastaturnavigation
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  
  // State für Ankündigungen
  const [announceMessage, setAnnounceMessage] = useState<string>('');
  
  // Refs für die Schritte
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Aktualisiere den aktiven Schritt, wenn sich die Props ändern
  useEffect(() => {
    setInternalActiveStep(activeStep);
  }, [activeStep]);
  
  // Initialisiere die Refs für die Schritte
  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, steps.length);
  }, [steps]);
  
  // Fokussiere den aktiven Schritt beim ersten Rendern
  useEffect(() => {
    if (autoFocus && focusManagement) {
      setFocusedStep(internalActiveStep);
      setTimeout(() => {
        stepRefs.current[internalActiveStep]?.focus();
      }, 0);
    }
  }, [autoFocus, focusManagement, internalActiveStep]);
  
  // Zum nächsten Schritt gehen
  const nextStep = () => {
    if (internalActiveStep < steps.length - 1) {
      const nextStepIndex = internalActiveStep + 1;
      setInternalActiveStep(nextStepIndex);
      
      if (onStepChange) {
        onStepChange(nextStepIndex);
      }
      
      // Ankündige den Schrittwechsel für Screenreader
      if (announce) {
        const step = steps[nextStepIndex];
        const stepTitle = typeof step.title === 'string' ? step.title : 'Schritt';
        setAnnounceMessage(`${stepTitle} aktiviert. Schritt ${nextStepIndex + 1} von ${steps.length}`);
      }
    }
  };
  
  // Zum vorherigen Schritt gehen
  const prevStep = () => {
    if (internalActiveStep > 0) {
      const prevStepIndex = internalActiveStep - 1;
      setInternalActiveStep(prevStepIndex);
      
      if (onStepChange) {
        onStepChange(prevStepIndex);
      }
      
      // Ankündige den Schrittwechsel für Screenreader
      if (announce) {
        const step = steps[prevStepIndex];
        const stepTitle = typeof step.title === 'string' ? step.title : 'Schritt';
        setAnnounceMessage(`${stepTitle} aktiviert. Schritt ${prevStepIndex + 1} von ${steps.length}`);
      }
    }
  };
  
  // Zu einem bestimmten Schritt gehen
  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length && !steps[index].disabled) {
      setInternalActiveStep(index);
      
      if (onStepChange) {
        onStepChange(index);
      }
      
      // Ankündige den Schrittwechsel für Screenreader
      if (announce) {
        const step = steps[index];
        const stepTitle = typeof step.title === 'string' ? step.title : 'Schritt';
        setAnnounceMessage(`${stepTitle} aktiviert. Schritt ${index + 1} von ${steps.length}`);
      }
    }
  };
  
  // Status eines Schritts abrufen
  const getStepStatus = (index: number): StepStatus => {
    if (index < internalActiveStep) {
      return 'completed';
    } else if (index === internalActiveStep) {
      return 'current';
    } else {
      return 'upcoming';
    }
  };
  
  // Fokus auf einen bestimmten Schritt setzen
  const focusStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setFocusedStep(index);
      stepRefs.current[index]?.focus();
    }
  };
  
  // Behandle Tastaturnavigation
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!keyboardNavigation) return;
    
    setIsKeyboardNavigation(true);
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        if (orientation === 'horizontal' && event.key === 'ArrowDown') break;
        if (orientation === 'vertical' && event.key === 'ArrowRight') break;
        
        // Finde den nächsten nicht deaktivierten Schritt
        let nextIndex = focusedStep;
        do {
          nextIndex = (nextIndex + 1) % steps.length;
        } while (steps[nextIndex].disabled && nextIndex !== focusedStep);
        
        if (nextIndex !== focusedStep) {
          focusStep(nextIndex);
          event.preventDefault();
        }
        break;
        
      case 'ArrowLeft':
      case 'ArrowUp':
        if (orientation === 'horizontal' && event.key === 'ArrowUp') break;
        if (orientation === 'vertical' && event.key === 'ArrowLeft') break;
        
        // Finde den vorherigen nicht deaktivierten Schritt
        let prevIndex = focusedStep;
        do {
          prevIndex = (prevIndex - 1 + steps.length) % steps.length;
        } while (steps[prevIndex].disabled && prevIndex !== focusedStep);
        
        if (prevIndex !== focusedStep) {
          focusStep(prevIndex);
          event.preventDefault();
        }
        break;
        
      case 'Home':
        // Finde den ersten nicht deaktivierten Schritt
        for (let i = 0; i < steps.length; i++) {
          if (!steps[i].disabled) {
            focusStep(i);
            event.preventDefault();
            break;
          }
        }
        break;
        
      case 'End':
        // Finde den letzten nicht deaktivierten Schritt
        for (let i = steps.length - 1; i >= 0; i--) {
          if (!steps[i].disabled) {
            focusStep(i);
            event.preventDefault();
            break;
          }
        }
        break;
        
      case 'Enter':
      case ' ':
        if (focusedStep !== -1 && clickable && !steps[focusedStep].disabled) {
          goToStep(focusedStep);
          event.preventDefault();
        }
        break;
        
      default:
        // Implementiere Tastaturkürzel für die Schritte (1-9)
        if (keyboardShortcuts && /^[1-9]$/.test(event.key)) {
          const index = parseInt(event.key, 10) - 1;
          if (index < steps.length && !steps[index].disabled) {
            focusStep(index);
            if (clickable) {
              goToStep(index);
            }
            event.preventDefault();
          }
        }
        break;
    }
  };
  
  // Behandle Mausnavigation
  const handleStepClick = (index: number) => {
    if (clickable && !steps[index].disabled) {
      goToStep(index);
    }
  };
  
  // Behandle Fokus auf Schritt
  const handleStepFocus = (index: number) => {
    setFocusedStep(index);
  };
  
  // Behandle Verlust des Fokus
  const handleStepBlur = () => {
    // Setze den fokussierten Schritt zurück, wenn der Fokus den Stepper verlässt
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isStepFocused = stepRefs.current.some(ref => ref === activeElement);
      
      if (!isStepFocused) {
        setFocusedStep(-1);
        setIsKeyboardNavigation(false);
      }
    }, 0);
  };
  
  // Context-Wert für den Stepper
  const contextValue = useMemo<StepperContextProps>(() => ({
    activeStep: internalActiveStep,
    steps,
    orientation,
    variant,
    size,
    nextStep,
    prevStep,
    goToStep,
    getStepStatus,
    focusStep,
    focusedStep,
    isKeyboardNavigation
  }), [
    internalActiveStep,
    steps,
    orientation,
    variant,
    size,
    focusedStep,
    isKeyboardNavigation
  ]);
  
  // Rendere die Beschreibung für Screenreader
  const renderDescription = () => {
    if (!description) return null;
    
    return (
      <div id={`${stepperId}-description`} className="sr-only">
        {description}
      </div>
    );
  };
  
  // Rendere die Live-Region für Ankündigungen
  const renderLiveRegion = () => {
    if (!liveRegion) return null;
    
    return (
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announceMessage}
      </div>
    );
  };
  
  // Rendere den Fehler
  const renderError = () => {
    if (!error) return null;
    
    return (
      <div 
        id={`${stepperId}-error`} 
        className="text-red-600 dark:text-red-400 mt-2 text-sm"
        role="alert"
      >
        {error}
      </div>
    );
  };
  
  // Rendere den Erfolg
  const renderSuccess = () => {
    if (!success) return null;
    
    return (
      <div 
        id={`${stepperId}-success`} 
        className="text-green-600 dark:text-green-400 mt-2 text-sm"
      >
        {success}
      </div>
    );
  };
  
  // Rendere den Hilfetext
  const renderHelperText = () => {
    if (!helperText) return null;
    
    return (
      <div 
        id={`${stepperId}-helper`} 
        className="text-gray-500 dark:text-gray-400 mt-2 text-sm"
      >
        {helperText}
      </div>
    );
  };
  
  // Rendere den Ladeindikator
  const renderLoading = () => {
    if (!loading) return null;
    
    return (
      <div 
        id={`${stepperId}-loading`} 
        className="text-gray-500 dark:text-gray-400 mt-2 text-sm"
        aria-live="polite"
      >
        Wird geladen...
      </div>
    );
  };
  
  // Rendere die Schritte
  const renderSteps = () => {
    return steps.map((step, index) => {
      const status = getStepStatus(index);
      const isActive = status === 'current';
      const isCompleted = status === 'completed';
      const isUpcoming = status === 'upcoming';
      const isDisabled = !!step.disabled;
      const isFocused = index === focusedStep;
      
      // Bestimme die Klassen für den Schritt
      const stepClasses = [
        'stepper-step',
        isActive ? 'stepper-step-active' : '',
        isCompleted ? 'stepper-step-completed' : '',
        isUpcoming ? 'stepper-step-upcoming' : '',
        isDisabled ? 'stepper-step-disabled' : '',
        isFocused && isKeyboardNavigation ? 'stepper-step-focused' : '',
        clickable && !isDisabled ? 'stepper-step-clickable' : '',
        alternativeLabel ? 'stepper-step-alternative' : '',
        orientation === 'vertical' ? 'stepper-step-vertical' : '',
        stepsClassName
      ].filter(Boolean).join(' ');
      
      // Bestimme die Klassen für den Connector
      const connectorClasses = [
        'stepper-connector',
        isCompleted ? 'stepper-connector-completed' : '',
        orientation === 'vertical' ? 'stepper-connector-vertical' : '',
        alternativeLabel ? 'stepper-connector-alternative' : '',
        nonLinear ? 'stepper-connector-nonlinear' : '',
        connectorClassName
      ].filter(Boolean).join(' ');
      
      // Bestimme die Klassen für das Label
      const labelClasses = [
        'stepper-label',
        isActive ? 'stepper-label-active' : '',
        isCompleted ? 'stepper-label-completed' : '',
        isUpcoming ? 'stepper-label-upcoming' : '',
        isDisabled ? 'stepper-label-disabled' : '',
        labelClassName
      ].filter(Boolean).join(' ');
      
      // Bestimme die Klassen für die Beschreibung
      const descriptionClasses = [
        'stepper-description',
        isActive ? 'stepper-description-active' : '',
        isCompleted ? 'stepper-description-completed' : '',
        isUpcoming ? 'stepper-description-upcoming' : '',
        isDisabled ? 'stepper-description-disabled' : '',
        descriptionClassName
      ].filter(Boolean).join(' ');
      
      // Bestimme die Klassen für das Icon
      const iconClasses = [
        'stepper-icon',
        isActive ? 'stepper-icon-active' : '',
        isCompleted ? 'stepper-icon-completed' : '',
        isUpcoming ? 'stepper-icon-upcoming' : '',
        isDisabled ? 'stepper-icon-disabled' : '',
        iconClassName
      ].filter(Boolean).join(' ');
      
      // Bestimme das anzuzeigende Icon
      const renderIcon = () => {
        if (isCompleted && completedIcon) {
          return completedIcon;
        } else if (isActive && activeIcon) {
          return activeIcon;
        } else if (isUpcoming && upcomingIcon) {
          return upcomingIcon;
        } else if (step.icon) {
          return step.icon;
        } else if (numbered) {
          return index + 1;
        }
        
        return null;
      };
      
      // Bestimme die ARIA-Attribute für den Schritt
      const getStepAriaAttributes = () => {
        const attributes: Record<string, string> = {};
        
        attributes['aria-current'] = isActive ? 'step' : 'false';
        
        if (isDisabled) {
          attributes['aria-disabled'] = 'true';
        }
        
        if (step.screenReaderDescription) {
          attributes['aria-describedby'] = `${stepperId}-step-${index}-description`;
        }
        
        return attributes;
      };
      
      // Rendere die versteckte Beschreibung für Screenreader
      const renderStepDescription = () => {
        if (!step.screenReaderDescription) return null;
        
        return (
          <div id={`${stepperId}-step-${index}-description`} className="sr-only">
            {step.screenReaderDescription}
          </div>
        );
      };
      
      return (
        <div key={step.id} className="stepper-step-container">
          {renderStepDescription()}
          
          {/* Connector vor dem Schritt (außer beim ersten Schritt) */}
          {index > 0 && !nonLinear && !alternativeLabel && (
            <div className={connectorClasses}>
              {connector || <div className="stepper-connector-line"></div>}
            </div>
          )}
          
          {/* Schritt */}
          <div
            ref={el => stepRefs.current[index] = el}
            className={stepClasses}
            onClick={() => handleStepClick(index)}
            onFocus={() => handleStepFocus(index)}
            onBlur={handleStepBlur}
            tabIndex={isDisabled ? -1 : 0}
            role="button"
            aria-label={step.ariaLabel || (typeof step.title === 'string' ? step.title : `Schritt ${index + 1}`)}
            {...getStepAriaAttributes()}
          >
            {/* Icon */}
            <div className={iconClasses}>
              {renderIcon()}
            </div>
            
            {/* Label und Beschreibung */}
            <div className="stepper-content">
              <div className={labelClasses}>
                {step.title}
                {step.optional && showOptionalLabel && (
                  <div className="stepper-optional-label">
                    {optionalLabel}
                  </div>
                )}
              </div>
              
              {showDescription && step.description && (
                <div className={descriptionClasses}>
                  {step.description}
                </div>
              )}
            </div>
          </div>
          
          {/* Connector nach dem Schritt (außer beim letzten Schritt) */}
          {index < steps.length - 1 && !nonLinear && (
            <div className={connectorClasses}>
              {connector || <div className="stepper-connector-line"></div>}
            </div>
          )}
        </div>
      );
    });
  };
  
  // Bestimme die ARIA-Attribute für den Stepper
  const getAriaAttributes = () => {
    const attributes: Record<string, string> = {};
    
    if (description) {
      attributes['aria-describedby'] = `${stepperId}-description`;
    }
    
    if (error) {
      attributes['aria-errormessage'] = `${stepperId}-error`;
      attributes['aria-invalid'] = 'true';
    }
    
    if (helperText && !error) {
      attributes['aria-describedby'] = (attributes['aria-describedby'] ? `${attributes['aria-describedby']} ${stepperId}-helper` : `${stepperId}-helper`);
    }
    
    if (success) {
      attributes['aria-describedby'] = (attributes['aria-describedby'] ? `${attributes['aria-describedby']} ${stepperId}-success` : `${stepperId}-success`);
    }
    
    if (loading) {
      attributes['aria-busy'] = 'true';
    }
    
    return attributes;
  };
  
  // Bestimme die Klassen für den Stepper
  const stepperClasses = [
    'stepper',
    `stepper-${orientation}`,
    `stepper-${variant}`,
    `stepper-${size}`,
    alternativeLabel ? 'stepper-alternative-label' : '',
    nonLinear ? 'stepper-non-linear' : '',
    fullWidth ? 'stepper-full-width' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <StepperContext.Provider value={contextValue}>
      <div 
        className={stepperClasses}
        id={stepperId}
        role="group"
        aria-label={ariaLabel || 'Stepper'}
        onKeyDown={handleKeyDown}
        {...getAriaAttributes()}
      >
        {renderDescription()}
        {renderLiveRegion()}
        
        <div className="stepper-steps">
          {renderSteps()}
        </div>
        
        {renderError()}
        {renderSuccess()}
        {renderHelperText()}
        {renderLoading()}
      </div>
    </StepperContext.Provider>
  );
};

export default StepperA11y;