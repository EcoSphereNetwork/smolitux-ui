import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ImageViewer } from './ImageViewer';

describe('ImageViewer', () => {
  const src = 'https://via.placeholder.com/150';

  it('renders image with alt text', () => {
    render(<ImageViewer src={src} alt="demo" />);
    const img = screen.getByAltText('demo');
    expect(img).toBeInTheDocument();
  });

  it('handles zoom buttons', async () => {
    const user = userEvent.setup();
    render(<ImageViewer src={src} alt="demo" zoomable />);
    const img = screen.getByAltText('demo');
    const zoomIn = screen.getByRole('button', { name: /zoom in/i });
    await user.click(zoomIn);
    expect(img).toHaveStyle({ transform: 'scale(1.1)' });
  });

  it('is accessible', async () => {
    const { container } = render(<ImageViewer src={src} alt="a" zoomable />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
