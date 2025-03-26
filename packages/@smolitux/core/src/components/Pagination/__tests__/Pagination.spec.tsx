import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination Component', () => {
  it('renders correctly with default props', () => {
    render(<Pagination totalPages={10} />);
    
    // Check if page 1 is rendered
    const page1 = screen.getByText('1');
    expect(page1).toBeInTheDocument();
    
    // Check if next/prev buttons are rendered
    expect(screen.getByLabelText('Zuruck')).toBeInTheDocument();
    expect(screen.getByLabelText('Weiter')).toBeInTheDocument();
  });
  
  it('handles page changes correctly', () => {
    const handlePageChange = jest.fn();
    render(<Pagination totalPages={10} onPageChange={handlePageChange} />);
    
    // Click on page 3
    fireEvent.click(screen.getByText('3'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
  
  it('disables previous button on first page', () => {
    render(<Pagination totalPages={10} currentPage={1} />);
    expect(screen.getByLabelText('Zuruck')).toBeDisabled();
  });
  
  it('disables next button on last page', () => {
    render(<Pagination totalPages={10} currentPage={10} />);
    expect(screen.getByLabelText('Weiter')).toBeDisabled();
  });
  
  it('renders with custom page size', () => {
    const handlePageSizeChange = jest.fn();
    render(
      <Pagination 
        totalPages={10} 
        pageSize={20} 
        pageSizeOptions={[10, 20, 50, 100]} 
        onPageSizeChange={handlePageSizeChange} 
      />
    );
    
    // Verify that the component renders
    expect(screen.getByText('1')).toBeInTheDocument();
  });
  
  it('renders with custom className', () => {
    render(<Pagination totalPages={10} className="custom-pagination" />);
    
    // Verify that the component renders
    expect(screen.getByText('1')).toBeInTheDocument();
  });
  
  it('renders with different sizes', () => {
    render(<Pagination totalPages={10} size="sm" />);
    
    // Verify that the component renders
    expect(screen.getByText('1')).toBeInTheDocument();
  });
  
  it('renders with different variants', () => {
    render(<Pagination totalPages={10} variant="solid" />);
    
    // Verify that the component renders
    expect(screen.getByText('1')).toBeInTheDocument();
  });
  
  it('handles large number of pages correctly', () => {
    render(<Pagination totalPages={100} currentPage={50} />);
    
    // Verify that the component renders
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});