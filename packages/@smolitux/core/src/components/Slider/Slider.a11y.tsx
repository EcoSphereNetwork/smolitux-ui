import React, { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react';
import { useFormControl } from '../FormControl';

export type SliderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SliderVariant = 'solid' | 'outline' | 'filled' | 'minimal';
export type SliderColorScheme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type SliderOrientation = 'horizontal' | 'vertical';
export type SliderThumbShape = 'circle' | 'square' | 'rectangle' | 'diamond' | 'custom';
export type SliderTrackShape = 'rounded' | 'square' | 'custom';
export type SliderMarkPosition = 'above' | 'below' | 'left' | 'right';
export type SliderLabelPosition = 'above' | 'below' | 'left' | 'right';
export type SliderValuePosition = 'above' | 'below' | 'left' | 'right' | 'tooltip';

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Aktueller Wert des Sliders */
  value?: number;
  /** Standardwert des Sliders */
  defaultValue?: number;
  /** Minimaler Wert des Sliders */
  min?: number;
  /** Maximaler Wert des Sliders */
  max?: number;
  /** Schrittgröße des Sliders */
  step?: number;
  /** Callback bei Änderung des Werts */
  onChange?: (value: number) => void;
  /** Callback bei Start des Ziehens */
  onChangeStart?: (value: number) => void;
  /** Callback bei Ende des Ziehens */
  onChangeEnd?: (value: number) => void;
  /** Text-Label */
  label?: React.ReactNode;
  /** Hilfetext */
  helperText?: React.ReactNode;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Größe des Sliders */
  size?: SliderSize;
  /** Visuelle Variante */
  variant?: SliderVariant;
  /** Farbe des Sliders */
  colorScheme?: SliderColorScheme;
  /** Ausrichtung des Sliders */
  orientation?: SliderOrientation;
  /** Form des Thumb */
  thumbShape?: SliderThumbShape;
  /** Form der Track */
  trackShape?: SliderTrackShape;
  /** Benutzerdefinierter Thumb */
  thumbComponent?: React.ReactNode;
  /** Benutzerdefinierte Track */
  trackComponent?: React.ReactNode;
  /** Benutzerdefinierte Fill-Track */
  fillTrackComponent?: React.ReactNode;
  /** Ob der Slider einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob der Slider abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob der Slider einen Schatten haben soll */
  shadow?: boolean;
  /** Ob der Slider einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob der Slider einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob der Slider einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob der Slider einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob der Slider einen Tooltip haben soll */
  tooltip?: boolean | React.ReactNode;
  /** Ob der Slider im Ladezustand ist */
  isLoading?: boolean;
  /** Ob der Slider gültig ist */
  isValid?: boolean;
  /** Ob der Slider ungültig ist */
  isInvalid?: boolean;
  /** Ob der Slider erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob der Slider deaktiviert ist */
  isDisabled?: boolean;
  /** Ob der Slider erforderlich ist */
  isRequired?: boolean;
  /** Ob der Slider einen Erfolgsindikator anzeigen soll */
  showSuccessIndicator?: boolean;
  /** Ob der Slider einen Fehlerindikator anzeigen soll */
  showErrorIndicator?: boolean;
  /** Ob der Slider einen Ladeindikator anzeigen soll */
  showLoadingIndicator?: boolean;
  /** Ob der Slider einen Validierungsindikator anzeigen soll */
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
  /** Zusätzliche CSS-Klassen für den Slider-Container */
  sliderContainerClassName?: string;
  /** Zusätzliche CSS-Klassen für den Thumb */
  thumbClassName?: string;
  /** Zusätzliche CSS-Klassen für die Track */
  trackClassName?: string;
  /** Zusätzliche CSS-Klassen für die Fill-Track */
  fillTrackClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Tooltip für den Slider */
  sliderTooltip?: string;
  /** Beschreibung für den Slider (für Screenreader) */
  description?: string;
  /** Ob der Slider automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Ob der Slider einen Ripple-Effekt haben soll */
  ripple?: boolean;
  /** Ob der Slider vertikal ausgerichtet werden soll */
  isVertical?: boolean;
  /** Ob der Wert als Text angezeigt werden soll */
  showValue?: boolean;
  /** Position des Werts */
  valuePosition?: SliderValuePosition;
  /** Format des Werts */
  valueFormat?: string | ((value: number) => string);
  /** Ob Markierungen angezeigt werden sollen */
  showMarks?: boolean;
  /** Position der Markierungen */
  markPosition?: SliderMarkPosition;
  /** Markierungen */
  marks?: SliderMark[];
  /** Ob der Slider invertiert werden soll */
  inverted?: boolean;
  /** Ob der Slider als Range-Slider verwendet werden soll */
  isRange?: boolean;
  /** Zweiter Wert für Range-Slider */
  value2?: number;
  /** Zweiter Standardwert für Range-Slider */
  defaultValue2?: number;
  /** Callback bei Änderung des zweiten Werts */
  onChange2?: (value: number) => void;
  /** Callback bei Start des Ziehens des zweiten Thumbs */
  onChangeStart2?: (value: number) => void;
  /** Callback bei Ende des Ziehens des zweiten Thumbs */
  onChangeEnd2?: (value: number) => void;
  /** Ob der Slider als Farbwähler verwendet werden soll */
  isColorPicker?: boolean;
  /** Farbpalette für Farbwähler */
  colorPalette?: string[];
  /** Ob der Slider als Lautstärkeregler verwendet werden soll */
  isVolumeSlider?: boolean;
  /** Ob der Slider als Fortschrittsanzeige verwendet werden soll */
  isProgressSlider?: boolean;
  /** Ob der Slider als Zeitanzeige verwendet werden soll */
  isTimeSlider?: boolean;
  /** Ob der Slider als Rating verwendet werden soll */
  isRating?: boolean;
  /** Anzahl der Sterne für Rating */
  ratingCount?: number;
  /** Ob halbe Sterne erlaubt sind */
  allowHalfRating?: boolean;
  /** Ob der Slider als Preisfilter verwendet werden soll */
  isPriceFilter?: boolean;
  /** Währung für Preisfilter */
  currency?: string;
  /** Währungsposition für Preisfilter */
  currencyPosition?: 'before' | 'after';
  /** Ob der Slider als Datumsfilter verwendet werden soll */
  isDateFilter?: boolean;
  /** Datumsformat für Datumsfilter */
  dateFormat?: string;
  /** Ob der Slider als Größenfilter verwendet werden soll */
  isSizeFilter?: boolean;
  /** Größeneinheit für Größenfilter */
  sizeUnit?: string;
  /** ARIA-Label für den Slider */
  ariaLabel?: string;
  /** ARIA-Valuetext für den Slider */
  ariaValuetext?: string | ((value: number) => string);
  /** Ob der Slider als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob der Slider als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob der Slider als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob der Slider als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Schrittgröße für Tastaturnavigation */
  keyboardStep?: number;
  /** Große Schrittgröße für Tastaturnavigation (Page Up/Down) */
  keyboardStepLarge?: number;
}

