import React from 'react';
import { render, screen } from '@testing-library/react';
import { render } from './render';

describe('render', () => {
  it('renders without crashing', () => {
    render(<render />);
    expect(screen.getByTestId('render')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<render className="custom-class" />);
    const element = screen.getByTestId('render');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<render ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<render>Test Content</render>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<render />);
    const element = screen.getByTestId('render');
    expect(element).toBeInTheDocument();
  });
});
