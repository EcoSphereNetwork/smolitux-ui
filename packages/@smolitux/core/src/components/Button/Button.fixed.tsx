import React, { memo, forwardRef, useState, useRef, useEffect } from 'react';
// import { useTheme } from '@smolitux/theme';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'solid' // Hinzugefügt für Kompatibilität
  | 'unstyled';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'square' | 'rounded' | 'pill';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Visuelle Variante des Buttons */
  variant?: ButtonVariant;
  /** Größe des Buttons */
  size?: ButtonSize;
  /** Form des Buttons */
  shape?: ButtonShape;
  /** Button auf volle Breite */
  fullWidth?: boolean;
  /** Icon vor dem Text */
  leftIcon?: React.ReactNode;
  /** Icon nach dem Text */
  rightIcon?: React.ReactNode;
  /** Loading-Zustand */
  loading?: boolean;
  /** Alias für loading (für Kompatibilität) */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ob der Button einen Schatten haben soll */
  shadow?: boolean;
  /** Ob der Button einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob der Button einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob der Button einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob der Button aktiv ist */
  active?: boolean;
  /** Ob der Button einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob der Button einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob der Button einen Tooltip haben soll */
  tooltip?: string;
  /** Ob der Button ein Icon-Button ist (nur Icon, kein Text) */
  isIconButton?: boolean;
  /** Ob der Button ein Submit-Button ist */
  isSubmit?: boolean;
  /** Ob der Button ein Reset-Button ist */
  isReset?: boolean;
  /** Ob der Button ein Link ist */
  isLink?: boolean;
  /** URL für Link-Buttons */
  href?: string;
  /** Target für Link-Buttons */
  target?: string;
  /** Rel für Link-Buttons */
  rel?: string;
  /** Ob der Button ein Download-Link ist */
  download?: boolean | string;
  /** Ob der Button ein externes Link ist */
  isExternal?: boolean;
  /** Ob der Button ein Dropdown-Trigger ist */
  isDropdownTrigger?: boolean;
  /** Ob der Button ein Toggle-Button ist */
  isToggle?: boolean;
  /** Ob der Button ein Toggle-Button ist und aktuell eingeschaltet ist */
  isToggleOn?: boolean;
  /** Ob der Button ein Ripple-Effekt haben soll */
  ripple?: boolean;
  /** Ob der Button einen benutzerdefinierten Loading-Text haben soll */
  loadingText?: string;
  /** Ob der Button einen benutzerdefinierten Loading-Spinner haben soll */
  loadingSpinner?: React.ReactNode;
  /** Ob der Button einen benutzerdefinierten Loading-Platzhalter haben soll */
  loadingPlaceholder?: React.ReactNode;
  /** Ob der Button einen benutzerdefinierten Erfolgs-Icon haben soll */
  successIcon?: React.ReactNode;
  /** Ob der Button einen benutzerdefinierten Fehler-Icon haben soll */
  errorIcon?: React.ReactNode;
  /** Ob der Button im Erfolgs-Zustand ist */
  isSuccess?: boolean;
  /** Ob der Button im Fehler-Zustand ist */
  isError?: boolean;
  /** Callback, wenn der Button erfolgreich ist */
  onSuccess?: () => void;
  /** Callback, wenn der Button einen Fehler hat */
  onError?: () => void;
  /** Callback, wenn der Button gedrückt wird */
  onPress?: () => void;
  /** Callback, wenn der Button losgelassen wird */
  onRelease?: () => void;
  /** Callback, wenn der Button gehalten wird */
  onHold?: () => void;
  /** Callback, wenn der Button fokussiert wird */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button den Fokus verliert */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button geklickt wird */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button gedrückt wird */
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button losgelassen wird */
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button gehalten wird */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button verlassen wird */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button mit der Tastatur gedrückt wird */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button mit der Tastatur losgelassen wird */
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** Callback, wenn der Button mit der Tastatur gedrückt wird */
  onKeyPress?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

/**
 * Button-Komponente für Benutzerinteraktionen
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>Klick mich</Button>
 * <Button variant="outline" size="sm" leftIcon={<Icon />}>Mit Icon</Button>
 * <Button loading disabled>Loading...</Button>
 * <Button variant="success" shape="pill">Erfolg</Button>
 * <Button isIconButton leftIcon={<Icon />} aria-label="Icon Button" />
 * <Button isLink href="https://example.com" target="_blank">Link Button</Button>
 * ```
 */
