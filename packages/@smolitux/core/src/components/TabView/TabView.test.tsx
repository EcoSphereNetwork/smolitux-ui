import React from 'react';
import { render, screen } from '@testing-library/react';
import { TabView } from './TabView';

describe('TabView', () => {
  it('renders without crashing', () => {
    render(<TabView />);
    expect(screen.getByRole('button', { name: /TabView/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TabView className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TabView ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
