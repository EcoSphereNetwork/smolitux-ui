import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Pagination', () => {
  const defaultProps = {
    pageCount: 10,
    currentPage: 1,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<Pagination {...defaultProps} />);
    
    // Should show current page
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Should show next page
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Should show ellipsis
    expect(screen.getByText('...')).toBeInTheDocument();
    
    // Should show last page
    expect(screen.getByText('10')).toBeInTheDocument();
    
    // Should show next button
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('calls onChange when a page is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    fireEvent.click(screen.getByText('2'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    fireEvent.click(screen.getByLabelText('Next page'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange when previous button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    
    fireEvent.click(screen.getByLabelText('Previous page'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('renders with custom siblingCount', () => {
    render(<Pagination {...defaultProps} siblingCount={2} />);
    
    // Should show more pages
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders with showFirstLast', () => {
    render(<Pagination {...defaultProps} showFirstLast />);
    
    expect(screen.getByLabelText('First page')).toBeInTheDocument();
    expect(screen.getByLabelText('Last page')).toBeInTheDocument();
  });

  it('calls onChange when first button is clicked', () => {
    render(<Pagination {...defaultProps} showFirstLast currentPage={5} />);
    
    fireEvent.click(screen.getByLabelText('First page'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange when last button is clicked', () => {
    render(<Pagination {...defaultProps} showFirstLast currentPage={5} />);
    
    fireEvent.click(screen.getByLabelText('Last page'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(10);
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Pagination {...defaultProps} size="sm" />);
    
    expect(screen.getByLabelText('Next page')).toHaveClass('h-8');
    
    rerender(<Pagination {...defaultProps} size="md" />);
    expect(screen.getByLabelText('Next page')).toHaveClass('h-10');
    
    rerender(<Pagination {...defaultProps} size="lg" />);
    expect(screen.getByLabelText('Next page')).toHaveClass('h-12');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Pagination {...defaultProps} variant="outlined" />);
    
    expect(screen.getByText('1').closest('button')).toHaveClass('border');
    
    rerender(<Pagination {...defaultProps} variant="filled" />);
    expect(screen.getByText('1').closest('button')).toHaveClass('bg-primary-500');
    
    rerender(<Pagination {...defaultProps} variant="simple" />);
    expect(screen.getByText('1').closest('button')).toHaveClass('bg-transparent');
  });

  it('renders in disabled state', () => {
    render(<Pagination {...defaultProps} disabled />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('renders with showPageCount', () => {
    render(<Pagination {...defaultProps} showPageCount />);
    
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
  });

  it('renders with custom labels', () => {
    render(
      <Pagination 
        {...defaultProps} 
        showFirstLast
        labels={{
          previous: 'Zurück',
          next: 'Weiter',
          first: 'Erste',
          last: 'Letzte'
        }}
      />
    );
    
    expect(screen.getByLabelText('Zurück')).toBeInTheDocument();
    expect(screen.getByLabelText('Weiter')).toBeInTheDocument();
    expect(screen.getByLabelText('Erste')).toBeInTheDocument();
    expect(screen.getByLabelText('Letzte')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    
    const currentPageButton = screen.getByText('5').closest('button');
    
    // Focus the current page button
    if (currentPageButton) {
      fireEvent.focus(currentPageButton);
      
      // Press right arrow to navigate to next page
      fireEvent.keyDown(currentPageButton, { key: 'ArrowRight' });
      expect(defaultProps.onChange).toHaveBeenCalledWith(6);
      
      // Press left arrow to navigate to previous page
      fireEvent.keyDown(currentPageButton, { key: 'ArrowLeft' });
      expect(defaultProps.onChange).toHaveBeenCalledWith(4);
      
      // Press Home to navigate to first page
      fireEvent.keyDown(currentPageButton, { key: 'Home' });
      expect(defaultProps.onChange).toHaveBeenCalledWith(1);
      
      // Press End to navigate to last page
      fireEvent.keyDown(currentPageButton, { key: 'End' });
      expect(defaultProps.onChange).toHaveBeenCalledWith(10);
    }
  });

  it('renders with custom className', () => {
    render(<Pagination {...defaultProps} className="custom-pagination" />);
    
    expect(screen.getByRole('navigation')).toHaveClass('custom-pagination');
  });

  it('renders with aria attributes', () => {
    render(<Pagination {...defaultProps} aria-label="Page navigation" />);
    
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Page navigation');
  });

  it('renders current page with aria-current', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const currentPageButton = screen.getByText('3').closest('button');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });
});