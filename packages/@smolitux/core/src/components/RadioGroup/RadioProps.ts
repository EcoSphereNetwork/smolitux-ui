// packages/@smolitux/core/src/components/RadioGroup/RadioProps.ts
import { ReactNode } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label für das Radio */
  label?: string;
  /** Größe des Radios */
  size?: 'sm' | 'md' | 'lg';
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Kinder-Elemente (werden als Label verwendet) */
  children?: ReactNode;
}