export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        children,
        variant = 'primary',
        size = 'md',
        shape = 'rounded',
        fullWidth = false,
        leftIcon,
        rightIcon,
        loading = false,
        isLoading = false, // Alias für loading
        disabled,
        className = '',
        onClick,
        type = 'button',
        shadow = false,
        hoverable = true,
        focusable = true,
        transition = true,
        active = false,
        bordered = true,
        transparent = false,
        tooltip,
        isIconButton = false,
        isSubmit = false,
        isReset = false,
        isLink = false,
        href,
        target,
        rel,
        download,
        isExternal = false,
        isDropdownTrigger = false,
        isToggle = false,
        isToggleOn = false,
        ripple = false,
        loadingText = 'Loading...',
        loadingSpinner,
        loadingPlaceholder,
        successIcon,
        errorIcon,
        isSuccess = false,
        isError = false,
        onSuccess,
        onError,
        onPress,
        onRelease,
        onHold,
        onFocus,
        onBlur,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        onKeyDown,
        onKeyUp,
        onKeyPress,
        ...props
      },
      ref
    ) => {
      // const { themeMode } = useTheme();
      const themeMode = 'light';
      const [isPressed, setIsPressed] = useState(false);
      const [isFocused, setIsFocused] = useState(false);
      const [isHovered, setIsHovered] = useState(false);
      const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
      const [showRipple, setShowRipple] = useState(false);
      const buttonRef = useRef<HTMLButtonElement | null>(null);
      const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

      // Unterstützung für isLoading als Alias für loading
      const isButtonLoading = loading || isLoading;

      // Bestimme den Button-Typ
      const buttonType = isSubmit ? 'submit' : isReset ? 'reset' : type;

      // Bestimme die Rel-Attribute für externe Links
      const relAttribute = isExternal
        ? rel
          ? `${rel} noopener noreferrer`
          : 'noopener noreferrer'
        : rel;

      // Normalisiere die Variante (solid -> primary für Kompatibilität)
      const normalizedVariant = variant === 'solid' ? 'primary' : variant;

      // Varianten-spezifische Klassen
      const variantClasses = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white',
        secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
        success: 'bg-green-600 hover:bg-green-700 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
        info: 'bg-blue-600 hover:bg-blue-700 text-white',
        outline: bordered
          ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        link: 'text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300 p-0',
        solid: 'bg-primary-600 hover:bg-primary-700 text-white', // Alias für primary
        unstyled: '',
      };

      // Größen-spezifische Klassen
      const sizeClasses = {
        xs: isIconButton ? 'p-1 text-xs' : 'px-2 py-1 text-xs',
        sm: isIconButton ? 'p-1.5 text-sm' : 'px-3 py-1.5 text-sm',
        md: isIconButton ? 'p-2 text-base' : 'px-4 py-2 text-base',
        lg: isIconButton ? 'p-2.5 text-lg' : 'px-6 py-3 text-lg',
        xl: isIconButton ? 'p-3 text-xl' : 'px-8 py-4 text-xl',
      };

      // Form-spezifische Klassen
      const shapeClasses = {
        square: 'rounded-none',
        rounded: 'rounded-md',
        pill: 'rounded-full',
      };

      // Zustandsspezifische Klassen
      const stateClasses = {
        active: active ? 'active' : '',
        disabled: disabled || isButtonLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        hover: hoverable && !disabled && !isButtonLoading ? 'hover:opacity-90' : '',
        focus:
          focusable && !disabled && !isButtonLoading
            ? 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
            : '',
        pressed: isPressed && !disabled && !isButtonLoading ? 'transform scale-95' : '',
        success: isSuccess ? 'bg-green-600 text-white' : '',
        error: isError ? 'bg-red-600 text-white' : '',
        toggle: isToggle && isToggleOn ? 'bg-primary-600 text-white' : '',
      };

      // Effekt-spezifische Klassen
      const effectClasses = {
        shadow: shadow ? 'shadow-md' : '',
        transition: transition ? 'transition duration-150 ease-in-out' : '',
        transparent: transparent ? 'bg-transparent' : '',
      };

      // Allgemeine Button-Klassen
      const buttonClasses = [
        'font-medium',
        'inline-flex items-center justify-center',
        normalizedVariant !== 'unstyled' ? shapeClasses[shape] : '',
        fullWidth ? 'w-full' : '',
        variantClasses[normalizedVariant],
        normalizedVariant !== 'link' && normalizedVariant !== 'unstyled' ? sizeClasses[size] : '',
        stateClasses.active,
        stateClasses.disabled,
        stateClasses.hover,
        stateClasses.focus,
        stateClasses.pressed,
        stateClasses.success,
        stateClasses.error,
        stateClasses.toggle,
        effectClasses.shadow,
        effectClasses.transition,
        effectClasses.transparent,
        isIconButton ? 'p-2' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ');

      // Kombiniere den externen Ref mit unserem internen Ref
      const handleRef = React.useCallback(
        (element: HTMLButtonElement | null) => {
          // Setze den internen Ref
          buttonRef.current = element;

          // Leite den Ref weiter
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current = element;
          }
        },
        [ref]
      );

      // Behandlung von Keyboard-Events für bessere Barrierefreiheit
      const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsPressed(true);
          onPress?.();
          onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
        }

        onKeyDown?.(event);
      };

      const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          setIsPressed(false);
          onRelease?.();
        }

        onKeyUp?.(event);
      };

      // Maus-Event-Handler
      const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(true);
        onPress?.();

        // Starte den Hold-Timer
        if (onHold) {
          holdTimerRef.current = setTimeout(() => {
            onHold();
          }, 500); // 500ms für einen "Hold"
        }

        // Ripple-Effekt
        if (ripple && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          setRippleStyle({
            left: `${x}px`,
            top: `${y}px`,
          });

          setShowRipple(true);
          setTimeout(() => setShowRipple(false), 600);
        }

        onMouseDown?.(event);
      };

      const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(false);
        onRelease?.();

        // Lösche den Hold-Timer
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
          holdTimerRef.current = null;
        }

        onMouseUp?.(event);
      };

      const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(true);
        onMouseEnter?.(event);
      };

      const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(false);
        setIsPressed(false);

        // Lösche den Hold-Timer
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
          holdTimerRef.current = null;
        }

        onMouseLeave?.(event);
      };

      // Fokus-Event-Handler
      const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        setIsFocused(true);
        onFocus?.(event);
      };

      const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        setIsFocused(false);
        onBlur?.(event);
      };

      // Cleanup beim Unmount
      useEffect(() => {
        return () => {
          if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
          }
        };
      }, []);

      // Erfolgs- und Fehler-Callbacks
      useEffect(() => {
        if (isSuccess) {
          onSuccess?.();
        }
      }, [isSuccess, onSuccess]);

      useEffect(() => {
        if (isError) {
          onError?.();
        }
      }, [isError, onError]);

      // Rendere einen Link statt eines Buttons, wenn isLink oder href angegeben ist
      if (isLink || href) {
        return (
          <a
            href={href || '#'}
            className={buttonClasses}
            target={target}
            rel={relAttribute}
            download={download}
            aria-disabled={disabled || isButtonLoading}
            aria-busy={isButtonLoading}
            title={tooltip}
            onClick={(e) => {
              if (disabled || isButtonLoading) {
                e.preventDefault();
                return;
              }
              onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
            }}
            onMouseEnter={handleMouseEnter as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            onMouseLeave={handleMouseLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {isButtonLoading ? (
              <>
                {loadingSpinner || (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loadingPlaceholder || <span>{loadingText}</span>}
              </>
            ) : isSuccess ? (
              <>
                {successIcon || (
                  <svg
                    className="mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {children}
              </>
            ) : isError ? (
              <>
                {errorIcon || (
                  <svg
                    className="mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                {children}
              </>
            ) : (
              <>
                {leftIcon && (
                  <span className={`${isIconButton ? '' : 'mr-2'}`} aria-hidden="true">
                    {leftIcon}
                  </span>
                )}
                {!isIconButton && children}
                {rightIcon && (
                  <span className={`${isIconButton ? '' : 'ml-2'}`} aria-hidden="true">
                    {rightIcon}
                  </span>
                )}
                {isDropdownTrigger && (
                  <svg
                    className="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </>
            )}
          </a>
        );
      }

      return (
        <button
          ref={handleRef}
          disabled={disabled || isButtonLoading}
          className={buttonClasses}
          onClick={onClick}
          type={buttonType}
          role="button"
          aria-disabled={disabled || isButtonLoading}
          aria-busy={isButtonLoading}
          aria-pressed={isToggle ? isToggleOn : undefined}
          title={tooltip}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onKeyPress={onKeyPress}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {/* Ripple-Effekt */}
          {ripple && showRipple && (
            <span
              className="absolute bg-white bg-opacity-30 rounded-full animate-ripple"
              style={{
                width: '100px',
                height: '100px',
                transform: 'translate(-50%, -50%)',
                ...rippleStyle,
              }}
            />
          )}

          {isButtonLoading ? (
            <>
              {loadingSpinner || (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loadingPlaceholder || <span>{loadingText}</span>}
            </>
          ) : isSuccess ? (
            <>
              {successIcon || (
                <svg
                  className="mr-2 h-4 w-4 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {children}
            </>
          ) : isError ? (
            <>
              {errorIcon || (
                <svg
                  className="mr-2 h-4 w-4 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              {children}
            </>
          ) : (
            <>
              {leftIcon && (
                <span className={`${isIconButton ? '' : 'mr-2'}`} aria-hidden="true">
                  {leftIcon}
                </span>
              )}
              {!isIconButton && children}
              {rightIcon && (
                <span className={`${isIconButton ? '' : 'ml-2'}`} aria-hidden="true">
                  {rightIcon}
                </span>
              )}
              {isDropdownTrigger && (
                <svg
                  className="ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </>
          )}
        </button>
      );
    }
  )
);

Button.displayName = 'Button';

export default Button;
