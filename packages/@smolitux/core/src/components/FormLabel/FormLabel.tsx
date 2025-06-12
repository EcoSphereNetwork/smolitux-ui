import React, { forwardRef } from 'react';
import { useFormControl } from '../FormControl';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, htmlFor, className = '', ...rest }, ref) => {
    const { id, label, required } = useFormControl();
    const content = children ?? label;
    if (!content) return null;
    return (
      <label
        ref={ref}
        htmlFor={htmlFor || id}
        className={className}
        {...rest}
      >
        {content}
        {required && (
          <>
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(erforderlich)</span>
          </>
        )}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';
export default FormLabel;
