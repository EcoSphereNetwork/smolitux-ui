import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SlideA11y } from '../Slide.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Slide Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <SlideA11y in={true} direction="down">
        <div>Slide content</div>
      </SlideA11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render with correct ARIA attributes', () => {
    render(
      <SlideA11y 
        in={true} 
        direction="down"
        ariaLabel="Sliding content"
        ariaLive="polite"
        ariaAtomic={true}
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    const slideContainer = screen.getByTestId('slide-content').parentElement;
    expect(slideContainer).toHaveAttribute('aria-label', 'Sliding content');
    expect(slideContainer).toHaveAttribute('aria-live', 'polite');
    expect(slideContainer).toHaveAttribute('aria-atomic', 'true');
  });

  it('should render with custom element type', () => {
    render(
      <SlideA11y 
        in={true} 
        direction="down"
        as="section"
        ariaLabel="Sliding section"
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    const slideContainer = screen.getByTestId('slide-content').parentElement;
    expect(slideContainer?.tagName).toBe('SECTION');
  });

  it('should announce animation for screen readers', () => {
    render(
      <SlideA11y 
        in={true} 
        direction="down"
        announceAnimation
        enterAnnouncement="Content is being shown"
        ariaLive="polite"
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    const announcement = screen.getByText('Content is being shown');
    expect(announcement).toHaveClass('sr-only');
    expect(announcement).toHaveAttribute('aria-live', 'polite');
    expect(announcement).toHaveAttribute('aria-atomic', 'true');
  });

  it('should announce exit animation for screen readers', async () => {
    const { rerender } = render(
      <SlideA11y 
        in={true} 
        direction="down"
        announceAnimation
        exitAnnouncement="Content is being hidden"
        ariaLive="polite"
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    // Change to exiting state
    rerender(
      <SlideA11y 
        in={false} 
        direction="down"
        announceAnimation
        exitAnnouncement="Content is being hidden"
        ariaLive="polite"
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    await waitFor(() => {
      const announcement = screen.getByText('Content is being hidden');
      expect(announcement).toHaveClass('sr-only');
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });
  });

  it('should respect reduced motion preference', () => {
    // Mock matchMedia for reduced motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
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
      <SlideA11y 
        in={true} 
        direction="down"
        respectReducedMotion
        timeout={300}
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    const slideContainer = screen.getByTestId('slide-content').parentElement;
    expect(slideContainer).toHaveStyle('transition: none');
  });

  it('should handle unmountOnExit correctly', async () => {
    const { rerender } = render(
      <SlideA11y 
        in={true} 
        direction="down"
        unmountOnExit
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    expect(screen.getByTestId('slide-content')).toBeInTheDocument();
    
    // Change to exited state
    rerender(
      <SlideA11y 
        in={false} 
        direction="down"
        unmountOnExit
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    // Wait for the component to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByTestId('slide-content')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should handle different directions correctly', () => {
    const { rerender } = render(
      <SlideA11y 
        in={true} 
        direction="up"
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    let slideContainer = screen.getByTestId('slide-content').parentElement;
    expect(slideContainer).toHaveStyle('transform: translate(0)');
    
    rerender(
      <SlideA11y 
        in={true} 
        direction="left"
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    slideContainer = screen.getByTestId('slide-content').parentElement;
    expect(slideContainer).toHaveStyle('transform: translate(0)');
    
    rerender(
      <SlideA11y 
        in={true} 
        direction="right"
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    slideContainer = screen.getByTestId('slide-content').parentElement;
    expect(slideContainer).toHaveStyle('transform: translate(0)');
  });

  it('should handle callbacks correctly', () => {
    const onEnter = jest.fn();
    const onEntered = jest.fn();
    const onExit = jest.fn();
    const onExited = jest.fn();
    
    const { rerender } = render(
      <SlideA11y 
        in={false} 
        direction="down"
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    // Change to entering state
    rerender(
      <SlideA11y 
        in={true} 
        direction="down"
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    expect(onEnter).toHaveBeenCalled();
    
    // Change to exiting state
    rerender(
      <SlideA11y 
        in={false} 
        direction="down"
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    expect(onExit).toHaveBeenCalled();
  });

  it('should handle custom aria attributes correctly', () => {
    render(
      <SlideA11y 
        in={true} 
        direction="down"
        ariaLabelledby="custom-label"
        ariaDescribedby="custom-description"
        ariaRoledescription="sliding panel"
        ariaBusy={true}
      >
        <div data-testid="slide-content">Slide content</div>
      </SlideA11y>
    );
    
    const slideContainer = screen.getByTestId('slide-content').parentElement;
    expect(slideContainer).toHaveAttribute('aria-labelledby', 'custom-label');
    expect(slideContainer).toHaveAttribute('aria-describedby', 'custom-description');
    expect(slideContainer).toHaveAttribute('aria-roledescription', 'sliding panel');
    expect(slideContainer).toHaveAttribute('aria-busy', 'true');
  });
});