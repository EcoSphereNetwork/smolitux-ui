import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastProvider } from './ToastProvider';

describe('ToastProvider', () => {
  it('renders without crashing', () => {
    render(<ToastProvider />);
    expect(screen.getByRole('button', { name: /ToastProvider/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ToastProvider className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ToastProvider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
