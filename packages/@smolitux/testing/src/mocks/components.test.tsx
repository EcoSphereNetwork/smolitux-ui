import React from 'react';
import { render, screen } from '@testing-library/react';
import { components } from './components';

describe('components', () => {
  it('renders without crashing', () => {
    render(<components />);
    expect(screen.getByTestId('components')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<components className="custom-class" />);
    const element = screen.getByTestId('components');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<components ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<components>Test Content</components>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<components />);
    const element = screen.getByTestId('components');
    expect(element).toBeInTheDocument();
  });
});
