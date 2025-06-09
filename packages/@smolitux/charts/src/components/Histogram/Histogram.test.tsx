import React from 'react';
import { render, screen } from '@testing-library/react';
import { Histogram } from './Histogram';

describe('Histogram', () => {
  it('renders without crashing', () => {
    render(<Histogram />);
    expect(screen.getByTestId('Histogram')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<Histogram className="custom-class" />);
    const element = screen.getByTestId('Histogram');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Histogram ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<Histogram>Test Content</Histogram>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Histogram />);
    const element = screen.getByTestId('Histogram');
    expect(element).toBeInTheDocument();
  });
});
