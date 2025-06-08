import React from 'react';
import { render, screen } from '@testing-library/react';
import { Popover.original } from './Popover.original';

describe('Popover.original', () => {
  it('renders without crashing', () => {
    render(<Popover.original />);
    expect(screen.getByRole('button', { name: /Popover.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Popover.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Popover.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
