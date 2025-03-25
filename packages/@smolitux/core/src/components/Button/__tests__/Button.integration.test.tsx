import React from 'react';
import { render, screen, fireEvent } from '../../../../../../../../test-utils';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

// Mock für den Theme-Context
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Button Integration Tests', () => {
  // Integration mit Formularen
  describe('Form Integration', () => {
    test('submits a form when type="submit"', async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit} data-testid="test-form">
          <input type="text" name="username" defaultValue="testuser" />
          <Button type="submit">Submit Form</Button>
        </form>
      );
      
      await userEvent.click(screen.getByRole('button', { name: /Submit Form/i }));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
    
    test('resets a form when type="reset"', async () => {
      render(
        <form data-testid="test-form">
          <input data-testid="test-input" type="text" defaultValue="initial value" />
          <Button type="reset">Reset Form</Button>
        </form>
      );
      
      const input = screen.getByTestId('test-input');
      await userEvent.clear(input);
      await userEvent.type(input, 'new value');
      expect(input).toHaveValue('new value');
      
      await userEvent.click(screen.getByRole('button', { name: /Reset Form/i }));
      expect(input).toHaveValue('initial value');
    });
    
    test('does not submit form when type="button"', async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <Button type="button">Regular Button</Button>
        </form>
      );
      
      await userEvent.click(screen.getByRole('button', { name: /Regular Button/i }));
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
  
  // Integration mit anderen Komponenten
  describe('Component Integration', () => {
    test('works as a trigger for modal/dialog', async () => {
      const handleOpen = jest.fn();
      
      render(
        <div>
          <Button onClick={handleOpen}>Open Modal</Button>
          <div id="modal" hidden={true}>Modal Content</div>
        </div>
      );
      
      await userEvent.click(screen.getByRole('button', { name: /Open Modal/i }));
      expect(handleOpen).toHaveBeenCalledTimes(1);
    });
    
    test('works with icon components', () => {
      const IconComponent = () => <span data-testid="icon-component">🔍</span>;
      
      render(
        <Button leftIcon={<IconComponent />}>
          With Icon Component
        </Button>
      );
      
      expect(screen.getByTestId('icon-component')).toBeInTheDocument();
    });
  });
  
  // Komplexe Interaktionen
  describe('Complex Interactions', () => {
    test('handles multiple rapid clicks correctly', async () => {
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
    
    test('handles focus and blur events', async () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      
      render(
        <Button onFocus={handleFocus} onBlur={handleBlur}>
          Focus Test
        </Button>
      );
      
      const button = screen.getByRole('button');
      fireEvent.focus(button);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      
      fireEvent.blur(button);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });
});