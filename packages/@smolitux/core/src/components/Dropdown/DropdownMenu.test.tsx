import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownMenu } from './DropdownMenu';

describe('DropdownMenu', () => {
  it('renders without crashing', () => {
    render(<DropdownMenu />);
    expect(screen.getByRole('button', { name: /DropdownMenu/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DropdownMenu className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DropdownMenu ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
