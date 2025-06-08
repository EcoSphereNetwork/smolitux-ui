import React from 'react';
import { render } from '@testing-library/react';
import { Drawer } from '../Drawer';

describe('Drawer Snapshots', () => {
  const mockOnClose = jest.fn();

  it('renders default drawer correctly', () => {
    const { asFragment } = render(
      <Drawer isOpen={true} onClose={mockOnClose}>
        Drawer Content
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with title correctly', () => {
    const { asFragment } = render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Drawer Title">
        Drawer Content
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with footer correctly', () => {
    const { asFragment } = render(
      <Drawer isOpen={true} onClose={mockOnClose} footer={<button>Footer Button</button>}>
        Drawer Content
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different placements correctly', () => {
    const placements: Array<'left' | 'right' | 'top' | 'bottom'> = [
      'left',
      'right',
      'top',
      'bottom',
    ];

    const fragments = placements.map((placement) => {
      const { asFragment } = render(
        <Drawer isOpen={true} onClose={mockOnClose} placement={placement}>
          Drawer Content
        </Drawer>
      );
      return { placement, fragment: asFragment() };
    });

    fragments.forEach(({ placement, fragment }) => {
      expect(fragment).toMatchSnapshot(`Drawer with placement ${placement}`);
    });
  });

  it('renders with custom width correctly', () => {
    const { asFragment } = render(
      <Drawer isOpen={true} onClose={mockOnClose} placement="right" width="400px">
        Drawer Content
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom height correctly', () => {
    const { asFragment } = render(
      <Drawer isOpen={true} onClose={mockOnClose} placement="bottom" height="300px">
        Drawer Content
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without header correctly', () => {
    const { asFragment } = render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Drawer Title" showHeader={false}>
        Drawer Content
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom className correctly', () => {
    const { asFragment } = render(
      <Drawer isOpen={true} onClose={mockOnClose} className="custom-drawer">
        Drawer Content
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
