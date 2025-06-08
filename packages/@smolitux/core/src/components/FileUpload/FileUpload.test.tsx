import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('renders without crashing', () => {
    render(<FileUpload />);
    expect(screen.getByRole('button', { name: /FileUpload/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FileUpload className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FileUpload ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
