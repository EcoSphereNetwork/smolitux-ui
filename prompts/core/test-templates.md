# Smolitux UI - Test Templates

This document provides reusable templates for testing components. These templates can be combined and customized for specific component types and packages.

## Basic Component Test Template

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Component } from './Component';

expect.extend(toHaveNoViolations);

describe('Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<Component>Custom Content</Component>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Component className="custom-class">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('custom-class');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--primary');
    });

    it('renders secondary variant correctly', () => {
      render(<Component variant="secondary">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--secondary');
    });

    it('renders danger variant correctly', () => {
      render(<Component variant="danger">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--danger');
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--md');
    });

    it('renders small size correctly', () => {
      render(<Component size="sm">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--sm');
    });

    it('renders large size correctly', () => {
      render(<Component size="lg">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--lg');
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Component disabled>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--disabled');
      expect(screen.getByTestId('Component')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Component onClick={handleClick}>Test</Component>);

      await user.click(screen.getByTestId('Component'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Component onClick={handleClick} disabled>Test</Component>);

      await user.click(screen.getByTestId('Component'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Component ref={ref}>Test</Component>);
      expect(ref.current).not.toBeNull();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Component>Test</Component>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports ARIA labels', () => {
      render(<Component aria-label="Custom Label">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveAttribute('aria-label', 'Custom Label');
    });
  });
});
```

## Form Component Test Template

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FormComponent } from './FormComponent';

expect.extend(toHaveNoViolations);

describe('FormComponent', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<FormComponent />);
      expect(screen.getByTestId('FormComponent')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<FormComponent label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<FormComponent placeholder="Test Placeholder" />);
      expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<FormComponent className="custom-class" />);
      expect(screen.getByTestId('FormComponent').parentElement).toHaveClass('custom-class');
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<FormComponent disabled />);
      expect(screen.getByTestId('FormComponent')).toBeDisabled();
      expect(screen.getByTestId('FormComponent').parentElement).toHaveClass('form-component--disabled');
    });

    it('handles required state', () => {
      render(<FormComponent label="Test Label" required />);
      expect(screen.getByTestId('FormComponent')).toBeRequired();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('handles error state', () => {
      render(<FormComponent error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.getByTestId('FormComponent').parentElement).toHaveClass('form-component--error');
      expect(screen.getByTestId('FormComponent')).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders helper text when provided', () => {
      render(<FormComponent helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('prioritizes error over helper text', () => {
      render(<FormComponent error="Error message" helperText="Helper text" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  // Controlled vs Uncontrolled tests
  describe('Controlled vs Uncontrolled', () => {
    it('works as a controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const { rerender } = render(
        <FormComponent value="initial" onChange={handleChange} />
      );

      const input = screen.getByTestId('FormComponent');
      expect(input).toHaveValue('initial');

      await user.type(input, 'x');
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(input).toHaveValue('initial'); // Value doesn't change without rerender

      rerender(<FormComponent value="updated" onChange={handleChange} />);
      expect(input).toHaveValue('updated');
    });

    it('works as an uncontrolled component', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<FormComponent defaultValue="initial" onChange={handleChange} />);

      const input = screen.getByTestId('FormComponent');
      expect(input).toHaveValue('initial');

      await user.clear(input);
      await user.type(input, 'updated');
      
      expect(handleChange).toHaveBeenCalledTimes('updated'.length + 1); // +1 for clear
      expect(input).toHaveValue('updated');
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles change events', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<FormComponent onChange={handleChange} />);

      const input = screen.getByTestId('FormComponent');
      await user.type(input, 'test');
      
      expect(handleChange).toHaveBeenCalledTimes(4); // Once per character
      expect(handleChange).toHaveBeenLastCalledWith('test', expect.anything());
    });

    it('handles blur events', async () => {
      const user = userEvent.setup();
      const handleBlur = jest.fn();
      render(<FormComponent onBlur={handleBlur} />);

      const input = screen.getByTestId('FormComponent');
      await user.click(input);
      await user.tab();
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles focus events', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      render(<FormComponent onFocus={handleFocus} />);

      const input = screen.getByTestId('FormComponent');
      await user.click(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<FormComponent ref={ref} />);
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<FormComponent label="Test Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('associates label with input', () => {
      render(<FormComponent label="Test Label" />);
      const input = screen.getByTestId('FormComponent');
      const inputId = input.getAttribute('id');
      const label = screen.getByText('Test Label');
      
      expect(inputId).toBeTruthy();
      expect(label).toHaveAttribute('for', inputId);
    });

    it('supports ARIA labels', () => {
      render(<FormComponent aria-label="Custom Label" />);
      expect(screen.getByTestId('FormComponent')).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('associates error message with input', () => {
      render(<FormComponent error="Error message" />);
      const input = screen.getByTestId('FormComponent');
      const errorId = screen.getByText('Error message').getAttribute('id');
      
      expect(errorId).toBeTruthy();
      expect(input).toHaveAttribute('aria-describedby', errorId);
    });

    it('associates helper text with input', () => {
      render(<FormComponent helperText="Helper text" />);
      const input = screen.getByTestId('FormComponent');
      const helperId = screen.getByText('Helper text').getAttribute('id');
      
      expect(helperId).toBeTruthy();
      expect(input).toHaveAttribute('aria-describedby', helperId);
    });
  });
});
```

## Interactive Component Test Template

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { InteractiveComponent } from './InteractiveComponent';

expect.extend(toHaveNoViolations);

describe('InteractiveComponent', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<InteractiveComponent>Test</InteractiveComponent>);
      expect(screen.getByTestId('InteractiveComponent')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<InteractiveComponent>Custom Content</InteractiveComponent>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<InteractiveComponent className="custom-class">Test</InteractiveComponent>);
      expect(screen.getByTestId('InteractiveComponent')).toHaveClass('custom-class');
    });
  });

  // State tests
  describe('States', () => {
    it('is collapsed by default', () => {
      render(<InteractiveComponent>Test</InteractiveComponent>);
      expect(screen.getByTestId('InteractiveComponent')).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByTestId('InteractiveComponent')).not.toHaveClass('interactive-component--expanded');
    });

    it('can be expanded by default', () => {
      render(<InteractiveComponent defaultExpanded>Test</InteractiveComponent>);
      expect(screen.getByTestId('InteractiveComponent')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('InteractiveComponent')).toHaveClass('interactive-component--expanded');
    });

    it('handles disabled state', () => {
      render(<InteractiveComponent disabled>Test</InteractiveComponent>);
      expect(screen.getByTestId('InteractiveComponent')).toHaveAttribute('aria-disabled', 'true');
      expect(screen.getByTestId('InteractiveComponent')).toHaveClass('interactive-component--disabled');
      expect(screen.getByTestId('InteractiveComponent')).toHaveAttribute('tabIndex', '-1');
    });
  });

  // Controlled vs Uncontrolled tests
  describe('Controlled vs Uncontrolled', () => {
    it('works as a controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const { rerender } = render(
        <InteractiveComponent expanded={false} onChange={handleChange}>Test</InteractiveComponent>
      );

      const component = screen.getByTestId('InteractiveComponent');
      expect(component).toHaveAttribute('aria-expanded', 'false');

      await user.click(component);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
      expect(component).toHaveAttribute('aria-expanded', 'false'); // Still false until rerender

      rerender(<InteractiveComponent expanded={true} onChange={handleChange}>Test</InteractiveComponent>);
      expect(component).toHaveAttribute('aria-expanded', 'true');
    });

    it('works as an uncontrolled component', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<InteractiveComponent defaultExpanded={false} onChange={handleChange}>Test</InteractiveComponent>);

      const component = screen.getByTestId('InteractiveComponent');
      expect(component).toHaveAttribute('aria-expanded', 'false');

      await user.click(component);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
      expect(component).toHaveAttribute('aria-expanded', 'true'); // Changes immediately
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('toggles on click', async () => {
      const user = userEvent.setup();
      render(<InteractiveComponent>Test</InteractiveComponent>);

      const component = screen.getByTestId('InteractiveComponent');
      expect(component).toHaveAttribute('aria-expanded', 'false');

      await user.click(component);
      expect(component).toHaveAttribute('aria-expanded', 'true');

      await user.click(component);
      expect(component).toHaveAttribute('aria-expanded', 'false');
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<InteractiveComponent disabled onChange={handleChange}>Test</InteractiveComponent>);

      const component = screen.getByTestId('InteractiveComponent');
      await user.click(component);
      
      expect(handleChange).not.toHaveBeenCalled();
      expect(component).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggles on Enter key', async () => {
      const user = userEvent.setup();
      render(<InteractiveComponent>Test</InteractiveComponent>);

      const component = screen.getByTestId('InteractiveComponent');
      component.focus();
      await user.keyboard('{Enter}');
      
      expect(component).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles on Space key', async () => {
      const user = userEvent.setup();
      render(<InteractiveComponent>Test</InteractiveComponent>);

      const component = screen.getByTestId('InteractiveComponent');
      component.focus();
      await user.keyboard(' ');
      
      expect(component).toHaveAttribute('aria-expanded', 'true');
    });

    it('calls onClick handler', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<InteractiveComponent onClick={handleClick}>Test</InteractiveComponent>);

      const component = screen.getByTestId('InteractiveComponent');
      await user.click(component);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onKeyDown handler', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      render(<InteractiveComponent onKeyDown={handleKeyDown}>Test</InteractiveComponent>);

      const component = screen.getByTestId('InteractiveComponent');
      component.focus();
      await user.keyboard('{Enter}');
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<InteractiveComponent ref={ref}>Test</InteractiveComponent>);
      expect(ref.current).not.toBeNull();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<InteractiveComponent>Test</InteractiveComponent>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has correct ARIA attributes', () => {
      render(<InteractiveComponent>Test</InteractiveComponent>);
      const component = screen.getByTestId('InteractiveComponent');
      
      expect(component).toHaveAttribute('role', 'button');
      expect(component).toHaveAttribute('tabIndex', '0');
      expect(component).toHaveAttribute('aria-expanded', 'false');
      expect(component).toHaveAttribute('aria-controls');
    });

    it('supports ARIA labels', () => {
      render(<InteractiveComponent aria-label="Custom Label">Test</InteractiveComponent>);
      expect(screen.getByTestId('InteractiveComponent')).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('associates content with trigger', () => {
      render(<InteractiveComponent>Test</InteractiveComponent>);
      const component = screen.getByTestId('InteractiveComponent');
      const contentId = component.getAttribute('aria-controls');
      const content = document.getElementById(contentId || '');
      
      expect(contentId).toBeTruthy();
      expect(content).not.toBeNull();
    });
  });
});
```

## Data Component Test Template

```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DataComponent } from './DataComponent';

