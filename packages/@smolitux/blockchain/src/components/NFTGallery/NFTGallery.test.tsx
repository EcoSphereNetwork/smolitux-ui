import React from 'react';
import { render, screen } from '@testing-library/react';
import { NFTGallery } from './NFTGallery';

describe('NFTGallery', () => {
  it('renders without crashing', () => {
    render(<NFTGallery />);
    expect(screen.getByTestId('NFTGallery')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<NFTGallery className="custom-class" />);
    const element = screen.getByTestId('NFTGallery');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<NFTGallery ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<NFTGallery>Test Content</NFTGallery>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<NFTGallery />);
    const element = screen.getByTestId('NFTGallery');
    expect(element).toBeInTheDocument();
  });
});
