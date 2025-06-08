/**
 * Typen für das Formularvalidierungssystem
 */

export type ValidationRule<T = unknown> = {
  /**
   * Die Validierungsfunktion, die den Wert überprüft
   */
  validator: (value: T, formValues?: Record<string, unknown>) => boolean;

  /**
   * Die Fehlermeldung, die angezeigt wird, wenn die Validierung fehlschlägt
   */
  message: string;

  /**
   * Ob die Validierung nur ausgeführt werden soll, wenn das Feld nicht leer ist
   */
  validateEmpty?: boolean;
};

export type FieldValidationRules<T = unknown> = ValidationRule<T>[];

export type ValidationOptions = {
  /**
   * Ob die Validierung beim Ändern des Werts ausgeführt werden soll
   */
  validateOnChange?: boolean;

  /**
   * Ob die Validierung beim Verlassen des Felds ausgeführt werden soll
   */
  validateOnBlur?: boolean;

  /**
   * Ob die Validierung beim Absenden des Formulars ausgeführt werden soll
   */
  validateOnSubmit?: boolean;

  /**
   * Ob die Validierung beim ersten Rendern ausgeführt werden soll
   */
  validateOnMount?: boolean;

  /**
   * Ob die Validierung nur ausgeführt werden soll, wenn das Feld berührt wurde
   */
  validateOnlyTouched?: boolean;

  /**
   * Ob die Validierung nur ausgeführt werden soll, wenn das Feld schmutzig ist (geändert wurde)
   */
  validateOnlyDirty?: boolean;
};

export type FieldState<T = unknown> = {
  /**
   * Der aktuelle Wert des Felds
   */
  value: T;

  /**
   * Ob das Feld berührt wurde (Benutzer hat mit dem Feld interagiert)
   */
  touched: boolean;

  /**
   * Ob das Feld schmutzig ist (Wert wurde geändert)
   */
  dirty: boolean;

  /**
   * Ob das Feld gerade validiert wird
   */
  validating: boolean;

  /**
   * Ob das Feld gültig ist
   */
  valid: boolean;

  /**
   * Die Fehlermeldungen für das Feld
   */
  errors: string[];
};

export type FormState = {
  /**
   * Ob das Formular gültig ist
   */
  isValid: boolean;

  /**
   * Ob das Formular gerade validiert wird
   */
  isValidating: boolean;

  /**
   * Ob das Formular gerade abgesendet wird
   */
  isSubmitting: boolean;

  /**
   * Ob das Formular bereits abgesendet wurde
   */
  isSubmitted: boolean;

  /**
   * Die Werte aller Felder
   */
  values: Record<string, unknown>;

  /**
   * Die Fehlermeldungen aller Felder
   */
  errors: Record<string, string[]>;

  /**
   * Die berührten Felder
   */
  touched: Record<string, boolean>;

  /**
   * Die schmutzigen Felder (Werte wurden geändert)
   */
  dirty: Record<string, boolean>;
};

export type FormOptions = ValidationOptions & {
  /**
   * Die initialen Werte des Formulars
   */
  initialValues?: Record<string, unknown>;

  /**
   * Callback, der aufgerufen wird, wenn das Formular abgesendet wird
   */
  onSubmit?: (values: Record<string, unknown>, formState: FormState) => void | Promise<void>;

  /**
   * Callback, der aufgerufen wird, wenn sich der Formularstatus ändert
   */
  onChange?: (formState: FormState) => void;

  /**
   * Callback, der aufgerufen wird, wenn die Validierung fehlschlägt
   */
  onError?: (errors: Record<string, string[]>, formState: FormState) => void;
};

export type FieldOptions<T = unknown> = ValidationOptions & {
  /**
   * Der initiale Wert des Felds
   */
  initialValue?: T;

  /**
   * Die Validierungsregeln für das Feld
   */
  validationRules?: FieldValidationRules<T>;

  /**
   * Callback, der aufgerufen wird, wenn sich der Wert des Felds ändert
   */
  onChange?: (value: T, fieldState: FieldState<T>) => void;

  /**
   * Callback, der aufgerufen wird, wenn das Feld den Fokus verliert
   */
  onBlur?: (fieldState: FieldState<T>) => void;

  /**
   * Callback, der aufgerufen wird, wenn die Validierung fehlschlägt
   */
  onError?: (errors: string[], fieldState: FieldState<T>) => void;

  /**
   * Ob das Feld deaktiviert ist
   */
  disabled?: boolean;

  /**
   * Ob das Feld schreibgeschützt ist
   */
  readOnly?: boolean;

  /**
   * Ob das Feld erforderlich ist
   */
  required?: boolean;

  /**
   * Der Name des Felds (für Formulare)
   */
  name?: string;
};

export type FieldProps<T = unknown> = FieldOptions<T> & {
  /**
   * Der aktuelle Wert des Felds
   */
  value?: T;

  /**
   * Callback, der aufgerufen wird, wenn sich der Wert des Felds ändert
   */
  onChange?: (value: T) => void;

  /**
   * Callback, der aufgerufen wird, wenn das Feld den Fokus verliert
   */
  onBlur?: () => void;

  /**
   * Ob das Feld Fehler hat
   */
  hasError?: boolean;

  /**
   * Die Fehlermeldungen für das Feld
   */
  errorMessages?: string[];

  /**
   * Ob das Feld deaktiviert ist
   */
  disabled?: boolean;

  /**
   * Ob das Feld schreibgeschützt ist
   */
  readOnly?: boolean;

  /**
   * Ob das Feld erforderlich ist
   */
  required?: boolean;

  /**
   * Der Name des Felds
   */
  name?: string;

  /**
   * Die ID des Felds
   */
  id?: string;
};

export type FormContextValue = {
  /**
   * Der aktuelle Formularstatus
   */
  formState: FormState;

  /**
   * Registriert ein Feld im Formular
   */
  registerField: (name: string, options?: FieldOptions) => void;

  /**
   * Entfernt ein Feld aus dem Formular
   */
  unregisterField: (name: string) => void;

  /**
   * Setzt den Wert eines Felds
   */
  setFieldValue: (name: string, value: unknown) => void;

  /**
   * Markiert ein Feld als berührt
   */
  setFieldTouched: (name: string, touched?: boolean) => void;

  /**
   * Validiert ein Feld
   */
  validateField: (name: string) => Promise<boolean>;

  /**
   * Validiert alle Felder
   */
  validateForm: () => Promise<boolean>;

  /**
   * Setzt das Formular zurück
   */
  resetForm: (values?: Record<string, unknown>) => void;

  /**
   * Sendet das Formular ab
   */
  submitForm: () => Promise<void>;

  /**
   * Die Validierungsoptionen des Formulars
   */
  validationOptions: ValidationOptions;
};
