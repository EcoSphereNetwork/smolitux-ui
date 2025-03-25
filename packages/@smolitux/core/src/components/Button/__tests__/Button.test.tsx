import React from 'react';
import { render, screen, fireEvent } from '../../../../../../../../test-utils';
import { Button } from '../Button';

// Mock für den Theme-Context
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

// Mock für setTimeout
jest.useFakeTimers();

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
    
    rerender(<Button variant="success">Success</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-green-600');
    
    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-600');
    
    rerender(<Button variant="warning">Warning</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-yellow-600');
    
    rerender(<Button variant="info">Info</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
    
    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-primary-600');
    
    rerender(<Button variant="unstyled">Unstyled</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('bg-primary-600');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="xs">Extra Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-2 py-1 text-xs');
    
    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-sm');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-4 py-2 text-base');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-lg');
    
    rerender(<Button size="xl">Extra Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-8 py-4 text-xl');
  });
  
  test('renders with different shapes', () => {
    const { rerender } = render(<Button shape="square">Square</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-none');
    
    rerender(<Button shape="rounded">Rounded</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-md');
    
    rerender(<Button shape="pill">Pill</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-full');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders loading state correctly', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
  
  test('renders with custom loading text', () => {
    render(<Button loading loadingText="Please wait...">Loading</Button>);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });
  
  test('renders with custom loading spinner', () => {
    const customSpinner = <div data-testid="custom-spinner">⟳</div>;
    render(<Button loading loadingSpinner={customSpinner}>Loading</Button>);
    expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
  });

  test('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('opacity-50');
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });
  
  test('renders with shadow when shadow prop is true', () => {
    render(<Button shadow>Shadow</Button>);
    expect(screen.getByRole('button')).toHaveClass('shadow-md');
  });
  
  test('renders without hover effect when hoverable is false', () => {
    render(<Button hoverable={false}>No Hover</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('hover:opacity-90');
  });
  
  test('renders without focus effect when focusable is false', () => {
    render(<Button focusable={false}>No Focus</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('focus:outline-none');
  });
  
  test('renders without transition when transition is false', () => {
    render(<Button transition={false}>No Transition</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('transition');
  });
  
  test('renders as active when active prop is true', () => {
    render(<Button active>Active</Button>);
    expect(screen.getByRole('button')).toHaveClass('active');
  });
  
  test('renders with transparent background when transparent prop is true', () => {
    render(<Button transparent>Transparent</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });
  
  test('renders as icon button when isIconButton prop is true', () => {
    const leftIcon = <span data-testid="icon">★</span>;
    render(<Button isIconButton leftIcon={leftIcon} aria-label="Icon Button" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.queryByText('Icon Button')).not.toBeInTheDocument();
  });
  
  test('renders as submit button when isSubmit prop is true', () => {
    render(<Button isSubmit>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
  
  test('renders as reset button when isReset prop is true', () => {
    render(<Button isReset>Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });
  
  test('renders as link when isLink prop is true', () => {
    render(<Button isLink href="https://example.com">Link</Button>);
    const link = screen.getByRole('link', { name: /Link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
  
  test('renders as external link when isExternal prop is true', () => {
    render(<Button isLink isExternal href="https://example.com">External Link</Button>);
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });
  
  test('renders with dropdown indicator when isDropdownTrigger prop is true', () => {
    render(<Button isDropdownTrigger>Dropdown</Button>);
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });
  
  test('renders as toggle button when isToggle prop is true', () => {
    render(<Button isToggle isToggleOn>Toggle</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
  
  test('renders with success state when isSuccess prop is true', () => {
    render(<Button isSuccess>Success</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-green-600');
  });
  
  test('renders with error state when isError prop is true', () => {
    render(<Button isError>Error</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-600');
  });
  
  test('calls onPress and onRelease handlers', () => {
    const handlePress = jest.fn();
    const handleRelease = jest.fn();
    render(<Button onPress={handlePress} onRelease={handleRelease}>Press Me</Button>);
    
    fireEvent.mouseDown(screen.getByRole('button'));
    expect(handlePress).toHaveBeenCalledTimes(1);
    
    fireEvent.mouseUp(screen.getByRole('button'));
    expect(handleRelease).toHaveBeenCalledTimes(1);
  });
  
  test('calls onHold handler after holding the button', () => {
    const handleHold = jest.fn();
    render(<Button onHold={handleHold}>Hold Me</Button>);
    
    fireEvent.mouseDown(screen.getByRole('button'));
    jest.advanceTimersByTime(500);
    
    expect(handleHold).toHaveBeenCalledTimes(1);
  });
  
  test('calls onFocus and onBlur handlers', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Button onFocus={handleFocus} onBlur={handleBlur}>Focus Me</Button>);
    
    fireEvent.focus(screen.getByRole('button'));
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(screen.getByRole('button'));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
  
  test('calls onMouseEnter and onMouseLeave handlers', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    render(<Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Hover Me</Button>);
    
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    
    fireEvent.mouseLeave(screen.getByRole('button'));
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });
  
  test('calls onKeyDown and onKeyUp handlers', () => {
    const handleKeyDown = jest.fn();
    const handleKeyUp = jest.fn();
    render(<Button onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>Key Me</Button>);
    
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    
    fireEvent.keyUp(screen.getByRole('button'), { key: 'Enter' });
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  test('passes additional HTML attributes to button element', () => {
    render(<Button data-testid="custom-button">Custom Attr</Button>);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });
});