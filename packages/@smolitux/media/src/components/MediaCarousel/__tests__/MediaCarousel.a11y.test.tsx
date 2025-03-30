import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MediaCarousel } from '../MediaCarousel';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock the Button component from @smolitux/core
jest.mock('@smolitux/core', () => ({
  Button: ({ children, onClick, ...props }: { children: React.ReactNode, onClick?: () => void }) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-icon={name} {...props}>{name}</span>
  )
}));

describe('MediaCarousel Accessibility', () => {
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

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <MediaCarousel 
        items={mockItems}
        aria-label="Media carousel with images and videos"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <MediaCarousel 
        items={mockItems}
        aria-label="Media carousel with images and videos"
      />
    );
    
    const carousel = container.querySelector('[data-testid="media-carousel"]');
    expect(carousel).toHaveAttribute('aria-label', 'Media carousel with images and videos');
    expect(carousel).toHaveAttribute('role', 'region');
  });

  test('should have accessible navigation buttons', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} />
    );
    
    const prevButton = container.querySelector('button[aria-label="Previous slide"]');
    const nextButton = container.querySelector('button[aria-label="Next slide"]');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    
    expect(prevButton).toHaveAttribute('aria-controls', 'media-carousel-items');
    expect(nextButton).toHaveAttribute('aria-controls', 'media-carousel-items');
  });

  test('should have accessible indicators', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} showIndicators={true} />
    );
    
    const indicators = container.querySelectorAll('[role="button"][aria-label^="Go to slide"]');
    expect(indicators.length).toBe(mockItems.length);
    
    // First indicator should be marked as current
    expect(indicators[0]).toHaveAttribute('aria-current', 'true');
    
    // Other indicators should not be marked as current
    for (let i = 1; i < indicators.length; i++) {
      expect(indicators[i]).not.toHaveAttribute('aria-current', 'true');
    }
  });

  test('should have accessible images with alt text', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} />
    );
    
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt', 'Image 1');
  });

  test('should have accessible video elements', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} initialIndex={2} />
    );
    
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('title', 'Sample Video');
    expect(video).toHaveAttribute('controls');
  });

  test('should have accessible captions when shown', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} showCaptions={true} />
    );
    
    const caption = container.querySelector('.media-caption');
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveTextContent('First Image');
    expect(caption).toHaveAttribute('aria-live', 'polite');
  });

  test('should announce slide changes to screen readers', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} />
    );
    
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  test('should have keyboard navigation support', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} />
    );
    
    const prevButton = container.querySelector('button[aria-label="Previous slide"]');
    const nextButton = container.querySelector('button[aria-label="Next slide"]');
    
    expect(prevButton).toHaveAttribute('tabIndex', '0');
    expect(nextButton).toHaveAttribute('tabIndex', '0');
  });

  test('should have focus management for indicators', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} showIndicators={true} />
    );
    
    const indicators = container.querySelectorAll('[role="button"][aria-label^="Go to slide"]');
    
    // All indicators should be focusable
    indicators.forEach(indicator => {
      expect(indicator).toHaveAttribute('tabIndex', '0');
    });
  });

  test('should pause autoplay when focused for better accessibility', () => {
    const { container } = render(
      <MediaCarousel items={mockItems} autoPlay={true} pauseOnFocus={true} />
    );
    
    const carousel = container.querySelector('[data-testid="media-carousel"]');
    expect(carousel).toHaveAttribute('data-pause-on-focus', 'true');
  });
});