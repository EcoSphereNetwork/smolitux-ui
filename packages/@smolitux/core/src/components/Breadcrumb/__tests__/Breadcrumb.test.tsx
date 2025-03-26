import React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumb, BreadcrumbItem } from '../index';

describe('Breadcrumb Component', () => {
  it('renders correctly with default props', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
        <BreadcrumbItem>Category</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Item</BreadcrumbItem>
      </Breadcrumb>
    );
    
    // Check if all items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
    
    // Check if the current page is marked correctly
    expect(screen.getByText('Item').closest('li')).toHaveAttribute('aria-current', 'page');
  });
  
  it('renders with custom separator', () => {
    render(
      <Breadcrumb separator=">">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Item</BreadcrumbItem>
      </Breadcrumb>
    );
    
    // Check if the custom separator is used
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(2); // Two separators for three items
  });
  
  it('renders with custom separator icon', () => {
    render(
      <Breadcrumb separator={<span data-testid="custom-separator">/</span>}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Item</BreadcrumbItem>
      </Breadcrumb>
    );
    
    // Check if the custom separator icon is used
    const separators = screen.getAllByTestId('custom-separator');
    expect(separators).toHaveLength(2); // Two separators for three items
  });
  
  it('renders with links', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="/products">Products</a>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Item</BreadcrumbItem>
      </Breadcrumb>
    );
    
    // Check if links are rendered
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products');
    
    // Current page should not be a link
    expect(screen.getByText('Item').closest('a')).toBeNull();
  });
  
  it('renders with custom spacing', () => {
    render(
      <Breadcrumb spacing="space-x-8">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Item</BreadcrumbItem>
      </Breadcrumb>
    );
    
    // Check if the breadcrumb has the correct spacing class
    const breadcrumb = screen.getByRole('navigation');
    expect(breadcrumb.firstChild).toHaveClass('space-x-8');
  });
  
  it('renders with custom className', () => {
    render(
      <Breadcrumb className="custom-breadcrumb">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Item</BreadcrumbItem>
      </Breadcrumb>
    );
    
    // Check if the custom class is applied
    const breadcrumb = screen.getByRole('navigation');
    expect(breadcrumb).toHaveClass('custom-breadcrumb');
  });
  
  it('renders BreadcrumbItem with custom className', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem className="custom-item">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Item</BreadcrumbItem>
      </Breadcrumb>
    );
    
    // Check if the custom class is applied to the item
    const item = screen.getByText('Home').closest('li');
    expect(item).toHaveClass('custom-item');
  });
  
  it('renders with custom styles', () => {
    render(
      <Breadcrumb style={{ marginTop: '20px' }}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Item</BreadcrumbItem>
      </Breadcrumb>
    );
    
    // Check if the custom style is applied
    const breadcrumb = screen.getByRole('navigation');
    expect(breadcrumb).toHaveStyle({ marginTop: '20px' });
  });
});