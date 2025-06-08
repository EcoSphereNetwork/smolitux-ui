// packages/@smolitux/core/src/components/Switch/Switch.a11y.tsx
import React, { forwardRef, useEffect, useState, useRef, useMemo, useCallback, useId } from 'react';
import { useFormControl } from '../FormControl';

export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SwitchVariant = 'solid' | 'outline' | 'filled' | 'minimal';
export type SwitchColorScheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Text-Label (alternativ zu label im FormControl) */
  label?: React.ReactNode;
  /** Hilfetext (alternativ zu helperText im FormControl) */
  helperText?: React.ReactNode;
  /** Fehlermeldung (alternativ zu error im FormControl) */
  error?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Größe des Switches */
  size?: SwitchSize;
  /** Visuelle Variante */
  variant?: SwitchVariant;
  /** Farbe des Switches */
  colorScheme?: SwitchColorScheme;
  /** Position des Labels */
  labelPosition?: 'left' | 'right';
  /** Label-Ausrichtung wenn labelPosition="left" */
  labelAlign?: 'start' | 'center' | 'end';
  /** Checked/Unchecked-Icons anzeigen */
  icons?: boolean;
  /** An/Aus-Beschriftung */
  labels?: { on?: string; off?: string };
  /** Ob der Switch einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob der Switch abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob der Switch einen Schatten haben soll */
  shadow?: boolean;
  /** Ob der Switch einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob der Switch einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob der Switch einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob der Switch einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob der Switch einen Tooltip haben soll */
  tooltip?: string;
  /** Ob der Switch im Ladezustand ist */
  isLoading?: boolean;
  /** Ob der Switch gültig ist */
  isValid?: boolean;
  /** Ob der Switch ungültig ist */
  isInvalid?: boolean;
  /** Ob der Switch erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob der Switch deaktiviert ist */
  isDisabled?: boolean;
  /** Ob der Switch erforderlich ist */
  isRequired?: boolean;
  /** Ob der Switch einen Erfolgsindikator anzeigen soll */
  showSuccessIndicator?: boolean;
  /** Ob der Switch einen Fehlerindikator anzeigen soll */
  showErrorIndicator?: boolean;
  /** Ob der Switch einen Ladeindikator anzeigen soll */
  showLoadingIndicator?: boolean;
  /** Ob der Switch einen Validierungsindikator anzeigen soll */
  showValidationIndicator?: boolean;
  /** Ob das Label ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideLabel?: boolean;
  /** Ob der Hilfetext ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideHelperText?: boolean;
  /** Ob die Fehlermeldung ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideError?: boolean;
  /** Ob die Erfolgsmeldung ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideSuccessMessage?: boolean;
  /** Zusätzliche CSS-Klassen für das Label */
  labelClassName?: string;
  /** Zusätzliche CSS-Klassen für den Hilfetext */
  helperTextClassName?: string;
  /** Zusätzliche CSS-Klassen für die Fehlermeldung */
  errorClassName?: string;
  /** Zusätzliche CSS-Klassen für die Erfolgsmeldung */
  successClassName?: string;
  /** Zusätzliche CSS-Klassen für den Container */
  containerClassName?: string;
  /** Zusätzliche CSS-Klassen für den Switch-Container */
  switchContainerClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Tooltip für den Switch */
  switchTooltip?: string;
  /** Beschreibung für den Switch (für Screenreader) */
  description?: string;
  /** Ob der Switch automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Benutzerdefiniertes Icon für den eingeschalteten Zustand */
  checkedIcon?: React.ReactNode;
  /** Benutzerdefiniertes Icon für den ausgeschalteten Zustand */
  uncheckedIcon?: React.ReactNode;
  /** Ob der Switch einen Ripple-Effekt haben soll */
  ripple?: boolean;
  /** Ob der Switch vertikal ausgerichtet werden soll */
  isVertical?: boolean;
  /** Ob der Switch als iOS-Style angezeigt werden soll */
  isIOS?: boolean;
  /** Ob der Switch als Android-Style angezeigt werden soll */
  isAndroid?: boolean;
  /** Ob der Switch als Material-Style angezeigt werden soll */
  isMaterial?: boolean;
  /** Ob der Switch als Windows-Style angezeigt werden soll */
  isWindows?: boolean;
  /** Ob der Switch als Fluent-Style angezeigt werden soll */
  isFluent?: boolean;
  /** Ob der Switch als Flat-Style angezeigt werden soll */
  isFlat?: boolean;
  /** Ob der Switch als 3D-Style angezeigt werden soll */
  is3D?: boolean;
  /** Ob der Switch als Neon-Style angezeigt werden soll */
  isNeon?: boolean;
  /** Ob der Switch als Glassmorphism-Style angezeigt werden soll */
  isGlass?: boolean;
  /** Ob der Switch als Neumorphism-Style angezeigt werden soll */
  isNeumorphic?: boolean;
  /** Ob der Switch als Skeuomorphism-Style angezeigt werden soll */
  isSkeuomorphic?: boolean;
  /** Ob der Switch als Retro-Style angezeigt werden soll */
  isRetro?: boolean;
  /** Ob der Switch als Futuristic-Style angezeigt werden soll */
  isFuturistic?: boolean;
  /** Ob der Switch als Minimal-Style angezeigt werden soll */
  isMinimal?: boolean;
  /** ARIA-Label für den Switch */
  ariaLabel?: string;
  /** Benutzerdefinierter Text für den eingeschalteten Zustand (für Screenreader) */
  checkedStateText?: string;
  /** Benutzerdefinierter Text für den ausgeschalteten Zustand (für Screenreader) */
  uncheckedStateText?: string;
  /** Ob der Switch als "pressed" angekündigt werden soll */
  pressed?: boolean;
  /** Ob der Switch als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob der Switch als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob der Switch als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob der Switch als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

/**
 * Barrierefreie Switch-Komponente für Formulare
 *
 * @example
 * ```tsx
 * <SwitchA11y
 *   label="Benachrichtigungen aktivieren"
 *   ariaLabel="Benachrichtigungen"
 *   checkedStateText="aktiviert"
 *   uncheckedStateText="deaktiviert"
 * />
 * ```
 */
