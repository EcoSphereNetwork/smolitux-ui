import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileUpload.original } from './FileUpload.original';

describe('FileUpload.original', () => {
  it('renders without crashing', () => {
    render(<FileUpload.original />);
    expect(screen.getByRole('button', { name: /FileUpload.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FileUpload.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FileUpload.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
