import React from 'react';
import { render, screen } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Produkte', href: '/products' },
          { label: 'Kategorie', active: true }
        ]}
      />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for navigation', () => {
    render(
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Produkte', href: '/products' },
          { label: 'Kategorie', active: true }
        ]}
      />
    );
    
    const nav = screen.getByTestId('breadcrumb-nav');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('should mark current page with aria-current', () => {
    render(
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Produkte', href: '/products' },
          { label: 'Kategorie', active: true }
        ]}
      />
    );
    
    const currentItem = screen.getByTestId('breadcrumb-item-2');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
    
    // Other items should not have aria-current
    const homeItem = screen.getByTestId('breadcrumb-item-0');
    const productsItem = screen.getByTestId('breadcrumb-item-1');
    expect(homeItem).not.toHaveAttribute('aria-current');
    expect(productsItem).not.toHaveAttribute('aria-current');
  });

  it('should have correct structured data attributes', () => {
    render(
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Produkte', href: '/products' },
          { label: 'Kategorie', active: true }
        ]}
      />
    );
    
    // Check BreadcrumbList
    const ol = screen.getByRole('list');
    expect(ol).toHaveAttribute('itemScope');
    expect(ol).toHaveAttribute('itemType', 'https://schema.org/BreadcrumbList');
    
    // Check ListItems
    const items = screen.getAllByTestId(/breadcrumb-item-/);
    items.forEach((item, index) => {
      expect(item).toHaveAttribute('itemProp', 'itemListElement');
      expect(item).toHaveAttribute('itemScope');
      expect(item).toHaveAttribute('itemType', 'https://schema.org/ListItem');
      
      // Check position metadata
      const position = item.querySelector('meta[itemprop="position"]');
      expect(position).toHaveAttribute('content', `${index + 1}`);
    });
  });

  it('should hide separators from screen readers', () => {
    render(
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Produkte', href: '/products' },
          { label: 'Kategorie', active: true }
        ]}
        separator="/"
      />
    );
    
    // Find separators (should be 2)
    const separators = screen.getAllByText('/');
    separators.forEach(separator => {
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('should make icons accessible', () => {
    render(
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Produkte', href: '/products' },
          { label: 'Kategorie', active: true }
        ]}
        showHomeIcon
      />
    );
    
    // Home icon should be hidden from screen readers
    const homeIcon = screen.getByRole('img', { hidden: true });
    expect(homeIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should support keyboard navigation', () => {
    render(
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Produkte', href: '/products' },
          { label: 'Kategorie', active: true }
        ]}
      />
    );
    
    // Links should be focusable
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2); // Home and Products
    
    links.forEach(link => {
      link.focus();
      expect(a11y.hasVisibleFocusIndicator(link)).toBe(true);
    });
  });
});