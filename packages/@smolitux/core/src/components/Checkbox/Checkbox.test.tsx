import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox />);
    expect(screen.getByRole('button', { name: /Checkbox/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
