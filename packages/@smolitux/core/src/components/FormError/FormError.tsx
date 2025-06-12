import React, { forwardRef } from 'react';
import { useFormControl } from '../FormControl';

export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ children, className = '', ...rest }, ref) => {
    const { id, errorMessage, hasError } = useFormControl();
    const content = children ?? errorMessage;
    if (!content || !hasError) return null;
    return (
      <p
        ref={ref}
        id={id ? `${id}-error` : undefined}
        role="alert"
        className={`text-red-600 dark:text-red-400 text-sm ${className}`}
        {...rest}
      >
        {content}
      </p>
    );
  }
);

FormError.displayName = 'FormError';
export default FormError;
