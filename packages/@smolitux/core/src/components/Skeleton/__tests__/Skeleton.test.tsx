import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../Skeleton';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Skeleton', () => {
  it('renders correctly with default props', () => {
    render(<Skeleton />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('skeleton');
  });

  it('applies custom width and height', () => {
    render(<Skeleton width={200} height={100} />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle('width: 200px');
    expect(skeleton).toHaveStyle('height: 100px');
  });

  it('applies string width and height', () => {
    render(<Skeleton width="50%" height="10rem" />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle('width: 50%');
    expect(skeleton).toHaveStyle('height: 10rem');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Skeleton variant="text" />);
    
    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('skeleton-text');
    
    rerender(<Skeleton variant="circular" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('skeleton-circular');
    
    rerender(<Skeleton variant="rectangular" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('skeleton-rectangular');
    
    rerender(<Skeleton variant="rounded" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('skeleton-rounded');
  });

  it('renders with different animations', () => {
    const { rerender } = render(<Skeleton animation="pulse" />);
    
    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('skeleton-pulse');
    
    rerender(<Skeleton animation="wave" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('skeleton-wave');
    
    rerender(<Skeleton animation="none" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).not.toHaveClass('skeleton-pulse');
    expect(skeleton).not.toHaveClass('skeleton-wave');
  });

  it('renders multiple skeletons when count is greater than 1', () => {
    render(<Skeleton count={3} />);
    
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('applies gap between multiple skeletons', () => {
    render(<Skeleton count={2} gap={8} />);
    
    const container = screen.getByTestId('skeleton-container');
    expect(container).toHaveStyle('gap: 8px');
  });

  it('renders with custom className', () => {
    render(<Skeleton className="custom-skeleton" />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-skeleton');
  });

  it('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('passes additional props to the div element', () => {
    render(<Skeleton data-custom="test" aria-label="Loading" />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('data-custom', 'test');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders with correct ARIA attributes for accessibility', () => {
    render(<Skeleton />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
  });

  it('renders text variant with appropriate dimensions', () => {
    render(<Skeleton variant="text" />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle('height: 1em');
    expect(skeleton).toHaveStyle('width: 100%');
  });

  it('renders circular variant with equal width and height', () => {
    render(<Skeleton variant="circular" width={50} />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle('width: 50px');
    expect(skeleton).toHaveStyle('height: 50px');
  });
});