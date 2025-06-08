import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FollowButton } from './FollowButton';

test('triggers onFollowChange on click', async () => {
  const onFollowChange = jest.fn().mockResolvedValue(undefined);
  render(<FollowButton userId="u1" onFollowChange={onFollowChange} />);
  await userEvent.click(screen.getByRole('button'));
  expect(onFollowChange).toHaveBeenCalledWith('u1', true);
});
