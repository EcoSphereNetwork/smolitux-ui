import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownDivider } from './DropdownDivider';

describe('DropdownDivider', () => {
  it('renders without crashing', () => {
    render(<DropdownDivider />);
    expect(screen.getByRole('button', { name: /DropdownDivider/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DropdownDivider className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DropdownDivider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
