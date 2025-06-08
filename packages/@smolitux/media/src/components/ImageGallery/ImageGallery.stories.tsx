import type { Meta, StoryObj } from '@storybook/react';
import { ImageGallery, ImageItem } from './ImageGallery';

const demoImages: ImageItem[] = [
  { id: '1', src: 'https://via.placeholder.com/400x300', alt: 'Beispiel 1' },
  { id: '2', src: 'https://via.placeholder.com/400x300', alt: 'Beispiel 2' },
  { id: '3', src: 'https://via.placeholder.com/400x300', alt: 'Beispiel 3' },
];

const meta: Meta<typeof ImageGallery> = {
  title: 'Media/ImageGallery',
  component: ImageGallery,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    images: demoImages,
  },
};

export const WithClick: Story = {
  args: {
    images: demoImages,
    onImageClick: (img) => alert(img.alt),
  },
};
