// Responsive types
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

export type ResponsiveProperty<T> = T | ResponsiveValue<T>;

export interface GridProps {
  /** Anzahl der Spalten */
  columns?: ResponsiveProperty<number | string>;
  /** Abstand zwischen den Elementen */
  gap?: ResponsiveProperty<number | string>;
  /** Abstand zwischen den Zeilen */
  rowGap?: ResponsiveProperty<number | string>;
  /** Abstand zwischen den Spalten */
  columnGap?: ResponsiveProperty<number | string>;
  /** Ausrichtung der Elemente */
  align?: ResponsiveProperty<'start' | 'center' | 'end' | 'stretch'>;
  /** Ausrichtung der Elemente in der Zeile */
  justify?: ResponsiveProperty<
    'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'
  >;
}
