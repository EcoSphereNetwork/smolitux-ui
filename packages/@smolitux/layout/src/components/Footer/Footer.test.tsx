import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('button', { name: /Footer/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Footer className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Footer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
