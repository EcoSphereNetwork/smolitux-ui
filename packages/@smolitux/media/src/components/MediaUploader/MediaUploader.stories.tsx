import type { Meta, StoryObj } from '@storybook/react';
import { MediaUploader } from './MediaUploader';

const meta: Meta<typeof MediaUploader> = {
  title: 'Components/MediaUploader',
  component: MediaUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MediaUploader',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MediaUploader',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MediaUploader',
    onClick: () => alert('Clicked!'),
  },
};
