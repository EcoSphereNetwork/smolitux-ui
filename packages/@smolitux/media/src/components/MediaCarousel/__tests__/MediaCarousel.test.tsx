import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaCarousel } from '../MediaCarousel';

// Mock the Button component from @smolitux/core
jest.mock('@smolitux/core', () => ({
  Button: ({ children, onClick, ...props }: { children: React.ReactNode, onClick?: () => void }) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-icon={name} {...props}>{name}</span>
  )
}));

describe('MediaCarousel', () => {
  const mockItems = [
    {
      id: '1',
      type: 'image',
      src: 'https://example.com/image1.jpg',
      alt: 'Image 1',
      title: 'First Image'
    },
    {
      id: '2',
      type: 'image',
      src: 'https://example.com/image2.jpg',
      alt: 'Image 2',
      title: 'Second Image'
    },
    {
      id: '3',
      type: 'video',
      src: 'https://example.com/video.mp4',
      poster: 'https://example.com/poster.jpg',
      title: 'Sample Video'
    }
  ];

  test('renders carousel with default props', () => {
    render(<MediaCarousel items={mockItems} />);
    
    // Current item should be rendered
    const currentItem = screen.getByAltText('Image 1');
    expect(currentItem).toBeInTheDocument();
    expect(currentItem).toHaveAttribute('src', 'https://example.com/image1.jpg');
    
    // Navigation buttons should be rendered
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<MediaCarousel items={mockItems} className="custom-carousel" />);
    const carousel = screen.getByTestId('media-carousel');
    expect(carousel).toHaveClass('custom-carousel');
  });

  test('navigates to next item when next button is clicked', () => {
    render(<MediaCarousel items={mockItems} />);
    
    // Initially, the first item should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    
    // Click the next button
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    // Now the second item should be displayed
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
  });

  test('navigates to previous item when previous button is clicked', () => {
    render(<MediaCarousel items={mockItems} initialIndex={1} />);
    
    // Initially, the second item should be displayed
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    
    // Click the previous button
    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);
    
    // Now the first item should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });

  test('wraps around to the first item when at the end', () => {
    render(<MediaCarousel items={mockItems} initialIndex={2} />);
    
    // Initially, the third item should be displayed
    expect(screen.getByText('Sample Video')).toBeInTheDocument();
    
    // Click the next button
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    // Now the first item should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });

  test('wraps around to the last item when at the beginning', () => {
    render(<MediaCarousel items={mockItems} />);
    
    // Initially, the first item should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    
    // Click the previous button
    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);
    
    // Now the last item should be displayed
    expect(screen.getByText('Sample Video')).toBeInTheDocument();
  });

  test('displays indicators when showIndicators is true', () => {
    render(<MediaCarousel items={mockItems} showIndicators={true} />);
    
    // Indicators should be rendered
    const indicators = screen.getAllByRole('button', { name: /go to slide/i });
    expect(indicators.length).toBe(mockItems.length);
  });

  test('navigates to specific item when indicator is clicked', () => {
    render(<MediaCarousel items={mockItems} showIndicators={true} />);
    
    // Initially, the first item should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    
    // Click the third indicator
    const indicators = screen.getAllByRole('button', { name: /go to slide/i });
    fireEvent.click(indicators[2]);
    
    // Now the third item should be displayed
    expect(screen.getByText('Sample Video')).toBeInTheDocument();
  });

  test('displays captions when showCaptions is true', () => {
    render(<MediaCarousel items={mockItems} showCaptions={true} />);
    
    // Caption should be rendered
    expect(screen.getByText('First Image')).toBeInTheDocument();
  });

  test('auto-advances when autoPlay is true', () => {
    jest.useFakeTimers();
    
    render(<MediaCarousel items={mockItems} autoPlay={true} interval={1000} />);
    
    // Initially, the first item should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    
    // Advance time by 1000ms
    jest.advanceTimersByTime(1000);
    
    // Now the second item should be displayed
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('pauses auto-advance when pauseOnHover is true and mouse enters', () => {
    jest.useFakeTimers();
    
    render(<MediaCarousel items={mockItems} autoPlay={true} interval={1000} pauseOnHover={true} />);
    
    // Initially, the first item should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    
    // Mouse enter the carousel
    const carousel = screen.getByTestId('media-carousel');
    fireEvent.mouseEnter(carousel);
    
    // Advance time by 1000ms
    jest.advanceTimersByTime(1000);
    
    // The first item should still be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    
    // Mouse leave the carousel
    fireEvent.mouseLeave(carousel);
    
    // Advance time by 1000ms
    jest.advanceTimersByTime(1000);
    
    // Now the second item should be displayed
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('renders video items correctly', () => {
    render(<MediaCarousel items={mockItems} initialIndex={2} />);
    
    // Video element should be rendered
    const videoElement = screen.getByTitle('Sample Video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement.tagName).toBe('VIDEO');
    expect(videoElement).toHaveAttribute('src', 'https://example.com/video.mp4');
    expect(videoElement).toHaveAttribute('poster', 'https://example.com/poster.jpg');
  });

  test('calls onItemChange when item changes', () => {
    const onItemChange = jest.fn();
    render(<MediaCarousel items={mockItems} onItemChange={onItemChange} />);
    
    // Click the next button
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    // onItemChange should be called with the new index and item
    expect(onItemChange).toHaveBeenCalledWith(1, mockItems[1]);
  });

  test('renders with custom navigation buttons', () => {
    render(
      <MediaCarousel 
        items={mockItems} 
        prevButtonText="Back"
        nextButtonText="Forward"
      />
    );
    
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forward/i })).toBeInTheDocument();
  });

  test('hides navigation buttons when hideNavigation is true', () => {
    render(<MediaCarousel items={mockItems} hideNavigation={true} />);
    
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
  });

  test('renders with custom indicator component', () => {
    const CustomIndicator = ({ active }: { active: boolean }) => (
      <div data-testid={`custom-indicator-${active ? 'active' : 'inactive'}`} />
    );
    
    render(
      <MediaCarousel 
        items={mockItems} 
        showIndicators={true}
        indicatorComponent={CustomIndicator}
      />
    );
    
    expect(screen.getByTestId('custom-indicator-active')).toBeInTheDocument();
    expect(screen.getAllByTestId('custom-indicator-inactive').length).toBe(mockItems.length - 1);
  });
});