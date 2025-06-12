import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    placement: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    hasOverlay: { control: 'boolean' },
    trapFocus: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    isOpen: true,
    children: 'Drawer content',
  },
};

export const Positions: Story = {
  args: {
    isOpen: true,
    placement: 'left',
    children: 'Drawer content',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>Open Drawer</button>
        <Drawer {...args} isOpen={open} onOpenChange={setOpen}>
          Drawer content
        </Drawer>
      </div>
    );
  },
  args: {
    placement: 'right',
  },
};
