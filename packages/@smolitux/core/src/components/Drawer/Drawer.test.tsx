import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders when open', () => {
    render(
      <Drawer isOpen onOpenChange={jest.fn()} ariaLabel="menu">
        Content
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onOpenChange on overlay click', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Drawer isOpen onOpenChange={onChange}>
        Content
      </Drawer>
    );
    await user.click(screen.getByTestId('drawer-overlay'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('closes on Escape', () => {
    const onChange = jest.fn();
    render(
      <Drawer isOpen onOpenChange={onChange}>
        Content
      </Drawer>
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('applies placement classes', () => {
    const { rerender } = render(
      <Drawer isOpen placement="left" onOpenChange={jest.fn()}>
        Content
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveClass('smolitux-drawer--left');
    rerender(
      <Drawer isOpen placement="bottom" onOpenChange={jest.fn()}>
        Content
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveClass('smolitux-drawer--bottom');
  });
});
