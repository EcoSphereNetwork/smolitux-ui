import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  // Rendering tests
  it('renders without crashing', () => {
    render(<Button>Test</Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Button>Test Content</Button>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('custom-class');
  });

  // Variant tests
  it('applies the correct variant class', () => {
    render(<Button variant="secondary">Test</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('smx-button--secondary');
  });

  // Size tests
  it('applies the correct size class', () => {
    render(<Button size="lg">Test</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('smx-button--lg');
  });

  // Disabled state tests
  it('applies disabled state correctly', () => {
    render(<Button disabled>Test</Button>);
    const element = screen.getByTestId('Button');
    expect(element).toHaveClass('smx-button--disabled');
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  // Interaction tests
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    
    await user.click(screen.getByTestId('Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Test</Button>);
    
    await user.click(screen.getByTestId('Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Accessibility tests
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
