import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn-primary');
    expect(button).toHaveClass('btn-md');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
    
    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
    
    rerender(<Button variant="warning">Warning</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-warning');
    
    rerender(<Button variant="success">Success</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-success');
    
    rerender(<Button variant="info">Info</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-info');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="xs">Extra Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-xs');
    
    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-sm');
    
    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-md');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
    
    rerender(<Button size="xl">Extra Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-xl');
  });

  it('renders with outline style', () => {
    render(<Button variant="outline">Outline Button</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('btn-outline');
  });

  it('renders as disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Die Klasse 'btn-disabled' wird nicht mehr verwendet, stattdessen wird opacity-50 und cursor-not-allowed gesetzt
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('renders with full width', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    
    // Die Klasse 'btn-full-width' wird nicht mehr verwendet, stattdessen wird w-full gesetzt
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('renders with custom className', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'purple', color: 'white' };
    render(<Button style={customStyle}>Custom Style Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: purple');
    expect(button).toHaveStyle('color: white');
  });

  it('renders with left icon', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">🔍</span>}>
        Search
      </Button>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('left-icon-container')).toBeInTheDocument();
    expect(screen.getByTestId('left-icon-container')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">→</span>}>
        Next
      </Button>
    );
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon-container')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon-container')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders with both left and right icons', () => {
    render(
      <Button 
        leftIcon={<span data-testid="left-icon">🔍</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Search and Go
      </Button>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByText('Search and Go')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as loading state', () => {
    render(<Button isLoading>Loading Button</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('btn-loading');
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('- Bitte warten')).toBeInTheDocument();
    expect(screen.getByText('- Bitte warten')).toHaveClass('sr-only');
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('renders with different types', () => {
    const { rerender } = render(<Button type="button">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    
    rerender(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    
    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  it('forwards ref to button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
    expect(ref.current?.textContent).toBe('Ref Button');
  });

  it('renders with aria attributes', () => {
    render(
      <Button 
        aria-label="Close dialog"
        aria-expanded={false}
        aria-controls="dialog-1"
      >
        Close
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Close dialog');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'dialog-1');
  });
  
  it('renders with dropdown trigger', () => {
    render(
      <Button 
        isDropdownTrigger
        aria-expanded={false}
        aria-controls="dropdown-menu"
      >
        Menu
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    expect(screen.getByTestId('dropdown-icon')).toBeInTheDocument();
  });
  
  it('renders with success state', () => {
    render(
      <Button isSuccess>
        Success
      </Button>
    );
    
    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    expect(screen.getByText('- Erfolgreich')).toBeInTheDocument();
    expect(screen.getByText('- Erfolgreich')).toHaveClass('sr-only');
  });
  
  it('renders with error state', () => {
    render(
      <Button isError>
        Error
      </Button>
    );
    
    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    expect(screen.getByText('- Fehler aufgetreten')).toBeInTheDocument();
    expect(screen.getByText('- Fehler aufgetreten')).toHaveClass('sr-only');
  });

  it('renders as a link when isLink and href are provided', () => {
    render(
      <Button isLink href="https://example.com">
        Link Button
      </Button>
    );
    
    // Die Komponente rendert ein <a> Element mit role="button"
    const linkButton = screen.getByRole('button', { name: /link button/i });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton.tagName).toBe('A');
    expect(linkButton).toHaveAttribute('href', 'https://example.com');
    expect(linkButton).toHaveClass('btn');
  });
});