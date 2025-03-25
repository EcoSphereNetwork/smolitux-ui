import React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb Snapshots', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Item', active: true }
  ];

  it('renders default breadcrumb correctly', () => {
    const { asFragment } = render(<Breadcrumb items={mockItems} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom separator correctly', () => {
    const { asFragment } = render(
      <Breadcrumb 
        items={mockItems} 
        separator={<span>•</span>} 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom className correctly', () => {
    const { asFragment } = render(
      <Breadcrumb 
        items={mockItems} 
        className="custom-breadcrumb" 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with icons correctly', () => {
    const itemsWithIcons = [
      { 
        label: 'Home', 
        href: '/', 
        icon: <span>🏠</span> 
      },
      { 
        label: 'Products', 
        href: '/products',
        icon: <span>📦</span>
      },
      { 
        label: 'Item', 
        active: true,
        icon: <span>📄</span>
      }
    ];

    const { asFragment } = render(<Breadcrumb items={itemsWithIcons} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom separator and maxItems correctly', () => {
    const { asFragment } = render(
      <Breadcrumb 
        items={mockItems} 
        separator={<span>/</span>}
        maxItems={3}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});