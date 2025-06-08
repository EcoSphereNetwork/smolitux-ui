import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Skeleton from '../Skeleton';

describe('Skeleton', () => {
  it('renders correctly with default props', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('renders with text variant', () => {
    render(<Skeleton variant="text" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded');
  });

  it('renders with circular variant', () => {
    render(<Skeleton variant="circular" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-full');
  });

  it('renders with rectangular variant', () => {
    render(<Skeleton variant="rectangular" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).not.toHaveClass('rounded');
    expect(skeleton).not.toHaveClass('rounded-full');
    expect(skeleton).not.toHaveClass('rounded-md');
  });

  it('renders with rounded variant', () => {
    render(<Skeleton variant="rounded" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-md');
  });

  it('renders with pulse animation', () => {
    render(<Skeleton animation="pulse" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('renders with wave animation', () => {
    render(<Skeleton animation="wave" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('animate-skeleton-wave');
  });

  it('renders with no animation', () => {
    render(<Skeleton animation="none" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).not.toHaveClass('animate-pulse');
    expect(skeleton).not.toHaveClass('animate-skeleton-wave');
  });

  it('renders with custom width and height', () => {
    render(<Skeleton width={200} height={100} />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('renders with string width and height', () => {
    render(<Skeleton width="50%" height="5rem" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveStyle({ width: '50%', height: '5rem' });
  });

  it('renders multiple skeletons with count prop', () => {
    render(<Skeleton count={3} />);
    const skeletons = screen.getAllByRole('status');
    expect(skeletons).toHaveLength(3);
  });

  it('renders multiple skeletons with custom gap', () => {
    render(<Skeleton count={2} gap={16} />);
    const skeletons = screen.getAllByRole('status');
    expect(skeletons[1]).toHaveStyle({ marginTop: '16px' });
  });

  it('passes custom className to the component', () => {
    render(<Skeleton className="custom-class" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('passes additional props to the component', () => {
    render(<Skeleton data-testid="skeleton-test" />);
    expect(screen.getByTestId('skeleton-test')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<Skeleton aria-label="Lädt Inhalt" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
