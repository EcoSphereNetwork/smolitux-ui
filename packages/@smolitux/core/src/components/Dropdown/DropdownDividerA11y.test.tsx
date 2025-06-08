import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownDividerA11y } from './DropdownDividerA11y';

describe('DropdownDividerA11y', () => {
  it('renders without crashing', () => {
    render(<DropdownDividerA11y />);
    expect(screen.getByRole('button', { name: /DropdownDividerA11y/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DropdownDividerA11y className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DropdownDividerA11y ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
