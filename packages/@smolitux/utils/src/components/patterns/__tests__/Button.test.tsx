import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Click Me</Button>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    const { container } = render(
      <Button style={{ backgroundColor: 'red' }}>Click Me</Button>
    );
    expect(container.firstChild).toHaveStyle('background-color: red');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as disabled when disabled=true', () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByText('Click Me').closest('button')).toBeDisabled();
    expect(screen.getByText('Click Me').closest('button')).toHaveStyle('cursor: not-allowed');
    expect(screen.getByText('Click Me').closest('button')).toHaveStyle('opacity: 0.6');
  });

  it('renders as disabled when loading=true', () => {
    render(<Button loading>Click Me</Button>);
    expect(screen.getByText('Click Me').closest('button')).toBeDisabled();
    expect(screen.getByText('Click Me').closest('button')).toHaveStyle('cursor: not-allowed');
  });

  it('renders loading spinner when loading=true', () => {
    render(<Button loading>Click Me</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('animate-spin');
  });

  it('renders left icon when leftIcon is provided', () => {
    const leftIcon = <span data-testid="left-icon">Icon</span>;
    render(<Button leftIcon={leftIcon}>Click Me</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when rightIcon is provided', () => {
    const rightIcon = <span data-testid="right-icon">Icon</span>;
    render(<Button rightIcon={rightIcon}>Click Me</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByText('Submit').closest('button')).toHaveAttribute('type', 'submit');
  });

  it('applies full width when fullWidth=true', () => {
    const { container } = render(<Button fullWidth>Click Me</Button>);
    expect(container.firstChild).toHaveStyle('width: 100%');
  });

  it('applies different styles based on variant', () => {
    const { rerender } = render(<Button variant="solid">Solid</Button>);
    expect(screen.getByText('Solid').closest('button')).toHaveStyle('background-color: #3b82f6');
    expect(screen.getByText('Solid').closest('button')).toHaveStyle('color: white');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline').closest('button')).toHaveStyle('background-color: transparent');
    expect(screen.getByText('Outline').closest('button')).toHaveStyle('color: #3b82f6');
    expect(screen.getByText('Outline').closest('button')).toHaveStyle('border-color: #3b82f6');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText('Ghost').closest('button')).toHaveStyle('background-color: transparent');
    expect(screen.getByText('Ghost').closest('button')).toHaveStyle('color: #3b82f6');
    expect(screen.getByText('Ghost').closest('button')).toHaveStyle('border-color: transparent');

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByText('Link').closest('button')).toHaveStyle('background-color: transparent');
    expect(screen.getByText('Link').closest('button')).toHaveStyle('color: #3b82f6');
    expect(screen.getByText('Link').closest('button')).toHaveStyle('border-color: transparent');
    expect(screen.getByText('Link').closest('button')).toHaveStyle('text-decoration: underline');
  });

  it('applies different styles based on size', () => {
    const { rerender } = render(<Button size="xs">XS</Button>);
    expect(screen.getByText('XS').closest('button')).toHaveStyle('font-size: 0.75rem');
    expect(screen.getByText('XS').closest('button')).toHaveStyle('padding: 0.25rem 0.5rem');
    expect(screen.getByText('XS').closest('button')).toHaveStyle('height: 1.5rem');

    rerender(<Button size="sm">SM</Button>);
    expect(screen.getByText('SM').closest('button')).toHaveStyle('font-size: 0.875rem');
    expect(screen.getByText('SM').closest('button')).toHaveStyle('padding: 0.375rem 0.75rem');
    expect(screen.getByText('SM').closest('button')).toHaveStyle('height: 2rem');

    rerender(<Button size="md">MD</Button>);
    expect(screen.getByText('MD').closest('button')).toHaveStyle('font-size: 1rem');
    expect(screen.getByText('MD').closest('button')).toHaveStyle('padding: 0.5rem 1rem');
    expect(screen.getByText('MD').closest('button')).toHaveStyle('height: 2.5rem');

    rerender(<Button size="lg">LG</Button>);
    expect(screen.getByText('LG').closest('button')).toHaveStyle('font-size: 1.125rem');
    expect(screen.getByText('LG').closest('button')).toHaveStyle('padding: 0.625rem 1.25rem');
    expect(screen.getByText('LG').closest('button')).toHaveStyle('height: 3rem');

    rerender(<Button size="xl">XL</Button>);
    expect(screen.getByText('XL').closest('button')).toHaveStyle('font-size: 1.25rem');
    expect(screen.getByText('XL').closest('button')).toHaveStyle('padding: 0.75rem 1.5rem');
    expect(screen.getByText('XL').closest('button')).toHaveStyle('height: 3.5rem');
  });
});