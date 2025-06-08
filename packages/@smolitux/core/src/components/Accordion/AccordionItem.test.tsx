import React from 'react';
import { render, screen } from '@testing-library/react';
import { AccordionItem } from './AccordionItem';

describe('AccordionItem', () => {
  it('renders without crashing', () => {
    render(<AccordionItem />);
    expect(screen.getByRole('button', { name: /AccordionItem/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AccordionItem className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<AccordionItem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
