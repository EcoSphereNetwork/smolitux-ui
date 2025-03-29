import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PopoverA11y } from '../Popover.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Popover Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
      >
        <button>Trigger</button>
      </PopoverA11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render with correct ARIA attributes on trigger', () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open popover on click and set correct ARIA attributes', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-controls');
      
      const popover = screen.getByRole('tooltip');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveAttribute('aria-label', 'Test popover');
    });
  });

  it('should close popover on Escape key', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('should close popover on click outside', async () => {
    render(
      <div>
        <PopoverA11y 
          content="Popover content"
          ariaLabel="Test popover"
        >
          <button data-testid="trigger">Trigger</button>
        </PopoverA11y>
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should render with title and set correct ARIA attributes', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        title="Popover Title"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      const popover = screen.getByRole('tooltip');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveAttribute('aria-labelledby');
      
      const titleId = popover.getAttribute('aria-labelledby');
      const title = document.getElementById(titleId as string);
      expect(title).toHaveTextContent('Popover Title');
    });
  });

  it('should render with description for screen readers', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        description="This is a description for screen readers"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      const popover = screen.getByRole('tooltip');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveAttribute('aria-describedby');
      
      const descriptionId = popover.getAttribute('aria-describedby');
      const description = document.getElementById(descriptionId as string);
      expect(description).toHaveTextContent('This is a description for screen readers');
      expect(description).toHaveClass('sr-only');
    });
  });

  it('should render with live region for announcements', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        liveRegion
        announce
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const liveRegion = screen.getByRole('button').parentElement?.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should handle hover trigger correctly', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        trigger="hover"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    fireEvent.mouseLeave(trigger);
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should handle focus trigger correctly', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        trigger="focus"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.focus(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    fireEvent.blur(trigger);
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should handle controlled mode correctly', async () => {
    const handleOpenChange = jest.fn();
    
    const { rerender } = render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        isOpen={false}
        onOpenChange={handleOpenChange}
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    rerender(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        isOpen={true}
        onOpenChange={handleOpenChange}
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('should handle custom role correctly', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        role="dialog"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      const popover = screen.getByRole('dialog');
      expect(popover).toBeInTheDocument();
    });
  });

  it('should handle aria-modal correctly', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        ariaModal={true}
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      const popover = screen.getByRole('tooltip');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveAttribute('aria-modal', 'true');
    });
  });

  it('should handle custom aria attributes correctly', async () => {
    render(
      <PopoverA11y 
        content="Popover content"
        ariaLabel="Test popover"
        ariaLive="assertive"
        ariaAtomic={true}
        ariaRelevant="additions text"
        ariaBusy={true}
        ariaRoledescription="custom popover"
      >
        <button data-testid="trigger">Trigger</button>
      </PopoverA11y>
    );
    
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      const popover = screen.getByRole('tooltip');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveAttribute('aria-live', 'assertive');
      expect(popover).toHaveAttribute('aria-atomic', 'true');
      expect(popover).toHaveAttribute('aria-relevant', 'additions text');
      expect(popover).toHaveAttribute('aria-busy', 'true');
      expect(popover).toHaveAttribute('aria-roledescription', 'custom popover');
    });
  });
});