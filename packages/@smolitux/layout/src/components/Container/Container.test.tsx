import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders without crashing', () => {
    render(<Container />);
    expect(screen.getByRole('button', { name: /Container/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Container className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Container ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
