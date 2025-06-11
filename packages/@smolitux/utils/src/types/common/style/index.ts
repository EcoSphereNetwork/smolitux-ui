// Style types
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type Variant = 'solid' | 'outline' | 'ghost' | 'link';
export type ColorScheme = 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';

export interface BaseProps {
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
  /** ID des Elements */
  id?: string;
  /** Kinder-Elemente */
  children?: React.ReactNode;
}

export interface InteractiveProps extends BaseProps {
  /** Ob das Element deaktiviert ist */
  disabled?: boolean;
  /** Ob das Element fokussiert ist */
  focused?: boolean;
  /** Ob das Element aktiv ist */
  active?: boolean;
  /** Ob das Element hervorgehoben ist */
  highlighted?: boolean;
  /** Callback für Klick-Event */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface FormControlProps extends InteractiveProps {
  /** Name des Formularelements */
  name?: string;
  /** Wert des Formularelements */
  value?: unknown;
  /** Standardwert des Formularelements */
  defaultValue?: unknown;
  /** Ob das Formularelement erforderlich ist */
  required?: boolean;
  /** Ob das Formularelement schreibgeschützt ist */
  readOnly?: boolean;
  /** Callback für Änderungen */
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
  /** Callback für Fokus */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  /** Callback für Fokus-Verlust */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}
