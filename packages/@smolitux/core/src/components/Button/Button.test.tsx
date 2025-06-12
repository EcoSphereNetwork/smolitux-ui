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
    expect(screen.getByRole('button')).toBeInTheDocument();
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

  it('uses button element with type attribute', () => {
    render(<Button>Test</Button>);
    const element = screen.getByRole('button');
    expect(element.tagName).toBe('BUTTON');
    expect(element).toHaveAttribute('type', 'button');
  });

  // Disabled state tests
  it('applies disabled state correctly', () => {
    render(<Button disabled>Test</Button>);
    const element = screen.getByRole('button');
    expect(element).toHaveClass('smx-button--disabled');
    expect(element).toBeDisabled();
  });

  // Interaction tests
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Test
      </Button>
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Accessibility tests
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
