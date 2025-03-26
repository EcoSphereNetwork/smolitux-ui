import { ResponsiveValue } from '../../common/responsive';

// Box props
export interface BoxBaseProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline CSS styles */
  style?: React.CSSProperties;
  /** Element to render as */
  as?: React.ElementType;
  /** Children elements */
  children?: React.ReactNode;
  /** Width */
  width?: ResponsiveValue<string | number>;
  /** Height */
  height?: ResponsiveValue<string | number>;
  /** Minimum width */
  minWidth?: ResponsiveValue<string | number>;
  /** Minimum height */
  minHeight?: ResponsiveValue<string | number>;
  /** Maximum width */
  maxWidth?: ResponsiveValue<string | number>;
  /** Maximum height */
  maxHeight?: ResponsiveValue<string | number>;
  /** Padding */
  padding?: ResponsiveValue<string | number>;
  /** Margin */
  margin?: ResponsiveValue<string | number>;
  /** Background color */
  bg?: ResponsiveValue<string>;
  /** Text color */
  color?: ResponsiveValue<string>;
  /** Border */
  border?: ResponsiveValue<string>;
  /** Border radius */
  borderRadius?: ResponsiveValue<string | number>;
  /** Box shadow */
  boxShadow?: ResponsiveValue<string>;
  /** Position */
  position?: ResponsiveValue<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>;
  /** Display */
  display?: ResponsiveValue<'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none'>;
  /** Overflow */
  overflow?: ResponsiveValue<'visible' | 'hidden' | 'scroll' | 'auto'>;
}