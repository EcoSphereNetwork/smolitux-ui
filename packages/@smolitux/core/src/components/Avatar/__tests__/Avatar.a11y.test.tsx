import React from 'react';
import { render, screen } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Avatar } from '../Avatar';

describe('Avatar Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(<Avatar name="John Doe" />);
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for standard avatar', () => {
    render(<Avatar name="John Doe" />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('role', 'img');
    expect(avatar).toHaveAttribute('aria-label', 'Avatar von John Doe');
    expect(avatar).toHaveAttribute('data-size', 'md');
    expect(avatar).toHaveAttribute('data-shape', 'circle');
  });

  it('should use alt text for aria-label when provided', () => {
    render(<Avatar src="/test.jpg" alt="Profilbild von Max Mustermann" />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('aria-label', 'Profilbild von Max Mustermann');
  });

  it('should have accessible status indicator', () => {
    render(<Avatar name="John Doe" status="online" />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('data-status', 'online');

    // Status should be announced to screen readers
    const statusText = screen.getByText('Status: Online');
    expect(statusText).toHaveClass('sr-only');

    // Visual indicator should be hidden from screen readers
    const statusIndicator = screen.getByText('Status: Online').previousSibling;
    expect(statusIndicator).toHaveAttribute('aria-hidden', 'true');
  });

  it('should make image decorative when container has aria-label', () => {
    render(<Avatar src="/test.jpg" alt="Profilbild" />);

    const img = screen.getByAltText('Profilbild');
    expect(img).toHaveAttribute('aria-hidden', 'true');
  });

  it('should make fallback content decorative', () => {
    render(<Avatar name="John Doe" />);

    // The fallback div should be hidden from screen readers
    const fallbackDiv = screen.getByText('JD').parentElement;
    expect(fallbackDiv).toHaveAttribute('aria-hidden', 'true');
  });

  it('should make SVG icon decorative', () => {
    render(<Avatar />);

    // The SVG should be hidden from screen readers
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('should support different sizes with correct attributes', () => {
    render(<Avatar size="xl" name="John Doe" />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('data-size', 'xl');
  });

  it('should support different shapes with correct attributes', () => {
    render(<Avatar shape="square" name="John Doe" />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('data-shape', 'square');
  });

  it('should support all status types with correct text', () => {
    const { rerender } = render(<Avatar name="John Doe" status="online" />);
    expect(screen.getByText('Status: Online')).toBeInTheDocument();

    rerender(<Avatar name="John Doe" status="offline" />);
    expect(screen.getByText('Status: Offline')).toBeInTheDocument();

    rerender(<Avatar name="John Doe" status="away" />);
    expect(screen.getByText('Status: Abwesend')).toBeInTheDocument();

    rerender(<Avatar name="John Doe" status="busy" />);
    expect(screen.getByText('Status: Beschäftigt')).toBeInTheDocument();
  });
});
