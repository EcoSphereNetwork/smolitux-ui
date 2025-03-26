import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { AccordionButton } from './AccordionButton';
import { AccordionPanel } from './AccordionPanel';
import { AccordionIcon } from './AccordionIcon';

describe('Accordion', () => {
  const accordionItems = [
    { title: 'Section 1', content: 'Content for section 1' },
    { title: 'Section 2', content: 'Content for section 2' },
    { title: 'Section 3', content: 'Content for section 3' }
  ];

  it('renders correctly with default props', () => {
    render(
      <Accordion>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
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
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
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
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
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

  it('allows toggling panels with allowToggle prop', () => {
    render(
      <Accordion allowToggle>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // Click on the first section button to expand it
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    
    // Click on the first section button again to collapse it
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
  });

  it('renders with defaultIndex prop', () => {
    render(
      <Accordion defaultIndex={1}>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // The second panel should be expanded by default
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();
  });

  it('renders with multiple defaultIndex values', () => {
    render(
      <Accordion defaultIndex={[0, 2]} allowMultiple>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // The first and third panels should be expanded by default
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 3')).toBeInTheDocument();
  });

  it('renders with controlled index', () => {
    const { rerender } = render(
      <Accordion index={0}>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // The first panel should be expanded
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();
    
    // Update the index prop
    rerender(
      <Accordion index={2}>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // Now the third panel should be expanded
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 3')).toBeInTheDocument();
  });

  it('renders with multiple controlled indices', () => {
    render(
      <Accordion index={[0, 2]} allowMultiple>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // The first and third panels should be expanded
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 3')).toBeInTheDocument();
  });

  it('calls onChange when panel is toggled', () => {
    const handleChange = jest.fn();
    render(
      <Accordion onChange={handleChange}>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // Click on the second section button
    fireEvent.click(screen.getByText('Section 2'));
    
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange with array when multiple panels are toggled', () => {
    const handleChange = jest.fn();
    render(
      <Accordion onChange={handleChange} allowMultiple defaultIndex={[0]}>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // Click on the second section button
    fireEvent.click(screen.getByText('Section 2'));
    
    expect(handleChange).toHaveBeenCalledWith([0, 1]);
  });

  it('renders with custom className', () => {
    render(
      <Accordion className="custom-accordion">
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
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
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveStyle('background-color: lightblue');
    expect(accordion).toHaveStyle('padding: 10px');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Accordion variant="outline">
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    let accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('accordion-outline');
    
    rerender(
      <Accordion variant="filled">
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('accordion-filled');
    
    rerender(
      <Accordion variant="unstyled">
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('accordion-unstyled');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Accordion size="sm">
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    let accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('accordion-sm');
    
    rerender(
      <Accordion size="md">
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('accordion-md');
    
    rerender(
      <Accordion size="lg">
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('accordion-lg');
  });

  it('renders with disabled items', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem isDisabled>
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    const disabledButton = screen.getByText('Section 2');
    expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
    
    // Clicking on the disabled button should not expand the panel
    fireEvent.click(disabledButton);
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(
      <Accordion>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              {item.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
    
    // Focus on the first button
    const firstButton = screen.getByText('Section 1');
    firstButton.focus();
    
    // Press down arrow key to move focus to the next button
    fireEvent.keyDown(firstButton, { key: 'ArrowDown' });
    
    // The second button should now have focus
    expect(screen.getByText('Section 2')).toHaveFocus();
    
    // Press up arrow key to move focus back to the first button
    fireEvent.keyDown(screen.getByText('Section 2'), { key: 'ArrowUp' });
    
    // The first button should now have focus again
    expect(firstButton).toHaveFocus();
    
    // Press space key to expand the panel
    fireEvent.keyDown(firstButton, { key: ' ' });
    
    // The first panel should now be expanded
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
  });

  it('renders with aria attributes', () => {
    render(
      <Accordion aria-label="FAQ accordion">
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveAttribute('aria-label', 'FAQ accordion');
  });
});