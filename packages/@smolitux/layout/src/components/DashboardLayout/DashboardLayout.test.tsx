import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardLayout } from './DashboardLayout';

describe('DashboardLayout', () => {
  it('renders without crashing', () => {
    render(<DashboardLayout data-testid="layout" />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DashboardLayout data-testid="layout" className="custom-class" />);
    expect(screen.getByTestId('layout')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<DashboardLayout ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
