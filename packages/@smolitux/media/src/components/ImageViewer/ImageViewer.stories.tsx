import type { Meta, StoryObj } from '@storybook/react';
import { ImageViewer } from './ImageViewer';

const meta: Meta<typeof ImageViewer> = {
  title: 'Media/ImageViewer',
  component: ImageViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'Demo image',
  },
};

export const Zoomable: Story = {
  args: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'Zoom image',
    zoomable: true,
  },
};
