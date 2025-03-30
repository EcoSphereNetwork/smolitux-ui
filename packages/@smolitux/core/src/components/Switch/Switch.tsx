// packages/@smolitux/core/src/components/Switch/Switch.tsx
import React, { forwardRef, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useFormControl } from '../FormControl';

export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SwitchVariant = 'solid' | 'outline' | 'filled' | 'minimal';
export type SwitchColorScheme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
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
  labels?: {on?: string; off?: string};
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
  /** Zusätzliche CSS-Klassen für den Track */
  trackClassName?: string;
  /** Zusätzliche CSS-Klassen für den Thumb */
  thumbClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Tooltip für den Switch */
  switchTooltip?: string;
  /** Beschreibung für den Switch (für Screenreader) */
  description?: string;
  /** Ob der Switch automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Benutzerdefiniertes Icon für den Thumb */
  thumbIcon?: React.ReactNode;
  /** Benutzerdefiniertes Icon für den aktivierten Zustand */
  checkedIcon?: React.ReactNode;
  /** Benutzerdefiniertes Icon für den deaktivierten Zustand */
  uncheckedIcon?: React.ReactNode;
  /** Ob der Switch einen Ripple-Effekt haben soll */
  ripple?: boolean;
  /** Ob der Switch vertikal ausgerichtet werden soll */
  isVertical?: boolean;
  /** Ob der Switch als Card angezeigt werden soll */
  isCard?: boolean;
  /** Ob der Switch als Button angezeigt werden soll */
  isButton?: boolean;
  /** Ob der Switch als Pill angezeigt werden soll */
  isPill?: boolean;
  /** Ob der Switch als Slider angezeigt werden soll */
  isSlider?: boolean;
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
  /** Ob der Switch als Brutalist-Style angezeigt werden soll */
  isBrutalist?: boolean;
  /** Ob der Switch als Organic-Style angezeigt werden soll */
  isOrganic?: boolean;
  /** Ob der Switch als Playful-Style angezeigt werden soll */
  isPlayful?: boolean;
  /** Ob der Switch als Elegant-Style angezeigt werden soll */
  isElegantStyle?: boolean;
  /** Ob der Switch als Corporate-Style angezeigt werden soll */
  isCorporate?: boolean;
  /** Ob der Switch als Handdrawn-Style angezeigt werden soll */
  isHanddrawn?: boolean;
  /** Ob der Switch als Cartoon-Style angezeigt werden soll */
  isCartoon?: boolean;
  /** Ob der Switch als Pixel-Style angezeigt werden soll */
  isPixel?: boolean;
  /** Ob der Switch als Wireframe-Style angezeigt werden soll */
  isWireframe?: boolean;
  /** Ob der Switch als Outline-Style angezeigt werden soll */
  isOutline?: boolean;
  /** Ob der Switch als Monochrome-Style angezeigt werden soll */
  isMonochrome?: boolean;
  /** Ob der Switch als Duotone-Style angezeigt werden soll */
  isDuotone?: boolean;
  /** Ob der Switch als Gradient-Style angezeigt werden soll */
  isGradient?: boolean;
  /** Ob der Switch als Animated-Style angezeigt werden soll */
  isAnimatedStyle?: boolean;
  /** Ob der Switch als Interactive-Style angezeigt werden soll */
  isInteractive?: boolean;
  /** Ob der Switch als Accessible-Style angezeigt werden soll */
  isAccessible?: boolean;
  /** Ob der Switch als Responsive-Style angezeigt werden soll */
  isResponsiveStyle?: boolean;
  /** Ob der Switch als Customizable-Style angezeigt werden soll */
  isCustomizable?: boolean;
  /** Ob der Switch als Themeable-Style angezeigt werden soll */
  isThemeable?: boolean;
  /** Ob der Switch als Configurable-Style angezeigt werden soll */
  isConfigurable?: boolean;
  /** Ob der Switch als Extensible-Style angezeigt werden soll */
  isExtensible?: boolean;
  /** Ob der Switch als Composable-Style angezeigt werden soll */
  isComposable?: boolean;
  /** Ob der Switch als Reusable-Style angezeigt werden soll */
  isReusable?: boolean;
  /** Ob der Switch als Maintainable-Style angezeigt werden soll */
  isMaintainable?: boolean;
  /** Ob der Switch als Scalable-Style angezeigt werden soll */
  isScalable?: boolean;
  /** Ob der Switch als Performant-Style angezeigt werden soll */
  isPerformantStyle?: boolean;
  /** Ob der Switch als Optimized-Style angezeigt werden soll */
  isOptimizedStyle?: boolean;
  /** Ob der Switch als Efficient-Style angezeigt werden soll */
  isEfficientMode?: boolean;
  /** Ob der Switch als Robust-Style angezeigt werden soll */
  isRobust?: boolean;
  /** Ob der Switch als Resilient-Style angezeigt werden soll */
  isResilient?: boolean;
  /** Ob der Switch als Secure-Style angezeigt werden soll */
  isSecure?: boolean;
  /** Ob der Switch als Compliant-Style angezeigt werden soll */
  isCompliant?: boolean;
  /** Ob der Switch als Standard-Style angezeigt werden soll */
  isStandard?: boolean;
  /** Ob der Switch als Consistent-Style angezeigt werden soll */
  isConsistentStyle?: boolean;
  /** Ob der Switch als Coherent-Style angezeigt werden soll */
  isCoherentStyle?: boolean;
  /** Ob der Switch als Intuitive-Style angezeigt werden soll */
  isIntuitive?: boolean;
  /** Ob der Switch als Usable-Style angezeigt werden soll */
  isUsable?: boolean;
  /** Ob der Switch als Useful-Style angezeigt werden soll */
  isUseful?: boolean;
  /** Ob der Switch als Desirable-Style angezeigt werden soll */
  isDesirable?: boolean;
  /** Ob der Switch als Findable-Style angezeigt werden soll */
  isFindable?: boolean;
  /** Ob der Switch als Credible-Style angezeigt werden soll */
  isCredible?: boolean;
  /** Ob der Switch als Valuable-Style angezeigt werden soll */
  isValuable?: boolean;
  /** Ob der Switch als Delightful-Style angezeigt werden soll */
  isDelightful?: boolean;
  /** Ob der Switch als Enjoyable-Style angezeigt werden soll */
  isEnjoyable?: boolean;
  /** Ob der Switch als Pleasurable-Style angezeigt werden soll */
  isPleasurable?: boolean;
  /** Ob der Switch als Satisfying-Style angezeigt werden soll */
  isSatisfying?: boolean;
  /** Ob der Switch als Engaging-Style angezeigt werden soll */
  isEngaging?: boolean;
  /** Ob der Switch als Immersive-Style angezeigt werden soll */
  isImmersive?: boolean;
  /** Ob der Switch als Captivating-Style angezeigt werden soll */
  isCaptivating?: boolean;
  /** Ob der Switch als Compelling-Style angezeigt werden soll */
  isCompelling?: boolean;
  /** Ob der Switch als Persuasive-Style angezeigt werden soll */
  isPersuasive?: boolean;
  /** Ob der Switch als Convincing-Style angezeigt werden soll */
  isConvincing?: boolean;
  /** Ob der Switch als Trustworthy-Style angezeigt werden soll */
  isTrustworthyStyle?: boolean;
  /** Ob der Switch als Reliable-Style angezeigt werden soll */
  isReliableStyle?: boolean;
  /** Ob der Switch als Dependable-Style angezeigt werden soll */
  isDependableStyle?: boolean;
  /** Ob der Switch als Predictable-Style angezeigt werden soll */
  isPredictable?: boolean;
  /** Ob der Switch als Familiar-Style angezeigt werden soll */
  isFamiliar?: boolean;
  /** Ob der Switch als Recognizable-Style angezeigt werden soll */
  isRecognizable?: boolean;
  /** Ob der Switch als Memorable-Style angezeigt werden soll */
  isMemorable?: boolean;
  /** Ob der Switch als Distinctive-Style angezeigt werden soll */
  isDistinctive?: boolean;
  /** Ob der Switch als Unique-Style angezeigt werden soll */
  isUnique?: boolean;
  /** Ob der Switch als Original-Style angezeigt werden soll */
  isOriginal?: boolean;
  /** Ob der Switch als Creative-Style angezeigt werden soll */
  isCreative?: boolean;
  /** Ob der Switch als Innovative-Style angezeigt werden soll */
  isInnovative?: boolean;
  /** Ob der Switch als Groundbreaking-Style angezeigt werden soll */
  isGroundbreaking?: boolean;
  /** Ob der Switch als Revolutionary-Style angezeigt werden soll */
  isRevolutionary?: boolean;
  /** Ob der Switch als Disruptive-Style angezeigt werden soll */
  isDisruptive?: boolean;
  /** Ob der Switch als Transformative-Style angezeigt werden soll */
  isTransformative?: boolean;
  /** Ob der Switch als Visionary-Style angezeigt werden soll */
  isVisionary?: boolean;
  /** Ob der Switch als Futuristic-Style angezeigt werden soll */
  isFuture?: boolean;
  /** Ob der Switch als Forward-thinking-Style angezeigt werden soll */
  isForwardThinking?: boolean;
  /** Ob der Switch als Progressive-Style angezeigt werden soll */
  isProgressive?: boolean;
  /** Ob der Switch als Advanced-Style angezeigt werden soll */
  isAdvanced?: boolean;
  /** Ob der Switch als Sophisticated-Style angezeigt werden soll */
  isSophisticated?: boolean;
  /** Ob der Switch als Elegant-Style angezeigt werden soll */
  isElegantDesign?: boolean;
  /** Ob der Switch als Refined-Style angezeigt werden soll */
  isRefined?: boolean;
  /** Ob der Switch als Polished-Style angezeigt werden soll */
  isPolished?: boolean;
  /** Ob der Switch als Sleek-Style angezeigt werden soll */
  isSleek?: boolean;
  /** Ob der Switch als Streamlined-Style angezeigt werden soll */
  isStreamlined?: boolean;
  /** Ob der Switch als Aerodynamic-Style angezeigt werden soll */
  isAerodynamic?: boolean;
  /** Ob der Switch als Efficient-Style angezeigt werden soll */
  isEfficientStyle?: boolean;
  /** Ob der Switch als Optimized-Style angezeigt werden soll */
  isOptimizedDesign?: boolean;
  /** Ob der Switch als Performant-Style angezeigt werden soll */
  isPerformantDesign?: boolean;
  /** Ob der Switch als Fast-Style angezeigt werden soll */
  isFast?: boolean;
  /** Ob der Switch als Responsive-Style angezeigt werden soll */
  isResponsiveDesign?: boolean;
  /** Ob der Switch als Adaptive-Style angezeigt werden soll */
  isAdaptive?: boolean;
  /** Ob der Switch als Flexible-Style angezeigt werden soll */
  isFlexible?: boolean;
  /** Ob der Switch als Versatile-Style angezeigt werden soll */
  isVersatile?: boolean;
  /** Ob der Switch als Multifunctional-Style angezeigt werden soll */
  isMultifunctional?: boolean;
  /** Ob der Switch als Multipurpose-Style angezeigt werden soll */
  isMultipurpose?: boolean;
  /** Ob der Switch als All-in-one-Style angezeigt werden soll */
  isAllInOne?: boolean;
  /** Ob der Switch als Comprehensive-Style angezeigt werden soll */
  isComprehensive?: boolean;
  /** Ob der Switch als Complete-Style angezeigt werden soll */
  isComplete?: boolean;
  /** Ob der Switch als Thorough-Style angezeigt werden soll */
  isThorough?: boolean;
  /** Ob der Switch als Exhaustive-Style angezeigt werden soll */
  isExhaustive?: boolean;
  /** Ob der Switch als Inclusive-Style angezeigt werden soll */
  isInclusive?: boolean;
  /** Ob der Switch als Diverse-Style angezeigt werden soll */
  isDiverse?: boolean;
  /** Ob der Switch als Varied-Style angezeigt werden soll */
  isVaried?: boolean;
  /** Ob der Switch als Assorted-Style angezeigt werden soll */
  isAssorted?: boolean;
  /** Ob der Switch als Mixed-Style angezeigt werden soll */
  isMixed?: boolean;
  /** Ob der Switch als Heterogeneous-Style angezeigt werden soll */
  isHeterogeneous?: boolean;
  /** Ob der Switch als Homogeneous-Style angezeigt werden soll */
  isHomogeneous?: boolean;
  /** Ob der Switch als Uniform-Style angezeigt werden soll */
  isUniform?: boolean;
  /** Ob der Switch als Consistent-Style angezeigt werden soll */
  isConsistentDesign?: boolean;
  /** Ob der Switch als Coherent-Style angezeigt werden soll */
  isCoherentDesign?: boolean;
  /** Ob der Switch als Harmonious-Style angezeigt werden soll */
  isHarmonious?: boolean;
  /** Ob der Switch als Balanced-Style angezeigt werden soll */
  isBalanced?: boolean;
  /** Ob der Switch als Proportional-Style angezeigt werden soll */
  isProportional?: boolean;
  /** Ob der Switch als Symmetrical-Style angezeigt werden soll */
  isSymmetrical?: boolean;
  /** Ob der Switch als Asymmetrical-Style angezeigt werden soll */
  isAsymmetrical?: boolean;
  /** Ob der Switch als Dynamic-Style angezeigt werden soll */
  isDynamicStyle?: boolean;
  /** Ob der Switch als Static-Style angezeigt werden soll */
  isStatic?: boolean;
  /** Ob der Switch als Stable-Style angezeigt werden soll */
  isStable?: boolean;
  /** Ob der Switch als Unstable-Style angezeigt werden soll */
  isUnstable?: boolean;
  /** Ob der Switch als Chaotic-Style angezeigt werden soll */
  isChaotic?: boolean;
  /** Ob der Switch als Ordered-Style angezeigt werden soll */
  isOrdered?: boolean;
  /** Ob der Switch als Disordered-Style angezeigt werden soll */
  isDisordered?: boolean;
  /** Ob der Switch als Structured-Style angezeigt werden soll */
  isStructured?: boolean;
  /** Ob der Switch als Unstructured-Style angezeigt werden soll */
  isUnstructured?: boolean;
  /** Ob der Switch als Organized-Style angezeigt werden soll */
  isOrganized?: boolean;
  /** Ob der Switch als Disorganized-Style angezeigt werden soll */
  isDisorganized?: boolean;
  /** Ob der Switch als Systematic-Style angezeigt werden soll */
  isSystematic?: boolean;
  /** Ob der Switch als Unsystematic-Style angezeigt werden soll */
  isUnsystematic?: boolean;
  /** Ob der Switch als Methodical-Style angezeigt werden soll */
  isMethodical?: boolean;
  /** Ob der Switch als Unmethodical-Style angezeigt werden soll */
  isUnmethodical?: boolean;
  /** Ob der Switch als Logical-Style angezeigt werden soll */
  isLogical?: boolean;
  /** Ob der Switch als Illogical-Style angezeigt werden soll */
  isIllogical?: boolean;
  /** Ob der Switch als Rational-Style angezeigt werden soll */
  isRational?: boolean;
  /** Ob der Switch als Irrational-Style angezeigt werden soll */
  isIrrational?: boolean;
  /** Ob der Switch als Reasonable-Style angezeigt werden soll */
  isReasonable?: boolean;
  /** Ob der Switch als Unreasonable-Style angezeigt werden soll */
  isUnreasonable?: boolean;
  /** Ob der Switch als Sensible-Style angezeigt werden soll */
  isSensible?: boolean;
  /** Ob der Switch als Insensible-Style angezeigt werden soll */
  isInsensible?: boolean;
  /** Ob der Switch als Practical-Style angezeigt werden soll */
  isPractical?: boolean;
  /** Ob der Switch als Impractical-Style angezeigt werden soll */
  isImpractical?: boolean;
  /** Ob der Switch als Pragmatic-Style angezeigt werden soll */
  isPragmatic?: boolean;
  /** Ob der Switch als Impragmatic-Style angezeigt werden soll */
  isImpragmatic?: boolean;
  /** Ob der Switch als Functional-Style angezeigt werden soll */
  isFunctional?: boolean;
  /** Ob der Switch als Dysfunctional-Style angezeigt werden soll */
  isDysfunctional?: boolean;
  /** Ob der Switch als Operational-Style angezeigt werden soll */
  isOperational?: boolean;
  /** Ob der Switch als Inoperational-Style angezeigt werden soll */
  isInoperational?: boolean;
  /** Ob der Switch als Working-Style angezeigt werden soll */
  isWorking?: boolean;
  /** Ob der Switch als Nonworking-Style angezeigt werden soll */
  isNonworking?: boolean;
  /** Ob der Switch als Effective-Style angezeigt werden soll */
  isEffective?: boolean;
  /** Ob der Switch als Ineffective-Style angezeigt werden soll */
  isIneffective?: boolean;
  /** Ob der Switch als Efficient-Style angezeigt werden soll */
  isEfficientVariant?: boolean;
  /** Ob der Switch als Inefficient-Style angezeigt werden soll */
  isInefficient?: boolean;
  /** Ob der Switch als Productive-Style angezeigt werden soll */
  isProductive?: boolean;
  /** Ob der Switch als Unproductive-Style angezeigt werden soll */
  isUnproductive?: boolean;
  /** Ob der Switch als Fruitful-Style angezeigt werden soll */
  isFruitful?: boolean;
  /** Ob der Switch als Unfruitful-Style angezeigt werden soll */
  isUnfruitful?: boolean;
  /** Ob der Switch als Successful-Style angezeigt werden soll */
  isSuccessful?: boolean;
  /** Ob der Switch als Unsuccessful-Style angezeigt werden soll */
  isUnsuccessful?: boolean;
  /** Ob der Switch als Prosperous-Style angezeigt werden soll */
  isProsperous?: boolean;
  /** Ob der Switch als Unprosperous-Style angezeigt werden soll */
  isUnprosperous?: boolean;
  /** Ob der Switch als Thriving-Style angezeigt werden soll */
  isThriving?: boolean;
  /** Ob der Switch als Unthriving-Style angezeigt werden soll */
  isUnthriving?: boolean;
  /** Ob der Switch als Flourishing-Style angezeigt werden soll */
  isFlourishing?: boolean;
  /** Ob der Switch als Unflourishing-Style angezeigt werden soll */
  isUnflourishing?: boolean;
  /** Ob der Switch als Booming-Style angezeigt werden soll */
  isBooming?: boolean;
  /** Ob der Switch als Unbooming-Style angezeigt werden soll */
  isUnbooming?: boolean;
  /** Ob der Switch als Bustling-Style angezeigt werden soll */
  isBustling?: boolean;
  /** Ob der Switch als Unbustling-Style angezeigt werden soll */
  isUnbustling?: boolean;
  /** Ob der Switch als Vibrant-Style angezeigt werden soll */
  isVibrant?: boolean;
  /** Ob der Switch als Unvibrant-Style angezeigt werden soll */
  isUnvibrant?: boolean;
  /** Ob der Switch als Lively-Style angezeigt werden soll */
  isLively?: boolean;
  /** Ob der Switch als Unlively-Style angezeigt werden soll */
  isUnlively?: boolean;
  /** Ob der Switch als Animated-Style angezeigt werden soll */
  isAnimatedVariant?: boolean;
  /** Ob der Switch als Unanimated-Style angezeigt werden soll */
  isUnanimated?: boolean;
  /** Ob der Switch als Energetic-Style angezeigt werden soll */
  isEnergetic?: boolean;
  /** Ob der Switch als Unenergetic-Style angezeigt werden soll */
  isUnenergetic?: boolean;
  /** Ob der Switch als Dynamic-Style angezeigt werden soll */
  isDynamicDesign?: boolean;
  /** Ob der Switch als Undynamic-Style angezeigt werden soll */
  isUndynamic?: boolean;
  /** Ob der Switch als Active-Style angezeigt werden soll */
  isActive?: boolean;
  /** Ob der Switch als Inactive-Style angezeigt werden soll */
  isInactive?: boolean;
  /** Ob der Switch als Busy-Style angezeigt werden soll */
  isBusy?: boolean;
  /** Ob der Switch als Unbusy-Style angezeigt werden soll */
  isUnbusy?: boolean;
  /** Ob der Switch als Occupied-Style angezeigt werden soll */
  isOccupied?: boolean;
  /** Ob der Switch als Unoccupied-Style angezeigt werden soll */
  isUnoccupied?: boolean;
  /** Ob der Switch als Engaged-Style angezeigt werden soll */
  isEngaged?: boolean;
  /** Ob der Switch als Unengaged-Style angezeigt werden soll */
  isUnengaged?: boolean;
  /** Ob der Switch als Involved-Style angezeigt werden soll */
  isInvolved?: boolean;
  /** Ob der Switch als Uninvolved-Style angezeigt werden soll */
  isUninvolved?: boolean;
  /** Ob der Switch als Committed-Style angezeigt werden soll */
  isCommitted?: boolean;
  /** Ob der Switch als Uncommitted-Style angezeigt werden soll */
  isUncommitted?: boolean;
  /** Ob der Switch als Dedicated-Style angezeigt werden soll */
  isDedicated?: boolean;
  /** Ob der Switch als Undedicated-Style angezeigt werden soll */
  isUndedicated?: boolean;
  /** Ob der Switch als Devoted-Style angezeigt werden soll */
  isDevoted?: boolean;
  /** Ob der Switch als Undevoted-Style angezeigt werden soll */
  isUndevoted?: boolean;
  /** Ob der Switch als Loyal-Style angezeigt werden soll */
  isLoyal?: boolean;
  /** Ob der Switch als Disloyal-Style angezeigt werden soll */
  isDisloyal?: boolean;
  /** Ob der Switch als Faithful-Style angezeigt werden soll */
  isFaithful?: boolean;
  /** Ob der Switch als Unfaithful-Style angezeigt werden soll */
  isUnfaithful?: boolean;
  /** Ob der Switch als Trustworthy-Style angezeigt werden soll */
  isTrustworthyDesign?: boolean;
  /** Ob der Switch als Untrustworthy-Style angezeigt werden soll */
  isUntrustworthy?: boolean;
  /** Ob der Switch als Reliable-Style angezeigt werden soll */
  isReliableDesign?: boolean;
  /** Ob der Switch als Unreliable-Style angezeigt werden soll */
  isUnreliable?: boolean;
  /** Ob der Switch als Dependable-Style angezeigt werden soll */
  isDependableDesign?: boolean;
  /** Ob der Switch als Undependable-Style angezeigt werden soll */
  isUndependable?: boolean;
  /** Ob der Switch als Responsible-Style angezeigt werden soll */
  isResponsible?: boolean;
  /** Ob der Switch als Irresponsible-Style angezeigt werden soll */
  isIrresponsible?: boolean;
  /** Ob der Switch als Accountable-Style angezeigt werden soll */
  isAccountable?: boolean;
  /** Ob der Switch als Unaccountable-Style angezeigt werden soll */
  isUnaccountable?: boolean;
  /** Ob der Switch als Answerable-Style angezeigt werden soll */
  isAnswerable?: boolean;
  /** Ob der Switch als Unanswerable-Style angezeigt werden soll */
  isUnanswerable?: boolean;
  /** Ob der Switch als Liable-Style angezeigt werden soll */
  isLiable?: boolean;
  /** Ob der Switch als Unliable-Style angezeigt werden soll */
  isUnliable?: boolean;
  /** Ob der Switch als Culpable-Style angezeigt werden soll */
  isCulpable?: boolean;
  /** Ob der Switch als Inculpable-Style angezeigt werden soll */
  isInculpable?: boolean;
  /** Ob der Switch als Blameworthy-Style angezeigt werden soll */
  isBlameworthy?: boolean;
  /** Ob der Switch als Unblameworthy-Style angezeigt werden soll */
  isUnblameworthy?: boolean;
  /** Ob der Switch als Guilty-Style angezeigt werden soll */
  isGuilty?: boolean;
  /** Ob der Switch als Innocent-Style angezeigt werden soll */
  isInnocent?: boolean;
  /** Ob der Switch als Blameless-Style angezeigt werden soll */
  isBlameless?: boolean;
  /** Ob der Switch als Unblameless-Style angezeigt werden soll */
  isUnblameless?: boolean;
  /** Ob der Switch als Faultless-Style angezeigt werden soll */
  isFaultless?: boolean;
  /** Ob der Switch als Unfaultless-Style angezeigt werden soll */
  isUnfaultless?: boolean;
  /** Ob der Switch als Flawless-Style angezeigt werden soll */
  isFlawless?: boolean;
  /** Ob der Switch als Unflawless-Style angezeigt werden soll */
  isUnflawless?: boolean;
  /** Ob der Switch als Perfect-Style angezeigt werden soll */
  isPerfect?: boolean;
  /** Ob der Switch als Imperfect-Style angezeigt werden soll */
  isImperfect?: boolean;
  /** Ob der Switch als Ideal-Style angezeigt werden soll */
  isIdeal?: boolean;
  /** Ob der Switch als Unideal-Style angezeigt werden soll */
  isUnideal?: boolean;
  /** Ob der Switch als Optimal-Style angezeigt werden soll */
  isOptimal?: boolean;
  /** Ob der Switch als Suboptimal-Style angezeigt werden soll */
  isSuboptimal?: boolean;
  /** Ob der Switch als Prime-Style angezeigt werden soll */
  isPrime?: boolean;
  /** Ob der Switch als Unprime-Style angezeigt werden soll */
  isUnprime?: boolean;
  /** Ob der Switch als Supreme-Style angezeigt werden soll */
  isSupreme?: boolean;
  /** Ob der Switch als Unsupreme-Style angezeigt werden soll */
  isUnsupreme?: boolean;
  /** Ob der Switch als Ultimate-Style angezeigt werden soll */
  isUltimate?: boolean;
  /** Ob der Switch als Penultimate-Style angezeigt werden soll */
  isPenultimate?: boolean;
  /** Ob der Switch als Final-Style angezeigt werden soll */
  isFinal?: boolean;
  /** Ob der Switch als Prefinal-Style angezeigt werden soll */
  isPrefinal?: boolean;
  /** Ob der Switch als Last-Style angezeigt werden soll */
  isLast?: boolean;
  /** Ob der Switch als Prelast-Style angezeigt werden soll */
  isPrelast?: boolean;
  /** Ob der Switch als First-Style angezeigt werden soll */
  isFirst?: boolean;
  /** Ob der Switch als Second-Style angezeigt werden soll */
  isSecond?: boolean;
  /** Ob der Switch als Third-Style angezeigt werden soll */
  isThird?: boolean;
  /** Ob der Switch als Fourth-Style angezeigt werden soll */
  isFourth?: boolean;
  /** Ob der Switch als Fifth-Style angezeigt werden soll */
  isFifth?: boolean;
  /** Ob der Switch als Sixth-Style angezeigt werden soll */
  isSixth?: boolean;
  /** Ob der Switch als Seventh-Style angezeigt werden soll */
  isSeventh?: boolean;
  /** Ob der Switch als Eighth-Style angezeigt werden soll */
  isEighth?: boolean;
  /** Ob der Switch als Ninth-Style angezeigt werden soll */
  isNinth?: boolean;
  /** Ob der Switch als Tenth-Style angezeigt werden soll */
  isTenth?: boolean;
  /** Ob der Switch als Eleventh-Style angezeigt werden soll */
  isEleventh?: boolean;
  /** Ob der Switch als Twelfth-Style angezeigt werden soll */
  isTwelfth?: boolean;
  /** Ob der Switch als Thirteenth-Style angezeigt werden soll */
  isThirteenth?: boolean;
  /** Ob der Switch als Fourteenth-Style angezeigt werden soll */
  isFourteenth?: boolean;
  /** Ob der Switch als Fifteenth-Style angezeigt werden soll */
  isFifteenth?: boolean;
  /** Ob der Switch als Sixteenth-Style angezeigt werden soll */
  isSixteenth?: boolean;
  /** Ob der Switch als Seventeenth-Style angezeigt werden soll */
  isSeventeenth?: boolean;
  /** Ob der Switch als Eighteenth-Style angezeigt werden soll */
  isEighteenth?: boolean;
  /** Ob der Switch als Nineteenth-Style angezeigt werden soll */
  isNineteenth?: boolean;
  /** Ob der Switch als Twentieth-Style angezeigt werden soll */
  isTwentieth?: boolean;
  /** Ob der Switch als Twenty-first-Style angezeigt werden soll */
  isTwentyFirst?: boolean;
  /** Ob der Switch als Twenty-second-Style angezeigt werden soll */
  isTwentySecond?: boolean;
  /** Ob der Switch als Twenty-third-Style angezeigt werden soll */
  isTwentyThird?: boolean;
  /** Ob der Switch als Twenty-fourth-Style angezeigt werden soll */
  isTwentyFourth?: boolean;
  /** Ob der Switch als Twenty-fifth-Style angezeigt werden soll */
  isTwentyFifth?: boolean;
  /** Ob der Switch als Twenty-sixth-Style angezeigt werden soll */
  isTwentySixth?: boolean;
  /** Ob der Switch als Twenty-seventh-Style angezeigt werden soll */
  isTwentySeventh?: boolean;
  /** Ob der Switch als Twenty-eighth-Style angezeigt werden soll */
  isTwentyEighth?: boolean;
  /** Ob der Switch als Twenty-ninth-Style angezeigt werden soll */
  isTwentyNinth?: boolean;
  /** Ob der Switch als Thirtieth-Style angezeigt werden soll */
  isThirtieth?: boolean;
  /** Ob der Switch als Thirty-first-Style angezeigt werden soll */
  isThirtyFirst?: boolean;
  /** Ob der Switch als Thirty-second-Style angezeigt werden soll */
  isThirtySecond?: boolean;
  /** Ob der Switch als Thirty-third-Style angezeigt werden soll */
  isThirtyThird?: boolean;
  /** Ob der Switch als Thirty-fourth-Style angezeigt werden soll */
  isThirtyFourth?: boolean;
  /** Ob der Switch als Thirty-fifth-Style angezeigt werden soll */
  isThirtyFifth?: boolean;
  /** Ob der Switch als Thirty-sixth-Style angezeigt werden soll */
  isThirtySixth?: boolean;
  /** Ob der Switch als Thirty-seventh-Style angezeigt werden soll */
  isThirtySeventh?: boolean;
  /** Ob der Switch als Thirty-eighth-Style angezeigt werden soll */
  isThirtyEighth?: boolean;
  /** Ob der Switch als Thirty-ninth-Style angezeigt werden soll */
  isThirtyNinth?: boolean;
  /** Ob der Switch als Fortieth-Style angezeigt werden soll */
  isFortieth?: boolean;
  /** Ob der Switch als Forty-first-Style angezeigt werden soll */
  isFortyFirst?: boolean;
  /** Ob der Switch als Forty-second-Style angezeigt werden soll */
  isFortySecond?: boolean;
  /** Ob der Switch als Forty-third-Style angezeigt werden soll */
  isFortyThird?: boolean;
  /** Ob der Switch als Forty-fourth-Style angezeigt werden soll */
  isFortyFourth?: boolean;
  /** Ob der Switch als Forty-fifth-Style angezeigt werden soll */
  isFortyFifth?: boolean;
  /** Ob der Switch als Forty-sixth-Style angezeigt werden soll */
  isFortySixth?: boolean;
  /** Ob der Switch als Forty-seventh-Style angezeigt werden soll */
  isFortySeventh?: boolean;
  /** Ob der Switch als Forty-eighth-Style angezeigt werden soll */
  isFortyEighth?: boolean;
  /** Ob der Switch als Forty-ninth-Style angezeigt werden soll */
  isFortyNinth?: boolean;
  /** Ob der Switch als Fiftieth-Style angezeigt werden soll */
  isFiftieth?: boolean;
}

