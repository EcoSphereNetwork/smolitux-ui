import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScatterPlot } from './ScatterPlot';

describe('ScatterPlot', () => {
  it('renders without crashing', () => {
    render(<ScatterPlot />);
    expect(screen.getByRole('button', { name: /ScatterPlot/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ScatterPlot className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ScatterPlot ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
