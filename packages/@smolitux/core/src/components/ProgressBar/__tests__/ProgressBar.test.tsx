import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  test('renders correctly with default props', () => {
    render(<ProgressBar value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });
  
  test('renders with custom min and max values', () => {
    render(<ProgressBar value={5} min={0} max={10} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '5');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '10');
  });
  
  test('renders with label', () => {
    render(<ProgressBar value={50} showLabel />);
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
  
  test('renders with custom label format', () => {
    render(<ProgressBar value={50} max={100} showLabel labelFormat="valueAndMax" />);
    
    expect(screen.getByText('50 / 100')).toBeInTheDocument();
  });
  
  test('renders with custom label', () => {
    render(<ProgressBar value={50} showLabel label="Loading..." />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  test('renders with different sizes', () => {
    const { rerender } = render(<ProgressBar value={50} size="xs" />);
    
    let progressBar = screen.getByTestId('progressbar');
    expect(progressBar).toHaveClass('h-1');
    
    rerender(<ProgressBar value={50} size="lg" />);
    progressBar = screen.getByTestId('progressbar');
    expect(progressBar).toHaveClass('h-6');
  });
  
  test('renders with different colors', () => {
    render(<ProgressBar value={50} color="primary" />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toBeInTheDocument();
  });
  
  test('renders with gradient appearance', () => {
    render(<ProgressBar value={50} appearance="gradient" />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toBeInTheDocument();
  });
  
  test('renders with inverted progress', () => {
    render(<ProgressBar value={50} inverted />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toBeInTheDocument();
  });
  
  test('renders with indeterminate state', () => {
    render(<ProgressBar value={50} indeterminate />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('animate-progress-indeterminate');
  });
  
  test('renders with striped variant', () => {
    render(<ProgressBar value={50} variant="striped" />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-stripes');
  });
  
  test('renders with animated variant', () => {
    render(<ProgressBar value={50} variant="animated" />);
    
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-stripes');
    expect(progressFill).toHaveClass('animate-progress-stripes');
  });
  
  test('clamps value to min when value is less than min', () => {
    render(<ProgressBar value={-10} min={0} max={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });
  
  test('clamps value to max when value is greater than max', () => {
    render(<ProgressBar value={150} min={0} max={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });
  
  test('applies custom className', () => {
    render(<ProgressBar value={50} className="custom-progress" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('custom-progress');
  });
});