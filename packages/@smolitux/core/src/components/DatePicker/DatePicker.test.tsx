import React from 'react';
import { render, screen } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<DatePicker />);
    expect(screen.getByRole('button', { name: /DatePicker/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DatePicker className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DatePicker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
