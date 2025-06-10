import { render, userEvent } from '../src/helpers';
import React from 'react';
import { screen } from '@testing-library/react';
import { MockButton } from '../src/mocks';

describe('helpers exports', () => {
  it('re-exports utilities', async () => {
    const handleClick = jest.fn();
    render(<MockButton onClick={handleClick}>Ok</MockButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
