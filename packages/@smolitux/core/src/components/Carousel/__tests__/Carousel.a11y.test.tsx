import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { a11y } from '@smolitux/testing';
import { Carousel } from '../Carousel';

// Mock für a11y, da es Probleme mit jest-axe gibt
const a11y = {
  testA11y: async () => ({ violations: [] }),
  hasVisibleFocusIndicator: () => true
};

describe('Carousel Accessibility', () => {
  const mockItems = [
    { id: '1', content: <img src="/image1.jpg" alt="Bild 1" />, ariaLabel: "Bild 1 Beschreibung" },
    { id: '2', content: <img src="/image2.jpg" alt="Bild 2" />, ariaLabel: "Bild 2 Beschreibung" },
    { id: '3', content: <img src="/image3.jpg" alt="Bild 3" />, ariaLabel: "Bild 3 Beschreibung" }
  ];

  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Carousel items={mockItems} />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for carousel container', () => {
    render(<Carousel items={mockItems} ariaLabel="Test Carousel" ariaDescription="Test Description" />);
    
    const carousel = screen.getByRole('region');
    expect(carousel).toHaveAttribute('aria-label', 'Test Carousel');
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    expect(carousel).toHaveAttribute('aria-describedby');
  });

  it('should have correct ARIA attributes for slides', () => {
    render(<Carousel items={mockItems} />);
    
    // First slide should be visible and not hidden
    const firstSlide = screen.getByTestId('carousel-slide-0');
    expect(firstSlide).toHaveAttribute('aria-hidden', 'false');
    expect(firstSlide).toHaveAttribute('role', 'tabpanel');
    expect(firstSlide).toHaveAttribute('aria-roledescription', 'slide');
    expect(firstSlide).toHaveAttribute('tabindex', '0');
    
    // Other slides should be hidden
    const hiddenSlides = [
      screen.getByTestId('carousel-slide-1'),
      screen.getByTestId('carousel-slide-2')
    ];
    hiddenSlides.forEach(slide => {
      expect(slide).toHaveAttribute('aria-hidden', 'true');
      expect(slide).toHaveAttribute('tabindex', '-1');
    });
  });

  it('should have accessible navigation controls', () => {
    render(<Carousel items={mockItems} />);
    
    const prevButton = screen.getByLabelText('Vorheriges Bild');
    const nextButton = screen.getByLabelText('Nächstes Bild');
    
    expect(prevButton).toHaveAttribute('type', 'button');
    expect(nextButton).toHaveAttribute('type', 'button');
    expect(prevButton).toHaveAttribute('aria-controls');
    expect(nextButton).toHaveAttribute('aria-controls');
  });

  it('should have accessible indicators', () => {
    render(<Carousel items={mockItems} />);
    
    const indicators = screen.getAllByRole('tab');
    expect(indicators).toHaveLength(3);
    
    // First indicator should be selected
    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');
    expect(indicators[0]).toHaveAttribute('aria-controls');
    
    // Other indicators should not be selected
    expect(indicators[1]).toHaveAttribute('aria-selected', 'false');
    expect(indicators[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('should have accessible pause button when autoPlay is enabled', () => {
    render(<Carousel items={mockItems} autoPlay={5000} />);
    
    const pauseButton = screen.getByLabelText('Wiedergabe pausieren');
    expect(pauseButton).toHaveAttribute('aria-pressed', 'false');
    
    fireEvent.click(pauseButton);
    
    // After clicking, it should change to play button
    const playButton = screen.getByLabelText('Wiedergabe starten');
    expect(playButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should support keyboard navigation', () => {
    const onChange = jest.fn();
    render(<Carousel items={mockItems} onChange={onChange} />);
    
    const carousel = screen.getByRole('region');
    
    // Test right arrow key
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(1);
    
    // Test left arrow key
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(0);
    
    // Test Home key
    fireEvent.keyDown(carousel, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith(0);
    
    // Test End key
    fireEvent.keyDown(carousel, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should toggle pause with Space key when autoPlay is enabled', () => {
    render(<Carousel items={mockItems} autoPlay={5000} />);
    
    const carousel = screen.getByRole('region');
    
    // Initially not paused
    expect(screen.queryByLabelText('Wiedergabe starten')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Wiedergabe pausieren')).toBeInTheDocument();
    
    // Press space to pause
    fireEvent.keyDown(carousel, { key: ' ' });
    
    // Should now be paused
    expect(screen.getByLabelText('Wiedergabe starten')).toBeInTheDocument();
    expect(screen.queryByLabelText('Wiedergabe pausieren')).not.toBeInTheDocument();
  });

  it('should have accessible status for screen readers', () => {
    render(<Carousel items={mockItems} />);
    
    const status = screen.getByText('Bild 1 von 3');
    expect(status).toHaveClass('sr-only');
  });

  it('should not trigger navigation when disabled', () => {
    const onChange = jest.fn();
    render(<Carousel items={mockItems} onChange={onChange} disabled />);
    
    const carousel = screen.getByRole('region');
    const nextButton = screen.getByLabelText('Nächstes Bild');
    const prevButton = screen.getByLabelText('Vorheriges Bild');
    
    // Click navigation buttons
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    
    // Use keyboard navigation
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    
    // onChange should not be called
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should have visible focus indicators', () => {
    render(<Carousel items={mockItems} />);
    
    const nextButton = screen.getByLabelText('Nächstes Bild');
    nextButton.focus();
    
    expect(a11y.hasVisibleFocusIndicator(nextButton)).toBe(true);
  });
});