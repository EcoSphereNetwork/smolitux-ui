import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreatorDashboard } from './CreatorDashboard';

describe('CreatorDashboard', () => {
  it('renders without crashing', () => {
    render(<CreatorDashboard />);
    expect(screen.getByRole('button', { name: /CreatorDashboard/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CreatorDashboard className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<CreatorDashboard ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
