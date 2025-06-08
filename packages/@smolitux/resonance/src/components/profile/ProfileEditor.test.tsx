import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileEditor } from './ProfileEditor';

describe('ProfileEditor', () => {
  it('renders without crashing', () => {
    render(<ProfileEditor />);
    expect(screen.getByRole('button', { name: /ProfileEditor/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProfileEditor className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ProfileEditor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
