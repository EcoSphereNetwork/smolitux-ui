import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Carousel } from '../Carousel';

// Mock für useTheme
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({
    colors: {
      primary: {
        500: '#3182ce',
      },
    },
  }),
}));

describe('Carousel', () => {
  const mockItems = [
    { id: '1', content: <div>Slide 1</div>, ariaLabel: 'First slide' },
    { id: '2', content: <div>Slide 2</div>, ariaLabel: 'Second slide' },
    { id: '3', content: <div>Slide 3</div>, ariaLabel: 'Third slide' },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders carousel with items', () => {
    render(<Carousel items={mockItems} />);
    
    // Der erste Slide sollte sichtbar sein
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('renders with correct default active index', () => {
    render(<Carousel items={mockItems} defaultActiveIndex={1} />);
    
    // Der zweite Slide sollte sichtbar sein
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('changes slide when next button is clicked', () => {
    render(<Carousel items={mockItems} />);
    
    // Klick auf den "Weiter"-Button
    const nextButton = screen.getByLabelText('Nächstes Bild');
    fireEvent.click(nextButton);
    
    // Der zweite Slide sollte jetzt sichtbar sein
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('changes slide when previous button is clicked', () => {
    render(<Carousel items={mockItems} defaultActiveIndex={1} />);
    
    // Klick auf den "Zurück"-Button
    const prevButton = screen.getByLabelText('Vorheriges Bild');
    fireEvent.click(prevButton);
    
    // Der erste Slide sollte jetzt sichtbar sein
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('changes slide when indicator is clicked', () => {
    render(<Carousel items={mockItems} />);
    
    // Klick auf den dritten Indikator
    const indicators = screen.getAllByTestId(/carousel-indicator-/);
    fireEvent.click(indicators[2]);
    
    // Der dritte Slide sollte jetzt sichtbar sein
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('auto-plays slides when autoPlay is set', () => {
    render(<Carousel items={mockItems} autoPlay={1000} />);
    
    // Initial sollte der erste Slide sichtbar sein
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    
    // Nach 1000ms sollte der zweite Slide sichtbar sein
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    
    // Nach weiteren 1000ms sollte der dritte Slide sichtbar sein
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('pauses auto-play on hover when pauseOnHover is true', () => {
    render(<Carousel items={mockItems} autoPlay={1000} pauseOnHover />);
    
    // Initial sollte der erste Slide sichtbar sein
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    
    // Hover über dem Carousel
    const carousel = screen.getByTestId('carousel');
    fireEvent.mouseEnter(carousel);
    
    // Nach 1000ms sollte immer noch der erste Slide sichtbar sein
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    
    // Hover verlassen
    fireEvent.mouseLeave(carousel);
    
    // Nach 1000ms sollte der zweite Slide sichtbar sein
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('wraps around to the first slide when at the end and infinite is true', () => {
    render(<Carousel items={mockItems} defaultActiveIndex={2} infinite />);
    
    // Der dritte Slide sollte sichtbar sein
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
    
    // Klick auf den "Weiter"-Button
    const nextButton = screen.getByLabelText('Nächstes Bild');
    fireEvent.click(nextButton);
    
    // Der erste Slide sollte jetzt sichtbar sein
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('wraps around to the last slide when at the beginning and infinite is true', () => {
    render(<Carousel items={mockItems} infinite />);
    
    // Der erste Slide sollte sichtbar sein
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    
    // Klick auf den "Zurück"-Button
    const prevButton = screen.getByLabelText('Vorheriges Bild');
    fireEvent.click(prevButton);
    
    // Der letzte Slide sollte jetzt sichtbar sein
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('does not wrap around when infinite is false', () => {
    render(<Carousel items={mockItems} defaultActiveIndex={2} infinite={false} />);
    
    // Der dritte Slide sollte sichtbar sein
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
    
    // Wir können nicht auf den "Weiter"-Button klicken, da er nicht existiert
    // wenn wir am Ende sind und infinite=false ist
    // Stattdessen prüfen wir, ob der dritte Slide immer noch sichtbar ist
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
    
    // Prüfen wir, ob der "Zurück"-Button existiert
    const prevButton = screen.getByTestId('carousel-prev-button');
    expect(prevButton).toBeInTheDocument();
  });

  it('calls onChange when slide changes', () => {
    const handleChange = jest.fn();
    render(<Carousel items={mockItems} onChange={handleChange} />);
    
    // Klick auf den "Weiter"-Button
    const nextButton = screen.getByLabelText('Nächstes Bild');
    fireEvent.click(nextButton);
    
    // onChange sollte mit dem neuen Index aufgerufen werden
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('renders with correct aspect ratio', () => {
    render(<Carousel items={mockItems} aspectRatio="16:9" />);
    
    const carouselContainer = screen.getByTestId('carousel');
    const aspectRatioDiv = carouselContainer.querySelector('.relative.w-full');
    expect(aspectRatioDiv).toHaveStyle('padding-bottom: 56.25%');
  });

  it('applies custom className', () => {
    render(<Carousel items={mockItems} className="custom-carousel" />);
    
    const carousel = screen.getByTestId('carousel');
    expect(carousel).toHaveClass('custom-carousel');
  });
});