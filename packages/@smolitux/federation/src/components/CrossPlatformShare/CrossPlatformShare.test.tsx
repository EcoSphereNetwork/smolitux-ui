import React from 'react';
import { render, screen } from '@testing-library/react';
import { CrossPlatformShare } from './CrossPlatformShare';

describe('CrossPlatformShare', () => {
  it('renders without crashing', () => {
    render(<CrossPlatformShare />);
    expect(screen.getByRole('button', { name: /CrossPlatformShare/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CrossPlatformShare className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<CrossPlatformShare ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
