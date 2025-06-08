import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastProvider.original } from './ToastProvider.original';

describe('ToastProvider.original', () => {
  it('renders without crashing', () => {
    render(<ToastProvider.original />);
    expect(screen.getByRole('button', { name: /ToastProvider.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ToastProvider.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ToastProvider.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
