import React from 'react';
import { render } from '@testing-library/react';
import { Skeleton } from '../Skeleton';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Skeleton Snapshots', () => {
  it('renders default skeleton correctly', () => {
    const { asFragment } = render(<Skeleton />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with custom width and height correctly', () => {
    const { asFragment } = render(<Skeleton width={200} height={100} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with string width and height correctly', () => {
    const { asFragment } = render(<Skeleton width="50%" height="10rem" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with different variants correctly', () => {
    const variants = ['text', 'circular', 'rectangular', 'rounded'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(<Skeleton variant={variant as any} />);
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Skeleton with variant ${variant}`);
    });
  });

  it('renders skeleton with different animations correctly', () => {
    const animations = ['pulse', 'wave', 'none'];
    
    const fragments = animations.map(animation => {
      const { asFragment } = render(<Skeleton animation={animation as any} />);
      return { animation, fragment: asFragment() };
    });
    
    fragments.forEach(({ animation, fragment }) => {
      expect(fragment).toMatchSnapshot(`Skeleton with animation ${animation}`);
    });
  });

  it('renders multiple skeletons correctly', () => {
    const { asFragment } = render(<Skeleton count={3} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders multiple skeletons with gap correctly', () => {
    const { asFragment } = render(<Skeleton count={3} gap={8} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with custom className correctly', () => {
    const { asFragment } = render(<Skeleton className="custom-skeleton" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders text skeleton with appropriate dimensions correctly', () => {
    const { asFragment } = render(<Skeleton variant="text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders circular skeleton with equal width and height correctly', () => {
    const { asFragment } = render(<Skeleton variant="circular" width={50} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with all features combined correctly', () => {
    const { asFragment } = render(
      <Skeleton 
        variant="rounded"
        width={300}
        height={150}
        animation="wave"
        count={2}
        gap={16}
        className="custom-skeleton"
        data-custom="test"
        aria-label="Loading content"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton in dark mode correctly', () => {
    // Override the mock for this test
    jest.resetModules();
    jest.mock('@smolitux/theme', () => ({
      useTheme: jest.fn(() => ({ themeMode: 'dark' })),
    }));
    
    const { asFragment } = render(<Skeleton />);
    expect(asFragment()).toMatchSnapshot();
    
    // Reset the mock back
    jest.resetModules();
    jest.mock('@smolitux/theme', () => ({
      useTheme: jest.fn(() => ({ themeMode: 'light' })),
    }));
  });
});