expect.extend(toHaveNoViolations);

describe('DataComponent', () => {
  // Test data
  const testData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<DataComponent data={[]} />);
      expect(screen.getByTestId('DataComponent')).toBeInTheDocument();
    });

    it('renders data correctly', () => {
      render(<DataComponent data={testData} />);
      testData.forEach(item => {
        expect(screen.getByText(JSON.stringify(item))).toBeInTheDocument();
      });
    });

    it('renders with custom renderItem', () => {
      render(
        <DataComponent
          data={testData}
          renderItem={(item) => <div key={item.id}>{item.name}</div>}
        />
      );
      
      testData.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });

    it('applies custom className', () => {
      render(<DataComponent data={[]} className="custom-class" />);
      expect(screen.getByTestId('DataComponent')).toHaveClass('custom-class');
    });
  });

  // State tests
  describe('States', () => {
    it('renders loading state', () => {
      render(<DataComponent data={[]} loading />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByTestId('DataComponent')).toHaveClass('data-component--loading');
      expect(screen.getByTestId('DataComponent')).toHaveAttribute('aria-busy', 'true');
    });

    it('renders error state', () => {
      render(<DataComponent data={[]} error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.getByTestId('DataComponent')).toHaveClass('data-component--error');
    });

    it('renders empty state', () => {
      render(<DataComponent data={[]} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
      expect(screen.getByTestId('DataComponent')).toHaveClass('data-component--empty');
    });

    it('renders custom empty message', () => {
      render(<DataComponent data={[]} emptyMessage="Nothing to see here" />);
      expect(screen.getByText('Nothing to see here')).toBeInTheDocument();
    });

    it('prioritizes loading over error and empty', () => {
      render(<DataComponent data={[]} loading error="Error message" />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Error message')).not.toBeInTheDocument();
      expect(screen.queryByText('No data available')).not.toBeInTheDocument();
    });

    it('prioritizes error over empty', () => {
      render(<DataComponent data={[]} error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('No data available')).not.toBeInTheDocument();
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<DataComponent data={[]} ref={ref} />);
      expect(ref.current).not.toBeNull();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DataComponent data={testData} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports ARIA labels', () => {
      render(<DataComponent data={[]} aria-label="Custom Label" />);
      expect(screen.getByTestId('DataComponent')).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('supports ARIA live regions', () => {
      render(<DataComponent data={[]} aria-live="assertive" />);
      expect(screen.getByTestId('DataComponent')).toHaveAttribute('aria-live', 'assertive');
    });

    it('has error with role="alert"', () => {
      render(<DataComponent data={[]} error="Error message" />);
      const errorElement = screen.getByText('Error message');
      expect(errorElement).toHaveAttribute('role', 'alert');
    });

    it('has loading with aria-live="polite"', () => {
      render(<DataComponent data={[]} loading />);
      const loadingElement = screen.getByText('Loading...');
      expect(loadingElement).toHaveAttribute('aria-live', 'polite');
    });
  });
});
```

## AI Component Test Template

```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AIComponent } from './AIComponent';

