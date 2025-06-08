import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlatformSelector } from './PlatformSelector';

describe('PlatformSelector', () => {
  it('renders without crashing', () => {
    render(<PlatformSelector />);
    expect(screen.getByRole('button', { name: /PlatformSelector/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PlatformSelector className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<PlatformSelector ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
