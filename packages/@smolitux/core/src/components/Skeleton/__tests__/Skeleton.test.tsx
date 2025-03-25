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
    expect(skeleton).toHaveClass('pulse');
  });

  it('renders with custom width and height', () => {
    render(<Skeleton width={200} height={100} />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      width: '200px',
      height: '100px'
    });
  });

  it('renders with string width and height', () => {
    render(<Skeleton width="50%" height="10rem" />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      width: '50%',
      height: '10rem'
    });
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Skeleton variant="text" />);
    
    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('rounded');
    
    rerender(<Skeleton variant="circular" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('rounded-full');
    
    rerender(<Skeleton variant="rectangular" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('rounded-none');
    
    rerender(<Skeleton variant="rounded" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('rounded-lg');
  });

  it('renders with different animations', () => {
    const { rerender } = render(<Skeleton animation="pulse" />);
    
    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('pulse');
    
    rerender(<Skeleton animation="wave" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('wave');
    
    rerender(<Skeleton animation="none" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).not.toHaveClass('pulse');
    expect(skeleton).not.toHaveClass('wave');
  });

  it('renders multiple skeletons when count is greater than 1', () => {
    render(<Skeleton count={3} />);
    
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('renders with gap between multiple skeletons', () => {
    render(<Skeleton count={2} gap={8} />);
    
    const container = screen.getByTestId('skeleton-container');
    expect(container).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    });
  });

  it('renders with custom className', () => {
    render(<Skeleton className="custom-skeleton" />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-skeleton');
  });

  it('renders with custom style', () => {
    render(<Skeleton style={{ opacity: 0.5 }} />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      opacity: 0.5
    });
  });

  it('renders with custom data attributes', () => {
    render(<Skeleton data-custom="value" />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('data-custom', 'value');
  });

  it('renders with aria-label for accessibility', () => {
    render(<Skeleton aria-label="Loading content" />);
    
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
  });

  it('renders with role="progressbar" for accessibility', () => {
    render(<Skeleton role="progressbar" />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with custom children', () => {
    render(
      <Skeleton>
        <div data-testid="child">Child content</div>
      </Skeleton>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});