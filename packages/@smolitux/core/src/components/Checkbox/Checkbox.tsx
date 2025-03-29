import React, { forwardRef, useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useFormControl } from '../FormControl';

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CheckboxVariant = 'solid' | 'outline' | 'filled' | 'minimal';
export type CheckboxColorScheme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type CheckboxLabelPosition = 'left' | 'right';
export type CheckboxDisplayType = 'checkbox' | 'switch' | 'radio' | 'toggle' | 'button';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Text-Label */
  label?: React.ReactNode;
  /** Hilfetext */
  helperText?: React.ReactNode;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Größe der Checkbox */
  size?: CheckboxSize;
  /** Visuelle Variante */
  variant?: CheckboxVariant;
  /** Indeterminierter Zustand */
  indeterminate?: boolean;
  /** Farbe der Checkbox */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  /** Ob die Checkbox einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob die Checkbox abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob die Checkbox einen Schatten haben soll */
  shadow?: boolean;
  /** Ob die Checkbox einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob die Checkbox einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob die Checkbox einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob die Checkbox einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob die Checkbox einen Tooltip haben soll */
  tooltip?: string;
  /** Ob die Checkbox im Ladezustand ist */
  isLoading?: boolean;
  /** Ob die Checkbox gültig ist */
  isValid?: boolean;
  /** Ob die Checkbox ungültig ist */
  isInvalid?: boolean;
  /** Ob die Checkbox erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob die Checkbox deaktiviert ist */
  isDisabled?: boolean;
  /** Ob die Checkbox erforderlich ist */
  isRequired?: boolean;
  /** Ob die Checkbox einen Erfolgsindikator anzeigen soll */
  showSuccessIndicator?: boolean;
  /** Ob die Checkbox einen Fehlerindikator anzeigen soll */
  showErrorIndicator?: boolean;
  /** Ob die Checkbox einen Ladeindikator anzeigen soll */
  showLoadingIndicator?: boolean;
  /** Ob die Checkbox einen Validierungsindikator anzeigen soll */
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
  /** Zusätzliche CSS-Klassen für den Checkbox-Container */
  checkboxContainerClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Tooltip für die Checkbox */
  checkboxTooltip?: string;
  /** Beschreibung für die Checkbox (für Screenreader) */
  description?: string;
  /** Ob die Checkbox automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Ob die Checkbox ein Icon haben soll */
  icon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den ausgewählten Zustand haben soll */
  checkedIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den nicht ausgewählten Zustand haben soll */
  uncheckedIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den indeterminierten Zustand haben soll */
  indeterminateIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Ladezustand haben soll */
  loadingIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Fehlerzustand haben soll */
  errorIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Erfolgszustand haben soll */
  successIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den deaktivierten Zustand haben soll */
  disabledIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den fokussierten Zustand haben soll */
  focusedIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Hover-Zustand haben soll */
  hoverIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den aktiven Zustand haben soll */
  activeIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den inaktiven Zustand haben soll */
  inactiveIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den gültigen Zustand haben soll */
  validIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den ungültigen Zustand haben soll */
  invalidIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den erforderlichen Zustand haben soll */
  requiredIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den optionalen Zustand haben soll */
  optionalIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Tooltip haben soll */
  tooltipIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Hilfetext haben soll */
  helperTextIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für die Fehlermeldung haben soll */
  errorMessageIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für die Erfolgsmeldung haben soll */
  successMessageIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Beschreibungstext haben soll */
  descriptionIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Labeltext haben soll */
  labelIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Container haben soll */
  containerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Checkbox-Container haben soll */
  checkboxContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Tooltip-Container haben soll */
  tooltipContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Hilfetext-Container haben soll */
  helperTextContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Fehlermeldung-Container haben soll */
  errorMessageContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Erfolgsmeldung-Container haben soll */
  successMessageContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Beschreibungstext-Container haben soll */
  descriptionContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Labeltext-Container haben soll */
  labelContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Container-Container haben soll */
  containerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Checkbox-Container-Container haben soll */
  checkboxContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Tooltip-Container-Container haben soll */
  tooltipContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Hilfetext-Container-Container haben soll */
  helperTextContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Fehlermeldung-Container-Container haben soll */
  errorMessageContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Erfolgsmeldung-Container-Container haben soll */
  successMessageContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Beschreibungstext-Container-Container haben soll */
  descriptionContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Labeltext-Container-Container haben soll */
  labelContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Container-Container-Container haben soll */
  containerContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Icon für den Checkbox-Container-Container-Container haben soll */
  checkboxContainerContainerContainerIcon?: React.ReactNode;
  /** Ob die Checkbox ein Ripple-Effekt haben soll */
  ripple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den ausgewählten Zustand haben soll */
  checkedRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den nicht ausgewählten Zustand haben soll */
  uncheckedRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den indeterminierten Zustand haben soll */
  indeterminateRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Ladezustand haben soll */
  loadingRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Fehlerzustand haben soll */
  errorRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Erfolgszustand haben soll */
  successRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den deaktivierten Zustand haben soll */
  disabledRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den fokussierten Zustand haben soll */
  focusedRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Hover-Zustand haben soll */
  hoverRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den aktiven Zustand haben soll */
  activeRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den inaktiven Zustand haben soll */
  inactiveRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den gültigen Zustand haben soll */
  validRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den ungültigen Zustand haben soll */
  invalidRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den erforderlichen Zustand haben soll */
  requiredRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den optionalen Zustand haben soll */
  optionalRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Tooltip haben soll */
  tooltipRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Hilfetext haben soll */
  helperTextRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für die Fehlermeldung haben soll */
  errorMessageRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für die Erfolgsmeldung haben soll */
  successMessageRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Beschreibungstext haben soll */
  descriptionRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Labeltext haben soll */
  labelRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Container haben soll */
  containerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Checkbox-Container haben soll */
  checkboxContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Tooltip-Container haben soll */
  tooltipContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Hilfetext-Container haben soll */
  helperTextContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Fehlermeldung-Container haben soll */
  errorMessageContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Erfolgsmeldung-Container haben soll */
  successMessageContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Beschreibungstext-Container haben soll */
  descriptionContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Labeltext-Container haben soll */
  labelContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Container-Container haben soll */
  containerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Checkbox-Container-Container haben soll */
  checkboxContainerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Tooltip-Container-Container haben soll */
  tooltipContainerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Hilfetext-Container-Container haben soll */
  helperTextContainerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Fehlermeldung-Container-Container haben soll */
  errorMessageContainerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Erfolgsmeldung-Container-Container haben soll */
  successMessageContainerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Beschreibungstext-Container-Container haben soll */
  descriptionContainerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Labeltext-Container-Container haben soll */
  labelContainerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Container-Container-Container haben soll */
  containerContainerContainerRipple?: boolean;
  /** Ob die Checkbox ein Ripple-Effekt für den Checkbox-Container-Container-Container haben soll */
  checkboxContainerContainerContainerRipple?: boolean;
  /** Ob die Checkbox links vom Label angezeigt werden soll */
  labelPosition?: 'left' | 'right';
  /** Ob die Checkbox vertikal ausgerichtet werden soll */
  isVertical?: boolean;
  /** Ob die Checkbox als Switch angezeigt werden soll */
  isSwitch?: boolean;
  /** Ob die Checkbox als Radio angezeigt werden soll */
  isRadio?: boolean;
  /** Ob die Checkbox als Toggle angezeigt werden soll */
  isToggle?: boolean;
  /** Ob die Checkbox als Button angezeigt werden soll */
  isButton?: boolean;
  /** Ob die Checkbox als Card angezeigt werden soll */
  isCard?: boolean;
  /** Ob die Checkbox als Chip angezeigt werden soll */
  isChip?: boolean;
  /** Ob die Checkbox als Tag angezeigt werden soll */
  isTag?: boolean;
  /** Ob die Checkbox als Badge angezeigt werden soll */
  isBadge?: boolean;
  /** Ob die Checkbox als Pill angezeigt werden soll */
  isPill?: boolean;
  /** Ob die Checkbox als Icon angezeigt werden soll */
  isIcon?: boolean;
  /** Ob die Checkbox als Text angezeigt werden soll */
  isText?: boolean;
  /** Ob die Checkbox als Image angezeigt werden soll */
  isImage?: boolean;
  /** Ob die Checkbox als Avatar angezeigt werden soll */
  isAvatar?: boolean;
  /** Ob die Checkbox als Thumbnail angezeigt werden soll */
  isThumbnail?: boolean;
  /** Ob die Checkbox als Slider angezeigt werden soll */
  isSlider?: boolean;
  /** Ob die Checkbox als Range angezeigt werden soll */
  isRange?: boolean;
  /** Ob die Checkbox als Progress angezeigt werden soll */
  isProgress?: boolean;
  /** Ob die Checkbox als Spinner angezeigt werden soll */
  isSpinner?: boolean;
  /** Ob die Checkbox als Loader angezeigt werden soll */
  isLoader?: boolean;
  /** Ob die Checkbox als Skeleton angezeigt werden soll */
  isSkeleton?: boolean;
  /** Ob die Checkbox als Placeholder angezeigt werden soll */
  isPlaceholder?: boolean;
  /** Ob die Checkbox als Empty angezeigt werden soll */
  isEmpty?: boolean;
  /** Ob die Checkbox als Full angezeigt werden soll */
  isFull?: boolean;
  /** Ob die Checkbox als Half angezeigt werden soll */
  isHalf?: boolean;
  /** Ob die Checkbox als Quarter angezeigt werden soll */
  isQuarter?: boolean;
  /** Ob die Checkbox als Third angezeigt werden soll */
  isThird?: boolean;
  /** Ob die Checkbox als Fifth angezeigt werden soll */
  isFifth?: boolean;
  /** Ob die Checkbox als Sixth angezeigt werden soll */
  isSixth?: boolean;
  /** Ob die Checkbox als Seventh angezeigt werden soll */
  isSeventh?: boolean;
  /** Ob die Checkbox als Eighth angezeigt werden soll */
  isEighth?: boolean;
  /** Ob die Checkbox als Ninth angezeigt werden soll */
  isNinth?: boolean;
  /** Ob die Checkbox als Tenth angezeigt werden soll */
  isTenth?: boolean;
  /** Ob die Checkbox als Eleventh angezeigt werden soll */
  isEleventh?: boolean;
  /** Ob die Checkbox als Twelfth angezeigt werden soll */
  isTwelfth?: boolean;
  /** Ob die Checkbox als Thirteenth angezeigt werden soll */
  isThirteenth?: boolean;
  /** Ob die Checkbox als Fourteenth angezeigt werden soll */
  isFourteenth?: boolean;
  /** Ob die Checkbox als Fifteenth angezeigt werden soll */
  isFifteenth?: boolean;
  /** Ob die Checkbox als Sixteenth angezeigt werden soll */
  isSixteenth?: boolean;
  /** Ob die Checkbox als Seventeenth angezeigt werden soll */
  isSeventeenth?: boolean;
  /** Ob die Checkbox als Eighteenth angezeigt werden soll */
  isEighteenth?: boolean;
  /** Ob die Checkbox als Nineteenth angezeigt werden soll */
  isNineteenth?: boolean;
  /** Ob die Checkbox als Twentieth angezeigt werden soll */
  isTwentieth?: boolean;
}

