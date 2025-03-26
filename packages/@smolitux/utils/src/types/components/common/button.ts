import { ResponsiveValue } from '../../common/responsive';

// Button variants
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

// Button sizes
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Button props
export interface ButtonBaseProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Icon to display before the button text */
  leftIcon?: React.ReactNode;
  /** Icon to display after the button text */
  rightIcon?: React.ReactNode;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button takes the full width of its container */
  fullWidth?: boolean;
  /** Button color scheme */
  colorScheme?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Children elements */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Inline CSS styles */
  style?: React.CSSProperties;
}