import React from 'react';
import { render, screen } from '@testing-library/react';
import { EngagementScore } from './EngagementScore';

describe('EngagementScore', () => {
  it('renders without crashing', () => {
    render(<EngagementScore />);
    expect(screen.getByRole('button', { name: /EngagementScore/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<EngagementScore className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<EngagementScore ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