/**
 * Checkbox-Komponente für Formulare
 * 
 * @example
 * ```tsx
 * <Checkbox label="Nutzungsbedingungen akzeptieren" />
 * 
 * <Checkbox 
 *   label="Newsletter abonnieren" 
 *   helperText="Sie können sich jederzeit abmelden"
 *   colorScheme="primary"
 *   size="md"
 * />
 * 
 * <Checkbox 
 *   label={<span>Ich akzeptiere die <a href="#">AGB</a></span>}
 *   isRequired
 *   error={!isChecked ? "Bitte akzeptieren Sie die AGB" : undefined}
 * />
 * 
 * <Checkbox 
 *   indeterminate={someChecked && !allChecked}
 *   checked={allChecked}
 *   onChange={handleSelectAll}
 *   label="Alle auswählen"
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  helperText,
  error,
  successMessage,
  size = 'md',
  variant = 'solid',
  indeterminate = false,
  colorScheme = 'primary',
  className = '',
  containerClassName = '',
  checkboxContainerClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  successClassName = '',
  disabled,
  id,
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
  showSuccessIndicator = true,
  showErrorIndicator = true,
  showLoadingIndicator = true,
  showValidationIndicator = true,
  hideLabel = false,
  hideHelperText = false,
  hideError = false,
  hideSuccessMessage = false,
  labelTooltip,
  checkboxTooltip,
  description,
  autoFocus = false,
  icon,
  checkedIcon,
  uncheckedIcon,
  indeterminateIcon,
  ripple = false,
  labelPosition = 'right',
  isVertical = false,
  isSwitch = false,
  isRadio = false,
  isToggle = false,
  isButton = false,
  required,
  name,
  value,
  ...props
}, ref) => {
  // Hole FormControl-Context, falls vorhanden
  const formControl = useFormControl();
  
  // Kombiniere Props mit FormControl-Context
  const _id = id || formControl.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  const _disabled = isDisabled ?? disabled ?? formControl.disabled;
  const _required = isRequired ?? required ?? formControl.required;
  const _error = error || (formControl.hasError ? 'Ungültige Eingabe' : undefined);
  const _isInvalid = isInvalid || Boolean(_error) || formControl.isInvalid;
  const _isValid = isValid || formControl.isValid;
  const _isSuccess = isSuccess || formControl.isSuccess;
  const _isLoading = isLoading || formControl.isLoading;
  const _size = size || formControl.size || 'md';
  const _name = name || formControl.name;
  
  // State für Fokus und Hover
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [showRipple, setShowRipple] = useState(false);
  
  // Refs
  const checkboxRef = useRef<HTMLInputElement>(null);
  
  // Kombiniere den externen Ref mit unserem internen Ref
  const handleRef = (element: HTMLInputElement | null) => {
    if (checkboxRef) {
      (checkboxRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
  };
  
  // Setze den indeterminaten Zustand
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  // Effekt für autoFocus
  useEffect(() => {
    if (autoFocus && checkboxRef.current) {
      checkboxRef.current.focus();
    }
  }, [autoFocus]);
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
  };
  
  // Klassen für verschiedene Label-Größen
  const labelSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  // Klassen für verschiedene Varianten
  const variantClasses: Record<CheckboxVariant, string> = {
    solid: 'bg-white dark:bg-gray-700',
    outline: bordered 
      ? 'border-2 border-gray-300 dark:border-gray-600 bg-transparent' 
      : 'bg-transparent',
    filled: 'bg-gray-100 dark:bg-gray-800',
    minimal: 'bg-transparent'
  };
  
  // Klassen für verschiedene Farben
  const colorClasses = {
    primary: 'text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-500 focus:ring-secondary-500 dark:focus:ring-secondary-400',
    success: 'text-green-600 dark:text-green-500 focus:ring-green-500 dark:focus:ring-green-400',
    danger: 'text-red-600 dark:text-red-500 focus:ring-red-500 dark:focus:ring-red-400',
    warning: 'text-yellow-600 dark:text-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-400',
    info: 'text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = _isInvalid
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : _isValid || _isSuccess
      ? 'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500'
      : colorClasses[colorScheme];
  
  // Effekt-spezifische Klassen
  const effectClasses = {
    shadow: shadow ? 'shadow-md' : '',
    rounded: rounded ? 'rounded' : 'rounded-none',
    hover: hoverable && !_disabled ? 'hover:border-gray-400 dark:hover:border-gray-500' : '',
    focus: focusable && !_disabled ? 'focus:outline-none focus:ring-2' : '',
    transition: transition ? 'transition duration-150 ease-in-out' : '',
    transparent: transparent ? 'bg-transparent' : ''
  };
  
  // Basis-Klassen für die Checkbox
  const checkboxClasses = [
    sizeClasses[_size],
    variantClasses[variant],
    stateClasses,
    effectClasses.shadow,
    effectClasses.rounded,
    effectClasses.hover,
    effectClasses.focus,
    effectClasses.transition,
    effectClasses.transparent,
    _disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    checkboxContainerClassName
  ].filter(Boolean).join(' ');
  
  // Event-Handler
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPressed(true);
    
    // Ripple-Effekt
    if (ripple && checkboxRef.current) {
      const rect = checkboxRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setRippleStyle({
        left: `${x}px`,
        top: `${y}px`
      });
      
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(true);
    }
    
    onKeyDown?.(e);
  };
  
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(false);
    }
  };
  
  // Rendere das passende Icon basierend auf dem Zustand
  const renderIcon = () => {
    if (indeterminate && indeterminateIcon) {
      return indeterminateIcon;
    }
    
    if (checked && checkedIcon) {
      return checkedIcon;
    }
    
    if (!checked && uncheckedIcon) {
      return uncheckedIcon;
    }
    
    if (icon) {
      return icon;
    }
    
    return null;
  };
  
  // Rendere Indikatoren (Erfolg, Fehler, Laden)
  const renderIndicators = () => {
    if (!showSuccessIndicator && !showErrorIndicator && !showLoadingIndicator && !showValidationIndicator) {
      return null;
    }
    
    // Bestimme, welcher Indikator angezeigt werden soll
    let indicator = null;
    
    if (_isLoading && showLoadingIndicator) {
      indicator = (
        <span className="text-primary-500 animate-spin" aria-hidden="true">
          ⟳
        </span>
      );
    } else if (_isInvalid && showErrorIndicator) {
      indicator = (
        <span className="text-red-500" aria-hidden="true">
          ✕
        </span>
      );
    } else if (_isSuccess && showSuccessIndicator) {
      indicator = (
        <span className="text-green-500" aria-hidden="true">
          ✓
        </span>
      );
    } else if (_isValid && showValidationIndicator) {
      indicator = (
        <span className="text-green-500" aria-hidden="true">
          ✓
        </span>
      );
    }
    
    if (!indicator) return null;
    
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        {indicator}
      </div>
    );
  };
  
  // Bestimme die ARIA-Attribute für die Checkbox
  const getAriaAttributes = () => {
    const attributes: Record<string, string> = {};

    // Beschreibungen und Hilfetexte
    const describedByParts = [];
    if (description) {
      describedByParts.push(`${_id}-description`);
    }
    if (helperText && !_error) {
      describedByParts.push(`${_id}-helper`);
    }
    if (successMessage) {
      describedByParts.push(`${_id}-success`);
    }
    if (describedByParts.length > 0) {
      attributes['aria-describedby'] = describedByParts.join(' ');
    }

    // Fehlermeldungen
    if (_error) {
      attributes['aria-errormessage'] = `${_id}-error`;
      attributes['aria-invalid'] = 'true';
    } else if (_isInvalid) {
      attributes['aria-invalid'] = 'true';
    }

    // Zustandsattribute
    if (indeterminate) {
      attributes['aria-checked'] = 'mixed';
    }
    if (_disabled) {
      attributes['aria-disabled'] = 'true';
    }
    if (_required) {
      attributes['aria-required'] = 'true';
    }
    if (_isLoading) {
      attributes['aria-busy'] = 'true';
    }
    if (isSwitch || isToggle) {
      attributes['aria-roledescription'] = 'Schalter';
    }

    return attributes;
  };
  };
  
  // Rendere die Checkbox basierend auf dem Typ
  const renderCheckbox = () => {
    if (isSwitch) {
      return (
        <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300 dark:bg-gray-600">
          <input
            ref={handleRef}
            id={_id}
            type="checkbox"
            disabled={_disabled}
            required={_required}
            name={_name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="absolute w-0 h-0 opacity-0"
            title={checkboxTooltip || tooltip}
            {...getAriaAttributes()}
            {...props}
          />
          <span 
            className={`
              absolute left-0 top-0 bottom-0 w-5 h-5 rounded-full bg-white dark:bg-gray-400 
              transition-transform duration-200 ease-in-out transform
              ${checked ? 'translate-x-5 bg-primary-600 dark:bg-primary-500' : 'translate-x-0'}
              ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          />
        </div>
      );
    }
    
    if (isRadio) {
      return (
        <div className="relative">
          <input
            ref={handleRef}
            id={_id}
            type="radio"
            disabled={_disabled}
            required={_required}
            name={_name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className={`
              ${sizeClasses[_size]}
              rounded-full border-gray-300 dark:border-gray-600
              ${colorClasses[colorScheme]}
              ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            title={checkboxTooltip || tooltip}
            {...getAriaAttributes()}
            {...props}
          />
        </div>
      );
    }
    
    if (isToggle) {
      return (
        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600">
          <input
            ref={handleRef}
            id={_id}
            type="checkbox"
            disabled={_disabled}
            required={_required}
            name={_name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="absolute w-0 h-0 opacity-0"
            title={checkboxTooltip || tooltip}
            {...getAriaAttributes()}
            {...props}
          />
          <div 
            className={`
              absolute inset-0 rounded-full 
              transition-colors duration-200 ease-in-out
              ${checked ? `bg-${colorScheme}-600 dark:bg-${colorScheme}-500` : 'bg-gray-300 dark:bg-gray-600'}
              ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          />
          <span 
            className={`
              absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white dark:bg-gray-200 
              transition-transform duration-200 ease-in-out transform
              ${checked ? 'translate-x-6' : 'translate-x-0'}
              ${_disabled ? 'opacity-50' : ''}
              shadow-md
            `}
          />
        </div>
      );
    }
    
    if (isButton) {
      return (
        <button
          id={_id}
          disabled={_disabled}
          aria-pressed={checked}
          onClick={() => {
            if (checkboxRef.current) {
              checkboxRef.current.click();
            }
          }}
          className={`
            px-4 py-2 rounded-md font-medium
            ${checked 
              ? `bg-${colorScheme}-600 dark:bg-${colorScheme}-500 text-white` 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
            ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            transition-colors duration-200 ease-in-out
          `}
          title={checkboxTooltip || tooltip}
          {...getAriaAttributes()}
        >
          {label}
          <input
            ref={handleRef}
            type="checkbox"
            disabled={_disabled}
            required={_required}
            name={_name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="sr-only"
            {...props}
          />
        </button>
      );
    }
    
    // Standard-Checkbox
    return (
      <div className="relative">
        <input
          ref={handleRef}
          id={_id}
          type="checkbox"
          disabled={_disabled}
          required={_required}
          name={_name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className={checkboxClasses}
          title={checkboxTooltip || tooltip}
          {...getAriaAttributes()}
          {...props}
        />
        
        {/* Ripple-Effekt */}
        {ripple && showRipple && (
          <span 
            className="absolute bg-current bg-opacity-30 rounded-full animate-ripple" 
            style={{
              width: '30px',
              height: '30px',
              transform: 'translate(-50%, -50%)',
              ...rippleStyle
            }}
          />
        )}
        
        {/* Icon */}
        {renderIcon()}
        
        {/* Indikatoren */}
        {renderIndicators()}
      </div>
    );
  };
  
  // Beschreibung für Screenreader
  const renderDescription = () => {
    if (!description) return null;
    
    return (
      <div id={`${_id}-description`} className="sr-only">
        {description}
      </div>
    );
  };
  
  // Rendere das Label
  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <div className={`${hideLabel ? 'sr-only' : ''}`}>
        <label 
          htmlFor={_id} 
          className={`
            ${labelSizeClasses[_size]}
            font-medium text-gray-700 dark:text-gray-300
            ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${labelClassName}
          `}
          title={labelTooltip}
          data-testid="checkbox-label"
        >
          {label}
          {_required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>{_required && <span className="sr-only">(Erforderlich)</span>}}
        </label>
      </div>
    );
  };
  
  // Rendere Hilfetext, Fehlermeldung oder Erfolgsmeldung
  const renderHelperText = () => {
    if (!_error && !helperText && !successMessage) return null;
    
    return (
      <div className="mt-1 text-sm">
        {_error && !hideError ? (
          <p 
            id={`${_id}-error`} 
            className={`text-red-600 dark:text-red-400 ${errorClassName}`}
            role="alert" aria-live="assertive"
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
  
  // Rendere die gesamte Komponente
  return (
    <div 
      className={`${isVertical ? 'flex flex-col' : 'flex items-start'} ${containerClassName} ${className}`}
      data-testid="checkbox-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Beschreibung für Screenreader */}
      {renderDescription()}
      
      {/* Label links */}
      {labelPosition === 'left' && renderLabel()}
      
      {/* Checkbox */}
      <div className={`flex items-center ${isVertical ? 'mb-2' : ''}`}>
        {renderCheckbox()}
      </div>
      
      {/* Label rechts */}
      {labelPosition === 'right' && (
        <div className={`${isVertical ? '' : 'ml-2'}`} data-testid="label-container">
          {renderLabel()}
          {renderHelperText()}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
