import React, { forwardRef } from 'react';
import { useFormControl } from '../FormControl';

export interface FormSuccessProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const FormSuccess = forwardRef<HTMLParagraphElement, FormSuccessProps>(
  ({ children, className = '', ...rest }, ref) => {
    const { id, successMessage, isSuccess } = useFormControl();
    const content = children ?? successMessage;
    if (!content || !isSuccess) return null;
    return (
      <p
        ref={ref}
        id={id ? `${id}-success` : undefined}
        role="status"
        className={`text-green-600 dark:text-green-400 text-sm ${className}`}
        {...rest}
      >
        {content}
      </p>
    );
  }
);

FormSuccess.displayName = 'FormSuccess';
export default FormSuccess;
