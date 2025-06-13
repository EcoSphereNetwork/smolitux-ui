import React from 'react';
import { render } from '@smolitux/testing';
import { Popover } from '../Popover';

describe('Popover Snapshots', () => {
  it('renders default popover correctly', () => {
    const { asFragment } = render(
      <Popover content="Popover Content" isOpen={true}>
        <button>Trigger</button>
      </Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with arrow correctly', () => {
    const { asFragment } = render(
      <Popover content="Popover Content" isOpen={true} showArrow={true}>
        <button>Trigger</button>
      </Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different placements correctly', () => {
    const placements: Array<'top' | 'right' | 'bottom' | 'left'> = [
      'top',
      'right',
      'bottom',
      'left',
    ];

    const fragments = placements.map((placement) => {
      const { asFragment } = render(
        <Popover content="Popover Content" isOpen={true} placement={placement}>
          <button>Trigger</button>
        </Popover>
      );
      return { placement, fragment: asFragment() };
    });

    fragments.forEach(({ placement, fragment }) => {
      expect(fragment).toMatchSnapshot(`Popover with placement ${placement}`);
    });
  });

  it('renders with rich content correctly', () => {
    const { asFragment } = render(
      <Popover
        content={
          <div>
            <h3>Popover Title</h3>
            <p>This is a paragraph of text.</p>
            <button>Action</button>
          </div>
        }
        isOpen={true}
      >
        <button>Trigger</button>
      </Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom width correctly', () => {
    const { asFragment } = render(
      <Popover content="Popover Content" isOpen={true} width="300px">
        <button>Trigger</button>
      </Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom className correctly', () => {
    const { asFragment } = render(
      <Popover content="Popover Content" isOpen={true} className="custom-popover">
        <button>Trigger</button>
      </Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
