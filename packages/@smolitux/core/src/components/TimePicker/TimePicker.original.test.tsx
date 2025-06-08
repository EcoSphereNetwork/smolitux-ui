import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimePicker.original } from './TimePicker.original';

describe('TimePicker.original', () => {
  it('renders without crashing', () => {
    render(<TimePicker.original />);
    expect(screen.getByRole('button', { name: /TimePicker.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TimePicker.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TimePicker.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
