import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '@smolitux/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Popover } from '../';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Popover Accessibility', () => {
  // Test für zusätzliche A11y-Funktionen
  it('should support live region announcements', async () => {
    render(
      <Popover.A11y
        content="Popover content"
        ariaLabel="Test popover"
        liveRegion={true}
        announce={true}
      >
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
    fireEvent.click(trigger);

    await waitFor(() => {
      const liveRegion = document.querySelector('[aria-live]');
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      expect(liveRegion).toHaveClass('sr-only');
    });
  });

  it('should support focus trap', async () => {
    render(
      <Popover.A11y
        content={
          <div>
            <button data-testid="first-button">First Button</button>
            <button data-testid="last-button">Last Button</button>
          </div>
        }
        ariaLabel="Test popover"
        trapFocus={true}
        autoFocus={true}
      >
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    // Der erste Button sollte automatisch fokussiert werden
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('first-button'));
    });
  });

  it('should support return focus', async () => {
    render(
      <Popover.A11y content="Popover content" ariaLabel="Test popover" returnFocus={true}>
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
    trigger.focus();
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(document.activeElement).toBe(trigger);
    });
  });
  // Test für die Standard-Popover-Komponente
  it('should have no accessibility violations with standard Popover', async () => {
    const { container } = render(
      <Popover content="Popover content" ariaLabel="Test popover">
        <button>Trigger</button>
      </Popover>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test für die A11y-Version der Popover-Komponente
  it('should have no accessibility violations with A11y Popover', async () => {
    const { container } = render(
      <Popover.A11y content="Popover content" ariaLabel="Test popover">
        <button>Trigger</button>
      </Popover.A11y>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render with correct ARIA attributes on trigger', () => {
    render(
      <Popover.A11y content="Popover content" ariaLabel="Test popover">
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open popover on click and set correct ARIA attributes', async () => {
    render(
      <Popover.A11y content="Popover content" ariaLabel="Test popover">
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
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
      <Popover.A11y content="Popover content" ariaLabel="Test popover">
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
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
        <Popover.A11y content="Popover content" ariaLabel="Test popover">
          <button data-testid="trigger">Trigger</button>
        </Popover.A11y>
        <div data-testid="outside">Outside</div>
      </div>
    );

    const trigger = screen.getByTestId('popover-trigger');
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
      <Popover.A11y content="Popover content" title="Popover Title">
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
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
      <Popover.A11y
        content="Popover content"
        ariaLabel="Test popover"
        description="This is a description for screen readers"
      >
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
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

  it('should handle hover trigger correctly', async () => {
    render(
      <Popover.A11y content="Popover content" ariaLabel="Test popover" trigger="hover">
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
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
      <Popover.A11y content="Popover content" ariaLabel="Test popover" trigger="focus">
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    fireEvent.blur(trigger, { relatedTarget: document.body });
    fireEvent.focus(document.body);
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should handle controlled mode correctly', async () => {
    const handleOpenChange = jest.fn();

    const { rerender } = render(
      <Popover.A11y
        content="Popover content"
        ariaLabel="Test popover"
        isOpen={false}
        onOpenChange={handleOpenChange}
      >
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    rerender(
      <Popover.A11y
        content="Popover content"
        ariaLabel="Test popover"
        isOpen={true}
        onOpenChange={handleOpenChange}
      >
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('should render with arrow correctly', async () => {
    render(
      <Popover.A11y content="Popover content" ariaLabel="Test popover" showArrow={true}>
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    const trigger = screen.getByTestId('popover-trigger');
    fireEvent.click(trigger);

    const arrow = await screen.findByTestId('popover-arrow');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render with different placements and maintain accessibility', async () => {
    const placements: Array<'top' | 'right' | 'bottom' | 'left'> = [
      'top',
      'right',
      'bottom',
      'left',
    ];

    for (const placement of placements) {
      const { unmount } = render(
        <Popover.A11y
          content="Popover content"
          ariaLabel={`${placement} popover`}
          placement={placement}
          isOpen={true}
        >
          <button data-testid="trigger">Trigger</button>
        </Popover.A11y>
      );

      await waitFor(() => {
        const popover = screen.getByRole('tooltip');
        expect(popover).toBeInTheDocument();
        expect(popover).toHaveAttribute('data-placement', placement);
      });

      unmount();
    }
  });

  it('should render close button when showCloseButton is true', async () => {
    render(
      <Popover.A11y content="Popover content" showCloseButton={true}>
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    fireEvent.click(screen.getByTestId('popover-trigger'));

    await waitFor(() => {
      expect(screen.getByTestId('popover-close-button')).toBeInTheDocument();
    });
  });

  it('should close when close button is clicked', async () => {
    render(
      <Popover.A11y showCloseButton={true} trigger="click" content="Popover content">
        <button data-testid="trigger">Trigger</button>
      </Popover.A11y>
    );

    fireEvent.click(screen.getByTestId('popover-trigger'));

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('popover-close-button'));

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
