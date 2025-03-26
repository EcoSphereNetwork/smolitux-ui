import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion, AccordionItem } from '../';

describe('Accordion', () => {
  it('renders accordion with items', () => {
    render(
      <Accordion>
        <AccordionItem id="0" title="Section 1">Content 1</AccordionItem>
        <AccordionItem id="1" title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('expands item when clicked', () => {
    render(
      <Accordion>
        <AccordionItem id="0" title="Section 1">Content 1</AccordionItem>
        <AccordionItem id="1" title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    
    // Initially content should be hidden
    expect(screen.queryByText('Content 1')).not.toBeVisible();
    
    // Click to expand
    fireEvent.click(screen.getByText('Section 1'));
    
    // Content should now be visible
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('collapses expanded item when clicked again', () => {
    render(
      <Accordion>
        <AccordionItem id="0" title="Section 1">Content 1</AccordionItem>
      </Accordion>
    );
    
    // Click to expand
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeVisible();
    
    // Click again to collapse
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.queryByText('Content 1')).not.toBeVisible();
  });

  it('allows multiple items to be expanded when allowMultiple is true', () => {
    render(
      <Accordion allowMultiple>
        <AccordionItem id="0" title="Section 1">Content 1</AccordionItem>
        <AccordionItem id="1" title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    
    // Expand first item
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeVisible();
    
    // Expand second item
    fireEvent.click(screen.getByText('Section 2'));
    
    // Both should be expanded
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('collapses previously expanded item when allowMultiple is false', () => {
    render(
      <Accordion allowMultiple={false}>
        <AccordionItem id="0" title="Section 1">Content 1</AccordionItem>
        <AccordionItem id="1" title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    
    // Expand first item
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeVisible();
    
    // Expand second item
    fireEvent.click(screen.getByText('Section 2'));
    
    // First item should be collapsed, second expanded
    expect(screen.queryByText('Content 1')).not.toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('renders with defaultOpenItems to pre-expand items', () => {
    render(
      <Accordion defaultOpenItems={["0"]}>
        <AccordionItem id="0" title="Section 1">Content 1</AccordionItem>
        <AccordionItem id="1" title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    
    // First item should be expanded by default
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.queryByText('Content 2')).not.toBeVisible();
  });

  it('renders with multiple defaultOpenItems when allowMultiple is true', () => {
    render(
      <Accordion defaultOpenItems={["0", "1"]} allowMultiple>
        <AccordionItem id="0" title="Section 1">Content 1</AccordionItem>
        <AccordionItem id="1" title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    
    // Both items should be expanded by default
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('renders disabled accordion item', () => {
    render(
      <Accordion>
        <AccordionItem id="0" title="Section 1" disabled>Content 1</AccordionItem>
      </Accordion>
    );
    
    const header = screen.getByText('Section 1').closest('button');
    expect(header).toHaveAttribute('disabled');
    
    // Click should not expand
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.queryByText('Content 1')).not.toBeVisible();
  });

  it('calls onChange when item is toggled', () => {
    const handleChange = jest.fn();
    
    render(
      <Accordion onChange={handleChange}>
        <AccordionItem id="0" title="Section 1">Content 1</AccordionItem>
      </Accordion>
    );
    
    fireEvent.click(screen.getByText('Section 1'));
    expect(handleChange).toHaveBeenCalledWith(["0"]);
    
    fireEvent.click(screen.getByText('Section 1'));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('renders with custom icon', () => {
    render(
      <Accordion>
        <AccordionItem 
          id="0"
          title="Section 1" 
          icon={<span data-testid="custom-icon">+</span>}
        >
          Content 1
        </AccordionItem>
      </Accordion>
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});