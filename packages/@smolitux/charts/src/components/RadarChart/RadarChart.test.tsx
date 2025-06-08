import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadarChart } from './RadarChart';

describe('RadarChart', () => {
  it('renders without crashing', () => {
    render(<RadarChart />);
    expect(screen.getByRole('button', { name: /RadarChart/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<RadarChart className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<RadarChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
