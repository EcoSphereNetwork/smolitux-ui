import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { useFormControl } from '../FormControl';

export type SliderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SliderVariant = 'solid' | 'outline' | 'filled' | 'minimal';
export type SliderColorScheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral';
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

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'value' | 'defaultValue' | 'onChange'
  > {
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
  /** Form des Thumbs */
  thumbShape?: SliderThumbShape;
  /** Form der Track */
  trackShape?: SliderTrackShape;
  /** Benutzerdefinierter Thumb */
  thumbIcon?: React.ReactNode;
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
  tooltip?: boolean | ((value: number) => React.ReactNode);
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
  /** Zusätzliche CSS-Klassen für den Track */
  trackClassName?: string;
  /** Zusätzliche CSS-Klassen für den Filled-Track */
  filledTrackClassName?: string;
  /** Zusätzliche CSS-Klassen für den Thumb */
  thumbClassName?: string;
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
  /** Ob der Slider als Card angezeigt werden soll */
  isCard?: boolean;
  /** Ob der Slider als Pill angezeigt werden soll */
  isPill?: boolean;
  /** Ob der Slider als iOS-Style angezeigt werden soll */
  isIOS?: boolean;
  /** Ob der Slider als Android-Style angezeigt werden soll */
  isAndroid?: boolean;
  /** Ob der Slider als Material-Style angezeigt werden soll */
  isMaterial?: boolean;
  /** Ob der Slider als Windows-Style angezeigt werden soll */
  isWindows?: boolean;
  /** Ob der Slider als Fluent-Style angezeigt werden soll */
  isFluent?: boolean;
  /** Ob der Slider als Flat-Style angezeigt werden soll */
  isFlat?: boolean;
  /** Ob der Slider als 3D-Style angezeigt werden soll */
  is3D?: boolean;
  /** Ob der Slider als Neon-Style angezeigt werden soll */
  isNeon?: boolean;
  /** Ob der Slider als Glassmorphism-Style angezeigt werden soll */
  isGlass?: boolean;
  /** Ob der Slider als Neumorphism-Style angezeigt werden soll */
  isNeumorphic?: boolean;
  /** Ob der Slider als Skeuomorphism-Style angezeigt werden soll */
  isSkeuomorphic?: boolean;
  /** Ob der Slider als Retro-Style angezeigt werden soll */
  isRetro?: boolean;
  /** Ob der Slider als Futuristic-Style angezeigt werden soll */
  isFuturistic?: boolean;
  /** Ob der Slider als Minimal-Style angezeigt werden soll */
  isMinimal?: boolean;
  /** Ob der Slider als Range-Slider angezeigt werden soll */
  isRange?: boolean;
  /** Zweiter Wert für Range-Slider */
  value2?: number;
  /** Standardwert für den zweiten Wert des Range-Sliders */
  defaultValue2?: number;
  /** Callback bei Änderung des zweiten Werts */
  onChange2?: (value: number) => void;
  /** Callback bei Start des Ziehens des zweiten Thumbs */
  onChangeStart2?: (value: number) => void;
  /** Callback bei Ende des Ziehens des zweiten Thumbs */
  onChangeEnd2?: (value: number) => void;
  /** Ob der Slider Markierungen anzeigen soll */
  showMarks?: boolean;
  /** Markierungen für den Slider */
  marks?: SliderMark[];
  /** Position der Markierungen */
  markPosition?: SliderMarkPosition;
  /** Ob der Slider den aktuellen Wert anzeigen soll */
  showValue?: boolean;
  /** Position des Werts */
  valuePosition?: SliderValuePosition;
  /** Formatierung des Werts */
  valueFormat?: (value: number) => React.ReactNode;
  /** Ob der Slider eine Skala anzeigen soll */
  showScale?: boolean;
  /** Anzahl der Skalenteile */
  scaleSteps?: number;
  /** Formatierung der Skala */
  scaleFormat?: (value: number) => React.ReactNode;
  /** Ob der Slider einen Bereich hervorheben soll */
  highlightRange?: [number, number];
  /** Farbe des hervorgehobenen Bereichs */
  highlightColor?: string;
  /** Ob der Slider mehrere Bereiche hervorheben soll */
  highlightRanges?: Array<{ range: [number, number]; color?: string; className?: string }>;
  /** Ob der Slider einen Griff für die Größenänderung haben soll */
  resizable?: boolean;
  /** Callback bei Größenänderung */
  onResize?: (size: number) => void;
  /** Ob der Slider einen Griff für die Rotation haben soll */
  rotatable?: boolean;
  /** Callback bei Rotation */
  onRotate?: (angle: number) => void;
  /** Ob der Slider einen Griff für die Verschiebung haben soll */
  movable?: boolean;
  /** Callback bei Verschiebung */
  onMove?: (position: { x: number; y: number }) => void;
  /** Ob der Slider einen Griff für die Skalierung haben soll */
  scalable?: boolean;
  /** Callback bei Skalierung */
  onScale?: (scale: number) => void;
  /** Ob der Slider einen Griff für die Scherung haben soll */
  skewable?: boolean;
  /** Callback bei Scherung */
  onSkew?: (skew: { x: number; y: number }) => void;
  /** Ob der Slider einen Griff für die Spiegelung haben soll */
  flippable?: boolean;
  /** Callback bei Spiegelung */
  onFlip?: (flip: { x: boolean; y: boolean }) => void;
  /** Ob der Slider einen Griff für die Perspektive haben soll */
  perspectable?: boolean;
  /** Callback bei Perspektivänderung */
  onPerspective?: (perspective: number) => void;
  /** Ob der Slider einen Griff für die Opazität haben soll */
  opacitable?: boolean;
  /** Callback bei Opazitätsänderung */
  onOpacity?: (opacity: number) => void;
  /** Ob der Slider einen Griff für die Farbänderung haben soll */
  colorable?: boolean;
  /** Callback bei Farbänderung */
  onColor?: (color: string) => void;
  /** Ob der Slider einen Griff für die Filteränderung haben soll */
  filterable?: boolean;
  /** Callback bei Filteränderung */
  onFilter?: (filter: string) => void;
  /** Ob der Slider einen Griff für die Mischmodusänderung haben soll */
  blendable?: boolean;
  /** Callback bei Mischmodusänderung */
  onBlend?: (blendMode: string) => void;
  /** Ob der Slider einen Griff für die Schattenänderung haben soll */
  shadowable?: boolean;
  /** Callback bei Schattenänderung */
  onShadow?: (shadow: string) => void;
  /** Ob der Slider einen Griff für die Rahmenänderung haben soll */
  borderable?: boolean;
  /** Callback bei Rahmenänderung */
  onBorder?: (border: string) => void;
  /** Ob der Slider einen Griff für die Abrundungsänderung haben soll */
  roundable?: boolean;
  /** Callback bei Abrundungsänderung */
  onRound?: (borderRadius: string) => void;
  /** Ob der Slider einen Griff für die Polsterungsänderung haben soll */
  paddingable?: boolean;
  /** Callback bei Polsterungsänderung */
  onPadding?: (padding: string) => void;
  /** Ob der Slider einen Griff für die Randänderung haben soll */
  marginable?: boolean;
  /** Callback bei Randänderung */
  onMargin?: (margin: string) => void;
  /** Ob der Slider einen Griff für die Positionsänderung haben soll */
  positionable?: boolean;
  /** Callback bei Positionsänderung */
  onPosition?: (position: string) => void;
  /** Ob der Slider einen Griff für die Größenänderung haben soll */
  dimensionable?: boolean;
  /** Callback bei Größenänderung */
  onDimension?: (dimension: { width: string; height: string }) => void;
  /** Ob der Slider einen Griff für die Textänderung haben soll */
  textable?: boolean;
  /** Callback bei Textänderung */
  onText?: (text: string) => void;
  /** Ob der Slider einen Griff für die Schriftartänderung haben soll */
  fontable?: boolean;
  /** Callback bei Schriftartänderung */
  onFont?: (font: string) => void;
  /** Ob der Slider einen Griff für die Schriftgrößenänderung haben soll */
  fontsizable?: boolean;
  /** Callback bei Schriftgrößenänderung */
  onFontSize?: (fontSize: string) => void;
  /** Ob der Slider einen Griff für die Schriftstiländerung haben soll */
  fontstyleable?: boolean;
  /** Callback bei Schriftstiländerung */
  onFontStyle?: (fontStyle: string) => void;
  /** Ob der Slider einen Griff für die Schriftgewichtänderung haben soll */
  fontweightable?: boolean;
  /** Callback bei Schriftgewichtänderung */
  onFontWeight?: (fontWeight: string) => void;
  /** Ob der Slider einen Griff für die Zeilenabstandänderung haben soll */
  lineheightable?: boolean;
  /** Callback bei Zeilenabstandänderung */
  onLineHeight?: (lineHeight: string) => void;
  /** Ob der Slider einen Griff für die Buchstabenabstandänderung haben soll */
  letterspaceable?: boolean;
  /** Callback bei Buchstabenabstandänderung */
  onLetterSpacing?: (letterSpacing: string) => void;
  /** Ob der Slider einen Griff für die Wortabstandänderung haben soll */
  wordspaceable?: boolean;
  /** Callback bei Wortabstandänderung */
  onWordSpacing?: (wordSpacing: string) => void;
  /** Ob der Slider einen Griff für die Textausrichtungänderung haben soll */
  textalignable?: boolean;
  /** Callback bei Textausrichtungänderung */
  onTextAlign?: (textAlign: string) => void;
  /** Ob der Slider einen Griff für die Textdekorationänderung haben soll */
  textdecorationable?: boolean;
  /** Callback bei Textdekorationänderung */
  onTextDecoration?: (textDecoration: string) => void;
  /** Ob der Slider einen Griff für die Texttransformationänderung haben soll */
  texttransformable?: boolean;
  /** Callback bei Texttransformationänderung */
  onTextTransform?: (textTransform: string) => void;
  /** Ob der Slider einen Griff für die Texteinrückungänderung haben soll */
  textindentable?: boolean;
  /** Callback bei Texteinrückungänderung */
  onTextIndent?: (textIndent: string) => void;
  /** Ob der Slider einen Griff für die Textrichtungänderung haben soll */
  textdirectionable?: boolean;
  /** Callback bei Textrichtungänderung */
  onTextDirection?: (textDirection: string) => void;
  /** Ob der Slider einen Griff für die Textüberlaufänderung haben soll */
  textoverflowable?: boolean;
  /** Callback bei Textüberlaufänderung */
  onTextOverflow?: (textOverflow: string) => void;
  /** Ob der Slider einen Griff für die Textschattenänderung haben soll */
  textshadowable?: boolean;
  /** Callback bei Textschattenänderung */
  onTextShadow?: (textShadow: string) => void;
  /** Ob der Slider einen Griff für die Textumbruchänderung haben soll */
  textwrapable?: boolean;
  /** Callback bei Textumbruchänderung */
  onTextWrap?: (textWrap: string) => void;
  /** Ob der Slider einen Griff für die Textkapitalisierungänderung haben soll */
  textcapitalizationable?: boolean;
  /** Callback bei Textkapitalisierungänderung */
  onTextCapitalization?: (textCapitalization: string) => void;
  /** Ob der Slider einen Griff für die Textkerningänderung haben soll */
  textkerningable?: boolean;
  /** Callback bei Textkerningänderung */
  onTextKerning?: (textKerning: string) => void;
  /** Ob der Slider einen Griff für die Textrendering-Änderung haben soll */
  textrenderingable?: boolean;
  /** Callback bei Textrendering-Änderung */
  onTextRendering?: (textRendering: string) => void;
  /** Ob der Slider einen Griff für die Textfüllfarbe-Änderung haben soll */
  textfillable?: boolean;
  /** Callback bei Textfüllfarbe-Änderung */
  onTextFill?: (textFill: string) => void;
  /** Ob der Slider einen Griff für die Textstrichfarbe-Änderung haben soll */
  textstrokeable?: boolean;
  /** Callback bei Textstrichfarbe-Änderung */
  onTextStroke?: (textStroke: string) => void;
}

