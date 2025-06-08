import React from 'react';
import { render, screen } from '@testing-library/react';
import { TabView.fixed } from './TabView.fixed';

describe('TabView.fixed', () => {
  it('renders without crashing', () => {
    render(<TabView.fixed />);
    expect(screen.getByRole('button', { name: /TabView.fixed/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TabView.fixed className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TabView.fixed ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
