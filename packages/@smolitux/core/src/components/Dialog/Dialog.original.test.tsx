import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dialog.original } from './Dialog.original';

describe('Dialog.original', () => {
  it('renders without crashing', () => {
    render(<Dialog.original />);
    expect(screen.getByRole('button', { name: /Dialog.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Dialog.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Dialog.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
