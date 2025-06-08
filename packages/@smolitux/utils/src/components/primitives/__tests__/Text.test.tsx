import React from 'react';
import { render } from '@testing-library/react';
import { Text } from '../Text';

describe('Text', () => {
  it('renders with provided text', () => {
    const { getByText } = render(<Text>Hello</Text>);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('supports size and weight props', () => {
    const { container } = render(
      <Text size="lg" weight="bold">
        Hi
      </Text>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle('font-size: lg');
    expect(el).toHaveStyle('font-weight: bold');
  });
});
