import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Label } from '../Label';

describe('Label', () => {
  test('snapshot', () => {
    const tree = renderer
      .create(<Label htmlFor="x">Name</Label>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders htmlFor', () => {
    render(<Label htmlFor="field">Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('for', 'field');
  });

  test('applies aria attributes', () => {
    render(
      <Label htmlFor="f" required disabled>
        L
      </Label>,
    );
    const label = screen.getByText('L');
    expect(label).toHaveAttribute('aria-required', 'true');
    expect(label).toHaveAttribute('aria-disabled', 'true');
  });
});