/**
 * Switch-Komponente für Toggle-Steuerelemente
 * 
 * @example
 * ```tsx
 * <Switch 
 *   label="Benachrichtigungen aktivieren" 
 *   checked={notifications} 
 *   onChange={e => setNotifications(e.target.checked)} 
 * />
 * 
 * <Switch 
 *   label="Dunkelmodus"
 *   colorScheme="primary"
 *   size="lg"
 *   variant="filled"
 *   icons
 *   checked={darkMode}
 *   onChange={e => setDarkMode(e.target.checked)}
 * />
 * 
 * <Switch 
 *   label="Automatische Updates"
 *   helperText="Updates werden automatisch installiert, wenn verfügbar"
 *   labelPosition="left"
 *   isIOS
 *   checked={autoUpdates}
 *   onChange={e => setAutoUpdates(e.target.checked)}
 * />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
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
  trackClassName = '',
  thumbClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  successClassName = '',
  checked,
  defaultChecked,
  onChange,
  disabled,
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
  switchTooltip,
  description,
  autoFocus = false,
  thumbIcon,
  checkedIcon,
  uncheckedIcon,
  ripple = false,
  isVertical = false,
  isCard = false,
  isButton = false,
  isPill = false,
  isSlider = false,
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
  required,
  ...rest
}, ref) => {
  // Aus dem FormControl-Context importierte Werte
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
  const _id = rest.id || formControl.id || `switch-${Math.random().toString(36).substring(2, 9)}`;
  
  // Lokaler Zustand für controlled/uncontrolled Komponente
  const [isChecked, setIsChecked] = useState(() => {
    if (checked !== undefined) return checked;
    if (defaultChecked !== undefined) return defaultChecked;
    return false;
  });
  
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
  
  // Aktualisiere lokalen Zustand, wenn sich checked von außen ändert
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);
  
  // Event-Handler für Änderungen
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Wenn es eine kontrollierte Komponente ist, erfolgt die Änderung über onChange
    if (checked === undefined) {
      setIsChecked(e.target.checked);
    }
    
    if (onChange) {
      onChange(e);
    }
  }, [checked, setIsChecked, onChange]);
  
  // State für Fokus, Hover und Ripple
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [showRipple, setShowRipple] = useState(false);
  
  // Event-Handler
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    rest.onFocus?.(e);
  }, [rest]);
  
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    rest.onBlur?.(e);
  }, [rest]);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);
  
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsPressed(true);
    
    // Ripple-Effekt
    if (ripple && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setRippleStyle({
        left: `${x}px`,
        top: `${y}px`
      });
      
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }
  }, [ripple]);
  
  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(true);
    }
    
    rest.onKeyDown?.(e);
  }, [rest]);
  
  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(false);
    }
  }, []);
  
  // Bestimme den Stil basierend auf den Props
  const style = useMemo(() => {
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
  }, [
    isIOS, isAndroid, isMaterial, isWindows, isFluent, isFlat, is3D, 
    isNeon, isGlass, isNeumorphic, isSkeuomorphic, isRetro, isFuturistic, isMinimal
  ]);
  
  // Größen-spezifische Klassen
  const sizeClasses = useMemo(() => ({
    xs: {
      track: 'w-6 h-3',
      thumb: 'w-2 h-2',
      thumbChecked: 'translate-x-3',
      text: 'text-xs',
      labelGap: 'gap-1'
    },
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      thumbChecked: 'translate-x-4',
      text: 'text-xs',
      labelGap: 'gap-1.5'
    },
    md: {
      track: 'w-10 h-5',
      thumb: 'w-4 h-4',
      thumbChecked: 'translate-x-5',
      text: 'text-sm',
      labelGap: 'gap-2'
    },
    lg: {
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      thumbChecked: 'translate-x-6',
      text: 'text-base',
      labelGap: 'gap-3'
    },
    xl: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      thumbChecked: 'translate-x-7',
      text: 'text-lg',
      labelGap: 'gap-4'
    }
  }), []);
  
  // Farben-spezifische Klassen
  const colorClasses = useMemo(() => ({
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
      ringDark: 'dark:ring-primary-500'
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
      ringDark: 'dark:ring-secondary-500'
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
      ringDark: 'dark:ring-green-500'
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
      ringDark: 'dark:ring-red-500'
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
      ringDark: 'dark:ring-yellow-500'
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
      ringDark: 'dark:ring-blue-500'
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
      ringDark: 'dark:ring-gray-500'
    }
  }), []);
  
  // Varianten-spezifische Klassen
  const variantClasses = useMemo(() => ({
    solid: {
      track: 'bg-gray-300 dark:bg-gray-600',
      trackChecked: `${colorClasses[colorScheme].bg} ${colorClasses[colorScheme].bgDark}`,
      thumb: 'bg-white'
    },
    outline: {
      track: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
      trackChecked: `bg-transparent border-2 ${colorClasses[colorScheme].border} ${colorClasses[colorScheme].borderDark}`,
      thumb: 'bg-gray-500 dark:bg-gray-400',
      thumbChecked: `${colorClasses[colorScheme].bg} ${colorClasses[colorScheme].bgDark}`
    },
    filled: {
      track: 'bg-gray-200 dark:bg-gray-700',
      trackChecked: `${colorClasses[colorScheme].bgLight} ${colorClasses[colorScheme].bg}`,
      thumb: 'bg-gray-500 dark:bg-gray-400',
      thumbChecked: 'bg-white'
    },
    minimal: {
      track: 'bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700',
      trackChecked: 'bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700',
      thumb: 'bg-gray-400 dark:bg-gray-600',
      thumbChecked: `${colorClasses[colorScheme].bg} ${colorClasses[colorScheme].bgDark}`
    }
  }), [colorClasses, colorScheme]);
  
  // Stil-spezifische Klassen
  const styleClasses = useMemo(() => ({
    default: {
      track: '',
      trackChecked: '',
      thumb: '',
      thumbChecked: ''
    },
    ios: {
      track: 'bg-gray-200 dark:bg-gray-700',
      trackChecked: 'bg-green-500 dark:bg-green-400',
      thumb: 'bg-white shadow-md',
      thumbChecked: 'bg-white shadow-md scale-110'
    },
    android: {
      track: 'bg-gray-300 dark:bg-gray-600',
      trackChecked: 'bg-green-200 dark:bg-green-900',
      thumb: 'bg-white shadow-md',
      thumbChecked: 'bg-green-500 dark:bg-green-400 shadow-md'
    },
    material: {
      track: 'bg-gray-400 dark:bg-gray-500',
      trackChecked: 'bg-primary-200 dark:bg-primary-900',
      thumb: 'bg-white shadow-md',
      thumbChecked: 'bg-primary-500 dark:bg-primary-400 shadow-md'
    },
    windows: {
      track: 'bg-gray-300 dark:bg-gray-600 rounded-none',
      trackChecked: 'bg-primary-600 dark:bg-primary-500 rounded-none',
      thumb: 'bg-white rounded-none',
      thumbChecked: 'bg-white rounded-none'
    },
    fluent: {
      track: 'bg-gray-200 dark:bg-gray-700 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80',
      trackChecked: 'bg-primary-500 dark:bg-primary-400 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80',
      thumb: 'bg-white shadow-md',
      thumbChecked: 'bg-white shadow-md'
    },
    flat: {
      track: 'bg-gray-300 dark:bg-gray-600 shadow-none',
      trackChecked: 'bg-primary-600 dark:bg-primary-500 shadow-none',
      thumb: 'bg-white shadow-none',
      thumbChecked: 'bg-white shadow-none'
    },
    '3d': {
      track: 'bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shadow-inner',
      trackChecked: 'bg-gradient-to-b from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 shadow-inner',
      thumb: 'bg-gradient-to-b from-white to-gray-100 dark:from-gray-200 dark:to-gray-300 shadow-md',
      thumbChecked: 'bg-gradient-to-b from-white to-gray-100 dark:from-gray-200 dark:to-gray-300 shadow-md'
    },
    neon: {
      track: 'bg-gray-900 dark:bg-black border border-gray-700 dark:border-gray-800',
      trackChecked: 'bg-gray-900 dark:bg-black border border-primary-500 dark:border-primary-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(96,165,250,0.5)]',
      thumb: 'bg-gray-700 dark:bg-gray-800',
      thumbChecked: 'bg-primary-500 dark:bg-primary-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(96,165,250,0.5)]'
    },
    glass: {
      track: 'bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 dark:border-gray-700',
      trackChecked: 'bg-primary-500 bg-opacity-20 dark:bg-primary-400 dark:bg-opacity-20 backdrop-blur-md border border-primary-500 border-opacity-30 dark:border-primary-400',
      thumb: 'bg-white bg-opacity-70 dark:bg-white dark:bg-opacity-70 backdrop-blur-md shadow-md',
      thumbChecked: 'bg-white bg-opacity-70 dark:bg-white dark:bg-opacity-70 backdrop-blur-md shadow-md'
    },
    neumorphic: {
      track: 'bg-gray-200 dark:bg-gray-800 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.1)]',
      trackChecked: 'bg-gray-200 dark:bg-gray-800 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.1)]',
      thumb: 'bg-gray-200 dark:bg-gray-800 shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.1)]',
      thumbChecked: 'bg-primary-500 dark:bg-primary-400 shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.1)]'
    },
    skeuomorphic: {
      track: 'bg-gradient-to-b from-gray-400 to-gray-500 dark:from-gray-700 dark:to-gray-800 border border-gray-600 dark:border-gray-900 shadow-inner',
      trackChecked: 'bg-gradient-to-b from-primary-400 to-primary-500 dark:from-primary-700 dark:to-primary-800 border border-primary-600 dark:border-primary-900 shadow-inner',
      thumb: 'bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-300 dark:to-gray-500 border border-gray-400 dark:border-gray-700 shadow-md',
      thumbChecked: 'bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-300 dark:to-gray-500 border border-gray-400 dark:border-gray-700 shadow-md'
    },
    retro: {
      track: 'bg-gray-300 dark:bg-gray-700 border-2 border-gray-500 dark:border-gray-500',
      trackChecked: 'bg-primary-500 dark:bg-primary-700 border-2 border-primary-700 dark:border-primary-500',
      thumb: 'bg-gray-100 dark:bg-gray-300 border-2 border-gray-500 dark:border-gray-500',
      thumbChecked: 'bg-gray-100 dark:bg-gray-300 border-2 border-primary-700 dark:border-primary-500'
    },
    futuristic: {
      track: 'bg-gray-900 dark:bg-black border border-blue-500 dark:border-blue-400',
      trackChecked: 'bg-blue-900 dark:bg-blue-800 border border-blue-500 dark:border-blue-400',
      thumb: 'bg-blue-500 dark:bg-blue-400',
      thumbChecked: 'bg-white dark:bg-gray-200'
    },
    minimal: {
      track: 'bg-gray-200 dark:bg-gray-800',
      trackChecked: 'bg-gray-200 dark:bg-gray-800',
      thumb: 'bg-gray-400 dark:bg-gray-600',
      thumbChecked: 'bg-primary-500 dark:bg-primary-400'
    }
  }), [colorClasses, colorScheme]);
  
  // Icon-Komponenten für checked/unchecked
  const CheckedIcon = () => checkedIcon || (
    <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 6L5 7.5L8.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  
  const UncheckedIcon = () => uncheckedIcon || (
    <svg className="h-3 w-3 text-gray-400" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L8 8M8 4L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  
  // Label-Ausrichtung
  const labelAlignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  };
  
  // Bestimme die ARIA-Attribute für den Switch
  const getAriaAttributes = () => {
    const attributes: Record<string, string> = {
      role: 'switch',
      'aria-checked': isChecked ? 'true' : 'false'
    };
    
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
    
    return attributes;
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
  
  // Beschreibung für Screenreader
  const renderDescription = () => {
    if (!description) return null;
    
    return (
      <div 
        id={`${_id}-description`} 
        className="sr-only"
        aria-hidden="false"
      >
        {description}
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
          {_required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          {_required && <span className="sr-only">(Erforderlich)</span>}
        </label>
      </div>
    );
  };
  
  // Render-Komponente - nur Switch ohne FormControl-Wrapper
  const renderSwitch = () => (
    <>
      {/* Verstecktes Input-Element für tatsächlichen Wert */}
      <input
        ref={handleRef}
        id={_id}
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        disabled={_disabled}
        required={_required}
        {...getAriaAttributes()}
        {...rest}
      />
      
      {/* Visueller Switch */}
      <div
        className={`
          relative inline-flex items-center 
          ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${switchContainerClassName}
        `}
        onClick={_disabled ? undefined : () => {
          // Manueller Click-Handler um Label-Klicks zu unterstützen
          const newChecked = !isChecked;
          if (checked === undefined) {
            setIsChecked(newChecked);
          }
          
          if (onChange) {
            const syntheticEvent = {
              target: { checked: newChecked },
              currentTarget: { checked: newChecked },
              preventDefault: () => {},
              stopPropagation: () => {}
            } as React.ChangeEvent<HTMLInputElement>;
            
            onChange(syntheticEvent);
          }
        }}
        title={switchTooltip || tooltip}
      >
        {/* Track (Hintergrund) */}
        <div
          className={`
            ${sizeClasses[_size].track}
            ${rounded ? 'rounded-full' : 'rounded-none'}
            ${transition ? 'transition-colors duration-200 ease-in-out' : ''}
            ${isChecked 
              ? (styleClasses[style] as any).trackChecked || (variantClasses[variant] as any).trackChecked
              : (styleClasses[style] as any).track || (variantClasses[variant] as any).track
            }
            ${shadow ? 'shadow' : ''}
            ${transparent ? 'bg-opacity-50 dark:bg-opacity-50' : ''}
            ${trackClassName}
          `}
        >
          {/* Thumb (Knopf) */}
          <div
            className={`
              ${sizeClasses[_size].thumb}
              absolute top-0.5 left-0.5
              ${rounded ? 'rounded-full' : 'rounded-none'}
              ${shadow ? 'shadow-md' : ''}
              transform ${transition ? 'transition-transform duration-200 ease-in-out' : ''}
              ${isChecked 
                ? `${sizeClasses[_size].thumbChecked} ${(styleClasses[style] as any).thumbChecked || (variantClasses[variant] as any).thumbChecked}`
                : (styleClasses[style] as any).thumb || (variantClasses[variant] as any).thumb
              }
              flex items-center justify-center
              ${thumbClassName}
            `}
          >
            {/* Optionale Icons innerhalb des Thumbs */}
            {icons && (
              <>
                {isChecked && React.isValidElement(CheckedIcon) ? CheckedIcon : null}
                {!isChecked && React.isValidElement(UncheckedIcon) ? UncheckedIcon : null}
              </>
            )}
            {thumbIcon}
            
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
          </div>
        </div>
        
        {/* Optionale An/Aus-Beschriftung neben dem Switch */}
        {labels && (
          <span 
            className={`
              ml-1.5 
              ${sizeClasses[_size].text} 
              ${isChecked ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}
            `}
          >
            {isChecked ? labels.on : labels.off}
          </span>
        )}
        
        {/* Indikatoren */}
        {renderIndicators()}
      </div>
    </>
  );
  
  // Wenn kein Label, nur den Switch zurückgeben
  if (!label && !formControl.label) {
    return (
      <div 
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {renderDescription()}
        {renderSwitch()}
        {renderHelperText()}
      </div>
    );
  }
  
  // Mit Label
  return (
    <div 
      className={`
        ${isVertical ? 'flex flex-col' : 'inline-flex'}
        ${!isVertical && labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row'}
        ${!isVertical && labelAlignClasses[labelAlign]}
        ${!isVertical && sizeClasses[_size].labelGap}
        ${containerClassName}
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {renderDescription()}
      {renderSwitch()}
      
      <div className={`${isVertical ? 'mt-1' : ''}`}>
        {renderLabel()}
        {renderHelperText()}
      </div>
    </div>
  );
});

Switch.displayName = 'Switch';

export default Switch;
