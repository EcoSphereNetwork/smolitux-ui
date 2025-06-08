import React from 'react';
import { render, screen } from '@testing-library/react';
import { PostCreator } from './PostCreator';

describe('PostCreator', () => {
  it('renders without crashing', () => {
    render(<PostCreator />);
    expect(screen.getByRole('button', { name: /PostCreator/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PostCreator className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<PostCreator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
