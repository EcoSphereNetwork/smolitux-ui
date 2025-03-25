import React from 'react';
import { render } from '@testing-library/react';
import { Pagination } from '../Pagination';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Pagination Snapshots', () => {
  const defaultProps = {
    pageCount: 10,
    currentPage: 1,
    onChange: jest.fn(),
  };

  it('renders default pagination correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with different current page correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} currentPage={5} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with custom siblingCount correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} siblingCount={2} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with showFirstLast correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} showFirstLast />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with showPrevNext correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} showPrevNext />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    const fragments = sizes.map(size => {
      const { asFragment } = render(<Pagination {...defaultProps} size={size as any} />);
      return { size, fragment: asFragment() };
    });
    
    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`Pagination with size ${size}`);
    });
  });

  it('renders pagination with different variants correctly', () => {
    const variants = ['outlined', 'filled', 'simple'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(<Pagination {...defaultProps} variant={variant as any} />);
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Pagination with variant ${variant}`);
    });
  });

  it('renders disabled pagination correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with showPageCount correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} showPageCount />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with custom labels correctly', () => {
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with custom className correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} className="custom-pagination" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with many pages correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} pageCount={100} currentPage={50} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with few pages correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} pageCount={3} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with one page correctly', () => {
    const { asFragment } = render(<Pagination {...defaultProps} pageCount={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders pagination with all features enabled correctly', () => {
    const { asFragment } = render(
      <Pagination 
        {...defaultProps} 
        showFirstLast
        showPrevNext
        showPageCount
        siblingCount={2}
        size="lg"
        variant="filled"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});