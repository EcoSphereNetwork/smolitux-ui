import React from 'react';
import { render, screen, fireEvent } from '../../../../../../../../test-utils';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

// Mock für den Theme-Context
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Button Component', () => {
  // Rendering Tests
  describe('Rendering', () => {
    test('renders correctly with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /Click me/i });
      
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-primary-600'); // Primär-Variante als Default
      expect(button).toHaveAttribute('type', 'button'); // Default type
      expect(button).not.toBeDisabled();
    });

    test('renders children correctly', () => {
      render(
        <Button>
          <span data-testid="child-element">Child Content</span>
        </Button>
      );
      
      expect(screen.getByTestId('child-element')).toBeInTheDocument();
    });
  });

  // Varianten Tests
  describe('Variants', () => {
    test('applies primary variant styles correctly', () => {
      render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-primary-600');
    });

    test('applies secondary variant styles correctly', () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-secondary-600');
    });

    test('applies outline variant styles correctly', () => {
      render(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole('button')).toHaveClass('border-gray-300');
    });

    test('applies ghost variant styles correctly', () => {
      render(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-gray-700');
    });

    test('applies link variant styles correctly', () => {
      render(<Button variant="link">Link</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-primary-600');
      expect(screen.getByRole('button')).toHaveClass('underline');
    });
  });

  // Größen Tests
  describe('Sizes', () => {
    test('applies xs size styles correctly', () => {
      render(<Button size="xs">Extra Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-2 py-1 text-xs');
    });

    test('applies sm size styles correctly', () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-sm');
    });

    test('applies md size styles correctly', () => {
      render(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-4 py-2 text-base');
    });

    test('applies lg size styles correctly', () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-lg');
    });

    test('does not apply size classes to link variant', () => {
      render(<Button variant="link" size="lg">Link</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('px-6 py-3 text-lg');
    });
  });

  // Zustände Tests
  describe('States', () => {
    test('applies fullWidth class when fullWidth prop is true', () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    test('renders in disabled state correctly', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('renders in loading state correctly', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toContainElement(screen.getByText('Loading...'));
    });

    test('applies custom className correctly', () => {
      render(<Button className="custom-class">Custom Class</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  // Icons Tests
  describe('Icons', () => {
    test('renders with left icon correctly', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">🔍</span>}>
          With Left Icon
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      const iconContainer = screen.getByTestId('left-icon').parentElement;
      expect(iconContainer).toHaveClass('mr-2');
      expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    });

    test('renders with right icon correctly', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">→</span>}>
          With Right Icon
        </Button>
      );
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      const iconContainer = screen.getByTestId('right-icon').parentElement;
      expect(iconContainer).toHaveClass('ml-2');
      expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    });

    test('renders with both left and right icons correctly', () => {
      render(
        <Button 
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          With Both Icons
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  // Interaktionen Tests
  describe('Interactions', () => {
    test('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('does not call onClick when loading', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} loading>Loading</Button>);
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('handles keyboard navigation with Enter key', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Press Enter</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('handles keyboard navigation with Space key', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Press Space</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: ' ' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Barrierefreiheit Tests
  describe('Accessibility', () => {
    test('has correct ARIA attributes in default state', () => {
      render(<Button>Accessible Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('role', 'button');
      expect(button).not.toHaveAttribute('aria-disabled');
      expect(button).not.toHaveAttribute('aria-busy');
    });

    test('has correct ARIA attributes in disabled state', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('has correct ARIA attributes in loading state', () => {
      render(<Button loading>Loading Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('loading spinner has aria-hidden attribute', () => {
      render(<Button loading>Loading Button</Button>);
      const svg = screen.getByRole('button').querySelector('svg');
      
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // Ref Forwarding Tests
  describe('Ref Forwarding', () => {
    test('forwards ref to the button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    test('can access DOM properties via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      
      expect(ref.current?.textContent).toBe('Ref Button');
    });
  });

  // Props Durchreichung Tests
  describe('Props Forwarding', () => {
    test('passes additional HTML attributes to button element', () => {
      render(
        <Button 
          data-testid="custom-button"
          aria-label="Custom Button"
          title="Button Title"
        >
          Custom Attributes
        </Button>
      );
      
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom Button');
      expect(button).toHaveAttribute('title', 'Button Title');
    });

    test('applies type attribute correctly', () => {
      render(<Button type="submit">Submit Button</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });
  });
});