expect.extend(toHaveNoViolations);

// Mock the analyzeContent function
jest.mock('./ai-services', () => ({
  analyzeContent: jest.fn().mockResolvedValue({
    sentiment: 0.8,
    sentimentLabel: 'positive',
    confidence: 0.9,
    entities: ['Entity1', 'Entity2'],
    topics: ['Topic1', 'Topic2'],
  }),
}));

describe('AIComponent', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<AIComponent />);
      expect(screen.getByTestId('AIComponent')).toBeInTheDocument();
    });

    it('renders content when provided', () => {
      render(<AIComponent content="Test content" />);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<AIComponent className="custom-class" />);
      expect(screen.getByTestId('AIComponent')).toHaveClass('custom-class');
    });
  });

  // State tests
  describe('States', () => {
    it('shows analyze button when not auto-analyzing', () => {
      render(<AIComponent content="Test content" />);
      expect(screen.getByRole('button', { name: /analyze/i })).toBeInTheDocument();
    });

    it('does not show analyze button when auto-analyzing', () => {
      render(<AIComponent content="Test content" autoAnalyze />);
      expect(screen.queryByRole('button', { name: /analyze/i })).not.toBeInTheDocument();
    });

    it('disables analyze button when no content', () => {
      render(<AIComponent />);
      expect(screen.getByRole('button', { name: /analyze/i })).toBeDisabled();
    });

    it('disables analyze button during analysis', async () => {
      const user = userEvent.setup();
      render(<AIComponent content="Test content" />);
      
      const button = screen.getByRole('button', { name: /analyze/i });
      await user.click(button);
      
      expect(screen.getByText(/analyzing/i)).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('analyzes content on button click', async () => {
      const user = userEvent.setup();
      const handleAnalysisComplete = jest.fn();
      render(
        <AIComponent 
          content="Test content" 
          onAnalysisComplete={handleAnalysisComplete}
        />
      );
      
      await user.click(screen.getByRole('button', { name: /analyze/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/sentiment:/i)).toBeInTheDocument();
      });
      
      expect(handleAnalysisComplete).toHaveBeenCalledTimes(1);
      expect(handleAnalysisComplete).toHaveBeenCalledWith(expect.objectContaining({
        sentiment: expect.any(Number),
        sentimentLabel: expect.any(String),
        confidence: expect.any(Number),
      }));
    });

    it('auto-analyzes when autoAnalyze is true', async () => {
      const handleAnalysisComplete = jest.fn();
      render(
        <AIComponent 
          content="Test content" 
          autoAnalyze 
          onAnalysisComplete={handleAnalysisComplete}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText(/sentiment:/i)).toBeInTheDocument();
      });
      
      expect(handleAnalysisComplete).toHaveBeenCalledTimes(1);
    });

    it('re-analyzes when content changes and autoAnalyze is true', async () => {
      const handleAnalysisComplete = jest.fn();
      const { rerender } = render(
        <AIComponent 
          content="Test content" 
          autoAnalyze 
          onAnalysisComplete={handleAnalysisComplete}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText(/sentiment:/i)).toBeInTheDocument();
      });
      
      rerender(
        <AIComponent 
          content="New content" 
          autoAnalyze 
          onAnalysisComplete={handleAnalysisComplete}
        />
      );
      
      await waitFor(() => {
        expect(handleAnalysisComplete).toHaveBeenCalledTimes(2);
      });
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    beforeEach(() => {
      // Mock a failed analysis
      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(global, 'setTimeout').mockImplementation((callback) => {
        callback();
        return 0 as any;
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('handles analysis errors', async () => {
      // Mock the analyzeContent function to reject
      jest.mock('./ai-services', () => ({
        analyzeContent: jest.fn().mockRejectedValue(new Error('Analysis failed')),
      }));

      const user = userEvent.setup();
      render(<AIComponent content="Test content" />);
      
      await user.click(screen.getByRole('button', { name: /analyze/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/analysis failed/i)).toBeInTheDocument();
      });
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<AIComponent ref={ref} />);
      expect(ref.current).not.toBeNull();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<AIComponent content="Test content" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports ARIA labels', () => {
      render(<AIComponent aria-label="Custom Label" />);
      expect(screen.getByTestId('AIComponent')).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('has loading with aria-busy="true"', async () => {
      const user = userEvent.setup();
      render(<AIComponent content="Test content" />);
      
      await user.click(screen.getByRole('button', { name: /analyze/i }));
      
      expect(screen.getByTestId('AIComponent')).toHaveAttribute('aria-busy', 'true');
    });

    it('has result with aria-live="polite"', async () => {
      const user = userEvent.setup();
      render(<AIComponent content="Test content" />);
      
      await user.click(screen.getByRole('button', { name: /analyze/i }));
      
      await waitFor(() => {
        const resultElement = screen.getByText(/analysis result/i).parentElement;
        expect(resultElement).toHaveAttribute('aria-live', 'polite');
      });
    });

    it('has error with role="alert"', async () => {
      // Mock the analyzeContent function to reject
      jest.mock('./ai-services', () => ({
        analyzeContent: jest.fn().mockRejectedValue(new Error('Analysis failed')),
      }));

      const user = userEvent.setup();
      render(<AIComponent content="Test content" />);
      
      await user.click(screen.getByRole('button', { name: /analyze/i }));
      
      await waitFor(() => {
        const errorElement = screen.getByText(/analysis failed/i);
        expect(errorElement).toHaveAttribute('role', 'alert');
      });
    });
  });
});
```

## Blockchain Component Test Template

```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BlockchainComponent } from './BlockchainComponent';

