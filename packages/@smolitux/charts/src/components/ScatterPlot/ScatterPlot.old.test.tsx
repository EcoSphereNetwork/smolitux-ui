import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScatterPlot.old } from './ScatterPlot.old';

describe('ScatterPlot.old', () => {
  it('renders without crashing', () => {
    render(<ScatterPlot.old />);
    expect(screen.getByRole('button', { name: /ScatterPlot.old/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ScatterPlot.old className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ScatterPlot.old ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
