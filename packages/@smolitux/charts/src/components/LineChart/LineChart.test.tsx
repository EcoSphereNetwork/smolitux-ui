import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineChart } from './LineChart';

describe('LineChart', () => {
  it('renders without crashing', () => {
    render(<LineChart />);
    expect(screen.getByRole('button', { name: /LineChart/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LineChart className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<LineChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
