import React from 'react';
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover', () => {
  it('renders without crashing', () => {
    render(<Popover />);
    expect(screen.getByRole('button', { name: /Popover/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Popover className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Popover ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
