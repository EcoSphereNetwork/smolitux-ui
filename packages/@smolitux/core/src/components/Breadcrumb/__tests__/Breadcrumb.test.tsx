import React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb', () => {
  const defaultItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Item', active: true }
  ];

  it('renders all items correctly', () => {
    render(<Breadcrumb items={defaultItems} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={defaultItems} />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const productsLink = screen.getByText('Products').closest('a');
    const categoryLink = screen.getByText('Category').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(categoryLink).toHaveAttribute('href', '/products/category');
  });

  it('does not render link for active item', () => {
    render(<Breadcrumb items={defaultItems} />);
    
    const activeItem = screen.getByText('Item');
    expect(activeItem.closest('a')).toBeNull();
  });

  it('renders with custom separator', () => {
    render(<Breadcrumb items={defaultItems} separator=">" />);
    
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(defaultItems.length - 1);
  });

  it('renders with custom className', () => {
    render(<Breadcrumb items={defaultItems} className="custom-breadcrumb" />);
    
    const breadcrumb = screen.getByRole('navigation');
    expect(breadcrumb).toHaveClass('custom-breadcrumb');
  });

  it('renders with icons', () => {
    const itemsWithIcons = [
      { label: 'Home', href: '/', icon: <span data-testid="home-icon">🏠</span> },
      { label: 'Products', href: '/products', icon: <span data-testid="products-icon">📦</span> },
      { label: 'Item', active: true }
    ];
    
    render(<Breadcrumb items={itemsWithIcons} />);
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('products-icon')).toBeInTheDocument();
  });

  it('collapses items when maxItems is less than total items', () => {
    render(<Breadcrumb items={defaultItems} maxItems={3} />);
    
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.queryByText('Products')).not.toBeInTheDocument();
  });

  it('respects itemsBeforeCollapse and itemsAfterCollapse', () => {
    render(
      <Breadcrumb 
        items={defaultItems} 
        maxItems={3} 
        itemsBeforeCollapse={1} 
        itemsAfterCollapse={1} 
      />
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.queryByText('Products')).not.toBeInTheDocument();
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
  });

  it('renders with custom expandIcon', () => {
    render(
      <Breadcrumb 
        items={defaultItems} 
        maxItems={3} 
        expandIcon={<span data-testid="custom-expand">•••</span>} 
      />
    );
    
    expect(screen.getByTestId('custom-expand')).toBeInTheDocument();
  });

  it('renders with home element', () => {
    render(<Breadcrumb items={defaultItems} showHome homeHref="/home" />);
    
    const homeIcon = screen.getByTestId('home-icon');
    expect(homeIcon).toBeInTheDocument();
    expect(homeIcon.closest('a')).toHaveAttribute('href', '/home');
  });

  it('applies linkProps to links', () => {
    const itemsWithLinkProps = [
      { 
        label: 'Home', 
        href: '/', 
        linkProps: { target: '_blank', 'data-testid': 'home-link' } 
      },
      { label: 'Item', active: true }
    ];
    
    render(<Breadcrumb items={itemsWithLinkProps} />);
    
    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toHaveAttribute('target', '_blank');
  });

  it('renders with aria attributes', () => {
    render(<Breadcrumb items={defaultItems} aria-label="Breadcrumb Navigation" />);
    
    const breadcrumb = screen.getByRole('navigation');
    expect(breadcrumb).toHaveAttribute('aria-label', 'Breadcrumb Navigation');
  });

  it('renders active item with aria-current', () => {
    render(<Breadcrumb items={defaultItems} />);
    
    const activeItem = screen.getByText('Item').closest('li');
    expect(activeItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders with custom separator className', () => {
    render(<Breadcrumb items={defaultItems} separatorClassName="custom-separator" />);
    
    const separators = screen.getAllByText('/');
    separators.forEach(separator => {
      expect(separator).toHaveClass('custom-separator');
    });
  });

  it('renders with custom item className', () => {
    render(<Breadcrumb items={defaultItems} itemClassName="custom-item" />);
    
    const items = screen.getAllByRole('listitem');
    items.forEach(item => {
      expect(item).toHaveClass('custom-item');
    });
  });

  it('renders with custom active item className', () => {
    render(<Breadcrumb items={defaultItems} activeItemClassName="custom-active" />);
    
    const activeItem = screen.getByText('Item').closest('li');
    expect(activeItem).toHaveClass('custom-active');
  });
});