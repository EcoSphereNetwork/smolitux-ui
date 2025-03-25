import React from 'react';
import { render } from '@testing-library/react';
import { Pagination } from '../Pagination';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Pagination Snapshots', () => {
  it('renders default pagination correctly', () => {
    const { asFragment } = render(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with current page in middle correctly', () => {
    const { asFragment } = render(
      <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with current page at end correctly', () => {
    const { asFragment } = render(
      <Pagination pageCount={10} currentPage={10} onChange={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with different siblingCount correctly', () => {
    const siblingCounts = [0, 1, 2];
    
    const fragments = siblingCounts.map(siblingCount => {
      const { asFragment } = render(
        <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} siblingCount={siblingCount} />
      );
      return { siblingCount, fragment: asFragment() };
    });
    
    fragments.forEach(({ siblingCount, fragment }) => {
      expect(fragment).toMatchSnapshot(`Pagination with siblingCount ${siblingCount}`);
    });
  });

  it('renders pagination with first/last buttons correctly', () => {
    const { asFragment } = render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={jest.fn()} 
        showFirstLast={true}
        labels={{ first: 'First', last: 'Last' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with prev/next buttons correctly', () => {
    const { asFragment } = render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={jest.fn()} 
        showPrevNext={true}
        labels={{ previous: 'Previous', next: 'Next' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with all navigation buttons correctly', () => {
    const { asFragment } = render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={jest.fn()} 
        showFirstLast={true}
        showPrevNext={true}
        labels={{ first: 'First', last: 'Last', previous: 'Previous', next: 'Next' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    const fragments = sizes.map(size => {
      const { asFragment } = render(
        <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} size={size as any} />
      );
      return { size, fragment: asFragment() };
    });
    
    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`Pagination with size ${size}`);
    });
  });

  it('renders pagination with different variants correctly', () => {
    const variants = ['outlined', 'filled', 'simple'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(
        <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} variant={variant as any} />
      );
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Pagination with variant ${variant}`);
    });
  });

  it('renders disabled pagination correctly', () => {
    const { asFragment } = render(
      <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} disabled />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with page count correctly', () => {
    const { asFragment } = render(
      <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} showPageCount />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with custom className correctly', () => {
    const { asFragment } = render(
      <Pagination 
        pageCount={10} 
        currentPage={5} 
        onChange={jest.fn()} 
        className="custom-pagination"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with small number of pages correctly', () => {
    const { asFragment } = render(
      <Pagination pageCount={3} currentPage={2} onChange={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with single page correctly', () => {
    const { asFragment } = render(
      <Pagination pageCount={1} currentPage={1} onChange={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with all features enabled correctly', () => {
    const { asFragment } = render(
      <Pagination 
        pageCount={20} 
        currentPage={10} 
        onChange={jest.fn()} 
        siblingCount={2}
        showFirstLast={true}
        showPrevNext={true}
        showPageCount={true}
        size="lg"
        variant="filled"
        labels={{ first: 'First', last: 'Last', previous: 'Previous', next: 'Next' }}
        className="custom-pagination"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});