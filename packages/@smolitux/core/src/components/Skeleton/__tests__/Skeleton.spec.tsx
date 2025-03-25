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

  it('renders skeletons with gap correctly', () => {
    const { asFragment } = render(<Skeleton count={2} gap={8} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with custom className correctly', () => {
    const { asFragment } = render(<Skeleton className="custom-skeleton" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with custom style correctly', () => {
    const { asFragment } = render(<Skeleton style={{ opacity: 0.5 }} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with aria attributes correctly', () => {
    const { asFragment } = render(
      <Skeleton 
        aria-label="Loading content" 
        role="progressbar" 
        aria-busy="true"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton with children correctly', () => {
    const { asFragment } = render(
      <Skeleton>
        <div>Child content</div>
      </Skeleton>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders text skeleton correctly', () => {
    const { asFragment } = render(
      <div>
        <Skeleton variant="text" width={300} height={20} />
        <Skeleton variant="text" width={250} height={20} />
        <Skeleton variant="text" width={350} height={20} />
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders avatar skeleton correctly', () => {
    const { asFragment } = render(<Skeleton variant="circular" width={40} height={40} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders image skeleton correctly', () => {
    const { asFragment } = render(<Skeleton variant="rectangular" width={210} height={118} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders card skeleton correctly', () => {
    const { asFragment } = render(
      <div>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <div style={{ padding: '16px' }}>
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
        </div>
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders button skeleton correctly', () => {
    const { asFragment } = render(<Skeleton variant="rounded" width={120} height={36} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders list skeleton correctly', () => {
    const { asFragment } = render(
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </div>
        </div>
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});