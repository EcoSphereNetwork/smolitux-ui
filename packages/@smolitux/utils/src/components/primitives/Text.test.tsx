import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('renders without crashing', () => {
    render(<Text />);
    expect(screen.getByRole('button', { name: /Text/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Text className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Text ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
