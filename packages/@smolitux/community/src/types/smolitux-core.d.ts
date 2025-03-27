declare module '@smolitux/core' {
  import React from 'react';

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  }

  export const Button: React.FC<ButtonProps>;

  export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  }

  export const Input: React.FC<InputProps>;
}