/**
 * Slider-Komponente für numerische Eingaben
 *
 * @example
 * ```tsx
 * <Slider
 *   label="Lautstärke"
 *   value={volume}
 *   onChange={setVolume}
 *   min={0}
 *   max={100}
 *   step={1}
 * />
 *
 * <Slider
 *   label="Helligkeit"
 *   colorScheme="warning"
 *   size="lg"
 *   variant="filled"
 *   value={brightness}
 *   onChange={setBrightness}
 *   min={0}
 *   max={100}
 *   step={5}
 *   showMarks
 *   marks={[
 *     { value: 0, label: 'Min' },
 *     { value: 50, label: '50%' },
 *     { value: 100, label: 'Max' }
 *   ]}
 * />
 *
 * <Slider
 *   label="Temperatur"
 *   isRange
 *   value={minTemp}
 *   value2={maxTemp}
 *   onChange={setMinTemp}
 *   onChange2={setMaxTemp}
 *   min={-20}
 *   max={40}
 *   step={1}
 *   showValue
 *   valueFormat={(value) => `${value}°C`}
 * />
 * ```
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
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
      thumbIcon,
      className = '',
      containerClassName = '',
      sliderContainerClassName = '',
      trackClassName = '',
      filledTrackClassName = '',
      thumbClassName = '',
      labelClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      successClassName = '',
      disabled,
      id,
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
      isCard = false,
      isPill = false,
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
      isRange = false,
      value2,
      defaultValue2 = max,
      onChange2,
      onChangeStart2,
      onChangeEnd2,
      showMarks = false,
      marks,
      markPosition = 'above',
      showValue = false,
      valuePosition = 'above',
      valueFormat,
      showScale = false,
      scaleSteps = 5,
      scaleFormat,
      highlightRange,
      highlightColor,
      highlightRanges,
      required,
      ...rest
    },
    ref
  ) => {
    // Hole FormControl-Context, falls vorhanden
    const formControl = useFormControl();

    // Kombiniere Props mit FormControl-Context
    const _disabled = isDisabled ?? disabled ?? formControl.disabled;
    const _required = isRequired ?? required ?? formControl.required;
    const _error = error || (formControl.hasError ? 'Ungültige Eingabe' : undefined);
    const _isInvalid = isInvalid || Boolean(_error) || formControl.isInvalid;
    const _isValid = isValid || formControl.isValid;
    const _isSuccess = isSuccess || formControl.isSuccess;
    const _isLoading = isLoading || formControl.isLoading;
    const _size = size || formControl.size || 'md';
    const _id = id || formControl.id || `slider-${Math.random().toString(36).substring(2, 9)}`;

    // Refs
    const sliderRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const input2Ref = useRef<HTMLInputElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const thumb2Ref = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const tooltip2Ref = useRef<HTMLDivElement>(null);

    // Kombiniere den externen Ref mit unserem internen Ref
    const handleRef = (element: HTMLInputElement | null) => {
      inputRef.current = element;

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // State für Slider-Werte
    const [internalValue, setInternalValue] = useState(value !== undefined ? value : defaultValue);
    const [internalValue2, setInternalValue2] = useState(
      value2 !== undefined ? value2 : defaultValue2
    );
    const [isDragging, setIsDragging] = useState(false);
    const [isDragging2, setIsDragging2] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showTooltip2, setShowTooltip2] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [tooltip2Position, setTooltip2Position] = useState({ x: 0, y: 0 });

    // Aktualisiere interne Werte, wenn sich externe Werte ändern
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    useEffect(() => {
      if (value2 !== undefined) {
        setInternalValue2(value2);
      }
    }, [value2]);

    // Effekt für autoFocus
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    // Bestimme den Stil basierend auf den Props
    const getStyle = () => {
      if (isIOS) return 'ios';
      if (isAndroid) return 'android';
      if (isMaterial) return 'material';
      if (isWindows) return 'windows';
      if (isFluent) return 'fluent';
      if (isFlat) return 'flat';
      if (is3D) return '3d';
      if (isNeon) return 'neon';
      if (isGlass) return 'glass';
      if (isNeumorphic) return 'neumorphic';
      if (isSkeuomorphic) return 'skeuomorphic';
      if (isRetro) return 'retro';
      if (isFuturistic) return 'futuristic';
      if (isMinimal) return 'minimal';
      return 'default';
    };

    const style = getStyle();

    // Größen-spezifische Klassen
    const sizeClasses = {
      xs: {
        track: 'h-1',
        trackVertical: 'w-1',
        thumb: 'w-3 h-3',
        text: 'text-xs',
        gap: 'gap-1',
      },
      sm: {
        track: 'h-1.5',
        trackVertical: 'w-1.5',
        thumb: 'w-4 h-4',
        text: 'text-xs',
        gap: 'gap-1.5',
      },
      md: {
        track: 'h-2',
        trackVertical: 'w-2',
        thumb: 'w-5 h-5',
        text: 'text-sm',
        gap: 'gap-2',
      },
      lg: {
        track: 'h-2.5',
        trackVertical: 'w-2.5',
        thumb: 'w-6 h-6',
        text: 'text-base',
        gap: 'gap-3',
      },
      xl: {
        track: 'h-3',
        trackVertical: 'w-3',
        thumb: 'w-7 h-7',
        text: 'text-lg',
        gap: 'gap-4',
      },
    };

    // Varianten-spezifische Klassen
    // Farben-spezifische Klassen
    const colorClasses = {
      primary: {
        bg: 'bg-primary-600',
        bgDark: 'dark:bg-primary-500',
        bgLight: 'bg-primary-100',
        bgLightDark: 'dark:bg-primary-900',
        border: 'border-primary-600',
        borderDark: 'dark:border-primary-500',
        text: 'text-primary-600',
        textDark: 'dark:text-primary-500',
        ring: 'ring-primary-600',
        ringDark: 'dark:ring-primary-500',
      },
      secondary: {
        bg: 'bg-secondary-600',
        bgDark: 'dark:bg-secondary-500',
        bgLight: 'bg-secondary-100',
        bgLightDark: 'dark:bg-secondary-900',
        border: 'border-secondary-600',
        borderDark: 'dark:border-secondary-500',
        text: 'text-secondary-600',
        textDark: 'dark:text-secondary-500',
        ring: 'ring-secondary-600',
        ringDark: 'dark:ring-secondary-500',
      },
      success: {
        bg: 'bg-green-600',
        bgDark: 'dark:bg-green-500',
        bgLight: 'bg-green-100',
        bgLightDark: 'dark:bg-green-900',
        border: 'border-green-600',
        borderDark: 'dark:border-green-500',
        text: 'text-green-600',
        textDark: 'dark:text-green-500',
        ring: 'ring-green-600',
        ringDark: 'dark:ring-green-500',
      },
      danger: {
        bg: 'bg-red-600',
        bgDark: 'dark:bg-red-500',
        bgLight: 'bg-red-100',
        bgLightDark: 'dark:bg-red-900',
        border: 'border-red-600',
        borderDark: 'dark:border-red-500',
        text: 'text-red-600',
        textDark: 'dark:text-red-500',
        ring: 'ring-red-600',
        ringDark: 'dark:ring-red-500',
      },
      warning: {
        bg: 'bg-yellow-600',
        bgDark: 'dark:bg-yellow-500',
        bgLight: 'bg-yellow-100',
        bgLightDark: 'dark:bg-yellow-900',
        border: 'border-yellow-600',
        borderDark: 'dark:border-yellow-500',
        text: 'text-yellow-600',
        textDark: 'dark:text-yellow-500',
        ring: 'ring-yellow-600',
        ringDark: 'dark:ring-yellow-500',
      },
      info: {
        bg: 'bg-blue-600',
        bgDark: 'dark:bg-blue-500',
        bgLight: 'bg-blue-100',
        bgLightDark: 'dark:bg-blue-900',
        border: 'border-blue-600',
        borderDark: 'dark:border-blue-500',
        text: 'text-blue-600',
        textDark: 'dark:text-blue-500',
        ring: 'ring-blue-600',
        ringDark: 'dark:ring-blue-500',
      },
      neutral: {
        bg: 'bg-gray-600',
        bgDark: 'dark:bg-gray-500',
        bgLight: 'bg-gray-100',
        bgLightDark: 'dark:bg-gray-900',
        border: 'border-gray-600',
        borderDark: 'dark:border-gray-500',
        text: 'text-gray-600',
        textDark: 'dark:text-gray-500',
        ring: 'ring-gray-600',
        ringDark: 'dark:ring-gray-500',
      },
    };

    // Varianten-spezifische Klassen
    const variantClasses = {
      solid: {
        track: 'bg-gray-300 dark:bg-gray-600',
        filledTrack: `${colorClasses[colorScheme].bg} ${colorClasses[colorScheme].bgDark}`,
        thumb: 'bg-white',
      },
      outline: {
        track: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
        filledTrack: `bg-transparent border-2 ${colorClasses[colorScheme].border} ${colorClasses[colorScheme].borderDark}`,
        thumb: `${colorClasses[colorScheme].bg} ${colorClasses[colorScheme].bgDark}`,
      },
      filled: {
        track: 'bg-gray-200 dark:bg-gray-700',
        filledTrack: `${colorClasses[colorScheme].bgLight} ${colorClasses[colorScheme].bg}`,
        thumb: `${colorClasses[colorScheme].bg} ${colorClasses[colorScheme].bgDark}`,
      },
      minimal: {
        track: 'bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700',
        filledTrack: 'bg-gray-400 dark:bg-gray-600',
        thumb: `${colorClasses[colorScheme].bg} ${colorClasses[colorScheme].bgDark}`,
      },
    };

    // Stil-spezifische Klassen
    const styleClasses = {
      default: {},
      ios: {
        track: 'bg-gray-200 dark:bg-gray-700',
        filledTrack: 'bg-blue-500 dark:bg-blue-400',
        thumb: 'bg-white shadow-md',
      },
      android: {
        track: 'bg-gray-300 dark:bg-gray-600',
        filledTrack: 'bg-blue-500 dark:bg-blue-400',
        thumb: 'bg-blue-500 dark:bg-blue-400 shadow-md',
      },
      material: {
        track: 'bg-gray-400 dark:bg-gray-500',
        filledTrack: 'bg-primary-500 dark:bg-primary-400',
        thumb: 'bg-primary-500 dark:bg-primary-400 shadow-md',
      },
      windows: {
        track: 'bg-gray-300 dark:bg-gray-600 rounded-none',
        filledTrack: 'bg-primary-600 dark:bg-primary-500 rounded-none',
        thumb: 'bg-primary-600 dark:bg-primary-500 rounded-none',
      },
      fluent: {
        track: 'bg-gray-200 dark:bg-gray-700 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80',
        filledTrack:
          'bg-primary-500 dark:bg-primary-400 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80',
        thumb: 'bg-white shadow-md',
      },
      flat: {
        track: 'bg-gray-300 dark:bg-gray-600 shadow-none',
        filledTrack: 'bg-primary-600 dark:bg-primary-500 shadow-none',
        thumb: 'bg-primary-600 dark:bg-primary-500 shadow-none',
      },
      '3d': {
        track:
          'bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shadow-inner',
        filledTrack:
          'bg-gradient-to-b from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 shadow-inner',
        thumb:
          'bg-gradient-to-b from-white to-gray-100 dark:from-gray-200 dark:to-gray-300 shadow-md',
      },
      neon: {
        track: 'bg-gray-900 dark:bg-black border border-gray-700 dark:border-gray-800',
        filledTrack:
          'bg-primary-500 dark:bg-primary-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(96,165,250,0.5)]',
        thumb:
          'bg-primary-500 dark:bg-primary-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(96,165,250,0.5)]',
      },
      glass: {
        track:
          'bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 dark:border-gray-700',
        filledTrack:
          'bg-primary-500 bg-opacity-20 dark:bg-primary-400 dark:bg-opacity-20 backdrop-blur-md border border-primary-500 border-opacity-30 dark:border-primary-400',
        thumb: 'bg-white bg-opacity-70 dark:bg-white dark:bg-opacity-70 backdrop-blur-md shadow-md',
      },
      neumorphic: {
        track:
          'bg-gray-200 dark:bg-gray-800 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.1)]',
        filledTrack:
          'bg-gray-200 dark:bg-gray-800 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.1)]',
        thumb:
          'bg-gray-200 dark:bg-gray-800 shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.1)]',
      },
      skeuomorphic: {
        track:
          'bg-gradient-to-b from-gray-400 to-gray-500 dark:from-gray-700 dark:to-gray-800 border border-gray-600 dark:border-gray-900 shadow-inner',
        filledTrack:
          'bg-gradient-to-b from-primary-400 to-primary-500 dark:from-primary-700 dark:to-primary-800 border border-primary-600 dark:border-primary-900 shadow-inner',
        thumb:
          'bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-300 dark:to-gray-500 border border-gray-400 dark:border-gray-700 shadow-md',
      },
      retro: {
        track: 'bg-gray-300 dark:bg-gray-700 border-2 border-gray-500 dark:border-gray-500',
        filledTrack:
          'bg-primary-500 dark:bg-primary-700 border-2 border-primary-700 dark:border-primary-500',
        thumb: 'bg-gray-100 dark:bg-gray-300 border-2 border-gray-500 dark:border-gray-500',
      },
      futuristic: {
        track: 'bg-gray-900 dark:bg-black border border-blue-500 dark:border-blue-400',
        filledTrack: 'bg-blue-500 dark:bg-blue-400',
        thumb: 'bg-white dark:bg-gray-200',
      },
      minimal: {
        track: 'bg-gray-200 dark:bg-gray-800',
        filledTrack: 'bg-gray-400 dark:bg-gray-600',
        thumb: 'bg-primary-500 dark:bg-primary-400',
      },
    };

    // Thumb-Form-spezifische Klassen
    const thumbShapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-none',
      rectangle: 'rounded-none',
      diamond: 'rotate-45 rounded-none',
      custom: '',
    };

    // Track-Form-spezifische Klassen
    const trackShapeClasses = {
      rounded: 'rounded-full',
      square: 'rounded-none',
      custom: '',
    };

    // Berechne Prozentsatz für Slider-Position
    const calculatePercentage = (value: number) => {
      return ((value - min) / (max - min)) * 100;
    };

    // Berechne Wert aus Prozentsatz
    const calculateValue = (percentage: number) => {
      const rawValue = min + (percentage / 100) * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, steppedValue));
    };

    // Berechne Wert aus Mausposition
    const calculateValueFromPosition = (clientX: number, clientY: number) => {
      if (!trackRef.current) return internalValue;

      const rect = trackRef.current.getBoundingClientRect();
      let percentage;

      if (isVertical || orientation === 'vertical') {
        percentage = 100 - ((clientY - rect.top) / rect.height) * 100;
      } else {
        percentage = ((clientX - rect.left) / rect.width) * 100;
      }

      return calculateValue(percentage);
    };

    // Aktualisiere Tooltip-Position
    const updateTooltipPosition = () => {
      if (!thumbRef.current || !tooltipRef.current) return;

      const thumbRect = thumbRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x, y;

      if (isVertical || orientation === 'vertical') {
        x = thumbRect.right + 10;
        y = thumbRect.top + thumbRect.height / 2 - tooltipRect.height / 2;
      } else {
        x = thumbRect.left + thumbRect.width / 2 - tooltipRect.width / 2;
        y = thumbRect.top - tooltipRect.height - 10;
      }

      setTooltipPosition({ x, y });
    };

    // Aktualisiere zweite Tooltip-Position
    const updateTooltip2Position = () => {
      if (!thumb2Ref.current || !tooltip2Ref.current) return;

      const thumbRect = thumb2Ref.current.getBoundingClientRect();
      const tooltipRect = tooltip2Ref.current.getBoundingClientRect();

      let x, y;

      if (isVertical || orientation === 'vertical') {
        x = thumbRect.right + 10;
        y = thumbRect.top + thumbRect.height / 2 - tooltipRect.height / 2;
      } else {
        x = thumbRect.left + thumbRect.width / 2 - tooltipRect.width / 2;
        y = thumbRect.top - tooltipRect.height - 10;
      }

      setTooltip2Position({ x, y });
    };

    // Event-Handler für Mausklick auf Track
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (_disabled) return;

      const newValue = calculateValueFromPosition(e.clientX, e.clientY);

      // Bestimme, welcher Thumb bewegt werden soll (bei Range-Slider)
      if (isRange) {
        const distanceToValue1 = Math.abs(newValue - internalValue);
        const distanceToValue2 = Math.abs(newValue - internalValue2);

        if (distanceToValue1 <= distanceToValue2) {
          setInternalValue(newValue);
          if (onChange) onChange(newValue);
        } else {
          setInternalValue2(newValue);
          if (onChange2) onChange2(newValue);
        }
      } else {
        setInternalValue(newValue);
        if (onChange) onChange(newValue);
      }
    };

    // Event-Handler für Thumb-Drag-Start
    const handleThumbMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (_disabled) return;

      e.preventDefault();
      setIsDragging(true);

      if (onChangeStart) onChangeStart(internalValue);

      if (tooltip) {
        setShowTooltip(true);
        updateTooltipPosition();
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // Event-Handler für zweiten Thumb-Drag-Start
    const handleThumb2MouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (_disabled) return;

      e.preventDefault();
      setIsDragging2(true);

      if (onChangeStart2) onChangeStart2(internalValue2);

      if (tooltip) {
        setShowTooltip2(true);
        updateTooltip2Position();
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // Event-Handler für Mausbewegung während Drag
    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (isDragging) {
          const newValue = calculateValueFromPosition(e.clientX, e.clientY);

          if (isRange) {
            // Stelle sicher, dass der erste Thumb nicht über den zweiten hinausgeht
            if (newValue <= internalValue2) {
              setInternalValue(newValue);
              if (onChange) onChange(newValue);
            }
          } else {
            setInternalValue(newValue);
            if (onChange) onChange(newValue);
          }

          if (tooltip) {
            updateTooltipPosition();
          }
        }

        if (isDragging2) {
          const newValue = calculateValueFromPosition(e.clientX, e.clientY);

          // Stelle sicher, dass der zweite Thumb nicht unter den ersten fällt
          if (newValue >= internalValue) {
            setInternalValue2(newValue);
            if (onChange2) onChange2(newValue);
          }

          if (tooltip) {
            updateTooltip2Position();
          }
        }
      },
      [
        isDragging,
        isDragging2,
        internalValue,
        internalValue2,
        isRange,
        onChange,
        onChange2,
        tooltip,
      ]
    );

    // Event-Handler für Maus-Release nach Drag
    const handleMouseUp = useCallback(() => {
      if (isDragging) {
        setIsDragging(false);
        if (onChangeEnd) onChangeEnd(internalValue);

        if (tooltip && typeof tooltip !== 'function') {
          setShowTooltip(false);
        }
      }

      if (isDragging2) {
        setIsDragging2(false);
        if (onChangeEnd2) onChangeEnd2(internalValue2);

        if (tooltip && typeof tooltip !== 'function') {
          setShowTooltip2(false);
        }
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }, [
      isDragging,
      isDragging2,
      internalValue,
      internalValue2,
      onChangeEnd,
      onChangeEnd2,
      tooltip,
    ]);

    // Cleanup-Effekt für Event-Listener
    useEffect(() => {
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [handleMouseMove, handleMouseUp]);

    // Event-Handler für Tastatureingaben
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (_disabled) return;

      let newValue = internalValue;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, internalValue + step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, internalValue - step);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      setInternalValue(newValue);
      if (onChange) onChange(newValue);
    };

    // Event-Handler für zweiten Thumb-Tastatureingaben
    const handleKey2Down = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (_disabled) return;

      let newValue = internalValue2;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, internalValue2 + step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, internalValue2 - step);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      setInternalValue2(newValue);
      if (onChange2) onChange2(newValue);
    };

    // Formatiere Wert für Anzeige
    const formatValue = (value: number) => {
      if (valueFormat) {
        return valueFormat(value);
      }
      return value.toString();
    };

    // Formatiere Skala für Anzeige
    const formatScale = (value: number) => {
      if (scaleFormat) {
        return scaleFormat(value);
      }
      return value.toString();
    };

    // Generiere Markierungen
    const generateMarks = () => {
      if (!showMarks) return null;

      const marksToRender =
        marks ||
        Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
          value: min + i * step,
        }));

      return marksToRender.map((mark) => {
        const percentage = calculatePercentage(mark.value);
        const isActive = isRange
          ? mark.value >= internalValue && mark.value <= internalValue2
          : mark.value <= internalValue;

        const markStyle: React.CSSProperties = {
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          ...(isVertical || orientation === 'vertical'
            ? { left: 0, top: `${100 - percentage}%` }
            : { left: `${percentage}%`, top: 0 }),
          ...mark.style,
        };

        return (
          <div
            key={mark.value}
            className={`
            w-1 h-1 rounded-full
            ${isActive ? `${colorClasses[colorScheme].bg} ${colorClasses[colorScheme].bgDark}` : 'bg-gray-400 dark:bg-gray-500'}
            ${mark.className || ''}
          `}
            style={markStyle}
            data-value={mark.value}
          >
            {mark.label && (
              <div
                className={`
                absolute ${sizeClasses[_size].text} whitespace-nowrap
                ${markPosition === 'above' ? 'bottom-3' : markPosition === 'below' ? 'top-3' : markPosition === 'left' ? 'right-3' : 'left-3'}
                ${isActive ? `${colorClasses[colorScheme].text} ${colorClasses[colorScheme].textDark}` : 'text-gray-600 dark:text-gray-400'}
              `}
              >
                {mark.label}
              </div>
            )}
          </div>
        );
      });
    };

    // Generiere Skala
    const generateScale = () => {
      if (!showScale) return null;

      const scaleValues = Array.from(
        { length: scaleSteps + 1 },
        (_, i) => min + (i * (max - min)) / scaleSteps
      );

      return scaleValues.map((value) => {
        const percentage = calculatePercentage(value);

        const scaleStyle: React.CSSProperties = {
          position: 'absolute',
          ...(isVertical || orientation === 'vertical'
            ? { left: 0, top: `${100 - percentage}%` }
            : { left: `${percentage}%`, top: '100%' }),
        };

        return (
          <div key={value} className="text-gray-600 dark:text-gray-400" style={scaleStyle}>
            <div className="mt-2 text-xs">{formatScale(value)}</div>
          </div>
        );
      });
    };

    // Generiere hervorgehobene Bereiche
    const generateHighlightedRanges = () => {
      if (!highlightRange && !highlightRanges) return null;

      const ranges = highlightRanges || [
        { range: highlightRange as [number, number], color: highlightColor },
      ];

      return ranges.map((rangeObj, index) => {
        if (!rangeObj.range) return null;

        const [start, end] = rangeObj.range;
        const startPercentage = calculatePercentage(start);
        const endPercentage = calculatePercentage(end);
        const width = endPercentage - startPercentage;

        const rangeStyle: React.CSSProperties =
          isVertical || orientation === 'vertical'
            ? {
                position: 'absolute',
                bottom: `${startPercentage}%`,
                left: 0,
                height: `${width}%`,
                width: '100%',
                backgroundColor: rangeObj.color || 'rgba(59, 130, 246, 0.2)',
              }
            : {
                position: 'absolute',
                left: `${startPercentage}%`,
                top: 0,
                width: `${width}%`,
                height: '100%',
                backgroundColor: rangeObj.color || 'rgba(59, 130, 246, 0.2)',
              };

        return <div key={index} className={`${rangeObj.className || ''}`} style={rangeStyle} data-testid="Slider" />;
      });
    };

    // Rendere Tooltip
    const renderTooltip = () => {
      if (!tooltip || !showTooltip) return null;

      const tooltipContent =
        typeof tooltip === 'function' ? tooltip(internalValue) : formatValue(internalValue);

      return (
        <div
          ref={tooltipRef}
          className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          {tooltipContent}
        </div>
      );
    };

    // Rendere zweiten Tooltip
    const renderTooltip2 = () => {
      if (!tooltip || !showTooltip2 || !isRange) return null;

      const tooltipContent =
        typeof tooltip === 'function' ? tooltip(internalValue2) : formatValue(internalValue2);

      return (
        <div
          ref={tooltip2Ref}
          className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md"
          style={{
            left: `${tooltip2Position.x}px`,
            top: `${tooltip2Position.y}px`,
          }}
        >
          {tooltipContent}
        </div>
      );
    };

    // Rendere Wertanzeige
    const renderValue = () => {
      if (!showValue) return null;

      const valueContent = (
        <div
          className={`
          ${sizeClasses[_size].text}
          ${colorClasses[colorScheme].text} ${colorClasses[colorScheme].textDark}
          ${valuePosition === 'tooltip' ? 'hidden' : ''}
        `}
        >
          {isRange
            ? `${formatValue(internalValue)} - ${formatValue(internalValue2)}`
            : formatValue(internalValue)}
        </div>
      );

      if (valuePosition === 'tooltip') return null;

      return (
        <div
          className={`
          ${valuePosition === 'above' ? 'mb-2' : valuePosition === 'below' ? 'mt-2' : valuePosition === 'left' ? 'mr-2' : 'ml-2'}
        `}
        >
          {valueContent}
        </div>
      );
    };

    // Rendere Indikatoren (Erfolg, Fehler, Laden)
    const renderIndicators = () => {
      if (
        !showSuccessIndicator &&
        !showErrorIndicator &&
        !showLoadingIndicator &&
        !showValidationIndicator
      ) {
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

      return <div className="ml-2" data-testid="Slider">{indicator}</div>;
    };

    // Bestimme die ARIA-Attribute für den Slider
    const getAriaAttributes = () => {
      const attributes: Record<string, string> = {
        role: 'slider',
        'aria-valuemin': min.toString(),
        'aria-valuemax': max.toString(),
        'aria-valuenow': internalValue.toString(),
        'aria-orientation': isVertical || orientation === 'vertical' ? 'vertical' : 'horizontal',
      };

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

      return attributes;
    };

    // Beschreibung für Screenreader
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={`${_id}-description`} className="sr-only" aria-hidden="false">
          {description}
        </div>
      );
    };

    // Rendere das Label
    const renderLabel = () => {
      if (!label && !formControl.label) return null;

      return (
        <div className={`${hideLabel ? 'sr-only' : ''}`}>
          <label
            htmlFor={_id}
            className={`
            ${sizeClasses[_size].text}
            ${_disabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}
            ${_disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            ${labelClassName}
          `}
            title={labelTooltip}
          >
            {label || formControl.label}
            {_required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
            {_required && <span className="sr-only">(Erforderlich)</span>}
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
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              {_error}
            </p>
          ) : successMessage && !hideSuccessMessage ? (
            <p
              id={`${_id}-success`}
              className={`text-green-600 dark:text-green-400 ${successClassName}`}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {successMessage}
            </p>
          ) : helperText && !hideHelperText ? (
            <p
              id={`${_id}-helper`}
              className={`text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
              aria-live="polite"
            >
              {helperText}
            </p>
          ) : null}
        </div>
      );
    };

    // Rendere den Slider
    const renderSlider = () => {
      const percentage1 = calculatePercentage(internalValue);
      const percentage2 = isRange ? calculatePercentage(internalValue2) : 0;

      const trackStyles: React.CSSProperties = {};
      const filledTrackStyles: React.CSSProperties = isRange
        ? isVertical || orientation === 'vertical'
          ? { bottom: `${percentage1}%`, height: `${percentage2 - percentage1}%` }
          : { left: `${percentage1}%`, width: `${percentage2 - percentage1}%` }
        : isVertical || orientation === 'vertical'
          ? { height: `${percentage1}%` }
          : { width: `${percentage1}%` };

      const thumb1Styles: React.CSSProperties =
        isVertical || orientation === 'vertical'
          ? { bottom: `${percentage1}%` }
          : { left: `${percentage1}%` };

      const thumb2Styles: React.CSSProperties =
        isVertical || orientation === 'vertical'
          ? { bottom: `${percentage2}%` }
          : { left: `${percentage2}%` };

      return (
        <div
          ref={sliderRef}
          className={`
          relative
          ${isVertical || orientation === 'vertical' ? 'h-48 w-auto' : 'w-full h-auto'}
          ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${sliderContainerClassName}
        `}
          title={sliderTooltip}
        >
          {/* Verstecktes Input-Element für Wert und Barrierefreiheit */}
          <input
            ref={handleRef}
            id={_id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={internalValue}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              setInternalValue(newValue);
              if (onChange) onChange(newValue);
            }}
            onKeyDown={handleKeyDown}
            disabled={_disabled}
            required={_required}
            className="sr-only"
            {...getAriaAttributes()}
            {...rest}
          />

          {isRange && (
            <input
              ref={input2Ref}
              type="range"
              min={min}
              max={max}
              step={step}
              value={internalValue2}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setInternalValue2(newValue);
                if (onChange2) onChange2(newValue);
              }}
              onKeyDown={handleKey2Down}
              disabled={_disabled}
              className="sr-only"
              aria-hidden="true"
            />
          )}

          {/* Wertanzeige (wenn nicht als Tooltip) */}
          {valuePosition !== 'tooltip' && renderValue()}

          {/* Track */}
          <div
            ref={trackRef}
            className={`
            relative
            ${isVertical || orientation === 'vertical' ? sizeClasses[_size].trackVertical : sizeClasses[_size].track}
            ${isVertical || orientation === 'vertical' ? 'h-full' : 'w-full'}
            ${trackShapeClasses[trackShape]}
            ${styleClasses[style].track || variantClasses[variant].track}
            ${shadow ? 'shadow-inner' : ''}
            ${transparent ? 'bg-opacity-50 dark:bg-opacity-50' : ''}
            ${trackClassName}
          `}
            style={trackStyles}
            onClick={handleTrackClick}
          >
            {/* Hervorgehobene Bereiche */}
            {generateHighlightedRanges()}

            {/* Gefüllter Track */}
            <div
              className={`
              absolute
              ${isVertical || orientation === 'vertical' ? 'w-full left-0' : 'h-full top-0'}
              ${trackShapeClasses[trackShape]}
              ${styleClasses[style].filledTrack || variantClasses[variant].filledTrack}
              ${filledTrackClassName}
            `}
              style={filledTrackStyles}
            />

            {/* Markierungen */}
            {generateMarks()}

            {/* Skala */}
            {generateScale()}

            {/* Thumb 1 */}
            <div
              ref={thumbRef}
              className={`
              absolute
              ${sizeClasses[_size].thumb}
              ${thumbShapeClasses[thumbShape]}
              ${styleClasses[style].thumb || variantClasses[variant].thumb}
              ${shadow ? 'shadow-md' : ''}
              transform -translate-x-1/2 -translate-y-1/2
              ${_disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
              ${thumbClassName}
            `}
              style={thumb1Styles}
              onMouseDown={handleThumbMouseDown}
              onTouchStart={handleThumbMouseDown as any}
              tabIndex={_disabled ? -1 : 0}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={internalValue}
              aria-orientation={
                isVertical || orientation === 'vertical' ? 'vertical' : 'horizontal'
              }
            >
              {thumbIcon}
            </div>

            {/* Thumb 2 (nur für Range-Slider) */}
            {isRange && (
              <div
                ref={thumb2Ref}
                className={`
                absolute
                ${sizeClasses[_size].thumb}
                ${thumbShapeClasses[thumbShape]}
                ${styleClasses[style].thumb || variantClasses[variant].thumb}
                ${shadow ? 'shadow-md' : ''}
                transform -translate-x-1/2 -translate-y-1/2
                ${_disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
                ${thumbClassName}
              `}
                style={thumb2Styles}
                onMouseDown={handleThumb2MouseDown}
                onTouchStart={handleThumb2MouseDown as any}
                tabIndex={_disabled ? -1 : 0}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={internalValue2}
                aria-orientation={
                  isVertical || orientation === 'vertical' ? 'vertical' : 'horizontal'
                }
              >
                {thumbIcon}
              </div>
            )}
          </div>

          {/* Tooltips */}
          {renderTooltip()}
          {renderTooltip2()}

          {/* Indikatoren */}
          {renderIndicators()}
        </div>
      );
    };

    // Rendere die gesamte Komponente
    return (
      <div className={`${containerClassName} ${className}`}>
        {renderDescription()}
        {renderLabel()}
        {renderSlider()}
        {renderHelperText()}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
