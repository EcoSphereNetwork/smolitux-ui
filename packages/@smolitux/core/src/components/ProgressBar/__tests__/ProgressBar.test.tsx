import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  it('renders with default props', () => {
    render(<ProgressBar value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders with custom min and max values', () => {
    render(<ProgressBar value={5} min={0} max={10} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '5');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '10');
  });

  it('renders with percentage label when showLabel is true', () => {
    render(<ProgressBar value={50} showLabel />);
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders with value label when labelFormat is value', () => {
    render(<ProgressBar value={50} showLabel labelFormat="value" />);
    
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders with value and max label when labelFormat is valueAndMax', () => {
    render(<ProgressBar value={50} max={100} showLabel labelFormat="valueAndMax" />);
    
    expect(screen.getByText('50/100')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<ProgressBar value={50} label="Custom Label" />);
    
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<ProgressBar value={50} size="xs" />);
    
    let progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('h-1');
    
    rerender(<ProgressBar value={50} size="lg" />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('h-4');
  });

  it('renders with different colors', () => {
    const { rerender } = render(<ProgressBar value={50} color="primary" />);
    
    let progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-primary-500');
    
    rerender(<ProgressBar value={50} color="success" />);
    progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-success-500');
  });

  it('renders with rounded corners when rounded is true', () => {
    render(<ProgressBar value={50} rounded />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('rounded-full');
  });

  it('renders with gradient appearance', () => {
    render(<ProgressBar value={50} appearance="gradient" />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-gradient-to-r');
  });

  it('renders with inverted progress', () => {
    render(<ProgressBar value={50} inverted />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('ml-auto');
  });

  it('renders with indeterminate state', () => {
    render(<ProgressBar value={50} indeterminate />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('animate-indeterminate');
  });

  it('renders with striped variant', () => {
    render(<ProgressBar value={50} variant="striped" />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-striped');
  });

  it('renders with animated variant', () => {
    render(<ProgressBar value={50} variant="animated" />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-striped');
    expect(progressFill).toHaveClass('animate-progress-stripes');
  });

  it('clamps value to min when value is less than min', () => {
    render(<ProgressBar value={-10} min={0} max={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('clamps value to max when value is greater than max', () => {
    render(<ProgressBar value={150} min={0} max={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });

  it('applies custom className', () => {
    render(<ProgressBar value={50} className="custom-progress" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('custom-progress');
  });

  it('forwards additional props to the container', () => {
    render(<ProgressBar value={50} data-testid="custom-progress" />);
    
    expect(screen.getByTestId('custom-progress')).toBeInTheDocument();
  });
});