expect.extend(toHaveNoViolations);

// Mock the connectWallet function
jest.mock('./wallet-services', () => ({
  connectWallet: jest.fn().mockResolvedValue({
    connected: true,
    address: '0x742d35Cc6634C0532925a3b8D563d7C0Aae1ce0F',
    balance: '1.5',
    networkId: 1,
  }),
}));

describe('BlockchainComponent', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<BlockchainComponent />);
      expect(screen.getByTestId('BlockchainComponent')).toBeInTheDocument();
    });

    it('renders connect button by default', () => {
      render(<BlockchainComponent />);
      expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<BlockchainComponent className="custom-class" />);
      expect(screen.getByTestId('BlockchainComponent')).toHaveClass('custom-class');
    });
  });

  // State tests
  describe('States', () => {
    it('shows connecting state during connection', async () => {
      const user = userEvent.setup();
      render(<BlockchainComponent />);
      
      await user.click(screen.getByRole('button', { name: /connect wallet/i }));
      
      expect(screen.getByText(/connecting to wallet/i)).toBeInTheDocument();
      expect(screen.getByTestId('BlockchainComponent')).toHaveClass('blockchain-component--connecting');
      expect(screen.getByTestId('BlockchainComponent')).toHaveAttribute('aria-busy', 'true');
    });

    it('shows connected state after successful connection', async () => {
      const user = userEvent.setup();
      render(<BlockchainComponent />);
      
      await user.click(screen.getByRole('button', { name: /connect wallet/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/0x742d35...aae1ce0f/i)).toBeInTheDocument();
      });
      
      expect(screen.getByText(/1.5 eth/i)).toBeInTheDocument();
      expect(screen.getByText(/mainnet/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /disconnect/i })).toBeInTheDocument();
      expect(screen.getByTestId('BlockchainComponent')).toHaveClass('blockchain-component--connected');
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('connects wallet on button click', async () => {
      const user = userEvent.setup();
      const handleConnectionChange = jest.fn();
      render(<BlockchainComponent onConnectionChange={handleConnectionChange} />);
      
      await user.click(screen.getByRole('button', { name: /connect wallet/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/0x742d35...aae1ce0f/i)).toBeInTheDocument();
      });
      
      expect(handleConnectionChange).toHaveBeenCalledTimes(1);
      expect(handleConnectionChange).toHaveBeenCalledWith(true);
    });

    it('disconnects wallet on disconnect button click', async () => {
      const user = userEvent.setup();
      const handleConnectionChange = jest.fn();
      render(<BlockchainComponent onConnectionChange={handleConnectionChange} />);
      
      await user.click(screen.getByRole('button', { name: /connect wallet/i }));
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /disconnect/i })).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('button', { name: /disconnect/i }));
      
      expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument();
      expect(handleConnectionChange).toHaveBeenCalledTimes(2);
      expect(handleConnectionChange).toHaveBeenLastCalledWith(false);
    });

    it('auto-connects when autoConnect is true', async () => {
      const handleConnectionChange = jest.fn();
      render(<BlockchainComponent autoConnect onConnectionChange={handleConnectionChange} />);
      
      await waitFor(() => {
        expect(screen.getByText(/0x742d35...aae1ce0f/i)).toBeInTheDocument();
      });
      
      expect(handleConnectionChange).toHaveBeenCalledTimes(1);
      expect(handleConnectionChange).toHaveBeenCalledWith(true);
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    beforeEach(() => {
      // Reset the mock
      jest.resetAllMocks();
      
      // Mock a failed connection
      const { connectWallet } = require('./wallet-services');
      connectWallet.mockRejectedValue(new Error('Failed to connect wallet'));
    });

    it('handles connection errors', async () => {
      const user = userEvent.setup();
      const handleConnectionChange = jest.fn();
      render(<BlockchainComponent onConnectionChange={handleConnectionChange} />);
      
      await user.click(screen.getByRole('button', { name: /connect wallet/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/failed to connect wallet/i)).toBeInTheDocument();
      });
      
      expect(screen.getByTestId('BlockchainComponent')).toHaveClass('blockchain-component--has-error');
      expect(handleConnectionChange).toHaveBeenCalledTimes(1);
      expect(handleConnectionChange).toHaveBeenCalledWith(false);
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<BlockchainComponent ref={ref} />);
      expect(ref.current).not.toBeNull();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<BlockchainComponent />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports ARIA labels', () => {
      render(<BlockchainComponent aria-label="Custom Label" />);
      expect(screen.getByTestId('BlockchainComponent')).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('has connecting state with aria-busy="true"', async () => {
      const user = userEvent.setup();
      render(<BlockchainComponent />);
      
      await user.click(screen.getByRole('button', { name: /connect wallet/i }));
      
      expect(screen.getByTestId('BlockchainComponent')).toHaveAttribute('aria-busy', 'true');
    });

    it('has error with role="alert"', async () => {
      // Mock a failed connection
      jest.resetAllMocks();
      const { connectWallet } = require('./wallet-services');
      connectWallet.mockRejectedValue(new Error('Failed to connect wallet'));

      const user = userEvent.setup();
      render(<BlockchainComponent />);
      
      await user.click(screen.getByRole('button', { name: /connect wallet/i }));
      
      await waitFor(() => {
        const errorElement = screen.getByText(/failed to connect wallet/i);
        expect(errorElement).toHaveAttribute('role', 'alert');
      });
    });

    it('has wallet info with aria-live="polite"', async () => {
      const user = userEvent.setup();
      render(<BlockchainComponent />);
      
      await user.click(screen.getByRole('button', { name: /connect wallet/i }));
      
      await waitFor(() => {
        const walletElement = screen.getByText(/0x742d35...aae1ce0f/i).parentElement;
        expect(walletElement).toHaveAttribute('aria-live', 'polite');
      });
    });
  });
});
```

These templates provide a solid foundation for testing various component types in the Smolitux UI library. They can be customized and extended as needed for specific requirements.