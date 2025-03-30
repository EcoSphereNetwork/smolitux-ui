import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaGrid } from '../MediaGrid';

describe('MediaGrid', () => {
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
    },
    {
      id: '4',
      type: 'audio',
      src: 'https://example.com/audio.mp3',
      title: 'Sample Audio'
    }
  ];

  test('renders grid with default props', () => {
    render(<MediaGrid items={mockItems} />);
    
    // Grid container should be rendered
    const grid = screen.getByTestId('media-grid');
    expect(grid).toBeInTheDocument();
    
    // All items should be rendered
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    expect(screen.getByTitle('Sample Video')).toBeInTheDocument();
    expect(screen.getByTitle('Sample Audio')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<MediaGrid items={mockItems} className="custom-grid" />);
    const grid = screen.getByTestId('media-grid');
    expect(grid).toHaveClass('custom-grid');
  });

  test('renders with custom columns', () => {
    render(<MediaGrid items={mockItems} columns={3} />);
    const grid = screen.getByTestId('media-grid');
    expect(grid).toHaveStyle('grid-template-columns: repeat(3, 1fr)');
  });

  test('renders with custom gap', () => {
    render(<MediaGrid items={mockItems} gap={20} />);
    const grid = screen.getByTestId('media-grid');
    expect(grid).toHaveStyle('gap: 20px');
  });

  test('renders with custom item width', () => {
    render(<MediaGrid items={mockItems} itemWidth={300} />);
    const gridItems = screen.getAllByTestId('media-grid-item');
    gridItems.forEach(item => {
      expect(item).toHaveStyle('width: 300px');
    });
  });

  test('renders with custom item height', () => {
    render(<MediaGrid items={mockItems} itemHeight={200} />);
    const gridItems = screen.getAllByTestId('media-grid-item');
    gridItems.forEach(item => {
      expect(item).toHaveStyle('height: 200px');
    });
  });

  test('renders with captions when showCaptions is true', () => {
    render(<MediaGrid items={mockItems} showCaptions={true} />);
    
    // Captions should be rendered
    expect(screen.getByText('First Image')).toBeInTheDocument();
    expect(screen.getByText('Second Image')).toBeInTheDocument();
    expect(screen.getByText('Sample Video')).toBeInTheDocument();
    expect(screen.getByText('Sample Audio')).toBeInTheDocument();
  });

  test('calls onItemClick when an item is clicked', () => {
    const onItemClick = jest.fn();
    render(<MediaGrid items={mockItems} onItemClick={onItemClick} />);
    
    // Click the first item
    const firstItem = screen.getByAltText('Image 1');
    fireEvent.click(firstItem);
    
    // onItemClick should be called with the item
    expect(onItemClick).toHaveBeenCalledWith(mockItems[0]);
  });

  test('renders with custom item renderer', () => {
    const customRenderer = (item: any) => (
      <div data-testid="custom-item">
        <span>{item.title}</span>
      </div>
    );
    
    render(<MediaGrid items={mockItems} itemRenderer={customRenderer} />);
    
    // Custom rendered items should be displayed
    const customItems = screen.getAllByTestId('custom-item');
    expect(customItems.length).toBe(mockItems.length);
    expect(screen.getByText('First Image')).toBeInTheDocument();
  });

  test('renders with responsive columns', () => {
    render(
      <MediaGrid 
        items={mockItems} 
        responsiveColumns={{
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4
        }}
      />
    );
    
    // Grid should have responsive classes
    const grid = screen.getByTestId('media-grid');
    expect(grid).toHaveClass('grid-responsive');
  });

  test('renders with masonry layout when masonry is true', () => {
    render(<MediaGrid items={mockItems} masonry={true} />);
    
    // Grid should have masonry class
    const grid = screen.getByTestId('media-grid');
    expect(grid).toHaveClass('grid-masonry');
  });

  test('renders with lazy loading when lazyLoad is true', () => {
    render(<MediaGrid items={mockItems} lazyLoad={true} />);
    
    // Images should have loading="lazy" attribute
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  test('renders with placeholder when loading is true', () => {
    render(<MediaGrid items={mockItems} loading={true} />);
    
    // Placeholder should be rendered
    const placeholders = screen.getAllByTestId('media-placeholder');
    expect(placeholders.length).toBe(mockItems.length);
  });

  test('renders with custom placeholder when provided', () => {
    const customPlaceholder = <div data-testid="custom-placeholder">Loading...</div>;
    render(<MediaGrid items={mockItems} loading={true} placeholder={customPlaceholder} />);
    
    // Custom placeholder should be rendered
    const placeholders = screen.getAllByTestId('custom-placeholder');
    expect(placeholders.length).toBe(mockItems.length);
  });

  test('renders with filter controls when showFilters is true', () => {
    render(<MediaGrid items={mockItems} showFilters={true} />);
    
    // Filter controls should be rendered
    const filterControls = screen.getByTestId('media-filters');
    expect(filterControls).toBeInTheDocument();
    
    // Filter buttons for each media type should be rendered
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /image/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /video/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /audio/i })).toBeInTheDocument();
  });

  test('filters items when filter is applied', () => {
    render(<MediaGrid items={mockItems} showFilters={true} />);
    
    // Initially all items should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    expect(screen.getByTitle('Sample Video')).toBeInTheDocument();
    expect(screen.getByTitle('Sample Audio')).toBeInTheDocument();
    
    // Click the image filter button
    const imageFilterButton = screen.getByRole('button', { name: /image/i });
    fireEvent.click(imageFilterButton);
    
    // Only image items should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    expect(screen.queryByTitle('Sample Video')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Sample Audio')).not.toBeInTheDocument();
  });

  test('renders with pagination when paginate is true', () => {
    render(<MediaGrid items={mockItems} paginate={true} itemsPerPage={2} />);
    
    // Pagination controls should be rendered
    const paginationControls = screen.getByTestId('media-pagination');
    expect(paginationControls).toBeInTheDocument();
    
    // Only first page items should be displayed
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    expect(screen.queryByTitle('Sample Video')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Sample Audio')).not.toBeInTheDocument();
    
    // Click the next page button
    const nextPageButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextPageButton);
    
    // Second page items should be displayed
    expect(screen.queryByAltText('Image 1')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Image 2')).not.toBeInTheDocument();
    expect(screen.getByTitle('Sample Video')).toBeInTheDocument();
    expect(screen.getByTitle('Sample Audio')).toBeInTheDocument();
  });
});