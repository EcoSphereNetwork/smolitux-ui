import React from 'react';
import { render, screen } from '@testing-library/react';
import { GovernanceDashboard } from './GovernanceDashboard';

describe('GovernanceDashboard', () => {
  it('renders without crashing', () => {
    render(<GovernanceDashboard />);
    expect(screen.getByRole('button', { name: /GovernanceDashboard/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<GovernanceDashboard className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<GovernanceDashboard ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
