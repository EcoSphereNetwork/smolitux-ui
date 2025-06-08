import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileContent } from './ProfileContent';

describe('ProfileContent', () => {
  it('renders without crashing', () => {
    render(<ProfileContent />);
    expect(screen.getByRole('button', { name: /ProfileContent/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProfileContent className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ProfileContent ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
