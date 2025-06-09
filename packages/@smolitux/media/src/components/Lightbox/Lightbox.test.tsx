import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Lightbox } from './Lightbox';

describe('Lightbox', () => {
  const src = 'https://via.placeholder.com/300';

  it('renders when open', () => {
    render(<Lightbox open onClose={() => {}} src={src} alt="demo" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose on overlay click', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<Lightbox open onClose={onClose} src={src} alt="demo" />);
    await user.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<Lightbox open onClose={onClose} src={src} alt="demo" />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('is accessible', async () => {
    const { container } = render(<Lightbox open onClose={() => {}} src={src} alt="demo" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
