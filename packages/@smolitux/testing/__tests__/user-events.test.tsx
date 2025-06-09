import React from 'react';
import { screen } from '@testing-library/react';
import { userEvent } from '../src/user-events';
import render from '../src/render';
import { MockButton } from '../src/mocks';

describe('user-events', () => {
  it('clicks through userEvent', async () => {
    const handleClick = jest.fn();
    render(<MockButton onClick={handleClick}>Press</MockButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
