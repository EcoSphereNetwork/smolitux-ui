import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContentAnalytics } from './ContentAnalytics';

describe('ContentAnalytics', () => {
  it('renders without crashing', () => {
    render(<ContentAnalytics />);
    expect(screen.getByRole('button', { name: /ContentAnalytics/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ContentAnalytics className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ContentAnalytics ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
