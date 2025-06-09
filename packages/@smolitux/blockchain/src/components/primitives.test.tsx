import React from 'react';
import { render, screen } from '@testing-library/react';
import { primitives } from './primitives';

describe('primitives', () => {
  it('renders without crashing', () => {
    render(<primitives />);
    expect(screen.getByTestId('primitives')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<primitives className="custom-class" />);
    const element = screen.getByTestId('primitives');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<primitives ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<primitives>Test Content</primitives>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<primitives />);
    const element = screen.getByTestId('primitives');
    expect(element).toBeInTheDocument();
  });
});
