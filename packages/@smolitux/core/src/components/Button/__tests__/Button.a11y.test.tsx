import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Button } from '../Button';

describe('Button Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(<Button>Test Button</Button>);
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for standard button', () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('should have correct ARIA attributes for disabled button', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('should have correct ARIA attributes for loading button', () => {
    render(<Button loading>Loading Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('data-loading', 'true');

    // Loading text should be accessible
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('- Bitte warten')).toHaveClass('sr-only');
  });

  it('should have correct ARIA attributes for toggle button', () => {
    render(
      <Button isToggle isToggleOn>
        Toggle Button
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-state', 'on');
  });

  it('should have correct ARIA attributes for dropdown button', () => {
    render(
      <Button isDropdownTrigger aria-expanded="false" aria-controls="dropdown-menu">
        Dropdown
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    expect(button).toHaveAttribute('aria-controls', 'dropdown-menu');
  });

  it('should have accessible icons', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Icon Button
      </Button>
    );

    const leftIconContainer = screen.getByTestId('left-icon-container');
    const rightIconContainer = screen.getByTestId('right-icon-container');

    expect(leftIconContainer).toHaveAttribute('aria-hidden', 'true');
    expect(rightIconContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have accessible icon button with aria-label', () => {
    render(<Button isIconButton leftIcon={<span>Icon</span>} aria-label="Icon Button" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Icon Button');
  });

  it('should support keyboard interaction', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Keyboard Button</Button>);

    const button = screen.getByRole('button');

    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);

    // Test Space key
    fireEvent.keyDown(button, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should not trigger click when disabled and using keyboard', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button');

    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should close dropdown with Escape key', () => {
    const onClick = jest.fn();
    render(
      <Button isDropdownTrigger aria-expanded="true" onClick={onClick}>
        Open Dropdown
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Escape' });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have visible focus indicators', () => {
    render(<Button>Focus Button</Button>);

    const button = screen.getByRole('button');
    button.focus();

    expect(a11y.hasVisibleFocusIndicator(button)).toBe(true);
  });

  it('should render as link with correct accessibility attributes', () => {
    render(
      <Button isLink href="https://example.com" target="_blank" isExternal>
        Link Button
      </Button>
    );

    const link = screen.getByRole('button');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have accessible success state', () => {
    render(<Button isSuccess>Success Button</Button>);

    expect(screen.getByTestId('success-icon')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('- Erfolgreich')).toHaveClass('sr-only');
  });

  it('should have accessible error state', () => {
    render(<Button isError>Error Button</Button>);

    expect(screen.getByTestId('error-icon')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('- Fehler aufgetreten')).toHaveClass('sr-only');
  });
});
