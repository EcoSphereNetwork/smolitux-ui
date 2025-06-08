import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text } from '../Text';

describe('Text', () => {
  it('renders with typographic styles', () => {
    const { container } = render(<Text weight="bold" size="lg">Hello</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle({ fontWeight: 'bold' });
    expect(el).toHaveStyle({ fontSize: 'lg' });
  });
});
