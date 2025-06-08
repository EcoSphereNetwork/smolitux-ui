import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export interface FlexProps extends BoxProps {
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string | number;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap = 0,
  style,
  ...props
}) => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Text: React.FC<TextProps> = ({ children, as = 'p', ...props }) => {
  const Component = as;
  return <Component {...props}>{children}</Component>;
};
