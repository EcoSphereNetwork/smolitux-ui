import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FormField } from '../FormField';

expect.extend(toHaveNoViolations);

describe('FormField', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(
        <FormField>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <FormField>
          <input type="text" data-testid="test-input" />
        </FormField>
      );
      expect(screen.getByTestId('test-input')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <FormField className="custom-class">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('custom-class');
    });

    it('applies custom styles', () => {
      const customStyle = { backgroundColor: 'red' };
      render(
        <FormField style={customStyle}>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveStyle('background-color: rgb(255, 0, 0)');
    });
  });

  // Label tests
  describe('Label', () => {
    it('renders label when provided', () => {
      render(
        <FormField label="Test Label" id="test-field">
          <input type="text" id="test-field" />
        </FormField>
      );
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('associates label with field using htmlFor', () => {
      render(
        <FormField label="Test Label" id="test-field">
          <input type="text" id="test-field" />
        </FormField>
      );
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'test-field');
    });

    it('generates field ID from name when id is not provided', () => {
      render(
        <FormField label="Test Label" name="test-name">
          <input type="text" />
        </FormField>
      );
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'field-test-name');
    });

    it('shows required indicator when required', () => {
      render(
        <FormField label="Test Label" required>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByLabelText('required')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  // Size variants
  describe('Size variants', () => {
    it('renders medium size by default', () => {
      render(
        <FormField>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--md');
    });

    it('renders extra small size correctly', () => {
      render(
        <FormField size="xs">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--xs');
    });

    it('renders small size correctly', () => {
      render(
        <FormField size="sm">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--sm');
    });

    it('renders large size correctly', () => {
      render(
        <FormField size="lg">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--lg');
    });

    it('renders extra large size correctly', () => {
      render(
        <FormField size="xl">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--xl');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders outline variant by default', () => {
      render(
        <FormField>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--outline');
    });

    it('renders filled variant correctly', () => {
      render(
        <FormField variant="filled">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--filled');
    });

    it('renders flushed variant correctly', () => {
      render(
        <FormField variant="flushed">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--flushed');
    });

    it('renders unstyled variant correctly', () => {
      render(
        <FormField variant="unstyled">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--unstyled');
    });
  });

  // Label placement tests
  describe('Label placement', () => {
    it('renders top placement by default', () => {
      render(
        <FormField label="Test Label">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).not.toHaveClass('form-field--horizontal');
    });

    it('renders left placement correctly', () => {
      render(
        <FormField label="Test Label" labelPlacement="left">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--horizontal');
      expect(screen.getByTestId('FormField')).not.toHaveClass('form-field--reverse');
    });

    it('renders right placement correctly', () => {
      render(
        <FormField label="Test Label" labelPlacement="right">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--horizontal');
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--reverse');
    });

    it('applies label width for horizontal placement', () => {
      render(
        <FormField label="Test Label" labelPlacement="left" labelWidth="200px">
          <input type="text" />
        </FormField>
      );
      const label = screen.getByText('Test Label');
      expect(label).toHaveStyle('width: 200px');
    });

    it('applies numeric label width for horizontal placement', () => {
      render(
        <FormField label="Test Label" labelPlacement="left" labelWidth={150}>
          <input type="text" />
        </FormField>
      );
      const label = screen.getByText('Test Label');
      expect(label).toHaveStyle('width: 150px');
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(
        <FormField disabled>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--disabled');
    });

    it('handles readonly state', () => {
      render(
        <FormField readOnly>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--readonly');
    });

    it('handles loading state', () => {
      render(
        <FormField loading>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--loading');
    });

    it('handles invalid state', () => {
      render(
        <FormField isInvalid>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--invalid');
    });
  });

  // Helper text tests
  describe('Helper text', () => {
    it('renders helper text when provided', () => {
      render(
        <FormField helperText="This is helper text">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders error message when invalid', () => {
      render(
        <FormField isInvalid errorMessage="This is an error">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('prioritizes error message over helper text when invalid', () => {
      render(
        <FormField 
          isInvalid 
          helperText="Helper text" 
          errorMessage="Error message"
        >
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('shows helper text when not invalid', () => {
      render(
        <FormField 
          isInvalid={false} 
          helperText="Helper text" 
          errorMessage="Error message"
        >
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText('Helper text')).toBeInTheDocument();
      expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    });
  });

  // Character counter tests
  describe('Character counter', () => {
    it('renders character counter when enabled', () => {
      render(
        <FormField showCounter maxLength={100} value="Hello">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('/')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('shows 0 characters when no value', () => {
      render(
        <FormField showCounter maxLength={100}>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('applies over-limit class when exceeding maxLength', () => {
      render(
        <FormField showCounter maxLength={5} value="Hello World">
          <input type="text" />
        </FormField>
      );
      const countElement = screen.getByText('11');
      expect(countElement).toHaveClass('form-field__counter--over-limit');
    });

    it('does not render counter when showCounter is false', () => {
      render(
        <FormField showCounter={false} maxLength={100} value="Hello">
          <input type="text" />
        </FormField>
      );
      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });

    it('does not render counter when maxLength is not provided', () => {
      render(
        <FormField showCounter value="Hello">
          <input type="text" />
        </FormField>
      );
      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });
  });

  // Loading indicator tests
  describe('Loading indicator', () => {
    it('renders loading indicator when loading', () => {
      render(
        <FormField loading>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).toHaveClass('form-field--loading');
      expect(document.querySelector('.form-field__loading')).toBeInTheDocument();
    });

    it('does not render loading indicator when not loading', () => {
      render(
        <FormField loading={false}>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByTestId('FormField')).not.toHaveClass('form-field--loading');
      expect(document.querySelector('.form-field__loading')).not.toBeInTheDocument();
    });
  });

  // Ref forwarding tests
  describe('Ref forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <FormField ref={ref}>
          <input type="text" />
        </FormField>
      );
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByTestId('FormField'));
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <FormField label="Test Label" helperText="Helper text" id="test-field">
          <input type="text" id="test-field" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with error state', async () => {
      const { container } = render(
        <FormField 
          label="Test Label" 
          isInvalid 
          errorMessage="Error message"
          id="test-field"
        >
          <input type="text" id="test-field" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with required field', async () => {
      const { container } = render(
        <FormField label="Test Label" required id="test-field">
          <input type="text" id="test-field" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
