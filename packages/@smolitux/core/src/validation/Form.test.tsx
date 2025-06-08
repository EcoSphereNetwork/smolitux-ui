import React from 'react';
import { render, screen } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  it('renders without crashing', () => {
    render(<Form />);
    expect(screen.getByRole('button', { name: /Form/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Form className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Form ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
