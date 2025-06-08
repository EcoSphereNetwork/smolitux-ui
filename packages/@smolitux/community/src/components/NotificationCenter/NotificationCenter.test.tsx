import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotificationCenter } from './NotificationCenter';

describe('NotificationCenter', () => {
  it('renders without crashing', () => {
    render(<NotificationCenter />);
    expect(screen.getByRole('button', { name: /NotificationCenter/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<NotificationCenter className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<NotificationCenter ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
