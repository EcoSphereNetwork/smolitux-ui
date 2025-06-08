import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heatmap } from './Heatmap';

describe('Heatmap', () => {
  it('renders without crashing', () => {
    render(<Heatmap />);
    expect(screen.getByRole('button', { name: /Heatmap/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Heatmap className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Heatmap ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
