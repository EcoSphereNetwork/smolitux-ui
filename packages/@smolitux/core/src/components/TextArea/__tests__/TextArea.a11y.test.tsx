import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TextArea } from '../TextArea';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('TextArea Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TextArea 
        label="Message"
        placeholder="Enter your message"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with error state', async () => {
    const { container } = render(
      <TextArea 
        label="Message"
        error="This field is required"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper label association', () => {
    render(<TextArea label="Message" />);
    
    const textarea = screen.getByTestId('textarea');
    const label = screen.getByTestId('textarea-label');
    
    expect(textarea).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', textarea.getAttribute('id'));
  });

  it('should have proper aria-invalid attribute when error is present', () => {
    render(<TextArea error="This field is required" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have proper aria-describedby when helper text is present', () => {
    render(<TextArea helperText="Maximum 500 characters" />);
    
    const textarea = screen.getByTestId('textarea');
    const helperId = textarea.getAttribute('aria-describedby');
    
    expect(helperId).toBeTruthy();
    expect(screen.getByTestId('textarea-helper')).toHaveAttribute('id', helperId);
  });

  it('should have proper aria-describedby when error is present', () => {
    render(<TextArea error="This field is required" />);
    
    const textarea = screen.getByTestId('textarea');
    const errorId = textarea.getAttribute('aria-describedby');
    
    expect(errorId).toBeTruthy();
    expect(screen.getByTestId('textarea-error')).toHaveAttribute('id', errorId);
  });

  it('should have proper aria-describedby when character count is shown', () => {
    render(<TextArea showCount maxLength={500} />);
    
    const textarea = screen.getByTestId('textarea');
    const counterId = textarea.getAttribute('aria-describedby');
    
    expect(counterId).toBeTruthy();
    expect(screen.getByTestId('textarea-counter')).toHaveAttribute('id', counterId);
  });

  it('should have proper aria-required attribute when required', () => {
    render(<TextArea required label="Message" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('required');
    
    // Prüfe, ob das Label einen Stern enthält
    const label = screen.getByTestId('textarea-label');
    expect(label).toHaveTextContent('*');
  });

  it('should be focusable with keyboard navigation', () => {
    render(<TextArea label="Message" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).not.toHaveFocus();
    
    textarea.focus();
    expect(textarea).toHaveFocus();
  });

  it('should handle keyboard events properly', () => {
    const handleKeyDown = jest.fn();
    render(<TextArea onKeyDown={handleKeyDown} />);
    
    const textarea = screen.getByTestId('textarea');
    fireEvent.keyDown(textarea, { key: 'Enter' });
    
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should have proper disabled state for screen readers', () => {
    render(<TextArea disabled label="Message" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('opacity-50');
    expect(textarea).toHaveClass('cursor-not-allowed');
  });

  it('should have proper readonly state for screen readers', () => {
    render(<TextArea readOnly label="Message" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('should have proper aria attributes when provided', () => {
    render(
      <TextArea 
        aria-label="Message input"
        aria-describedby="custom-description"
        aria-details="more-details"
      />
    );
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-label', 'Message input');
    expect(textarea).toHaveAttribute('aria-describedby', 'custom-description');
    expect(textarea).toHaveAttribute('aria-details', 'more-details');
  });
});