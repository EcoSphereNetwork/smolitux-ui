import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Pagination', () => {
  it('renders correctly with default props', () => {
    render(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(7); // 1, 2, 3, 4, 5, ellipsis, 10
  });

  it('renders with correct number of pages based on siblingCount', () => {
    const { rerender } = render(
      <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} siblingCount={1} />
    );
    
    // Should show: 1, ellipsis, 4, 5, 6, ellipsis, 10
    expect(screen.getAllByRole('button')).toHaveLength(7);
    
    rerender(
      <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} siblingCount={2} />
    );
    
    // Should show: 1, ellipsis, 3, 4, 5, 6, 7, ellipsis, 10
    expect(screen.getAllByRole('button')).toHaveLength(9);
  });

  it('highlights the current page', () => {
    render(<Pagination pageCount={10} currentPage={5} onChange={jest.fn()} />);
    
    const currentPageButton = screen.getByText('5');
    expect(currentPageButton).toHaveClass('bg-primary-500');
  });

  it('calls onChange when a page is clicked', () => {
    const handleChange = jest.fn();
    render(<Pagination pageCount={10} currentPage={1} onChange={handleChange} />);
    
    const page3Button = screen.getByText('3');
    fireEvent.click(page3Button);
    
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('shows first and last page buttons when showFirstLast is true', () => {
    render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={jest.fn()} 
        showFirstLast={true}
        labels={{ first: 'First', last: 'Last' }}
      />
    );
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });

  it('shows previous and next page buttons when showPrevNext is true', () => {
    render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={jest.fn()} 
        showPrevNext={true}
        labels={{ previous: 'Previous', next: 'Next' }}
      />
    );
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination 
        pageCount={10} 
        currentPage={1} 
        onChange={jest.fn()} 
        showPrevNext={true}
        labels={{ previous: 'Previous', next: 'Next' }}
      />
    );
    
    const previousButton = screen.getByText('Previous');
    expect(previousButton.closest('button')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination 
        pageCount={10} 
        currentPage={10} 
        onChange={jest.fn()} 
        showPrevNext={true}
        labels={{ previous: 'Previous', next: 'Next' }}
      />
    );
    
    const nextButton = screen.getByText('Next');
    expect(nextButton.closest('button')).toBeDisabled();
  });

  it('navigates to previous page when previous button is clicked', () => {
    const handleChange = jest.fn();
    render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={handleChange} 
        showPrevNext={true}
        labels={{ previous: 'Previous', next: 'Next' }}
      />
    );
    
    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('navigates to next page when next button is clicked', () => {
    const handleChange = jest.fn();
    render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={handleChange} 
        showPrevNext={true}
        labels={{ previous: 'Previous', next: 'Next' }}
      />
    );
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('navigates to first page when first button is clicked', () => {
    const handleChange = jest.fn();
    render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={handleChange} 
        showFirstLast={true}
        labels={{ first: 'First', last: 'Last' }}
      />
    );
    
    const firstButton = screen.getByText('First');
    fireEvent.click(firstButton);
    
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('navigates to last page when last button is clicked', () => {
    const handleChange = jest.fn();
    render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={handleChange} 
        showFirstLast={true}
        labels={{ first: 'First', last: 'Last' }}
      />
    );
    
    const lastButton = screen.getByText('Last');
    fireEvent.click(lastButton);
    
    expect(handleChange).toHaveBeenCalledWith(10);
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} size="sm" />
    );
    
    let buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('h-8');
    });
    
    rerender(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} size="md" />
    );
    
    buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('h-10');
    });
    
    rerender(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} size="lg" />
    );
    
    buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('h-12');
    });
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} variant="outlined" />
    );
    
    let buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('border');
    });
    
    rerender(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} variant="filled" />
    );
    
    buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('bg-gray-100');
    });
    
    rerender(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} variant="simple" />
    );
    
    buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('bg-transparent');
    });
  });

  it('renders in disabled state', () => {
    render(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} disabled />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('shows page count when showPageCount is true', () => {
    render(
      <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} showPageCount />
    );
    
    expect(screen.getByText('5 / 10')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Pagination 
        pageCount={10} 
        currentPage={1} 
        onChange={jest.fn()} 
        className="custom-pagination"
      />
    );
    
    const pagination = screen.getByRole('navigation');
    expect(pagination).toHaveClass('custom-pagination');
  });

  it('handles edge case with small number of pages', () => {
    render(<Pagination pageCount={3} currentPage={2} onChange={jest.fn()} />);
    
    // Should show all pages without ellipsis
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('handles edge case with single page', () => {
    render(<Pagination pageCount={1} currentPage={1} onChange={jest.fn()} />);
    
    // Should show just one page
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    const handleChange = jest.fn();
    render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={handleChange} 
        showPrevNext={true}
        labels={{ previous: 'Previous', next: 'Next' }}
      />
    );
    
    // Test left arrow key
    fireEvent.keyDown(screen.getByText('Previous'), { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(4);
    
    // Test right arrow key
    fireEvent.keyDown(screen.getByText('Next'), { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(6);
  });
});