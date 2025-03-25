import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Item', active: true }
  ];

  it('renders all breadcrumb items', () => {
    render(<Breadcrumb items={mockItems} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={mockItems} />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const productsLink = screen.getByText('Products').closest('a');
    const categoryLink = screen.getByText('Category').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(categoryLink).toHaveAttribute('href', '/products/category');
  });

  it('does not render a link for the active item', () => {
    render(<Breadcrumb items={mockItems} />);
    
    const activeItem = screen.getByText('Item');
    expect(activeItem.closest('a')).toBeNull();
  });

  it('applies the active class to the active item', () => {
    render(<Breadcrumb items={mockItems} />);
    
    const activeItem = screen.getByText('Item').closest('li');
    expect(activeItem).toHaveClass('text-gray-800');
  });

  it('renders custom separator when provided', () => {
    const customSeparator = <span data-testid="custom-separator">&gt;</span>;
    render(<Breadcrumb items={mockItems} separator={customSeparator} />);
    
    const separators = screen.getAllByTestId('custom-separator');
    expect(separators).toHaveLength(mockItems.length - 1);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-breadcrumb';
    render(<Breadcrumb items={mockItems} className={customClass} />);
    
    const breadcrumb = screen.getByRole('navigation');
    expect(breadcrumb).toHaveClass(customClass);
  });

  it('renders icons when provided', () => {
    const itemsWithIcons = [
      { 
        label: 'Home', 
        href: '/', 
        icon: <span data-testid="home-icon">🏠</span> 
      },
      { 
        label: 'Products', 
        href: '/products' 
      }
    ];
    
    render(<Breadcrumb items={itemsWithIcons} />);
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('calls onClick handler when provided', () => {
    const handleClick = jest.fn();
    const itemsWithClick = [
      { 
        label: 'Home', 
        href: '/', 
        linkProps: { onClick: handleClick } 
      },
      { 
        label: 'Products', 
        href: '/products' 
      }
    ];
    
    render(<Breadcrumb items={itemsWithClick} />);
    
    fireEvent.click(screen.getByText('Home'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});