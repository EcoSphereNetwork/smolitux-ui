import React from 'react';
import { render, screen } from '@testing-library/react';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('renders without crashing', () => {
    render(<Accordion />);
    expect(screen.getByRole('button', { name: /Accordion/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Accordion className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Accordion ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
