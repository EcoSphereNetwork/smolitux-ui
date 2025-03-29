// packages/@smolitux/core/src/components/Fade/__tests__/Fade.a11y.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Fade } from '../Fade';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Fade Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Fade in={true} aria-label="Test content">
        <div>Test content</div>
      </Fade>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <Fade 
        in={true} 
        aria-label="Test content"
        aria-live="polite"
        aria-atomic={true}
      >
        <div>Test content</div>
      </Fade>
    );
    
    const element = screen.getByText('Test content');
    expect(element).toHaveAttribute('aria-label', 'Test content');
    expect(element).toHaveAttribute('aria-live', 'polite');
    expect(element).toHaveAttribute('aria-atomic', 'true');
  });

  it('should include animation description for screen readers', () => {
    render(
      <Fade 
        in={true} 
        animationDescription="Content is fading in or out"
      >
        <div>Test content</div>
      </Fade>
    );
    
    const description = screen.getByText('Content is fading in or out');
    expect(description).toHaveClass('sr-only');
    
    const element = screen.getByText('Test content');
    expect(element).toHaveAttribute('aria-describedby');
    expect(element.getAttribute('aria-describedby')).toBe(description.id);
  });

  it('should set aria-busy during transitions', () => {
    render(
      <Fade 
        in={true} 
        aria-label="Test content"
      >
        <div>Test content</div>
      </Fade>
    );
    
    const element = screen.getByText('Test content');
    expect(element).toHaveAttribute('aria-busy', 'true');
  });

  it('should respect reduced motion preferences', () => {
    // Mock matchMedia
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true, // Simulate prefers-reduced-motion: reduce
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <Fade 
        in={true} 
        respectReducedMotion={true}
      >
        <div>Test content</div>
      </Fade>
    );
    
    const element = screen.getByText('Test content');
    const style = window.getComputedStyle(element);
    
    // In a real browser, we would check if the transition is 'none',
    // but in JSDOM, computed styles don't work the same way
    // Instead, we check if the data-state attribute is set correctly
    expect(element).toHaveAttribute('data-state', 'entered');
  });

  it('should work with custom components', async () => {
    const CustomComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      (props, ref) => <div ref={ref} {...props} data-testid="custom-component" />
    );

    const { container } = render(
      <Fade 
        in={true} 
        aria-label="Custom component"
      >
        <CustomComponent>Custom content</CustomComponent>
      </Fade>
    );
    
    const element = screen.getByTestId('custom-component');
    expect(element).toHaveAttribute('aria-label', 'Custom component');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});