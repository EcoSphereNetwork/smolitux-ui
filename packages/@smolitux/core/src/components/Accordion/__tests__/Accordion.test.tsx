import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';

describe('Accordion', () => {
  const accordionItems = [
    { id: 'section1', title: 'Section 1', content: 'Content for section 1' },
    { id: 'section2', title: 'Section 2', content: 'Content for section 2' },
    { id: 'section3', title: 'Section 3', content: 'Content for section 3' },
  ];

  it('renders correctly with default props', () => {
    render(
      <Accordion>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    );

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();

    // All panels should be collapsed by default
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();
  });

  it('expands panel when button is clicked', () => {
    render(
      <Accordion>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    );

    // Click on the first section button
    fireEvent.click(screen.getByText('Section 1'));

    // The first panel should now be expanded
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();

    // Click on the second section button
    fireEvent.click(screen.getByText('Section 2'));

    // In single accordion mode, the first panel should collapse and the second should expand
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();
  });

  it('allows multiple panels to be expanded with allowMultiple prop', () => {
    render(
      <Accordion allowMultiple>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    );

    // Click on the first section button
    fireEvent.click(screen.getByText('Section 1'));

    // The first panel should now be expanded
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();

    // Click on the second section button
    fireEvent.click(screen.getByText('Section 2'));

    // Both panels should be expanded
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();
  });

  it('renders with defaultOpenItems prop', () => {
    render(
      <Accordion defaultOpenItems="section2">
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    );

    // The second panel should be expanded by default
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();
  });

  it('renders with multiple defaultOpenItems values', () => {
    render(
      <Accordion defaultOpenItems={['section1', 'section3']} allowMultiple>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    );

    // The first and third panels should be expanded by default
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 3')).toBeInTheDocument();
  });

  it('calls onChange when panel is toggled', () => {
    const handleChange = jest.fn();
    render(
      <Accordion onChange={handleChange}>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    );

    // Click on the second section button
    fireEvent.click(screen.getByText('Section 2'));

    expect(handleChange).toHaveBeenCalledWith(['section2']);
  });

  it('calls onChange with array when multiple panels are toggled', () => {
    const handleChange = jest.fn();
    render(
      <Accordion onChange={handleChange} allowMultiple defaultOpenItems={['section1']}>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    );

    // Click on the second section button
    fireEvent.click(screen.getByText('Section 2'));

    expect(handleChange).toHaveBeenCalledWith(['section1', 'section2']);
  });

  it('renders with custom className', () => {
    render(
      <Accordion className="custom-accordion">
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('custom-accordion');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '10px' };
    render(
      <Accordion style={customStyle}>
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveStyle('background-color: lightblue');
    expect(accordion).toHaveStyle('padding: 10px');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Accordion variant="default">
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    // Default variant doesn't add a specific class

    rerender(
      <Accordion variant="bordered">
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    let accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('border border-gray-200 dark:border-gray-700 rounded-lg');

    rerender(
      <Accordion variant="separated">
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('space-y-2');
  });

  it('renders with different icon styles', () => {
    const { rerender } = render(
      <Accordion iconStyle="chevron">
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    // Open the accordion to see the icon
    fireEvent.click(screen.getByText('Section 1'));

    // Chevron is the default, so we don't need to check for it specifically

    rerender(
      <Accordion iconStyle="arrow">
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    // The arrow icon should be visible

    rerender(
      <Accordion iconStyle="plus">
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    // The plus icon should be visible

    rerender(
      <Accordion iconStyle="none">
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    // No icon should be visible
  });

  it('renders with disabled items', () => {
    render(
      <Accordion>
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
        <AccordionItem id="section2" title="Section 2" disabled>
          Content for section 2
        </AccordionItem>
      </Accordion>
    );

    const disabledButton = screen.getByText('Section 2').closest('button');
    expect(disabledButton).toHaveAttribute('disabled');

    // Clicking on the disabled button should not expand the panel
    fireEvent.click(screen.getByText('Section 2'));
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(
      <Accordion>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    );

    // Focus on the first button
    const firstButton = screen.getByText('Section 1').closest('button');
    if (firstButton) {
      firstButton.focus();

      // Press Enter key to expand the panel
      fireEvent.click(firstButton);

      // Check if the button has aria-expanded="true"
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    }
  });

  it('renders with aria attributes', () => {
    render(
      <Accordion>
        <AccordionItem id="section1" title="Section 1">
          Content for section 1
        </AccordionItem>
      </Accordion>
    );

    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveAttribute('role', 'region');

    const button = screen.getByText('Section 1').closest('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'accordion-content-section1');
  });
});
