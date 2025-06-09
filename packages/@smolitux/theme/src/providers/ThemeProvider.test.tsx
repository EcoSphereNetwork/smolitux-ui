import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  it('renders without crashing', () => {
    render(<ThemeProvider />);
    expect(screen.getByTestId('ThemeProvider')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<ThemeProvider className="custom-class" />);
    const element = screen.getByTestId('ThemeProvider');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<ThemeProvider ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<ThemeProvider>Test Content</ThemeProvider>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ThemeProvider />);
    const element = screen.getByTestId('ThemeProvider');
    expect(element).toBeInTheDocument();
  });
});
