import React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb Snapshots', () => {
  const defaultItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Item', active: true }
  ];

  it('renders default breadcrumb correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom separator correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} separator=">" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom className correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} className="custom-breadcrumb" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with icons correctly', () => {
    const itemsWithIcons = [
      { label: 'Home', href: '/', icon: <span data-testid="home-icon">🏠</span> },
      { label: 'Products', href: '/products', icon: <span data-testid="products-icon">📦</span> },
      { label: 'Item', active: true }
    ];
    
    const { asFragment } = render(<Breadcrumb items={itemsWithIcons} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders collapsed breadcrumb correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} maxItems={3} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with itemsBeforeCollapse and itemsAfterCollapse correctly', () => {
    const { asFragment } = render(
      <Breadcrumb 
        items={defaultItems} 
        maxItems={3} 
        itemsBeforeCollapse={1} 
        itemsAfterCollapse={1} 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom expandIcon correctly', () => {
    const { asFragment } = render(
      <Breadcrumb 
        items={defaultItems} 
        maxItems={3} 
        expandIcon={<span data-testid="custom-expand">•••</span>} 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with home element correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} showHome homeHref="/home" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with linkProps correctly', () => {
    const itemsWithLinkProps = [
      { 
        label: 'Home', 
        href: '/', 
        linkProps: { target: '_blank', 'data-testid': 'home-link' } 
      },
      { label: 'Item', active: true }
    ];
    
    const { asFragment } = render(<Breadcrumb items={itemsWithLinkProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with aria attributes correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} aria-label="Breadcrumb Navigation" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom separator className correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} separatorClassName="custom-separator" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom item className correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} itemClassName="custom-item" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom active item className correctly', () => {
    const { asFragment } = render(<Breadcrumb items={defaultItems} activeItemClassName="custom-active" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    const fragments = sizes.map(size => {
      const { asFragment } = render(<Breadcrumb items={defaultItems} size={size as any} />);
      return { size, fragment: asFragment() };
    });
    
    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`Breadcrumb with size ${size}`);
    });
  });

  it('renders with different variants correctly', () => {
    const variants = ['default', 'filled', 'outline'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(<Breadcrumb items={defaultItems} variant={variant as any} />);
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Breadcrumb with variant ${variant}`);
    });
  });
});