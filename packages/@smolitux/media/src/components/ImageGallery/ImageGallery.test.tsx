import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageGallery, ImageItem } from './ImageGallery';

const images: ImageItem[] = [
  { id: '1', src: 'img1.jpg', alt: 'Bild 1' },
  { id: '2', src: 'img2.jpg', alt: 'Bild 2' },
];

describe('ImageGallery', () => {
  it('renders all images', () => {
    render(<ImageGallery images={images} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('handles click', () => {
    const onClick = jest.fn();
    render(<ImageGallery images={images} onImageClick={onClick} />);
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(onClick).toHaveBeenCalledWith(images[0]);
  });

  it('uses responsive layout', () => {
    render(<ImageGallery images={images} responsive />);
    const gallery = screen.getByTestId('image-gallery');
    expect(gallery.className).toContain('grid');
  });
});
