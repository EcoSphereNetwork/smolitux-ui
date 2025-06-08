import React from 'react';
import { render } from '@testing-library/react';
import { Carousel } from '../Carousel';

// Mock für useTheme
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({
    colors: {
      primary: {
        500: '#3182ce',
      },
    },
  }),
}));

describe('Carousel Snapshots', () => {
  const mockItems = [
    { id: '1', content: <div>Slide 1</div>, ariaLabel: 'First slide' },
    { id: '2', content: <div>Slide 2</div>, ariaLabel: 'Second slide' },
    { id: '3', content: <div>Slide 3</div>, ariaLabel: 'Third slide' },
  ];

  it('renders default carousel correctly', () => {
    const { asFragment } = render(<Carousel items={mockItems} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom active index correctly', () => {
    const { asFragment } = render(<Carousel items={mockItems} defaultActiveIndex={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with autoPlay correctly', () => {
    const { asFragment } = render(<Carousel items={mockItems} autoPlay={3000} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom aspect ratio correctly', () => {
    const { asFragment } = render(<Carousel items={mockItems} aspectRatio="21:9" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with infinite scrolling correctly', () => {
    const { asFragment } = render(<Carousel items={mockItems} infinite />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom navigation correctly', () => {
    const { asFragment } = render(
      <Carousel items={mockItems} showArrows={false} showIndicators={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom className correctly', () => {
    const { asFragment } = render(<Carousel items={mockItems} className="custom-carousel" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