export const SwitchA11y = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      helperText,
      error,
      successMessage,
      size = 'md',
      variant = 'solid',
      colorScheme = 'primary',
      labelPosition = 'right',
      labelAlign = 'start',
      icons = false,
      labels,
      className = '',
      containerClassName = '',
      switchContainerClassName = '',
      labelClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      successClassName = '',
      disabled,
      id,
      name,
      checked,
      defaultChecked,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      bordered = true,
      rounded = true,
      shadow = false,
      hoverable = true,
      focusable = true,
      transition = true,
      transparent = false,
      tooltip,
      isLoading = false,
      isValid = false,
      isInvalid = false,
      isSuccess = false,
      isDisabled,
      isRequired,
      required,
      showSuccessIndicator = true,
      showErrorIndicator = true,
      showLoadingIndicator = true,
      showValidationIndicator = true,
      hideLabel = false,
      hideHelperText = false,
      hideError = false,
      hideSuccessMessage = false,
      labelTooltip,
      switchTooltip,
      description,
      autoFocus = false,
      checkedIcon,
      uncheckedIcon,
      ripple = false,
      isVertical = false,
      isIOS = false,
      isAndroid = false,
      isMaterial = false,
      isWindows = false,
      isFluent = false,
      isFlat = false,
      is3D = false,
      isNeon = false,
      isGlass = false,
      isNeumorphic = false,
      isSkeuomorphic = false,
      isRetro = false,
      isFuturistic = false,
      isMinimal = false,
      ariaLabel,
      checkedStateText = 'eingeschaltet',
      uncheckedStateText = 'ausgeschaltet',
      pressed,
      busy = false,
      liveRegionPoliteness = 'polite',
      atomic = true,
      relevant,
      ...props
    },
    ref
  ) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();

    // Hole FormControl-Context, falls vorhanden
    const formControl = useFormControl();

    // Kombiniere Props mit FormControl-Context
    const _id = id || formControl.id || `switch-${uniqueId}`;
    const _disabled = isDisabled ?? disabled ?? formControl.disabled;
    const _required = isRequired ?? required ?? formControl.required;
    const _error = error || formControl.error;
    const _isInvalid = isInvalid || Boolean(_error) || formControl.isInvalid;
    const _isValid = isValid || formControl.isValid;
    const _isSuccess = isSuccess || formControl.isSuccess;
    const _isLoading = isLoading || formControl.isLoading;
    const _name = name || formControl.name;

    // State für Fokus und Hover
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
    const [showRipple, setShowRipple] = useState(false);
    const [isChecked, setIsChecked] = useState(checked ?? defaultChecked ?? false);
    const [announceMessage, setAnnounceMessage] = useState<string>('');

    // Refs
    const switchRef = useRef<HTMLInputElement>(null);

    // Kombiniere den externen Ref mit unserem internen Ref
    const handleRef = (element: HTMLInputElement | null) => {
      if (switchRef) {
        (switchRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };

    // Effekt für autoFocus
    useEffect(() => {
      if (autoFocus && switchRef.current) {
        switchRef.current.focus();
      }
    }, [autoFocus]);

    // Effekt für checked-Prop
    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    // Klassen für verschiedene Größen
    const sizeClasses = {
      xs: {
        container: 'h-4 w-7',
        thumb: 'h-3 w-3',
        translate: 'translate-x-3',
        text: 'text-xs',
      },
      sm: {
        container: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
        text: 'text-sm',
      },
      md: {
        container: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
        text: 'text-base',
      },
      lg: {
        container: 'h-7 w-14',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7',
        text: 'text-lg',
      },
      xl: {
        container: 'h-8 w-16',
        thumb: 'h-7 w-7',
        translate: 'translate-x-8',
        text: 'text-xl',
      },
    };

    // Klassen für verschiedene Varianten
    const variantClasses: Record<SwitchVariant, string> = {
      solid: 'bg-gray-200 dark:bg-gray-700',
      outline: bordered
        ? 'border-2 border-gray-300 dark:border-gray-600 bg-transparent'
        : 'bg-transparent',
      filled: 'bg-gray-100 dark:bg-gray-800',
      minimal: 'bg-transparent',
    };

    // Klassen für verschiedene Farben
    const colorClasses = useMemo(
      () => ({
        primary: 'bg-primary-600 dark:bg-primary-500',
        secondary: 'bg-secondary-600 dark:bg-secondary-500',
        success: 'bg-green-600 dark:bg-green-500',
        danger: 'bg-red-600 dark:bg-red-500',
        warning: 'bg-yellow-600 dark:bg-yellow-500',
        info: 'bg-blue-600 dark:bg-blue-500',
        neutral: 'bg-gray-600 dark:bg-gray-500',
      }),
      []
    );

    // Zustandsabhängige Klassen
    const stateClasses = _isInvalid
      ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
      : _isValid || _isSuccess
        ? 'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500'
        : '';

    // Effekt-spezifische Klassen
    const effectClasses = {
      shadow: shadow ? 'shadow-md' : '',
      rounded: rounded ? 'rounded-full' : 'rounded',
      hover: hoverable && !_disabled ? 'hover:bg-opacity-90 dark:hover:bg-opacity-90' : '',
      focus: focusable && !_disabled ? 'focus:outline-none focus:ring-2 focus:ring-offset-2' : '',
      transition: transition ? 'transition-all duration-200 ease-in-out' : '',
      transparent: transparent ? 'bg-opacity-80 dark:bg-opacity-80' : '',
    };

    // Style-spezifische Klassen
    const styleClasses = {
      ios: isIOS ? 'ios-switch' : '',
      android: isAndroid ? 'android-switch' : '',
      material: isMaterial ? 'material-switch' : '',
      windows: isWindows ? 'windows-switch' : '',
      fluent: isFluent ? 'fluent-switch' : '',
      flat: isFlat ? 'flat-switch' : '',
      '3d': is3D ? '3d-switch' : '',
      neon: isNeon ? 'neon-switch' : '',
      glass: isGlass ? 'glass-switch' : '',
      neumorphic: isNeumorphic ? 'neumorphic-switch' : '',
      skeuomorphic: isSkeuomorphic ? 'skeuomorphic-switch' : '',
      retro: isRetro ? 'retro-switch' : '',
      futuristic: isFuturistic ? 'futuristic-switch' : '',
      minimal: isMinimal ? 'minimal-switch' : '',
    };

    // Basis-Klassen für den Switch-Container
    const switchContainerClasses = [
      'relative inline-flex items-center flex-shrink-0',
      sizeClasses[size].container,
      variantClasses[variant],
      isChecked ? colorClasses[colorScheme] : '',
      stateClasses,
      effectClasses.shadow,
      effectClasses.rounded,
      effectClasses.hover,
      effectClasses.focus,
      effectClasses.transition,
      effectClasses.transparent,
      _disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      Object.values(styleClasses).filter(Boolean).join(' '),
      switchContainerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    // Basis-Klassen für den Switch-Thumb
    const thumbClasses = [
      'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0',
      sizeClasses[size].thumb,
      isChecked ? sizeClasses[size].translate : 'translate-x-0',
      effectClasses.transition,
      _disabled ? 'opacity-80' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Event-Handler
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      setIsPressed(false);
    }, []);

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLLabelElement>) => {
        setIsPressed(true);

        // Ripple-Effekt
        if (ripple && switchRef.current) {
          const rect = switchRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          setRippleStyle({
            left: `${x}px`,
            top: `${y}px`,
          });

          setShowRipple(true);
          setTimeout(() => setShowRipple(false), 600);
        }
      },
      [ripple]
    );

    const handleMouseUp = useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
          setIsPressed(true);
        }

        onKeyDown?.(e);
      },
      [onKeyDown]
    );

    const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        setIsPressed(false);
      }
    }, []);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!_disabled) {
          setIsChecked(e.target.checked);

          // Ankündige für Screenreader
          setAnnounceMessage(e.target.checked ? checkedStateText : uncheckedStateText);

          onChange?.(e);
        }
      },
      [_disabled, onChange, checkedStateText, uncheckedStateText]
    );

    // Bestimme die ARIA-Attribute für den Switch
    const ariaAttributes = useMemo(() => {
      const attributes: Record<string, string> = {};

      if (description) {
        attributes['aria-describedby'] = `${_id}-description`;
      }

      if (_error) {
        attributes['aria-errormessage'] = `${_id}-error`;
        attributes['aria-invalid'] = 'true';
      }

      if (helperText && !_error) {
        attributes['aria-describedby'] = attributes['aria-describedby']
          ? `${attributes['aria-describedby']} ${_id}-helper`
          : `${_id}-helper`;
      }

      if (successMessage) {
        attributes['aria-describedby'] = attributes['aria-describedby']
          ? `${attributes['aria-describedby']} ${_id}-success`
          : `${_id}-success`;
      }

      if (busy) {
        attributes['aria-busy'] = 'true';
      }

      if (pressed !== undefined) {
        attributes['aria-pressed'] = pressed.toString();
      }

      return attributes;
    }, [_id, description, _error, helperText, successMessage, busy, pressed]);

    // Rendere die Beschreibung für Screenreader
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={`${_id}-description`} className="sr-only">
          {description}
        </div>
      );
    };

    // Rendere die Live-Region für Ankündigungen
    const renderLiveRegion = () => {
      if (liveRegionPoliteness === 'off') return null;

      return (
        <div
          aria-live={liveRegionPoliteness}
          aria-atomic={atomic ? 'true' : 'false'}
          aria-relevant={relevant}
          className="sr-only"
        >
          {announceMessage}
        </div>
      );
    };

    // Rendere den Hilfetext
    const renderHelperText = () => {
      if (labelPosition === 'left' || (!_error && !helperText && !successMessage)) return null;

      return (
        <div className="mt-1 text-sm">
          {_error && !hideError ? (
            <p
              id={`${_id}-error`}
              className={`text-red-600 dark:text-red-400 ${errorClassName}`}
              role="alert"
            >
              {_error}
            </p>
          ) : successMessage && !hideSuccessMessage ? (
            <p
              id={`${_id}-success`}
              className={`text-green-600 dark:text-green-400 ${successClassName}`}
            >
              {successMessage}
            </p>
          ) : helperText && !hideHelperText ? (
            <p
              id={`${_id}-helper`}
              className={`text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
            >
              {helperText}
            </p>
          ) : null}
        </div>
      );
    };

    // Rendere das Label
    const renderLabel = () => {
      if (!label) return null;

      return (
        <span
          className={`${hideLabel ? 'sr-only' : ''} ${sizeClasses[size].text} text-gray-700 dark:text-gray-300 ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${labelClassName}`}
          title={labelTooltip}
        >
          {label}
          {_required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </span>
      );
    };

    // Rendere den Switch
    const renderSwitch = () => {
      return (
        <div className="relative">
          <input
            ref={handleRef}
            type="checkbox"
            id={_id}
            name={_name}
            checked={isChecked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            disabled={_disabled}
            required={_required}
            className="sr-only"
            title={switchTooltip || tooltip}
            aria-label={ariaLabel}
            aria-checked={isChecked}
            role="switch"
            {...ariaAttributes}
            {...props}
          />

          <div className={switchContainerClasses}>
            {/* Thumb */}
            <span className={thumbClasses} aria-hidden="true">
              {isChecked && checkedIcon && (
                <span className="absolute inset-0 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  {checkedIcon}
                </span>
              )}
              {!isChecked && uncheckedIcon && (
                <span className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  {uncheckedIcon}
                </span>
              )}
            </span>

            {/* Icons */}
            {icons && (
              <>
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-1.5 text-white ${isChecked ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                  aria-hidden="true"
                >
                  {checkedIcon || '✓'}
                </span>
                <span
                  className={`absolute inset-y-0 right-0 flex items-center pr-1.5 text-gray-400 dark:text-gray-500 ${isChecked ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                  aria-hidden="true"
                >
                  {uncheckedIcon || '✕'}
                </span>
              </>
            )}

            {/* Labels */}
            {labels && (
              <>
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-1 text-xs text-white ${isChecked ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                  aria-hidden="true"
                >
                  {labels.on || 'ON'}
                </span>
                <span
                  className={`absolute inset-y-0 right-0 flex items-center pr-1 text-xs text-gray-700 dark:text-gray-300 ${isChecked ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                  aria-hidden="true"
                >
                  {labels.off || 'OFF'}
                </span>
              </>
            )}
          </div>

          {/* Ripple-Effekt */}
          {ripple && showRipple && (
            <div
              className="absolute rounded-full bg-current opacity-20 animate-ripple pointer-events-none"
              style={{
                ...rippleStyle,
                width: '30px',
                height: '30px',
                marginLeft: '-15px',
                marginTop: '-15px',
              }}
              aria-hidden="true"
            ></div>
          )}

          {/* Versteckter Text für Screenreader */}
          <span className="sr-only">{isChecked ? checkedStateText : uncheckedStateText}</span>
        </div>
      );
    };

    return (
      <div
        className={`${isVertical ? 'flex flex-col' : 'flex items-center'} ${containerClassName} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Beschreibung für Screenreader */}
        {renderDescription()}
        {renderLiveRegion()}

        {/* Label links */}
        {labelPosition === 'left' && (
          <label
            htmlFor={_id}
            className={`${isVertical ? 'mb-2' : 'mr-2'} ${labelAlign === 'end' ? 'text-right' : labelAlign === 'center' ? 'text-center' : 'text-left'} flex-grow`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {renderLabel()}
            {renderHelperText()}
          </label>
        )}

        {/* Switch */}
        <div className={`flex items-center ${isVertical ? 'mb-2' : ''}`}>{renderSwitch()}</div>

        {/* Label rechts */}
        {labelPosition === 'right' && (
          <label
            htmlFor={_id}
            className={`${isVertical ? 'mt-2' : 'ml-2'}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {renderLabel()}
            {renderHelperText()}
          </label>
        )}
      </div>
    );
  }
);

SwitchA11y.displayName = 'SwitchA11y';

export default SwitchA11y;
