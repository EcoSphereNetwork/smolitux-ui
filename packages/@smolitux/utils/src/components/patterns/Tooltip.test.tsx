import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders without crashing', () => {
    render(<Tooltip />);
    expect(screen.getByRole('button', { name: /Tooltip/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Tooltip className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Tooltip ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
