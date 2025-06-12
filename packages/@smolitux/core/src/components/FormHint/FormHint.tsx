import React, { forwardRef } from 'react';
import { useFormControl } from '../FormControl';

export interface FormHintProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const FormHint = forwardRef<HTMLParagraphElement, FormHintProps>(
  ({ children, className = '', ...rest }, ref) => {
    const { id, helperText } = useFormControl();
    const content = children ?? helperText;
    if (!content) return null;
    return (
      <p
        ref={ref}
        id={id ? `${id}-helper` : undefined}
        className={`text-gray-500 dark:text-gray-400 text-sm ${className}`}
        {...rest}
      >
        {content}
      </p>
    );
  }
);

FormHint.displayName = 'FormHint';
export default FormHint;
