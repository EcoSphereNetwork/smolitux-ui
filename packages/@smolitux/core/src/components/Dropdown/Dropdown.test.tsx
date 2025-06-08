import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  it('renders without crashing', () => {
    render(<Dropdown />);
    expect(screen.getByRole('button', { name: /Dropdown/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Dropdown className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Dropdown ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
