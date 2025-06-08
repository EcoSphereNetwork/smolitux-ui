import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardLayout } from './DashboardLayout';

describe('DashboardLayout', () => {
  it('renders without crashing', () => {
    render(<DashboardLayout />);
    expect(screen.getByRole('button', { name: /DashboardLayout/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DashboardLayout className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DashboardLayout ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
