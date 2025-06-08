import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownItemA11y } from './DropdownItemA11y';

describe('DropdownItemA11y', () => {
  it('renders without crashing', () => {
    render(<DropdownItemA11y />);
    expect(screen.getByRole('button', { name: /DropdownItemA11y/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DropdownItemA11y className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DropdownItemA11y ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
