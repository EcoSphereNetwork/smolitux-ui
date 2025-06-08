import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownMenuA11y } from './DropdownMenuA11y';

describe('DropdownMenuA11y', () => {
  it('renders without crashing', () => {
    render(<DropdownMenuA11y />);
    expect(screen.getByRole('button', { name: /DropdownMenuA11y/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DropdownMenuA11y className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DropdownMenuA11y ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
