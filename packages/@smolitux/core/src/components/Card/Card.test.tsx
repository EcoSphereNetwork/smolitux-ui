import React from 'react';
import { render } from '@testing-library/react';
import { Card } from './Card';

test('forwards ref to div element', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(<Card ref={ref}>Content</Card>);
  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});
