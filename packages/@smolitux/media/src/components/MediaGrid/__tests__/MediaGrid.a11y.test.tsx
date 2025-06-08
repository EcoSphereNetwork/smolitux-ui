import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MediaGrid } from '../MediaGrid';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

describe('MediaGrid Accessibility', () => {
  const mockItems = [
    {
      id: '1',
      type: 'image',
      src: 'https://example.com/image1.jpg',
      alt: 'Image 1',
      title: 'First Image',
    },
    {
      id: '2',
      type: 'image',
      src: 'https://example.com/image2.jpg',
      alt: 'Image 2',
      title: 'Second Image',
    },
    {
      id: '3',
      type: 'video',
      src: 'https://example.com/video.mp4',
      poster: 'https://example.com/poster.jpg',
      title: 'Sample Video',
    },
    {
      id: '4',
      type: 'audio',
      src: 'https://example.com/audio.mp3',
      title: 'Sample Audio',
    },
  ];

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <MediaGrid items={mockItems} aria-label="Media grid with images, videos, and audio" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <MediaGrid items={mockItems} aria-label="Media grid with images, videos, and audio" />
    );

    const grid = container.querySelector('[data-testid="media-grid"]');
    expect(grid).toHaveAttribute('aria-label', 'Media grid with images, videos, and audio');
    expect(grid).toHaveAttribute('role', 'grid');
  });

  test('should have accessible images with alt text', () => {
    const { container } = render(<MediaGrid items={mockItems} />);

    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
    });
  });

  test('should have accessible video elements', () => {
    const { container } = render(<MediaGrid items={mockItems} />);

    const videos = container.querySelectorAll('video');
    videos.forEach((video) => {
      expect(video).toHaveAttribute('controls');
      expect(video).toHaveAttribute('title');
    });
  });

  test('should have accessible audio elements', () => {
    const { container } = render(<MediaGrid items={mockItems} />);

    const audios = container.querySelectorAll('audio');
    audios.forEach((audio) => {
      expect(audio).toHaveAttribute('controls');
      expect(audio).toHaveAttribute('title');
    });
  });

  test('should have accessible captions when shown', () => {
    const { container } = render(<MediaGrid items={mockItems} showCaptions={true} />);

    const captions = container.querySelectorAll('.media-caption');
    expect(captions.length).toBe(mockItems.length);

    captions.forEach((caption) => {
      expect(caption).toHaveAttribute('aria-hidden', 'false');
    });
  });

  test('should have accessible filter controls', () => {
    const { container } = render(<MediaGrid items={mockItems} showFilters={true} />);

    const filterControls = container.querySelector('[data-testid="media-filters"]');
    expect(filterControls).toHaveAttribute('role', 'toolbar');
    expect(filterControls).toHaveAttribute('aria-label', 'Filter media by type');

    const filterButtons = container.querySelectorAll('[data-testid="media-filters"] button');
    filterButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed');
    });
  });

  test('should have accessible pagination controls', () => {
    const { container } = render(<MediaGrid items={mockItems} paginate={true} itemsPerPage={2} />);

    const paginationControls = container.querySelector('[data-testid="media-pagination"]');
    expect(paginationControls).toHaveAttribute('role', 'navigation');
    expect(paginationControls).toHaveAttribute('aria-label', 'Pagination');

    const pageButtons = container.querySelectorAll('[data-testid="media-pagination"] button');
    pageButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label');
    });

    // Current page button should have aria-current="page"
    const currentPageButton = container.querySelector('[aria-current="page"]');
    expect(currentPageButton).toBeInTheDocument();
  });

  test('should have keyboard navigation support for grid items', () => {
    const { container } = render(<MediaGrid items={mockItems} />);

    const gridItems = container.querySelectorAll('[data-testid="media-grid-item"]');
    gridItems.forEach((item) => {
      expect(item).toHaveAttribute('tabIndex', '0');
    });
  });

  test('should have focus management for filter buttons', () => {
    const { container } = render(<MediaGrid items={mockItems} showFilters={true} />);

    const filterButtons = container.querySelectorAll('[data-testid="media-filters"] button');
    filterButtons.forEach((button) => {
      expect(button).toHaveAttribute('tabIndex', '0');
    });
  });

  test('should have focus management for pagination buttons', () => {
    const { container } = render(<MediaGrid items={mockItems} paginate={true} itemsPerPage={2} />);

    const paginationButtons = container.querySelectorAll('[data-testid="media-pagination"] button');
    paginationButtons.forEach((button) => {
      expect(button).toHaveAttribute('tabIndex', '0');
    });
  });

  test('should announce filter changes to screen readers', () => {
    const { container } = render(<MediaGrid items={mockItems} showFilters={true} />);

    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  test('should announce page changes to screen readers', () => {
    const { container } = render(<MediaGrid items={mockItems} paginate={true} itemsPerPage={2} />);

    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });
});
