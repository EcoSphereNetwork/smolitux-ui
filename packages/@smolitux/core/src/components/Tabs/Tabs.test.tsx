import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tabs } from './Tabs';

describe('Tabs', () => {
  it('renders without crashing', () => {
    render(<Tabs />);
    expect(screen.getByRole('button', { name: /Tabs/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Tabs className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Tabs ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