/**
 * Barrierefreie Slider-Komponente für Formulare
 * 
 * @example
 * ```tsx
 * <SliderA11y 
 *   label="Lautstärke" 
 *   min={0} 
 *   max={100} 
 *   defaultValue={50}
 *   ariaLabel="Lautstärkeregler"
 * />
 * ```
 */
export const SliderA11y = forwardRef<HTMLInputElement, SliderProps>(({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeStart,
  onChangeEnd,
  label,
  helperText,
  error,
  successMessage,
  size = 'md',
  variant = 'solid',
  colorScheme = 'primary',
  orientation = 'horizontal',
  thumbShape = 'circle',
  trackShape = 'rounded',
  thumbComponent,
  trackComponent,
  fillTrackComponent,
  className = '',
  containerClassName = '',
  sliderContainerClassName = '',
  thumbClassName = '',
  trackClassName = '',
  fillTrackClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  successClassName = '',
  disabled,
  id,
  name,
  bordered = true,
  rounded = true,
  shadow = false,
  hoverable = true,
  focusable = true,
  transition = true,
  transparent = false,
  tooltip = false,
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
  sliderTooltip,
  description,
  autoFocus = false,
  ripple = false,
  isVertical = false,
  showValue = false,
  valuePosition = 'above',
  valueFormat,
  showMarks = false,
  markPosition = 'below',
  marks,
  inverted = false,
  isRange = false,
  value2,
  defaultValue2,
  onChange2,
  onChangeStart2,
  onChangeEnd2,
  ariaLabel,
  ariaValuetext,
  busy = false,
  liveRegionPoliteness = 'polite',
  atomic = true,
  relevant,
  keyboardStep,
  keyboardStepLarge,
  ...props
}, ref) => {
  // Generiere eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  
  // Hole FormControl-Context, falls vorhanden
  const formControl = useFormControl();
  
  // Kombiniere Props mit FormControl-Context
  const _id = id || formControl.id || `slider-${uniqueId}`;
  const _disabled = isDisabled ?? disabled ?? formControl.disabled;
  const _required = isRequired ?? required ?? formControl.required;
  const _error = error || formControl.error;
  const _isInvalid = isInvalid || Boolean(_error) || formControl.isInvalid;
  const _isValid = isValid || formControl.isValid;
  const _isSuccess = isSuccess || formControl.isSuccess;
  const _isLoading = isLoading || formControl.isLoading;
  const _name = name || formControl.name;
  
  // State für Slider-Werte
  const [currentValue, setCurrentValue] = useState(value !== undefined ? value : defaultValue);
  const [currentValue2, setCurrentValue2] = useState(value2 !== undefined ? value2 : defaultValue2 || max);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [announceMessage, setAnnounceMessage] = useState<string>('');
  
  // Refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const thumb2Ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  
  // Kombiniere den externen Ref mit unserem internen Ref
  const handleRef = (element: HTMLInputElement | null) => {
    if (inputRef) {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
  };
  
  // Effekt für autoFocus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Effekt für value-Prop
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);
  
  // Effekt für value2-Prop
  useEffect(() => {
    if (value2 !== undefined) {
      setCurrentValue2(value2);
    }
  }, [value2]);
  
  // Berechne den Prozentwert für die Position
  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };
  
  // Berechne den Wert aus der Position
  const getValueFromPosition = (position: number) => {
    if (!trackRef.current) return min;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const trackLength = orientation === 'horizontal' ? trackRect.width : trackRect.height;
    
    let percent;
    if (orientation === 'horizontal') {
      percent = inverted
        ? (trackLength - position) / trackLength
        : position / trackLength;
    } else {
      percent = inverted
        ? position / trackLength
        : (trackLength - position) / trackLength;
    }
    
    // Begrenze den Prozentsatz auf 0-1
    percent = Math.max(0, Math.min(1, percent));
    
    // Berechne den Wert basierend auf min, max und step
    let rawValue = min + percent * (max - min);
    
    // Runde auf den nächsten Step-Wert
    if (step !== 0) {
      const stepsFromMin = Math.round((rawValue - min) / step);
      rawValue = min + stepsFromMin * step;
    }
    
    // Begrenze den Wert auf min-max
    return Math.max(min, Math.min(max, rawValue));
  };
  
  // Formatiere den Wert für die Anzeige
  const formatValue = (value: number) => {
    if (typeof valueFormat === 'function') {
      return valueFormat(value);
    } else if (typeof valueFormat === 'string') {
      return valueFormat.replace('{value}', value.toString());
    }
    return value.toString();
  };
  
  // Formatiere den Wert für ARIA-Valuetext
  const getAriaValuetext = (value: number) => {
    if (typeof ariaValuetext === 'function') {
      return ariaValuetext(value);
    } else if (typeof ariaValuetext === 'string') {
      return ariaValuetext.replace('{value}', value.toString());
    }
    return formatValue(value);
  };
  
  // Event-Handler für Maus-Events
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, isSecondThumb = false) => {
    if (_disabled) return;
    
    // Verhindere Standardverhalten
    event.preventDefault();
    
    // Setze Dragging-Status
    if (isSecondThumb) {
      setIsDragging2(true);
      if (onChangeStart2) onChangeStart2(currentValue2);
    } else {
      setIsDragging(true);
      if (onChangeStart) onChangeStart(currentValue);
    }
    
    // Berechne den Wert basierend auf der Mausposition
    handleMouseMove(event, isSecondThumb);
    
    // Füge Event-Listener für Mausbewegung und -loslassen hinzu
    document.addEventListener('mousemove', handleMouseMoveDocument);
    document.addEventListener('mouseup', handleMouseUpDocument);
    
    // Zeige Tooltip an
    if (tooltip) {
      setShowTooltip(true);
      updateTooltipPosition(event, isSecondThumb);
    }
  };
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, isSecondThumb = false) => {
    if (_disabled || (!isDragging && !isDragging2)) return;
    
    if (!trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    let position;
    
    if (orientation === 'horizontal') {
      position = event.clientX - trackRect.left;
    } else {
      position = event.clientY - trackRect.top;
    }
    
    const newValue = getValueFromPosition(position);
    
    if (isSecondThumb) {
      // Stelle sicher, dass value2 >= value1 bei Range-Slider
      if (isRange && newValue < currentValue) return;
      
      setCurrentValue2(newValue);
      if (onChange2) onChange2(newValue);
    } else {
      // Stelle sicher, dass value1 <= value2 bei Range-Slider
      if (isRange && newValue > currentValue2) return;
      
      setCurrentValue(newValue);
      if (onChange) onChange(newValue);
    }
    
    // Aktualisiere Tooltip-Position
    if (tooltip) {
      updateTooltipPosition(event, isSecondThumb);
    }
    
    // Ankündige für Screenreader
    setAnnounceMessage(`${isSecondThumb ? 'Zweiter Wert' : 'Wert'}: ${formatValue(isSecondThumb ? newValue : newValue)}`);
  };
  
  const handleMouseMoveDocument = (event: MouseEvent) => {
    if (_disabled) return;
    
    if (!trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    let position;
    
    if (orientation === 'horizontal') {
      position = event.clientX - trackRect.left;
    } else {
      position = event.clientY - trackRect.top;
    }
    
    const newValue = getValueFromPosition(position);
    
    if (isDragging2) {
      // Stelle sicher, dass value2 >= value1 bei Range-Slider
      if (isRange && newValue < currentValue) return;
      
      setCurrentValue2(newValue);
      if (onChange2) onChange2(newValue);
    } else if (isDragging) {
      // Stelle sicher, dass value1 <= value2 bei Range-Slider
      if (isRange && newValue > currentValue2) return;
      
      setCurrentValue(newValue);
      if (onChange) onChange(newValue);
    }
    
    // Aktualisiere Tooltip-Position
    if (tooltip) {
      updateTooltipPosition(event, isDragging2);
    }
    
    // Ankündige für Screenreader
    setAnnounceMessage(`${isDragging2 ? 'Zweiter Wert' : 'Wert'}: ${formatValue(isDragging2 ? newValue : newValue)}`);
  };
  
  const handleMouseUpDocument = () => {
    if (isDragging) {
      setIsDragging(false);
      if (onChangeEnd) onChangeEnd(currentValue);
    }
    
    if (isDragging2) {
      setIsDragging2(false);
      if (onChangeEnd2) onChangeEnd2(currentValue2);
    }
    
    // Entferne Event-Listener
    document.removeEventListener('mousemove', handleMouseMoveDocument);
    document.removeEventListener('mouseup', handleMouseUpDocument);
    
    // Verstecke Tooltip
    if (tooltip) {
      setShowTooltip(false);
    }
  };
  
  // Event-Handler für Touch-Events
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>, isSecondThumb = false) => {
    if (_disabled) return;
    
    // Verhindere Standardverhalten
    event.preventDefault();
    
    // Setze Dragging-Status
    if (isSecondThumb) {
      setIsDragging2(true);
      if (onChangeStart2) onChangeStart2(currentValue2);
    } else {
      setIsDragging(true);
      if (onChangeStart) onChangeStart(currentValue);
    }
    
    // Berechne den Wert basierend auf der Touch-Position
    handleTouchMove(event, isSecondThumb);
    
    // Füge Event-Listener für Touch-Bewegung und -Ende hinzu
    document.addEventListener('touchmove', handleTouchMoveDocument, { passive: false });
    document.addEventListener('touchend', handleTouchEndDocument);
    document.addEventListener('touchcancel', handleTouchEndDocument);
    
    // Zeige Tooltip an
    if (tooltip) {
      setShowTooltip(true);
      updateTooltipPositionTouch(event, isSecondThumb);
    }
  };
  
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>, isSecondThumb = false) => {
    if (_disabled || (!isDragging && !isDragging2)) return;
    
    if (!trackRef.current || !event.touches[0]) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    let position;
    
    if (orientation === 'horizontal') {
      position = event.touches[0].clientX - trackRect.left;
    } else {
      position = event.touches[0].clientY - trackRect.top;
    }
    
    const newValue = getValueFromPosition(position);
    
    if (isSecondThumb) {
      // Stelle sicher, dass value2 >= value1 bei Range-Slider
      if (isRange && newValue < currentValue) return;
      
      setCurrentValue2(newValue);
      if (onChange2) onChange2(newValue);
    } else {
      // Stelle sicher, dass value1 <= value2 bei Range-Slider
      if (isRange && newValue > currentValue2) return;
      
      setCurrentValue(newValue);
      if (onChange) onChange(newValue);
    }
    
    // Aktualisiere Tooltip-Position
    if (tooltip) {
      updateTooltipPositionTouch(event, isSecondThumb);
    }
    
    // Ankündige für Screenreader
    setAnnounceMessage(`${isSecondThumb ? 'Zweiter Wert' : 'Wert'}: ${formatValue(isSecondThumb ? newValue : newValue)}`);
  };
  
  const handleTouchMoveDocument = (event: TouchEvent) => {
    if (_disabled) return;
    
    // Verhindere Standardverhalten (Scrollen)
    event.preventDefault();
    
    if (!trackRef.current || !event.touches[0]) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    let position;
    
    if (orientation === 'horizontal') {
      position = event.touches[0].clientX - trackRect.left;
    } else {
      position = event.touches[0].clientY - trackRect.top;
    }
    
    const newValue = getValueFromPosition(position);
    
    if (isDragging2) {
      // Stelle sicher, dass value2 >= value1 bei Range-Slider
      if (isRange && newValue < currentValue) return;
      
      setCurrentValue2(newValue);
      if (onChange2) onChange2(newValue);
    } else if (isDragging) {
      // Stelle sicher, dass value1 <= value2 bei Range-Slider
      if (isRange && newValue > currentValue2) return;
      
      setCurrentValue(newValue);
      if (onChange) onChange(newValue);
    }
    
    // Aktualisiere Tooltip-Position
    if (tooltip) {
      updateTooltipPositionTouch(event, isDragging2);
    }
    
    // Ankündige für Screenreader
    setAnnounceMessage(`${isDragging2 ? 'Zweiter Wert' : 'Wert'}: ${formatValue(isDragging2 ? newValue : newValue)}`);
  };
  
  const handleTouchEndDocument = () => {
    if (isDragging) {
      setIsDragging(false);
      if (onChangeEnd) onChangeEnd(currentValue);
    }
    
    if (isDragging2) {
      setIsDragging2(false);
      if (onChangeEnd2) onChangeEnd2(currentValue2);
    }
    
    // Entferne Event-Listener
    document.removeEventListener('touchmove', handleTouchMoveDocument);
    document.removeEventListener('touchend', handleTouchEndDocument);
    document.removeEventListener('touchcancel', handleTouchEndDocument);
    
    // Verstecke Tooltip
    if (tooltip) {
      setShowTooltip(false);
    }
  };
  
  // Event-Handler für Keyboard-Events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, isSecondThumb = false) => {
    if (_disabled) return;
    
    const currentVal = isSecondThumb ? currentValue2 : currentValue;
    const kbStep = keyboardStep || step;
    const kbStepLarge = keyboardStepLarge || kbStep * 10;
    
    let newValue = currentVal;
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, currentVal + kbStep);
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, currentVal - kbStep);
        event.preventDefault();
        break;
      case 'PageUp':
        newValue = Math.min(max, currentVal + kbStepLarge);
        event.preventDefault();
        break;
      case 'PageDown':
        newValue = Math.max(min, currentVal - kbStepLarge);
        event.preventDefault();
        break;
      case 'Home':
        newValue = min;
        event.preventDefault();
        break;
      case 'End':
        newValue = max;
        event.preventDefault();
        break;
    }
    
    if (newValue !== currentVal) {
      if (isSecondThumb) {
        // Stelle sicher, dass value2 >= value1 bei Range-Slider
        if (isRange && newValue < currentValue) return;
        
        setCurrentValue2(newValue);
        if (onChange2) onChange2(newValue);
      } else {
        // Stelle sicher, dass value1 <= value2 bei Range-Slider
        if (isRange && newValue > currentValue2) return;
        
        setCurrentValue(newValue);
        if (onChange) onChange(newValue);
      }
      
      // Ankündige für Screenreader
      setAnnounceMessage(`${isSecondThumb ? 'Zweiter Wert' : 'Wert'}: ${formatValue(newValue)}`);
    }
    
    if (props.onKeyDown) {
      props.onKeyDown(event);
    }
  };
  
  // Event-Handler für Fokus und Blur
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    
    if (tooltip) {
      setShowTooltip(true);
    }
    
    if (props.onFocus) {
      props.onFocus(event);
    }
  };
  
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    if (tooltip && !isDragging && !isDragging2) {
      setShowTooltip(false);
    }
    
    if (props.onBlur) {
      props.onBlur(event);
    }
  };
  
  // Event-Handler für Hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (tooltip) {
      setShowTooltip(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (tooltip && !isDragging && !isDragging2 && !isFocused) {
      setShowTooltip(false);
    }
  };
  
  // Aktualisiere Tooltip-Position
  const updateTooltipPosition = (event: React.MouseEvent | MouseEvent, isSecondThumb = false) => {
    if (!thumbRef.current && !thumb2Ref.current) return;
    
    const thumbElement = isSecondThumb ? thumb2Ref.current : thumbRef.current;
    
    if (!thumbElement) return;
    
    const thumbRect = thumbElement.getBoundingClientRect();
    
    setTooltipPosition({
      x: thumbRect.left + thumbRect.width / 2,
      y: thumbRect.top - 10
    });
  };
  
  const updateTooltipPositionTouch = (event: React.TouchEvent | TouchEvent, isSecondThumb = false) => {
    if (!thumbRef.current && !thumb2Ref.current) return;
    
    const thumbElement = isSecondThumb ? thumb2Ref.current : thumbRef.current;
    
    if (!thumbElement) return;
    
    const thumbRect = thumbElement.getBoundingClientRect();
    
    setTooltipPosition({
      x: thumbRect.left + thumbRect.width / 2,
      y: thumbRect.top - 30
    });
  };
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    xs: {
      track: 'h-1',
      trackVertical: 'w-1',
      thumb: 'h-3 w-3',
      text: 'text-xs'
    },
    sm: {
      track: 'h-1.5',
      trackVertical: 'w-1.5',
      thumb: 'h-4 w-4',
      text: 'text-sm'
    },
    md: {
      track: 'h-2',
      trackVertical: 'w-2',
      thumb: 'h-5 w-5',
      text: 'text-base'
    },
    lg: {
      track: 'h-3',
      trackVertical: 'w-3',
      thumb: 'h-6 w-6',
      text: 'text-lg'
    },
    xl: {
      track: 'h-4',
      trackVertical: 'w-4',
      thumb: 'h-7 w-7',
      text: 'text-xl'
    }
  };
  
  // Klassen für verschiedene Varianten
  const variantClasses: Record<SliderVariant, string> = {
    solid: 'bg-gray-200 dark:bg-gray-700',
    outline: bordered 
      ? 'border border-gray-300 dark:border-gray-600 bg-transparent' 
      : 'bg-transparent',
    filled: 'bg-gray-100 dark:bg-gray-800',
    minimal: 'bg-transparent'
  };
  
  // Klassen für verschiedene Farben
  const colorClasses = {
    primary: 'bg-primary-600 dark:bg-primary-500',
    secondary: 'bg-secondary-600 dark:bg-secondary-500',
    success: 'bg-green-600 dark:bg-green-500',
    danger: 'bg-red-600 dark:bg-red-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    info: 'bg-blue-600 dark:bg-blue-500',
    neutral: 'bg-gray-600 dark:bg-gray-500'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = _isInvalid
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : _isValid || _isSuccess
      ? 'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500'
      : '';
  
  // Effekt-spezifische Klassen
  const effectClasses = {
    shadow: shadow ? 'shadow-sm' : '',
    rounded: rounded ? 'rounded-full' : 'rounded',
    hover: hoverable && !_disabled ? 'hover:bg-opacity-90 dark:hover:bg-opacity-90' : '',
    focus: focusable && !_disabled ? 'focus:outline-none focus:ring-2 focus:ring-offset-2' : '',
    transition: transition ? 'transition-all duration-200 ease-in-out' : '',
    transparent: transparent ? 'bg-opacity-80 dark:bg-opacity-80' : '',
    disabled: _disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  };
  
  // Thumb-Form-spezifische Klassen
  const thumbShapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rectangle: 'rounded-sm',
    diamond: 'transform rotate-45',
    custom: ''
  };
  
  // Track-Form-spezifische Klassen
  const trackShapeClasses = {
    rounded: 'rounded-full',
    square: 'rounded-none',
    custom: ''
  };
  
  // Basis-Klassen für den Track
  const trackClasses = [
    'absolute',
    orientation === 'horizontal' ? sizeClasses[size].track : sizeClasses[size].trackVertical,
    orientation === 'horizontal' ? 'w-full' : 'h-full',
    variantClasses[variant],
    trackShapeClasses[trackShape],
    stateClasses,
    effectClasses.shadow,
    effectClasses.rounded,
    effectClasses.transition,
    effectClasses.transparent,
    trackClassName
  ].filter(Boolean).join(' ');
  
  // Basis-Klassen für den Fill-Track
  const fillTrackClasses = [
    'absolute',
    orientation === 'horizontal' ? sizeClasses[size].track : sizeClasses[size].trackVertical,
    colorClasses[colorScheme],
    trackShapeClasses[trackShape],
    stateClasses,
    effectClasses.shadow,
    effectClasses.rounded,
    effectClasses.hover,
    effectClasses.transition,
    fillTrackClassName
  ].filter(Boolean).join(' ');
  
  // Basis-Klassen für den Thumb
  const thumbClasses = [
    'absolute',
    sizeClasses[size].thumb,
    'bg-white dark:bg-gray-200',
    'border-2',
    `border-${colorScheme}-600 dark:border-${colorScheme}-500`,
    thumbShapeClasses[thumbShape],
    stateClasses,
    effectClasses.shadow,
    effectClasses.transition,
    isDragging || isDragging2 || isFocused ? 'scale-110' : '',
    _disabled ? 'cursor-not-allowed' : 'cursor-grab',
    isDragging || isDragging2 ? 'cursor-grabbing' : '',
    thumbClassName
  ].filter(Boolean).join(' ');
  
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
  
  // Rendere das Label
  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <label 
        htmlFor={_id}
        className={`${hideLabel ? 'sr-only' : ''} ${sizeClasses[size].text} text-gray-700 dark:text-gray-300 ${_disabled ? 'opacity-50 cursor-not-allowed' : ''} ${labelClassName}`}
        title={labelTooltip}
      >
        {label}
        {_required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>
    );
  };
  
  // Rendere den Hilfetext
  const renderHelperText = () => {
    if (!_error && !helperText && !successMessage) return null;
    
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
  
  // Rendere den Wert
  const renderValue = () => {
    if (!showValue) return null;
    
    const formattedValue = formatValue(currentValue);
    const formattedValue2 = isRange ? formatValue(currentValue2) : null;
    
    const valueText = isRange
      ? `${formattedValue} - ${formattedValue2}`
      : formattedValue;
    
    // Positioniere den Wert basierend auf valuePosition
    const positionClasses = {
      above: 'mb-2',
      below: 'mt-2',
      left: 'mr-2',
      right: 'ml-2',
      tooltip: ''
    };
    
    if (valuePosition === 'tooltip') {
      return null; // Tooltip wird separat gerendert
    }
    
    return (
      <div className={`text-sm text-gray-700 dark:text-gray-300 ${positionClasses[valuePosition]}`}>
        {valueText}
      </div>
    );
  };
  
  // Rendere den Tooltip
  const renderTooltip = () => {
    if (!tooltip || !showTooltip) return null;
    
    const formattedValue = formatValue(isDragging2 ? currentValue2 : currentValue);
    
    // Wenn tooltip ein React-Node ist, verwende diesen
    const tooltipContent = typeof tooltip === 'object'
      ? tooltip
      : formattedValue;
    
    return (
      <div 
        className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow pointer-events-none transform -translate-x-1/2 -translate-y-full"
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`
        }}
        aria-hidden="true"
      >
        {tooltipContent}
        <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -bottom-1 left-1/2 -ml-1"></div>
      </div>
    );
  };
  
  // Rendere die Markierungen
  const renderMarks = () => {
    if (!showMarks) return null;
    
    const marksList = marks || [];
    
    // Wenn keine benutzerdefinierten Markierungen angegeben sind, erstelle Standardmarkierungen
    if (marksList.length === 0) {
      const count = Math.min(5, Math.floor((max - min) / step) + 1);
      const step = (max - min) / (count - 1);
      
      for (let i = 0; i < count; i++) {
        const value = min + i * step;
        marksList.push({ value });
      }
    }
    
    // Positioniere die Markierungen basierend auf markPosition
    const positionClasses = {
      above: 'bottom-full mb-1',
      below: 'top-full mt-1',
      left: 'right-full mr-1',
      right: 'left-full ml-1'
    };
    
    return (
      <>
        {marksList.map((mark, index) => {
          const percent = getPercentage(mark.value);
          const isActive = isRange
            ? mark.value >= currentValue && mark.value <= currentValue2
            : mark.value <= currentValue;
          
          const markStyle: React.CSSProperties = {
            ...(orientation === 'horizontal'
              ? { left: `${percent}%` }
              : { bottom: `${percent}%` }),
            ...(mark.style || {})
          };
          
          return (
            <div 
              key={index}
              className={`absolute ${positionClasses[markPosition]} flex flex-col items-center`}
              style={markStyle}
            >
              <div 
                className={`w-1 h-1 rounded-full ${isActive ? colorClasses[colorScheme] : 'bg-gray-400 dark:bg-gray-600'} ${mark.className || ''}`}
              ></div>
              {mark.label && (
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  {mark.label}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };
  
  // Bestimme die ARIA-Attribute für den Slider
  const getAriaAttributes = (isSecondThumb = false) => {
    const attributes: Record<string, string> = {};
    
    if (description) {
      attributes['aria-describedby'] = `${_id}-description`;
    }
    
    if (_error) {
      attributes['aria-errormessage'] = `${_id}-error`;
      attributes['aria-invalid'] = 'true';
    }
    
    if (helperText && !_error) {
      attributes['aria-describedby'] = (attributes['aria-describedby'] ? `${attributes['aria-describedby']} ${_id}-helper` : `${_id}-helper`);
    }
    
    if (successMessage) {
      attributes['aria-describedby'] = (attributes['aria-describedby'] ? `${attributes['aria-describedby']} ${_id}-success` : `${_id}-success`);
    }
    
    if (busy) {
      attributes['aria-busy'] = 'true';
    }
    
    return attributes;
  };
  
  return (
    <div 
      className={`${containerClassName} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderDescription()}
      {renderLiveRegion()}
      
      {/* Label */}
      {renderLabel()}
      
      {/* Wert (wenn valuePosition === 'above') */}
      {valuePosition === 'above' && renderValue()}
      
      {/* Slider-Container */}
      <div 
        ref={sliderRef}
        className={`relative ${orientation === 'horizontal' ? 'w-full' : 'h-40'} ${sliderContainerClassName}`}
        title={sliderTooltip || tooltip}
      >
        {/* Track */}
        <div 
          ref={trackRef}
          className={trackClasses}
          onClick={(e) => handleMouseDown(e)}
          onTouchStart={(e) => handleTouchStart(e)}
          role="presentation"
        >
          {trackComponent}
        </div>
        
        {/* Fill-Track */}
        <div 
          className={fillTrackClasses}
          style={{
            ...(orientation === 'horizontal'
              ? {
                  left: inverted ? `${getPercentage(isRange ? currentValue2 : max)}%` : 0,
                  width: isRange
                    ? `${getPercentage(currentValue2) - getPercentage(currentValue)}%`
                    : inverted
                      ? `${getPercentage(max) - getPercentage(currentValue)}%`
                      : `${getPercentage(currentValue)}%`
                }
              : {
                  bottom: inverted ? 0 : `${getPercentage(isRange ? currentValue2 : max)}%`,
                  height: isRange
                    ? `${getPercentage(currentValue2) - getPercentage(currentValue)}%`
                    : inverted
                      ? `${getPercentage(currentValue)}%`
                      : `${getPercentage(max) - getPercentage(currentValue)}%`
                })
          }}
          role="presentation"
        >
          {fillTrackComponent}
        </div>
        
        {/* Thumb */}
        <div 
          ref={thumbRef}
          className={thumbClasses}
          style={{
            ...(orientation === 'horizontal'
              ? {
                  left: `${getPercentage(currentValue)}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }
              : {
                  bottom: `${getPercentage(currentValue)}%`,
                  left: '50%',
                  transform: 'translate(-50%, 50%)'
                })
          }}
          onMouseDown={(e) => handleMouseDown(e)}
          onTouchStart={(e) => handleTouchStart(e)}
          role="presentation"
          tabIndex={-1}
          aria-hidden="true"
        >
          {thumbComponent}
        </div>
        
        {/* Zweiter Thumb (nur bei Range-Slider) */}
        {isRange && (
          <div 
            ref={thumb2Ref}
            className={thumbClasses}
            style={{
              ...(orientation === 'horizontal'
                ? {
                    left: `${getPercentage(currentValue2)}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }
                : {
                    bottom: `${getPercentage(currentValue2)}%`,
                    left: '50%',
                    transform: 'translate(-50%, 50%)'
                  })
            }}
            onMouseDown={(e) => handleMouseDown(e, true)}
            onTouchStart={(e) => handleTouchStart(e, true)}
            role="presentation"
            tabIndex={-1}
            aria-hidden="true"
          >
            {thumbComponent}
          </div>
        )}
        
        {/* Markierungen */}
        {renderMarks()}
        
        {/* Tooltip */}
        {renderTooltip()}
        
        {/* Verstecktes Input-Element für Barrierefreiheit */}
        <input
          ref={handleRef}
          type="range"
          id={_id}
          name={_name}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={_disabled}
          required={_required}
          className="sr-only"
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            setCurrentValue(newValue);
            if (onChange) onChange(newValue);
          }}
          onKeyDown={(e) => handleKeyDown(e)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-orientation={orientation}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-valuetext={getAriaValuetext(currentValue)}
          aria-label={ariaLabel || label?.toString() || 'Slider'}
          {...getAriaAttributes()}
          {...props}
        />
        
        {/* Zweites verstecktes Input-Element für Range-Slider */}
        {isRange && (
          <input
            ref={input2Ref}
            type="range"
            id={`${_id}-2`}
            name={`${_name}-2`}
            min={min}
            max={max}
            step={step}
            value={currentValue2}
            disabled={_disabled}
            required={_required}
            className="sr-only"
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              setCurrentValue2(newValue);
              if (onChange2) onChange2(newValue);
            }}
            onKeyDown={(e) => handleKeyDown(e, true)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-orientation={orientation}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue2}
            aria-valuetext={getAriaValuetext(currentValue2)}
            aria-label={`${ariaLabel || label?.toString() || 'Slider'} (zweiter Wert)`}
            {...getAriaAttributes(true)}
          />
        )}
      </div>
      
      {/* Wert (wenn valuePosition === 'below') */}
      {valuePosition === 'below' && renderValue()}
      
      {/* Hilfetext/Fehlermeldung */}
      {renderHelperText()}
    </div>
  );
});

SliderA11y.displayName = 'SliderA11y';

export default SliderA11y;