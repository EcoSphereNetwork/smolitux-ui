import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';

export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement | HTMLDivElement> {
  /** Visible label for the group */
  label: string;
  /** Form elements to group */
  children: React.ReactNode;
  /** Additional descriptive text */
  description?: string;
  /** Optional hint text */
  hint?: string;
  /** Error message */
  error?: string;
  /** Mark group as required */
  required?: boolean;
  /** Display label and field horizontally */
  horizontal?: boolean;
  /** id of the form control the label describes */
  labelFor?: string;
  /** Position of the label relative to children */
  labelPosition?: 'top' | 'left';
  /** Id attribute */
  id?: string;
}

export const FormGroup = forwardRef<HTMLFieldSetElement | HTMLDivElement, FormGroupProps>(
  (
    {
      label,
      children,
      description,
      hint,
      error,
      required = false,
      horizontal = false,
      labelFor,
      labelPosition = 'top',
      id,
      className,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const groupId = id || `form-group-${autoId}`;
    const hintId = hint ? `${groupId}-hint` : undefined;
    const errorId = error ? `${groupId}-error` : undefined;
    const descId = description ? `${groupId}-desc` : undefined;
    const describedBy = [errorId, hintId, descId].filter(Boolean).join(' ') || undefined;

    const Root = labelFor ? 'div' : 'fieldset';
    const Label = labelFor ? 'label' : 'legend';

    return (
      <Root
        ref={ref as any}
        id={groupId}
        role={labelFor ? 'group' : undefined}
        aria-labelledby={`${groupId}-label`}
        aria-required={required || undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy}
        className={clsx('smx-form-group', horizontal && 'flex items-start gap-2', className)}
        {...rest}
      >
        <Label
          id={`${groupId}-label`}
          htmlFor={labelFor}
          className={clsx(
            labelPosition === 'left' && !horizontal ? 'mr-2' : 'mb-1',
            'font-medium'
          )}
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </Label>
        <div className={clsx(labelPosition === 'left' && horizontal && 'flex-1')}>{children}</div>
        {description && (
          <p id={descId} className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        )}
        {hint && (
          <p id={hintId} className="text-sm text-gray-500 mt-1">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      </Root>
    );
  },
);

FormGroup.displayName = 'FormGroup';
export default FormGroup;
