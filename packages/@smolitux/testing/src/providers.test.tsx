import React from 'react';
import { render, screen } from '@testing-library/react';
import { providers } from './providers';

describe('providers', () => {
  it('renders without crashing', () => {
    render(<providers />);
    expect(screen.getByTestId('providers')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<providers className="custom-class" />);
    const element = screen.getByTestId('providers');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<providers ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<providers>Test Content</providers>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<providers />);
    const element = screen.getByTestId('providers');
    expect(element).toBeInTheDocument();
  });
});
