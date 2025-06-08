import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ZoomA11y } from '../Zoom.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Zoom Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ZoomA11y in={true} scale={0.5}>
        <div>Zoom content</div>
      </ZoomA11y>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render with correct ARIA attributes', () => {
    render(
      <ZoomA11y
        in={true}
        scale={0.5}
        ariaLabel="Zooming content"
        ariaLive="polite"
        ariaAtomic={true}
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    const zoomContainer = screen.getByTestId('zoom-content').parentElement;
    expect(zoomContainer).toHaveAttribute('aria-label', 'Zooming content');
    expect(zoomContainer).toHaveAttribute('aria-live', 'polite');
    expect(zoomContainer).toHaveAttribute('aria-atomic', 'true');
  });

  it('should render with custom element type', () => {
    render(
      <ZoomA11y in={true} scale={0.5} as="section" ariaLabel="Zooming section">
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    const zoomContainer = screen.getByTestId('zoom-content').parentElement;
    expect(zoomContainer?.tagName).toBe('SECTION');
  });

  it('should announce animation for screen readers', () => {
    render(
      <ZoomA11y
        in={true}
        scale={0.5}
        announceAnimation
        enterAnnouncement="Content is being shown"
        ariaLive="polite"
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    const announcement = screen.getByText('Content is being shown');
    expect(announcement).toHaveClass('sr-only');
    expect(announcement).toHaveAttribute('aria-live', 'polite');
    expect(announcement).toHaveAttribute('aria-atomic', 'true');
  });

  it('should announce exit animation for screen readers', async () => {
    const { rerender } = render(
      <ZoomA11y
        in={true}
        scale={0.5}
        announceAnimation
        exitAnnouncement="Content is being hidden"
        ariaLive="polite"
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    // Change to exiting state
    rerender(
      <ZoomA11y
        in={false}
        scale={0.5}
        announceAnimation
        exitAnnouncement="Content is being hidden"
        ariaLive="polite"
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    await waitFor(() => {
      const announcement = screen.getByText('Content is being hidden');
      expect(announcement).toHaveClass('sr-only');
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });
  });

  it('should respect reduced motion preference', () => {
    // Mock matchMedia for reduced motion
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ZoomA11y in={true} scale={0.5} respectReducedMotion timeout={300}>
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    const zoomContainer = screen.getByTestId('zoom-content').parentElement;
    expect(zoomContainer).toHaveStyle('transition: none');
  });

  it('should handle unmountOnExit correctly', async () => {
    const { rerender } = render(
      <ZoomA11y in={true} scale={0.5} unmountOnExit>
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    expect(screen.getByTestId('zoom-content')).toBeInTheDocument();

    // Change to exited state
    rerender(
      <ZoomA11y in={false} scale={0.5} unmountOnExit>
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    // Wait for the component to be removed from the DOM
    await waitFor(
      () => {
        expect(screen.queryByTestId('zoom-content')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should handle epilepsy safe mode correctly', () => {
    // Reset matchMedia mock
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ZoomA11y
        in={true}
        scale={0.5}
        epilepsySafe
        timeout={100} // This should be increased to at least 300ms
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    const zoomContainer = screen.getByTestId('zoom-content').parentElement;
    const transitionStyle = zoomContainer?.style.transition;

    // Check if the transition duration is at least 300ms
    expect(transitionStyle).toMatch(/300ms/);
  });

  it('should handle callbacks correctly', () => {
    const onEnter = jest.fn();
    const onEntered = jest.fn();
    const onExit = jest.fn();
    const onExited = jest.fn();

    const { rerender } = render(
      <ZoomA11y
        in={false}
        scale={0.5}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    // Change to entering state
    rerender(
      <ZoomA11y
        in={true}
        scale={0.5}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    expect(onEnter).toHaveBeenCalled();

    // Change to exiting state
    rerender(
      <ZoomA11y
        in={false}
        scale={0.5}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    expect(onExit).toHaveBeenCalled();
  });

  it('should handle custom aria attributes correctly', () => {
    render(
      <ZoomA11y
        in={true}
        scale={0.5}
        ariaLabelledby="custom-label"
        ariaDescribedby="custom-description"
        ariaRoledescription="zooming panel"
        ariaBusy={true}
      >
        <div data-testid="zoom-content">Zoom content</div>
      </ZoomA11y>
    );

    const zoomContainer = screen.getByTestId('zoom-content').parentElement;
    expect(zoomContainer).toHaveAttribute('aria-labelledby', 'custom-label');
    expect(zoomContainer).toHaveAttribute('aria-describedby', 'custom-description');
    expect(zoomContainer).toHaveAttribute('aria-roledescription', 'zooming panel');
    expect(zoomContainer).toHaveAttribute('aria-busy', 'true');
  });

  it('should clone element props when child is a valid element', () => {
    render(
      <ZoomA11y in={true} scale={0.5} ariaLabel="Zooming content">
        <button data-testid="zoom-button">Click me</button>
      </ZoomA11y>
    );

    const button = screen.getByTestId('zoom-button');
    expect(button).toHaveAttribute('aria-label', 'Zooming content');
    expect(button).toHaveAttribute('data-state', 'entered');
    expect(button).toHaveStyle('transform: scale(1)');
  });
});
