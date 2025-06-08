import React from 'react';
import { render, screen } from '@testing-library/react';
import { DatePicker.original } from './DatePicker.original';

describe('DatePicker.original', () => {
  it('renders without crashing', () => {
    render(<DatePicker.original />);
    expect(screen.getByRole('button', { name: /DatePicker.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DatePicker.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DatePicker.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
