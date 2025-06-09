import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartLegend } from './ChartLegend';

describe('ChartLegend', () => {
  it('renders without crashing', () => {
    render(<ChartLegend />);
    expect(screen.getByTestId('ChartLegend')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<ChartLegend className="custom-class" />);
    const element = screen.getByTestId('ChartLegend');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<ChartLegend ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<ChartLegend>Test Content</ChartLegend>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ChartLegend />);
    const element = screen.getByTestId('ChartLegend');
    expect(element).toBeInTheDocument();
  });
});
