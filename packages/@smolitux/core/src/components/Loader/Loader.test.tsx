import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Loader from './Loader';

expect.extend(toHaveNoViolations);

describe('Loader', () => {
  it('renders when visible is true', () => {
    render(<Loader visible={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('does not render when visible is false', () => {
    render(<Loader visible={false} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('displays label when provided', () => {
    const label = 'Loading data...';
    render(<Loader visible={true} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('shows default loading text when no label provided', () => {
    render(<Loader visible={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Loader visible={true} size="sm" />);
    let spinner = document.querySelector('.smolitux-loader__spinner');
    expect(spinner).toHaveStyle({ width: '16px', height: '16px' });

    rerender(<Loader visible={true} size="md" />);
    spinner = document.querySelector('.smolitux-loader__spinner');
    expect(spinner).toHaveStyle({ width: '24px', height: '24px' });

    rerender(<Loader visible={true} size="lg" />);
    spinner = document.querySelector('.smolitux-loader__spinner');
    expect(spinner).toHaveStyle({ width: '32px', height: '32px' });
  });

  it('applies custom numeric size', () => {
    render(<Loader visible={true} size={40} />);
    const spinner = document.querySelector('.smolitux-loader__spinner');
    expect(spinner).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Loader visible={true} variant="primary" />);
    let container = screen.getByRole('status');
    expect(container).toHaveClass('smolitux-loader--primary');

    rerender(<Loader visible={true} variant="subtle" />);
    container = screen.getByRole('status');
    expect(container).toHaveClass('smolitux-loader--subtle');

    rerender(<Loader visible={true} variant="contrast" />);
    container = screen.getByRole('status');
    expect(container).toHaveClass('smolitux-loader--contrast');
  });

  it('applies fullscreen mode correctly', () => {
    render(<Loader visible={true} fullscreen={true} />);
    const container = screen.getByRole('status');
    expect(container).toHaveClass('fixed', 'inset-0', 'z-50');
  });

  it('sets correct ARIA attributes', () => {
    render(<Loader visible={true} aria-live="assertive" label="Custom loading" />);
    const container = screen.getByRole('status');
    expect(container).toHaveAttribute('aria-live', 'assertive');
    expect(container).toHaveAttribute('aria-label', 'Custom loading');
  });

  it('sets default aria-live to polite', () => {
    render(<Loader visible={true} />);
    const container = screen.getByRole('status');
    expect(container).toHaveAttribute('aria-live', 'polite');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Loader visible={true} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Loader visible={true} className="custom-class" />);
    const container = screen.getByRole('status');
    expect(container).toHaveClass('custom-class');
  });

  it('passes through additional props', () => {
    render(<Loader visible={true} data-testid="loader-test" />);
    const container = screen.getByRole('status');
    expect(container).toHaveAttribute('data-testid', 'loader-test');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Loader visible={true} label="Loading content" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations in fullscreen mode', async () => {
    const { container } = render(
      <Loader visible={true} fullscreen={true} label="Loading application" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Loader 
        visible={true} 
        size="md" 
        variant="primary" 
        label="Loading..." 
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for fullscreen mode', () => {
    const { container } = render(
      <Loader 
        visible={true} 
        fullscreen={true}
        size="lg" 
        variant="contrast" 
        label="Loading application..." 
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});