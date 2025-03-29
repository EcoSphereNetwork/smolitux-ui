import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';

describe('Accordion Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Accordion>
        <AccordionItem id="item1" title="Section 1">
          Content 1
        </AccordionItem>
        <AccordionItem id="item2" title="Section 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes', () => {
    render(
      <Accordion id="test-accordion">
        <AccordionItem id="item1" title="Section 1">
          Content 1
        </AccordionItem>
        <AccordionItem id="item2" title="Section 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );

    // Accordion should have correct role
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveAttribute('role', 'region');
    expect(accordion).toHaveAttribute('aria-multiselectable', 'false');

    // Buttons should have correct attributes
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[0]).toHaveAttribute('aria-controls', 'accordion-content-item1');
    expect(buttons[0]).toHaveAttribute('id', 'accordion-button-item1');

    // Content regions should have correct attributes
    const regions = screen.getAllByRole('region');
    expect(regions[1]).toHaveAttribute('aria-hidden', 'true');
    expect(regions[1]).toHaveAttribute('aria-labelledby', 'accordion-button-item1');
  });

  it('should support keyboard interaction', () => {
    render(
      <Accordion>
        <AccordionItem id="item1" title="Section 1">
          Content 1
        </AccordionItem>
        <AccordionItem id="item2" title="Section 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );

    const buttons = screen.getAllByRole('button');
    
    // Focus first button
    buttons[0].focus();
    expect(document.activeElement).toBe(buttons[0]);
    
    // Press Enter to expand
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
    fireEvent.click(buttons[0]);
    
    // Check if expanded
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    
    // Tab to content
    fireEvent.keyDown(document.activeElement!, { key: 'Tab' });
    
    // Tab to next button
    fireEvent.keyDown(document.activeElement!, { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[1]);
    
    // Press Space to expand
    fireEvent.keyDown(document.activeElement!, { key: ' ' });
    fireEvent.click(buttons[1]);
    
    // Check if expanded
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('should handle disabled items correctly', () => {
    render(
      <Accordion>
        <AccordionItem id="item1" title="Section 1">
          Content 1
        </AccordionItem>
        <AccordionItem id="item2" title="Section 2" disabled>
          Content 2
        </AccordionItem>
      </Accordion>
    );

    const buttons = screen.getAllByRole('button');
    
    // Second button should be disabled
    expect(buttons[1]).toBeDisabled();
    expect(buttons[1]).toHaveAttribute('aria-disabled', 'true');
    
    // Click on disabled button should not expand
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('should support multiple selection', () => {
    render(
      <Accordion allowMultiple>
        <AccordionItem id="item1" title="Section 1">
          Content 1
        </AccordionItem>
        <AccordionItem id="item2" title="Section 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );

    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveAttribute('aria-multiselectable', 'true');
    
    const buttons = screen.getAllByRole('button');
    
    // Expand first item
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    
    // Expand second item (first should stay expanded)
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('should support descriptions for screenreaders', () => {
    render(
      <Accordion>
        <AccordionItem 
          id="item1" 
          title="Section 1" 
          description="This section contains important information"
        >
          Content 1
        </AccordionItem>
      </Accordion>
    );

    // Description should be in the DOM but visually hidden
    const description = screen.getByText('This section contains important information');
    expect(description).toHaveClass('sr-only');
    
    // Content should reference the description
    const content = screen.getByRole('region');
    expect(content).toHaveAttribute('aria-describedby', 'accordion-description-item1');
  });

  it('should have visible focus indicators', () => {
    render(
      <Accordion>
        <AccordionItem id="item1" title="Section 1">
          Content 1
        </AccordionItem>
      </Accordion>
    );

    const button = screen.getByRole('button');
    
    // Focus button
    button.focus();
    
    // Check for visible focus indicator
    expect(a11y.hasVisibleFocusIndicator(button)).toBe(true);
  });
});