import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownToggleA11y } from './DropdownToggleA11y';

describe('DropdownToggleA11y', () => {
  it('renders without crashing', () => {
    render(<DropdownToggleA11y />);
    expect(screen.getByRole('button', { name: /DropdownToggleA11y/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DropdownToggleA11y className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DropdownToggleA11y ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
