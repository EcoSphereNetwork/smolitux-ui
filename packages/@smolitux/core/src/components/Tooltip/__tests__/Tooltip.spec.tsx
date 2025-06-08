import React from 'react';
import { render } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

describe('Tooltip Snapshots', () => {
  it('renders tooltip correctly', () => {
    const { asFragment } = render(
      <Tooltip content="Tooltip Content">
        <button>Hover Me</button>
      </Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders tooltip with different positions correctly', () => {
    const positions: Array<'top' | 'right' | 'bottom' | 'left'> = [
      'top',
      'right',
      'bottom',
      'left',
    ];

    const fragments = positions.map((position) => {
      const { asFragment } = render(
        <Tooltip content="Tooltip Content" position={position}>
          <button>Hover Me</button>
        </Tooltip>
      );
      return { position, fragment: asFragment() };
    });

    fragments.forEach(({ position, fragment }) => {
      expect(fragment).toMatchSnapshot(`Tooltip with position ${position}`);
    });
  });

  it('renders tooltip with arrow correctly', () => {
    const { asFragment } = render(
      <Tooltip content="Tooltip Content" arrow>
        <button>Hover Me</button>
      </Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders tooltip with custom maxWidth correctly', () => {
    const { asFragment } = render(
      <Tooltip content="Tooltip Content" maxWidth={200}>
        <button>Hover Me</button>
      </Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders tooltip with custom className correctly', () => {
    const { asFragment } = render(
      <Tooltip content="Tooltip Content" className="custom-tooltip">
        <button>Hover Me</button>
      </Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders tooltip with rich content correctly', () => {
    const { asFragment } = render(
      <Tooltip
        content={
          <div>
            <h4>Tooltip Title</h4>
            <p>Tooltip description</p>
          </div>
        }
      >
        <button>Hover Me</button>
      </Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled tooltip correctly', () => {
    const { asFragment } = render(
      <Tooltip content="Tooltip Content" disabled>
        <button>Hover Me</button>
      </Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
