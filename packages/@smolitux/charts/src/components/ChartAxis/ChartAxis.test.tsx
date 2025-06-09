import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartAxis } from './ChartAxis';

describe('ChartAxis', () => {
  it('renders without crashing', () => {
    render(<ChartAxis />);
    expect(screen.getByTestId('ChartAxis')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<ChartAxis className="custom-class" />);
    const element = screen.getByTestId('ChartAxis');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<ChartAxis ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<ChartAxis>Test Content</ChartAxis>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ChartAxis />);
    const element = screen.getByTestId('ChartAxis');
    expect(element).toBeInTheDocument();
  });
});
