import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text } from '../Text';

describe('Text', () => {
  it('renders with custom styles', () => {
    const { container } = render(
      <Text weight="bold" size="lg" color="red">
        Hello
      </Text>
    );
    const span = container.firstChild as HTMLElement;
    expect(span).toHaveStyle('font-weight: bold');
    expect(span).toHaveStyle('font-size: lg');
    expect(span).toHaveStyle('color: red');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Text ref={ref}>Hi</Text>);
    expect(ref.current).not.toBeNull();
  });

  it('renders with typographic styles', () => {
    const { container } = render(<Text weight="bold" size="lg">Hello</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle({ fontWeight: 'bold' });
    expect(el).toHaveStyle({ fontSize: 'lg' });
  });
});
