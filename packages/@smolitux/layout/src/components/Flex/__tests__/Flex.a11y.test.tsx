import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FlexA11y } from '../Flex.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('FlexA11y', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <FlexA11y>
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders with correct semantic element', () => {
    render(
      <FlexA11y as="nav" data-testid="flex-container">
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer.tagName).toBe('NAV');
  });

  it('renders with correct ARIA attributes', () => {
    render(
      <FlexA11y 
        role="navigation" 
        ariaLabel="Main Navigation" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('role', 'navigation');
    expect(flexContainer).toHaveAttribute('aria-label', 'Main Navigation');
  });

  it('renders with correct ARIA expanded state', () => {
    render(
      <FlexA11y 
        ariaExpanded={true} 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders with correct ARIA live region', () => {
    render(
      <FlexA11y 
        ariaLive="polite" 
        ariaAtomic={true} 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-live', 'polite');
    expect(flexContainer).toHaveAttribute('aria-atomic', 'true');
  });

  it('renders with correct tabIndex', () => {
    render(
      <FlexA11y 
        tabIndex={0} 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('tabIndex', '0');
  });

  it('renders with correct ARIA current state', () => {
    render(
      <FlexA11y 
        ariaCurrent="page" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-current', 'page');
  });

  it('renders with correct ARIA level', () => {
    render(
      <FlexA11y 
        ariaLevel={2} 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-level', '2');
  });

  it('renders with correct ARIA position in set', () => {
    render(
      <FlexA11y 
        ariaSetsize={5} 
        ariaPosinset={2} 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-setsize', '5');
    expect(flexContainer).toHaveAttribute('aria-posinset', '2');
  });

  it('renders with correct ARIA role description', () => {
    render(
      <FlexA11y 
        ariaRoledescription="slide" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-roledescription', 'slide');
  });

  it('renders with correct ARIA key shortcuts', () => {
    render(
      <FlexA11y 
        ariaKeyshortcuts="Control+S" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-keyshortcuts', 'Control+S');
  });

  it('renders with correct ARIA owns', () => {
    render(
      <FlexA11y 
        ariaOwns="element-id" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-owns', 'element-id');
  });

  it('renders with correct ARIA controls', () => {
    render(
      <FlexA11y 
        ariaControls="element-id" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-controls', 'element-id');
  });

  it('renders with correct ARIA describedby', () => {
    render(
      <FlexA11y 
        ariaDescribedby="description-id" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-describedby', 'description-id');
  });

  it('renders with correct ARIA labelledby', () => {
    render(
      <FlexA11y 
        ariaLabelledby="label-id" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-labelledby', 'label-id');
  });

  it('renders with correct ARIA hidden', () => {
    render(
      <FlexA11y 
        ariaHidden={true} 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with correct ARIA haspopup', () => {
    render(
      <FlexA11y 
        ariaHaspopup={true} 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-haspopup', 'true');
  });

  it('renders with correct ARIA busy', () => {
    render(
      <FlexA11y 
        ariaBusy={true} 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-busy', 'true');
  });

  it('renders with correct ARIA relevant', () => {
    render(
      <FlexA11y 
        ariaRelevant="additions text" 
        data-testid="flex-container"
      >
        <div>Flex content</div>
      </FlexA11y>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveAttribute('aria-relevant', 'additions text');
  });
});