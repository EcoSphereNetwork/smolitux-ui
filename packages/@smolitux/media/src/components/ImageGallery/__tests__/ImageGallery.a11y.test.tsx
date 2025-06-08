import React from 'react';
import { a11y } from '@smolitux/testing';
import { ImageGallery, ImageItem } from '../ImageGallery';

const images: ImageItem[] = [
  { id: '1', src: 'img1.jpg', alt: 'Bild 1' },
];

test('ImageGallery is accessible', async () => {
  const { violations } = await a11y.testA11y(<ImageGallery images={images} />);
  expect(violations).toHaveLength(0);
});
