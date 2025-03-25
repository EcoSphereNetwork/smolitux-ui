import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';
import { ThemeProvider } from '@smolitux/theme';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Button', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600'); // Primär-Variante als Default
  });

  test('applies different variant styles correctly', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary-600');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-gray-300');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-gray-700');

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-primary-600');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-sm');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-4 py-2 text-base');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-lg');

    rerender(<Button size="xs">Extra Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-2 py-1 text-xs');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not call onClick when loading', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading>Loading</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders loading state correctly', () => {
    render(<Button loading>Loading</Button>);
    
    // Prüfen, ob der Button deaktiviert ist
    expect(screen.getByRole('button')).toBeDisabled();
    
    // Prüfen, ob die Opacity-Klasse angewendet wird
    expect(screen.getByRole('button')).toHaveClass('opacity-50');
    
    // Prüfen, ob der Cursor-Klasse angewendet wird
    expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed');
    
    // Prüfen, ob das ARIA-Attribut gesetzt ist
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    
    // Prüfen, ob der Ladetext angezeigt wird
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Prüfen, ob das Lade-Icon angezeigt wird
    expect(screen.getByRole('button')).toContainElement(screen.getByText('Loading...'));
  });

  test('renders icons correctly', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const rightIcon = <span data-testid="right-icon">→</span>;
    
    render(
      <Button leftIcon={leftIcon} rightIcon={rightIcon}>
        With Icons
      </Button>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    
    // Prüfen, ob die Icons die richtigen Klassen haben
    expect(screen.getByTestId('left-icon').parentElement).toHaveClass('mr-2');
    expect(screen.getByTestId('right-icon').parentElement).toHaveClass('ml-2');
    
    // Prüfen, ob die Icons als dekorativ markiert sind
    expect(screen.getByTestId('left-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('right-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  test('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('opacity-50');
    expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed');
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  test('passes additional HTML attributes to button element', () => {
    render(<Button data-testid="custom-button" aria-label="Custom Button">Custom Attr</Button>);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    expect(screen.getByLabelText('Custom Button')).toBeInTheDocument();
  });

  test('applies custom className correctly', () => {
    render(<Button className="custom-class">Custom Class</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  test('handles keyboard navigation correctly', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Keyboard Nav</Button>);
    
    const button = screen.getByRole('button');
    
    // Testen der Enter-Taste
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Testen der Leertaste
    fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
    
    // Andere Tasten sollten den onClick-Handler nicht auslösen
    fireEvent.keyDown(button, { key: 'A' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test('does not trigger keyboard navigation when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Keyboard Nav</Button>);
    
    const button = screen.getByRole('button');
    
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not trigger keyboard navigation when loading', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading>Loading Keyboard Nav</Button>);
    
    const button = screen.getByRole('button');
    
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('uses type="button" by default', () => {
    render(<Button>Default Type</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test('allows overriding the type attribute', () => {
    render(<Button type="submit">Submit Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});