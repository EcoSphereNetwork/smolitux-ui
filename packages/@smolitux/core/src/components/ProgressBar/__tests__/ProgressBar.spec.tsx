import React from 'react';
import { render } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar Snapshots', () => {
  it('renders default progress bar correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with label correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} showLabel />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom label format correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} showLabel labelFormat="valueAndMax" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom label correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} label="Loading..." />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different sizes correctly', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];

    const fragments = sizes.map((size) => {
      const { asFragment } = render(<ProgressBar value={50} size={size} />);
      return { size, fragment: asFragment() };
    });

    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`ProgressBar with size ${size}`);
    });
  });

  it('renders with different colors correctly', () => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = [
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'info',
    ];

    const fragments = colors.map((color) => {
      const { asFragment } = render(<ProgressBar value={50} color={color} />);
      return { color, fragment: asFragment() };
    });

    fragments.forEach(({ color, fragment }) => {
      expect(fragment).toMatchSnapshot(`ProgressBar with color ${color}`);
    });
  });

  it('renders with rounded corners correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} rounded />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with gradient appearance correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} appearance="gradient" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with inverted progress correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} inverted />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with indeterminate state correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} indeterminate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with striped variant correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} variant="striped" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with animated variant correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} variant="animated" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom className correctly', () => {
    const { asFragment } = render(<ProgressBar value={50} className="custom-progress" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
