import React from 'react';
import { render, screen } from '@testing-library/react';
import { MenuDropdown } from './MenuDropdown';

describe('MenuDropdown', () => {
  it('renders without crashing', () => {
    render(<MenuDropdown />);
    expect(screen.getByRole('button', { name: /MenuDropdown/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MenuDropdown className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MenuDropdown ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
