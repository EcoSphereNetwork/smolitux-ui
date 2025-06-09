import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Lightbox } from './Lightbox';

const meta: Meta<typeof Lightbox> = {
  title: 'Media/Lightbox',
  component: Lightbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <img
          src="https://via.placeholder.com/150"
          alt="thumb"
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        />
        <Lightbox
          open={open}
          onClose={() => setOpen(false)}
          src="https://via.placeholder.com/600"
          alt="Demo"
        />
      </>
    );
  },
};
