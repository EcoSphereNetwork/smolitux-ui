import React from 'react';
import { render, screen } from '@testing-library/react';
import { Fade } from './Fade';

describe('Fade', () => {
  it('renders without crashing', () => {
    render(<Fade />);
    expect(screen.getByRole('button', { name: /Fade/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Fade className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Fade ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
