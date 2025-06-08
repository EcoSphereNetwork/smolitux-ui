import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextArea.original } from './TextArea.original';

describe('TextArea.original', () => {
  it('renders without crashing', () => {
    render(<TextArea.original />);
    expect(screen.getByRole('button', { name: /TextArea.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TextArea.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TextArea.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
