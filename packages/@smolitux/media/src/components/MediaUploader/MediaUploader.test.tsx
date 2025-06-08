import React from 'react';
import { render, screen } from '@testing-library/react';
import { MediaUploader } from './MediaUploader';

describe('MediaUploader', () => {
  it('renders without crashing', () => {
    render(<MediaUploader />);
    expect(screen.getByRole('button', { name: /MediaUploader/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MediaUploader className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MediaUploader ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
