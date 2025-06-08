import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default } from './Default';

describe('Default', () => {
  it('renders without crashing', () => {
    render(<Default />);
    expect(screen.getByRole('button', { name: /Default/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Default className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Default ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
