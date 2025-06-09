export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveProp<T> = T | { [key in Breakpoint]?: T };

export type GridBreakpoint = Breakpoint;
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
