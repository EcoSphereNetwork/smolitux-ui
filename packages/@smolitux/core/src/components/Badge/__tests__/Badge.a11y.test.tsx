import React from 'react';
import { render, screen } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Badge } from '../Badge';

describe('Badge Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(<Badge>Test Badge</Badge>);
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for standard badge', () => {
    render(<Badge>Test Badge</Badge>);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('role', 'status');
    expect(badge).toHaveAttribute('aria-label', 'Test Badge');
    expect(badge).toHaveAttribute('data-variant', 'default');
    expect(badge).toHaveAttribute('data-size', 'md');
  });

  it('should have correct ARIA attributes for counter badge', () => {
    render(
      <Badge isCounter maxCount={99}>
        5
      </Badge>
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('role', 'status');
    expect(badge).toHaveAttribute('aria-label', '5 Benachrichtigungen');
    expect(badge).toHaveAttribute('data-counter', 'true');
  });

  it('should have correct ARIA attributes for single notification counter', () => {
    render(<Badge isCounter>{1}</Badge>);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('aria-label', '1 Benachrichtigung');
  });

  it('should have correct ARIA attributes for dot badge', () => {
    render(<Badge isDot variant="error" />);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('role', 'status');
    expect(badge).toHaveAttribute('aria-label', 'Fehlerstatus');
    expect(badge).toHaveAttribute('data-dot', 'true');
    expect(badge).toHaveAttribute('data-variant', 'error');
  });

  it('should make icon decorative', () => {
    const TestIcon = () => <svg data-testid="test-icon">Test Icon</svg>;
    render(<Badge icon={<TestIcon />}>With Icon</Badge>);

    const iconContainer = screen.getByTestId('test-icon').parentElement;
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('should support different variants with correct attributes', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'primary');

    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'success');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'warning');

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'error');

    rerender(<Badge variant="info">Info</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'info');
  });

  it('should support different sizes with correct attributes', () => {
    const { rerender } = render(<Badge size="xs">XS</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-size', 'xs');

    rerender(<Badge size="sm">SM</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-size', 'sm');

    rerender(<Badge size="md">MD</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-size', 'md');

    rerender(<Badge size="lg">LG</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-size', 'lg');
  });

  it('should format counter correctly when exceeding max count', () => {
    render(
      <Badge isCounter maxCount={99}>
        100
      </Badge>
    );

    expect(screen.getByText('99+')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toHaveAttribute('aria-label', '100 Benachrichtigungen');
  });

  it('should use custom ID when provided', () => {
    render(<Badge id="custom-badge-id">Custom ID</Badge>);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('id', 'custom-badge-id');
  });

  it('should generate unique ID when not provided', () => {
    render(<Badge>Auto ID</Badge>);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('id');
    expect(badge.id).toMatch(/^badge-/);
  });
});
