import { Theme } from '../../styling/theme';

// CSS properties
export type CSSProperties = React.CSSProperties;

// Theme-aware style function
export type StyleFn<Props = {}> = (props: Props & { theme: Theme }) => CSSProperties;

// Style object with responsive values
export type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T };

// Color value from theme
export type ColorValue = string | { light: string; dark: string };

// Space value from theme
export type SpaceValue = number | string;

// Size value
export type SizeValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | string | number;

// Variant
export type Variant = 'solid' | 'outline' | 'ghost' | 'link' | string;

// Color scheme
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;