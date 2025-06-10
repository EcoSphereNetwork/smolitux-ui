import React from 'react';
import { render, screen } from '@testing-library/react';
import { Slide } from '../Slide';

describe('Slide', () => {
  it('renders children when in prop is true', () => {
    render(
      <Slide in>
        <div data-testid="content">Content</div>
      </Slide>
    );
    expect(screen.getByTestId('content')).toBeVisible();
  });

  it('applies custom className to child element', () => {
    render(
      <Slide in className="custom">
        <div data-testid="content">Content</div>
      </Slide>
    );
    expect(screen.getByTestId('content')).toHaveClass('custom');
  });

  it('forwards ref to wrapper element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Slide in ref={ref}>
        <div>Content</div>
      </Slide>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('returns null when not in and mountOnEnter', () => {
    const { queryByTestId } = render(
      <Slide in={false} mountOnEnter>
        <div data-testid="content">Content</div>
      </Slide>
    );
    expect(queryByTestId('content')).toBeNull();
  });
});
