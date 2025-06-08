import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders without crashing', () => {
    render(<FormField />);
    expect(screen.getByRole('button', { name: /FormField/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FormField className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FormField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
