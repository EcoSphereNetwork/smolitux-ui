import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Icon } from '../Icon';

describe('Icon', () => {
  test('snapshot', () => {
    const tree = renderer.create(<Icon name="check" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders title and aria attributes', () => {
    render(<Icon name="info" title="information" />);
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('aria-labelledby');
    expect(screen.getByText('information')).toBeInTheDocument();
  });

  test('hidden when no title', () => {
    render(<Icon name="alert" />);
    const svg = screen.getByTestId('icon');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
