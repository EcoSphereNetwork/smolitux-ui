import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { A11yButton } from '../Button.a11y';

describe('A11yButton', () => {
  test('renders with default props', () => {
    render(<A11yButton>Test Button</A11yButton>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  test('sets aria-label for icon buttons', () => {
    render(
      <A11yButton 
        isIconButton 
        label="Menu Button" 
        leftIcon={<span data-testid="icon">🔍</span>}
      />
    );
    
    const button = screen.getByRole('button', { name: 'Menu Button' });
    expect(button).toHaveAttribute('aria-label', 'Menu Button');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('creates hidden description element when description is provided', () => {
    render(
      <A11yButton 
        description="This action cannot be undone"
      >
        Delete
      </A11yButton>
    );
    
    const button = screen.getByRole('button', { name: 'Delete' });
    const descriptionId = button.getAttribute('aria-describedby');
    expect(descriptionId).toBeTruthy();
    
    const description = document.getElementById(descriptionId as string);
    expect(description).toHaveTextContent('This action cannot be undone');
    expect(description).toHaveAttribute('hidden');
  });

  test('sets aria-expanded for dropdown buttons', () => {
    render(<A11yButton isExpanded={true}>Dropdown</A11yButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  test('sets aria-pressed for toggle buttons', () => {
    render(<A11yButton isPressed={true}>Toggle</A11yButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  test('sets aria-current for current navigation items', () => {
    render(<A11yButton isCurrent={true}>Current Page</A11yButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
  });

  test('sets aria-disabled for disabled buttons', () => {
    render(<A11yButton isDisabled>Disabled</A11yButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('sets aria-busy for loading buttons', () => {
    render(<A11yButton loading>Loading</A11yButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  test('sets aria-controls when controls prop is provided', () => {
    render(<A11yButton controls="dropdown-menu">Open Menu</A11yButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'dropdown-menu');
  });

  test('sets aria-haspopup for menu buttons', () => {
    render(<A11yButton hasMenu>Menu</A11yButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'menu');
  });

  test('sets aria-haspopup for dialog buttons', () => {
    render(<A11yButton hasDialog>Open Dialog</A11yButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  test('sets data-testid for automated testing', () => {
    render(<A11yButton testId="submit-button">Submit</A11yButton>);
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('handles click events', async () => {
    const handleClick = jest.fn();
    render(<A11yButton onClick={handleClick}>Click Me</A11yButton>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    render(<A11yButton isDisabled onClick={handleClick}>Click Me</A11yButton>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('creates a unique ID when not provided', () => {
    render(<A11yButton>Auto ID</A11yButton>);
    expect(screen.getByRole('button').id).toBeTruthy();
  });

  test('uses provided ID when available', () => {
    render(<A11yButton id="custom-id">Custom ID</A11yButton>);
    expect(screen.getByRole('button').id).toBe('custom-id');
  });

  test('creates hidden label element for non-icon buttons with label', () => {
    render(<A11yButton label="Accessible Label">Visible Text</A11yButton>);
    
    const button = screen.getByRole('button', { name: 'Accessible Label' });
    const labelId = button.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    
    const label = document.getElementById(labelId as string);
    expect(label).toHaveTextContent('Accessible Label');
    expect(label).toHaveAttribute('hidden');
  });
});