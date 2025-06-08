import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownItem } from './DropdownItem';

describe('DropdownItem', () => {
  it('renders without crashing', () => {
    render(<DropdownItem />);
    expect(screen.getByRole('button', { name: /DropdownItem/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DropdownItem className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DropdownItem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
