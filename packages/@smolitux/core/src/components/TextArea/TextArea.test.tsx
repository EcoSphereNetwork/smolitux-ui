import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('renders without crashing', () => {
    render(<TextArea />);
    expect(screen.getByRole('button', { name: /TextArea/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TextArea className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TextArea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
