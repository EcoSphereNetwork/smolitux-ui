import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders without crashing', () => {
    render(<Container data-testid="container" />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Container data-testid="container" className="custom-class" />);
    expect(screen.getByTestId('container')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
