// TODO: forwardRef hinzufügen
// packages/@smolitux/core/src/components/Stepper/Stepper.tsx
import React, { createContext, useContext, useMemo } from 'react';
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
  /** Schritte im Stepper */
  steps: Step[];
  /** Aktiver Schritt-Index */
  activeStep: number;
  /** Callback beim Ändern des aktiven Schritts */
  onStepChange?: (index: number) => void;
  /** Orientierung des Steppers */
  orientation?: 'horizontal' | 'vertical';
  /** Variante des Steppers */
  variant?: 'default' | 'outlined' | 'contained';
  /** Größe des Steppers */
  size?: 'sm' | 'md' | 'lg';
  /** Kinder-Elemente (StepperContent) */
  children?: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Verbindungslinie zwischen Schritten anzeigen */
  showConnector?: boolean;
  /** Klickbare Schritte */
  clickable?: boolean;
  /** Alternativtext für Barrierefreiheit */
  ariaLabel?: string;
}

/**
 * Stepper-Komponente für mehrstufige Prozesse
 *
 * @example
 * ```tsx
 * <Stepper
 *   steps={[
 *     { id: 'step1', title: 'Schritt 1' },
 *     { id: 'step2', title: 'Schritt 2' },
 *     { id: 'step3', title: 'Schritt 3' }
 *   ]}
 *   activeStep={1}
 * />
 * ```
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepChange,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  children,
  className = '',
  showConnector = true,
  clickable = true,
  ariaLabel = 'Stepper',
}) => {
  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      onStepChange?.(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      onStepChange?.(activeStep - 1);
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length && clickable) {
      onStepChange?.(index);
    }
  };

  const getStepStatus = (index: number): StepStatus => {
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'current';
    return 'upcoming';
  };

  const contextValue = useMemo(
    () => ({
      activeStep,
      steps,
      orientation,
      variant,
      size,
      nextStep,
      prevStep,
      goToStep,
      getStepStatus,
    }),
    [activeStep, steps, orientation, variant, size, clickable]
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        className={`
          smolitux-stepper 
          smolitux-stepper--${orientation} 
          smolitux-stepper--${variant}
          smolitux-stepper--${size}
          ${className}
        `}
        role="navigation"
        aria-label={ariaLabel}
      >
        <div className="smolitux-stepper-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`
                smolitux-stepper-step
                ${step.disabled ? 'smolitux-stepper-step--disabled' : ''}
                smolitux-stepper-step--${getStepStatus(index)}
              `}
            >
              <div
                className="smolitux-stepper-step-header"
                onClick={() => !step.disabled && goToStep(index)}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable && !step.disabled ? 0 : undefined}
                aria-current={index === activeStep ? 'step' : undefined}
                aria-disabled={step.disabled}
                aria-label={`${step.title}${step.description ? `, ${step.description}` : ''}${step.optional ? ', Optional' : ''}${index < activeStep ? ', Abgeschlossen' : index === activeStep ? ', Aktueller Schritt' : ', Kommender Schritt'}`}
                aria-roledescription="Schritt"
                onKeyDown={(e) => {
                  if (clickable && !step.disabled && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    goToStep(index);
                  }
                }}
              >
                <div className="smolitux-stepper-step-icon">
                  {step.icon ||
                    (getStepStatus(index) === 'completed' ? (
                      <svg
                        className="smolitux-stepper-check-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    ))}
                </div>
                <div className="smolitux-stepper-step-label">
                  <div className="smolitux-stepper-step-title">{step.title}</div>
                  {step.description && (
                    <div className="smolitux-stepper-step-description">{step.description}</div>
                  )}
                  {step.optional && <div className="smolitux-stepper-step-optional">Optional</div>}
                </div>
              </div>

              {showConnector && index < steps.length - 1 && (
                <div className="smolitux-stepper-connector">
                  <span className="smolitux-stepper-connector-line"></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {children && <div className="smolitux-stepper-content">{children}</div>}
      </div>
    </StepperContext.Provider>
  );
};

export interface StepperContentProps {
  /** Inhalt für den aktuellen Schritt */
  children: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * StepperContent-Komponente für den Inhalt des aktuellen Schritts
 */
export const StepperContent: React.FC<StepperContentProps> = ({ children, className = '' }) => {
  const { activeStep } = useStepperContext();

  return (
    <div
      className={`smolitux-stepper-content-container ${className}`}
      role="region"
      aria-label={`Inhalt für Schritt ${activeStep + 1}`}
    >
      {React.Children.toArray(children)[activeStep]}
    </div>
  );
};

export interface StepperActionsProps {
  /** Kinder-Elemente (Buttons) */
  children?: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Text für den Zurück-Button */
  backLabel?: string;
  /** Text für den Weiter-Button */
  nextLabel?: string;
  /** Text für den Abschließen-Button */
  completeLabel?: string;
  /** Callback beim Klick auf Zurück */
  onBack?: () => void;
  /** Callback beim Klick auf Weiter */
  onNext?: () => void;
  /** Callback beim Klick auf Abschließen */
  onComplete?: () => void;
  /** Standardbuttons anzeigen */
  showDefaultButtons?: boolean;
}

/**
 * StepperActions-Komponente für die Steuerung des Steppers
 */
export const StepperActions: React.FC<StepperActionsProps> = ({
  children,
  className = '',
  backLabel = 'Zurück',
  nextLabel = 'Weiter',
  completeLabel = 'Abschließen',
  onBack,
  onNext,
  onComplete,
  showDefaultButtons = true,
}) => {
  const { activeStep, steps, prevStep, nextStep } = useStepperContext();

  const handleBack = () => {
    prevStep();
    onBack?.();
  };

  const handleNext = () => {
    nextStep();
    onNext?.();
  };

  const handleComplete = () => {
    onComplete?.();
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <div
      className={`smolitux-stepper-actions ${className}`}
      role="group"
      aria-label="Stepper-Aktionen"
    >
      {children ||
        (showDefaultButtons && (
          <>
            <button
              className="smolitux-stepper-back-button"
              onClick={handleBack}
              disabled={activeStep === 0}
              aria-label={`${backLabel}${activeStep === 0 ? ', deaktiviert' : ''}`}
            >
              {backLabel}
            </button>

            {isLastStep ? (
              <button
                className="smolitux-stepper-complete-button"
                onClick={handleComplete}
                aria-label={completeLabel}
              >
                {completeLabel}
              </button>
            ) : (
              <button
                className="smolitux-stepper-next-button"
                onClick={handleNext}
                aria-label={nextLabel}
              >
                {nextLabel}
              </button>
            )}
          </>
        ))}
    </div>
  );
};

export default Stepper;
