import React from 'react';
import { render, screen } from '@testing-library/react';
import { Select } from './Select';

describe('Select', () => {
  it('renders without crashing', () => {
    render(<Select />);
    expect(screen.getByRole('button', { name: /Select/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Select className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Select ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
