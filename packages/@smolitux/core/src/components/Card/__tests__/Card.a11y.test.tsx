import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Card } from '../Card';

describe('Card Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(<Card>Test Card Content</Card>);
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for standard card', () => {
    render(<Card>Test Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('role', 'region');
    expect(card).toHaveAttribute('id');
    expect(card.id).toMatch(/^card-/);
    expect(card).toHaveAttribute('data-variant', 'flat');
  });

  it('should have correct ARIA attributes for card with title', () => {
    render(<Card title="Card Title">Test Card Content</Card>);

    const card = screen.getByTestId('card');
    const header = screen.getByTestId('card-header');

    expect(card).toHaveAttribute('aria-labelledby');
    expect(card.getAttribute('aria-labelledby')).toBe(header.id);
  });

  it('should be focusable when clickable', () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('should not be focusable when not clickable', () => {
    render(<Card>Non-Clickable Card</Card>);

    const card = screen.getByTestId('card');
    expect(card).not.toHaveAttribute('tabIndex');
  });

  it('should support keyboard interaction when clickable', () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);

    const card = screen.getByTestId('card');

    // Test keyboard interaction
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('should have correct IDs for header, content, and footer', () => {
    render(
      <Card title="Card Title" footer="Card Footer">
        Card Content
      </Card>
    );

    const card = screen.getByTestId('card');
    const header = screen.getByTestId('card-header');
    const content = screen.getByTestId('card-content');
    const footer = screen.getByTestId('card-footer');

    const cardId = card.id;

    expect(header.id).toBe(`${cardId}-header`);
    expect(content.id).toBe(`${cardId}-content`);
    expect(footer.id).toBe(`${cardId}-footer`);
  });

  it('should support different variants with correct attributes', () => {
    const { rerender } = render(<Card variant="elevated">Elevated Card</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('data-variant', 'elevated');

    rerender(<Card variant="outlined">Outlined Card</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('data-variant', 'outlined');

    rerender(<Card variant="flat">Flat Card</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('data-variant', 'flat');
  });

  it('should support different types with correct attributes', () => {
    const { rerender } = render(<Card type="primary">Primary</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('data-type', 'primary');

    rerender(<Card type="secondary">Secondary</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('data-type', 'secondary');
  });

  it('should indicate when card is hoverable', () => {
    render(<Card hoverable>Hoverable Card</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('data-hoverable', 'true');
  });

  it('should have visible focus indicators when focusable', () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);

    const card = screen.getByTestId('card');
    card.focus();

    expect(a11y.hasVisibleFocusIndicator(card)).toBe(true);
  });
});
