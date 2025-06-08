import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownToggle } from './DropdownToggle';

describe('DropdownToggle', () => {
  it('renders without crashing', () => {
    render(<DropdownToggle />);
    expect(screen.getByRole('button', { name: /DropdownToggle/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DropdownToggle className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DropdownToggle ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
